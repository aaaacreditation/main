import { TermKind } from "@prisma/client";
import { getPublishedPosts, type PublicPost } from "@/lib/content";
import { SECTIONS, getTerms, sectionOf, termSlug, type Section, type TermRow } from "@/lib/taxonomy";
import { PER_PAGE } from "./helpers";

/**
 * What one archive page lists (Nov 2026). The Resources menu's two pages are
 * SECTIONS — News & Announcements at /news and Articles at /articles, each the
 * posts whose category belongs to it (Admin → Categories & Tags). A category
 * or tag page lists one term's posts.
 *
 * URLs:  /news, /news/archive/2 …            section "news"
 *        /articles, /articles/archive/2 …    section "articles"
 *        /news/category/{slug}, …/{slug}/2   one category
 *        /news/tag/{slug}, …/{slug}/2        one tag
 */
export type ArchiveScope =
  | { kind: "section"; section: Section }
  | { kind: "category"; term: TermRow }
  | { kind: "tag"; term: TermRow };

export function scopeBase(scope: ArchiveScope): string {
  if (scope.kind === "section") return SECTIONS[scope.section].path;
  return `/news/${scope.kind}/${scope.term.slug}`;
}

export function scopePageHref(scope: ArchiveScope, page: number): string {
  const base = scopeBase(scope);
  if (page <= 1) return base;
  return scope.kind === "section" ? `${base}/archive/${page}` : `${base}/${page}`;
}

export function inScope(scope: ArchiveScope, post: PublicPost, categories: TermRow[]): boolean {
  if (scope.kind === "section") return sectionOf(categories, post.category) === scope.section;
  if (scope.kind === "category") return termSlug(post.category || "News") === scope.term.slug;
  return post.tags.some((t) => termSlug(t) === scope.term.slug);
}

export async function scopedPosts(scope: ArchiveScope) {
  const [posts, categories] = await Promise.all([getPublishedPosts(), getTerms(TermKind.POST_CATEGORY)]);
  return { posts: posts.filter((p) => inScope(scope, p, categories)), all: posts, categories };
}

export const pageCountOf = (n: number) => Math.max(1, Math.ceil(n / PER_PAGE));

/** "2" → 2 for pages 2+; page 1 always lives at the bare URL, so "1", "01" and "0" are rejected. */
export function parsePage(raw: string | undefined): number | null {
  if (raw === undefined) return 1;
  if (!/^[1-9]\d*$/.test(raw)) return null;
  const n = Number(raw);
  if (!Number.isSafeInteger(n) || n < 2) return null;
  return n;
}

/** Look a category or tag up by its URL slug. */
export async function termBySlug(kind: "category" | "tag", slug: string): Promise<TermRow | null> {
  const terms = await getTerms(kind === "category" ? TermKind.POST_CATEGORY : TermKind.POST_TAG);
  return terms.find((t) => t.slug === slug) ?? null;
}
