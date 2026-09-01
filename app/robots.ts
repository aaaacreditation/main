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

  /*
   * Client-review and staging deployments must never be indexed: they serve
   * the same pages as the live site, so search engines would treat them as
   * duplicate content competing with aaa-accreditation.org.
   *
   * Vercel adds `X-Robots-Tag: noindex` to PREVIEW deployments on its own, but
   * NOT to a production deployment — and a separate demo project's own
   * production build on *.vercel.app is exactly that. Set NOINDEX=true in
   * that project's environment variables to close it off.
   *
   * Opt-in by design: with the variable unset this behaves exactly as before,
   * so the live site and the SME subdomain are unaffected.
   */
  if (process.env.NOINDEX === "true") {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

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
