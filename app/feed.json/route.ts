import { jsonFeed } from "@/lib/feeds";

/** JSON Feed 1.1 (jsonfeed.org) of the latest articles (Nov 2026) — lib/feeds.ts. */
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await jsonFeed(), {
    headers: {
      "content-type": "application/feed+json; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=600, stale-while-revalidate=3600",
      "x-robots-tag": "noindex, follow",
    },
  });
}
