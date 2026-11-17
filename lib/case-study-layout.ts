/**
 * Case study page builder (Nov 2026, client): a case study's article is a list
 * of SECTIONS, each a row of 1–3 COLUMNS holding BLOCKS (text, image, video,
 * quote) that staff arrange by drag and drop in the admin.
 *
 * Stored as JSON in CaseStudy.layout. CaseStudy.body is kept in step (an HTML
 * rendering of the same content, see `layoutToHtml`) because everything else —
 * "a row with a body is an article", search snippets, the no-database fallback —
 * reads the body. Shared by the admin builder (client), the save action
 * (validation) and the public page (rendering), so it imports nothing server-only.
 */

export const LAYOUTS = {
  "1": { label: "1 column", cols: [1] },
  "1-1": { label: "2 columns", cols: [1, 1] },
  "2-1": { label: "Wide + narrow", cols: [2, 1] },
  "1-2": { label: "Narrow + wide", cols: [1, 2] },
  "1-1-1": { label: "3 columns", cols: [1, 1, 1] },
} as const;
export type LayoutKey = keyof typeof LAYOUTS;
export const isLayoutKey = (v: unknown): v is LayoutKey => typeof v === "string" && Object.hasOwn(LAYOUTS, v);

export const BACKGROUNDS = {
  white: "White",
  cream: "Light tint",
  navy: "Navy",
} as const;
export type Background = keyof typeof BACKGROUNDS;
const isBackground = (v: unknown): v is Background => typeof v === "string" && Object.hasOwn(BACKGROUNDS, v);

export type TextBlock = { id: string; type: "text"; html: string };
export type ImageBlock = { id: string; type: "image"; src: string; alt: string; caption: string };
export type VideoBlock = { id: string; type: "video"; url: string; caption: string };
export type QuoteBlock = { id: string; type: "quote"; text: string; by: string };
export type Block = TextBlock | ImageBlock | VideoBlock | QuoteBlock;
export type BlockType = Block["type"];

export const BLOCK_LABELS: Record<BlockType, string> = {
  text: "Text",
  image: "Image",
  video: "Video",
  quote: "Quote",
};

export type LayoutSection = { id: string; layout: LayoutKey; background: Background; columns: Block[][] };
export type CaseStudyLayout = { v: 1; sections: LayoutSection[] };

const MAX_SECTIONS = 40;
const MAX_BLOCKS_PER_COLUMN = 30;
const MAX_HTML = 200_000;

let seq = 0;
/** Short unique id for a new section or block. */
export function newId(prefix: string): string {
  seq += 1;
  return `${prefix}${Date.now().toString(36)}${seq.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export function emptyBlock(type: BlockType): Block {
  const id = newId("b");
  if (type === "image") return { id, type, src: "", alt: "", caption: "" };
  if (type === "video") return { id, type, url: "", caption: "" };
  if (type === "quote") return { id, type, text: "", by: "" };
  return { id, type: "text", html: "" };
}

export function emptySection(layout: LayoutKey = "1"): LayoutSection {
  return {
    id: newId("s"),
    layout,
    background: "white",
    columns: LAYOUTS[layout].cols.map(() => [] as Block[]),
  };
}

/** The 11-character id of a YouTube watch / short / embed link, or null. */
export function youTubeId(url: string): string | null {
  const m = url
    .trim()
    .match(/^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})(?:[?&#/].*)?$/i);
  return m ? m[1] : null;
}

/** Images: a site path (/media/…, /images/…) or an https URL. */
export function isSafeImageSrc(src: string): boolean {
  if (src.startsWith("/")) return !src.startsWith("//") && !/\s/.test(src);
  try {
    const u = new URL(src);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** An imported or older case study (body HTML only) opened in the builder: one section, one text block. */
export function layoutFromBody(body: string): CaseStudyLayout {
  const section = emptySection("1");
  if (body.trim()) section.columns[0].push({ id: newId("b"), type: "text", html: body });
  return { v: 1, sections: [section] };
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : "");
const id = (v: unknown, prefix: string) =>
  typeof v === "string" && /^[\w-]{1,40}$/.test(v) ? v : newId(prefix);

function parseBlock(raw: unknown): Block | null {
  if (!raw || typeof raw !== "object") return null;
  const b = raw as Record<string, unknown>;
  const bid = id(b.id, "b");
  switch (b.type) {
    case "text":
      return { id: bid, type: "text", html: str(b.html, MAX_HTML) };
    case "image": {
      const src = str(b.src, 600).trim();
      return { id: bid, type: "image", src: src && isSafeImageSrc(src) ? src : "", alt: str(b.alt, 300), caption: str(b.caption, 500) };
    }
    case "video": {
      const url = str(b.url, 500).trim();
      return { id: bid, type: "video", url: youTubeId(url) ? url : "", caption: str(b.caption, 500) };
    }
    case "quote":
      return { id: bid, type: "quote", text: str(b.text, 2000), by: str(b.by, 200) };
    default:
      return null;
  }
}

/**
 * Validate stored or submitted JSON. Unknown block types, unsafe image
 * sources and non-YouTube video links are dropped; a section always has as
 * many columns as its layout. Returns null for anything that is not a layout.
 */
export function parseLayout(raw: unknown): CaseStudyLayout | null {
  let data = raw;
  if (typeof data === "string") {
    if (!data.trim()) return null;
    try {
      data = JSON.parse(data);
    } catch {
      return null;
    }
  }
  if (!data || typeof data !== "object" || !Array.isArray((data as { sections?: unknown }).sections)) return null;
  const sections: LayoutSection[] = [];
  for (const rs of (data as { sections: unknown[] }).sections.slice(0, MAX_SECTIONS)) {
    if (!rs || typeof rs !== "object") continue;
    const s = rs as Record<string, unknown>;
    const layout = isLayoutKey(s.layout) ? s.layout : "1";
    const width = LAYOUTS[layout].cols.length;
    const rawCols = Array.isArray(s.columns) ? s.columns : [];
    const columns: Block[][] = Array.from({ length: width }, (_, i) =>
      (Array.isArray(rawCols[i]) ? (rawCols[i] as unknown[]) : [])
        .slice(0, MAX_BLOCKS_PER_COLUMN)
        .map(parseBlock)
        .filter((b): b is Block => b !== null)
    );
    // Blocks from columns beyond the layout's width are kept in its last column.
    for (const extra of rawCols.slice(width)) {
      if (!Array.isArray(extra)) continue;
      columns[width - 1].push(...extra.map(parseBlock).filter((b): b is Block => b !== null));
    }
    sections.push({ id: id(s.id, "s"), layout, background: isBackground(s.background) ? s.background : "white", columns });
  }
  return { v: 1, sections };
}

/** True when nothing in the layout would render. */
export function layoutIsEmpty(layout: CaseStudyLayout): boolean {
  return !layout.sections.some((s) => s.columns.some((c) => c.some((b) => !blockIsEmpty(b))));
}

export function blockIsEmpty(b: Block): boolean {
  if (b.type === "text") return !b.html.replace(/<p>\s*<\/p>/g, "").replace(/<[^>]+>/g, "").trim() && !/<(img|table|iframe)\b/i.test(b.html);
  if (b.type === "image") return !b.src;
  if (b.type === "video") return !youTubeId(b.url);
  return !b.text.trim();
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/**
 * The layout as plain article HTML, stored in CaseStudy.body: text blocks as
 * written, images as figures, videos as a YouTube link alone in a paragraph
 * (which the article renderer turns into a player), quotes as blockquotes.
 * A layout that is a single text block returns that block's HTML unchanged.
 */
export function layoutToHtml(layout: CaseStudyLayout): string {
  const parts: string[] = [];
  for (const s of layout.sections) {
    for (const col of s.columns) {
      for (const b of col) {
        if (blockIsEmpty(b)) continue;
        if (b.type === "text") parts.push(b.html);
        else if (b.type === "image")
          parts.push(
            `<figure><img src="${esc(b.src)}" alt="${esc(b.alt)}">${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure>`
          );
        else if (b.type === "video") {
          const vid = youTubeId(b.url)!;
          parts.push(`<p><a href="https://www.youtube.com/watch?v=${vid}">https://www.youtube.com/watch?v=${vid}</a></p>`);
          if (b.caption) parts.push(`<p><em>${esc(b.caption)}</em></p>`);
        } else
          parts.push(`<blockquote><p>${esc(b.text)}</p>${b.by ? `<p>— ${esc(b.by)}</p>` : ""}</blockquote>`);
      }
    }
  }
  return parts.join("\n");
}
