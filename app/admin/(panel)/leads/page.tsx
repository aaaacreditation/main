import Link from "next/link";
import { LeadStatus, type LeadKind } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";
import { LEAD_STATUS_LABEL, LEAD_STATUS_ORDER, leadSourceLabel } from "@/lib/leads";
import { bulkUpdateLeads } from "./actions";
import { hasActiveFilters, leadQuery, leadWhere, parseLeadFilters } from "./filters";
import { LEAD_KIND_SHORT, LEAD_KIND_TABS, leadDateFmt, leadStatusTone, leadTimeFmt } from "./format";
import { LeadsBulkBar, SelectAllLeads } from "./LeadsBulk";
import "./leads-admin.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Leads & Applications" };

const PER_PAGE = 25;

const ERRORS: Record<string, string> = {
  missing: "That lead no longer exists — it may have been deleted.",
  "bulk-none": "Tick at least one lead before applying a bulk change.",
  "bulk-action": "Choose a status or an owner to apply to the selected leads.",
  assignee: "That team member can't be assigned — their account is inactive or was removed.",
};

export default async function LeadsAdmin({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await requireArea("leads");
  const sp = await searchParams;
  const f = parseLeadFilters(sp);
  const one = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : "");
  const saved = one("saved");
  const deleted = one("deleted");
  const error = one("error");
  const requestedPage = Math.max(1, parseInt(one("page"), 10) || 1);

  const me = session.user.id;
  const where = leadWhere(f, me);

  const [total, kindCounts, spamHidden, sources, staff] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.groupBy({ by: ["kind"], where: leadWhere({ ...f, kind: "" }, me), _count: true }),
    // The default view hides spam; say how much, with a link to review it.
    f.status ? Promise.resolve(0) : prisma.lead.count({ where: leadWhere({ ...f, status: LeadStatus.SPAM }, me) }),
    prisma.lead.groupBy({ by: ["source"], _count: true }),
    prisma.user.findMany({
      where: { OR: [{ active: true }, { assignedLeads: { some: {} } }] },
      select: { id: true, name: true, email: true, active: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const pages = Math.max(1, Math.ceil(total / PER_PAGE));
  const pageNum = Math.min(requestedPage, pages); // a bulk change can empty the last page
  const leads = await prisma.lead.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: PER_PAGE,
    skip: (pageNum - 1) * PER_PAGE,
    select: {
      id: true,
      business: true,
      contact: true,
      sector: true,
      source: true,
      kind: true,
      status: true,
      createdAt: true,
      assignedTo: { select: { name: true, email: true } },
    },
  });

  const countFor = (k: LeadKind | "") =>
    k === "" ? kindCounts.reduce((sum, c) => sum + c._count, 0) : kindCounts.find((c) => c.kind === k)?._count ?? 0;
  const tabs = [
    { kind: "" as const, label: "All" },
    ...LEAD_KIND_TABS.filter((t) => t.kind !== "OTHER" || countFor("OTHER") > 0 || f.kind === "OTHER"),
  ];

  const sourceOptions = sources
    .map((s) => ({ value: s.source, label: leadSourceLabel(s.source) }))
    .sort((a, b) => a.label.localeCompare(b.label));
  if (f.source && !sourceOptions.some((o) => o.value === f.source)) {
    sourceOptions.push({ value: f.source, label: leadSourceLabel(f.source) });
  }
  const staffLabel = (u: { name: string; email: string }) => u.name || u.email;
  const assignable = staff.filter((u) => u.active).map((u) => ({ value: u.id, label: staffLabel(u) }));

  const filtered = hasActiveFilters(f);
  const backHref = `/admin/leads${leadQuery(f, { page: pageNum > 1 ? String(pageNum) : "" })}`;
  const pageHref = (p: number) => `/admin/leads${leadQuery(f, { page: p > 1 ? String(p) : "" })}`;
  const resetHref = `/admin/leads${f.kind ? `?kind=${f.kind}` : ""}`;
  const savedCount = /^\d+$/.test(saved) ? parseInt(saved, 10) : null;
  const showKind = !f.kind;

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>Leads &amp; Applications</h1>
          <p className="adm-topbar-sub">
            {total} lead{total === 1 ? "" : "s"}
            {filtered ? " match these filters" : ""}
            {spamHidden > 0 ? (
              <>
                {" · "}
                <Link href={`/admin/leads${leadQuery(f, { status: LeadStatus.SPAM })}`} className="adml-topnote">
                  {spamHidden} spam hidden
                </Link>
              </>
            ) : null}
          </p>
        </div>
        <div className="adm-topbar-actions">
          {/* A plain <a>: the route answers with a file download, not a page. */}
          <a href={`/api/admin/leads/export${leadQuery(f)}`} className="btn btn-ghost adm-btn-sm">
            Export CSV
          </a>
        </div>
      </header>

      <div className="adm-content">
        {savedCount !== null ? (
          <p className="adm-toast ok" role="status">
            {savedCount === 0
              ? "No changes — the selected leads already had that status and owner."
              : `${savedCount} lead${savedCount === 1 ? "" : "s"} updated.`}
          </p>
        ) : saved ? (
          <p className="adm-toast ok" role="status">Lead updated.</p>
        ) : null}
        {deleted ? <p className="adm-toast" role="status">Lead deleted.</p> : null}
        {error && ERRORS[error] ? <p className="adm-error" role="alert">{ERRORS[error]}</p> : null}

        <nav className="adm-tabs adm-tabs-loose" aria-label="Lead type">
          {tabs.map((t) => (
            <Link
              key={t.kind || "all"}
              href={`/admin/leads${leadQuery(f, { kind: t.kind })}`}
              className={"adm-tab" + (f.kind === t.kind ? " on" : "")}
              aria-current={f.kind === t.kind ? "page" : undefined}
            >
              {t.label} <em>{countFor(t.kind)}</em>
            </Link>
          ))}
        </nav>

        <form className="adm-filterbar" action="/admin/leads" method="get" role="search">
          {f.kind ? <input type="hidden" name="kind" value={f.kind} /> : null}
          <label className="grow">
            Search
            <input
              className="sme-input"
              type="search"
              name="q"
              defaultValue={f.q}
              placeholder="Organization, person, email, phone or message…"
            />
          </label>
          <label>
            Status
            <select className="sme-select" name="status" defaultValue={f.status}>
              <option value="">All except spam</option>
              <option value="pipeline">In the pipeline</option>
              {LEAD_STATUS_ORDER.map((s) => (
                <option key={s} value={s}>{LEAD_STATUS_LABEL[s]}</option>
              ))}
            </select>
          </label>
          <label>
            Source
            <select className="sme-select" name="source" defaultValue={f.source}>
              <option value="">All forms</option>
              {sourceOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </label>
          <label>
            Owner
            <select className="sme-select" name="assignee" defaultValue={f.assignee}>
              <option value="">Anyone</option>
              <option value="me">Assigned to me</option>
              <option value="none">Unassigned</option>
              {staff.map((u) => (
                <option key={u.id} value={u.id}>
                  {staffLabel(u)}
                  {u.active ? "" : " (inactive)"}
                </option>
              ))}
            </select>
          </label>
          <label>
            From
            <input className="sme-input" type="date" name="from" defaultValue={f.from} />
          </label>
          <label>
            To
            <input className="sme-input" type="date" name="to" defaultValue={f.to} />
          </label>
          <div className="adm-filterbar-actions">
            <button type="submit" className="btn btn-primary adm-btn-sm">Apply</button>
            {filtered ? <Link href={resetHref} className="btn btn-ghost adm-btn-sm">Reset</Link> : null}
          </div>
        </form>

        {leads.length === 0 ? (
          <div className="adm-card">
            {filtered || f.kind ? (
              <p className="adm-empty">
                No leads match these filters. <Link href="/admin/leads">Show all leads →</Link>
              </p>
            ) : (
              <p className="adm-empty">
                No leads yet. Enquiries, applications, quote and membership requests from the website&rsquo;s forms
                appear here the moment they are submitted.
              </p>
            )}
          </div>
        ) : (
          <form action={bulkUpdateLeads} autoComplete="off" className="adm-card adm-card-flush">
            <input type="hidden" name="back" value={backHref} />
            <LeadsBulkBar
              statuses={LEAD_STATUS_ORDER.map((s) => ({ value: s, label: LEAD_STATUS_LABEL[s] }))}
              assignees={assignable}
            />
            <table className="adm-table adml-table">
              <thead>
                <tr>
                  <th className="adml-check">
                    <SelectAllLeads />
                  </th>
                  <th>Organization</th>
                  {showKind ? <th>Type</th> : null}
                  <th>Source</th>
                  <th>Status</th>
                  <th>Owner</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className={l.status === LeadStatus.NEW ? "adml-new" : undefined}>
                    <td className="adml-check">
                      <input type="checkbox" name="ids" value={l.id} aria-label={`Select ${l.business || l.contact}`} />
                    </td>
                    <td>
                      <Link href={`/admin/leads/${l.id}`} className="adm-table-title">
                        {l.business || l.contact || "(no name)"}
                      </Link>
                      <span className="adml-sub">
                        {l.contact}
                        {l.sector ? ` · ${l.sector}` : ""}
                      </span>
                    </td>
                    {showKind ? (
                      <td>
                        <span className={"adm-tag" + (l.kind === "OTHER" ? " dim" : "")}>{LEAD_KIND_SHORT[l.kind]}</span>
                      </td>
                    ) : null}
                    <td className="adm-table-dim">{leadSourceLabel(l.source)}</td>
                    <td>
                      <span className={"adm-chip " + leadStatusTone(l.status)}>{LEAD_STATUS_LABEL[l.status]}</span>
                    </td>
                    <td className="adm-table-dim">{l.assignedTo ? staffLabel(l.assignedTo) : "—"}</td>
                    <td className="adm-table-dim">
                      <time dateTime={l.createdAt.toISOString()}>{leadDateFmt.format(l.createdAt)}</time>
                      <span className="adml-sub">{leadTimeFmt.format(l.createdAt)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        )}

        {pages > 1 ? (
          <nav className="adm-pager" aria-label="Pagination">
            {pageNum > 1 ? <Link href={pageHref(pageNum - 1)} className="btn btn-ghost adm-btn-sm">← Previous</Link> : <span />}
            <span className="adm-pager-info">
              Page {pageNum} of {pages} · {total} lead{total === 1 ? "" : "s"}
            </span>
            {pageNum < pages ? <Link href={pageHref(pageNum + 1)} className="btn btn-ghost adm-btn-sm">Next →</Link> : <span />}
          </nav>
        ) : null}
      </div>
    </>
  );
}
