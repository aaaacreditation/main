import { getRegisterJson } from "@/lib/llms";

/** The public register as JSON (Nov 2026) — lib/llms.ts. Same data as /accredited-organizations/. */
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(await getRegisterJson(), {
    headers: { "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400", "access-control-allow-origin": "*" },
  });
}
