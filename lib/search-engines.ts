import { revalidateTag } from "next/cache";
import { after } from "next/server";
import { prisma } from "./db";
import { SITE_URL } from "./seo";
import { publicPath } from "./public-urls";
import { getSeoSettings, isLiveSite } from "./site-settings";

/**
 * Keeping search engines up to date after an admin save (Nov 2026):
 *
 * - `refreshSitemaps()` expires the cached sitemaps, feeds and llms.txt (tag
 *   "sitemap"), so the next crawler visit sees the change;
 * - `notifySearchEngines(paths)` submits the changed URLs to IndexNow — one
 *   call reaches Bing (which also feeds ChatGPT search and Copilot), Yandex,
 *   Seznam, Naver and Yep. Google does not take IndexNow; it reads the
 *   sitemaps. Runs after the response (`after`), never blocks a save, and
 *   does nothing on the preview server (`isLiveSite()`) or when switched off
 *   in SEO Center → Search engines & AI.
 */

const ENDPOINT = "https://api.indexnow.org/indexnow";
const LOG_KEY = "indexnow-log";
const LOG_KEEP = 25;

export type IndexNowLogEntry = {
  at: string;
  count: number;
  urls: string[];
  ok: boolean;
  status: number;
  message: string;
  source: "auto" | "manual";
};

export const INDEXNOW_KEY_PATH = "/indexnow-key.txt";

export function refreshSitemaps() {
  try {
    revalidateTag("sitemap", "max");
  } catch {
    /* outside a request (scripts) */
  }
}

/** Route path, public path or absolute URL on this site → absolute public URL; null if off-site. */
export function siteUrlOf(input: string): string | null {
  const v = input.trim();
  if (!v) return null;
  if (/^https?:\/\//i.test(v)) {
    try {
      const u = new URL(v);
      return u.origin === new URL(SITE_URL).origin ? `${SITE_URL}${u.pathname}${u.search}` : null;
    } catch {
      return null;
    }
  }
  if (!v.startsWith("/") || v.startsWith("//")) return null;
  return v === "/" ? `${SITE_URL}/` : `${SITE_URL}${publicPath(v)}`;
}

async function appendLog(entry: IndexNowLogEntry) {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: LOG_KEY } });
    const list = Array.isArray(row?.value) ? (row.value as IndexNowLogEntry[]) : [];
    const value = [entry, ...list].slice(0, LOG_KEEP);
    await prisma.siteSetting.upsert({ where: { key: LOG_KEY }, create: { key: LOG_KEY, value }, update: { value } });
  } catch {
    /* logging is best effort */
  }
}

export async function indexNowLog(): Promise<IndexNowLogEntry[]> {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { key: LOG_KEY } });
    return Array.isArray(row?.value) ? (row.value as IndexNowLogEntry[]) : [];
  } catch {
    return [];
  }
}

/**
 * Submit URLs to IndexNow now. Returns what happened; never throws.
 * `force` skips the on/off setting (the admin's manual "Submit" button), but
 * never the live-site check.
 */
export async function submitIndexNow(
  paths: string[],
  { source = "auto", force = false }: { source?: "auto" | "manual"; force?: boolean } = {},
): Promise<{ ok: boolean; status: number; message: string; count: number }> {
  const urls = [...new Set(paths.map(siteUrlOf).filter((u): u is string => !!u))].slice(0, 10_000);
  if (urls.length === 0) return { ok: false, status: 0, message: "No URLs on this website to submit.", count: 0 };
  if (!isLiveSite()) {
    return { ok: false, status: 0, message: "Not submitted: this is the preview server (NOINDEX). Submissions start once the site is live.", count: 0 };
  }
  const settings = await getSeoSettings();
  if (!settings.indexNow && !force) return { ok: false, status: 0, message: "IndexNow is switched off.", count: 0 };

  let status = 0;
  let message: string;
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: settings.indexNowKey,
        keyLocation: `${SITE_URL}${INDEXNOW_KEY_PATH}`,
        urlList: urls,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    status = res.status;
    message =
      status === 200 || status === 202
        ? `Accepted (${status}).`
        : status === 403
          ? "Rejected (403): the key file was not found on the live site."
          : status === 422
            ? "Rejected (422): a URL does not belong to the site or the key does not match."
            : status === 429
              ? "Rejected (429): too many submissions — try again later."
              : `Rejected (${status}).`;
  } catch (err) {
    message = `Could not reach IndexNow: ${(err as Error).message}`;
  }
  const ok = status === 200 || status === 202;
  if (!ok) console.warn("IndexNow:", message);
  await appendLog({ at: new Date().toISOString(), count: urls.length, urls: urls.slice(0, 20), ok, status, message, source });
  return { ok, status, message, count: urls.length };
}

/** Fire-and-forget IndexNow submission after the current response (admin saves). */
export function notifySearchEngines(paths: (string | null | undefined)[]) {
  const list = paths.filter((p): p is string => !!p);
  if (list.length === 0 || !isLiveSite()) return;
  try {
    after(() => submitIndexNow(list).then(() => undefined));
  } catch {
    // Outside a request scope: submit without waiting.
    void submitIndexNow(list);
  }
}
