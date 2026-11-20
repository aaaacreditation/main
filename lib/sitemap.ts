import { unstable_cache } from "next/cache";
import { ContentStatus, TermKind } from "@prisma/client";
import { SITE_URL } from "./seo";
import { postPath, publicPath } from "./public-urls";
import { profilePath } from "./org-profiles";
import { getAccreditedOrganizations } from "./directory";
import { getPublishedPosts } from "./content";
import { getTerms, termSlug } from "./taxonomy";
import { getCaseStudyArticles } from "./case-studies";
import { getSeoSettings } from "./site-settings";
import { prisma } from "./db";
import { isThinPost } from "@/app/news/helpers";

/**
 * XML sitemaps (Nov 2026 rebuild).
 *
 * The files keep the names the old WordPress site (Yoast) published, so the
 * sitemap already submitted in the client's Search Console —
 * /sitemap_index.xml — keeps working at the cut-over:
 *
 *   /sitemap_index.xml, /sitemap.xml   index of the files below
 *   /page-sitemap.xml                  site pages + admin-authored CMS pages
 *   /post-sitemap1.xml, 2, …           articles, 200 per file (oldest first)
 *   /category-sitemap.xml              category pages in use
 *   /post_tag-sitemap.xml              tag pages with enough articles
 *   /custom_box-sitemap.xml            accredited-organization profiles
 *   /case_study-sitemap.xml            case studies
 *
 * Served by app/sitemaps/[name]/route.ts (next.config.ts rewrites the public
 * names there). URLs are public addresses (the old WordPress URLs). Pages an
 * SEO Center override marks noindex, and tag pages below the admin's minimum,
 * are left out: a URL that asks not to be indexed must not be offered to
 * crawlers. `lastmod` is only given where it is real (an edit or publication
 * date) — Google ignores lastmod on sites where it is always "now".
 *
 * Cached under the "sitemap" tag for an hour; admin saves call
 * `refreshSitemaps()`. Without a database the files hold the static routes,
 * the bundled news posts, case studies and register, as before.
 */

export type SitemapImage = { loc: string; title?: string };
export type SitemapUrl = { loc: string; lastmod?: string; images?: SitemapImage[] };
export type SitemapFile = { name: string; label: string; urls: SitemapUrl[] };

/** Articles per post-sitemapN.xml — the old site's split. */
const POSTS_PER_FILE = 200;

/** Routes that must never be indexed, and so must never be listed. */
const EXCLUDED = ["/admin", "/api", "/lp/", "/about/components"];

/** Same rule as app/[slug]/page.tsx — only single-segment slugs render. */
const CMS_SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

/** Site pages, in priority order (route paths). */
const STATIC_ROUTES = [
  "/",
  // Programs — the commercial core.
  "/programs",
  "/programs/healthcare",
  "/programs/conformity-assessment-bodies",
  "/programs/training-education",
  "/programs/smes-accreditation-program",
  "/programs/school-accreditation",
  "/programs/iso-17021",
  "/programs/iso-17020",
  "/programs/iso-17024",
  "/programs/testing-laboratories",
  "/programs/calibration-laboratories",
  "/programs/iso-15189",
  "/programs/iso-17065",
  "/programs/iso-17043",
  "/programs/astm-e2659",
  // Healthcare sub-pages (restored from the legacy WordPress tree).
  "/programs/healthcare/why-aaa",
  "/programs/healthcare/international-recognition",
  "/programs/healthcare/standards",
  "/programs/healthcare/process",
  "/programs/healthcare/who-can-apply",
  "/programs/healthcare/consultation",
  // Conversion.
  "/apply",
  "/contact",
  // Membership.
  "/membership",
  "/membership/individual",
  "/membership/organizational",
  "/membership/apply",
  "/membership/individual/apply",
  "/membership/individual/recognized-competency",
  "/membership/organizational/apply",
  // Institutional / trust.
  "/about",
  "/about-accreditation",
  "/governance-leadership",
  "/advisory-committees",
  "/impartiality-policy",
  "/partnerships",
  "/faq",
  "/documents",
  "/privacy",
  // Register, resources, case studies.
  "/directory/accredited-organizations",
  "/news",
  "/articles",
  "/case-studies",
];

/** Public URL for a route path. Home keeps its trailing slash, like its canonical. */
const urlOf = (route: string) => `${SITE_URL}${route === "/" ? "/" : publicPath(route)}`;

/** "2024-05-01T10:00:00" → "2024-05-01" (W3C date; the time carries no zone). */
const day = (iso: string | Date | null | undefined): string | undefined => {
  if (!iso) return undefined;
  const s = typeof iso === "string" ? iso : iso.toISOString();
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : undefined;
};

const newest = (dates: (string | undefined)[]) => dates.filter(Boolean).sort().pop();

const absolute = (src: string) => (/^https?:\/\//i.test(src) ? src : `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`);

/** Published admin-authored pages (app/[slug]). Empty without a database. */
async function cmsPages(): Promise<SitemapUrl[]> {
  try {
    const rows = await prisma.page.findMany({
      where: { status: ContentStatus.PUBLISHED },
      select: { slug: true, updatedAt: true, title: true, heroImage: true },
      orderBy: { updatedAt: "desc" },
    });
    return rows
      .filter((r) => CMS_SLUG_RE.test(r.slug) && !STATIC_ROUTES.includes(`/${r.slug}`))
      .map((r) => ({
        loc: urlOf(`/${r.slug}`),
        lastmod: day(r.updatedAt),
        ...(r.heroImage ? { images: [{ loc: absolute(r.heroImage), title: r.title }] } : {}),
      }));
  } catch {
    return [];
  }
}

/** Route paths an SEO Center override marks noindex. Empty without a database. */
async function noindexRoutes(): Promise<Set<string>> {
  try {
    const rows = await prisma.seoEntry.findMany({ where: { noindex: true }, select: { path: true } });
    return new Set(rows.map((r) => r.path));
  } catch {
    return new Set();
  }
}

async function buildSitemapFiles(): Promise<SitemapFile[]> {
  const [hidden, settings, posts, categories, tags, caseStudies, orgs, cms] = await Promise.all([
    noindexRoutes(),
    getSeoSettings(),
    getPublishedPosts().catch(() => []),
    getTerms(TermKind.POST_CATEGORY).catch(() => []),
    getTerms(TermKind.POST_TAG).catch(() => []),
    getCaseStudyArticles().catch(() => []),
    getAccreditedOrganizations().catch(() => []),
    cmsPages(),
  ]);

  // Overrides are keyed by route path; compare public addresses.
  const hiddenUrls = new Set([...hidden].map(urlOf));
  const keep = (u: SitemapUrl) => {
    const path = u.loc.slice(SITE_URL.length) || "/";
    return !hiddenUrls.has(u.loc) && !EXCLUDED.some((x) => path.startsWith(x));
  };

  const pages: SitemapUrl[] = [...STATIC_ROUTES.map((r) => ({ loc: urlOf(r) })), ...cms];

  // Left out: image-only articles with no text (noindex), and "-2" copies of
  // an article with the same headline (their canonical is the original).
  const titleOf = new Map(posts.map((p) => [p.slug, p.title.trim().toLowerCase()]));
  const listed = posts.filter((p) => {
    if (isThinPost(p)) return false;
    const base = p.slug.replace(/-\d+$/, "");
    return base === p.slug || titleOf.get(base) !== p.title.trim().toLowerCase();
  });
  // Oldest first, so a new article only ever changes the last file.
  const byDate = [...listed].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  const postUrls: SitemapUrl[] = byDate.map((p) => ({
    loc: `${SITE_URL}${postPath(p.slug)}`,
    lastmod: day(p.modified ?? p.date),
    ...(p.coverImage ? { images: [{ loc: absolute(p.coverImage), title: p.title }] } : {}),
  }));

  const postsIn = (match: (p: (typeof posts)[number]) => boolean) => posts.filter(match);
  const categoryUrls: SitemapUrl[] = categories
    .map((c) => ({ c, list: postsIn((p) => termSlug(p.category || "News") === c.slug) }))
    .filter(({ list }) => list.length > 0)
    .map(({ c, list }) => ({ loc: urlOf(`/news/category/${c.slug}`), lastmod: day(newest(list.map((p) => p.modified ?? p.date))) }));

  const tagUrls: SitemapUrl[] = tags
    .map((t) => ({ t, list: postsIn((p) => p.tags.some((x) => termSlug(x) === t.slug)) }))
    .filter(({ list }) => list.length > 0 && list.length >= settings.tagMinPosts)
    .map(({ t, list }) => ({ loc: urlOf(`/news/tag/${t.slug}`), lastmod: day(newest(list.map((p) => p.modified ?? p.date))) }));

  const profileUrls: SitemapUrl[] = orgs.map((o) => ({
    loc: urlOf(profilePath(o)),
    ...(o.logo ? { images: [{ loc: absolute(o.logo), title: `${o.name} logo` }] } : {}),
  }));

  const caseUrls: SitemapUrl[] = caseStudies.map((a) => ({
    loc: urlOf(`/case-studies/${a.slug}`),
    lastmod: day(a.publishedAt),
    ...(a.image ? { images: [{ loc: absolute(a.image), title: a.imageAlt || a.title }] } : {}),
  }));

  const seen = new Set<string>();
  const clean = (list: SitemapUrl[]) =>
    list.filter((u) => {
      if (seen.has(u.loc) || !keep(u)) return false;
      seen.add(u.loc);
      return true;
    });

  const files: SitemapFile[] = [{ name: "page-sitemap", label: "Pages", urls: clean(pages) }];
  const postList = clean(postUrls);
  for (let i = 0; i * POSTS_PER_FILE < Math.max(postList.length, 1); i++) {
    files.push({
      name: `post-sitemap${i + 1}`,
      label: `Articles ${i * POSTS_PER_FILE + 1}–${Math.min((i + 1) * POSTS_PER_FILE, postList.length)}`,
      urls: postList.slice(i * POSTS_PER_FILE, (i + 1) * POSTS_PER_FILE),
    });
  }
  files.push(
    { name: "category-sitemap", label: "Categories", urls: clean(categoryUrls) },
    { name: "post_tag-sitemap", label: "Tags", urls: clean(tagUrls) },
    { name: "custom_box-sitemap", label: "Accredited organizations", urls: clean(profileUrls) },
    { name: "case_study-sitemap", label: "Case studies", urls: clean(caseUrls) },
  );
  return files.filter((f) => f.urls.length > 0);
}

/** Every sitemap file, cached for an hour under the "sitemap" tag. */
export const getSitemapFiles = unstable_cache(buildSitemapFiles, ["sitemap-files-v1"], {
  tags: ["sitemap"],
  revalidate: 3600,
});

/** Flat list of every listed URL (the SEO audit crawls this). */
export async function sitemapEntries(): Promise<{ url: string; lastModified?: string }[]> {
  return (await getSitemapFiles()).flatMap((f) => f.urls.map((u) => ({ url: u.loc, lastModified: u.lastmod })));
}

/* ------------------------------------------------------------------ XML */

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function sitemapIndexXml(files: SitemapFile[]): string {
  const rows = files.map((f) => {
    const lastmod = newest(f.urls.map((u) => u.lastmod));
    return `<sitemap><loc>${esc(`${SITE_URL}/${f.name}.xml`)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</sitemap>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join("\n")}\n</sitemapindex>\n`;
}

export function urlsetXml(file: SitemapFile): string {
  const rows = file.urls.map((u) => {
    const images = (u.images ?? [])
      .map((i) => `<image:image><image:loc>${esc(i.loc)}</image:loc></image:image>`)
      .join("");
    return `<url><loc>${esc(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}${images}</url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${rows.join("\n")}\n</urlset>\n`;
}
