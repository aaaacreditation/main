import Link from "next/link";
import { ContentStatus, LeadKind, LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { canAccess, requireArea } from "@/lib/admin";
import { LEAD_KIND_LABEL, LEAD_STATUS_LABEL, leadSourceLabel } from "@/lib/leads";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const dateTimeFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

const DAY = 86_400_000;

/** Reporting windows, computed per request (kept out of render for the purity lint). */
function windows() {
  const now = Date.now();
  return {
    now: new Date(now),
    since30: new Date(now - 30 * DAY),
    since60: new Date(now - 60 * DAY),
    in90: new Date(now + 90 * DAY),
  };
}

const STATUS_TONE: Partial<Record<LeadStatus, string>> = {
  NEW: "new",
  CONTACTED: "ok",
  QUALIFIED: "ok",
  PROPOSAL: "ok",
  WON: "won",
  SPAM: "err",
};

const DENIED: Record<string, string> = {
  content: "content editing",
  "case-studies": "case studies",
  directory: "the directory",
  seo: "the SEO Center",
  leads: "leads",
  users: "team management",
  activity: "the activity log",
};

/** Lead kinds shown on the dashboard, in the order sales thinks about them. */
const KINDS: LeadKind[] = [LeadKind.APPLICATION, LeadKind.CONTACT, LeadKind.QUOTE, LeadKind.ADVISOR, LeadKind.MEMBERSHIP];

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ denied?: string }>;
}) {
  const session = await requireArea("dashboard");
  const role = session.user.role;
  const { denied } = await searchParams;
  const showContent = canAccess(role, "content");
  const showDirectory = canAccess(role, "directory");
  const showSeo = canAccess(role, "seo");
  const firstName = (session.user.name || "").split(/\s+/)[0];

  const { now, since30, since60, in90 } = windows();

  const [
    newLeads,
    leads30,
    leadsPrev30,
    byKind,
    byStatus,
    latestLeads,
    published,
    drafts,
    caseStudies,
    orgs,
    expiring,
    expired,
    latestAudit,
    activity,
  ] = await Promise.all([
    prisma.lead.count({ where: { status: LeadStatus.NEW } }),
    prisma.lead.count({ where: { createdAt: { gte: since30 }, status: { not: LeadStatus.SPAM } } }),
    prisma.lead.count({ where: { createdAt: { gte: since60, lt: since30 }, status: { not: LeadStatus.SPAM } } }),
    prisma.lead.groupBy({ by: ["kind"], where: { createdAt: { gte: since30 }, status: { not: LeadStatus.SPAM } }, _count: true }),
    prisma.lead.groupBy({ by: ["status"], _count: true }),
    prisma.lead.findMany({
      where: { status: { not: LeadStatus.SPAM } },
      orderBy: { createdAt: "desc" },
      take: 7,
      select: { id: true, business: true, contact: true, kind: true, source: true, status: true, createdAt: true },
    }),
    showContent ? prisma.post.count({ where: { status: ContentStatus.PUBLISHED } }) : 0,
    showContent ? prisma.post.count({ where: { status: ContentStatus.DRAFT } }) : 0,
    canAccess(role, "case-studies") ? prisma.caseStudy.count({ where: { status: ContentStatus.PUBLISHED } }) : 0,
    showDirectory ? prisma.organization.count({ where: { status: ContentStatus.PUBLISHED } }) : 0,
    showDirectory
      ? prisma.accreditation.count({ where: { status: "Accredited", expiresOn: { gte: now, lte: in90 } } })
      : 0,
    showDirectory ? prisma.accreditation.count({ where: { status: "Accredited", expiresOn: { lt: now } } }) : 0,
    showSeo
      ? prisma.seoAuditRun.findFirst({ where: { status: "done" }, orderBy: { startedAt: "desc" } })
      : null,
    canAccess(role, "activity")
      ? prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 6, include: { user: { select: { name: true } } } })
      : [],
  ]);

  const kindCount = (k: LeadKind) => byKind.find((r) => r.kind === k)?._count ?? 0;
  const statusCount = (s: LeadStatus) => byStatus.find((r) => r.status === s)?._count ?? 0;
  const maxKind = Math.max(1, ...KINDS.map(kindCount));
  const trend = leadsPrev30 === 0 ? null : Math.round(((leads30 - leadsPrev30) / leadsPrev30) * 100);
  const openPipeline = [LeadStatus.CONTACTED, LeadStatus.QUALIFIED, LeadStatus.PROPOSAL].reduce((n, s) => n + statusCount(s), 0);

  const stats = [
    { label: "New leads to answer", value: newLeads, href: "/admin/leads?status=NEW", accent: newLeads > 0 },
    {
      label: "Leads, last 30 days",
      value: leads30,
      href: "/admin/leads",
      note: trend === null ? undefined : `${trend >= 0 ? "+" : ""}${trend}% vs previous 30 days`,
    },
    { label: "In the pipeline", value: openPipeline, href: "/admin/leads?status=pipeline", note: "Contacted · qualified · proposal" },
    ...(showDirectory
      ? [{ label: "Accreditations expiring ≤ 90 days", value: expiring, href: "/admin/directory?expiry=90", note: expired ? `${expired} already expired` : undefined }]
      : []),
    ...(showSeo
      ? [{ label: "SEO health score", value: latestAudit ? latestAudit.avgScore : "—", href: "/admin/seo", note: latestAudit ? `Audited ${dateFmt.format(latestAudit.startedAt)}` : "No audit yet" }]
      : []),
  ];

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>{firstName ? `Welcome back, ${firstName}` : "Dashboard"}</h1>
          <p className="adm-topbar-sub">Everything happening across the AAA website.</p>
        </div>
        <div className="adm-topbar-actions">
          <Link href="/admin/leads" className="btn btn-primary adm-btn">Open leads</Link>
          {showContent ? <Link href="/admin/posts/new" className="btn btn-ghost adm-btn">+ New article</Link> : null}
        </div>
      </header>

      <div className="adm-content">
        {denied && DENIED[denied] ? (
          <p className="adm-error" role="alert">Your role doesn&apos;t include access to {DENIED[denied]}. Ask an administrator if you need it.</p>
        ) : null}

        <div className={"adm-stats" + (stats.length === 5 ? " five" : "")}>
          {stats.map((s) => (
            <Link href={s.href} className={"adm-stat" + (s.accent ? " accent" : "")} key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
              {s.note ? <em>{s.note}</em> : null}
            </Link>
          ))}
        </div>

        <div className="adm-cols">
          <section className="adm-card">
            <div className="adm-card-head">
              <h2>Latest leads</h2>
              <Link href="/admin/leads" className="adm-card-link">All leads →</Link>
            </div>
            {latestLeads.length === 0 ? (
              <p className="adm-empty" style={{ padding: "14px 0" }}>No leads yet — they appear here as soon as a website form is submitted.</p>
            ) : (
              <ul className="adm-list">
                {latestLeads.map((l) => (
                  <li key={l.id}>
                    <Link href={`/admin/leads/${l.id}`} className="adm-list-row">
                      <span className="adm-list-title">
                        {l.business || l.contact}
                        <em className="adm-list-sub">{LEAD_KIND_LABEL[l.kind]} · {leadSourceLabel(l.source)}</em>
                      </span>
                      <span className="adm-list-meta">
                        <span className={"adm-chip " + (STATUS_TONE[l.status] ?? "muted")}>{LEAD_STATUS_LABEL[l.status]}</span>
                        {dateTimeFmt.format(l.createdAt)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="adm-card">
            <div className="adm-card-head">
              <h2>Leads by type · last 30 days</h2>
            </div>
            <div className="adm-funnel">
              {KINDS.map((k) => (
                <Link href={`/admin/leads?kind=${k}`} className="adm-funnel-row" key={k}>
                  <span>{LEAD_KIND_LABEL[k].replace(/ (enquiry|application|request)s?$/i, "")}</span>
                  <span className="adm-bar"><span style={{ width: `${(kindCount(k) / maxKind) * 100}%` }} /></span>
                  <b>{kindCount(k)}</b>
                </Link>
              ))}
            </div>
            <div className="adm-card-head" style={{ marginTop: 22 }}>
              <h2>Pipeline</h2>
            </div>
            <div className="adm-lead-tags">
              {[LeadStatus.NEW, LeadStatus.CONTACTED, LeadStatus.QUALIFIED, LeadStatus.PROPOSAL, LeadStatus.WON, LeadStatus.LOST].map((s) => (
                <Link key={s} href={`/admin/leads?status=${s}`} className={"adm-chip " + (STATUS_TONE[s] ?? "muted")}>
                  {LEAD_STATUS_LABEL[s]} · {statusCount(s)}
                </Link>
              ))}
            </div>
          </section>
        </div>

        {showContent || activity.length > 0 ? (
          <div className="adm-cols">
            {showContent ? (
              <section className="adm-card">
                <div className="adm-card-head">
                  <h2>Content</h2>
                </div>
                <dl className="adm-kv">
                  <dt>Published articles</dt>
                  <dd><Link href="/admin/posts?status=PUBLISHED">{published}</Link></dd>
                  <dt>Drafts</dt>
                  <dd><Link href="/admin/posts?status=DRAFT">{drafts}</Link></dd>
                  <dt>Case studies live</dt>
                  <dd><Link href="/admin/case-studies">{caseStudies}</Link></dd>
                  {showDirectory ? (
                    <>
                      <dt>Accredited organizations</dt>
                      <dd><Link href="/admin/directory">{orgs}</Link></dd>
                    </>
                  ) : null}
                </dl>
              </section>
            ) : null}

            {activity.length > 0 ? (
              <section className="adm-card">
                <div className="adm-card-head">
                  <h2>Recent activity</h2>
                  <Link href="/admin/activity" className="adm-card-link">Full log →</Link>
                </div>
                <ul className="adm-timeline">
                  {activity.map((a) => (
                    <li key={a.id}>
                      <span className="adm-timeline-meta">{a.user?.name ?? "System"} · {dateTimeFmt.format(a.createdAt)}</span>
                      <span className="adm-timeline-body">{a.summary || `${a.action} ${a.entity}`}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
}
