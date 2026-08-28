import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Archive from "../../Archive";
import { PER_PAGE } from "../../helpers";
import { getPublishedPosts } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

/**
 * Pages 2..N of the newsroom archive: /news/archive/2 … /news/archive/15.
 *
 * URL shape: the WordPress-native `/news/page/:n` is already claimed by a
 * permanent redirect to `/news` in next.config.ts (owned elsewhere), so the
 * paginated archive lives under `/news/archive/:n` instead. Page 1 stays at the
 * bare `/news` URL and `/news/archive/1` is 404ed, so every page of results has
 * exactly one canonical URL.
 */
export const revalidate = 300;

function parsePage(raw: string): number | null {
  if (!/^[1-9]\d*$/.test(raw)) return null; // no leading zeros, no "0"
  const n = Number(raw);
  if (!Number.isSafeInteger(n) || n < 2) return null; // page 1 lives at bare /news
  return n;
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  const pageCount = Math.max(1, Math.ceil(posts.length / PER_PAGE));
  return Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await params;
  const n = parsePage(page);
  if (n === null) return { title: "AAA News" };

  const posts = await getPublishedPosts();
  const pageCount = Math.max(1, Math.ceil(posts.length / PER_PAGE));

  return pageMeta({
    title: `AAA News Archive — Page ${n}`,
    description: `Page ${n} of ${pageCount} in the American Accreditation Association news archive: accreditation announcements, recognitions and standards guidance, newest first.`,
    path: `/news/archive/${n}`,
  });
}

export default async function PaginatedNews({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const n = parsePage(page);
  if (n === null) notFound();
  return <Archive page={n} />;
}
