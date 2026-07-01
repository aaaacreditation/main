import Link from "next/link";
import { prisma } from "@/lib/db";
import { deletePage } from "../../actions";
import DangerButton from "../../_components/DangerButton";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

export default async function PagesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; deleted?: string }>;
}) {
  const { saved, deleted } = await searchParams;
  const pages = await prisma.page.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>Pages</h1>
          <p className="adm-topbar-sub">
            Custom pages served at <code>/&lt;slug&gt;</code> — for campaigns, policies, and anything the fixed site doesn&rsquo;t cover.
          </p>
        </div>
        <div className="adm-topbar-actions">
          <Link href="/admin/pages/new" className="btn btn-primary adm-btn">+ New page</Link>
        </div>
      </header>

      <div className="adm-content">
        {saved ? <p className="adm-toast ok" role="status">Page saved.</p> : null}
        {deleted ? <p className="adm-toast" role="status">Page deleted.</p> : null}

        <div className="adm-card adm-card-flush">
          {pages.length === 0 ? (
            <p className="adm-empty">
              No CMS pages yet. <Link href="/admin/pages/new">Create the first one →</Link>
            </p>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {pages.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link href={`/admin/pages/${p.id}`} className="adm-table-title">{p.title}</Link>
                      <span className="adm-table-slug">/{p.slug}</span>
                    </td>
                    <td>
                      <span className={"adm-chip " + (p.status === "PUBLISHED" ? "ok" : "muted")}>
                        {p.status === "PUBLISHED" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="adm-table-dim">{dateFmt.format(p.updatedAt)}</td>
                    <td className="adm-table-actions">
                      {p.status === "PUBLISHED" ? (
                        <Link href={`/${p.slug}`} target="_blank" className="adm-edit">View</Link>
                      ) : null}
                      <Link href={`/admin/pages/${p.id}`} className="adm-edit">Edit</Link>
                      <form action={deletePage}>
                        <input type="hidden" name="id" value={p.id} />
                        <DangerButton className="adm-danger-link" confirmText={`Delete “${p.title}”? This cannot be undone.`}>
                          Delete
                        </DangerButton>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
