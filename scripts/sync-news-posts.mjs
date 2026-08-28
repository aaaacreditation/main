/**
 * Top up app/news/posts-data.json from the live WordPress site.
 *
 * The original migration snapshot was taken mid-2026 and the client has kept
 * publishing since — 36 legitimate posts existed on the live site with no
 * counterpart in the rebuild, so they would have 404'd at launch (and the
 * generated redirects in next.config.ts would have pointed at nothing).
 *
 * Run:  node scripts/sync-news-posts.mjs [--dry]
 *
 * Known SEO-spam slugs are skipped; they are returned as 410 Gone by proxy.ts.
 */
import { readFileSync, writeFileSync } from "node:fs";

const API = "https://aaa-accreditation.org/wp-json/wp/v2/posts";
const FILE = new URL("../app/news/posts-data.json", import.meta.url);
const DRY = process.argv.includes("--dry");

/** Casino/betting spam injected into the legacy site — never migrate these. */
const SPAM = /casino|unibet|rokubet|winomania|sloty|bonus-kisitlamalari|slot|betting|kasyn/i;

const decode = (s) =>
  s
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
    `${API}?per_page=100&page=${page}&_fields=slug,date,title,excerpt,content`,
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

if (!DRY && added.length) {
  const merged = [...added, ...existing].sort((a, b) => b.date.localeCompare(a.date));
  writeFileSync(FILE, JSON.stringify(merged, null, 1) + "\n");
  console.log(`wrote ${merged.length} posts`);
}
