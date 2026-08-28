import type { MetadataRoute } from "next";
import { SITE_URL } from "../lib/seo";

/**
 * robots.txt.
 *
 * AI answer engines are allowed deliberately: AAA's business is being cited as
 * an authority on accreditation, so appearing in generative answers is upside,
 * not leakage. Only the admin CMS, the API and the internal landing/lab pages
 * are closed off.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/api/", "/lp/", "/about/components"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Named explicitly so a future blanket rule can't silently shut them out.
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Claude-User", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      { userAgent: "CCBot", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
