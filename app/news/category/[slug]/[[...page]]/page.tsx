import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Archive from "../../../Archive";
import { parsePage, termBySlug } from "../../../scope";
import { SECTIONS } from "@/lib/taxonomy";
import { seoPage } from "@/lib/seo-overrides";

/**
 * One category's posts (Nov 2026): /news/category/{slug}, then
 * /news/category/{slug}/2 … Categories are managed in Admin → Categories & Tags;
 * a page renders on first request and is cached like the rest of the archive.
 */
export const revalidate = 300;

type Props = { params: Promise<{ slug: string; page?: string[] }> };

async function resolve(params: Props["params"]) {
  const { slug, page } = await params;
  if (page && page.length > 1) return null;
  const n = parsePage(page?.[0]);
  const term = n === null ? null : await termBySlug("category", slug);
  return term && n ? { term, n } : null;
}

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = await resolve(params);
  if (!r) return { title: "AAA News" };
  const path = `/news/category/${r.term.slug}${r.n > 1 ? `/${r.n}` : ""}`;
  return seoPage({
    title: `${r.term.name}${r.n > 1 ? ` — Page ${r.n}` : ""} | AAA ${SECTIONS[r.term.section].label}`,
    description: `${SECTIONS[r.term.section].label} from the American Accreditation Association in the ${r.term.name} category: accreditation updates, guidance and milestones, newest first.`,
    path,
  });
}

export default async function CategoryArchive({ params }: Props) {
  const r = await resolve(params);
  if (!r) notFound();
  return <Archive page={r.n} scope={{ kind: "category", term: r.term }} />;
}
