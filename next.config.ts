import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";

/* ---------------------------------------------------------------- redirects */

/**
 * Legacy WordPress page URLs → their route in this rebuild.
 *
 * Captured from a live audit of https://aaa-accreditation.org on 2026-08-28.
 * Every one of these is an indexed URL today, so shipping without them would
 * throw away years of accumulated ranking and break inbound links.
 */
const LEGACY_PAGES: Record<string, string> = {
  // About / institutional
  "/about-aaa": "/about",
  "/aaa-management-structur": "/about",
  "/aaa-standards": "/about-accreditation",
  "/advisory-technical-committees": "/advisory-committees",
  "/safeguarding-impartiality-policy": "/impartiality-policy",
  "/national-international-partnership": "/partnerships",
  "/international-partnerships": "/partnerships",
  "/become-a-partner": "/partnerships",
  "/privacy-policy": "/privacy",
  "/contact-us": "/contact",
  "/get-a-quote": "/quote",
  "/apply-for-accreditation": "/apply",

  // Healthcare cluster
  "/healthcare-accreditation": "/programs/healthcare",
  "/healthcare-accreditation/why-aaa-accreditation": "/programs/healthcare/why-aaa",
  "/healthcare-accreditation/international-recognition": "/programs/healthcare/international-recognition",
  "/healthcare-accreditation/accreditation-standards": "/programs/healthcare/standards",
  "/healthcare-accreditation/accreditation-process": "/programs/healthcare/process",
  "/healthcare-accreditation/who-can-be-accredited": "/programs/healthcare/who-can-apply",
  "/healthcare-accreditation/consultation-services": "/programs/healthcare/consultation",

  // Program hubs
  "/conformity-assessment-bodies-accreditation": "/programs/conformity-assessment-bodies",
  "/certification-bodies-accreditation": "/programs/conformity-assessment-bodies",
  "/laboratories-accreditation": "/programs/conformity-assessment-bodies",
  "/training-education-providers-accreditation": "/programs/training-education",
  "/training-course-programs-accreditation": "/programs/training-education",
  "/training-courses-accreditation": "/programs/training-education",
  "/school-system-accreditation": "/programs/school-accreditation",

  // ISO scheme pages
  "/system-certification-bodies-accreditation-iso-iec-17021-1": "/programs/iso-17021",
  "/personnel-certification-bodies-accreditation-iso-iec-17024": "/programs/iso-17024",
  "/product-certification-bodies-accreditation-iso-iec-17065-and-halal": "/programs/iso-17065",
  "/inspection-bodies-accreditation-iso-iec-17020": "/programs/iso-17020",
  "/testing-calibration-laboratories-17025-accreditation-bodies": "/programs/iso-17025",
  "/medical-laboratories-accreditation-iso-15189": "/programs/iso-15189",
  "/proficiency-testing-providers-accreditation-iso-iec-17043": "/programs/iso-17043",
  "/training-providers-accreditation-astm-e-2659": "/programs/astm-e2659",

  // Membership
  "/individual-membership": "/membership/individual",
  "/organizational-membership": "/membership/organizational",
  "/membership-application": "/membership/apply",
  "/individual-membership-application": "/membership/individual/apply",
  "/individual-membership-application-recognized-competency-member":
    "/membership/individual/recognized-competency",
  "/organizational-membership-application": "/membership/organizational/apply",

  // Directories
  "/accredited-organizations": "/directory/accredited-organizations",
  "/adao": "/directory/accredited-organizations",
  "/accredited-personnel": "/directory",

  // Accredited-organisation profile pages — no per-client pages in the rebuild,
  // so they land on the register that lists them.
  "/delta-university-for-science-technology-gamasa-egypt": "/directory/accredited-organizations",
  "/american-international-theism-university-florida-usa": "/directory/accredited-organizations",
  "/inspeed-global-sarasota-usa-istanbul-turkey": "/directory/accredited-organizations",
  "/enertech-qatar-safety-doha-qatar": "/directory/accredited-organizations",
  "/american-learning-center-vienna-usa": "/directory/accredited-organizations",

  // The SME program page moved to its client-approved slug (July 2026).
  "/programs/sme-funding-readiness": "/programs/smes-accreditation-program",
};

/**
 * Post permalinks changed shape: WordPress served them at the site root
 * (`/<slug>/`), this build serves them under `/news/<slug>`. The slug list is
 * read from the migration snapshot so it stays in sync automatically.
 *
 * A blanket `/:slug → /news/:slug` rule is NOT possible: `app/[slug]` is the
 * CMS catch-all for database-authored pages and would be shadowed by it.
 */
function newsPostRedirects() {
  try {
    const file = path.join(process.cwd(), "app/news/posts-data.json");
    const posts = JSON.parse(readFileSync(file, "utf8")) as { slug: string }[];
    const reserved = new Set(Object.keys(LEGACY_PAGES).map((p) => p.slice(1)));

    return posts
      .filter((p) => p.slug && !reserved.has(p.slug))
      .map((p) => ({
        source: `/${p.slug}`,
        destination: `/news/${p.slug}`,
        permanent: true,
      }));
  } catch {
    // Never fail the build over a missing snapshot.
    return [];
  }
}

const nextConfig: NextConfig = {
  /*
   * This project lives under ~/Documents, which iCloud Drive syncs. iCloud
   * deletes/moves files inside the build dir while the dev server is using
   * them, causing intermittent 500s (ENOENT on *-manifest.json / page.js).
   * iCloud ignores anything ending in ".nosync", so locally we name the build
   * dir ".next.nosync" — it stays inside the project (so node_modules
   * resolution for postcss/tailwind keeps working) but iCloud leaves it alone.
   *
   * Vercel has no iCloud and expects the default ".next" output directory, so
   * we only apply the ".nosync" override for local builds (VERCEL is unset).
   */
  distDir: process.env.VERCEL ? ".next" : ".next.nosync",

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "aaa-accreditation.org" },
      { protocol: "https", hostname: "www.aaa-accreditation.org" },
    ],
  },

  async rewrites() {
    return [
      /*
       * The SME funding-readiness self-assessment is a self-contained static
       * app (public/readiness-check/index.html), not an App Router page. Next
       * serves public/ files by exact path only, so map the clean URL onto it.
       */
      { source: "/readiness-check", destination: "/readiness-check/index.html" },
    ];
  },

  async redirects() {
    const pages = Object.entries(LEGACY_PAGES).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));

    return [
      ...pages,

      // WordPress archive pagination and the single author archive.
      { source: "/news/page/:n", destination: "/news", permanent: true },
      { source: "/author/:name", destination: "/news", permanent: true },
      { source: "/category/:name", destination: "/news", permanent: true },
      { source: "/tag/:name", destination: "/news", permanent: true },

      ...newsPostRedirects(),
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
        // The migrated documents and images are immutable once published.
        source: "/documents/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
