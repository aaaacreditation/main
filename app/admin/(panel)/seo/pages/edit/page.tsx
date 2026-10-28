import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireArea } from "@/lib/admin";
import { SITE_URL } from "@/lib/seo";
import {
  SEO_LIMITS,
  TITLE_SUFFIX,
  isNewsArticlePath,
  normalizeRoutePath,
  parseIssues,
  sitemapPaths,
  sortIssues,
  type SitemapPath,
} from "@/lib/seo-audit";
import DangerButton from "../../../../_components/DangerButton";
import SubmitButton from "../../../../_components/SubmitButton";
import { deleteSeoEntry, recheckSeoPage } from "../../actions";
import { IssueList, LenChip, ScoreRing, SeoSubnav, dateTimeFmt } from "../../seo-ui";
import SeoEntryForm from "./SeoEntryForm";
import "../../seo-admin.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Edit page metadata — SEO" };

type SP = { path?: string; saved?: string; removed?: string; checked?: string; error?: string };

export default async function SeoEditPage({ searchParams }: { searchParams: Promise<SP> }) {
  await requireArea("seo");
  const sp = await searchParams;
  const path = normalizeRoutePath(sp.path ?? "");

  if (!path) {
    return (
      <>
        <header className="adm-topbar">
          <div>
            <div className="adm-crumbs">
              <Link href="/admin/seo">SEO Center</Link> / <Link href="/admin/seo/pages">Page metadata</Link>
            </div>
            <h1>Edit page metadata</h1>
          </div>
        </header>
        <div className="adm-content">
          <p className="adm-error" role="alert">
            {sp.path ? `“${sp.path}” isn't a valid page address.` : "No page was chosen."} Use a path that starts with “/”, like{" "}
            <code>/programs/healthcare</code>.
          </p>
          <Link href="/admin/seo/pages" className="btn btn-ghost adm-btn">← Back to all pages</Link>
        </div>
      </>
    );
  }

  const isArticle = isNewsArticlePath(path);
  const [entry, latest, sitemap, post] = await Promise.all([
    prisma.seoEntry.findUnique({ where: { path } }),
    prisma.seoAuditPage.findFirst({
      where: { path, run: { status: "done" } },
      orderBy: { run: { startedAt: "desc" } },
      include: { run: { select: { startedAt: true, baseUrl: true } } },
    }),
    sitemapPaths().catch(() => [] as SitemapPath[]),
    isArticle
      ? prisma.post.findUnique({
          where: { slug: path.slice("/news/".length) },
          select: { id: true, title: true, seoTitle: true, seoDescription: true },
        })
      : Promise.resolve(null),
  ]);

  const inSitemap = sitemap.some((s) => s.path === path);
  const issues = latest ? sortIssues(parseIssues(latest.issues)) : [];
  const loaded = latest?.statusCode === 200;
  const changedSinceAudit = !!entry && !!latest && entry.updatedAt > latest.run.startedAt;
  const publicUrl = path === "/" ? "/" : path;

  return (
    <>
      <header className="adm-topbar">
        <div>
          <div className="adm-crumbs">
            <Link href="/admin/seo">SEO Center</Link> / <Link href="/admin/seo/pages">Page metadata</Link>
          </div>
          <h1 className="adm-topbar-clamp">
            <span className="seo-path" style={{ fontSize: "inherit" }}>{path}</span>
          </h1>
          <p className="adm-topbar-sub">
            {entry ? "Has an SEO override" : "Using the page's built-in metadata"}
            {inSitemap ? " · in the sitemap" : " · not in the sitemap"}
          </p>
        </div>
        <div className="adm-topbar-actions">
          <Link href={publicUrl} target="_blank" className="btn btn-ghost adm-btn">View page ↗</Link>
        </div>
      </header>

      <div className="adm-content">
        <SeoSubnav active="pages" />

        {sp.saved ? <p className="adm-toast ok" role="status">Override saved. Re-check the page to see the new score.</p> : null}
        {sp.removed ? <p className="adm-toast" role="status">Override removed — the page uses its built-in metadata again.</p> : null}
        {sp.checked ? <p className="adm-toast ok" role="status">Page re-checked. The results below are fresh.</p> : null}
        {sp.error === "canonical" ? (
          <p className="adm-error" role="alert">
            The canonical address must be a full web address starting with https:// (or a path starting with “/”). Nothing was saved.
          </p>
        ) : null}
        {sp.error === "recheck" ? (
          <p className="adm-error" role="alert">The page couldn&apos;t be re-checked just now. Try again in a moment.</p>
        ) : null}

        <div className="adm-form-grid">
          <div className="adm-form-main">
            <SeoEntryForm
              key={entry ? entry.updatedAt.toISOString() : "none"}
              path={path}
              siteUrl={SITE_URL}
              suffix={TITLE_SUFFIX}
              limits={{
                titleMin: SEO_LIMITS.titleMin,
                titleMax: SEO_LIMITS.titleMax,
                descMin: SEO_LIMITS.descMin,
                descMax: SEO_LIMITS.descMax,
              }}
              initial={{
                title: entry?.title ?? "",
                description: entry?.description ?? "",
                keywords: (entry?.keywords ?? []).join(", "),
                ogImage: entry?.ogImage ?? "",
                canonical: entry?.canonical ?? "",
                robots: entry?.noindex === true ? "noindex" : entry?.noindex === false ? "index" : "inherit",
                notes: entry?.notes ?? "",
              }}
              live={loaded ? { title: latest!.title, description: latest!.description } : null}
              hasEntry={!!entry}
            />
          </div>

          <aside className="adm-form-side">
            <div className="adm-panel">
              <div className="seo-live-head">
                <h3>SEO score</h3>
                <ScoreRing score={latest?.score} />
              </div>
              <p className="adm-hint">
                {latest
                  ? `Last checked ${dateTimeFmt.format(latest.run.startedAt)}.`
                  : "This page hasn't been audited yet."}
                {changedSinceAudit ? " The override changed since then — re-check to update the score." : ""}
              </p>
              <form action={recheckSeoPage} className="seo-side-form">
                <input type="hidden" name="path" value={path} />
                <SubmitButton className="btn btn-ghost adm-btn-sm" pendingLabel="Checking…">Re-check this page</SubmitButton>
              </form>
            </div>

            {isArticle ? (
              <div className="adm-panel">
                <h3>News article</h3>
                {post ? (
                  <>
                    <p className="adm-hint">
                      Articles also have their own SEO title and description on the article itself
                      {post.seoTitle || post.seoDescription ? " (set)" : " (not set)"}. An override here wins over those.
                    </p>
                    <Link href={`/admin/posts/${post.id}`} className="adm-panel-link">Edit article SEO fields →</Link>
                  </>
                ) : (
                  <p className="adm-hint">No article with this address was found in the CMS.</p>
                )}
              </div>
            ) : null}

            {entry ? (
              <div className="adm-panel">
                <h3>Remove override</h3>
                <p className="adm-hint">Deletes every value set here; the page goes back to its built-in title, description and settings.</p>
                <form action={deleteSeoEntry} className="seo-side-form">
                  <input type="hidden" name="path" value={path} />
                  <DangerButton className="adm-danger" confirmText={`Remove the SEO override for ${path}? The page goes back to its built-in metadata.`}>
                    Remove override
                  </DangerButton>
                </form>
                <p className="adm-hint">Last changed {dateTimeFmt.format(entry.updatedAt)}.</p>
              </div>
            ) : null}
          </aside>
        </div>

        <section className="adm-card seo-live" style={{ marginTop: 18 }}>
          <div className="adm-card-head">
            <h2>What search engines see now</h2>
            {latest ? <span className="adm-table-dim">checked {dateTimeFmt.format(latest.run.startedAt)} · {latest.run.baseUrl}</span> : null}
          </div>
          {!latest ? (
            <p className="adm-hint">
              Not checked yet. Use “Re-check this page” to fetch it now, or run a full audit from the{" "}
              <Link href="/admin/seo">SEO Center</Link>.
            </p>
          ) : (
            <>
              <dl className="adm-kv">
                <dt>Status</dt>
                <dd>
                  <span className={`adm-chip ${loaded ? "ok" : "err"}`}>{latest.statusCode || "No answer"}</span>
                  {loaded ? `loaded in ${(latest.fetchMs / 1000).toFixed(1)} s` : ""}
                </dd>
                {loaded ? (
                  <>
                    <dt>Title</dt>
                    <dd>
                      <LenChip kind="title" value={latest.title} /> {latest.title || "—"}
                    </dd>
                    <dt>Description</dt>
                    <dd>
                      <LenChip kind="description" value={latest.description} /> {latest.description || "—"}
                    </dd>
                    <dt>Canonical</dt>
                    <dd>{latest.canonical || "—"}</dd>
                    <dt>Robots</dt>
                    <dd>{latest.robots || "— (indexable by default)"}</dd>
                    <dt>Sharing image</dt>
                    <dd>
                      {latest.ogImage ? (
                        <a href={latest.ogImage} target="_blank" rel="noreferrer">{latest.ogImage}</a>
                      ) : (
                        "— none"
                      )}
                    </dd>
                    <dt>Main heading (H1)</dt>
                    <dd>
                      {latest.h1 || "—"}
                      {latest.h1Count > 1 ? ` (+${latest.h1Count - 1} more)` : ""}
                    </dd>
                    <dt>Words on page</dt>
                    <dd>{latest.wordCount.toLocaleString("en-US")}</dd>
                    <dt>Images without alt</dt>
                    <dd>{latest.imagesMissingAlt}</dd>
                    <dt>Structured data</dt>
                    <dd>
                      {latest.jsonLdTypes.length ? (
                        <span className="seo-chips">
                          {latest.jsonLdTypes.map((t) => (
                            <span key={t} className="adm-tag">{t}</span>
                          ))}
                        </span>
                      ) : (
                        "— none"
                      )}
                    </dd>
                  </>
                ) : null}
              </dl>

              <h3 className="adm-section-title">Issues ({issues.length})</h3>
              <IssueList issues={issues} empty="No issues found on this page — nice work." />
            </>
          )}
        </section>
      </div>
    </>
  );
}
