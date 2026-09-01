import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo";
import { getPublishedPosts } from "../lib/content";

/**
 * XML sitemap.
 *
 * Before Aug 2026 the site shipped no sitemap at all, which stranded 299 news
 * posts and every CMS-authored page — nothing in the navigation links to most
 * of them, so crawlers had no path in.
 *
 * `getPublishedPosts()` reads Postgres and falls back to the bundled
 * posts-data.json snapshot, so this still builds without a database.
 */

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
  page("/programs/iso-17025", 0.7),
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
  page("/quote", 0.9, "monthly"),
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: Entry[] = [];
  let archives: Entry[] = [];

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

  return [...STATIC_ROUTES, ...archives, ...posts].filter(
    (e) => !EXCLUDED.some((x) => e.url.replace(SITE_URL, "").startsWith(x)),
  );
}
