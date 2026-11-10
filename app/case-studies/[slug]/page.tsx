import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "../../_components/CTA";
import JsonLd from "../../_components/JsonLd";
import PageBody from "../../_components/PageBody";
import PageHero from "../../_components/PageHero";
import Glyph from "../../_components/site/Glyph";
import { getCaseStudyArticle, getCaseStudyArticles } from "@/lib/case-studies";
import { CONTACT } from "@/lib/facts";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import CaseStudyBody from "../CaseStudyBody";
import CaseStudyCard from "../CaseStudyCard";
import "../case-studies.css";

/*
 * One case study (Nov 2026) — imported from casestudies.aaa-accreditation.org
 * with the same slug, so the old domain can redirect path-for-path. The body
 * is the organization's own account, published as edited in the admin.
 */

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCaseStudyArticles()).map((a) => ({ slug: a.slug }));
}

/** Plain-text summary for meta descriptions when the article has no excerpt. */
function summary(html: string, max = 155): string {
  const text = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;|&amp;/g, " ").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = await getCaseStudyArticle(slug);
  if (!a) return { title: "Case Studies" };
  return seoPage({
    title: a.title,
    description: a.excerpt && a.excerpt !== a.title ? a.excerpt : summary(a.body),
    path: `/case-studies/${a.slug}`,
    image: a.image ?? undefined,
    type: "article",
    publishedTime: a.publishedAt,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const a = await getCaseStudyArticle(slug);
  if (!a) notFound();

  const more = (await getCaseStudyArticles()).filter((x) => x.slug !== a.slug).slice(0, 3);
  const path = `/case-studies/${a.slug}`;
  const crumb = a.name.length > 48 ? `${a.name.slice(0, 48).trimEnd()}…` : a.name;
  const website = a.website ? a.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : null;

  return (
    <div className="axp csx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Case Studies", path: "/case-studies" },
            { name: a.title, path },
          ]),
          articleSchema({
            title: a.title,
            description: a.excerpt || summary(a.body),
            path,
            datePublished: a.publishedAt,
            image: a.image ?? undefined,
          }),
        ]}
      />

      <PageHero
        eyebrow="Case Study"
        badge={a.name}
        title={a.title}
        intro={a.subtitle || a.excerpt || undefined}
        crumbs={[{ href: "/case-studies", label: "Case Studies" }, { label: crumb }]}
        image={a.image ?? undefined}
        imageAlt={a.imageAlt}
        caption={{ kicker: a.sector ? a.sector : "AAA-accredited", title: a.name }}
      />

      <PageBody
        label="Case Study"
        aside={
          <div className="ax-panel csx-org">
            {a.logo && (
              <span className="csx-org-logo">
                <Image src={a.logo} alt={`${a.name} logo`} fill sizes="220px" />
              </span>
            )}
            <h3>{a.name}</h3>
            <dl className="csx-facts">
              {a.sector && (
                <div>
                  <dt>Industry</dt>
                  <dd>{a.sector}</dd>
                </div>
              )}
              {a.country && (
                <div>
                  <dt>Location</dt>
                  <dd>{a.country}</dd>
                </div>
              )}
              {a.scope && (
                <div>
                  <dt>Scope</dt>
                  <dd>{a.scope}</dd>
                </div>
              )}
              {a.website && website && (
                <div>
                  <dt>Website</dt>
                  <dd>
                    <a href={a.website} target="_blank" rel="noopener noreferrer">
                      {website}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <Link href="/apply" className="ax-btn ax-btn-blue">
              Apply for Accreditation <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
            <ul className="ax-docs">
              <li className="ax-docs-title">Go deeper</li>
              <li>
                <Link href="/case-studies">
                  All case studies <i>STORIES</i>
                </Link>
              </li>
              <li>
                <Link href="/directory/accredited-organizations">
                  Accredited organizations register <i>REGISTER</i>
                </Link>
              </li>
              <li>
                <Link href={CONTACT.quoteHref}>
                  Request a quote <i>QUOTE</i>
                </Link>
              </li>
            </ul>
          </div>
        }
      >
        <article>
          <CaseStudyBody html={a.body} title={a.title} />
        </article>
        <p className="csx-back">
          <Link href="/case-studies" className="ax-link">
            Back to all case studies
          </Link>
        </p>
      </PageBody>

      {more.length > 0 && (
        <section className="ax-section cream">
          <div className="container">
            <div className="ax-head reveal">
              <span className="eyebrow">Keep reading</span>
              <h2>More case studies.</h2>
            </div>
            <div className="csx-grid">
              {more.map((x) => (
                <CaseStudyCard key={x.slug} a={x} sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 380px" />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA
        eyebrow="Your Story Next"
        title="Ready to Start Your Accreditation Journey?"
        text="Talk to our team about the accreditation program that fits your organization, or start your application today."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Talk to an Expert" }}
        related={[
          { href: "/case-studies", label: "All case studies" },
          { href: "/directory/accredited-organizations", label: "Accredited organizations" },
        ]}
      />
    </div>
  );
}
