/**
 * Top up app/news/posts-data.json from the live WordPress site.
 *
 * The original migration snapshot was taken mid-2026 and the client has kept
 * publishing since — 36 legitimate posts existed on the live site with no
 * counterpart in the rebuild, so they would have 404'd at launch (and the
 * generated redirects in next.config.ts would have pointed at nothing).
 *
 * Oct 2026: also backfills two fields on EVERY post, new or old —
 *   `category`  one display label from the post's WordPress categories, and
 *   `cover`     the featured image, saved locally as WebP in public/news/covers/
 *               (the snapshot had no featured images, so 222 of 335 archive
 *               cards were text-only, and wp-content URLs die at the domain
 *               cut-over). Existing cover files are kept, so re-runs are cheap.
 *
 * Run:  node scripts/sync-news-posts.mjs [--dry]
 * Then: npm run db:seed   (the CMS database takes precedence over this file)
 *
 * Known SEO-spam slugs are skipped; they are returned as 410 Gone by proxy.ts.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import sharp from "sharp";

const WP = "https://aaa-accreditation.org/wp-json/wp/v2";
const API = `${WP}/posts`;
const FILE = new URL("../app/news/posts-data.json", import.meta.url);
const COVER_DIR = new URL("../public/news/covers/", import.meta.url);
const DRY = process.argv.includes("--dry");

/**
 * WordPress categories → one display label, most specific first. Nearly every
 * post is also filed under the catch-all "News", so that is the fallback.
 */
const CATEGORY_ORDER = [
  ["announcements", "Announcements"],
  ["accreditation", "Accreditation"],
  ["healthcare", "Healthcare"],
  ["six-reasons-why-hospitals-pursue-accreditation", "Healthcare"],
  ["training-providers", "Training Providers"],
  ["article", "Article"],
  ["services", "Services"],
  ["etiquette", "Etiquette"],
  ["iso", "ISO"],
];

/** Featured-image size to start from: big enough for a 1200px cover. */
const SIZE_PREFERENCE = ["large", "fusion-800", "medium_large", "blog-large", "full"];

/** Casino/betting spam injected into the legacy site — never migrate these. */
const SPAM = /casino|unibet|rokubet|winomania|sloty|bonus-kisitlamalari|slot|betting|kasyn/i;

const decode = (s) =>
  s
    .replace(/&#0*38;/g, "&")
    .replace(/&#8217;|&#039;|&#39;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');

/** WordPress HTML -> the "markdown-ish" format the existing snapshot uses. */
function htmlToMdish(html) {
  let s = html;
  s = s.replace(/<!--.*?-->/gs, "");
  s = s.replace(/<script[\s\S]*?<\/script>/gi, "");
  s = s.replace(/<style[\s\S]*?<\/style>/gi, "");
  s = s.replace(/<figure[\s\S]*?<\/figure>/gi, "");
  s = s.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, l, t) => `\n\n${"#".repeat(+l)} ${t}\n\n`);
  s = s.replace(/<(strong|b)[^>]*>([\s\S]*?)<\/\1>/gi, "**$2**");
  s = s.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1");
  s = s.replace(/<\/(ul|ol)>/gi, "\n\n");
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<\/p>/gi, "\n\n");
  s = s.replace(/<[^>]+>/g, "");
  s = decode(s);
  return s.replace(/\n{3,}/g, "\n\n").replace(/[ \t]+\n/g, "\n").trim();
}

const imagesFrom = (html) => [
  ...new Set([...html.matchAll(/<img[^>]*src="([^"]+)"/gi)].map((m) => m[1])),
];

const existing = JSON.parse(readFileSync(FILE, "utf8"));
const have = new Set(existing.map((p) => p.slug));

const live = [];
for (let page = 1; page <= 6; page++) {
  const res = await fetch(
    `${API}?per_page=100&page=${page}&_fields=slug,date,title,excerpt,content,featured_media,categories`,
  );
  if (!res.ok) break;
  const batch = await res.json();
  if (!Array.isArray(batch) || batch.length === 0) break;
  live.push(...batch);
  if (batch.length < 100) break;
}

const added = [];
for (const p of live) {
  if (have.has(p.slug)) continue;
  if (SPAM.test(p.slug) || SPAM.test(p.title?.rendered ?? "")) continue;
  const html = p.content?.rendered ?? "";
  added.push({
    slug: p.slug,
    date: p.date,
    title: decode((p.title?.rendered ?? "").replace(/<[^>]+>/g, "")).trim(),
    excerpt: decode((p.excerpt?.rendered ?? "").replace(/<[^>]+>/g, ""))
      .replace(/\s+/g, " ")
      .trim(),
    content: htmlToMdish(html),
    images: imagesFrom(html),
  });
}

console.log(`live=${live.length} existing=${existing.length} new=${added.length}`);
for (const p of added) console.log(`  + ${p.date.slice(0, 10)}  ${p.slug}`);

/* ---------------------------------------------- categories + featured images */

const cats = await (await fetch(`${WP}/categories?per_page=100&_fields=id,slug`)).json();
const catSlug = new Map(cats.map((c) => [c.id, c.slug]));

const mediaIds = [...new Set(live.map((p) => p.featured_media).filter(Boolean))];
const media = new Map();
for (let i = 0; i < mediaIds.length; i += 100) {
  const ids = mediaIds.slice(i, i + 100).join(",");
  const res = await fetch(`${WP}/media?include=${ids}&per_page=100&_fields=id,source_url,media_details`);
  if (!res.ok) throw new Error(`media fetch failed: ${res.status}`);
  for (const m of await res.json()) {
    const sizes = m.media_details?.sizes ?? {};
    const size = SIZE_PREFERENCE.find((k) => sizes[k]?.source_url);
    media.set(m.id, size ? sizes[size].source_url : m.source_url);
  }
}

const liveBySlug = new Map(live.map((p) => [p.slug, p]));

function categoryOf(p) {
  const slugs = new Set((p?.categories ?? []).map((id) => catSlug.get(id)));
  return CATEGORY_ORDER.find(([slug]) => slugs.has(slug))?.[1] ?? "News";
}

/** Long WordPress slugs make unwieldy file names; keep them readable and unique. */
const coverName = (slug) => `${slug.slice(0, 90).replace(/-+$/, "")}.webp`;

async function saveCover(url, file) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`cover download failed (${res.status}): ${url}`);
  await sharp(Buffer.from(await res.arrayBuffer()))
    .resize({ width: 1200, height: 1200, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 72 })
    .toFile(new URL(file, COVER_DIR).pathname);
}

const merged = [...added, ...existing].sort((a, b) => b.date.localeCompare(a.date));
if (!DRY) mkdirSync(COVER_DIR, { recursive: true });

const queue = [];
let covers = 0;
for (const post of merged) {
  const src = liveBySlug.get(post.slug);
  post.category = categoryOf(src);
  const url = src && media.get(src.featured_media);
  if (!url) continue;
  const file = coverName(post.slug);
  post.cover = `/news/covers/${file}`;
  covers++;
  if (!DRY && !existsSync(new URL(file, COVER_DIR))) queue.push([url, file]);
}

// A few downloads at a time: quick, without hammering the old host.
for (let i = 0; i < queue.length; i += 6) {
  await Promise.all(queue.slice(i, i + 6).map(([url, file]) => saveCover(url, file)));
  process.stdout.write(`\r  covers downloaded ${Math.min(i + 6, queue.length)}/${queue.length}`);
}
if (queue.length) process.stdout.write("\n");
console.log(`covers=${covers}/${merged.length} categories=${JSON.stringify(
  merged.reduce((m, p) => ({ ...m, [p.category]: (m[p.category] ?? 0) + 1 }), {}),
)}`);

if (!DRY) {
  writeFileSync(FILE, JSON.stringify(merged, null, 1) + "\n");
  console.log(`wrote ${merged.length} posts`);
}
