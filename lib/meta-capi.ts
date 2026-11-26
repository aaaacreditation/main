import { createHash, randomUUID } from "node:crypto";
import type { LeadKind } from "@prisma/client";
import { LEAD_KIND_LABEL, leadSourceLabel } from "./leads";
import { META_PIXEL_ID, type PixelEvent } from "./meta-pixel";

/**
 * Meta Conversions API — the server half of the site's Meta tracking (Nov 26
 * 2026, client). /api/leads calls `leadPixelEvents()` for every accepted form
 * submission, sends them here with `sendLeadToMeta()` and returns the same
 * events to the browser, which fires them through the Pixel with the same
 * event IDs (lib/meta-pixel.ts). Meta keeps one of each pair.
 *
 * Settings live only on the server (deploy/.env.production, written by
 * `sh deploy/set-meta-capi.sh`): META_CAPI_TOKEN (required to send) and
 * META_TEST_EVENT_CODE (optional — routes events to Events Manager → Test
 * events while checking the setup; remove it afterwards).
 */

const GRAPH = "https://graph.facebook.com/v25.0";

/** Standard events per form type, on top of the Lead every form sends. */
const EXTRA_EVENT: Partial<Record<LeadKind, string>> = {
  CONTACT: "Contact",
  APPLICATION: "SubmitApplication",
  MEMBERSHIP: "SubmitApplication",
};

/** The events one submission produces, with fresh IDs (no personal data). */
export function leadPixelEvents(lead: { kind: LeadKind; source: string; sector: string }): PixelEvent[] {
  const data: Record<string, string> = {
    content_name: leadSourceLabel(lead.source),
    content_category: LEAD_KIND_LABEL[lead.kind],
  };
  if (lead.sector) data.program = lead.sector;
  const id = randomUUID();
  const names = ["Lead", ...(EXTRA_EVENT[lead.kind] ? [EXTRA_EVENT[lead.kind]!] : [])];
  return names.map((name) => ({ name, id: `${id}-${name}`, data }));
}

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

/** Meta's normalisation: phone = digits with country code, no leading 00. */
function normPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^00/, "");
  return digits.length >= 7 ? digits : "";
}

/** Meta's normalisation for names: lowercase letters only, no punctuation/spaces. */
const normName = (v: string) => v.toLowerCase().normalize("NFC").replace(/[\s\p{P}\p{S}]/gu, "");

function cookie(header: string, name: string): string {
  const m = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : "";
}

/**
 * Send one submission's events. Never throws; a missing token means the
 * Conversions API is simply off (the browser Pixel still runs).
 */
export async function sendLeadToMeta(
  events: PixelEvent[],
  lead: { email: string; phone: string; contact: string; createdAt: Date },
  req: Request,
): Promise<void> {
  const token = process.env.META_CAPI_TOKEN;
  if (!token || events.length === 0) return;

  const h = req.headers;
  const cookies = h.get("cookie") ?? "";
  const [first, ...rest] = lead.contact.trim().split(/\s+/);
  const user_data: Record<string, unknown> = {
    em: [sha256(lead.email.trim().toLowerCase())],
    external_id: [sha256(lead.email.trim().toLowerCase())],
  };
  const phone = normPhone(lead.phone);
  if (phone) user_data.ph = [sha256(phone)];
  if (first && normName(first)) user_data.fn = [sha256(normName(first))];
  if (rest.length && normName(rest.join(""))) user_data.ln = [sha256(normName(rest.join("")))];
  // The visitor's address as Cloudflare saw it (Caddy and Next sit behind it).
  const ip = h.get("cf-connecting-ip") || (h.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (ip) user_data.client_ip_address = ip;
  const ua = h.get("user-agent");
  if (ua) user_data.client_user_agent = ua;
  const fbp = cookie(cookies, "_fbp");
  const fbc = cookie(cookies, "_fbc");
  if (fbp) user_data.fbp = fbp;
  if (fbc) user_data.fbc = fbc;

  const page = h.get("referer") || undefined;
  const body: Record<string, unknown> = {
    data: events.map((e) => ({
      event_name: e.name,
      event_id: e.id,
      event_time: Math.floor(lead.createdAt.getTime() / 1000),
      action_source: "website",
      ...(page ? { event_source_url: page } : {}),
      user_data,
      custom_data: e.data,
    })),
    // In the body, not the URL, so the token never lands in a log line.
    access_token: token,
  };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  try {
    const res = await fetch(`${GRAPH}/${META_PIXEL_ID}/events`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      const err = (await res.json().catch(() => null)) as { error?: { message?: string; code?: number } } | null;
      console.error(`meta capi failed: HTTP ${res.status} ${err?.error?.code ?? ""} ${err?.error?.message ?? ""}`.trim());
    }
  } catch (err) {
    console.error("meta capi failed:", err instanceof Error ? err.message : err);
  }
}
