import { TermKind } from "@prisma/client";
import { prisma } from "./db";
import { slugify } from "./slug";

/**
 * Admin-managed categories and tags (Nov 2026, client).
 *
 * - Blog/news CATEGORIES: each belongs to one of the two Resources pages —
 *   "News & Announcements" (/news) or "Articles" (/articles). Post.category
 *   holds the category's name.
 * - Blog/news TAGS: Post.tags holds tag names.
 * - Register TAGS: extra "Accredited as" types for organizations, next to the
 *   built-in ones (REGISTER_TYPES); Organization.tags holds the term's slug.
 *
 * Reads fall back to the starting categories (and no custom tags) when the
 * database is unreachable, like every other public getter.
 */

export type Section = "news" | "articles";

export const SECTIONS: Record<Section, { label: string; path: string; blurb: string }> = {
  news: {
    label: "News & Announcements",
    path: "/news",
    blurb: "Accreditation decisions, recognitions, partnerships and events from the American Accreditation Association.",
  },
  articles: {
    label: "Articles",
    path: "/articles",
    blurb: "Guidance and insight on accreditation, quality and standards from the AAA team.",
  },
};

export const isSection = (v: string): v is Section => v === "news" || v === "articles";

export type TermRow = { id: string; name: string; slug: string; section: Section; order: number };

/** The starting categories (same as the 20261116130000_terms migration). */
export const DEFAULT_CATEGORIES: TermRow[] = [
  ["News", "news"],
  ["Announcements", "news"],
  ["Events", "news"],
  ["Accreditation", "articles"],
  ["Healthcare", "articles"],
  ["Training Providers", "articles"],
  ["Services", "articles"],
  ["Insights", "articles"],
].map(([name, section], order) => ({
  id: `term-cat-${slugify(name)}`,
  name,
  slug: slugify(name),
  section: section as Section,
  order,
}));

const DB_RETRY_MS = 60_000;
let dbDownUntil = 0;

export async function getTerms(kind: TermKind): Promise<TermRow[]> {
  const fallback = kind === TermKind.POST_CATEGORY ? DEFAULT_CATEGORIES : [];
  if (!process.env.DATABASE_URL || Date.now() < dbDownUntil) return fallback;
  try {
    const rows = await prisma.term.findMany({ where: { kind }, orderBy: [{ order: "asc" }, { name: "asc" }] });
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      section: isSection(r.section) ? r.section : "news",
      order: r.order,
    }));
  } catch (err) {
    console.error(`getTerms(${kind}): falling back —`, err);
    dbDownUntil = Date.now() + DB_RETRY_MS;
    return fallback;
  }
}

/** Same key the database's unique index uses, so "Health care" and "health-care" are one term. */
export const termSlug = (name: string) => slugify(name.trim());

/** Comma-separated input → distinct, trimmed names (first spelling wins). */
export function parseNames(raw: string, max = 30): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const part of raw.split(",")) {
    const name = part.trim().replace(/\s+/g, " ").slice(0, 60);
    if (!name) continue;
    const key = termSlug(name);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(name);
    if (out.length >= max) break;
  }
  return out;
}

/**
 * Make sure each name exists as a term of `kind`; returns the stored names (an
 * existing term keeps its spelling). New terms go to the end of the list.
 */
export async function ensureTerms(kind: TermKind, names: string[], section: Section = "news"): Promise<TermRow[]> {
  if (names.length === 0) return [];
  const existing = await prisma.term.findMany({ where: { kind } });
  const bySlug = new Map(existing.map((t) => [t.slug, t]));
  let next = existing.reduce((m, t) => Math.max(m, t.order), -1) + 1;
  const out: TermRow[] = [];
  for (const name of names) {
    const slug = termSlug(name);
    let row = bySlug.get(slug);
    if (!row) {
      row = await prisma.term.upsert({
        where: { kind_slug: { kind, slug } },
        create: { kind, name, slug, section, order: next++ },
        update: {},
      });
      bySlug.set(slug, row);
    }
    out.push({ id: row.id, name: row.name, slug: row.slug, section: isSection(row.section) ? row.section : "news", order: row.order });
  }
  return out;
}

/** Category lookup by name, case-insensitively (Post.category is free text from the old site). */
export function categoryFor(categories: TermRow[], name: string): TermRow | undefined {
  const slug = termSlug(name || "News");
  return categories.find((c) => c.slug === slug);
}

/** The section a post belongs to: its category's, or News for an unknown category. */
export function sectionOf(categories: TermRow[], category: string): Section {
  return categoryFor(categories, category)?.section ?? "news";
}
