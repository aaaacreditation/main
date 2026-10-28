import type { Metadata } from "next";
import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";
import DangerButton from "../../../_components/DangerButton";
import RedirectForm from "./RedirectForm";
import BulkImport from "./BulkImport";
import { deleteRedirect, resetRedirectHits } from "./actions";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Redirects" };

const PER_PAGE = 50;
const BASE = "/admin/seo/redirects";

const SAVED: Record<string, string> = {
  created: "Redirect added. It is live on the next visit.",
  updated: "Redirect updated.",
  deleted: "Redirect deleted.",
  reset: "Hit count reset.",
};

const SORTS = {
  recent: { label: "Recently changed", orderBy: [{ updatedAt: "desc" }] },
  hits: { label: "Most hits", orderBy: [{ hits: "desc" }, { updatedAt: "desc" }] },
  from: { label: "Source A–Z", orderBy: [{ from: "asc" }] },
} satisfies Record<string, { label: string; orderBy: Prisma.RedirectOrderByWithRelationInput[] }>;
type SortKey = keyof typeof SORTS;

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const numFmt = new Intl.NumberFormat("en-US");

export default async function RedirectsAdmin({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; sort?: string; page?: string; saved?: string }>;
}) {
  await requireArea("seo");
  const { q = "", type = "", sort: sortParam = "", page: pageParam = "1", saved } = await searchParams;
  const sort: SortKey = sortParam in SORTS ? (sortParam as SortKey) : "recent";
  const pageNum = Math.max(1, parseInt(pageParam, 10) || 1);
  const query = q.trim().slice(0, 200);

  const where: Prisma.RedirectWhereInput = {
    ...(type === "permanent" ? { permanent: true } : type === "temporary" ? { permanent: false } : {}),
    ...(query
      ? {
          OR: [
            { from: { contains: query, mode: "insensitive" } },
            { to: { contains: query, mode: "insensitive" } },
            { note: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [total, all, rows] = await Promise.all([
    prisma.redirect.count({ where }),
    prisma.redirect.aggregate({ _count: { _all: true }, _sum: { hits: true } }),
    prisma.redirect.findMany({
      where,
      orderBy: SORTS[sort].orderBy,
      take: PER_PAGE,
      skip: (pageNum - 1) * PER_PAGE,
    }),
  ]);
  const pages = Math.max(1, Math.ceil(total / PER_PAGE));

  const href = (over: Record<string, string>) => {
    const params = new URLSearchParams();
    const merged = { q: query, type, sort: sort === "recent" ? "" : sort, ...over };
    for (const [k, v] of Object.entries(merged)) if (v) params.set(k, v);
    const qs = params.toString();
    return `${BASE}${qs ? `?${qs}` : ""}`;
  };

  return (
    <>
      <header className="adm-topbar">
        <div>
          <p className="adm-crumbs">
            <Link href="/admin/seo">SEO</Link> / Redirects
          </p>
          <h1>Redirects</h1>
          <p className="adm-topbar-sub">
            {numFmt.format(all._count._all)} redirect{all._count._all === 1 ? "" : "s"} ·{" "}
            {numFmt.format(all._sum.hits ?? 0)} hits
          </p>
        </div>
      </header>

      <div className="adm-content">
        {saved && SAVED[saved] ? <p className="adm-toast ok" role="status">{SAVED[saved]}</p> : null}

        <div className="adm-filters">
          <form className="adm-search" action={BASE} method="get">
            <input className="sme-input" type="search" name="q" defaultValue={query} placeholder="Search paths or notes…" />
            {type ? <input type="hidden" name="type" value={type} /> : null}
            {sort !== "recent" ? <input type="hidden" name="sort" value={sort} /> : null}
            <button type="submit" className="btn btn-ghost adm-btn-sm">Search</button>
          </form>
          <div className="adm-tabs">
            <Link href={href({ type: "", page: "" })} className={"adm-tab" + (!type ? " on" : "")}>All</Link>
            <Link href={href({ type: "permanent", page: "" })} className={"adm-tab" + (type === "permanent" ? " on" : "")}>Permanent</Link>
            <Link href={href({ type: "temporary", page: "" })} className={"adm-tab" + (type === "temporary" ? " on" : "")}>Temporary</Link>
          </div>
          <div className="adm-tabs">
            {(Object.keys(SORTS) as SortKey[]).map((k) => (
              <Link key={k} href={href({ sort: k === "recent" ? "" : k, page: "" })} className={"adm-tab" + (sort === k ? " on" : "")}>
                {SORTS[k].label}
              </Link>
            ))}
          </div>
        </div>

        <div className="adm-form-grid">
          <div className="adm-card adm-card-flush">
            {rows.length === 0 ? (
              <p className="adm-empty">
                {query || type ? "No redirects match." : "No redirects yet. Add one on the right, or paste a list."}
              </p>
            ) : (
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>From → To</th>
                    <th>Type</th>
                    <th>Hits</th>
                    <th>Updated</th>
                    <th aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <span className="adm-table-title">{r.from}</span>
                        <span className="adm-table-slug">→ {r.to}</span>
                        {r.note ? <span className="adm-table-slug">{r.note}</span> : null}
                      </td>
                      <td>
                        <span className={"adm-chip " + (r.permanent ? "navy" : "warn")}>
                          {r.permanent ? "308 Permanent" : "307 Temporary"}
                        </span>
                      </td>
                      <td className="adm-table-dim">{numFmt.format(r.hits)}</td>
                      <td className="adm-table-dim">{dateFmt.format(r.updatedAt)}</td>
                      <td className="adm-table-actions">
                        <details className="adm-panel-details">
                          <summary>Edit</summary>
                          <div style={{ textAlign: "left", minWidth: 280 }}>
                            <RedirectForm
                              id={r.id}
                              initial={{ from: r.from, to: r.to, permanent: r.permanent, note: r.note }}
                              submitLabel="Save"
                            />
                            {r.hits > 0 ? (
                              <form action={resetRedirectHits} style={{ marginTop: 10 }}>
                                <input type="hidden" name="id" value={r.id} />
                                <button type="submit" className="adm-linkbtn">Reset hit count</button>
                              </form>
                            ) : null}
                            <form action={deleteRedirect} style={{ marginTop: 10 }}>
                              <input type="hidden" name="id" value={r.id} />
                              <DangerButton className="adm-danger-link" confirmText={`Delete the redirect from ${r.from}? Visitors to that URL will get a 404.`}>
                                Delete redirect
                              </DangerButton>
                            </form>
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <aside className="adm-form-side">
            <div className="adm-panel">
              <h3>Add a redirect</h3>
              <RedirectForm />
            </div>

            <BulkImport />

            <div className="adm-panel">
              <h3>How redirects work</h3>
              <ul className="adm-issues">
                <li className="info">Sources are paths on this site, without a query string — the visitor&apos;s query string is carried over to the destination.</li>
                <li className="info">Use permanent (308) when a page has moved for good; search engines transfer its ranking. Use temporary (307) for short-term moves.</li>
                <li className="info">Changes apply within a minute. Hit counts show which old URLs still get traffic.</li>
                <li className="warn">Legacy WordPress URLs already redirected in the site code take precedence over rules here.</li>
                <li className="warn">A redirect from a live page hides that page — delete the redirect to bring it back.</li>
              </ul>
            </div>
          </aside>
        </div>

        {pages > 1 ? (
          <nav className="adm-pager" aria-label="Pagination">
            {pageNum > 1 ? <Link href={href({ page: String(pageNum - 1) })} className="btn btn-ghost adm-btn-sm">← Previous</Link> : <span />}
            <span className="adm-pager-info">Page {pageNum} of {pages}</span>
            {pageNum < pages ? <Link href={href({ page: String(pageNum + 1) })} className="btn btn-ghost adm-btn-sm">Next →</Link> : <span />}
          </nav>
        ) : null}
      </div>
    </>
  );
}
