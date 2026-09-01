import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "../_components/PageHero";
import PageBody from "../_components/PageBody";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import Icon from "../_components/Icon";
import { getPublishedPage } from "@/lib/content";
import { looksLikeHtml, mdishToHtml } from "@/lib/mdish";
import { CONTACT } from "@/lib/facts";
import { SITE_URL, breadcrumbSchema, pageMeta } from "@/lib/seo";

/**
 * Catch-all renderer for CMS pages created in the admin. Built-in app routes
 * always take precedence over this dynamic segment, so admin-created pages
 * can never shadow the fixed site.
 *
 * Aug 2026: re-skinned onto the `.ax-*` design system so a page authored in the
 * admin lands in the same navy/gold editorial shell as the hand-built routes —
 * `.ax-hero` header, `.ax-prose` body, a standing action rail and the shared
 * closing CTA — plus canonical metadata and breadcrumb JSON-LD.
 */
export const revalidate = 300;

const SLUG_RE = /^[a-z0-9][a-z0-9-]*$/;

/** Strips markup down to prose so a page without an intro still gets a description. */
function plainText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#8217;|&rsquo;/gi, "’")
    .replace(/\s+/g, " ")
    .trim();
}

function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s.,;:—-]+$/, "")}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) return {};
  const page = await getPublishedPage(slug);
  if (!page) return {};

  // Prefer an explicit SEO description; otherwise the intro, unless the intro is
  // too short to be a useful snippet and the body offers more of the page's own
  // words. Nothing here is invented — every fallback is the author's copy.
  const intro = page.intro?.trim() ?? "";
  const body = clamp(plainText(page.content || ""), 158);
  const description =
    page.seoDescription?.trim() ||
    (intro.length >= 90 || body.length <= intro.length ? intro : body) ||
    intro ||
    `${page.title} — American Accreditation Association.`;

  return pageMeta({
    title: page.seoTitle?.trim() || page.title,
    description,
    path: `/${page.slug}`,
    ...(page.heroImage ? { image: page.heroImage } : {}),
  });
}

export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUG_RE.test(slug)) notFound();

  const page = await getPublishedPage(slug);
  if (!page) notFound();

  // Admin pages are authored as HTML; anything migrated as markdown-ish plain
  // text is converted so both generations render inside `.ax-prose`.
  const html = looksLikeHtml(page.content) ? page.content : mdishToHtml(page.content);
  const updated = page.updatedAt instanceof Date ? page.updatedAt : new Date(page.updatedAt);

  return (
    <div className="axp">
      <JsonLd
        schema={[
          breadcrumbSchema([{ name: page.title, path: `/${page.slug}` }]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: page.seoTitle?.trim() || page.title,
            url: `${SITE_URL}/${page.slug}`,
            ...(page.intro?.trim() ? { description: page.intro.trim() } : {}),
            dateModified: updated.toISOString(),
            isPartOf: { "@id": `${SITE_URL}/#website` },
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
        ]}
      />

      <PageHero
        eyebrow="American Accreditation Association"
        badge="American Accreditation Association"
        title={page.title}
        intro={page.intro?.trim() || undefined}
        image={page.heroImage || undefined}
        crumbs={[{ label: page.title }]}
      />

      <PageBody
        label="AAA"
        aside={
          <div className="ax-panel">
            <span className="ax-panel-ico" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
                <path d="m8.8 12 2.3 2.3 4.1-4.4" />
              </svg>
            </span>
            <h3>Talk to AAA</h3>
            <p>
              Questions about accreditation, scope or eligibility? Our team will point you to the
              right program and set out what an assessment involves.
            </p>
            <Link href="/contact" className="ax-btn ax-btn-blue">
              Contact AAA <Icon name="arrow" size={14} />
            </Link>
            <ul className="ax-docs">
              <li className="ax-docs-title">Related</li>
              <li>
                <Link href="/programs/conformity-assessment-bodies">
                  Accreditation programs <i>PROGRAMS</i>
                </Link>
              </li>
              <li>
                <Link href="/directory/accredited-organizations">
                  Accredited organizations <i>REGISTER</i>
                </Link>
              </li>
              <li>
                <Link href="/faq">
                  Frequently asked questions <i>FAQ</i>
                </Link>
              </li>
            </ul>
            <p className="ax-panel-note">
              {CONTACT.email} · {CONTACT.phone}
            </p>
          </div>
        }
      >
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </PageBody>

      <CTA />
    </div>
  );
}
