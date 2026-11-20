import { rssXml } from "@/lib/feeds";

/** RSS 2.0 feed at the old WordPress address /feed/ (Nov 2026) — lib/feeds.ts. */
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(await rssXml(), {
    headers: {
      "content-type": "application/rss+xml; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
      "x-robots-tag": "noindex, follow",
    },
  });
}
