import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import Icon from "../_components/Icon";
import { getPublishedPosts } from "@/lib/content";
import { FACTS } from "@/lib/facts";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
import {
  PER_PAGE,
  formatDate,
  formatDateShort,
  isoDate,
  pageHref,
  pageWindow,
  summarize,
} from "./helpers";
import "./news.css";

/**
 * The AAA newsroom archive, shared by `/news` (page 1) and `/news/page/[n]`.
 *
 * Pagination scheme: `/news` is page 1 and `/news/archive/2` … `/news/archive/N`
 * carry the rest. (The WordPress-native `/news/page/:n` shape is already taken
 * by a permanent redirect to `/news` in next.config.ts.) PER_PAGE is 20, which
 * puts the 299 migrated posts on 15 pages — the same count the live site has.
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

export default async function Archive({ page }: { page: number }) {
  const posts = await getPublishedPosts();
  const total = posts.length;
  const pageCount = Math.max(1, Math.ceil(total / PER_PAGE));

  if (page < 1 || page > pageCount) notFound();

  const start = (page - 1) * PER_PAGE;
  const slice = posts.slice(start, start + PER_PAGE);
  const isFirst = page === 1;

  const lead = isFirst ? slice[0] : undefined;
  const rail = isFirst ? slice.slice(1, 1 + RAIL_COUNT) : [];
  const cards = isFirst ? slice.slice(1 + RAIL_COUNT) : slice;

  const oldest = posts[total - 1];
  const firstYear = oldest ? oldest.date.slice(0, 4) : "2020";

  const crumbs = isFirst
    ? [{ label: "AAA News" }]
    : [{ href: "/news", label: "AAA News" }, { label: `Page ${page}` }];

  const schema = [
    breadcrumbSchema(
      isFirst
        ? [{ name: "AAA News", path: "/news" }]
        : [
            { name: "AAA News", path: "/news" },
            { name: `Page ${page}`, path: pageHref(page) },
          ]
    ),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: isFirst ? "AAA News & Events" : `AAA News & Events — page ${page}`,
      url: `${SITE_URL}${pageHref(page)}`,
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
        eyebrow="AAA Newsroom"
        badge={isFirst ? "AAA Newsroom" : `AAA Newsroom · Page ${page} of ${pageCount}`}
        title={
          <>
            News &amp; events from <em>the accreditation community.</em>
          </>
        }
        intro="Newly accredited organizations, partnership announcements, standards guidance and milestones from the American Accreditation Association."
        crumbs={crumbs}
        meta={[
          { k: "Articles published", v: String(total) },
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
                Every announcement below is published by the AAA newsroom — accreditation
                decisions, recognitions, partnerships and guidance for the organizations we work
                with worldwide.
              </p>
            </div>

            <div className="nx-lead" style={{ marginTop: "clamp(28px, 3.2vw, 42px)" }}>
              <Link href={`/news/${lead.slug}`} className="nx-lead-main reveal">
                <span className="nx-lead-tag">
                  <i aria-hidden="true" />
                  Featured story
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
                        <Link href={`/news/${p.slug}`}>
                          <time dateTime={isoDate(p.date)}>{formatDateShort(p.date)}</time>
                          <h3>{p.title}</h3>
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
            <span className="eyebrow">{isFirst ? "The archive" : `Page ${page}`}</span>
            <h2>{isFirst ? "Earlier from the newsroom." : "More from the newsroom."}</h2>
            <p>
              {`Showing ${start + 1}–${start + slice.length} of ${total} articles · page ${page} of ${pageCount}.`}
            </p>
          </div>

          <div className="ax-grid three" style={{ marginTop: "clamp(28px, 3.2vw, 42px)" }}>
            {cards.map((p, i) => (
              <Link
                href={`/news/${p.slug}`}
                key={p.slug}
                className="ax-card nx-card reveal"
                style={{ transitionDelay: `${Math.min(i, 8) * 45}ms` }}
              >
                <div className="nx-card-top">
                  <time dateTime={isoDate(p.date)}>{formatDateShort(p.date)}</time>
                  <span className="nx-card-yr" aria-hidden="true">
                    {p.date.slice(0, 4)}
                  </span>
                </div>
                <h3>{p.title}</h3>
                {summarize(p) && <p>{summarize(p)}</p>}
                <span className="ax-card-go">
                  Read article <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </div>

          {pageCount > 1 && (
            <>
              <nav className="nx-pager reveal" aria-label="News archive pagination">
                {page > 1 ? (
                  <Link
                    href={pageHref(page - 1)}
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
                    <Link href={pageHref(n)} key={n} aria-label={`Page ${n}`}>
                      {n}
                    </Link>
                  )
                )}

                {page < pageCount ? (
                  <Link
                    href={pageHref(page + 1)}
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
                {`${total} articles across ${pageCount} pages, newest first.`}
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
