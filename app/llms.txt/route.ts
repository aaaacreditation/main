import { llmsTxt } from "@/lib/llms";

/** llmstxt.org index for AI assistants (Nov 2026) — lib/llms.ts. */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  return new Response(await llmsTxt(req.url), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
