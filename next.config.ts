import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

/* =========================================================== public URLs */

/*
 * Nov 17 2026 (client): every page of the old WordPress site must answer at its
 * EXACT old address, not through a redirect. app/_data/public-urls.json maps
 * each route folder to that address (`pages`) and lists the other old
 * addresses that showed the same content (`aliases`); lib/public-urls.ts turns
 * route paths into those addresses for links, canonicals and the sitemap.
 *
 *   old address  ──rewrite──▶  route folder        (200, address unchanged)
 *   route folder ──redirect─▶  old address         (one public URL per page)
 *
 * Posts are served at the root (/<slug>/) by app/[slug]; organization profiles
 * at /custom-box/<slug>/ by app/custom-box/[slug]. Only URLs the old site
 * itself redirected (or that were test pages / spam) are redirects here.
 */
const PUBLIC = JSON.parse(readFileSync(path.join(process.cwd(), "app/_data/public-urls.json"), "utf8")) as {
  pages: Record<string, string>;
  aliases: Record<string, string>;
};
const noSlash = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);
/** The public address of a route path (same rules as lib/public-urls.ts, for the static maps below). */
const pub = (route: string) => {
  const r = noSlash(route);
  if (PUBLIC.pages[r]) return PUBLIC.pages[r];
  const post = r.match(/^\/news\/([^/]+)$/);
  if (post) return `/${post[1]}/`;
  return r === "/" ? "/" : `${r}/`;
};

/**
 * Old URLs that the old site itself redirected, or that pointed at test pages,
 * typos and retired forms — kept as permanent redirects to the right page.
 * (Old URLs that showed a page are NOT here: they are real pages now.)
 */
const LEGACY_REDIRECTS: Record<string, string> = {
  // Retired on this site before launch.
  "/quote": "/contact?topic=quote#enquiry",
  "/programs/iso-17025": "/programs/testing-laboratories",
  "/programs/sme-funding-readiness": "/programs/smes-accreditation-program",
  "/directory": "/directory/accredited-organizations",
  "/adao": "/directory/accredited-organizations",
  "/accredited-organizations-directory": "/directory/accredited-organizations",
  // Redirected (or missing) on the old site, found by the Nov 17 2026 audit.
  "/aaa-management-structure": "/governance-leadership",
  "/aaa-technical-committee": "/advisory-committees",
  "/product-certification-bodies-accreditation-iso-iec-17065": "/programs/iso-17065",
  "/testing-calibration-laboratories-accreditation-iso-iec-17025": "/programs/testing-laboratories",
  "/training-providers-accreditation": "/programs/astm-e2659",
  "/role-of-healthcare-accreditation-in-healthcare-system-bodies": "/programs/healthcare",
  "/role-of-accreditation-in-healthcare-system-bodies": "/programs/healthcare",
  "/role-of-accreditation-in-healthcare-system-bodies/why-aaa-accreditation": "/programs/healthcare/why-aaa",
  "/role-of-accreditation-in-healthcare-system-bodies/international-recognition": "/programs/healthcare/international-recognition",
  "/role-of-accreditation-in-healthcare-system-bodies/accreditation-standards": "/programs/healthcare/standards",
  "/role-of-accreditation-in-healthcare-system-bodies/accreditation-process": "/programs/healthcare/process",
  "/role-of-accreditation-in-healthcare-system-bodies/who-can-be-accredited": "/programs/healthcare/who-can-apply",
  "/role-of-accreditation-in-healthcare-system-bodies/consultation-services": "/programs/healthcare/consultation",
  "/10-advantages-of-national-accreditation": "/news/how-to-become-an-accredited-training-center",
  "/pdc-gain-the-organizational-membership-of-aaa": "/news/ptc-gain-the-organizational-membership-of-aaa",
  "/2": "/news/2022-workplace-learning-report",
  "/feed": "/news",
  "/comments/feed": "/news",
  // Test and draft pages that were left published on the old site.
  "/aaa-american-accreditation-association-test": "/",
  "/accredited-organizations-test": "/directory/accredited-organizations",
  "/healthcare-accreditation-test2": "/programs/healthcare",
  "/6643-2": "/",
  "/sample-page": "/",
  "/formtest": "/",
  "/test-form": "/",
  "/test-2": "/",
  "/test2": "/",
  "/test3": "/",
  "/test10": "/",
  "/timer": "/",
  "/files": "/",
  "/loginfiles": "/",
};

/** Whole families of old URLs the old site redirected (Nov 17 2026 audit). */
const LEGACY_PATTERNS = [
  // Pre-2021 permalinks: /index.php/<page>/ and dated /YYYY/MM/DD/<post>/.
  { source: "/index.php/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/:slug", destination: "/:slug/" },
  { source: "/:y(\\d{4})/:m(\\d{2})/:d(\\d{2})/:slug", destination: "/:slug/" },
  { source: "/index.php", destination: "/" },
  { source: "/index.php/:path+", destination: "/:path+/" },
  // Certificate links typed with "adao" instead of the ADCP portal's "adcp".
  { source: "/adao/CertificateDetails/:id", destination: "/adcp/CertificateDetails/:id/" },
  // Box archives.
  { source: "/aaa_box/training-education-providers-accreditation/:rest*", destination: pub("/programs/training-education") },
  { source: "/aaa_box/conformity-assessment-bodies-accreditation/:rest*", destination: pub("/programs/conformity-assessment-bodies") },
  { source: "/aaa_box/:rest*", destination: "/" },
  // /news/2/ was page 2 of the old news page; author archives were already broken there.
  { source: "/news/:n(\\d{1,3})", destination: "/news/page/:n/" },
  { source: "/author/:name/:rest*", destination: "/news/" },
  /*
   * WordPress "page 2" of a page or post (/about-aaa/2/), which the old site
   * 301'd to the page itself. Two-segment paths only, and never under a
   * section of this site that has children of its own.
   */
  {
    source: "/:slug((?!(?:news|articles|category|tag|custom-box|case-studies|media|api|admin|_next)/)[^/.]+)/:n(\\d{1,3})",
    destination: "/:slug/",
  },
].map((r) => ({ ...r, permanent: true }));

/**
 * WordPress shortlinks: /?p=<post id> and /?page_id=<page id>, which the old
 * site redirected to the post or page (ids from its REST API, Nov 2026).
 */
function shortlinkRedirects() {
  try {
    const file = path.join(process.cwd(), "app/_data/legacy-wp-ids.json");
    const ids = JSON.parse(readFileSync(file, "utf8")) as Record<"p" | "page_id", Record<string, string>>;
    return (["p", "page_id"] as const).flatMap((key) =>
      Object.entries(ids[key] ?? {}).map(([id, to]) => ({
        source: "/",
        has: [{ type: "query" as const, key, value: id }],
        destination: to === "/" ? "/" : `${noSlash(to)}/`,
        permanent: true,
      }))
    );
  } catch {
    return [];
  }
}

/* ================================================================ config */

const IMAGE_EXT = "webp|png|jpg|jpeg|svg|gif|avif|ico|mp4|webm";

const nextConfig: NextConfig = {
  /*
   * This project lives under ~/Documents, which iCloud Drive syncs. iCloud
   * deletes/moves files inside the build dir while the dev server is using
   * them, causing intermittent 500s (ENOENT on *-manifest.json / page.js).
   * iCloud ignores anything ending in ".nosync", so locally we name the build
   * dir ".next.nosync" — it stays inside the project (so node_modules
   * resolution for postcss/tailwind keeps working) but iCloud leaves it alone.
   *
   * The Docker image (Dockerfile, for the Contabo server) builds with
   * NEXT_OUTPUT=standalone. That build uses the default ".next" — the
   * Dockerfile copies .next/standalone and .next/static out of it — and emits
   * the self-contained server.js the container runs.
   */
  distDir: process.env.VERCEL || process.env.NEXT_OUTPUT ? ".next" : ".next.nosync",
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,

  /*
   * WordPress addresses end in "/" and so do ours (Nov 2026). Next's own
   * add-the-slash redirect is skipped: proxy.ts adds it for pages only, so
   * /api, /admin and NextAuth keep their exact URLs.
   */
  trailingSlash: true,
  skipTrailingSlashRedirect: true,

  // Caddy compresses every response (zstd, else gzip). Compressing here too
  // only spends CPU and hides responses from Caddy's better zstd encoder.
  compress: false,
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Fewer, better-spaced widths: shorter srcset attributes in every page and
    // fewer variants to generate; nothing renders wider than 1920 CSS px.
    deviceSizes: [640, 828, 1080, 1280, 1920],
    imageSizes: [48, 96, 128, 256, 384],
    // Optimized images are kept a week (browser and server) instead of 4 hours.
    minimumCacheTTL: 604800,
    remotePatterns: [
      { protocol: "https", hostname: "aaa-accreditation.org" },
      { protocol: "https", hostname: "www.aaa-accreditation.org" },
    ],
  },

  async rewrites() {
    return {
      beforeFiles: [
        // Old page addresses → the route that renders them.
        ...Object.entries(PUBLIC.pages).map(([route, address]) => ({ source: noSlash(address), destination: route })),
        ...Object.entries(PUBLIC.aliases).map(([address, route]) => ({ source: noSlash(address), destination: route })),
        // WordPress archive shapes.
        { source: "/news/page/:n(\\d+)", destination: "/news/archive/:n" },
        { source: "/articles/page/:n(\\d+)", destination: "/articles/archive/:n" },
        { source: "/category/:slug", destination: "/news/category/:slug" },
        { source: "/category/:slug/page/:n(\\d+)", destination: "/news/category/:slug/:n" },
        { source: "/tag/:slug", destination: "/news/tag/:slug" },
        { source: "/tag/:slug/page/:n(\\d+)", destination: "/news/tag/:slug/:n" },
      ],
      afterFiles: [
        /*
         * The SME funding-readiness self-assessment is a self-contained static
         * app (public/readiness-check/index.html), not an App Router page.
         */
        { source: "/readiness-check", destination: "/readiness-check/index.html" },
      ],
      fallback: [],
    };
  },

  async redirects() {
    return [
      // Route folders → their public (old) address, so each page has one URL.
      ...Object.entries(PUBLIC.pages).map(([route, address]) => ({ source: route, destination: address, permanent: true })),
      { source: "/news/archive/:n(\\d+)", destination: "/news/page/:n/", permanent: true },
      { source: "/articles/archive/:n(\\d+)", destination: "/articles/page/:n/", permanent: true },
      { source: "/news/category/:slug", destination: "/category/:slug/", permanent: true },
      { source: "/news/category/:slug/:n(\\d+)", destination: "/category/:slug/page/:n/", permanent: true },
      { source: "/news/tag/:slug", destination: "/tag/:slug/", permanent: true },
      { source: "/news/tag/:slug/:n(\\d+)", destination: "/tag/:slug/page/:n/", permanent: true },
      // Posts live at the root, as on the old site.
      {
        source: "/news/:slug((?!(?:archive|category|tag|page|\\d+)(?:/|$))[^/.]+)",
        destination: "/:slug/",
        permanent: true,
      },

      ...Object.entries(LEGACY_REDIRECTS).map(([source, to]) => ({ source, destination: pub(to.split(/[?#]/)[0]) + (to.match(/[?#].*$/)?.[0] ?? ""), permanent: true })),
      ...LEGACY_PATTERNS,
      ...shortlinkRedirects(),
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // The migrated documents are immutable once published (files only — not the /documents/ page).
        source: "/documents/:path+\\.:ext(pdf|docx?|xlsx?|pptx?)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // Site images and video in public/: a week fresh, a month stale-while-revalidate.
        // They were served with max-age=0, so every visit re-downloaded them.
        source: `/:dir(images|logo|news|case-studies|accredited|programs|sectors|about|home|docs|video)/:path*\\.:ext(${IMAGE_EXT})`,
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
      {
        source: `/:file([^/]+\\.(?:${IMAGE_EXT}))`,
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" }],
      },
    ];
  },
};

export default nextConfig;
