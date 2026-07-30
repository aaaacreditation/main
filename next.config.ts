import type { NextConfig } from "next";

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

  /*
   * The SME funding-readiness self-assessment is a self-contained static app
   * (public/readiness-check/index.html), not an App Router page. Next serves
   * public/ files by exact path only, so map the clean URL onto the file.
   */
  async rewrites() {
    return [
      { source: "/readiness-check", destination: "/readiness-check/index.html" },
    ];
  },

  /*
   * The SME program page moved to /programs/smes-accreditation-program (July
   * 2026) to match its client-approved name. Permanently redirect the old
   * slug so existing links and indexed search results don't 404.
   */
  async redirects() {
    return [
      {
        source: "/programs/sme-funding-readiness",
        destination: "/programs/smes-accreditation-program",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
