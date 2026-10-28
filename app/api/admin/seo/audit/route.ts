import { NextResponse } from "next/server";
import { audit, getStaffSession } from "@/lib/admin";
import { activeAuditRun, auditBaseUrl, runSeoAudit, type AuditScope } from "@/lib/seo-audit";

/**
 * POST /api/admin/seo/audit — crawls the sitemap and stores an SEO audit run.
 * Body (JSON, optional): { scope: "core" | "all" }. Runs synchronously and
 * answers { runId, status } when the crawl is finished.
 */
export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(req: Request) {
  const session = await getStaffSession("seo");
  if (!session) return NextResponse.json({ error: "Not signed in, or your role has no SEO access." }, { status: 401 });

  let scope: AuditScope = "core";
  try {
    const body = (await req.json()) as { scope?: unknown };
    if (body?.scope === "all") scope = "all";
  } catch {
    /* no body → core */
  }

  const running = await activeAuditRun();
  if (running) {
    return NextResponse.json(
      { error: "An audit is already running. Wait for it to finish (it can take a few minutes), then refresh.", runId: running.id },
      { status: 409 },
    );
  }

  const baseUrl = auditBaseUrl(req.headers, req.url);
  const result = await runSeoAudit({ baseUrl, scope });
  await audit(
    session.user.id,
    "audit",
    "seo",
    result.runId,
    `SEO audit (${scope === "all" ? "all pages" : "core pages"}) of ${baseUrl} — ${result.status}`,
  );

  if (result.status === "failed") {
    return NextResponse.json({ runId: result.runId, status: result.status, error: result.error }, { status: 500 });
  }
  return NextResponse.json({ runId: result.runId, status: result.status });
}
