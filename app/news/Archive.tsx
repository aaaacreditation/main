import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import Icon from "../_components/Icon";
import { FACTS } from "@/lib/facts";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { SECTIONS, termSlug, type Section } from "@/lib/taxonomy";
import { PER_PAGE, formatDate, formatDateShort, isoDate, pageWindow, summarize } from "./helpers";
import { pageCountOf, scopeBase, scopePageHref, scopedPosts, type ArchiveScope } from "./scope";
import "./news.css";

/**
 * The newsroom archive template, shared by every listing page (see scope.ts):
 * News & Announcements (/news), Articles (/articles), and one page per
 * category (/news/category/…) and tag (/news/tag/…), each paginated.
 *
 * Nov 2026 (client feedback): the Resources menu's "Articles" and "News &
 * Announcements" used to open the same page. Each category now belongs to one
 * of the two sections in Admin → Categories & Tags.
 */

const RAIL_COUNT = 3;

/** Internal links surfaced from every archive page. */
const ELSEWHERE: { href: string; label: string; text: string }[] = [
  {
    href: "/directory/accredited-organizations",
    label: "Accredited organizations",
    text: "The public register of organizations holding AAA accreditation.",
  },
  {
    href: "/programs/conformity-assessment-bodies",
    label: "Accreditation programs",
    text: "Healthcare, conformity assessment bodies, training providers and SMEs.",
  },
  {
    href: "/faq",
    label: "Questions answered",
    text: "How AAA accreditation works, what it covers and how to apply.",
  },
];

/** Headline copy for each kind of listing. */
function heading(scope: ArchiveScope) {
  if (scope.kind === "section" && scope.section === "articles") {
    return {
      eyebrow: "AAA Articles",
      title: (
        <>
          Articles on <em>accreditation, quality and standards.</em>
        </>
      ),
      intro: "Practical guidance and perspectives from the AAA team for training providers, healthcare organizations, conformity assessment bodies and SMEs.",
      label: SECTIONS.articles.label,
    };
  }
  if (scope.kind === "section") {
    return {
      eyebrow: "AAA Newsroom",
      title: (
        <>
          News &amp; announcements from <em>the accreditation community.</em>
        </>
      ),
      intro: "Newly accredited organizations, partnership announcements, events and milestones from the American Accreditation Association.",
      label: SECTIONS.news.label,
    };
  }
  if (scope.kind === "category") {
    return {
      eyebrow: SECTIONS[scope.term.section].label,
      title: <>{scope.term.name}</>,
      intro: `Everything the American Accreditation Association has published under ${scope.term.name}, newest first.`,
      label: scope.term.name,
    };
  }
  return {
    eyebrow: "Tag",
    title: <>Tagged “{scope.term.name}”</>,
    intro: `Articles and news from the American Accreditation Association tagged ${scope.term.name}, newest first.`,
    label: `Tagged “${scope.term.name}”`,
  };
}

export default async function Archive({ page, scope }: { page: number; scope: ArchiveScope }) {
  const { posts, all, categories } = await scopedPosts(scope);
  const total = posts.length;
  const pageCount = pageCountOf(total);

  if (page < 1 || page > pageCount) notFound();

  const start = (page - 1) * PER_PAGE;
  const slice = posts.slice(start, start + PER_PAGE);
  const isFirst = page === 1;
  const base = scopeBase(scope);
  const href = (n: number) => scopePageHref(scope, n);
  const head = heading(scope);

  // Only a section's front page gets the featured story + rail.
  const featured = isFirst && scope.kind === "section" && slice.length > 4;
  const lead = featured ? slice[0] : undefined;
  const rail = featured ? slice.slice(1, 1 + RAIL_COUNT) : [];
  const cards = featured ? slice.slice(1 + RAIL_COUNT) : slice;

  const oldest = posts[total - 1];
  const firstYear = oldest ? oldest.date.slice(0, 4) : "2020";

  // The section this listing sits in, for the crumbs and the category chips.
  const section: Section | null =
    scope.kind === "section" ? scope.section : scope.kind === "category" ? scope.term.section : null;
  const sectionCrumb = section ? { href: SECTIONS[section].path, label: SECTIONS[section].label } : null;
  const here = scope.kind === "section" ? [] : [{ href: base, label: head.label }];
  const trail = [...(scope.kind === "section" ? [] : sectionCrumb ? [sectionCrumb] : []), ...here];
  const crumbs = isFirst
    ? [...trail.slice(0, -1), { label: scope.kind === "section" ? head.label : trail[trail.length - 1].label }]
    : [...(scope.kind === "section" ? [{ href: base, label: head.label }] : trail), { label: `Page ${page}` }];

  // Category chips: every category of this section that has published posts.
  const chips = section
    ? categories
        .filter((c) => c.section === section)
        .map((c) => ({ c, n: all.filter((p) => termSlug(p.category || "News") === c.slug).length }))
        .filter((x) => x.n > 0)
    : [];
  const other: Section | null = section ? (section === "news" ? "articles" : "news") : null;

  const schemaTrail = [
    ...trail.map((t) => ({ name: t.label, path: t.href })),
    ...(scope.kind === "section" ? [{ name: head.label, path: base }] : []),
  ];
  const schema = [
    breadcrumbSchema(isFirst ? schemaTrail : [...schemaTrail, { name: `Page ${page}`, path: href(page) }]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: isFirst ? `AAA ${head.label}` : `AAA ${head.label} — page ${page}`,
      url: `${SITE_URL}${href(page)}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: slice.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: slice.map((p, i) => ({
          "@type": "ListItem",
          position: start + i + 1,
          url: `${SITE_URL}/news/${p.slug}`,
          name: p.title,
        })),
      },
    },
  ];

  return (
    <div className="axp nxp">
      <JsonLd schema={schema} />

      <PageHero
        image="/hero.jpg"
        eyebrow={head.eyebrow}
        badge={isFirst ? head.eyebrow : `${head.eyebrow} · Page ${page} of ${pageCount}`}
        title={head.title}
        intro={head.intro}
        crumbs={crumbs}
        meta={[
          { k: "Published", v: String(total) },
          { k: "Archive from", v: firstYear },
          { k: "Countries served", v: FACTS.countriesPlus },
        ]}
      />

      {lead && (
        <section className="ax-section" id="latest">
          <div className="container">
            <div className="ax-head reveal">
              <span className="eyebrow">Latest</span>
              <h2>The most recent update.</h2>
              <p>
                {section === "articles"
                  ? "Guidance from the AAA team on accreditation, quality and standards, for the organizations we work with worldwide."
                  : "Accreditation decisions, recognitions, partnerships and events from the AAA newsroom, for the organizations we work with worldwide."}
              </p>
            </div>

            <div className="nx-lead" style={{ marginTop: "clamp(28px, 3.2vw, 42px)" }}>
              <Link href={`/news/${lead.slug}`} className={`nx-lead-main reveal${lead.coverImage ? " has-cover" : ""}`}>
                {lead.coverImage && (
                  <span className="nx-lead-media" aria-hidden="true">
                    <Image src={lead.coverImage} alt="" fill priority sizes="(max-width: 980px) 100vw, 760px" />
                  </span>
                )}
                <span className="nx-lead-tag">
                  <i aria-hidden="true" />
                  Featured story · {lead.category}
                </span>
                <time className="nx-lead-date" dateTime={isoDate(lead.date)}>
                  {formatDate(lead.date)}
                </time>
                <h2>{lead.title}</h2>
                {summarize(lead, 240) && <p>{summarize(lead, 240)}</p>}
                <span className="nx-lead-go">
                  Read the full story <Icon name="arrow" size={14} />
                </span>
              </Link>

              {rail.length > 0 && (
                <aside className="nx-rail reveal">
                  <span className="ax-label">Also this month</span>
                  <ol>
                    {rail.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/news/${p.slug}`} className={p.coverImage ? "has-thumb" : undefined}>
                          {p.coverImage && (
                            <span className="nx-rail-thumb" aria-hidden="true">
                              <Image src={p.coverImage} alt="" fill sizes="88px" />
                            </span>
                          )}
                          <span>
                            <time dateTime={isoDate(p.date)}>{formatDateShort(p.date)}</time>
                            <h3>{p.title}</h3>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </aside>
              )}
            </div>
          </div>
        </section>
      )}

      <section className={isFirst ? "ax-section cream" : "ax-section"} id="archive">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">{isFirst ? (featured ? "The archive" : head.label) : `Page ${page}`}</span>
            <h2>{isFirst ? (featured ? `Earlier ${head.label.toLowerCase()}.` : `${total} ${total === 1 ? "article" : "articles"}.`) : `More ${head.label.toLowerCase()}.`}</h2>
            {total > 0 && (
              <p>
                {`Showing ${start + 1}–${start + slice.length} of ${total} · page ${page} of ${pageCount}.`}
              </p>
            )}
          </div>

          {(chips.length > 0 || other) && (
            <nav className="nx-cats reveal" aria-label="Browse by category">
              {section && (
                <Link
                  href={SECTIONS[section].path}
                  className={"nx-cat" + (scope.kind === "section" ? " on" : "")}
                  aria-current={scope.kind === "section" ? "page" : undefined}
                >
                  All {SECTIONS[section].label.toLowerCase()}
                </Link>
              )}
              {chips.map(({ c, n }) => {
                const on = scope.kind === "category" && scope.term.slug === c.slug;
                return (
                  <Link
                    key={c.slug}
                    href={`/news/category/${c.slug}`}
                    className={"nx-cat" + (on ? " on" : "")}
                    aria-current={on ? "page" : undefined}
                  >
                    {c.name} <span>{n}</span>
                  </Link>
                );
              })}
              {other && (
                <Link href={SECTIONS[other].path} className="nx-cat nx-cat-other">
                  {SECTIONS[other].label} <Icon name="arrow" size={12} />
                </Link>
              )}
            </nav>
          )}

          {total === 0 && <p className="nx-empty">Nothing has been published here yet.</p>}

          {/* Oct 2026: image-led cards on the site card (NavyCard surface), with
              the post's featured image synced from the old site. */}
          <div className="nx-grid" style={{ marginTop: "clamp(28px, 3.2vw, 42px)" }}>
            {cards.map((p, i) => (
              <Link
                href={`/news/${p.slug}`}
                key={p.slug}
                className="ax-card navy ax-blue nx-card reveal"
                style={{ transitionDelay: `${Math.min(i, 8) * 45}ms` }}
              >
                <figure className={`nx-card-media${p.coverImage ? "" : " empty"}`}>
                  {p.coverImage ? (
                    <Image src={p.coverImage} alt="" fill sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 400px" />
                  ) : (
                    <span className="nx-card-seal" aria-hidden="true">AAA</span>
                  )}
                  <span className="nx-card-cat">{p.category}</span>
                </figure>
                <div className="nx-card-body">
                  <time dateTime={isoDate(p.date)}>{formatDate(p.date)}</time>
                  <h3>{p.title}</h3>
                  {summarize(p) && <p>{summarize(p)}</p>}
                  <span className="ax-card-go">
                    Read article <Icon name="arrow" size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {pageCount > 1 && (
            <>
              <nav className="nx-pager reveal" aria-label={`${head.label} pagination`}>
                {page > 1 ? (
                  <Link
                    href={href(page - 1)}
                    className="nx-page-edge"
                    rel="prev"
                    aria-label="Previous page"
                  >
                    ← <span>Previous</span>
                  </Link>
                ) : (
                  <span className="nx-page-edge nx-page-off" aria-hidden="true">
                    ← <span>Previous</span>
                  </span>
                )}

                {pageWindow(page, pageCount).map((n, i) =>
                  n === null ? (
                    <span className="nx-page-gap" key={`gap-${i}`} aria-hidden="true">
                      …
                    </span>
                  ) : n === page ? (
                    <span className="nx-page-on" key={n} aria-current="page">
                      {n}
                    </span>
                  ) : (
                    <Link href={href(n)} key={n} aria-label={`Page ${n}`}>
                      {n}
                    </Link>
                  )
                )}

                {page < pageCount ? (
                  <Link
                    href={href(page + 1)}
                    className="nx-page-edge"
                    rel="next"
                    aria-label="Next page"
                  >
                    <span>Next</span> →
                  </Link>
                ) : (
                  <span className="nx-page-edge nx-page-off" aria-hidden="true">
                    <span>Next</span> →
                  </span>
                )}
              </nav>
              <p className="nx-pager-note">
                {`${total} published across ${pageCount} pages, newest first.`}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="ax-section navy tight">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Elsewhere on the site</span>
            <h2>Looking for something specific?</h2>
          </div>
          <div className="ax-grid three">
            {ELSEWHERE.map((e) => (
              <Link href={e.href} key={e.href} className="ax-card reveal">
                <h3>{e.label}</h3>
                <p>{e.text}</p>
                <span className="ax-card-go">
                  Open <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Work with AAA"
        title="Ready to join the organizations in this newsroom?"
        text="Tell us about your organization — sector, applicable standards and the countries you operate in — and our team will scope the right accreditation route and come back with a tailored quote."
        related={[
          { href: "/directory/accredited-organizations", label: "Accredited organizations" },
          { href: "/programs/healthcare", label: "Healthcare accreditation" },
          { href: "/contact", label: "Contact AAA" },
        ]}
      />
    </div>
  );
}
