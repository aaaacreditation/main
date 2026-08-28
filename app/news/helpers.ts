import type { PublicPost } from "@/lib/content";
import { looksLikeHtml } from "@/lib/mdish";

/**
 * Shared newsroom helpers used by the archive, the paginated archive pages and
 * the single-post template.
 *
 * The 299 migrated WordPress posts are stored in two shapes — markdown-ish
 * plain text and admin-authored HTML — and 65 of them carry no excerpt at all,
 * so every summary/description on this section has to be derived defensively.
 */

/** Posts per archive page. 299 posts / 20 = the same 15 pages the live site has. */
export const PER_PAGE = 20;

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/** Formats "2026-06-12T11:25:20" as "June 12, 2026" (no timezone drift). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** Short form for dense card rails: "12 Jun 2026". */
export function formatDateShort(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1].slice(0, 3)} ${y}`;
}

/** "2026-06-12T11:25:20" → "2026-06-12", the value schema.org wants. */
export function isoDate(iso: string): string {
  return iso.slice(0, 10);
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "\u2026",
  mdash: "\u2014",
  ndash: "\u2013",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201c",
  rdquo: "\u201d",
  bull: "\u2022",
  deg: "\u00b0",
  eacute: "\u00e9",
  ouml: "\u00f6",
  uuml: "\u00fc",
  reg: "\u00ae",
  copy: "\u00a9",
  trade: "\u2122",
};

/** Decodes the HTML entities that survive in migrated WordPress excerpts. */
function decodeEntities(text: string): string {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex: string) =>
      String.fromCodePoint(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_m, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&([a-z]+);/gi, (m, name: string) => NAMED_ENTITIES[name.toLowerCase()] ?? m);
}

/**
 * Strips HTML tags / markdown-ish markers down to readable prose.
 *
 * Entities are always decoded, not only on HTML-shaped content: WordPress
 * excerpts arrive as plain text that still contains `&hellip;`, `&#8217;` and
 * friends, and the trailing "[…]" WordPress appends to auto-excerpts is dropped
 * so it never surfaces in a card or a meta description.
 */
export function toPlainText(content: string): string {
  let text = content ?? "";
  if (looksLikeHtml(text)) {
    text = text.replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ");
  } else {
    text = text
      .replace(/^#{1,6}\s+/gm, "")
      .replace(/^[-*]\s+/gm, "")
      .replace(/^\d+[.)]\s+/gm, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/\*\*([^*]+)\*\*/g, "$1");
  }
  return decodeEntities(text)
    .replace(/\s+/g, " ")
    .replace(/\s*\[\s*(?:\u2026|\.\.\.|&hellip;)\s*\]\s*$/i, "")
    .trim();
}

/** Truncates on a word boundary and appends an ellipsis. */
export function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s.,;:—-]+$/, "")}…`;
}

/**
 * A card-length summary: the post's own excerpt where it has one, otherwise the
 * opening of its body text. Never invents copy.
 */
export function summarize(post: PublicPost, max = 190): string {
  const excerpt = toPlainText(post.excerpt ?? "");
  const source = excerpt || toPlainText(post.content ?? "");
  if (!source) return "";
  return clamp(source, max);
}

/**
 * A meta-description-length summary (120–160 chars where the source allows it),
 * padded with the site's standard newsroom framing when a post is too short to
 * fill it on its own.
 */
export function metaDescription(post: PublicPost): string {
  const base = summarize(post, 158);
  if (base.length >= 110) return base;
  const suffix = " — an update from the American Accreditation Association newsroom.";
  return clamp(`${base.replace(/[.\s]+$/, "")}${suffix}`, 158);
}

/** Rough reading time from the body text, floored at one minute. */
export function readingTime(content: string): number {
  const words = toPlainText(content).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * Builds the archive URL for a 1-based page number.
 *
 * Page 1 is the bare `/news`; pages 2+ live at `/news/archive/2` … The legacy
 * WordPress shape (`/news/page/2`) is claimed by a permanent redirect to
 * `/news` in next.config.ts, so it cannot serve results.
 */
export function pageHref(page: number): string {
  return page <= 1 ? "/news" : `/news/archive/${page}`;
}

/**
 * Pagination model: first, last, and a window around the current page, with
 * `null` standing in for an elided run.
 */
export function pageWindow(current: number, total: number): (number | null)[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out = new Set<number>([1, total, current]);
  for (let d = 1; d <= 1; d++) {
    if (current - d > 1) out.add(current - d);
    if (current + d < total) out.add(current + d);
  }
  if (current <= 3) [2, 3, 4].forEach((n) => n < total && out.add(n));
  if (current >= total - 2) [total - 3, total - 2, total - 1].forEach((n) => n > 1 && out.add(n));

  const sorted = [...out].sort((a, b) => a - b);
  const withGaps: (number | null)[] = [];
  sorted.forEach((n, i) => {
    if (i > 0 && n - sorted[i - 1] > 1) withGaps.push(null);
    withGaps.push(n);
  });
  return withGaps;
}
