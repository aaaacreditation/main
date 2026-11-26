import { createHash, randomUUID } from "node:crypto";
import type { LeadKind } from "@prisma/client";
import { SITE_URL } from "./seo";
import { OPENAI_PIXEL_ID, type OpenAiEvent } from "./openai-pixel";

/**
 * OpenAI Ads Conversions API — the server half of the site's OpenAI Ads
 * tracking (Nov 26 2026, client). /api/leads calls `leadOpenAiEvents()` for
 * every accepted form submission, sends them here with `sendLeadToOpenAi()`
 * and returns the same events to the browser, which fires them through the
 * Measurement Pixel with the same event IDs (lib/openai-pixel.ts).
 *
 * Schema per OpenAI's reference (openai/plugins → openai-ads-conversions,
 * conversions-api.md): POST /v1/events?pid=…, Bearer key; per event `id`,
 * `type`, `timestamp_ms`, `oppref`, `source_url`, `action_source`, `user`,
 * `data`. User data is limited to the documented fields we have: hashed email,
 * IP address and user agent (never phone numbers).
 *
 * The key lives only on the server (deploy/.env.production, written by
 * `sh deploy/set-openai-ads.sh`): OPENAI_ADS_CONVERSIONS_API_KEY. Without it
 * only the browser Pixel reports.
 */

const ENDPOINT = `https://bzr.openai.com/v1/events?pid=${OPENAI_PIXEL_ID}`;

/** Every form is a lead; applications are also a completed registration. */
const REGISTRATION: LeadKind[] = ["APPLICATION", "MEMBERSHIP"];

export const emailSha256 = (email: string) =>
  createHash("sha256").update(email.trim().toLowerCase()).digest("hex");

/** The events one submission produces, with fresh IDs (no personal data). */
export function leadOpenAiEvents(lead: { kind: LeadKind }): OpenAiEvent[] {
  const id = randomUUID();
  const types = ["lead_created", ...(REGISTRATION.includes(lead.kind) ? ["registration_completed"] : [])];
  return types.map((type) => ({ type, id: `${id}-${type}`, data: { type: "customer_action" } }));
}

/** The raw `__oppref` cookie (opaque attribution context: never decoded or logged). */
function oppref(cookieHeader: string): string | undefined {
  for (const part of cookieHeader.split(";")) {
    const i = part.indexOf("=");
    if (i > 0 && part.slice(0, i).trim() === "__oppref") return part.slice(i + 1).trim() || undefined;
  }
  return undefined;
}

/** The page the form was on: origin + path only, and only on this site. */
function sourceUrl(referer: string | null): string {
  const site = new URL(SITE_URL);
  try {
    const u = new URL(referer ?? "");
    if ((u.protocol === "https:" || u.protocol === "http:") && u.host === site.host) return `${u.origin}${u.pathname}`;
  } catch {}
  return `${site.origin}/`;
}

/**
 * Send one submission's events, one request per event (one invalid event
 * would fail a whole batch). Never throws; a missing key means the
 * Conversions API is simply off.
 */
export async function sendLeadToOpenAi(
  events: OpenAiEvent[],
  lead: { email: string; createdAt: Date },
  req: Request,
): Promise<void> {
  const key = process.env.OPENAI_ADS_CONVERSIONS_API_KEY;
  if (!key || events.length === 0) return;

  const h = req.headers;
  const user: Record<string, string> = { email_sha256: emailSha256(lead.email) };
  const ip = h.get("cf-connecting-ip") || (h.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (ip) user.ip_address = ip;
  const ua = h.get("user-agent");
  if (ua) user.user_agent = ua;
  const ref = oppref(h.get("cookie") ?? "");
  const page = sourceUrl(h.get("referer"));

  await Promise.all(
    events.map(async (e) => {
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
          body: JSON.stringify({
            validate_only: false,
            events: [
              {
                id: e.id,
                type: e.type,
                timestamp_ms: lead.createdAt.getTime(),
                ...(ref ? { oppref: ref } : {}),
                source_url: page,
                action_source: "web",
                user,
                data: e.data,
              },
            ],
          }),
          signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) {
          // Status and OpenAI's message only: never the payload (hashed email, oppref).
          const err = (await res.json().catch(() => null)) as { error?: { message?: string } } | null;
          console.error(`openai ads capi failed: ${e.type} HTTP ${res.status} ${err?.error?.message ?? ""}`.trim());
        }
      } catch (err) {
        console.error(`openai ads capi failed: ${e.type}`, err instanceof Error ? err.message : err);
      }
    }),
  );
}
