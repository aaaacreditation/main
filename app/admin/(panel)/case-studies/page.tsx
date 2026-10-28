import Link from "next/link";
import { ContentStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";
import DangerButton from "../../_components/DangerButton";
import { deleteCaseStudy, moveCaseStudy } from "./actions";
import { CASE_STUDY_ERRORS, CASE_STUDY_TABS, listHref, parseTab, placementWhere } from "./shared";
import "./case-studies-admin.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Case studies" };

export default async function CaseStudiesAdmin({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tab?: string; saved?: string; deleted?: string; moved?: string; error?: string }>;
}) {
  await requireArea("case-studies");
  const { q: rawQ = "", tab: tabParam, saved, deleted, moved, error } = await searchParams;
  const q = rawQ.trim().slice(0, 100);
  const tab = parseTab(tabParam);

  const search: Prisma.CaseStudyWhereInput = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { sector: { contains: q, mode: "insensitive" } },
          { country: { contains: q, mode: "insensitive" } },
        ],
      }
    : {};

  const [counts, rows] = await Promise.all([
    Promise.all(
      CASE_STUDY_TABS.map((t) => prisma.caseStudy.count({ where: { AND: [placementWhere(t.key), search] } })),
    ),
    prisma.caseStudy.findMany({
      where: { AND: [placementWhere(tab), search] },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      take: 500,
    }),
  ]);
  const total = counts[0];
  // Reordering swaps neighbours in the full tab, so it is off while a search hides rows.
  const canReorder = !q && rows.length > 1;

  const tabHref = (key: (typeof CASE_STUDY_TABS)[number]["key"]) =>
    listHref(key, q ? { q } : undefined);
  const newHref =
    "/admin/case-studies/new" + (tab === "home" || tab === "sme" ? `?placement=${tab}` : "");

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>Case Studies</h1>
          <p className="adm-topbar-sub">
            Success stories on the home carousel and the SME Accreditation page · {total} total
          </p>
        </div>
        <div className="adm-topbar-actions">
          <Link href={newHref} className="btn btn-primary adm-btn">+ New case study</Link>
        </div>
      </header>

      <div className="adm-content">
        {saved ? <p className="adm-toast ok" role="status">Case study saved. The public pages are updated.</p> : null}
        {deleted ? <p className="adm-toast" role="status">Case study deleted.</p> : null}
        {error ? <p className="adm-error" role="alert">{CASE_STUDY_ERRORS[error] ?? "Something went wrong."}</p> : null}

        <div className="adm-filters">
          <div className="adm-tabs">
            {CASE_STUDY_TABS.map((t, i) => (
              <Link key={t.key || "all"} href={tabHref(t.key)} className={"adm-tab" + (tab === t.key ? " on" : "")}>
                {t.label}
                <em>{counts[i]}</em>
              </Link>
            ))}
          </div>
          <form className="adm-search" action="/admin/case-studies" method="get">
            {tab ? <input type="hidden" name="tab" value={tab} /> : null}
            <input
              className="sme-input"
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search name, sector or country…"
              aria-label="Search case studies"
            />
            <button type="submit" className="btn btn-ghost adm-btn-sm">Search</button>
          </form>
        </div>

        <p className="adm-hint cs-list-hint">
          {q
            ? "Clear the search to reorder."
            : tab === "home" || tab === "sme"
              ? "The order here is the order visitors see. Use the arrows to move a story."
              : "Home and SME rows are separate on purpose (each placement has its own wording). Open the Home carousel or SME page tab to set the order visitors see."}
        </p>

        <div className="adm-card adm-card-flush">
          {rows.length === 0 ? (
            <p className="adm-empty">
              {q ? "No case studies match your search." : "No case studies here yet."}{" "}
              <Link href={newHref}>Add one →</Link>
            </p>
          ) : (
            <table className="adm-table cs-table">
              <thead>
                <tr>
                  <th>Case study</th>
                  <th>Placement</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.id} className={moved === r.id ? "cs-row-moved" : undefined}>
                    <td>
                      <div className="adm-row-media">
                        {r.logo || r.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={(r.logo || r.image) as string}
                            alt=""
                            className={"adm-thumb" + (r.logo ? "" : " cover")}
                            loading="lazy"
                          />
                        ) : (
                          <span className="adm-thumb cs-thumb-initials" aria-hidden="true">
                            {r.initials || r.name.slice(0, 2).toUpperCase()}
                          </span>
                        )}
                        <div className="cs-name">
                          <Link href={`/admin/case-studies/${r.id}`} className="adm-table-title">{r.name}</Link>
                          <span className="adm-table-dim">
                            {[r.sector, r.country].filter(Boolean).join(" · ") || "—"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="cs-chips">
                        {r.showOnHome ? <span className="adm-chip navy">Home</span> : null}
                        {r.showOnSme ? <span className="adm-chip ok">SME page</span> : null}
                        {!r.showOnHome && !r.showOnSme ? <span className="adm-chip warn">Not placed</span> : null}
                        {r.featured ? <span className="adm-chip gold">Featured</span> : null}
                      </div>
                    </td>
                    <td>
                      <span className={"adm-chip " + (r.status === ContentStatus.PUBLISHED ? "ok" : "muted")}>
                        {r.status === ContentStatus.PUBLISHED ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td>
                      <div className="cs-order">
                        <span className="adm-table-dim">{r.order}</span>
                        {canReorder ? (
                          <span className="cs-move-group">
                            <form action={moveCaseStudy}>
                              <input type="hidden" name="id" value={r.id} />
                              <input type="hidden" name="dir" value="up" />
                              <input type="hidden" name="tab" value={tab} />
                              <button
                                type="submit"
                                className="cs-move"
                                disabled={i === 0}
                                aria-label={`Move ${r.name} up`}
                                title="Move up"
                              >
                                ↑
                              </button>
                            </form>
                            <form action={moveCaseStudy}>
                              <input type="hidden" name="id" value={r.id} />
                              <input type="hidden" name="dir" value="down" />
                              <input type="hidden" name="tab" value={tab} />
                              <button
                                type="submit"
                                className="cs-move"
                                disabled={i === rows.length - 1}
                                aria-label={`Move ${r.name} down`}
                                title="Move down"
                              >
                                ↓
                              </button>
                            </form>
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="adm-table-actions">
                      <Link href={`/admin/case-studies/${r.id}`} className="adm-edit">Edit</Link>
                      <form action={deleteCaseStudy}>
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="tab" value={tab} />
                        <DangerButton
                          className="adm-danger-link"
                          confirmText={`Delete the case study “${r.name}”? It disappears from the site at once. This cannot be undone.`}
                        >
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
