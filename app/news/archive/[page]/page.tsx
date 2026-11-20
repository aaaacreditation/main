import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Archive from "../../Archive";
import { pageCountOf, parsePage, scopedPosts, type ArchiveScope } from "../../scope";
import { seoPage } from "@/lib/seo-overrides";

/**
 * Pages 2..N of News & Announcements: /news/archive/2 …
 *
 * URL shape: the WordPress-native `/news/page/:n` is already claimed by a
 * permanent redirect to `/news` in next.config.ts, so the paginated archive
 * lives under `/news/archive/:n` instead. Page 1 stays at the bare `/news` URL
 * and `/news/archive/1` is 404ed, so every page has exactly one canonical URL.
 */
export const revalidate = 300;

const SCOPE: ArchiveScope = { kind: "section", section: "news" };

/*
 * The old site's news archive ran to /news/page/17/ (Nov 2026 URL audit) and
 * those addresses stay real pages: past this archive's last page (it shows
 * more posts per page) they show the last page, with its canonical.
 */
const OLD_LAST_PAGE = 17;
async function shownPage(n: number): Promise<number> {
  const { posts } = await scopedPosts(SCOPE);
  const last = pageCountOf(posts.length);
  return n > last && n <= OLD_LAST_PAGE ? last : n;
}

export async function generateStaticParams() {
  const { posts } = await scopedPosts(SCOPE);
  return Array.from({ length: Math.max(0, pageCountOf(posts.length) - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const n = parsePage((await params).page);
  if (n === null || n < 2) return { title: "AAA News" };
  const { posts } = await scopedPosts(SCOPE);
  const shown = await shownPage(n);
  return seoPage({
    title: `AAA News & Announcements — Page ${shown}`,
    description: `Page ${shown} of ${pageCountOf(posts.length)} of the American Accreditation Association's news and announcements: accreditation decisions, recognitions and events, newest first.`,
    path: shown > 1 ? `/news/archive/${shown}` : "/news",
  });
}

export default async function PaginatedNews({ params }: { params: Promise<{ page: string }> }) {
  const n = parsePage((await params).page);
  if (n === null || n < 2) notFound();
  return <Archive page={await shownPage(n)} scope={SCOPE} />;
}
