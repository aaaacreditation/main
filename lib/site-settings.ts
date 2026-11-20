import { unstable_cache } from "next/cache";
import { prisma } from "./db";

/**
 * Site-wide SEO settings, edited in Admin → SEO Center → Search engines & AI
 * (Nov 2026). Stored as one JSON value under the key "seo" in the SiteSetting
 * table; every field missing from the stored value takes its default below.
 *
 * Read through `unstable_cache` (tag "site-settings", 1 hour) so a page render
 * costs no query once warm; saving in the admin expires the tag. Without a
 * database every reader gets DEFAULTS, and after one failure this process
 * skips the database for 60 s (same rule as lib/seo-overrides.ts).
 */

export type CrawlerPolicy = "allow" | "block";

export interface SeoSettings {
  /** Content of <meta name="google-site-verification">. */
  googleVerification: string;
  /** Content of <meta name="msvalidate.01"> (Bing Webmaster Tools). */
  bingVerification: string;
  /** Content of <meta name="yandex-verification">. */
  yandexVerification: string;
  /** AI assistants and answer engines that fetch pages to answer a user (ChatGPT search, Perplexity, Claude…). */
  aiSearch: CrawlerPolicy;
  /** Crawlers that collect pages to train AI models (GPTBot, ClaudeBot, Google-Extended, CCBot…). */
  aiTraining: CrawlerPolicy;
  /** Extra paths closed to every crawler, one per entry, e.g. "/private/". */
  robotsDisallow: string[];
  /** Tell Bing, Yandex, Seznam, Naver… about new and changed pages as they are saved. */
  indexNow: boolean;
  /** IndexNow key, served at /indexnow-key.txt. Public by design. */
  indexNowKey: string;
  /** Tag pages listing fewer articles than this are kept out of search (noindex) and out of the sitemap. */
  tagMinPosts: number;
  /** Extra text for /llms.txt, shown under the site summary. */
  llmsIntro: string;
}

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  // The token on the old WordPress home page (Nov 20 2026) — the client's
  // existing Search Console property is verified with it, so the new home page
  // must carry the same tag or Google drops the verification at the cut-over.
  googleVerification: "5rlJSkolZeUdZaN6YNNIcb3KMuQHeCh0nDGDazTfoyE",
  bingVerification: "",
  yandexVerification: "",
  aiSearch: "allow",
  aiTraining: "allow",
  robotsDisallow: [],
  indexNow: true,
  indexNowKey: "50a3bdc419460911e06e677620cb3b2e",
  tagMinPosts: 2,
  llmsIntro: "",
};

const KEY = "seo";
const DB_SKIP_MS = 60_000;
let dbSkipUntil = 0;

/** A verification code from either the bare token or the whole <meta> tag Google/Bing show. */
export function verificationToken(input: string): string {
  const v = (input || "").trim();
  const m = v.match(/content\s*=\s*["']([^"']*)["']/i);
  return (m ? m[1] : v).replace(/[^A-Za-z0-9_\-:=+/.]/g, "").slice(0, 200);
}

/** "/foo" → "/foo"; anything that is not a site path is dropped. */
function robotsPath(v: string): string | null {
  const p = v.trim();
  if (!p.startsWith("/") || p.startsWith("//") || /\s/.test(p) || p.length > 200) return null;
  return p;
}

/** Stored JSON (possibly partial or stale) → a complete, valid SeoSettings. */
export function normalizeSeoSettings(raw: unknown): SeoSettings {
  const o = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const d = DEFAULT_SEO_SETTINGS;
  const text = (k: keyof SeoSettings) => (typeof o[k] === "string" ? (o[k] as string) : (d[k] as string));
  const policy = (k: "aiSearch" | "aiTraining") => (o[k] === "block" ? "block" : o[k] === "allow" ? "allow" : d[k]);
  const key = typeof o.indexNowKey === "string" && /^[A-Za-z0-9-]{8,128}$/.test(o.indexNowKey) ? o.indexNowKey : d.indexNowKey;
  const min = Number(o.tagMinPosts);
  return {
    googleVerification: verificationToken(text("googleVerification")),
    bingVerification: verificationToken(text("bingVerification")),
    yandexVerification: verificationToken(text("yandexVerification")),
    aiSearch: policy("aiSearch"),
    aiTraining: policy("aiTraining"),
    robotsDisallow: Array.isArray(o.robotsDisallow)
      ? [...new Set((o.robotsDisallow as unknown[]).map((x) => robotsPath(String(x))).filter((x): x is string => !!x))].slice(0, 50)
      : d.robotsDisallow,
    indexNow: typeof o.indexNow === "boolean" ? o.indexNow : d.indexNow,
    indexNowKey: key,
    tagMinPosts: Number.isInteger(min) && min >= 0 && min <= 50 ? min : d.tagMinPosts,
    llmsIntro: text("llmsIntro").slice(0, 4000),
  };
}

export const parseRobotsDisallow = (v: string): string[] =>
  [...new Set(v.split(/\r?\n/).map(robotsPath).filter((x): x is string => !!x))].slice(0, 50);

const readRow = unstable_cache(
  // Errors propagate on purpose: unstable_cache does not store a rejection.
  async () => (await prisma.siteSetting.findUnique({ where: { key: KEY }, select: { value: true } }))?.value ?? null,
  ["site-settings-seo"],
  { tags: ["site-settings"], revalidate: 3600 },
);

/** The current SEO settings (defaults when the database is unavailable). */
export async function getSeoSettings(): Promise<SeoSettings> {
  if (Date.now() < dbSkipUntil) return DEFAULT_SEO_SETTINGS;
  try {
    return normalizeSeoSettings(await readRow());
  } catch (err) {
    if (Date.now() >= dbSkipUntil) {
      console.warn(
        "site-settings: database unavailable, using defaults for 60s —",
        (err as Error)?.message?.split("\n").filter(Boolean).pop(),
      );
    }
    dbSkipUntil = Date.now() + DB_SKIP_MS;
    return DEFAULT_SEO_SETTINGS;
  }
}

/** Uncached read for the admin form (shows exactly what is stored). */
export async function readSeoSettingsFresh(): Promise<{ settings: SeoSettings; updatedAt: Date | null }> {
  const row = await prisma.siteSetting.findUnique({ where: { key: KEY } });
  return { settings: normalizeSeoSettings(row?.value), updatedAt: row?.updatedAt ?? null };
}

export async function writeSeoSettings(next: SeoSettings): Promise<void> {
  const value = JSON.parse(JSON.stringify(normalizeSeoSettings(next)));
  await prisma.siteSetting.upsert({ where: { key: KEY }, create: { key: KEY, value }, update: { value } });
}

/**
 * True when this deployment is the live site: search engines may be told about
 * it. The preview server sets NOINDEX=true (robots.txt "Disallow: /"), and its
 * pages carry aaa-accreditation.org canonicals that the old WordPress site
 * still answers, so nothing may be submitted from there.
 */
export const isLiveSite = () => process.env.NOINDEX !== "true";
