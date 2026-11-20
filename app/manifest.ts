import type { MetadataRoute } from "next";
import { SITE_NAME } from "../lib/seo";

/**
 * Web app manifest (Nov 2026 SEO pass): name, brand colours and the AAA seal
 * as the icon for "Add to home screen", browser tabs and Google's site name /
 * favicon signals. The icons are the seal padded to a square on white.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "AAA",
    description: "International accreditation for healthcare, conformity assessment bodies, training providers, schools and SMEs.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#173d73",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
