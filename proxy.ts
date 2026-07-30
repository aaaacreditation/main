import { NextRequest, NextResponse } from "next/server";

/*
 * The sme.aaa-accreditation.org subdomain went live before the rest of the
 * site was ready (July 2026). On that host ONLY, every route except the SME
 * program page — and the routes it needs to function — temporarily redirects
 * to the program page.
 *
 * Localhost, Vercel preview URLs, and any future production domain are
 * unaffected, so the rest of the site can keep being built and reviewed.
 * DELETE THIS FILE when the full site launches.
 */

const GATED_HOST = "sme.aaa-accreditation.org";

const ALLOWED_PREFIXES = [
  "/programs/smes-accreditation-program", // the live page
  "/programs/sme-funding-readiness", // old slug (308s to the new one)
  "/readiness-check", // self-assessment app iframed on the page
  "/apply", // the page's primary CTA
  "/api/leads", // lead-capture endpoint
];

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0];
  if (host !== GATED_HOST) return NextResponse.next();

  const { pathname } = request.nextUrl;
  const allowed = ALLOWED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (allowed) return NextResponse.next();

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
