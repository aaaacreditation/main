import type { Metadata } from "next";
import Link from "../_components/SiteLink";
import { notFound } from "next/navigation";
import PageHero from "../_components/PageHero";
import PageBody from "../_components/PageBody";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import Icon from "../_components/Icon";
import PostBody from "./PostBody";
import {
  formatDate,
  formatDateShort,
  isoDate,
  isThinPost,
  metaDescription,
  readingTime,
  summarize,
  wordCount,
} from "./helpers";
import { TermKind } from "@prisma/client";
import { getPublishedPost, getPublishedPosts, type PublicPost } from "@/lib/content";
import { SECTIONS, categoryFor, getTerms, sectionOf, termSlug } from "@/lib/taxonomy";
import { CONTACT } from "@/lib/facts";
import { FEED_ALTERNATES, SITE_NAME, SITE_URL, articleSchema, breadcrumbSchema, clampDescription, titleFor } from "@/lib/seo";
import { withSeoOverride } from "@/lib/seo-overrides";
import "./news.css";
import { postPath } from "@/lib/public-urls";

/**
 * A single newsroom article, served at the site root (/<slug>/) by app/[slug] —
 * the old WordPress permalink, which the client asked to keep as the real
 * address (Nov 2026). /news/<slug> redirects there (next.config.ts).
 *
 * Cover images on the migrated posts still point at the old WordPress host, so
 * they are deliberately not rendered — the layout is typographic instead, and
 * the article is framed by its date, reading time, siblings and related items.
 */

/**
 * The canonical article for `post`: a "-2" copy of another post with the same
 * headline (WordPress re-publishes) points search engines at the original.
 */
async function canonicalSlugOf(post: PublicPost): Promise<string> {
  const base = post.slug.replace(/-\d+$/, "");
  if (base === post.slug) return post.slug;
  const original = await getPublishedPost(base);
  return original && original.title.trim().toLowerCase() === post.title.trim().toLowerCase() ? original.slug : post.slug;
}

/** Metadata for the post at /<slug>/, or null when there is no such post. */
export async function postMetadata(slug: string): Promise<Metadata | null> {
  const post = await getPublishedPost(slug);
  if (!post) return null;

  // pageMeta is not used here: the canonical/OG data is assembled per post.
  // An SEO Center override for this URL (SeoEntry) is applied on top.
  // The editor's SEO fields win over the headline/excerpt-derived defaults.
  const title = post.seoTitle?.trim() || post.title;
  const description = clampDescription(post.seoDescription?.trim() || metaDescription(post));
  const url = `${SITE_URL}${postPath(await canonicalSlugOf(post))}`;
  // The cover when there is one, else the generated site-wide card.
  const image = post.coverImage || "/opengraph-image";

  return withSeoOverride(`/news/${post.slug}`, {
    // Long headlines are shown without the " | AAA" suffix (lib/seo.ts).
    title: titleFor(title),
    description,
    alternates: { canonical: url, types: FEED_ALTERNATES },
    // Image-only posts with no text stay online but out of search (Nov 2026).
    ...(isThinPost(post) ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      title,
      description,
      locale: "en_US",
      publishedTime: post.date,
      ...(post.modified ? { modifiedTime: post.modified } : {}),
      section: post.category || "News",
      ...(post.tags.length ? { tags: post.tags } : {}),
      images: [{ url: image, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  });
}

function NavCard({
  post,
  direction,
}: {
  post: PublicPost | undefined;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  if (!post) {
    return (
      <span className={"nx-updown-empty" + (isNext ? " nx-next" : "")}>
        <span className="nx-updown-k">{isNext ? "Newer" : "Older"}</span>
        <strong>{isNext ? "This is the latest article" : "This is the earliest article"}</strong>
      </span>
    );
  }
  return (
    <Link href={`/news/${post.slug}`} className={isNext ? "nx-next" : undefined} rel={direction}>
      <span className="nx-updown-k">
        {isNext ? (
          <>Newer article</>
        ) : (
          <>
            <Icon name="arrow" size={12} /> Older article
          </>
        )}
      </span>
      <strong>{post.title}</strong>
    </Link>
  );
}

export default async function PostPage({ slug }: { slug: string }) {
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const [all, categories, tagTerms] = await Promise.all([
    getPublishedPosts(),
    getTerms(TermKind.POST_CATEGORY),
    getTerms(TermKind.POST_TAG),
  ]);
  // Its Resources section (News & Announcements or Articles), its category
  // page, and the tags that have a page of their own (Nov 2026).
  const section = SECTIONS[sectionOf(categories, post.category)];
  const category = categoryFor(categories, post.category);
  const tags = post.tags
    .map((t) => tagTerms.find((x) => x.slug === termSlug(t)))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const index = all.findIndex((p) => p.slug === post.slug);
  // `all` is newest-first: the previous item is newer, the next item is older.
  const newer = index > 0 ? all[index - 1] : undefined;
  const older = index >= 0 && index < all.length - 1 ? all[index + 1] : undefined;

  const related = all
    .filter((p) => p.slug !== post.slug)
    .filter((p) => (post.category ? p.category === post.category : true))
    .slice(0, 3);
  const relatedPosts = related.length === 3 ? related : all.filter((p) => p.slug !== post.slug).slice(0, 3);

  const minutes = readingTime(post.content);
  const crumbTitle =
    post.title.length > 52 ? `${post.title.slice(0, 52).trimEnd()}…` : post.title;
  const description = metaDescription(post);

  return (
    <div className="axp nxp">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: section.label, path: section.path },
            { name: post.title, path: `/news/${post.slug}` },
          ]),
          articleSchema({
            title: post.title,
            description,
            path: `/news/${post.slug}`,
            datePublished: post.date,
            dateModified: post.modified,
            image: post.coverImage ?? undefined,
            // Announcements are news; the Articles section is guidance.
            type: sectionOf(categories, post.category) === "articles" ? "BlogPosting" : "NewsArticle",
            section: post.category || "News",
            keywords: post.tags,
            wordCount: wordCount(post.content),
          }),
        ]}
      />

      <PageHero
        eyebrow="AAA Newsroom"
        badge={`AAA Newsroom · ${formatDate(post.date)}`}
        title={post.title}
        intro={summarize(post, 260) || undefined}
        crumbs={[{ href: section.path, label: section.label }, { label: crumbTitle }]}
        meta={[
          { k: "Published", v: formatDate(post.date) },
          { k: "Reading time", v: `${minutes} min` },
          { k: "Section", v: post.category || "News" },
        ]}
      />

      <PageBody
        label="AAA Newsroom"
        aside={
          <>
            <div className="ax-panel">
              <span className="ax-panel-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
                  <path d="m8.8 12 2.3 2.3 4.1-4.4" />
                </svg>
              </span>
              <h3>Accreditation with AAA</h3>
              <p>
                AAA accredits healthcare organizations, conformity assessment bodies, training and
                education providers, schools and SMEs. Tell us about your organization and we will
                scope the right route.
              </p>
              <Link href={CONTACT.quoteHref} className="ax-btn ax-btn-blue">
                Request a Quote <Icon name="arrow" size={14} />
              </Link>
              <ul className="ax-docs">
                <li className="ax-docs-title">Go deeper</li>
                <li>
                  <Link href="/directory/accredited-organizations">
                    Accredited organizations register <i>REGISTER</i>
                  </Link>
                </li>
                <li>
                  <Link href="/about-accreditation">
                    What accreditation means <i>GUIDE</i>
                  </Link>
                </li>
                <li>
                  <Link href={section.path}>
                    All {section.label.toLowerCase()} <i>ARCHIVE</i>
                  </Link>
                </li>
              </ul>
              <p className="ax-panel-note">
                Media and partnership enquiries: {CONTACT.email} · {CONTACT.phone}
              </p>
            </div>
          </>
        }
      >
        <article>
          <PostBody content={post.content} title={post.title} />
        </article>

        {(category || tags.length > 0) && (
          <div className="nx-post-terms">
            {category && (
              <Link href={`/news/category/${category.slug}`} className="nx-cat on">
                {category.name}
              </Link>
            )}
            {tags.map((t) => (
              <Link key={t.slug} href={`/news/tag/${t.slug}`} className="nx-cat">
                #{t.name}
              </Link>
            ))}
          </div>
        )}

        <nav className="nx-updown" aria-label="More newsroom articles">
          <NavCard post={older} direction="prev" />
          <NavCard post={newer} direction="next" />
        </nav>

        <p className="nx-share-free">
          <Link href={section.path} className="ax-link">
            Back to all {section.label.toLowerCase()}
          </Link>
        </p>
      </PageBody>

      {relatedPosts.length > 0 && (
        <section className="ax-section cream">
          <div className="container">
            <div className="ax-head reveal">
              <span className="eyebrow">Keep reading</span>
              <h2>Related from the newsroom.</h2>
              <p>
                More accreditation announcements and guidance published by the American
                Accreditation Association.
              </p>
            </div>
            <div className="ax-grid three" style={{ marginTop: "clamp(28px, 3.2vw, 42px)" }}>
              {relatedPosts.map((p, i) => (
                <Link
                  href={`/news/${p.slug}`}
                  key={p.slug}
                  className="ax-card nx-card reveal"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="nx-card-top">
                    <time dateTime={isoDate(p.date)}>{formatDateShort(p.date)}</time>
                    <span className="nx-card-yr" aria-hidden="true">
                      {p.date.slice(0, 4)}
                    </span>
                  </div>
                  <h3>{p.title}</h3>
                  {summarize(p, 150) && <p>{summarize(p, 150)}</p>}
                  <span className="ax-card-go">
                    Read article <Icon name="arrow" size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA
        related={[
          { href: "/news", label: "All news" },
          { href: "/directory/accredited-organizations", label: "Accredited organizations" },
          { href: "/apply", label: "Apply for accreditation" },
        ]}
      />
    </div>
  );
}
