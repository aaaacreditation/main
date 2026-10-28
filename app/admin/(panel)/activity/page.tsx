import type { Metadata } from "next";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Activity Log" };

const PER_PAGE = 50;

const ENTITY_LABEL: Record<string, string> = {
  post: "Article",
  page: "Page",
  lead: "Lead",
  "case-study": "Case study",
  organization: "Organization",
  seo: "SEO",
  redirect: "Redirect",
  media: "Media",
  user: "Team",
};

/** Admin link for an audited record, when it still has a page. */
function entityHref(entity: string, id: string | null) {
  if (!id) return null;
  switch (entity) {
    case "post": return `/admin/posts/${id}`;
    case "page": return `/admin/pages/${id}`;
    case "lead": return `/admin/leads/${id}`;
    case "case-study": return `/admin/case-studies/${id}`;
    case "organization": return `/admin/directory/${id}`;
    default: return null;
  }
}

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

export default async function ActivityLog({
  searchParams,
}: {
  searchParams: Promise<{ entity?: string; user?: string; page?: string }>;
}) {
  await requireArea("activity");
  const { entity = "", user = "", page: pageParam = "1" } = await searchParams;
  const pageNum = Math.max(1, parseInt(pageParam, 10) || 1);

  const where: Prisma.AuditLogWhereInput = {
    ...(entity ? { entity } : {}),
    ...(user ? { userId: user } : {}),
  };
  const [total, rows, users, entities] = await Promise.all([
    prisma.auditLog.count({ where }),
    prisma.auditLog.findMany({
      where,
      include: { user: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: PER_PAGE,
      skip: (pageNum - 1) * PER_PAGE,
    }),
    prisma.user.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } }),
    prisma.auditLog.findMany({ distinct: ["entity"], select: { entity: true } }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const pageHref = (p: number) => {
    const params = new URLSearchParams({ ...(entity ? { entity } : {}), ...(user ? { user } : {}), page: String(p) });
    return `/admin/activity?${params.toString()}`;
  };

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>Activity Log</h1>
          <p className="adm-topbar-sub">Every change made in the portal, newest first.</p>
        </div>
      </header>
      <div className="adm-content">
        <form className="adm-filterbar" action="/admin/activity" method="get">
          <label>
            Area
            <select className="sme-select" name="entity" defaultValue={entity}>
              <option value="">Everything</option>
              {entities.map((e) => (
                <option key={e.entity} value={e.entity}>{ENTITY_LABEL[e.entity] ?? e.entity}</option>
              ))}
            </select>
          </label>
          <label>
            Team member
            <select className="sme-select" name="user" defaultValue={user}>
              <option value="">Anyone</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
          </label>
          <div className="adm-filterbar-actions">
            <button type="submit" className="btn btn-ghost adm-btn-sm">Filter</button>
          </div>
        </form>

        <div className="adm-card adm-card-flush">
          {rows.length === 0 ? (
            <p className="adm-empty">No activity recorded yet.</p>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Who</th>
                  <th>Area</th>
                  <th>What happened</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const href = r.action === "delete" ? null : entityHref(r.entity, r.entityId);
                  return (
                    <tr key={r.id}>
                      <td className="adm-table-dim">{dateFmt.format(r.createdAt)}</td>
                      <td>{r.user?.name ?? "System"}</td>
                      <td>
                        <span className={"adm-chip " + (r.action === "delete" ? "err" : r.action === "create" ? "won" : "muted")}>
                          {ENTITY_LABEL[r.entity] ?? r.entity} · {r.action}
                        </span>
                      </td>
                      <td>{href ? <Link href={href} className="adm-edit">{r.summary || "View"}</Link> : r.summary}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {pages > 1 ? (
          <nav className="adm-pager" aria-label="Pagination">
            {pageNum > 1 ? <Link href={pageHref(pageNum - 1)} className="btn btn-ghost adm-btn-sm">← Newer</Link> : <span />}
            <span className="adm-pager-info">Page {pageNum} of {pages}</span>
            {pageNum < pages ? <Link href={pageHref(pageNum + 1)} className="btn btn-ghost adm-btn-sm">Older →</Link> : <span />}
          </nav>
        ) : null}
      </div>
    </>
  );
}
