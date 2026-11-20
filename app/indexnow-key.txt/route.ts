import { getSeoSettings } from "@/lib/site-settings";

/**
 * IndexNow key file (Nov 2026). Search engines fetch it to confirm that
 * submissions from lib/search-engines.ts come from the site's owner. The key
 * is public by design; it is changed in SEO Center → Search engines & AI.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const { indexNowKey } = await getSeoSettings();
  return new Response(indexNowKey, {
    headers: { "content-type": "text/plain; charset=utf-8", "x-robots-tag": "noindex" },
  });
}
