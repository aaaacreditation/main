import type { MetadataRoute } from "next";
import { ContentStatus } from "@prisma/client";
import { SITE_URL } from "../lib/seo";
import { getPublishedPosts } from "../lib/content";
import { prisma } from "../lib/db";

/**
 * XML sitemap.
 *
 * Before Aug 2026 the site shipped no sitemap at all, which stranded 299 news
 * posts and every CMS-authored page — nothing in the navigation links to most
 * of them, so crawlers had no path in.
 *
 * `getPublishedPosts()` reads Postgres and falls back to the bundled
 * posts-data.json snapshot, so this still builds without a database.
 *
 * Oct 2026 (admin SEO Center): published CMS pages from the Page table are
 * listed, and any path whose SeoEntry override sets noindex=true is left out
 * (a URL that asks not to be indexed must not be offered to crawlers). Both
 * reads are best-effort — without a database the sitemap is exactly the
 * static routes + the bundled news posts, as before. The SEO Center calls
 * revalidatePath("/sitemap.xml") after each save; the hourly revalidate picks
 * up new posts and pages in between.
 */

export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];

const page = (
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"] = "monthly",
): Entry => ({
  url: path === "/" ? SITE_URL : `${SITE_URL}${path}`,
  lastModified: new Date(),
  changeFrequency,
  priority,
});

/** Routes that must never be indexed, and so must never appear here. */
const EXCLUDED = ["/admin", "/api", "/lp/", "/about/components"];

const STATIC_ROUTES: Entry[] = [
  page("/", 1.0, "weekly"),

  // Programs — the commercial core.
  page("/programs", 0.9, "monthly"),
  page("/programs/healthcare", 0.9, "monthly"),
  page("/programs/conformity-assessment-bodies", 0.9, "monthly"),
  page("/programs/training-education", 0.9, "monthly"),
  page("/programs/smes-accreditation-program", 0.9, "monthly"),
  page("/programs/school-accreditation", 0.8),
  page("/programs/iso-17021", 0.8),
  page("/programs/iso-17020", 0.7),
  page("/programs/iso-17024", 0.7),
  page("/programs/testing-laboratories", 0.7),
  page("/programs/calibration-laboratories", 0.7),
  page("/programs/healthcare/standards", 0.6),
  page("/governance-leadership", 0.6),
  page("/programs/iso-15189", 0.7),
  page("/programs/iso-17065", 0.7),
  page("/programs/iso-17043", 0.7),
  page("/programs/astm-e2659", 0.7),

  // Healthcare sub-pages (restored from the legacy WordPress tree).
  page("/programs/healthcare/why-aaa", 0.6),
  page("/programs/healthcare/international-recognition", 0.6),
  page("/programs/healthcare/standards", 0.6),
  page("/programs/healthcare/process", 0.6),
  page("/programs/healthcare/who-can-apply", 0.6),
  page("/programs/healthcare/consultation", 0.6),

  // Conversion.
  page("/apply", 0.9, "monthly"),
  page("/contact", 0.8, "monthly"),

  // Membership.
  page("/membership", 0.8),
  page("/membership/individual", 0.7),
  page("/membership/organizational", 0.7),
  page("/membership/apply", 0.6),
  page("/membership/individual/apply", 0.6),
  page("/membership/individual/recognized-competency", 0.6),
  page("/membership/organizational/apply", 0.6),

  // Institutional / trust.
  page("/about", 0.8),
  page("/about-accreditation", 0.8),
  page("/advisory-committees", 0.6),
  page("/impartiality-policy", 0.6),
  page("/partnerships", 0.6),
  page("/faq", 0.7, "monthly"),
  page("/documents", 0.7, "monthly"),
  page("/privacy", 0.3, "yearly"),

  // Registers.
  page("/directory", 0.7, "weekly"),
  page("/directory/accredited-organizations", 0.8, "weekly"),

  // News archive.
  page("/news", 0.8, "daily"),
];

/** Keep in sync with app/news/helpers.ts. */
const NEWS_PER_PAGE = 20;

/** Same rule as app/[slug]/page.tsx — only single-segment slugs render. */
const CMS_SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

/** Published admin-authored pages (app/[slug]). Empty without a database. */
async function cmsPages(): Promise<Entry[]> {
  try {
    const rows = await prisma.page.findMany({
      where: { status: ContentStatus.PUBLISHED },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
    return rows
      .filter((r) => CMS_SLUG_RE.test(r.slug))
      .map((r) => ({ ...page(`/${r.slug}`, 0.5), lastModified: r.updatedAt }));
  } catch {
    return [];
  }
}

/** Paths an SEO Center override marks noindex. Empty without a database. */
async function noindexPaths(): Promise<Set<string>> {
  try {
    const rows = await prisma.seoEntry.findMany({ where: { noindex: true }, select: { path: true } });
    return new Set(rows.map((r) => r.path));
  } catch {
    return new Set();
  }
}

const pathOf = (url: string) => url.replace(SITE_URL, "") || "/";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Entry[] = [];
  let archives: Entry[] = [];
  const [cms, hidden] = await Promise.all([cmsPages(), noindexPaths()]);

  try {
    const published = await getPublishedPosts();
    posts = published.map((p) => ({
      url: `${SITE_URL}/news/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    }));

    // Paginated archive: /news is page 1, /news/archive/2..N follow.
    const pageCount = Math.max(1, Math.ceil(published.length / NEWS_PER_PAGE));
    archives = Array.from({ length: pageCount - 1 }, (_, i) =>
      page(`/news/archive/${i + 2}`, 0.4, "weekly"),
    );
  } catch {
    // A sitemap missing the news archive still beats a build failure.
    posts = [];
  }

  // Built-in routes win over a CMS page with the same slug (as they do when
  // rendering), and each URL is listed once.
  const seen = new Set<string>();
  return [...STATIC_ROUTES, ...archives, ...cms, ...posts].filter((e) => {
    const path = pathOf(e.url);
    if (seen.has(e.url) || hidden.has(path) || EXCLUDED.some((x) => path.startsWith(x))) return false;
    seen.add(e.url);
    return true;
  });
}
