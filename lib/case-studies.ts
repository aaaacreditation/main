import { ContentStatus, type CaseStudy as CaseStudyRow } from "@prisma/client";
import { prisma } from "./db";
import type { SuccessStory } from "@/app/_components/home/SuccessCarousel";
import { HOME_STORIES } from "@/app/_data/home-stories";
import { CASE_STUDIES, type CaseStudy } from "@/app/_data/case-studies";

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
    href: r.link || undefined,
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
