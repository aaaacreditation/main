import { LeadStatus, type Prisma } from "@prisma/client";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { updateLead, deleteLead } from "../../actions";
import SubmitButton from "../../_components/SubmitButton";
import DangerButton from "../../_components/DangerButton";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

const STATUSES: { key: string; label: string }[] = [
  { key: "", label: "All" },
  { key: "NEW", label: "New" },
  { key: "CONTACTED", label: "Contacted" },
  { key: "QUALIFIED", label: "Qualified" },
  { key: "CLOSED", label: "Closed" },
];

export default async function LeadsAdmin({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; saved?: string; deleted?: string }>;
}) {
  const { status = "", saved, deleted } = await searchParams;

  const where: Prisma.LeadWhereInput = Object.values(LeadStatus).includes(status as LeadStatus)
    ? { status: status as LeadStatus }
    : {};

  const [leads, counts] = await Promise.all([
    prisma.lead.findMany({ where, orderBy: { createdAt: "desc" }, take: 100 }),
    prisma.lead.groupBy({ by: ["status"], _count: true }),
  ]);
  const countFor = (key: string) =>
    key === ""
      ? counts.reduce((sum, c) => sum + c._count, 0)
      : counts.find((c) => c.status === key)?._count ?? 0;

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>Applications</h1>
          <p className="adm-topbar-sub">Funding-readiness applications submitted through the website.</p>
        </div>
      </header>

      <div className="adm-content">
        {saved ? <p className="adm-toast ok" role="status">Application updated.</p> : null}
        {deleted ? <p className="adm-toast" role="status">Application deleted.</p> : null}

        <div className="adm-tabs adm-tabs-loose">
          {STATUSES.map((s) => (
            <Link
              key={s.key || "all"}
              href={s.key ? `/admin/leads?status=${s.key}` : "/admin/leads"}
              className={"adm-tab" + (status === s.key ? " on" : "")}
            >
              {s.label} <em>{countFor(s.key)}</em>
            </Link>
          ))}
        </div>

        {leads.length === 0 ? (
          <div className="adm-card">
            <p className="adm-empty">No applications here yet.</p>
          </div>
        ) : (
          <div className="adm-leads">
            {leads.map((l) => (
              <article className="adm-lead" key={l.id}>
                <header className="adm-lead-head">
                  <div>
                    <h2>{l.business}</h2>
                    <p className="adm-lead-contact">
                      {l.contact} · <a href={`mailto:${l.email}`}>{l.email}</a>
                      {l.phone ? <> · <a href={`tel:${l.phone}`}>{l.phone}</a></> : null}
                    </p>
                  </div>
                  <div className="adm-lead-meta">
                    <span className={"adm-chip " + (l.status === "NEW" ? "new" : l.status === "CLOSED" ? "muted" : "ok")}>
                      {l.status.toLowerCase()}
                    </span>
                    <time>{dateFmt.format(l.createdAt)}</time>
                  </div>
                </header>

                <div className="adm-lead-tags">
                  {l.sector ? <span className="adm-tag">{l.sector}</span> : null}
                  {l.stage ? <span className="adm-tag">{l.stage}</span> : null}
                  <span className="adm-tag dim">{l.source}</span>
                </div>

                {l.message ? <p className="adm-lead-msg">{l.message}</p> : null}

                <form action={updateLead} className="adm-lead-form">
                  <input type="hidden" name="id" value={l.id} />
                  <textarea
                    className="sme-textarea"
                    name="notes"
                    rows={2}
                    defaultValue={l.notes}
                    placeholder="Internal notes (call outcomes, next steps…)"
                  />
                  <div className="adm-lead-form-row">
                    <select className="sme-select adm-lead-status" name="status" defaultValue={l.status}>
                      <option value="NEW">New</option>
                      <option value="CONTACTED">Contacted</option>
                      <option value="QUALIFIED">Qualified</option>
                      <option value="CLOSED">Closed</option>
                    </select>
                    <SubmitButton className="btn btn-ghost adm-btn-sm" pendingLabel="Saving…">Update</SubmitButton>
                    <span className="adm-lead-spacer" />
                  </div>
                </form>
                <form action={deleteLead} className="adm-lead-delete">
                  <input type="hidden" name="id" value={l.id} />
                  <DangerButton className="adm-danger-link" confirmText={`Delete the application from “${l.business}”?`}>
                    Delete
                  </DangerButton>
                </form>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
