import { SITE_URL } from "@/lib/seo";
import { hasFileExtension, isSkippedPath, stripTrailingSlash } from "@/lib/redirect-map";

/**
 * Validation and normalisation for managed redirects. Pure functions — the
 * server actions feed them the current rule graph from the database.
 */

const OWN_HOSTS = new Set([new URL(SITE_URL).host, `www.${new URL(SITE_URL).host}`]);

type Result<T> = { ok: true; value: T } | { ok: false; error: string };

const QUERY_ERROR =
  "Leave the ?query and #fragment off the source — redirects match the path only, and the visitor's query string is carried over automatically.";

/** Source path: "/old-page" (a pasted full URL on this site is accepted and reduced to its path). */
export function normalizeFrom(raw: string): Result<string> {
  let v = raw.trim();
  if (!v) return { ok: false, error: "Enter the old path to redirect from, e.g. /old-page." };
  if (/^https?:\/\//i.test(v)) {
    let u: URL;
    try {
      u = new URL(v);
    } catch {
      return { ok: false, error: "The source isn't a valid URL." };
    }
    if (!OWN_HOSTS.has(u.host.toLowerCase())) {
      return { ok: false, error: "The source must be a path on this site, e.g. /old-page." };
    }
    if (u.search || u.hash) return { ok: false, error: QUERY_ERROR };
    v = u.pathname;
  }
  if (!v.startsWith("/") || v.startsWith("//")) {
    return { ok: false, error: 'The source must start with "/", e.g. /old-page.' };
  }
  if (/[?#]/.test(v)) return { ok: false, error: QUERY_ERROR };
  if (/\s/.test(v)) return { ok: false, error: "The source can't contain spaces." };
  if (v.length > 500) return { ok: false, error: "The source path is too long (500 characters at most)." };
  v = stripTrailingSlash(v);
  if (v === "/") return { ok: false, error: "The home page can't be redirected." };
  if (isSkippedPath(v)) {
    return { ok: false, error: "Paths under /_next, /api, /admin and /media can't be redirected." };
  }
  if (hasFileExtension(v)) {
    return {
      ok: false,
      error:
        "File URLs (ending in .pdf, .html, .php …) bypass the redirect layer. Ask a developer to add them to next.config.ts instead.",
    };
  }
  return { ok: true, value: v };
}

export type Target = {
  /** What gets stored: a site path (with optional ?query/#hash) or an absolute URL. */
  value: string;
  /** The path on this site the target lands on, or null for an external URL. */
  internalPath: string | null;
};

/** Destination: "/new-page", "/contact?topic=quote#enquiry" or "https://…". */
export function normalizeTo(raw: string): Result<Target> {
  let v = raw.trim();
  if (!v) return { ok: false, error: "Enter the destination path or URL." };
  if (/\s/.test(v)) return { ok: false, error: "The destination can't contain spaces." };
  if (v.length > 1000) return { ok: false, error: "The destination is too long (1,000 characters at most)." };

  if (/^https?:\/\//i.test(v)) {
    let u: URL;
    try {
      u = new URL(v);
    } catch {
      return { ok: false, error: "The destination isn't a valid URL." };
    }
    if (!OWN_HOSTS.has(u.host.toLowerCase())) return { ok: true, value: { value: v, internalPath: null } };
    // A full URL on this site is stored as a path, so it also works on preview hosts.
    v = `${u.pathname}${u.search}${u.hash}`;
  }

  if (!v.startsWith("/") || v.startsWith("//")) {
    return { ok: false, error: 'The destination must be a path starting with "/" or a full https:// URL.' };
  }
  const m = /^([^?#]*)(.*)$/.exec(v);
  const path = stripTrailingSlash(m?.[1] || "/");
  const rest = m?.[2] ?? "";
  try {
    new URL(`${path}${rest}`, SITE_URL);
  } catch {
    return { ok: false, error: "The destination isn't a valid path." };
  }
  return { ok: true, value: { value: `${path}${rest}`, internalPath: path } };
}

/** Rule graph: source path → the internal path it lands on (null = external). */
export type RuleGraph = Map<string, string | null>;

export function graphFrom(rows: { from: string; to: string }[]): RuleGraph {
  const g: RuleGraph = new Map();
  for (const r of rows) {
    const t = normalizeTo(r.to);
    g.set(r.from, t.ok ? t.value.internalPath : null);
  }
  return g;
}

/**
 * If adding `from → toPath` would close a loop through the existing rules,
 * returns the loop (e.g. ["/a", "/b", "/a"]); otherwise null.
 */
export function findLoop(from: string, toPath: string | null, graph: RuleGraph): string[] | null {
  if (!toPath) return null;
  if (toPath === from) return [from, from];
  const chain = [from, toPath];
  let cur = toPath;
  for (let i = 0; i < 50; i++) {
    const next = graph.get(cur);
    if (next == null) return null;
    if (next === from) return [...chain, next];
    if (chain.includes(next)) return null; // an older loop elsewhere, not closed by this rule
    chain.push(next);
    cur = next;
  }
  return null;
}

/**
 * One bulk-paste line: "/old /new", "/old,/new", "/old -> /new" or
 * "/old /new 307". Returns null for blank lines and # comments.
 */
export function parseBulkLine(line: string): { from: string; to: string; permanent?: boolean } | { error: string } | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  const tokens = trimmed
    .replace(/\s*(?:->|=>|→)\s*/g, " ")
    .split(/[\s,;]+/)
    .filter(Boolean);
  if (tokens.length < 2 || tokens.length > 3) {
    return { error: "Expected “/old-path /new-path” (optionally followed by 301/308 or 302/307)." };
  }
  let permanent: boolean | undefined;
  if (tokens[2]) {
    const t = tokens[2].toLowerCase();
    if (["301", "308", "permanent", "perm"].includes(t)) permanent = true;
    else if (["302", "303", "307", "temporary", "temp"].includes(t)) permanent = false;
    else return { error: `Unknown redirect type “${tokens[2]}” — use 308 (permanent) or 307 (temporary).` };
  }
  return { from: tokens[0], to: tokens[1], permanent };
}
