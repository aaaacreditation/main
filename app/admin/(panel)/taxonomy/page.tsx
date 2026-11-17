import type { Metadata } from "next";
import Link from "next/link";
import { TermKind } from "@prisma/client";
import { prisma } from "@/lib/db";
import { canAccess, requireAdmin } from "@/lib/admin";
import { SECTIONS, termSlug } from "@/lib/taxonomy";
import { ACCREDITATION_TYPES, REGISTER_TYPES } from "@/app/_data/accredited-organizations";
import DangerButton from "../../_components/DangerButton";
import SubmitButton from "../../_components/SubmitButton";
import { createTerm, deleteTerm, moveTerm, updateTerm } from "./actions";
import { TAB_KIND, TAXONOMY_ERRORS, TAXONOMY_SAVED, kindTab, type TaxonomyTab } from "./shared";
import "./taxonomy.css";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Categories & Tags" };

const TABS: { tab: TaxonomyTab; label: string; area: "content" | "directory" }[] = [
  { tab: "categories", label: "Blog categories", area: "content" },
  { tab: "tags", label: "Blog tags", area: "content" },
  { tab: "register", label: "Register tags", area: "directory" },
];

const INTRO: Record<TaxonomyTab, string> = {
  categories:
    "Every article has one category. Each category belongs to a Resources page: News & Announcements (/news) or Articles (/articles), and has its own page at /news/category/…",
  tags: "Articles can carry any number of tags; each tag has a page at /news/tag/… and is shown under the article.",
  register:
    "Extra “Accredited as” filters for the public register, next to the built-in types. Tick them on an organization in Accredited Register.",
};

export default async function TaxonomyAdmin({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; saved?: string; error?: string }>;
}) {
  const session = await requireAdmin();
  const { tab: tabParam = "", saved, error } = await searchParams;
  const tabs = TABS.filter((t) => canAccess(session.user.role, t.area));
  const tab = (tabs.find((t) => t.tab === tabParam) ?? tabs[0])?.tab;
  if (!tab) {
    return (
      <div className="adm-content">
        <p className="adm-empty">You don’t have access to categories or tags.</p>
      </div>
    );
  }
  const kind = TAB_KIND[tab];

  const [terms, posts, orgs] = await Promise.all([
    prisma.term.findMany({ where: { kind }, orderBy: [{ order: "asc" }, { name: "asc" }] }),
    kind === TermKind.ORG_TAG ? Promise.resolve([]) : prisma.post.findMany({ select: { category: true, tags: true } }),
    kind === TermKind.ORG_TAG ? prisma.organization.findMany({ select: { tags: true } }) : Promise.resolve([]),
  ]);

  const usage = (slug: string) =>
    kind === TermKind.POST_CATEGORY
      ? posts.filter((p) => termSlug(p.category || "News") === slug).length
      : kind === TermKind.POST_TAG
        ? posts.filter((p) => p.tags.some((t) => termSlug(t) === slug)).length
        : orgs.filter((o) => o.tags.includes(slug)).length;
  const unit = kind === TermKind.ORG_TAG ? "organization" : "article";
  const publicHref = (slug: string) =>
    kind === TermKind.POST_CATEGORY ? `/news/category/${slug}` : kind === TermKind.POST_TAG ? `/news/tag/${slug}` : null;

  return (
    <>
      <header className="adm-topbar">
        <div>
          <h1>Categories &amp; Tags</h1>
          <p className="adm-topbar-sub">{INTRO[tab]}</p>
        </div>
      </header>

      <div className="adm-content txn">
        <nav className="adm-subnav" aria-label="Lists">
          {tabs.map((t) => (
            <Link key={t.tab} href={`/admin/taxonomy?tab=${t.tab}`} className={t.tab === tab ? "on" : undefined}>
              {t.label}
            </Link>
          ))}
        </nav>

        {saved && TAXONOMY_SAVED[saved] ? <p className="adm-toast ok" role="status">{TAXONOMY_SAVED[saved]}</p> : null}
        {error && TAXONOMY_ERRORS[error] ? <p className="adm-error" role="alert">{TAXONOMY_ERRORS[error]}</p> : null}

        <div className="adm-form-grid">
          <div className="adm-card adm-card-flush">
            {terms.length === 0 ? (
              <p className="adm-empty">Nothing here yet — add the first one on the right.</p>
            ) : (
              <ol className="txn-list">
                {terms.map((t, i) => {
                  const used = usage(t.slug);
                  const others = terms.filter((x) => x.id !== t.id);
                  const href = publicHref(t.slug);
                  return (
                    <li key={t.id} className="txn-row">
                      <form action={updateTerm} className={"txn-edit" + (kind === TermKind.POST_CATEGORY ? " has-sec" : "")}>
                        <input type="hidden" name="tab" value={tab} />
                        <input type="hidden" name="id" value={t.id} />
                        <input id={`txn-name-${t.id}`} aria-label={`Name of ${t.name}`} className="sme-input" name="name" defaultValue={t.name} maxLength={60} required />
                        {kind === TermKind.POST_CATEGORY ? (
                          <>
                            <select id={`txn-sec-${t.id}`} aria-label={`Resources page for ${t.name}`} className="sme-select" name="section" defaultValue={t.section}>
                              <option value="news">{SECTIONS.news.label}</option>
                              <option value="articles">{SECTIONS.articles.label}</option>
                            </select>
                          </>
                        ) : null}
                        <SubmitButton className="btn btn-ghost adm-btn-sm" pendingLabel="Saving…">Save</SubmitButton>
                      </form>

                      <div className="txn-meta">
                        <span className={"adm-chip " + (used ? "ok" : "muted")}>
                          {used} {unit}
                          {used === 1 ? "" : "s"}
                        </span>
                        {href && used > 0 ? (
                          <a href={href} target="_blank" rel="noopener noreferrer" className="txn-link">
                            View page ↗
                          </a>
                        ) : null}
                      </div>

                      <div className="txn-actions">
                        <form action={moveTerm}>
                          <input type="hidden" name="tab" value={tab} />
                          <input type="hidden" name="id" value={t.id} />
                          <input type="hidden" name="dir" value="up" />
                          <button type="submit" className="txn-move" disabled={i === 0} aria-label={`Move ${t.name} up`}>↑</button>
                        </form>
                        <form action={moveTerm}>
                          <input type="hidden" name="tab" value={tab} />
                          <input type="hidden" name="id" value={t.id} />
                          <input type="hidden" name="dir" value="down" />
                          <button type="submit" className="txn-move" disabled={i === terms.length - 1} aria-label={`Move ${t.name} down`}>↓</button>
                        </form>
                        <details className="txn-delete">
                          <summary>Delete</summary>
                          <form action={deleteTerm}>
                            <input type="hidden" name="tab" value={tab} />
                            <input type="hidden" name="id" value={t.id} />
                            {kind === TermKind.POST_CATEGORY && used > 0 ? (
                              <>
                                <label className="adm-label" htmlFor={`txn-move-${t.id}`}>
                                  Move its {used} article{used === 1 ? "" : "s"} to
                                </label>
                                <select id={`txn-move-${t.id}`} className="sme-select" name="moveTo" required defaultValue="">
                                  <option value="" disabled>Choose a category…</option>
                                  {others.map((o) => (
                                    <option key={o.id} value={o.id}>{o.name}</option>
                                  ))}
                                </select>
                              </>
                            ) : used > 0 ? (
                              <p className="adm-hint">It will be removed from {used} {unit}{used === 1 ? "" : "s"}.</p>
                            ) : null}
                            <DangerButton confirmText={`Delete “${t.name}”? This cannot be undone.`}>Delete {kindTab(kind).one}</DangerButton>
                          </form>
                        </details>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>

          <aside className="adm-form-side">
            <div className="adm-panel">
              <h3>Add a {kindTab(kind).one}</h3>
              <form action={createTerm} className="txn-add">
                <input type="hidden" name="tab" value={tab} />
                <label className="adm-label" htmlFor="txn-new">Name</label>
                <input id="txn-new" className="sme-input" name="name" maxLength={60} required placeholder={kind === TermKind.ORG_TAG ? "e.g. ISO 45001 Training" : "e.g. Webinars"} />
                {kind === TermKind.POST_CATEGORY ? (
                  <>
                    <label className="adm-label" htmlFor="txn-new-sec">Listed on</label>
                    <select id="txn-new-sec" className="sme-select" name="section" defaultValue="articles">
                      <option value="news">{SECTIONS.news.label}</option>
                      <option value="articles">{SECTIONS.articles.label}</option>
                    </select>
                  </>
                ) : null}
                <SubmitButton className="btn btn-primary adm-btn adm-btn-block" pendingLabel="Adding…">Add</SubmitButton>
              </form>
              <p className="adm-hint">
                You can also add new {kind === TermKind.ORG_TAG ? "tags while editing an organization" : `${kindTab(kind).one === "category" ? "categories" : "tags"} while editing an article`}. Renaming
                updates every {unit} that uses it.
              </p>
            </div>
            {kind === TermKind.ORG_TAG ? (
              <div className="adm-panel">
                <h3>Built-in types</h3>
                <p className="adm-hint">Always offered on the register, and set automatically from each accreditation record:</p>
                <ul className="txn-builtin">
                  {REGISTER_TYPES.map((t) => (
                    <li key={t}>{ACCREDITATION_TYPES[t].label}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </>
  );
}
