import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Archive from "../../../Archive";
import { parsePage, termBySlug } from "../../../scope";
import { seoPage } from "@/lib/seo-overrides";

/**
 * One tag's posts (Nov 2026): /news/tag/{slug}, then /news/tag/{slug}/2 …
 * Tags are managed in Admin → Categories & Tags.
 */
export const revalidate = 300;

type Props = { params: Promise<{ slug: string; page?: string[] }> };

async function resolve(params: Props["params"]) {
  const { slug, page } = await params;
  if (page && page.length > 1) return null;
  const n = parsePage(page?.[0]);
  const term = n === null ? null : await termBySlug("tag", slug);
  return term && n ? { term, n } : null;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return { title: "AAA News" };
  return seoPage({
    title: `Tagged “${r.term.name}”${r.n > 1 ? ` — Page ${r.n}` : ""} | AAA News`,
    description: `Articles and announcements from the American Accreditation Association tagged ${r.term.name}: accreditation updates and guidance, newest first.`,
    path: `/news/tag/${r.term.slug}${r.n > 1 ? `/${r.n}` : ""}`,
  });
}

export default async function TagArchive({ params }: Props) {
  const r = await resolve(params);
  if (!r) notFound();
  return <Archive page={r.n} scope={{ kind: "tag", term: r.term }} />;
}
