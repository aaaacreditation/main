import { prisma } from "./db";

/**
 * Managed redirects (admin → SEO → Redirects), resolved at request time by
 * proxy.ts.
 *
 * The whole Redirect table is held in an in-memory map that is refreshed at
 * most once a minute, so a page view costs one Map lookup — never a query.
 * The store lives on globalThis so the proxy bundle and the admin server
 * actions share it when they run in the same Node process (dev, `next start`
 * on a single server): a save in the admin then takes effect on the next
 * request. Where the proxy runs in its own process/function (Vercel), the
 * 60-second refresh is the propagation path instead.
 *
 * Database trouble never breaks the site: the last good map (or an empty one)
 * keeps serving and refreshes back off exponentially, capped at 10 minutes.
 */

export type RedirectRule = { to: string; permanent: boolean };

type Store = {
  map: Map<string, RedirectRule>;
  /** When the map was last loaded successfully; 0 = never / invalidated. */
  loadedAt: number;
  inflight: Promise<void> | null;
  /** Bumped on every invalidation so an older in-flight load can't win. */
  version: number;
  failures: number;
  retryAt: number;
};

const TTL_MS = 60_000;
const BACKOFF_BASE_MS = 60_000;
const BACKOFF_MAX_MS = 10 * 60_000;
/** On a cold start, how long a request may wait for the first load. */
const FIRST_LOAD_WAIT_MS = 1_500;

const KEY = Symbol.for("aaa.redirect-map");

function store(): Store {
  const g = globalThis as unknown as Record<symbol, Store | undefined>;
  let s = g[KEY];
  if (!s) {
    s = { map: new Map(), loadedAt: 0, inflight: null, version: 0, failures: 0, retryAt: 0 };
    g[KEY] = s;
  }
  return s;
}

async function load(s: Store): Promise<void> {
  const version = s.version;
  try {
    const rows = await prisma.redirect.findMany({
      select: { from: true, to: true, permanent: true },
    });
    if (s.version !== version) return; // invalidated mid-flight: leave loadedAt at 0
    s.map = new Map(rows.map((r) => [r.from, { to: r.to, permanent: r.permanent }]));
    s.loadedAt = Date.now();
    s.failures = 0;
    s.retryAt = 0;
  } catch (err) {
    s.failures += 1;
    s.retryAt = Date.now() + Math.min(BACKOFF_BASE_MS * 2 ** (s.failures - 1), BACKOFF_MAX_MS);
    if (s.failures === 1) {
      console.warn("redirects: could not load the Redirect table; serving without managed redirects —", (err as Error)?.message?.split("\n").filter(Boolean).pop());
    }
  } finally {
    s.inflight = null;
  }
}

/**
 * The managed redirect for a normalised path (no trailing slash), if any.
 * Also tries the percent-decoded form, so a source typed with non-ASCII
 * characters in the admin matches the encoded request path.
 */
export async function lookupRedirect(path: string): Promise<(RedirectRule & { from: string }) | null> {
  const s = store();
  const now = Date.now();
  if (!s.inflight && now - s.loadedAt > TTL_MS && now >= s.retryAt) {
    s.inflight = load(s);
  }
  // Never loaded in this process yet (or just invalidated by an admin save):
  // give that load a moment so the first request still redirects. Otherwise —
  // including retries after a failure — the refresh runs in the background
  // and the current map answers.
  if (s.loadedAt === 0 && s.failures === 0 && s.inflight) {
    await Promise.race([s.inflight, new Promise((r) => setTimeout(r, FIRST_LOAD_WAIT_MS))]);
  }
  const hit = s.map.get(path);
  if (hit) return { ...hit, from: path };
  let decoded = path;
  try {
    decoded = decodeURIComponent(path);
  } catch {
    /* malformed escape: exact match only */
  }
  const alt = decoded !== path ? s.map.get(decoded) : undefined;
  return alt ? { ...alt, from: decoded } : null;
}

/** Drop the cached map so the next request reloads it (call after any write). */
export function invalidateRedirectCache(): void {
  const s = store();
  s.version += 1;
  s.loadedAt = 0;
  s.retryAt = 0;
  s.failures = 0;
}

/** Count a hit. Fire-and-forget: resolves either way, never throws. */
export function recordRedirectHit(from: string): Promise<void> {
  return prisma.redirect
    .updateMany({ where: { from }, data: { hits: { increment: 1 } } })
    .then(
      () => undefined,
      () => undefined,
    );
}

/* ------------------------------------------------------------- validation */

/** Path prefixes the proxy never redirects (and the admin refuses as a source). */
export const REDIRECT_SKIP_PREFIXES = ["/_next", "/api", "/admin", "/media"];

export function isSkippedPath(path: string): boolean {
  return REDIRECT_SKIP_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

/** Last path segment contains a dot → a file URL, which proxy.ts's matcher excludes. */
export function hasFileExtension(path: string): boolean {
  const last = path.split("/").pop() ?? "";
  return last.includes(".");
}

/** "/Foo/" → "/Foo"; keeps "/" as is. Does not touch query/hash. */
export function stripTrailingSlash(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") || "/" : path;
}
