import { unstable_cache } from "next/cache";
import { TermKind } from "@prisma/client";
import { getPublishedPosts, type PublicPost } from "./content";
import { getTerms, sectionOf } from "./taxonomy";
import { postPath } from "./public-urls";
import { LOGO, SITE_NAME, SITE_URL } from "./seo";
import { metaDescription } from "@/app/news/helpers";
import { looksLikeHtml, mdishToHtml } from "./mdish";

/**
 * Article feeds (Nov 2026): RSS 2.0 at /feed/ — the old WordPress feed
 * address, which feed readers and aggregators still poll — and JSON Feed 1.1
 * at /feed.json. Both carry the full article HTML, so aggregators and AI
 * tools read the article without scraping the page. Cached with the sitemaps
 * (tag "sitemap"); admin saves refresh both.
 */

const LIMIT = 30;

export const FEED_TITLE = `${SITE_NAME} — News & Articles`;
export const FEED_DESCRIPTION =
  "Accreditation news, announcements and guidance from the American Accreditation Association (AAA): healthcare, conformity assessment bodies, training providers, schools and SMEs.";

type FeedItem = {
  url: string;
  title: string;
  summary: string;
  html: string;
  published: string;
  modified?: string;
  image?: string;
  category: string;
  section: "news" | "articles";
  tags: string[];
};

const absolute = (src: string) => (/^https?:\/\//i.test(src) ? src : `${SITE_URL}${src.startsWith("/") ? "" : "/"}${src}`);

/** Root-relative links and images in article HTML → absolute (feed readers have no base URL). */
const absolutizeHtml = (html: string) => html.replace(/\b(href|src)=(["'])\/(?!\/)/g, `$1=$2${SITE_URL}/`);

/** Local ISO without zone ("2024-05-01T10:00:00") → a Date (server time zone, as the site renders it). */
const toDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? new Date(0) : d;
};

async function buildItems(): Promise<FeedItem[]> {
  const [posts, categories] = await Promise.all([
    getPublishedPosts(),
    getTerms(TermKind.POST_CATEGORY).catch(() => []),
  ]);
  return posts.slice(0, LIMIT).map((p: PublicPost) => ({
    url: `${SITE_URL}${postPath(p.slug)}`,
    title: p.title,
    summary: p.seoDescription?.trim() || metaDescription(p),
    // Admin-written posts are HTML; posts migrated from WordPress are markdown-ish text.
    html: absolutizeHtml(looksLikeHtml(p.content || "") ? p.content : mdishToHtml(p.content || "")),
    published: toDate(p.date).toISOString(),
    ...(p.modified ? { modified: toDate(p.modified).toISOString() } : {}),
    ...(p.coverImage ? { image: absolute(p.coverImage) } : {}),
    category: p.category || "News",
    section: sectionOf(categories, p.category),
    tags: p.tags,
  }));
}

const getItems = unstable_cache(buildItems, ["feed-items-v1"], { tags: ["sitemap"], revalidate: 3600 });

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cdata = (s: string) => `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;

export async function rssXml(): Promise<string> {
  const items = await getItems();
  const built = items[0]?.modified ?? items[0]?.published ?? new Date().toISOString();
  const rows = items.map(
    (i) => `<item>
<title>${esc(i.title)}</title>
<link>${esc(i.url)}</link>
<guid isPermaLink="true">${esc(i.url)}</guid>
<pubDate>${new Date(i.published).toUTCString()}</pubDate>
<dc:creator>${esc(SITE_NAME)}</dc:creator>
<category>${esc(i.category)}</category>${i.tags.map((t) => `\n<category>${esc(t)}</category>`).join("")}
<description>${cdata(i.summary)}</description>${i.html ? `\n<content:encoded>${cdata(i.html)}</content:encoded>` : ""}${
      i.image ? `\n<media:content url="${esc(i.image)}" medium="image"/>` : ""
    }
</item>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
<channel>
<title>${esc(FEED_TITLE)}</title>
<link>${SITE_URL}/news/</link>
<atom:link href="${SITE_URL}/feed/" rel="self" type="application/rss+xml"/>
<description>${esc(FEED_DESCRIPTION)}</description>
<language>en-us</language>
<lastBuildDate>${new Date(built).toUTCString()}</lastBuildDate>
<image><url>${LOGO.url}</url><title>${esc(FEED_TITLE)}</title><link>${SITE_URL}/news/</link></image>
${rows.join("\n")}
</channel>
</rss>
`;
}

export async function jsonFeed(): Promise<object> {
  const items = await getItems();
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: FEED_TITLE,
    home_page_url: `${SITE_URL}/news/`,
    feed_url: `${SITE_URL}/feed.json`,
    description: FEED_DESCRIPTION,
    icon: LOGO.url,
    favicon: `${SITE_URL}/favicon.ico`,
    language: "en-US",
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    items: items.map((i) => ({
      id: i.url,
      url: i.url,
      title: i.title,
      summary: i.summary,
      ...(i.html ? { content_html: i.html } : {}),
      date_published: i.published,
      ...(i.modified ? { date_modified: i.modified } : {}),
      ...(i.image ? { image: i.image } : {}),
      tags: [i.category, ...i.tags],
      _aaa: { section: i.section === "articles" ? "Articles" : "News & Announcements" },
    })),
  };
}
