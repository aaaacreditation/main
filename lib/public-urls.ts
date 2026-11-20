import data from "../app/_data/public-urls.json";

/**
 * Public addresses (Nov 17 2026, client: "the old links must be the real links,
 * not redirects"). Every page that existed on the old WordPress site answers at
 * its exact old URL, trailing slash included; the route folders in app/ keep
 * their own names and are reached through rewrites in next.config.ts.
 *
 *   route folder               public address (canonical)
 *   /about                     /about-aaa/
 *   /programs/healthcare/…     /healthcare-accreditation/…
 *   /news/<slug>               /<slug>/               (posts sat at the root)
 *   /news/category/<c>[/<n>]   /category/<c>/[page/<n>/]
 *   /news/tag/<t>[/<n>]        /tag/<t>/[page/<n>/]
 *   /news/archive/<n>          /news/page/<n>/
 *   anything else              the same path + "/"
 *
 * `publicPath()` is the one function that turns a route path into the address
 * links, canonicals, JSON-LD and the sitemap must use. Pure and client-safe.
 */

const PAGES = data.pages as Record<string, string>;
const ALIASES = data.aliases as Record<string, string>;

/** Paths that are not pages: left exactly as written. */
const NOT_PAGE = /^\/(api|_next|media|adcp|wp-content|readiness-check)(\/|$)/;
const HAS_EXT = /\/[^/]+\.[a-z0-9]{2,5}$/i;

const trim = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
const slash = (p: string) => (p.endsWith("/") ? p : `${p}/`);

/** Route path (optionally with ?query / #hash) → its public address. */
export function publicPath(href: string): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const cut = href.search(/[?#]/);
  const raw = cut < 0 ? href : href.slice(0, cut);
  const rest = cut < 0 ? "" : href.slice(cut);
  if (NOT_PAGE.test(raw) || HAS_EXT.test(raw)) return href;
  const path = trim(raw) || "/";
  if (path === "/") return `/${rest}`;

  const mapped = PAGES[path];
  if (mapped) return mapped + rest;

  let m = path.match(/^\/(news|articles)\/archive\/(\d+)$/);
  if (m) return `/${m[1]}/page/${m[2]}/${rest}`;
  m = path.match(/^\/news\/(category|tag)\/([^/]+)(?:\/(\d+))?$/);
  if (m) return `/${m[1]}/${m[2]}/${m[3] && m[3] !== "1" ? `page/${m[3]}/` : ""}${rest}`;
  m = path.match(/^\/news\/([^/]+)$/);
  if (m && !["archive", "category", "tag", "page"].includes(m[1])) return `/${m[1]}/${rest}`;

  return slash(path) + rest;
}

/** A post's public address: posts live at the site root, as on the old site. */
export const postPath = (slug: string) => `/${slug}/`;

const REVERSE: Record<string, string> = Object.fromEntries([
  ...Object.entries(PAGES).map(([route, pub]) => [pub, route] as const),
  ...Object.entries(ALIASES),
]);

/**
 * Public address → the route folder that renders it (the inverse of
 * `publicPath` for mapped pages; anything else comes back trimmed). For
 * pathname checks that must give the same answer on the server, which may see
 * the rewritten route, and in the browser, which sees the public address.
 */
export function routeOf(pathname: string): string {
  const p = trim(pathname) || "/";
  const mapped = REVERSE[slash(p)];
  if (mapped) return mapped;
  let m = p.match(/^\/(news|articles)\/page\/(\d+)$/);
  if (m) return `/${m[1]}/archive/${m[2]}`;
  m = p.match(/^\/(category|tag)\/([^/]+)(?:\/page\/(\d+))?$/);
  if (m) return `/news/${m[1]}/${m[2]}${m[3] ? `/${m[3]}` : ""}`;
  // Posts (/<slug>) cannot be told from other root pages here; callers that
  // know the post slugs map them to /news/<slug> themselves.
  return p;
}
