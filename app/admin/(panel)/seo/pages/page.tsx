import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";
import { countLevels, isNewsArticlePath, parseIssues, sitemapPaths, type SitemapPath } from "@/lib/seo-audit";
import { LenChip, ScoreRing, SeoSubnav, dateTimeFmt, editHref } from "../seo-ui";
import "../seo-admin.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Page metadata — SEO" };

const PER_PAGE = 50;

type Kind = "site" | "news" | "all";
type Filter = "all" | "override" | "errors" | "unaudited" | "changed";

export default async function SeoPagesInventory({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kind?: string; filter?: string; page?: string; error?: string }>;
}) {
  await requireArea("seo");
  const sp = await searchParams;
  const q = (sp.q ?? "").trim();
  const kind: Kind = sp.kind === "news" || sp.kind === "all" ? sp.kind : "site";
  const filter: Filter = (["override", "errors", "unaudited", "changed"] as const).find((f) => f === sp.filter) ?? "all";
  const pageNum = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const [sitemap, entries, audits] = await Promise.all([
    sitemapPaths().catch((err) => {
      console.error("SEO inventory: sitemap failed —", err);
      return [] as SitemapPath[];
    }),
    prisma.seoEntry.findMany(),
    prisma.seoAuditPage.findMany({
      where: { run: { status: "done" } },
      orderBy: { run: { startedAt: "desc" } },
      distinct: ["path"],
      select: {
        path: true,
        title: true,
        description: true,
        score: true,
        statusCode: true,
        issues: true,
        run: { select: { startedAt: true } },
      },
    }),
  ]);

  const entryByPath = new Map(entries.map((e) => [e.path, e]));
  const auditByPath = new Map(audits.map((a) => [a.path, a]));
  const inSitemap = new Set(sitemap.map((s) => s.path));

  const allPaths = [...sitemap.map((s) => s.path), ...entries.map((e) => e.path).filter((p) => !inSitemap.has(p))];

  const rows = allPaths.map((path) => {
    const entry = entryByPath.get(path) ?? null;
    const a = auditByPath.get(path) ?? null;
    const counts = a ? countLevels(parseIssues(a.issues)) : null;
    const hasOverride = !!entry && !!(entry.title || entry.description || entry.keywords.length || entry.ogImage || entry.canonical || entry.noindex !== null);
    return {
      path,
      isNews: path === "/news" || path.startsWith("/news/"),
      entry,
      hasOverride,
      audit: a,
      errors: counts?.errors ?? 0,
      // Override saved after the last check: the audited values are out of date.
      changedSinceAudit: !!entry && !!a && entry.updatedAt > a.run.startedAt,
      inSitemap: inSitemap.has(path),
    };
  });

  const needle = q.toLowerCase();
  const filtered = rows.filter((r) => {
    if (kind === "site" && r.isNews) return false;
    if (kind === "news" && !r.isNews) return false;
    if (filter === "override" && !r.entry) return false;
    if (filter === "errors" && !r.errors) return false;
    if (filter === "unaudited" && r.audit) return false;
    if (filter === "changed" && !r.changedSinceAudit) return false;
    if (needle) {
      const hay = `${r.path} ${r.audit?.title ?? ""} ${r.entry?.title ?? ""}`.toLowerCase();
      if (!hay.includes(needle)) return false;
    }
    return true;
  });

  const pages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(pageNum, pages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  // Articles have their own SEO fields on the post itself.
  const slugs = visible.filter((r) => isNewsArticlePath(r.path)).map((r) => r.path.slice("/news/".length));
  const posts = slugs.length
    ? await prisma.post.findMany({ where: { slug: { in: slugs } }, select: { id: true, slug: true } })
    : [];
  const postIdBySlug = new Map(posts.map((p) => [p.slug, p.id]));

  const counts = {
    site: rows.filter((r) => !r.isNews).length,
    news: rows.filter((r) => r.isNews).length,
    overrides: rows.filter((r) => r.entry).length,
  };

  const href = (over: Partial<{ q: string; kind: Kind; filter: Filter; page: number }>) => {
    const params = new URLSearchParams();
    const next = { q, kind, filter, page: 1, ...over };
    if (next.q) params.set("q", next.q);
    if (next.kind !== "site") params.set("kind", next.kind);
    if (next.filter !== "all") params.set("filter", next.filter);
    if (next.page > 1) params.set("page", String(next.page));
    const qs = params.toString();
    return `/admin/seo/pages${qs ? `?${qs}` : ""}`;
  };

  return (
    <>
      <header className="adm-topbar">
        <div>
          <div className="adm-crumbs">
            <Link href="/admin/seo">SEO Center</Link> / Page metadata
          </div>
          <h1>Page metadata</h1>
          <p className="adm-topbar-sub">
            {counts.site} site pages · {counts.news} news pages · {counts.overrides} with an override
          </p>
        </div>
      </header>

      <div className="adm-content">
        <SeoSubnav active="pages" />

        {sp.error === "path" ? (
          <p className="adm-error" role="alert">
            That address isn&apos;t valid. Use a path that starts with “/”, like <code>/programs/healthcare</code>.
          </p>
        ) : null}

        <p className="adm-hint" style={{ margin: "0 0 14px" }}>
          Every page in the sitemap. Open one to change the title and description Google shows, its social-sharing image,
          or whether search engines may index it. Anything you leave blank keeps the page&apos;s built-in value.
        </p>

        <form className="adm-filterbar" action="/admin/seo/pages" method="get">
          <label className="grow">
            Search
            <input className="sme-input" type="search" name="q" defaultValue={q} placeholder="Path or title…" />
          </label>
          <label>
            Pages
            <select className="sme-select" name="kind" defaultValue={kind}>
              <option value="site">Site pages</option>
              <option value="news">News &amp; articles</option>
              <option value="all">Everything</option>
            </select>
          </label>
          <label>
            Show
            <select className="sme-select" name="filter" defaultValue={filter}>
              <option value="all">All</option>
              <option value="override">Has an override</option>
              <option value="errors">Has errors</option>
              <option value="changed">Changed since last audit</option>
              <option value="unaudited">Not audited yet</option>
            </select>
          </label>
          <div className="adm-filterbar-actions">
            <button type="submit" className="btn btn-primary adm-btn-sm">Apply</button>
            {q || kind !== "site" || filter !== "all" ? (
              <Link href="/admin/seo/pages" className="btn btn-ghost adm-btn-sm">Reset</Link>
            ) : null}
          </div>
        </form>

        <div className="adm-card adm-card-flush">
          {visible.length === 0 ? (
            <p className="adm-empty">No pages match these filters.</p>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Override</th>
                  <th>Score</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => {
                  const postId = isNewsArticlePath(r.path) ? postIdBySlug.get(r.path.slice("/news/".length)) : undefined;
                  const loaded = r.audit?.statusCode === 200;
                  return (
                    <tr key={r.path}>
                      <td>
                        <Link href={editHref(r.path)} className="seo-path">{r.path}</Link>
                        <span className="seo-sub">
                          {r.audit
                            ? loaded
                              ? r.audit.title || "— no title —"
                              : `Didn't load (status ${r.audit.statusCode || "no answer"})`
                            : r.entry?.title
                              ? `${r.entry.title} (override, not audited)`
                              : "Not audited yet"}
                        </span>
                      </td>
                      <td>{loaded ? <LenChip kind="title" value={r.audit!.title} /> : <span className="adm-chip muted">—</span>}</td>
                      <td>{loaded ? <LenChip kind="description" value={r.audit!.description} /> : <span className="adm-chip muted">—</span>}</td>
                      <td>
                        <span className="seo-chips">
                          {r.hasOverride ? <span className="adm-chip navy">Override</span> : r.entry ? <span className="adm-chip muted">Notes only</span> : <span className="adm-table-dim">—</span>}
                          {r.entry?.noindex === true ? <span className="adm-chip err">Noindex</span> : null}
                          {!r.inSitemap ? <span className="adm-chip muted">Not in sitemap</span> : null}
                          {r.changedSinceAudit ? (
                            <span className="adm-chip warn" title={`Override saved after the last check (${dateTimeFmt.format(r.audit!.run.startedAt)})`}>
                              Re-check
                            </span>
                          ) : null}
                        </span>
                      </td>
                      <td><ScoreRing score={r.audit?.score} /></td>
                      <td className="adm-table-actions">
                        <Link href={editHref(r.path)} className="adm-edit">Edit</Link>
                        {postId ? (
                          <Link href={`/admin/posts/${postId}`} className="adm-edit" title="Edit the article's own SEO title and description">
                            Article SEO
                          </Link>
                        ) : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {pages > 1 ? (
          <nav className="adm-pager" aria-label="Pagination">
            {current > 1 ? <Link href={href({ page: current - 1 })} className="btn btn-ghost adm-btn-sm">← Previous</Link> : <span />}
            <span className="adm-pager-info">
              Page {current} of {pages} · {filtered.length} pages
            </span>
            {current < pages ? <Link href={href({ page: current + 1 })} className="btn btn-ghost adm-btn-sm">Next →</Link> : <span />}
          </nav>
        ) : null}

        <section className="adm-card" style={{ marginTop: 18 }}>
          <div className="adm-card-head">
            <h2>Page not listed?</h2>
          </div>
          <p className="adm-hint" style={{ marginTop: 0 }}>
            Pages left out of the sitemap (for example ones marked noindex) can still have an override. Type the page&apos;s
            address or paste its full URL.
          </p>
          <form action="/admin/seo/pages/edit" method="get" className="adm-search" style={{ marginTop: 10 }}>
            <input className="sme-input" type="text" name="path" placeholder="/programs/healthcare" required />
            <button type="submit" className="btn btn-ghost adm-btn-sm">Open editor</button>
          </form>
        </section>
      </div>
    </>
  );
}
