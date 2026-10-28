import type { Metadata } from "next";
import { revalidateTag, unstable_cache } from "next/cache";
import { prisma } from "./db";
import { pageMeta, SITE_URL, type MetaInput } from "./seo";
import { invalidateRedirectCache, stripTrailingSlash } from "./redirect-map";

/**
 * Per-page SEO overrides from the admin's SEO Center (the SeoEntry table).
 *
 * A SeoEntry row is keyed by route path ("/" for home, no trailing slash);
 * every null/empty field inherits the value coded in the page. Pages call
 * `seoPage(input)` — an async drop-in for `pageMeta(input)` — from
 * `generateMetadata`, or `withSeoOverride(path, metadata)` when they build
 * their Metadata object themselves (news posts).
 *
 * Reads go through `unstable_cache` (tag "seo", 1 hour), so a page render
 * costs no query once warm; the SEO Center calls `revalidateTag("seo", "max")`
 * + `revalidatePath(path)` after each save. Because the cache tags the page,
 * converted pages are ISR with a 1-hour ceiling rather than fully static.
 *
 * The database is optional: any error resolves to "no override" (the coded
 * metadata), and after one failure this process skips the database for 60s.
 * Measured with Prisma 6: an empty/missing DATABASE_URL or a refused port
 * fails in milliseconds, but an unreachable host costs ~5s per query (the
 * Postgres connect timeout) — the skip keeps a DB-less build from paying that
 * on every page.
 */

export type SeoOverride = {
  title: string | null;
  description: string | null;
  keywords: string[];
  ogImage: string | null;
  canonical: string | null;
  /** null = inherit, true = noindex, false = force index. */
  noindex: boolean | null;
};

const DB_SKIP_MS = 60_000;
let dbSkipUntil = 0;

/** "/news/foo/?a=1#x" → "/news/foo". Home stays "/". */
export function normalizeSeoPath(path: string): string {
  let p = (path || "/").trim();
  p = p.replace(/[?#].*$/, "");
  if (!p.startsWith("/")) p = `/${p}`;
  return stripTrailingSlash(p);
}

const readOverride = unstable_cache(
  // Errors propagate out of the cached function on purpose: unstable_cache
  // does not store a rejected result, so a DB blip is never cached as "none".
  async (path: string): Promise<SeoOverride | null> =>
    prisma.seoEntry.findUnique({
      where: { path },
      select: {
        title: true,
        description: true,
        keywords: true,
        ogImage: true,
        canonical: true,
        noindex: true,
      },
    }),
  ["seo-override"],
  { tags: ["seo"], revalidate: 3600 },
);

const filled = (v: string | null | undefined): v is string => typeof v === "string" && v.trim() !== "";

function isEmpty(o: SeoOverride): boolean {
  return (
    !filled(o.title) &&
    !filled(o.description) &&
    !(o.keywords?.length > 0) &&
    !filled(o.ogImage) &&
    !filled(o.canonical) &&
    o.noindex == null
  );
}

/** The SeoEntry override for a route, or null (none, empty, or DB unavailable). */
export async function getSeoOverride(path: string): Promise<SeoOverride | null> {
  if (Date.now() < dbSkipUntil) return null;
  try {
    const row = await readOverride(normalizeSeoPath(path));
    return row && !isEmpty(row) ? row : null;
  } catch (err) {
    if (Date.now() >= dbSkipUntil) {
      console.warn(
        "seo-overrides: database unavailable, using coded metadata for 60s —",
        (err as Error)?.message?.split("\n").filter(Boolean).pop(),
      );
    }
    dbSkipUntil = Date.now() + DB_SKIP_MS;
    return null;
  }
}

/** Canonical override → absolute URL ("/x" is resolved against SITE_URL). */
function absoluteUrl(value: string): string {
  const v = value.trim();
  if (/^https?:\/\//i.test(v)) return v;
  const p = normalizeSeoPath(v);
  return p === "/" ? SITE_URL : `${SITE_URL}${p}`;
}

function absoluteImage(value: string): string {
  const v = value.trim();
  return /^https?:\/\//i.test(v) ? v : `${SITE_URL}${v.startsWith("/") ? v : `/${v}`}`;
}

/**
 * Async drop-in for `pageMeta(input)`: the SeoEntry override for
 * `input.path` is merged over the coded values before the Metadata object is
 * built, so OpenGraph and Twitter follow the override too.
 */
export async function seoPage(input: MetaInput): Promise<Metadata> {
  const o = await getSeoOverride(input.path);
  if (!o) return pageMeta(input);

  const merged: MetaInput = {
    ...input,
    ...(filled(o.title) ? { title: o.title.trim() } : {}),
    ...(filled(o.description) ? { description: o.description.trim() } : {}),
    ...(o.keywords?.length > 0 ? { keywords: o.keywords } : {}),
    ...(filled(o.ogImage) ? { image: o.ogImage.trim() } : {}),
    ...(o.noindex != null ? { noindex: o.noindex } : {}),
  };
  const meta: Metadata = pageMeta(merged);

  if (o.noindex === false) meta.robots = { index: true, follow: true };
  if (filled(o.canonical)) {
    const url = absoluteUrl(o.canonical);
    meta.alternates = { ...meta.alternates, canonical: url };
    meta.openGraph = { ...meta.openGraph, url };
  }
  return meta;
}

/** Apply an override onto an already-built Metadata object. */
export function applySeoOverride(meta: Metadata, o: SeoOverride | null): Metadata {
  if (!o) return meta;
  const out: Metadata = { ...meta };
  const og = { ...(meta.openGraph ?? {}) } as NonNullable<Metadata["openGraph"]> & Record<string, unknown>;
  const tw = { ...(meta.twitter ?? {}) } as NonNullable<Metadata["twitter"]> & Record<string, unknown>;

  if (filled(o.title)) {
    const title = o.title.trim();
    out.title = title;
    og.title = title;
    tw.title = title;
  }
  if (filled(o.description)) {
    const description = o.description.trim();
    out.description = description;
    og.description = description;
    tw.description = description;
  }
  if (o.keywords?.length > 0) out.keywords = o.keywords;
  if (filled(o.ogImage)) {
    const image = absoluteImage(o.ogImage);
    const alt = filled(o.title) ? o.title.trim() : typeof meta.title === "string" ? meta.title : undefined;
    og.images = [{ url: image, width: 1200, height: 630, ...(alt ? { alt } : {}) }];
    tw.images = [image];
  }
  if (o.noindex === true) out.robots = { index: false, follow: true };
  if (o.noindex === false) out.robots = { index: true, follow: true };
  if (filled(o.canonical)) {
    const url = absoluteUrl(o.canonical);
    out.alternates = { ...meta.alternates, canonical: url };
    og.url = url;
  }

  out.openGraph = og;
  out.twitter = tw;
  return out;
}

/**
 * For pages that build their own Metadata (news posts, CMS pages): returns
 * `metadata` with the SeoEntry override for `path` applied on top.
 */
export async function withSeoOverride(path: string, metadata: Metadata): Promise<Metadata> {
  return applySeoOverride(metadata, await getSeoOverride(path));
}

/* ------------------------------------------------------- slug changes */

/**
 * Record that published content moved from `fromPath` to `toPath` (e.g. a
 * post's slug changed: "/news/old" → "/news/new"). Call it from a server
 * action AFTER the content row is saved and only when the old URL was live.
 *
 * - upserts a permanent redirect fromPath → toPath;
 * - deletes any redirect whose source is toPath (that URL is live content
 *   again, and keeping it would loop);
 * - re-points redirects that ended at fromPath straight to toPath, so old
 *   links never hop twice;
 * - moves the SeoEntry override from fromPath to toPath when toPath has none
 *   (best effort — a failure there never blocks the redirect);
 * - refreshes the in-memory redirect map.
 *
 * Never throws; returns false if the redirect could not be written.
 */
export async function recordSlugChange(fromPath: string, toPath: string): Promise<boolean> {
  const from = normalizeSeoPath(fromPath);
  const to = normalizeSeoPath(toPath);
  if (from === to || from === "/") return false;

  let ok = true;
  try {
    await prisma.$transaction([
      prisma.redirect.deleteMany({ where: { from: to } }),
      prisma.redirect.updateMany({ where: { to: from }, data: { to } }),
      prisma.redirect.upsert({
        where: { from },
        create: { from, to, permanent: true, note: "Automatic: URL changed in the admin" },
        update: { to, permanent: true },
      }),
    ]);
  } catch (err) {
    ok = false;
    console.error("recordSlugChange: could not write the redirect —", err);
  }
  invalidateRedirectCache();

  try {
    const [source, target] = await Promise.all([
      prisma.seoEntry.findUnique({ where: { path: from }, select: { id: true } }),
      prisma.seoEntry.findUnique({ where: { path: to }, select: { id: true } }),
    ]);
    if (source && !target) {
      await prisma.seoEntry.update({ where: { id: source.id }, data: { path: to } });
      try {
        revalidateTag("seo", "max");
      } catch {
        /* called outside a server action/route handler */
      }
    }
  } catch (err) {
    console.error("recordSlugChange: could not move the SEO override —", err);
  }
  return ok;
}
