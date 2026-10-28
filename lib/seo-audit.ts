import type { Prisma } from "@prisma/client";
import { prisma } from "./db";
import { SITE_URL } from "./seo";

/**
 * SEO Center auditor.
 *
 * Crawls the site's own sitemap over HTTP, reads each page's rendered HTML the
 * way a search engine would (title, description, canonical, robots, social
 * tags, headings, text, images, structured data) and scores it 0–100 from
 * weighted, plain-English issues. Results land in SeoAuditRun / SeoAuditPage.
 *
 * Deliberately dependency-free: the HTML is read with regular expressions,
 * which is plenty for markup we render ourselves. Everything above the
 * "Persistence" divider is pure (no Prisma, no Next) so it can be exercised
 * outside the app.
 *
 * Never point it at SITE_URL by default: the live domain still serves the old
 * WordPress site until the cut-over. The base URL is SEO_AUDIT_BASE_URL when
 * set, otherwise the origin of the admin request that started the audit.
 */

/* ------------------------------------------------------------------ types */

export type IssueLevel = "error" | "warn" | "info";

export interface AuditIssue {
  level: IssueLevel;
  code: string;
  /** Page-specific, plain-English description of what is wrong. */
  message: string;
  /** One line on how to fix it. */
  fix: string;
}

export type AuditScope = "core" | "all";

export interface ParsedPage {
  title: string;
  description: string;
  canonical: string;
  robots: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  h1: string;
  h1Count: number;
  wordCount: number;
  imagesMissingAlt: number;
  jsonLdTypes: string[];
  jsonLdInvalid: number;
  lang: string;
  internalLinks: number;
  /** robots or googlebot meta says noindex. */
  noindex: boolean;
}

export interface AuditPageResult
  extends Omit<ParsedPage, "ogTitle" | "ogDescription" | "twitterCard" | "jsonLdInvalid" | "lang" | "internalLinks" | "noindex"> {
  path: string;
  statusCode: number;
  fetchMs: number;
  issues: AuditIssue[];
  score: number;
}

export interface CheckContext {
  path: string;
  statusCode: number;
  fetchMs: number;
  /** Location header of a 3xx answer. */
  location?: string;
  /** Network failure: "timeout" or the error message. */
  error?: string;
  /** X-Robots-Tag response header. */
  xRobots?: string;
  /** Whether the path is listed in the sitemap (noindex there is an error). */
  inSitemap: boolean;
  /** Canonical set by a SeoEntry override, if any. */
  overrideCanonical?: string | null;
  /** Origin being crawled — a noindex *header* off the live domain is the host's preview guard. */
  baseUrl?: string;
}

/* ------------------------------------------------------------- constants */

export const AUDIT_USER_AGENT = "AAA-SEO-Audit/1.0";
const CONCURRENCY = 6;
const TIMEOUT_MS = 15_000;
const SLOW_MS = 3_000;
/** Keep this many runs; older ones (and their page rows) are deleted. */
const KEEP_RUNS = 10;
/** A "running" run older than this is treated as crashed. */
export const STALE_RUN_MS = 10 * 60_000;
/** Newest news posts included in a "core" audit. */
const CORE_NEWS_POSTS = 10;

/** CLAUDE.md "Facts, SEO and GEO": titles ≤ 60 chars, descriptions 120–160. */
export const SEO_LIMITS = {
  titleMin: 25,
  titleMax: 60,
  descMin: 120,
  descMax: 160,
  minWords: 250,
  longPath: 75,
} as const;

/** app/layout.tsx `title.template` — appended to every page title, overrides included. */
export const TITLE_SUFFIX = " | AAA";

/* ---------------------------------------------------------- issue catalog */

interface IssueDef {
  level: IssueLevel;
  /** Points taken off the 100-point score. */
  weight: number;
  /** Short plain-English name, used when issues are grouped across pages. */
  label: string;
  fix: string;
}

export const ISSUE_DEFS: Record<string, IssueDef> = {
  // ---- errors
  http_error: {
    level: "error",
    weight: 100,
    label: "Page doesn't load",
    fix: "Open the page in a browser. If it was removed on purpose, add a redirect to its replacement so visitors and Google aren't sent to a dead end.",
  },
  redirect: {
    level: "error",
    weight: 50,
    label: "Sitemap address redirects",
    fix: "The sitemap should list the final address. Ask the web team to update the sitemap entry, or remove the redirect if it isn't needed.",
  },
  missing_title: {
    level: "error",
    weight: 30,
    label: "No page title",
    fix: "Add an SEO title in Page Metadata — about 50–60 characters with the main topic first.",
  },
  missing_description: {
    level: "error",
    weight: 20,
    label: "No meta description",
    fix: "Write a 120–160 character summary in Page Metadata. Google shows it under the title in results.",
  },
  missing_h1: {
    level: "error",
    weight: 15,
    label: "No main heading (H1)",
    fix: "Every page needs one main heading that says what it is about. Ask the web team to add an H1 to this layout.",
  },
  noindex: {
    level: "error",
    weight: 30,
    label: "Hidden from Google but listed in the sitemap",
    fix: "If the page should appear in Google, set Robots to “Index” in Page Metadata. If it should stay hidden, set it to “Noindex” there and it leaves the sitemap.",
  },
  missing_canonical: {
    level: "error",
    weight: 10,
    label: "No canonical address",
    fix: "Pages should state their preferred address. Ask the web team to build the page's metadata with pageMeta(), or set a canonical in Page Metadata.",
  },
  // ---- warnings
  title_long: {
    level: "warn",
    weight: 5,
    label: "Title too long",
    fix: "Shorten the title to 60 characters or fewer (the “ | AAA” suffix counts). Put the most important words first.",
  },
  title_short: {
    level: "warn",
    weight: 5,
    label: "Title too short",
    fix: "Expand the title to 25–60 characters so it names the program or topic clearly.",
  },
  desc_long: {
    level: "warn",
    weight: 4,
    label: "Description too long",
    fix: "Trim the description to 160 characters or fewer so Google doesn't cut it mid-sentence.",
  },
  desc_short: {
    level: "warn",
    weight: 4,
    label: "Description too short",
    fix: "Expand the description to 120–160 characters: what the page offers and who it is for.",
  },
  multiple_h1: {
    level: "warn",
    weight: 4,
    label: "More than one main heading (H1)",
    fix: "Keep a single H1 per page. Ask the web team to turn the extra ones into sub-headings (H2).",
  },
  canonical_mismatch: {
    level: "warn",
    weight: 8,
    label: "Canonical points to another address",
    fix: "Unless this page is a deliberate copy of another one, clear the canonical override so the page points to itself.",
  },
  no_og_image: {
    level: "warn",
    weight: 4,
    label: "No social sharing image",
    fix: "Pick an OG image in Page Metadata so links shared on LinkedIn, WhatsApp or X show a picture.",
  },
  og_incomplete: {
    level: "warn",
    weight: 2,
    label: "Social preview text missing",
    fix: "Social previews reuse the page title and description — make sure both are set in Page Metadata.",
  },
  images_missing_alt: {
    level: "warn",
    weight: 4,
    label: "Images without alt text",
    fix: "Ask the web team to give each image a short description (alt text). Purely decorative images can use an empty alt.",
  },
  no_jsonld: {
    level: "warn",
    weight: 6,
    label: "No structured data",
    fix: "Structured data (JSON-LD) helps Google and AI assistants understand the page. Ask the web team to add it with <JsonLd>.",
  },
  invalid_jsonld: {
    level: "warn",
    weight: 4,
    label: "Broken structured data",
    fix: "A JSON-LD block can't be read. Ask the web team to check it in Google's Rich Results Test.",
  },
  no_breadcrumb: {
    level: "warn",
    weight: 3,
    label: "No breadcrumb structured data",
    fix: "Ask the web team to add breadcrumbSchema() so Google can show where the page sits in the site.",
  },
  thin_content: {
    level: "warn",
    weight: 6,
    label: "Very little text",
    fix: "Pages with under ~250 words rarely rank. Add a few helpful paragraphs: who it is for, the process, common questions.",
  },
  slow: {
    level: "warn",
    weight: 4,
    label: "Slow to load",
    fix: "Large images or heavy sections slow a page down — ask the web team to look. Timings against a development server are slower than the live site.",
  },
  missing_lang: {
    level: "warn",
    weight: 3,
    label: "Page language not declared",
    fix: "Ask the web team to set the lang attribute on the <html> element (it should be “en”).",
  },
  duplicate_title: {
    level: "warn",
    weight: 5,
    label: "Same title as another page",
    fix: "Give each page its own title describing its own content — Google may otherwise pick only one of them.",
  },
  duplicate_description: {
    level: "warn",
    weight: 4,
    label: "Same description as another page",
    fix: "Write a unique description for each page in Page Metadata.",
  },
  // ---- info
  long_url: {
    level: "info",
    weight: 1,
    label: "Long web address",
    fix: "Shorter addresses are easier to read and share. Worth considering for new pages — changing an existing one needs a redirect.",
  },
  url_format: {
    level: "info",
    weight: 1,
    label: "Address uses capitals or underscores",
    fix: "Lower-case words separated by hyphens are the convention. Changing an existing address needs a redirect.",
  },
  no_twitter_card: {
    level: "info",
    weight: 1,
    label: "No X/Twitter card",
    fix: "Ask the web team to build the page's metadata with pageMeta(), which adds the card automatically.",
  },
  few_internal_links: {
    level: "info",
    weight: 1,
    label: "Few links to other pages",
    fix: "Link to related programs or articles from the text — internal links help visitors and search engines move around the site.",
  },
  noindex_header: {
    level: "info",
    weight: 0,
    label: "Hosting adds a noindex header",
    fix: "Preview and staging deployments send a noindex header so they never compete with the live site. Ignore this unless it shows up on the live domain.",
  },
  custom_canonical: {
    level: "info",
    weight: 0,
    label: "Canonical set by an override",
    fix: "Fine if intended. Remove the canonical override in Page Metadata if this page should point to itself.",
  },
  noindex_hidden: {
    level: "info",
    weight: 0,
    label: "Hidden from search engines",
    fix: "This page asks search engines not to index it and isn't in the sitemap — fine if intended.",
  },
};

const LEVEL_RANK: Record<IssueLevel, number> = { error: 0, warn: 1, info: 2 };

function issue(code: keyof typeof ISSUE_DEFS, message: string): AuditIssue {
  const def = ISSUE_DEFS[code];
  return { level: def.level, code, message, fix: def.fix };
}

/** Plain-English help for an issue code (falls back gracefully for unknown codes). */
export function issueHelp(code: string): { label: string; fix: string; level: IssueLevel } {
  const def = ISSUE_DEFS[code];
  return def ? { label: def.label, fix: def.fix, level: def.level } : { label: code.replace(/_/g, " "), fix: "", level: "info" };
}

/** 100 minus the weight of every issue, clamped to 0–100. */
export function scoreIssues(issues: AuditIssue[]): number {
  const penalty = issues.reduce((sum, i) => sum + (ISSUE_DEFS[i.code]?.weight ?? (i.level === "error" ? 15 : i.level === "warn" ? 4 : 1)), 0);
  return Math.max(0, Math.min(100, Math.round(100 - penalty)));
}

export function sortIssues(issues: AuditIssue[]): AuditIssue[] {
  return [...issues].sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level]);
}

/** Reads the issues JSON column defensively. */
export function parseIssues(json: unknown): AuditIssue[] {
  if (!Array.isArray(json)) return [];
  return json
    .filter((i): i is Record<string, unknown> => !!i && typeof i === "object")
    .map((i) => {
      const code = typeof i.code === "string" ? i.code : "unknown";
      const level: IssueLevel = i.level === "error" || i.level === "warn" || i.level === "info" ? i.level : "info";
      return {
        level,
        code,
        message: typeof i.message === "string" ? i.message : "",
        fix: typeof i.fix === "string" && i.fix ? i.fix : issueHelp(code).fix,
      };
    });
}

export function countLevels(issues: AuditIssue[]) {
  let errors = 0;
  let warnings = 0;
  let info = 0;
  for (const i of issues) {
    if (i.level === "error") errors++;
    else if (i.level === "warn") warnings++;
    else info++;
  }
  return { errors, warnings, info };
}

/* ------------------------------------------------------------- UI helpers */

export type Tone = "ok" | "warn" | "err";

/** Rendered-title length (suffix included) against the CLAUDE.md limits. */
export function titleTone(len: number): Tone {
  if (len === 0 || len > SEO_LIMITS.titleMax + 10) return "err";
  if (len > SEO_LIMITS.titleMax || len < SEO_LIMITS.titleMin) return "warn";
  return "ok";
}

export function descriptionTone(len: number): Tone {
  if (len === 0 || len < 70 || len > 200) return "err";
  if (len < SEO_LIMITS.descMin || len > SEO_LIMITS.descMax) return "warn";
  return "ok";
}

export function scoreTone(score: number): "good" | "mid" | "bad" {
  return score >= 80 ? "good" : score >= 50 ? "mid" : "bad";
}

/* --------------------------------------------------------------- paths */

/** Sitemap URL → route path ("https://x.org/a/b/" → "/a/b", origin → "/"). */
export function pathFromUrl(url: string): string {
  try {
    const p = new URL(url).pathname.replace(/\/+$/, "");
    return p || "/";
  } catch {
    return "";
  }
}

/**
 * Normalises what a staff member typed into a SeoEntry key: accepts a pasted
 * full URL, drops the query/hash and trailing slash. Returns null when the
 * result isn't a sane route path.
 */
export function normalizeRoutePath(input: string): string | null {
  let p = (input || "").trim();
  if (!p) return null;
  if (/^https?:\/\//i.test(p)) {
    try {
      p = new URL(p).pathname;
    } catch {
      return null;
    }
  }
  p = p.replace(/[?#].*$/, "");
  if (!p.startsWith("/")) return null;
  p = p.replace(/\/+$/, "") || "/";
  if (p.length > 300 || /\s/.test(p) || p.includes("//") || p.split("/").includes("..")) return null;
  return p;
}

export function expectedCanonical(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

function normalizeBase(base: string): string {
  return base.trim().replace(/\/+$/, "");
}

/**
 * Where to crawl: SEO_AUDIT_BASE_URL, else the origin of the current admin
 * request (from the Host / X-Forwarded-* headers). Never SITE_URL — the live
 * domain still serves the legacy WordPress site.
 */
export function auditBaseUrl(headers: Headers, requestUrl?: string): string {
  const env = process.env.SEO_AUDIT_BASE_URL?.trim();
  if (env) return normalizeBase(env);
  const host = headers.get("x-forwarded-host")?.split(",")[0]?.trim() || headers.get("host")?.trim();
  if (host) {
    const fwdProto = headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const local = /^(localhost|127\.|\[::1\]|0\.0\.0\.0)/.test(host);
    const proto = fwdProto || (requestUrl ? new URL(requestUrl).protocol.replace(":", "") : local ? "http" : "https");
    return `${proto}://${host}`;
  }
  if (requestUrl) return new URL(requestUrl).origin;
  return "http://localhost:3000";
}

/* -------------------------------------------------------------- parsing */

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  middot: "·",
  bull: "•",
  copy: "©",
  reg: "®",
  trade: "™",
  laquo: "«",
  raquo: "»",
};

export function decodeEntities(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const cp = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(cp) && cp > 0 && cp < 0x110000 ? String.fromCodePoint(cp) : m;
    }
    return NAMED_ENTITIES[e.toLowerCase()] ?? m;
  });
}

const squash = (s: string) => s.replace(/\s+/g, " ").trim();

/**
 * Whether a robots meta value or X-Robots-Tag header forbids indexing. Works
 * on whole comma-separated directives so "max-image-preview:none" doesn't
 * count; a "googlebot: noindex" user-agent prefix is understood.
 */
export function robotsNoindex(value: string): boolean {
  return value
    .split(",")
    .map((d) => d.trim().toLowerCase().replace(/^[a-z0-9_-]+:\s+/, ""))
    .some((d) => d === "noindex" || d === "none");
}

/** Attributes of a single start tag, names lower-cased, values entity-decoded. */
function tagAttrs(tag: string): Record<string, string> {
  const out: Record<string, string> = {};
  const inner = tag.replace(/^<\s*[a-z0-9:-]+/i, "").replace(/\/?\s*>$/, "");
  const re = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(inner))) {
    const key = m[1].toLowerCase();
    if (!(key in out)) out[key] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? "");
  }
  return out;
}

function stripBlocks(html: string, tags: string[]): string {
  let out = html;
  for (const t of tags) out = out.replace(new RegExp(`<${t}\\b[^>]*>[\\s\\S]*?<\\/${t}\\s*>`, "gi"), " ");
  return out;
}

/** Visible text of an HTML fragment. React's `<!-- -->` text separators join, tags separate. */
function htmlToText(fragment: string): string {
  return squash(decodeEntities(fragment.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]+>/g, " ")));
}

function collectLdTypes(node: unknown, out: Set<string>, depth = 0) {
  if (depth > 3 || !node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const n of node) collectLdTypes(n, out, depth + 1);
    return;
  }
  const obj = node as Record<string, unknown>;
  const t = obj["@type"];
  if (typeof t === "string") out.add(t);
  else if (Array.isArray(t)) for (const x of t) if (typeof x === "string") out.add(x);
  if (Array.isArray(obj["@graph"])) collectLdTypes(obj["@graph"], out, depth + 1);
}

export function parsePage(html: string, opts: { baseUrl?: string } = {}): ParsedPage {
  // Structured data first — every other read happens with scripts removed
  // (the RSC payload in Next's inline scripts repeats the page's HTML).
  const ldTypes = new Set<string>();
  let jsonLdInvalid = 0;
  const ldRe = /<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script\s*>/gi;
  let m: RegExpExecArray | null;
  while ((m = ldRe.exec(html))) {
    try {
      collectLdTypes(JSON.parse(m[1].trim()), ldTypes);
    } catch {
      jsonLdInvalid++;
    }
  }

  const htmlTag = html.match(/<html\b[^>]*>/i);
  const lang = htmlTag ? (tagAttrs(htmlTag[0]).lang ?? "").trim() : "";

  const clean = stripBlocks(html.replace(/<!--[\s\S]*?-->/g, ""), ["script", "style", "noscript", "template"]);
  // <title> also exists inside inline SVGs — drop those before looking for the document title.
  const noSvg = stripBlocks(clean, ["svg"]);

  const titleMatch = noSvg.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i);
  const title = titleMatch ? squash(decodeEntities(titleMatch[1])) : "";

  const metas = new Map<string, string>();
  for (const tag of noSvg.match(/<meta\b[^>]*>/gi) ?? []) {
    const a = tagAttrs(tag);
    const key = (a.name || a.property || a["http-equiv"] || "").toLowerCase();
    if (key && !metas.has(key) && "content" in a) metas.set(key, squash(a.content));
  }

  let canonical = "";
  for (const tag of noSvg.match(/<link\b[^>]*>/gi) ?? []) {
    const a = tagAttrs(tag);
    if ((a.rel || "").toLowerCase().split(/\s+/).includes("canonical") && a.href) {
      canonical = a.href.trim();
      break;
    }
  }

  const bodyMatch = noSvg.match(/<body\b[^>]*>([\s\S]*)<\/body\s*>/i);
  const body = bodyMatch ? bodyMatch[1] : noSvg;

  const h1s: string[] = [];
  const h1Re = /<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/gi;
  while ((m = h1Re.exec(body))) h1s.push(htmlToText(m[1]));
  const h1 = h1s.find((t) => t) ?? "";

  let imagesMissingAlt = 0;
  for (const tag of body.match(/<img\b[^>]*>/gi) ?? []) if (!("alt" in tagAttrs(tag))) imagesMissingAlt++;

  const hosts = new Set<string>();
  for (const u of [SITE_URL, opts.baseUrl]) {
    if (!u) continue;
    try {
      const host = new URL(u).host;
      hosts.add(host);
      hosts.add(host.startsWith("www.") ? host.slice(4) : `www.${host}`);
    } catch {
      /* ignore */
    }
  }
  let internalLinks = 0;
  for (const tag of body.match(/<a\b[^>]*>/gi) ?? []) {
    const href = (tagAttrs(tag).href ?? "").trim();
    if (!href || href.startsWith("#") || /^(mailto|tel|javascript|data|sms):/i.test(href)) continue;
    if (href.startsWith("//")) {
      if (hosts.has(href.slice(2).split("/")[0])) internalLinks++;
    } else if (/^[a-z][a-z0-9+.-]*:/i.test(href)) {
      try {
        if (hosts.has(new URL(href).host)) internalLinks++;
      } catch {
        /* ignore */
      }
    } else internalLinks++;
  }

  // Word count: the page's own content (<main> when present), without chrome.
  const mainMatch = body.match(/<main\b[^>]*>([\s\S]*)<\/main\s*>/i);
  const content = stripBlocks(mainMatch ? mainMatch[1] : body, ["nav", "header", "footer"]);
  const words = htmlToText(content)
    .split(" ")
    .filter((w) => /[\p{L}\p{N}]/u.test(w));

  return {
    title,
    description: metas.get("description") ?? "",
    canonical,
    robots: metas.get("robots") ?? "",
    ogTitle: metas.get("og:title") ?? "",
    ogDescription: metas.get("og:description") ?? "",
    ogImage: metas.get("og:image") ?? metas.get("og:image:url") ?? "",
    twitterCard: metas.get("twitter:card") ?? "",
    h1,
    h1Count: h1s.length,
    wordCount: words.length,
    imagesMissingAlt,
    jsonLdTypes: [...ldTypes].sort(),
    jsonLdInvalid,
    lang,
    internalLinks,
    noindex: robotsNoindex(metas.get("robots") ?? "") || robotsNoindex(metas.get("googlebot") ?? ""),
  };
}

/* ---------------------------------------------------------------- checks */

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

function sameUrl(a: string, b: string): boolean {
  const norm = (u: string) => {
    try {
      const url = new URL(u, SITE_URL);
      return `${url.protocol}//${url.host}${url.pathname.replace(/\/+$/, "")}`.toLowerCase();
    } catch {
      return u.trim().replace(/\/+$/, "").toLowerCase();
    }
  };
  return norm(a) === norm(b);
}

/** Issues for one fetched page (duplicates are added later, across pages). */
export function checkPage(page: ParsedPage | null, ctx: CheckContext): AuditIssue[] {
  const out: AuditIssue[] = [];
  const { path } = ctx;

  if (ctx.statusCode !== 200 || !page) {
    if (ctx.statusCode >= 300 && ctx.statusCode < 400) {
      out.push(issue("redirect", `This address redirects (${ctx.statusCode}) to ${ctx.location || "another page"} instead of loading directly.`));
    } else if (ctx.error === "timeout") {
      out.push(issue("http_error", `The page didn't respond within ${TIMEOUT_MS / 1000} seconds.`));
    } else if (ctx.error) {
      out.push(issue("http_error", `The page couldn't be reached (${ctx.error}).`));
    } else {
      const label = ctx.statusCode === 404 ? " — page not found" : ctx.statusCode === 410 ? " — page gone" : ctx.statusCode >= 500 ? " — server error" : "";
      out.push(issue("http_error", `The page answered with status ${ctx.statusCode}${label}.`));
    }
    return out;
  }

  const isHome = path === "/";
  const isNews = path.startsWith("/news/");

  // Title & description
  const tLen = page.title.length;
  if (!tLen) out.push(issue("missing_title", "The page has no title, so Google has to invent one."));
  else if (tLen > SEO_LIMITS.titleMax)
    out.push(issue("title_long", `The title is ${tLen} characters — Google usually cuts titles off after about ${SEO_LIMITS.titleMax}.`));
  else if (tLen < SEO_LIMITS.titleMin) out.push(issue("title_short", `The title is only ${tLen} characters.`));

  const dLen = page.description.length;
  if (!dLen) out.push(issue("missing_description", "The page has no meta description, so Google picks a random snippet of text."));
  else if (dLen > SEO_LIMITS.descMax)
    out.push(issue("desc_long", `The description is ${dLen} characters — anything past ${SEO_LIMITS.descMax} is usually cut off.`));
  else if (dLen < SEO_LIMITS.descMin)
    out.push(issue("desc_short", `The description is only ${dLen} characters (aim for ${SEO_LIMITS.descMin}–${SEO_LIMITS.descMax}).`));

  // Headings
  if (!page.h1Count || !page.h1) out.push(issue("missing_h1", "The page has no main heading (H1)."));
  else if (page.h1Count > 1) out.push(issue("multiple_h1", `The page has ${page.h1Count} main headings (H1).`));

  // Indexing
  const headerNoindex = robotsNoindex(ctx.xRobots ?? "");
  let liveDomain = !ctx.baseUrl;
  try {
    if (ctx.baseUrl) liveDomain = new URL(ctx.baseUrl).host.replace(/^www\./, "") === new URL(SITE_URL).host.replace(/^www\./, "");
  } catch {
    /* treat as not live */
  }
  if (page.noindex || (headerNoindex && liveDomain)) {
    out.push(
      ctx.inSitemap
        ? issue("noindex", "The page tells search engines not to index it, yet it is listed in the sitemap.")
        : issue("noindex_hidden", "The page tells search engines not to index it."),
    );
  } else if (headerNoindex) {
    out.push(issue("noindex_header", `This copy of the site sends “X-Robots-Tag: ${ctx.xRobots}”, which hides it from search engines.`));
  }

  const expected = expectedCanonical(path);
  if (!page.canonical) out.push(issue("missing_canonical", "The page doesn't declare a canonical (preferred) address."));
  else if (!sameUrl(page.canonical, expected)) {
    if (ctx.overrideCanonical && sameUrl(page.canonical, ctx.overrideCanonical))
      out.push(issue("custom_canonical", `The canonical is set by an override to ${page.canonical}.`));
    else out.push(issue("canonical_mismatch", `The canonical points to ${page.canonical} instead of this page's own address (${expected}).`));
  }

  // Social
  if (!page.ogImage) out.push(issue("no_og_image", "No image is set for social sharing (og:image), so shared links show no picture."));
  const ogMissing = [!page.ogTitle && "og:title", !page.ogDescription && "og:description"].filter(Boolean);
  if (ogMissing.length) out.push(issue("og_incomplete", `Social preview tags are missing: ${ogMissing.join(", ")}.`));
  if (!page.twitterCard) out.push(issue("no_twitter_card", "No X/Twitter card tag (twitter:card)."));

  // Content
  if (page.imagesMissingAlt > 0)
    out.push(issue("images_missing_alt", `${plural(page.imagesMissingAlt, "image")} ${page.imagesMissingAlt === 1 ? "has" : "have"} no alt text.`));
  if (page.jsonLdInvalid > 0) out.push(issue("invalid_jsonld", `${plural(page.jsonLdInvalid, "structured-data block")} couldn't be read.`));
  if (!page.jsonLdTypes.length) out.push(issue("no_jsonld", "The page has no structured data (JSON-LD)."));
  else if (!isHome && !page.jsonLdTypes.includes("BreadcrumbList"))
    out.push(issue("no_breadcrumb", "The page's structured data has no breadcrumb trail (BreadcrumbList)."));
  if (!isNews && page.wordCount < SEO_LIMITS.minWords)
    out.push(issue("thin_content", `Only ${page.wordCount} words of text on the page (aim for at least ${SEO_LIMITS.minWords}).`));
  if (!page.lang) out.push(issue("missing_lang", "The page doesn't declare its language."));
  if (page.internalLinks < 3) out.push(issue("few_internal_links", `Only ${plural(page.internalLinks, "link")} to other pages of the site.`));

  // Performance & URL
  if (ctx.fetchMs > SLOW_MS) out.push(issue("slow", `The page took ${(ctx.fetchMs / 1000).toFixed(1)} s to load.`));
  if (path.length > SEO_LIMITS.longPath) out.push(issue("long_url", `The address is ${path.length} characters long.`));
  if (/[A-Z_]/.test(path)) out.push(issue("url_format", "The address contains capital letters or underscores."));

  return out;
}

/* ----------------------------------------------------------- duplicates */

type DupRow = { path: string; statusCode: number; title: string; description: string; issues: AuditIssue[]; score: number };

/**
 * Flags pages that share a title or description with another page of the
 * same run, then re-scores every row. Mutates and returns the rows.
 */
export function applyDuplicateFlags<T extends DupRow>(rows: T[]): T[] {
  for (const r of rows) r.issues = r.issues.filter((i) => i.code !== "duplicate_title" && i.code !== "duplicate_description");

  const groups = (key: "title" | "description") => {
    const map = new Map<string, string[]>();
    for (const r of rows) {
      if (r.statusCode !== 200) continue;
      const k = squash(r[key]).toLowerCase();
      if (!k) continue;
      const list = map.get(k);
      if (list) list.push(r.path);
      else map.set(k, [r.path]);
    }
    return map;
  };
  const others = (paths: string[], self: string) => {
    const rest = paths.filter((p) => p !== self);
    return rest.slice(0, 3).join(", ") + (rest.length > 3 ? ` and ${rest.length - 3} more` : "");
  };

  const titles = groups("title");
  const descs = groups("description");
  for (const r of rows) {
    if (r.statusCode !== 200) continue;
    const t = titles.get(squash(r.title).toLowerCase());
    if (t && t.length > 1)
      r.issues.push(issue("duplicate_title", `${t.length - 1 === 1 ? "Another page has" : `${t.length - 1} other pages have`} the same title: ${others(t, r.path)}.`));
    const d = descs.get(squash(r.description).toLowerCase());
    if (d && d.length > 1)
      r.issues.push(
        issue("duplicate_description", `${d.length - 1 === 1 ? "Another page has" : `${d.length - 1} other pages have`} the same description: ${others(d, r.path)}.`),
      );
    r.issues = sortIssues(r.issues);
    r.score = scoreIssues(r.issues);
  }
  return rows;
}

/* --------------------------------------------------------------- fetching */

/** Fetches one path from `baseUrl` and returns its audited result (never throws). */
export async function auditPath(
  baseUrl: string,
  path: string,
  ctx: Pick<CheckContext, "inSitemap" | "overrideCanonical">,
): Promise<AuditPageResult> {
  const base = normalizeBase(baseUrl);
  const t0 = Date.now();
  let statusCode = 0;
  let html = "";
  let location = "";
  let xRobots = "";
  let error = "";
  try {
    const res = await fetch(base + path, {
      redirect: "manual",
      cache: "no-store",
      headers: { "user-agent": AUDIT_USER_AGENT, accept: "text/html,application/xhtml+xml" },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    statusCode = res.status;
    location = res.headers.get("location") ?? "";
    xRobots = res.headers.get("x-robots-tag") ?? "";
    if (statusCode === 200) html = await res.text();
    else await res.body?.cancel().catch(() => {});
  } catch (err) {
    const e = err as Error;
    statusCode = 0;
    error = e?.name === "TimeoutError" || e?.name === "AbortError" ? "timeout" : (e?.message || "network error").slice(0, 160);
  }
  const fetchMs = Date.now() - t0;

  if (location) {
    try {
      const u = new URL(location, base + path);
      if (u.origin === new URL(base).origin) location = u.pathname + u.search;
    } catch {
      /* keep as sent */
    }
  }

  const parsed = statusCode === 200 ? parsePage(html, { baseUrl: base }) : null;
  const issues = sortIssues(checkPage(parsed, { path, statusCode, fetchMs, location, error, xRobots, baseUrl: base, ...ctx }));
  return {
    path,
    statusCode,
    fetchMs,
    title: parsed?.title ?? "",
    description: parsed?.description ?? "",
    canonical: parsed?.canonical ?? "",
    robots: [parsed?.robots, xRobots && `X-Robots-Tag: ${xRobots}`].filter(Boolean).join(" · "),
    ogImage: parsed?.ogImage ?? "",
    h1: parsed?.h1 ?? "",
    h1Count: parsed?.h1Count ?? 0,
    wordCount: parsed?.wordCount ?? 0,
    imagesMissingAlt: parsed?.imagesMissingAlt ?? 0,
    jsonLdTypes: parsed?.jsonLdTypes ?? [],
    issues,
    score: scoreIssues(issues),
  };
}

async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

/* ------------------------------------------------------------ sitemap */

export interface SitemapPath {
  path: string;
  lastModified: number;
}

/** Every path in the site's sitemap (app/sitemap.ts), deduplicated, in sitemap order. */
export async function sitemapPaths(): Promise<SitemapPath[]> {
  // Imported lazily: the sitemap pulls in the content layer and its bundled JSON.
  const { default: sitemap } = await import("../app/sitemap");
  const entries = await sitemap();
  const seen = new Set<string>();
  const out: SitemapPath[] = [];
  for (const e of entries) {
    const path = pathFromUrl(e.url);
    if (!path || seen.has(path)) continue;
    seen.add(path);
    const lm = e.lastModified ? new Date(e.lastModified).getTime() : 0;
    out.push({ path, lastModified: Number.isFinite(lm) ? lm : 0 });
  }
  return out;
}

export const isNewsArticlePath = (p: string) => p.startsWith("/news/") && !p.startsWith("/news/archive/");

/** "core" = every non-/news/ path plus the newest news posts; "all" = everything. */
export function selectScope(entries: SitemapPath[], scope: AuditScope): string[] {
  if (scope === "all") return entries.map((e) => e.path);
  const site = entries.filter((e) => !e.path.startsWith("/news/"));
  const posts = entries
    .filter((e) => isNewsArticlePath(e.path))
    .sort((a, b) => b.lastModified - a.lastModified)
    .slice(0, CORE_NEWS_POSTS);
  return [...site, ...posts].map((e) => e.path);
}

/* ======================================================= Persistence */

function toRow(runId: string, r: AuditPageResult): Prisma.SeoAuditPageCreateManyInput {
  return {
    runId,
    path: r.path,
    statusCode: r.statusCode,
    title: r.title.slice(0, 500),
    description: r.description.slice(0, 1000),
    canonical: r.canonical.slice(0, 600),
    robots: r.robots.slice(0, 300),
    ogImage: r.ogImage.slice(0, 600),
    h1: r.h1.slice(0, 500),
    h1Count: r.h1Count,
    wordCount: r.wordCount,
    imagesMissingAlt: r.imagesMissingAlt,
    jsonLdTypes: r.jsonLdTypes.slice(0, 30),
    issues: r.issues as unknown as Prisma.InputJsonValue,
    score: r.score,
    fetchMs: r.fetchMs,
  };
}

async function overrideCanonicals(): Promise<Map<string, string>> {
  const rows = await prisma.seoEntry.findMany({ where: { canonical: { not: null } }, select: { path: true, canonical: true } });
  return new Map(rows.filter((r) => r.canonical?.trim()).map((r) => [r.path, r.canonical!.trim()]));
}

/** Deletes everything but the newest KEEP_RUNS runs (page rows cascade). */
export async function pruneAuditRuns() {
  const old = await prisma.seoAuditRun.findMany({ orderBy: { startedAt: "desc" }, skip: KEEP_RUNS, select: { id: true } });
  if (old.length) await prisma.seoAuditRun.deleteMany({ where: { id: { in: old.map((r) => r.id) } } });
}

/**
 * Returns a run that is still crawling (started < 10 minutes ago), or null.
 * Older "running" runs are marked failed — the process that owned them died.
 */
export async function activeAuditRun() {
  const cutoff = new Date(Date.now() - STALE_RUN_MS);
  await prisma.seoAuditRun.updateMany({
    where: { status: "running", startedAt: { lt: cutoff } },
    data: { status: "failed", error: "The audit was interrupted before it finished.", finishedAt: new Date() },
  });
  return prisma.seoAuditRun.findFirst({ where: { status: "running" }, orderBy: { startedAt: "desc" } });
}

/** True while a run is still crawling (and not yet considered crashed). */
export function isRunLive(run: { status: string; startedAt: Date } | null | undefined): boolean {
  return !!run && run.status === "running" && Date.now() - run.startedAt.getTime() < STALE_RUN_MS;
}

/** Crawls the sitemap and stores a complete run. Never throws for crawl problems. */
export async function runSeoAudit({ baseUrl, scope }: { baseUrl: string; scope: AuditScope }): Promise<{ runId: string; status: "done" | "failed"; error?: string }> {
  const base = normalizeBase(baseUrl);
  const run = await prisma.seoAuditRun.create({ data: { baseUrl: base } });
  try {
    const entries = await sitemapPaths();
    const paths = selectScope(entries, scope);
    if (!paths.length) throw new Error("The sitemap returned no pages.");
    const canonicals = await overrideCanonicals().catch(() => new Map<string, string>());

    const results = await mapLimit(paths, CONCURRENCY, (path) =>
      auditPath(base, path, { inSitemap: true, overrideCanonical: canonicals.get(path) ?? null }),
    );
    applyDuplicateFlags(results);

    for (let i = 0; i < results.length; i += 200) {
      await prisma.seoAuditPage.createMany({ data: results.slice(i, i + 200).map((r) => toRow(run.id, r)) });
    }
    const avgScore = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
    await prisma.seoAuditRun.update({
      where: { id: run.id },
      data: { status: "done", pageCount: results.length, avgScore, finishedAt: new Date() },
    });
    return { runId: run.id, status: "done" };
  } catch (err) {
    const message = ((err as Error)?.message || "Unknown error").slice(0, 500);
    await prisma.seoAuditRun
      .update({ where: { id: run.id }, data: { status: "failed", error: message, finishedAt: new Date() } })
      .catch(() => {});
    return { runId: run.id, status: "failed", error: message };
  } finally {
    await pruneAuditRuns().catch((e) => console.error("seo-audit: prune failed —", e));
  }
}

/** Re-runs duplicate detection over a stored run and refreshes its totals. */
async function refreshRun(runId: string) {
  const rows = await prisma.seoAuditPage.findMany({
    where: { runId },
    select: { id: true, path: true, statusCode: true, title: true, description: true, issues: true, score: true },
  });
  const working = rows.map((r) => ({ ...r, issues: parseIssues(r.issues) }));
  const before = new Map(working.map((r) => [r.id, JSON.stringify(r.issues) + r.score]));
  applyDuplicateFlags(working);
  for (const r of working) {
    if (before.get(r.id) === JSON.stringify(r.issues) + r.score) continue;
    await prisma.seoAuditPage.update({
      where: { id: r.id },
      data: { issues: r.issues as unknown as Prisma.InputJsonValue, score: r.score },
    });
  }
  const avgScore = working.length ? Math.round(working.reduce((s, r) => s + r.score, 0) / working.length) : 0;
  await prisma.seoAuditRun.update({ where: { id: runId }, data: { pageCount: working.length, avgScore } });
}

/**
 * Re-checks a single path and stores the fresh result in the latest completed
 * run (replacing that path's row), so the overview and history stay one run
 * per full crawl. Creates a run only when none exists yet.
 */
export async function recheckSeoPath({ baseUrl, path }: { baseUrl: string; path: string }) {
  const base = normalizeBase(baseUrl);
  const [entries, override] = await Promise.all([
    sitemapPaths().catch(() => [] as SitemapPath[]),
    prisma.seoEntry.findUnique({ where: { path }, select: { canonical: true } }),
  ]);
  const result = await auditPath(base, path, {
    inSitemap: entries.some((e) => e.path === path),
    overrideCanonical: override?.canonical?.trim() || null,
  });

  let run = await prisma.seoAuditRun.findFirst({ where: { status: "done" }, orderBy: { startedAt: "desc" } });
  if (!run) {
    run = await prisma.seoAuditRun.create({ data: { baseUrl: base, status: "done", finishedAt: new Date() } });
  }
  await prisma.$transaction([
    prisma.seoAuditPage.deleteMany({ where: { runId: run.id, path } }),
    prisma.seoAuditPage.create({ data: toRow(run.id, result) }),
  ]);
  await refreshRun(run.id);
  return { runId: run.id, score: result.score, statusCode: result.statusCode };
}
