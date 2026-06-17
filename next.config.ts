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
};

export default nextConfig;
