import { NextRequest, NextResponse, type NextFetchEvent } from "next/server";
import { GATED_HOST } from "./lib/gating";
import { isSkippedPath, lookupRedirect, recordRedirectHit, stripTrailingSlash } from "./lib/redirect-map";

/*
 * The sme.aaa-accreditation.org subdomain went live before the rest of the
 * site was ready (July 2026). On that host ONLY, every route except the SME
 * program page — and the routes it needs to function — temporarily redirects
 * to the program page.
 *
 * Localhost, Vercel preview URLs, and any future production domain are
 * unaffected, so the rest of the site can keep being built and reviewed.
 * When the full site launches, remove ONLY the GATED_HOST block below — this
 * file also serves the 410s for spam URLs, the canonical Link headers and the
 * admin-managed redirects, which must stay.
 */

const ALLOWED_PREFIXES = [
  "/programs/smes-accreditation-program", // the live page
  "/programs/sme-funding-readiness", // old slug (308s to the new one)
  "/readiness-check", // self-assessment app iframed on the page
  "/apply", // the page's primary CTA
  "/api/leads", // lead-capture endpoint
];

/*
 * The SME program page is served on BOTH aaa-accreditation.org and
 * sme.aaa-accreditation.org. Identical content on two hostnames splits the
 * ranking signals between them, and the page itself is client-frozen so a
 * <link rel="canonical"> cannot be added to its markup. An HTTP `Link:
 * rel="canonical"` header is equivalent for search engines and can be applied
 * here instead, pointing both hosts at the primary domain.
 */
const CANONICAL_ORIGIN = "https://aaa-accreditation.org";

/*
 * SEO-spam posts injected into the legacy WordPress site (casino/betting, in
 * Polish, Turkish and English). They are deliberately absent from the migrated
 * content, so they would 404 — but 410 Gone tells search engines the URL is
 * permanently removed and gets it dropped from the index far faster, which
 * matters because these pages currently rank under the AAA domain.
 *
 * Captured 2026-08-28. Re-check before launch: the newest was published
 * 2026-04-03, so the injection vector may still be open.
 */
const GONE = new Set([
  "/jakie-nowosci-w-unibet-casino-przyciagaja-uwage-graczy",
  "/unibet-casino-jak-prezentuje-swoj-program-lojalnosciowy",
  "/czy-unibet-casino-ma-najlepsze-gry-na-rynku",
  "/unibet-casino-jak-analizowac-wyniki-gier",
  "/rokubet-bonus-kisitlamalari-mekanizmalar-ve-oyuncu-icin-anla",
  "/how-to-check-your-winomania-account-balance-efficiently",
  "/what-are-the-payment-withdrawal-options-at-mr-sloty",
]);

/*
 * Routes whose page files are client-frozen and therefore cannot declare
 * `alternates.canonical` in their own metadata. An HTTP `Link: rel="canonical"`
 * header is equivalent for search engines, so it is applied here instead —
 * on every host, not just the gated subdomain.
 */
const FROZEN_CANONICAL = new Set([
  "/programs/iso-17021",
  "/programs/smes-accreditation-program",
]);

function withCanonical(res: NextResponse, path: string) {
  res.headers.set("Link", `<${CANONICAL_ORIGIN}${path}>; rel="canonical"`);
  return res;
}

/*
 * Managed redirects — the admin's SEO → Redirects table (lib/redirect-map.ts
 * keeps it in memory, refreshed at most once a minute). They apply on every
 * host except the gated subdomain, never to /_next, /api, /admin or /media,
 * and never to file URLs (the matcher below skips dotted paths). Coded
 * redirects in next.config.ts run before proxy and therefore win.
 */
async function managedRedirect(request: NextRequest, path: string, event: NextFetchEvent) {
  if (!path || isSkippedPath(path)) return null;
  const rule = await lookupRedirect(path);
  if (!rule) return null;

  let dest: URL;
  try {
    dest = new URL(rule.to, request.nextUrl.href);
  } catch {
    return null;
  }
  // Carry the visitor's query string over; parameters already on the target win.
  const own = new Set(dest.searchParams.keys());
  request.nextUrl.searchParams.forEach((value, name) => {
    if (!own.has(name)) dest.searchParams.append(name, value);
  });
  // A rule pointing at its own source would loop forever — ignore it.
  if (dest.origin === request.nextUrl.origin && stripTrailingSlash(dest.pathname) === path) return null;

  event.waitUntil(recordRedirectHit(rule.from));
  return NextResponse.redirect(dest, rule.permanent ? 308 : 307);
}

export async function proxy(request: NextRequest, event: NextFetchEvent) {
  const path = request.nextUrl.pathname.replace(/\/$/, "");
  if (GONE.has(path)) {
    return new NextResponse(null, {
      status: 410,
      headers: { "X-Robots-Tag": "noindex" },
    });
  }

  const host = request.headers.get("host")?.split(":")[0];
  if (host !== GATED_HOST) {
    const managed = await managedRedirect(request, path, event);
    if (managed) return managed;
    return FROZEN_CANONICAL.has(path)
      ? withCanonical(NextResponse.next(), path)
      : NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const allowed = ALLOWED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (allowed) return withCanonical(NextResponse.next(), pathname);

  const url = request.nextUrl.clone();
  url.pathname = "/programs/smes-accreditation-program";
  url.search = "";
  /*
   * 307 (temporary), NOT 308 — the gated pages will go live later, and a
   * cached permanent redirect would keep bouncing visitors after launch.
   */
  return NextResponse.redirect(url, 307);
}

export const config = {
  /*
   * Skip _next internals and any path with a file extension (images, fonts,
   * documents, favicon) so the allowed page's assets always load.
   */
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
