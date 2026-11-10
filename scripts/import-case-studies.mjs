/**
 * Import the case studies from casestudies.aaa-accreditation.org — the
 * separate "casestudies" Next.js app (repo aaaacreditation/casestudies, its
 * own Postgres + Cloudinary) — into this site (Nov 2026, client).
 *
 * Reads the app's public list API, converts each published case study to the
 * shape of this site's CaseStudy table and writes the bundled snapshot
 * app/_data/case-study-articles.json (the seed, and the fallback when the
 * database is unreachable). Every image — cover, logo and the ones inside the
 * article — is downloaded from Cloudinary and saved locally as WebP in
 * public/images/site/case-studies/{slug}/; existing files are kept, so
 * re-runs are cheap.
 *
 * The article body becomes HTML the admin editor (TipTap) can round-trip:
 *   - the source's "page builder" sections are flattened to one column
 *     (two-column image|text rows become image, then text);
 *   - title blocks step down one level (the page title is the h1) — h2…h4;
 *   - markdown text (bold, italics, "•" / "-" / numbered lists, nested "o"
 *     items, pipe tables, the odd <br>) becomes p / ul / ol / table;
 *   - a YouTube video becomes a paragraph holding only its link, which the
 *     public page renders as a player.
 * Wording is the source's own — nothing is rewritten or corrected.
 *
 * Run:  node scripts/import-case-studies.mjs [--file saved-api.json] [--dry]
 * Then: npm run db:seed   (creates missing slugs; never overwrites admin edits)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const API = "https://casestudies.aaa-accreditation.org/api/case-studies";
const OUT = new URL("../app/_data/case-study-articles.json", import.meta.url);
const IMG_DIR = new URL("../public/images/site/case-studies/", import.meta.url);
const IMG_URL = "/images/site/case-studies";
const DRY = process.argv.includes("--dry");
const fileArg = process.argv.indexOf("--file");
const MAX_W = 1600;

/* --------------------------------------------------------------- helpers */

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** "•\tTraining & Education Provider •\tHealthcare" → "Training & Education Provider · Healthcare". */
const cleanList = (s) =>
  (s ?? "")
    .split(/[•\n]|(?:^|\s)-\t/)
    .map((x) => x.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join(" · ");

const clean = (s) => (s ?? "").replace(/\s+/g, " ").trim();

function youTubeId(url) {
  const m = String(url).match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/);
  return m ? m[1] : null;
}

/** Inline markdown → HTML on an already-escaped string. */
function inline(text) {
  let s = esc(text);
  s = s.replace(/&lt;br\s*\/?&gt;/gi, "<br>");
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2">$1</a>');
  s = s.replace(/\*\*([\s\S]+?)\*\*/g, (_, t) => `<strong>${t.trim()}</strong>`);
  s = s.replace(/(^|[^*\w])\*(?!\s)([^*\n]+?)\*(?![*\w])/g, "$1<em>$2</em>");
  // Whatever asterisks remain are unpaired markup from the source editor, not wording.
  return s.replace(/\*+/g, "").trim();
}

// Bullets pasted from Word arrive as "•", or as a Wingdings letter plus a tab
// ("o" = sub-item, "v" = check, "Ø"/"§" arrows/squares).
const LIST_RE = /^(\s*)(•|[ovØ§▪➢](?=\t)|[-*](?=\s)|\d+[.)])\s+(.*)$/;

/** Markdown-ish text block → p / ul / ol / table HTML. */
function textToHtml(raw) {
  const lines = raw
    .replace(/\r\n?/g, "\n")
    .replace(/[​ ]/g, " ")
    // A bullet run on after text ("Key Benefits: •\tElevated…") starts its own line.
    .replace(/([^\n])[ \t]*(•|[vØ§▪➢](?=\t))[ \t]+/g, "$1\n$2\t")
    .split("\n");
  const out = [];
  let para = [];
  let list = null; // { tag, items: [{ html, sub: string[] }] }

  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };
  const flushList = () => {
    if (!list) return;
    const items = list.items
      .map((it) => `<li><p>${it.html}</p>${it.sub.length ? `<ul>${it.sub.map((x) => `<li><p>${x}</p></li>`).join("")}</ul>` : ""}</li>`)
      .join("");
    out.push(`<${list.tag}>${items}</${list.tag}>`);
    list = null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) {
      flushPara();
      // A blank line between two items of the same list keeps the list open.
      const next = lines.slice(i + 1).find((l) => l.trim());
      if (list && !(next && LIST_RE.test(next))) flushList();
      continue;
    }

    if (/^\s*\|/.test(line)) {
      flushPara();
      flushList();
      const rows = [];
      for (; i < lines.length && /^\s*\|/.test(lines[i]); i++) rows.push(lines[i]);
      i--;
      const cells = rows
        .filter((r) => !/^\s*\|?[\s:|-]+\|?\s*$/.test(r)) // separator row
        .map((r) => r.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => inline(c.trim())));
      const width = Math.max(...cells.map((r) => r.length));
      const tr = (r, tag) =>
        `<tr>${Array.from({ length: width }, (_, k) => `<${tag}><p>${r[k] ?? ""}</p></${tag}>`).join("")}</tr>`;
      out.push(`<table><tbody>${cells.map((r, k) => tr(r, k === 0 ? "th" : "td")).join("")}</tbody></table>`);
      continue;
    }

    const m = line.match(LIST_RE);
    if (m) {
      flushPara();
      const [, indent, marker, body] = m;
      const nested = indent.replace(/\t/g, "  ").length >= 2 || marker === "o";
      if (nested && list?.items.length) {
        list.items[list.items.length - 1].sub.push(inline(body));
        continue;
      }
      const tag = /^\d/.test(marker) ? "ol" : "ul";
      if (list && list.tag !== tag) flushList();
      list ??= { tag, items: [] };
      list.items.push({ html: inline(body), sub: [] });
      continue;
    }

    flushList();
    para.push(line.trim());
  }
  flushPara();
  flushList();
  return out.join("\n");
}

/* ---------------------------------------------------------------- images */

let downloaded = 0;
let kept = 0;
const bytesOut = { total: 0 };

/** Downloads a Cloudinary image (pre-scaled server-side) and saves it as WebP. */
async function localImage(url, slug, name) {
  if (!url) return null;
  const dir = new URL(`${slug}/`, IMG_DIR);
  const file = new URL(`${name}.webp`, dir);
  const publicPath = `${IMG_URL}/${slug}/${name}.webp`;
  if (existsSync(file)) {
    kept++;
    bytesOut.total += readFileSync(file).length;
    return publicPath;
  }
  if (DRY) return publicPath;
  const src = url.includes("res.cloudinary.com") ? url.replace("/upload/", `/upload/c_limit,w_${MAX_W}/`) : url;
  const res = await fetch(src);
  if (!res.ok) throw new Error(`${res.status} for ${src}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const webp = await sharp(buf).rotate().resize({ width: MAX_W, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer();
  mkdirSync(dir, { recursive: true });
  writeFileSync(file, webp);
  downloaded++;
  bytesOut.total += webp.length;
  return publicPath;
}

/* ------------------------------------------------------------------ body */

const HEADING = { 1: 2, 2: 3, 3: 4, 4: 4, 5: 4, 6: 4 };
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

async function bodyHtml(cs, report) {
  const layout = JSON.parse(cs.content || "{}");
  const pl = layout.pageLayout || layout.layout || {};
  const blocks = [
    ...(pl.sections ?? []).flatMap((s) => s.columns.flatMap((c) => c.blocks ?? [])),
    ...(pl.columns ?? []).flatMap((c) => c.blocks ?? []),
    ...(layout.availableBlocks ?? []),
  ];
  const html = [];
  let n = 0;
  for (const b of blocks) {
    if (b.type === "title" && b.content?.trim()) {
      const text = b.content.replace(/\*\*/g, "").trim();
      // The page hero already shows the title; skip a block that repeats it.
      if (norm(text) === norm(cs.title)) continue;
      const level = HEADING[b.titleLevel] ?? 3;
      html.push(`<h${level}>${esc(text)}</h${level}>`);
    } else if (b.type === "text" && b.content?.trim()) {
      html.push(textToHtml(b.content));
      if (/^\s*\|/m.test(b.content)) report.tables++;
    } else if (b.type === "image" && (b.url || b.fileUrl)) {
      const src = await localImage(b.url || b.fileUrl, cs.slug, `image-${String(++n).padStart(2, "0")}`);
      const alt = clean(b.caption) || `${clean(cs.company.name)} — ${clean(cs.title)} (image ${n})`;
      html.push(`<img src="${src}" alt="${esc(alt)}">`);
      if (b.caption?.trim()) html.push(`<p><em>${esc(clean(b.caption))}</em></p>`);
    } else if (b.type === "video" && b.url) {
      const id = youTubeId(b.url);
      if (id) {
        html.push(`<p><a href="https://www.youtube.com/watch?v=${id}">Watch the video on YouTube</a></p>`);
        report.videos++;
      } else report.skipped.push(`${cs.slug}: non-YouTube video ${b.url}`);
    }
  }
  return html.join("\n");
}

/* ------------------------------------------------------------------ main */

const data =
  fileArg > -1
    ? JSON.parse(readFileSync(process.argv[fileArg + 1], "utf8"))
    : await (await fetch(API, { headers: { "User-Agent": "AAA site migration" } })).json();

const published = data
  .filter((cs) => cs.published)
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

const report = { tables: 0, videos: 0, skipped: [] };
const articles = [];
for (const [i, cs] of published.entries()) {
  const name = clean(cs.company?.name);
  articles.push({
    slug: cs.slug,
    name,
    title: clean(cs.title),
    subtitle: clean(cs.subtitle),
    excerpt: clean(cs.excerpt),
    sector: cleanList(cs.company?.industry),
    country: clean(cs.company?.location),
    scope: cleanList(cs.company?.scope),
    website: clean(cs.company?.website) || null,
    image: await localImage(cs.featuredImage, cs.slug, "cover"),
    imageAlt: `${name} — ${clean(cs.title)}`,
    logo: await localImage(cs.company?.logo, cs.slug, "logo"),
    videoUrl: cs.featuredVideo && youTubeId(cs.featuredVideo) ? `https://www.youtube.com/watch?v=${youTubeId(cs.featuredVideo)}` : null,
    featured: Boolean(cs.featured),
    publishedAt: cs.createdAt,
    order: i,
    body: await bodyHtml(cs, report),
  });
  process.stdout.write(".");
}

console.log(`\n${articles.length} case studies · images: ${downloaded} downloaded, ${kept} kept (${(bytesOut.total / 1048576).toFixed(1)} MB)`);
console.log(`${report.tables} text blocks with tables · ${report.videos} YouTube videos`);
for (const s of report.skipped) console.log("skipped:", s);
if (DRY) console.log("--dry: nothing written");
else {
  writeFileSync(OUT, JSON.stringify(articles, null, 2) + "\n");
  console.log(`Wrote ${OUT.pathname}`);
}
