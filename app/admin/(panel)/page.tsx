import Link from "next/link";
import { ContentStatus, LeadStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default async function AdminDashboard() {
  const [published, drafts, pages, newLeads, latestPosts, latestLeads] =
    await Promise.all([
      prisma.post.count({ where: { status: ContentStatus.PUBLISHED } }),
      prisma.post.count({ where: { status: ContentStatus.DRAFT } }),
      prisma.page.count(),
      prisma.lead.count({ where: { status: LeadStatus.NEW } }),
      prisma.post.findMany({ orderBy: { updatedAt: "desc" }, take: 6 }),
      prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    ]);

  const stats = [
    { label: "Published articles", value: published, href: "/admin/posts?status=PUBLISHED" },
    { label: "Drafts", value: drafts, href: "/admin/posts?status=DRAFT" },
    { label: "CMS pages", value: pages, href: "/admin/pages" },
    { label: "New applications", value: newLeads, href: "/admin/leads", accent: newLeads > 0 },
  ];

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>Dashboard</h1>
          <p className="adm-topbar-sub">Everything happening across the AAA website.</p>
        </div>
        <div className="adm-topbar-actions">
          <Link href="/admin/posts/new" className="btn btn-primary adm-btn">+ New article</Link>
          <Link href="/admin/pages/new" className="btn btn-ghost adm-btn">+ New page</Link>
        </div>
      </header>

      <div className="adm-content">
        <div className="adm-stats">
          {stats.map((s) => (
            <Link href={s.href} className={"adm-stat" + (s.accent ? " accent" : "")} key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </Link>
          ))}
        </div>

        <div className="adm-cols">
          <section className="adm-card">
            <div className="adm-card-head">
              <h2>Recently edited</h2>
              <Link href="/admin/posts" className="adm-card-link">All articles →</Link>
            </div>
            {latestPosts.length === 0 ? (
              <p className="adm-empty">No articles yet.</p>
            ) : (
              <ul className="adm-list">
                {latestPosts.map((p) => (
                  <li key={p.id}>
                    <Link href={`/admin/posts/${p.id}`} className="adm-list-row">
                      <span className="adm-list-title">{p.title}</span>
                      <span className="adm-list-meta">
                        <span className={"adm-chip " + (p.status === "PUBLISHED" ? "ok" : "muted")}>
                          {p.status === "PUBLISHED" ? "Published" : "Draft"}
                        </span>
                        {dateFmt.format(p.updatedAt)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="adm-card">
            <div className="adm-card-head">
              <h2>Latest applications</h2>
              <Link href="/admin/leads" className="adm-card-link">All applications →</Link>
            </div>
            {latestLeads.length === 0 ? (
              <p className="adm-empty">No applications yet — they land here when someone submits the home-page form.</p>
            ) : (
              <ul className="adm-list">
                {latestLeads.map((l) => (
                  <li key={l.id}>
                    <span className="adm-list-row">
                      <span className="adm-list-title">
                        {l.business}
                        <em className="adm-list-sub">{l.contact} · {l.email}</em>
                      </span>
                      <span className="adm-list-meta">
                        <span className={"adm-chip " + (l.status === "NEW" ? "new" : "muted")}>{l.status.toLowerCase()}</span>
                        {dateFmt.format(l.createdAt)}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
