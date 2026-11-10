import { cache } from "react";
import { ContentStatus, type CaseStudy as CaseStudyRow } from "@prisma/client";
import { prisma } from "./db";
import type { SuccessStory } from "@/app/_components/home/SuccessCarousel";
import { HOME_STORIES } from "@/app/_data/home-stories";
import { CASE_STUDIES, type CaseStudy } from "@/app/_data/case-studies";
import articlesJson from "@/app/_data/case-study-articles.json";
import { PAGE_CASE_STUDIES, type PageCaseStudySeed, type ProgramPageKey } from "@/app/_data/page-case-studies";

/**
 * Public access to the Case Studies / Success Stories admin module.
 *
 * The CaseStudy table holds separate rows per placement (home carousel vs SME
 * page) because the client supplied different wording for each. Both getters
 * fall back to the bundled snapshots in app/_data/ only when the database
 * query throws — an empty result is a legitimate admin choice and renders as
 * empty. After a failure the database is skipped for 60 s in this process, so
 * a build or preview without a reachable database doesn't wait on every page.
 */

const DB_RETRY_MS = 60_000;
let dbDownUntil = 0;

function dbAvailable(): boolean {
  return Boolean(process.env.DATABASE_URL) && Date.now() >= dbDownUntil;
}

function markDbDown(where: string, err: unknown) {
  dbDownUntil = Date.now() + DB_RETRY_MS;
  console.error(`${where}: database unavailable, using bundled case studies —`, err);
}

/**
 * Image sources next/image can render with the current next.config.ts:
 * site-relative paths without a query string (bundled /case-studies files and
 * admin uploads under /media/), or the hosts listed in `images.remotePatterns`.
 * Anything else would fail inside next/image, so the admin rejects it on save
 * and the getters drop it defensively.
 */
const IMAGE_HOSTS = new Set(["aaa-accreditation.org", "www.aaa-accreditation.org"]);

export function isAllowedImageSrc(src: string | null | undefined): boolean {
  if (!src) return false;
  if (src.startsWith("/")) return !src.startsWith("//") && !/[?#]/.test(src);
  try {
    const u = new URL(src);
    return u.protocol === "https:" && IMAGE_HOSTS.has(u.hostname);
  } catch {
    return false;
  }
}

const orderBy = [{ order: "asc" as const }, { createdAt: "asc" as const }];

function toSuccessStory(r: CaseStudyRow): SuccessStory {
  return {
    name: r.name,
    sector: r.sector,
    country: r.country,
    quote: r.quote,
    img: r.image as string,
    alt: r.imageAlt,
    imgPosition: r.imagePosition || undefined,
    logo: r.logo as string,
    logoTight: r.logoTight || undefined,
    video: r.videoUrl || undefined,
    href: r.link ? caseStudyHref(r.link) : undefined,
    metric: r.metric || undefined,
    featured: r.featured || undefined,
  };
}

function toSmeCaseStudy(r: CaseStudyRow): CaseStudy {
  return {
    name: r.name,
    sector: r.sector,
    country: r.country,
    metric: r.metric,
    quote: r.quote,
    img: r.image as string,
    logo: isAllowedImageSrc(r.logo) ? (r.logo as string) : undefined,
    desc: r.description || undefined,
    initials: r.initials,
  };
}

/** Home "Success Stories" carousel: published rows with "Show on home". */
export async function getHomeStories(): Promise<SuccessStory[]> {
  if (!dbAvailable()) return HOME_STORIES;
  try {
    const rows = await prisma.caseStudy.findMany({
      where: { status: ContentStatus.PUBLISHED, showOnHome: true },
      orderBy,
    });
    // The home card renders the photo and the logo plate unconditionally.
    return rows
      .filter((r) => isAllowedImageSrc(r.image) && isAllowedImageSrc(r.logo))
      .map(toSuccessStory);
  } catch (err) {
    markDbDown("getHomeStories", err);
    return HOME_STORIES;
  }
}

/** SME Accreditation page story marquee: published rows with "Show on SME page". */
export async function getSmeCaseStudies(): Promise<CaseStudy[]> {
  if (!dbAvailable()) return CASE_STUDIES;
  try {
    const rows = await prisma.caseStudy.findMany({
      where: { status: ContentStatus.PUBLISHED, showOnSme: true },
      orderBy,
    });
    // The SME card renders its certificate photo unconditionally; the logo is optional.
    return rows.filter((r) => isAllowedImageSrc(r.image)).map(toSmeCaseStudy);
  } catch (err) {
    markDbDown("getSmeCaseStudies", err);
    return CASE_STUDIES;
  }
}

/* ------------------------------------------------------------- articles */

/**
 * Full case-study articles, public at /case-studies and /case-studies/{slug}
 * (Nov 2026). Imported from the retired casestudies.aaa-accreditation.org app
 * by scripts/import-case-studies.mjs into app/_data/case-study-articles.json,
 * which seeds the table and is the fallback when the database throws. In the
 * table, a row is an article when its `body` is non-empty; the home and SME
 * card rows have no body and no page.
 */
export type CaseStudyArticle = {
  slug: string;
  name: string;
  title: string;
  subtitle: string;
  excerpt: string;
  sector: string;
  country: string;
  scope: string;
  website: string | null;
  image: string | null;
  imageAlt: string;
  logo: string | null;
  videoUrl: string | null;
  featured: boolean;
  /** ISO date. */
  publishedAt: string;
  /** Article HTML (admin editor output). */
  body: string;
};

const BUNDLED_ARTICLES = articlesJson as CaseStudyArticle[];

/**
 * Links to the retired case-studies site (its domain and its Vercel alias)
 * resolve to this site's own pages, so rows saved with the old URLs — in the
 * database or the bundled snapshots — need no hand-editing.
 */
export function caseStudyHref(link: string): string {
  const m = link
    .trim()
    .match(/^https?:\/\/casestudies(?:-alpha\.vercel\.app|\.aaa-accreditation\.org)(\/case-studies\/[\w-]+)?\/?$/i);
  if (!m) return link;
  return m[1] ?? "/case-studies";
}

function toArticle(r: CaseStudyRow): CaseStudyArticle {
  return {
    slug: r.slug,
    name: r.name,
    title: r.title || r.name,
    subtitle: r.subtitle,
    excerpt: r.excerpt,
    sector: r.sector,
    country: r.country,
    scope: r.scope,
    website: r.website,
    image: isAllowedImageSrc(r.image) ? r.image : null,
    imageAlt: r.imageAlt,
    logo: isAllowedImageSrc(r.logo) ? r.logo : null,
    videoUrl: r.videoUrl,
    featured: r.featured,
    publishedAt: (r.publishedAt ?? r.createdAt).toISOString(),
    body: r.body,
  };
}

/** Published articles, newest first. Deduplicated per request (metadata + page share one query). */
export const getCaseStudyArticles = cache(async (): Promise<CaseStudyArticle[]> => {
  if (!dbAvailable()) return BUNDLED_ARTICLES;
  try {
    const rows = await prisma.caseStudy.findMany({
      where: { status: ContentStatus.PUBLISHED, NOT: { body: "" } },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    });
    return rows.map(toArticle);
  } catch (err) {
    markDbDown("getCaseStudyArticles", err);
    return BUNDLED_ARTICLES;
  }
});

export async function getCaseStudyArticle(slug: string): Promise<CaseStudyArticle | null> {
  return (await getCaseStudyArticles()).find((a) => a.slug === slug) ?? null;
}

/* -------------------------------------------------------- program pages */

/**
 * Case-study cards on the program pages (TEPA, Healthcare, CAB — Nov 2026):
 * rows ticked for a page under "Show on program pages" in the admin, in
 * their order. Each links to its full case study: the row's story link, or
 * its own page when the row is itself an article.
 */
export type PageCaseStudy = {
  name: string;
  sector: string;
  country: string;
  /** TEPA: " · "-separated figures; Healthcare: the theme tag. */
  metric: string;
  quote: string;
  quoteBy: string;
  description: string;
  image: string | null;
  imageAlt: string;
  videoId: string | null;
  href: string | null;
};

export function youTubeId(url: string | null | undefined): string | null {
  const m = String(url ?? "").match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

type PageCardSource = Omit<PageCaseStudySeed, "pages" | "order" | "image"> & { image: string | null; body?: string };

function toPageCaseStudy(r: PageCardSource): PageCaseStudy {
  return {
    name: r.name,
    sector: r.sector,
    country: r.country,
    metric: r.metric,
    quote: r.quote,
    quoteBy: r.quoteBy,
    description: r.description,
    image: isAllowedImageSrc(r.image) ? r.image : null,
    imageAlt: r.imageAlt,
    videoId: youTubeId(r.videoUrl),
    href: r.link ? caseStudyHref(r.link) : r.body ? `/case-studies/${r.slug}` : null,
  };
}

export async function getPageCaseStudies(page: ProgramPageKey): Promise<PageCaseStudy[]> {
  const bundled = PAGE_CASE_STUDIES.filter((s) => s.pages.includes(page))
    .sort((a, b) => a.order - b.order)
    .map(toPageCaseStudy);
  if (!dbAvailable()) return bundled;
  try {
    const rows = await prisma.caseStudy.findMany({
      where: { status: ContentStatus.PUBLISHED, pages: { has: page } },
      orderBy,
    });
    return rows.map(toPageCaseStudy);
  } catch (err) {
    markDbDown("getPageCaseStudies", err);
    return bundled;
  }
}

/** "Brenda Rocha, CEO, Monarch Master Injectors" → name + role. */
export function splitQuoteBy(quoteBy: string): { name: string; role: string } {
  const i = quoteBy.indexOf(",");
  return i < 0 ? { name: quoteBy.trim(), role: "" } : { name: quoteBy.slice(0, i).trim(), role: quoteBy.slice(i + 1).trim() };
}

/** "500+ Students Certified · 7 New Courses" → [{ v: "500+", k: "Students Certified" }, { v: "7", k: "New Courses" }]. */
export function metricStats(metric: string): { v: string; k: string }[] {
  return metric
    .split("·")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((seg) => {
      const i = seg.indexOf(" ");
      return i < 0 ? { v: seg, k: "" } : { v: seg.slice(0, i), k: seg.slice(i + 1).trim() };
    });
}
