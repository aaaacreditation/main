import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Archive from "../../../news/Archive";
import { pageCountOf, parsePage, scopedPosts, type ArchiveScope } from "../../../news/scope";
import { seoPage } from "@/lib/seo-overrides";

/** Pages 2..N of Articles: /articles/archive/2 … (page 1 is /articles). */
export const revalidate = 300;

const SCOPE: ArchiveScope = { kind: "section", section: "articles" };

export async function generateStaticParams() {
  const { posts } = await scopedPosts(SCOPE);
  return Array.from({ length: Math.max(0, pageCountOf(posts.length) - 1) }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const n = parsePage((await params).page);
  if (n === null || n < 2) return { title: "AAA Articles" };
  const { posts } = await scopedPosts(SCOPE);
  return seoPage({
    title: `AAA Articles — Page ${n}`,
    description: `Page ${n} of ${pageCountOf(posts.length)} of the American Accreditation Association's articles on accreditation, quality and standards, newest first.`,
    path: `/articles/archive/${n}`,
  });
}

export default async function PaginatedArticles({ params }: { params: Promise<{ page: string }> }) {
  const n = parsePage((await params).page);
  if (n === null || n < 2) notFound();
  return <Archive page={n} scope={SCOPE} />;
}
