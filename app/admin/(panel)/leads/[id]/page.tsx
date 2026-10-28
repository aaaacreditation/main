import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadStatus, type Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";
import { LEAD_KIND_LABEL, LEAD_STATUS_LABEL, LEAD_STATUS_ORDER, leadSourceLabel } from "@/lib/leads";
import SubmitButton from "../../../_components/SubmitButton";
import DangerButton from "../../../_components/DangerButton";
import { addLeadNote, assignLead, deleteLead, updateLeadStatus } from "../actions";
import { LEAD_KIND_TABS, leadDateTimeFmt, leadStatusTone, safeHttpUrl, whatsappDigits } from "../format";
import "../leads-admin.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Lead" };

const SAVED: Record<string, string> = {
  "1": "Saved.",
  status: "Status updated.",
  assign: "Owner updated.",
  note: "Note added to the timeline.",
};

const ERRORS: Record<string, string> = {
  note: "Write something before adding a note.",
  status: "Pick a valid status.",
  assignee: "That team member can't be assigned — their account is inactive or was removed.",
};

const ACTIVITY_LABEL: Record<string, string> = { note: "Note", status: "Status change", assign: "Assignment" };

export default async function LeadDetail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const session = await requireArea("leads");
  const [{ id }, { saved = "", error = "" }] = await Promise.all([params, searchParams]);

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      assignedTo: { select: { id: true, name: true, email: true, active: true } },
      activities: {
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
        include: { author: { select: { name: true, email: true } } },
      },
    },
  });
  if (!lead) notFound();

  // Neighbours of the same kind, in list order (newest first). Spam is skipped
  // unless this lead is spam itself, mirroring the list's default view.
  const scope: Prisma.LeadWhereInput = {
    kind: lead.kind,
    ...(lead.status === LeadStatus.SPAM ? {} : { status: { not: LeadStatus.SPAM } }),
  };
  const [newer, older, staff] = await Promise.all([
    prisma.lead.findFirst({
      where: { ...scope, OR: [{ createdAt: { gt: lead.createdAt } }, { createdAt: lead.createdAt, id: { gt: lead.id } }] },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      select: { id: true },
    }),
    prisma.lead.findFirst({
      where: { ...scope, OR: [{ createdAt: { lt: lead.createdAt } }, { createdAt: lead.createdAt, id: { lt: lead.id } }] },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      select: { id: true },
    }),
    prisma.user.findMany({
      where: { active: true },
      select: { id: true, name: true, email: true, role: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const name = lead.business || lead.contact || "(no name)";
  const wa = lead.phone ? whatsappDigits(lead.phone) : null;
  const referrer = safeHttpUrl(lead.referrer);
  const firstName = lead.contact.split(/\s+/)[0] || lead.contact;
  const replyHref =
    `mailto:${lead.email}?subject=${encodeURIComponent("Re: your AAA enquiry")}` +
    `&body=${encodeURIComponent(`Dear ${lead.contact || "Sir or Madam"},\n\n`)}`;
  const staffLabel = (u: { name: string; email: string }) => u.name || u.email;
  const assignedToMe = lead.assignedToId === session.user.id;
  const inactiveOwner = lead.assignedTo && !lead.assignedTo.active ? lead.assignedTo : null;

  return (
    <>
      <header className="adm-topbar">
        <div>
          <nav className="adm-crumbs">
            <Link href="/admin/leads">Leads</Link> /{" "}
            <Link href={`/admin/leads?kind=${lead.kind}`}>
              {LEAD_KIND_TABS.find((t) => t.kind === lead.kind)?.label ?? LEAD_KIND_LABEL[lead.kind]}
            </Link>
          </nav>
          <h1 className="adm-topbar-clamp">{name}</h1>
          <div className="adml-meta">
            <span className="adm-tag">{LEAD_KIND_LABEL[lead.kind]}</span>
            <span className={"adm-chip " + leadStatusTone(lead.status)}>{LEAD_STATUS_LABEL[lead.status]}</span>
            <span>
              Received <time dateTime={lead.createdAt.toISOString()}>{leadDateTimeFmt.format(lead.createdAt)}</time>
            </span>
          </div>
        </div>
        <div className="adm-topbar-actions adml-nav">
          {newer ? (
            <Link href={`/admin/leads/${newer.id}`} className="btn btn-ghost adm-btn-sm" title="Newer lead of this type">
              ← Newer
            </Link>
          ) : (
            <span className="btn btn-ghost adm-btn-sm is-off" aria-hidden="true">← Newer</span>
          )}
          {older ? (
            <Link href={`/admin/leads/${older.id}`} className="btn btn-ghost adm-btn-sm" title="Older lead of this type">
              Older →
            </Link>
          ) : (
            <span className="btn btn-ghost adm-btn-sm is-off" aria-hidden="true">Older →</span>
          )}
        </div>
      </header>

      <div className="adm-content">
        {saved && SAVED[saved] ? <p className="adm-toast ok" role="status">{SAVED[saved]}</p> : null}
        {error && ERRORS[error] ? <p className="adm-error" role="alert">{ERRORS[error]}</p> : null}

        <div className="adm-form-grid">
          <div className="adm-form-main">
            <h3 className="adm-section-title">Details</h3>
            <dl className="adm-kv adml-kv">
              <dt>Organization</dt>
              <dd>{lead.business || <span className="adml-dim">—</span>}</dd>

              <dt>Contact person</dt>
              <dd>{lead.contact || <span className="adml-dim">—</span>}</dd>

              <dt>Email</dt>
              <dd>
                <a href={`mailto:${lead.email}`}>{lead.email}</a>
              </dd>

              <dt>Phone</dt>
              <dd>
                {lead.phone ? (
                  <span className="adml-inline">
                    <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}>{lead.phone}</a>
                    {wa ? (
                      <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
                        WhatsApp ↗
                      </a>
                    ) : null}
                  </span>
                ) : (
                  <span className="adml-dim">—</span>
                )}
              </dd>

              <dt>Program / topic</dt>
              <dd>{lead.sector || <span className="adml-dim">—</span>}</dd>

              <dt>Stage</dt>
              <dd>{lead.stage || <span className="adml-dim">—</span>}</dd>

              <dt>Type</dt>
              <dd>{LEAD_KIND_LABEL[lead.kind]}</dd>

              <dt>Source</dt>
              <dd>
                {leadSourceLabel(lead.source)}
                <code>{lead.source}</code>
              </dd>

              <dt>Submitted from</dt>
              <dd>
                {referrer ? (
                  <a href={referrer} target="_blank" rel="noopener noreferrer">
                    {referrer.replace(/^https?:\/\/(www\.)?/i, "")}
                  </a>
                ) : lead.referrer ? (
                  lead.referrer
                ) : (
                  <span className="adml-dim">Not recorded</span>
                )}
              </dd>

              <dt>Owner</dt>
              <dd>
                {lead.assignedTo ? (
                  <>
                    {staffLabel(lead.assignedTo)}
                    {lead.assignedTo.active ? "" : " (inactive)"}
                  </>
                ) : (
                  <span className="adml-dim">Unassigned</span>
                )}
              </dd>

              <dt>Received</dt>
              <dd>{leadDateTimeFmt.format(lead.createdAt)}</dd>

              <dt>Last updated</dt>
              <dd>{leadDateTimeFmt.format(lead.updatedAt)}</dd>
            </dl>

            <h3 className="adm-section-title">Message</h3>
            {lead.message ? (
              <p className="adm-lead-msg adml-msg">{lead.message}</p>
            ) : (
              <p className="adm-hint">No message was included with this submission.</p>
            )}

            <h3 className="adm-section-title">Activity</h3>
            <form action={addLeadNote} className="adml-note-form">
              <input type="hidden" name="id" value={lead.id} />
              <label className="adm-label" htmlFor="lead-note">
                Add a note
              </label>
              <textarea
                id="lead-note"
                className="sme-textarea"
                name="body"
                rows={3}
                maxLength={4000}
                required
                placeholder="Call outcome, next step, what was promised…"
              />
              <SubmitButton className="btn btn-primary adm-btn-sm" pendingLabel="Adding…">
                Add note
              </SubmitButton>
            </form>

            <ol className="adm-timeline adml-timeline">
              {lead.activities.map((a) => (
                <li key={a.id} className={a.type === "status" ? "status" : undefined}>
                  <span className="adm-timeline-meta">
                    {a.author ? staffLabel(a.author) : "System"} · {ACTIVITY_LABEL[a.type] ?? "Update"} ·{" "}
                    <time dateTime={a.createdAt.toISOString()}>{leadDateTimeFmt.format(a.createdAt)}</time>
                  </span>
                  <span className="adm-timeline-body">{a.body}</span>
                </li>
              ))}
              <li className="system">
                <span className="adm-timeline-meta">
                  Website · Received ·{" "}
                  <time dateTime={lead.createdAt.toISOString()}>{leadDateTimeFmt.format(lead.createdAt)}</time>
                </span>
                <span className="adm-timeline-body">Submitted through the {leadSourceLabel(lead.source)} form.</span>
              </li>
            </ol>
          </div>

          <aside className="adm-form-side">
            <section className="adm-panel adml-panel">
              <h3>Status</h3>
              <form action={updateLeadStatus}>
                <input type="hidden" name="id" value={lead.id} />
                <label className="adm-label" htmlFor="lead-status">Pipeline stage</label>
                <select id="lead-status" className="sme-select" name="status" defaultValue={lead.status}>
                  {LEAD_STATUS_ORDER.map((s) => (
                    <option key={s} value={s}>{LEAD_STATUS_LABEL[s]}</option>
                  ))}
                </select>
                <label className="adm-label" htmlFor="lead-status-note">Note (optional)</label>
                <textarea
                  id="lead-status-note"
                  className="sme-textarea"
                  name="note"
                  rows={2}
                  maxLength={4000}
                  placeholder="Why it moved"
                />
                <SubmitButton className="btn btn-primary adm-btn adm-btn-block" pendingLabel="Saving…">
                  Update status
                </SubmitButton>
              </form>
            </section>

            <section className="adm-panel adml-panel">
              <h3>Owner</h3>
              <form action={assignLead}>
                <input type="hidden" name="id" value={lead.id} />
                <label className="adm-label" htmlFor="lead-owner">Assigned to</label>
                <select id="lead-owner" className="sme-select" name="assignee" defaultValue={lead.assignedToId ?? "none"}>
                  <option value="none">Unassigned</option>
                  {inactiveOwner ? (
                    <option value={inactiveOwner.id}>{staffLabel(inactiveOwner)} (inactive)</option>
                  ) : null}
                  {staff.map((u) => (
                    <option key={u.id} value={u.id}>
                      {staffLabel(u)}
                      {u.role === "SALES" ? " · Sales" : ""}
                    </option>
                  ))}
                </select>
                <SubmitButton className="btn btn-ghost adm-btn-sm adm-btn-block" pendingLabel="Saving…">
                  Save owner
                </SubmitButton>
              </form>
              {!assignedToMe ? (
                <form action={assignLead} className="adml-linkform">
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="assignee" value={session.user.id} />
                  <button type="submit" className="adm-linkbtn">Assign to me</button>
                </form>
              ) : null}
            </section>

            <section className="adm-panel adml-panel">
              <h3>Reply</h3>
              <p className="adm-hint">Opens your email app with the subject filled in.</p>
              <div className="adml-contact">
                <a href={replyHref} className="btn btn-primary adm-btn-sm">
                  Email {firstName || "contact"}
                </a>
                {lead.phone ? (
                  <a href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`} className="btn btn-ghost adm-btn-sm">
                    Call {lead.phone}
                  </a>
                ) : null}
                {wa ? (
                  <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost adm-btn-sm">
                    WhatsApp ↗
                  </a>
                ) : null}
              </div>
              {lead.status === LeadStatus.NEW ? (
                <form action={updateLeadStatus} className="adml-linkform">
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="status" value={LeadStatus.CONTACTED} />
                  <button type="submit" className="adm-linkbtn">Mark as contacted</button>
                </form>
              ) : null}
            </section>

            <section className="adm-panel adml-panel">
              <h3>Delete</h3>
              <p className="adm-hint">Removes the lead and its whole timeline. Mark it as Spam instead to keep a record.</p>
              <form action={deleteLead} className="adml-linkform">
                <input type="hidden" name="id" value={lead.id} />
                <DangerButton confirmText={`Delete the lead from “${name}” and its timeline? This cannot be undone.`}>
                  Delete lead
                </DangerButton>
              </form>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}
