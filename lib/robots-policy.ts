import type { MetadataRoute } from "next";
import { SITE_URL } from "./seo";
import type { SeoSettings } from "./site-settings";

/** Crawler groups for robots.txt (app/robots.ts) and the admin's preview of it. */

/**
 * AI crawlers, in two groups the admin can open or close separately
 * (SEO Center → Search engines & AI, Nov 2026):
 *
 * - AI_SEARCH fetch a page to answer a person's question and cite it
 *   (ChatGPT search, Claude, Perplexity, DuckDuckGo, Mistral, Alexa). Being
 *   cited is AAA's upside — it sells authority — so they are open by default.
 * - AI_TRAINING collect pages to train models. Also open by default (the same
 *   reasoning: the models then "know" AAA), but a client may prefer to close it.
 *
 * Google Search and Bing themselves are never affected: Googlebot and Bingbot
 * fall under "*". Google-Extended only controls Gemini training/grounding.
 */
export const AI_SEARCH = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "DuckAssistBot",
  "MistralAI-User",
  "Amazonbot",
];
export const AI_TRAINING = ["GPTBot", "ClaudeBot", "Google-Extended", "Applebot-Extended", "CCBot", "meta-externalagent"];

/** Closed to every crawler: the admin, the API, internal landing/lab pages. */
export const BASE_DISALLOW = ["/admin", "/api/", "/lp/", "/about/components", "/sitemaps/"];



/** The live site's robots.txt rules for the given settings (app/robots.ts). */
export function robotsRules(settings: Pick<SeoSettings, "aiSearch" | "aiTraining" | "robotsDisallow">): MetadataRoute.Robots {
  const disallow = [...BASE_DISALLOW, ...settings.robotsDisallow];
  const group = (agents: string[], policy: "allow" | "block") =>
    policy === "allow" ? { userAgent: agents, allow: "/", disallow } : { userAgent: agents, disallow: "/" };
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // Named explicitly so a future blanket rule can't silently change them.
      group(AI_SEARCH, settings.aiSearch),
      group(AI_TRAINING, settings.aiTraining),
    ],
    // The old WordPress site's index, already submitted in Search Console.
    sitemap: `${SITE_URL}/sitemap_index.xml`,
    host: SITE_URL,
  };
}

/** robots.txt text for rules, in the same layout Next.js writes (admin preview). */
export function robotsText(robots: MetadataRoute.Robots): string {
  const lines: string[] = [];
  const list = Array.isArray(robots.rules) ? robots.rules : [robots.rules];
  for (const r of list) {
    for (const ua of ([] as string[]).concat(r.userAgent ?? "*")) lines.push(`User-Agent: ${ua}`);
    for (const a of ([] as string[]).concat(r.allow ?? [])) lines.push(`Allow: ${a}`);
    for (const d of ([] as string[]).concat(r.disallow ?? [])) lines.push(`Disallow: ${d}`);
    lines.push("");
  }
  if (robots.host) lines.push(`Host: ${robots.host}`);
  for (const s of ([] as string[]).concat(robots.sitemap ?? [])) lines.push(`Sitemap: ${s}`);
  return lines.join("\n");
}
