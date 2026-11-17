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

export async function generateStaticParams() {
  const { posts } = await scopedPosts(SCOPE);
  return Array.from({ length: Math.max(0, pageCountOf(posts.length) - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const n = parsePage((await params).page);
  if (n === null || n < 2) return { title: "AAA News" };
  const { posts } = await scopedPosts(SCOPE);
  return seoPage({
    title: `AAA News & Announcements — Page ${n}`,
    description: `Page ${n} of ${pageCountOf(posts.length)} of the American Accreditation Association's news and announcements: accreditation decisions, recognitions and events, newest first.`,
    path: `/news/archive/${n}`,
  });
}

export default async function PaginatedNews({ params }: { params: Promise<{ page: string }> }) {
  const n = parsePage((await params).page);
  if (n === null || n < 2) notFound();
  return <Archive page={n} scope={SCOPE} />;
}
