import Link from "next/link";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import PageHero from "../_components/PageHero";
import SectionHead from "../_components/site/SectionHead";
import Glyph from "../_components/site/Glyph";
import { getCaseStudyArticles } from "@/lib/case-studies";
import { breadcrumbSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import CaseStudyCard from "./CaseStudyCard";
import "./case-studies.css";

/*
 * Case studies index (Nov 2026). The case studies used to live on a separate
 * app at casestudies.aaa-accreditation.org; they were imported into the
 * CaseStudy table (scripts/import-case-studies.mjs) and are edited in the
 * admin under Case Studies. Rows with an article body are listed here.
 */

export const revalidate = 300;

const PATH = "/case-studies";

export async function generateMetadata() {
  return seoPage({
    title: "Case Studies — AAA Accreditation Success Stories",
    description:
      "How training providers, healthcare organizations and certification bodies worldwide have grown with AAA accreditation — in their own words.",
    path: PATH,
    keywords: ["AAA case studies", "accreditation success stories", "accreditation impact"],
  });
}

export default async function CaseStudiesPage() {
  const articles = await getCaseStudyArticles();
  const lead = articles.find((a) => a.featured && a.image) ?? articles.find((a) => a.image);

  return (
    <div className="axp csx">
      <JsonLd schema={breadcrumbSchema([{ name: "Case Studies", path: PATH }])} />

      <PageHero
        eyebrow="Case Studies"
        title="Success Stories from AAA-Accredited Organizations"
        intro="How training and education providers, healthcare organizations and certification bodies around the world have used AAA accreditation to build credibility, reach new markets and grow."
        crumbs={[{ label: "Case Studies" }]}
        image={lead?.image ?? undefined}
        imageAlt={lead?.imageAlt ?? ""}
        caption={lead ? { kicker: lead.name, title: lead.title } : undefined}
        actions={
          <>
            {lead && (
              <Link href={`/case-studies/${lead.slug}`} className="ax-btn ax-btn-gold">
                Read the latest story <Glyph name="arrow-right" size={14} strokeWidth={2} />
              </Link>
            )}
            <Link href="/apply" className="ax-btn ax-btn-ghost">
              Apply for Accreditation <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
          </>
        }
      />

      <section className="ax-section cream" id="case-studies">
        <div className="container">
          <SectionHead
            center
            eyebrow="Real Accreditation Experiences"
            title="Read the Case Studies"
            intro="Each case study is the organization's own account of its accreditation journey and the results that followed."
          />
          {articles.length > 0 ? (
            <div className="csx-grid">
              {articles.map((a) => (
                <CaseStudyCard key={a.slug} a={a} sizes="(max-width: 720px) 92vw, (max-width: 1100px) 46vw, 380px" />
              ))}
            </div>
          ) : (
            <p className="csx-empty">New case studies are on their way — check back soon.</p>
          )}
        </div>
      </section>

      <CTA
        eyebrow="Your Story Next"
        title="Ready to Start Your Accreditation Journey?"
        text="Talk to our team about the accreditation program that fits your organization, or start your application today."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Talk to an Expert" }}
      />
    </div>
  );
}
