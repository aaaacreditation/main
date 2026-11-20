import { getFactsJson } from "@/lib/llms";

/** Machine-readable AAA facts (Nov 2026) — lib/llms.ts. Figures come from lib/facts.ts. */
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getFactsJson(), {
    headers: { "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400", "access-control-allow-origin": "*" },
  });
}
