import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";
import {
  countLevels,
  isRunLive,
  issueHelp,
  parseIssues,
  type AuditIssue,
  type IssueLevel,
} from "@/lib/seo-audit";
import RunAuditButton from "./RunAuditButton";
import { IssueList, LenChip, ScoreRing, SeoSubnav, dateTimeFmt, editHref } from "./seo-ui";
import "./seo-admin.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "SEO Center" };

const TABLE_DEFAULT = 25;
const LEVEL_ORDER: Record<IssueLevel, number> = { error: 0, warn: 1, info: 2 };

function duration(start: Date, end: Date | null) {
  if (!end) return "";
  const s = Math.max(0, Math.round((end.getTime() - start.getTime()) / 1000));
  return s >= 60 ? `${Math.floor(s / 60)} min ${s % 60} s` : `${s} s`;
}

export default async function SeoOverview({ searchParams }: { searchParams: Promise<{ show?: string; page?: string }> }) {
  await requireArea("seo");
  const { show, page: focus } = await searchParams;

  const runs = await prisma.seoAuditRun.findMany({ orderBy: { startedAt: "desc" }, take: 10 });
  const latest = runs[0];
  const lastDone = runs.find((r) => r.status === "done");
  const running = isRunLive(latest);
  const lastFailed = latest?.status === "failed" ? latest : null;

  const rows = lastDone
    ? await prisma.seoAuditPage.findMany({
        where: { runId: lastDone.id },
        orderBy: [{ score: "asc" }, { path: "asc" }],
      })
    : [];

  const pages = rows.map((r) => {
    const issues = parseIssues(r.issues);
    return { ...r, issues, ...countLevels(issues) };
  });

  const totals = pages.reduce(
    (t, p) => ({ errors: t.errors + p.errors, warnings: t.warnings + p.warnings, withErrors: t.withErrors + (p.errors ? 1 : 0) }),
    { errors: 0, warnings: 0, withErrors: 0 },
  );

  // Issue code → pages affected.
  const byCode = new Map<string, { code: string; level: IssueLevel; paths: string[]; example: AuditIssue }>();
  for (const p of pages) {
    for (const code of new Set(p.issues.map((i) => i.code))) {
      const first = p.issues.find((i) => i.code === code)!;
      const entry = byCode.get(code);
      if (entry) entry.paths.push(p.path);
      else byCode.set(code, { code, level: first.level, paths: [p.path], example: first });
    }
  }
  const topIssues = [...byCode.values()].sort(
    (a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || b.paths.length - a.paths.length,
  );

  // Shared titles / descriptions among pages that loaded.
  const dupGroups = (key: "title" | "description") => {
    const map = new Map<string, { text: string; paths: string[] }>();
    for (const p of pages) {
      if (p.statusCode !== 200 || !p[key].trim()) continue;
      const k = p[key].trim().toLowerCase().replace(/\s+/g, " ");
      const g = map.get(k);
      if (g) g.paths.push(p.path);
      else map.set(k, { text: p[key], paths: [p.path] });
    }
    return [...map.values()].filter((g) => g.paths.length > 1).sort((a, b) => b.paths.length - a.paths.length);
  };
  const dupTitles = dupGroups("title");
  const dupDescs = dupGroups("description");

  const shown = show === "all" ? pages : pages.slice(0, TABLE_DEFAULT);
  const focused = focus ? pages.find((p) => p.path === focus) : undefined;
  const isLocal = lastDone ? /\/\/(localhost|127\.|\[::1\]|0\.0\.0\.0)/.test(lastDone.baseUrl) : false;

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>SEO Center</h1>
          <p className="adm-topbar-sub">How search engines see the website — scores, problems and how to fix them.</p>
        </div>
        <div className="adm-topbar-actions">
          <Link href="/admin/seo/pages" className="btn btn-ghost adm-btn">Edit page metadata</Link>
        </div>
      </header>

      <div className="adm-content">
        <SeoSubnav active="overview" />

        {lastFailed ? (
          <p className="adm-error" role="alert">
            The last audit ({dateTimeFmt.format(lastFailed.startedAt)}) didn&apos;t finish: {lastFailed.error || "unknown error"}.
            {lastDone ? " The results below are from the previous successful audit." : ""}
          </p>
        ) : null}

        {!lastDone ? (
          <section className="adm-card seo-empty">
            <h2>Run your first SEO audit</h2>
            <p>
              The audit visits every page listed in the website&apos;s sitemap — the same list Google uses — and reads each one
              the way a search engine does. For every page it checks:
            </p>
            <ul>
              <li>that the page loads, and has a title and description of the right length;</li>
              <li>that it has one clear main heading and enough text to rank;</li>
              <li>its canonical address, indexing instructions and social-sharing image;</li>
              <li>structured data (the hidden labels Google and AI assistants read), image alt text and load time;</li>
              <li>titles or descriptions accidentally shared by several pages.</li>
            </ul>
            <p>
              Each page gets a score out of 100, and every problem comes with a plain-English explanation and how to fix it.
              Most fixes are made in <Link href="/admin/seo/pages">Page metadata</Link>, without touching code.
            </p>
            <RunAuditButton alreadyRunning={running} />
          </section>
        ) : (
          <>
            <div className="seo-summary">
              <section className="adm-card seo-scorecard">
                <ScoreRing score={lastDone.avgScore} large />
                <div>
                  <h2>Average SEO score</h2>
                  <p>
                    {lastDone.avgScore >= 80
                      ? "In good shape. Work through the remaining warnings to keep it there."
                      : lastDone.avgScore >= 50
                        ? "Room to improve. Start with the errors below — they cost the most points."
                        : "Several pages have serious problems. Fix the errors below first."}
                  </p>
                  <p className="seo-meta">
                    Audited {dateTimeFmt.format(lastDone.startedAt)} · {lastDone.baseUrl}
                    {lastDone.finishedAt ? ` · took ${duration(lastDone.startedAt, lastDone.finishedAt)}` : ""}
                  </p>
                </div>
              </section>
              <section className="adm-card">
                <div className="seo-run">
                  <h2>Run a new audit</h2>
                  <p className="adm-hint" style={{ margin: 0 }}>
                    Re-run after you change titles, descriptions or page content to see the new scores.
                    {isLocal ? " This audit ran against a development server, so load times look slower than on the live site." : ""}
                  </p>
                  <RunAuditButton alreadyRunning={running} />
                </div>
              </section>
            </div>

            <div className="adm-stats seo-stats">
              <div className="adm-stat accent">
                <strong>{lastDone.pageCount}</strong>
                <span>Pages checked</span>
              </div>
              <div className="adm-stat">
                <strong>{totals.errors}</strong>
                <span>Errors on {totals.withErrors} page{totals.withErrors === 1 ? "" : "s"}</span>
              </div>
              <div className="adm-stat">
                <strong>{totals.warnings}</strong>
                <span>Warnings</span>
              </div>
              <div className="adm-stat">
                <strong>{dupTitles.length + dupDescs.length}</strong>
                <span>Duplicate titles / descriptions</span>
              </div>
            </div>

            {focused ? (
              <section className="adm-card" style={{ marginBottom: 16 }}>
                <div className="adm-card-head">
                  <h2>
                    <span className="seo-path">{focused.path}</span> — score {focused.score}
                  </h2>
                  <Link href={editHref(focused.path)} className="adm-card-link">Fix in Page metadata →</Link>
                </div>
                <IssueList issues={focused.issues} />
              </section>
            ) : null}

            <div className="adm-cols">
              <section className="adm-card">
                <div className="adm-card-head">
                  <h2>Top issues</h2>
                  <span className="adm-table-dim">click one to see the pages</span>
                </div>
                {topIssues.length === 0 ? (
                  <p className="adm-hint">No issues found. Excellent.</p>
                ) : (
                  <ul className="seo-top">
                    {topIssues.map((t) => {
                      const help = issueHelp(t.code);
                      return (
                        <li key={t.code}>
                          <details>
                            <summary>
                              <span className={`seo-dot ${t.level}`} aria-hidden="true" />
                              <span className="seo-top-label">{help.label}</span>
                              <span className="seo-top-count">
                                {t.paths.length} page{t.paths.length === 1 ? "" : "s"}
                              </span>
                            </summary>
                            <p className="seo-top-fix">
                              e.g. {t.example.message} <br />
                              <strong>How to fix:</strong> {help.fix || t.example.fix}
                            </p>
                            <ul className="seo-top-pages">
                              {t.paths.slice(0, 40).map((p) => (
                                <li key={p}>
                                  <Link href={editHref(p)}>{p}</Link>
                                </li>
                              ))}
                              {t.paths.length > 40 ? <li className="adm-table-dim">+{t.paths.length - 40} more</li> : null}
                            </ul>
                          </details>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </section>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <section className="adm-card">
                  <div className="adm-card-head">
                    <h2>Duplicate titles &amp; descriptions</h2>
                  </div>
                  {dupTitles.length + dupDescs.length === 0 ? (
                    <p className="adm-hint">Every page that was checked has its own title and description.</p>
                  ) : (
                    <ul className="seo-dup">
                      {[...dupTitles.map((g) => ({ ...g, kind: "Title" })), ...dupDescs.map((g) => ({ ...g, kind: "Description" }))].map((g) => (
                        <li key={g.kind + g.text}>
                          <span className="adm-chip warn" style={{ marginBottom: 6 }}>{g.kind} on {g.paths.length} pages</span>
                          <q>{g.text}</q>
                          <span className="seo-chips">
                            {g.paths.map((p) => (
                              <Link key={p} href={editHref(p)} className="adm-tag">{p}</Link>
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>

                <section className="adm-card">
                  <div className="adm-card-head">
                    <h2>Audit history</h2>
                    <span className="adm-table-dim">last {runs.length}</span>
                  </div>
                  <ul className="seo-history">
                    {runs.map((r) => (
                      <li key={r.id}>
                        {r.status === "done" ? <ScoreRing score={r.avgScore} /> : <span className={`adm-chip ${r.status === "failed" ? "err" : "navy"}`}>{r.status}</span>}
                        <span className="seo-history-main">
                          <strong>{dateTimeFmt.format(r.startedAt)}</strong>
                          <em>
                            {r.status === "done"
                              ? `${r.pageCount} page${r.pageCount === 1 ? "" : "s"} · ${duration(r.startedAt, r.finishedAt)}`
                              : r.status === "failed"
                                ? r.error || "Failed"
                                : "Crawling…"}
                          </em>
                        </span>
                        {r.id === lastDone.id ? <span className="adm-chip ok">Shown</span> : null}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            <section className="adm-card adm-card-flush" style={{ marginTop: 16 }}>
              <div className="adm-card-head" style={{ padding: "16px 18px 6px" }}>
                <h2>Pages by score (lowest first)</h2>
                {pages.length > TABLE_DEFAULT ? (
                  show === "all" ? (
                    <Link href="/admin/seo" className="adm-card-link">Show the {TABLE_DEFAULT} lowest</Link>
                  ) : (
                    <Link href="/admin/seo?show=all" className="adm-card-link">Show all {pages.length} →</Link>
                  )
                ) : null}
              </div>
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Page</th>
                    <th>Score</th>
                    <th>Errors</th>
                    <th>Warnings</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {shown.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <Link href={`/admin/seo?page=${encodeURIComponent(p.path)}${show === "all" ? "&show=all" : ""}`} className="seo-path">
                          {p.path}
                        </Link>
                        <span className="seo-sub">{p.title || "— no title —"}</span>
                      </td>
                      <td><ScoreRing score={p.score} /></td>
                      <td className={`seo-num${p.errors ? " err" : ""}`}>{p.errors}</td>
                      <td className={`seo-num${p.warnings ? " warn" : ""}`}>{p.warnings}</td>
                      <td>{p.statusCode === 200 ? <LenChip kind="title" value={p.title} /> : <span className="adm-chip muted">—</span>}</td>
                      <td>{p.statusCode === 200 ? <LenChip kind="description" value={p.description} /> : <span className="adm-chip muted">—</span>}</td>
                      <td>
                        <span className={`adm-chip ${p.statusCode === 200 ? "ok" : p.statusCode >= 300 && p.statusCode < 400 ? "warn" : "err"}`}>
                          {p.statusCode || "No answer"}
                        </span>
                      </td>
                      <td className="adm-table-actions">
                        <Link href={editHref(p.path)} className="adm-edit">Fix</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </div>
    </>
  );
}
