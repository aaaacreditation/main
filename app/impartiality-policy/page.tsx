import Link from "next/link";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import NavyCard from "../_components/site/NavyCard";
import SectionHead from "../_components/site/SectionHead";
import Glyph, { type GlyphName } from "../_components/site/Glyph";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";
import "./impartiality-policy.css";

/*
 * Impartiality & Independence — rebuilt Oct 2026 on the client's final
 * cumulative package (Hero → Why Impartiality Matters → How AAA Safeguards
 * Impartiality → Confidentiality & Information Protection → Complaints &
 * Appeals → Final CTA), in the AAA design system with the SME blue card.
 * Complaint / appeal / procedure links go to /contact until dedicated pages
 * exist.
 */

export const metadata = pageMeta({
  title: "Impartiality & Independence",
  description:
    "How AAA protects impartiality and independence: conflict of interest management, independent oversight, confidentiality, and fair complaints and appeals.",
  path: "/impartiality-policy",
  keywords: [
    "accreditation impartiality",
    "accreditation independence",
    "conflict of interest accreditation body",
    "accreditation complaints and appeals",
    "AAA impartiality policy",
  ],
});

const IMG = "/images/site/impartiality";

const WHY: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "target",
    title: "Objectivity",
    text: "Decisions are based on evidence and applicable accreditation requirements.",
  },
  {
    icon: "scale",
    title: "Independence",
    text: "Accreditation activities are protected from inappropriate influence or competing interests.",
  },
  {
    icon: "check-circle",
    title: "Confidence",
    text: "Stakeholders can place greater trust in accreditation when decisions are made fairly and consistently.",
  },
];

const SAFEGUARDS: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "Conflict of Interest Management",
    text: "Potential conflicts of interest are identified and managed to help prevent personal, professional, commercial, or other interests from compromising the objectivity of accreditation activities.",
  },
  {
    icon: "route",
    title: "Separation of Assessment and Decision-Making",
    text: "Accreditation decisions are subject to independent review and are appropriately separated from assessment activities, helping ensure that decisions are not made solely by those who conducted the assessment.",
  },
  {
    icon: "file-check",
    title: "Evidence-Based Accreditation Decisions",
    text: "Accreditation decisions are based on assessment evidence, applicable requirements, documented findings, and established decision-making processes.",
  },
  {
    icon: "user-check",
    title: "Competent & Objective Personnel",
    text: "Assessors, technical experts, and other personnel involved in accreditation activities are expected to have appropriate competence for their assigned roles and to perform those roles objectively and professionally.",
  },
];

const CONFIDENTIALITY: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "lock",
    title: "Confidential Handling",
    text: "Information obtained during accreditation activities is treated as confidential and handled with appropriate care.",
  },
  {
    icon: "target",
    title: "Purpose-Limited Use",
    text: "Information is used only for legitimate accreditation activities and related organizational responsibilities.",
  },
  {
    icon: "key",
    title: "Controlled Access",
    text: "Access to confidential information is limited to personnel, assessors, experts, and decision-makers who require it for their assigned roles.",
  },
  {
    icon: "eye",
    title: "Responsible Disclosure",
    text: "Confidential information is not disclosed to third parties unless authorized, required by applicable obligations, or necessary within the accreditation process.",
  },
];

export default function ImpartialityPage() {
  return (
    <div className="axp imp">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About AAA", path: "/about" },
          { name: "Impartiality & Independence", path: "/impartiality-policy" },
        ])}
      />

      {/* 01 — Hero */}
      <PageHero
        eyebrow="Our Commitment"
        crumbs={[{ label: "About AAA", href: "/about" }, { label: "Impartiality & Independence" }]}
        title={
          <>
            Impartiality &amp; <span className="imp-gold">Independence</span>
          </>
        }
        intro={
          <>
            <span className="imp-tagline">
              Protecting the integrity, objectivity, and credibility of every accreditation decision.
            </span>
            At the American Accreditation Association (AAA), we are committed to independent, fair, and evidence-based
            accreditation, free from undue influence, conflicts of interest, or commercial, financial, or other
            pressures.
          </>
        }
        image={`${IMG}/impartiality-independence-hero.webp`}
        imageAlt="Symbolic balance scale representing integrity, objectivity, independence, fairness, transparency and trust"
        actions={
          <>
            <a href="#how-aaa-safeguards-impartiality" className="ax-btn ax-btn-gold imp-jump">
              How AAA Safeguards Impartiality <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </a>
            <a href="#complaints-appeals" className="ax-btn ax-btn-ghost imp-jump">
              Complaints &amp; Appeals <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </a>
          </>
        }
      />

      {/* 02 — Why impartiality matters */}
      <section className="ax-section" id="why-impartiality-matters">
        <div className="container">
          <SectionHead
            center
            eyebrow="Why It Matters"
            title="Confidence Depends on Independent Judgment"
            intro="Impartiality is fundamental to credible accreditation because stakeholders must be able to trust that assessments and decisions are made objectively, consistently, and on the basis of evidence."
          />
          <div className="imp-why">
            <div className="imp-why-lead reveal">
              <span className="imp-why-mark" aria-hidden="true">
                <Glyph name="scale" />
              </span>
              <p className="imp-why-big">
                Accreditation only has value when assessment and decision-making are objective, evidence-based, and free
                from inappropriate influence.
              </p>
              <p>
                Impartiality helps ensure that accreditation decisions are based on applicable requirements and verified
                evidence rather than commercial interests, personal relationships, financial considerations, or other
                pressures.
              </p>
            </div>
            <div className="imp-why-cards">
              {WHY.map((w, i) => (
                <NavyCard key={w.title} icon={w.icon} no={String(i + 1).padStart(2, "0")} title={w.title}>
                  <p>{w.text}</p>
                </NavyCard>
              ))}
            </div>
          </div>
          <p className="ax-note gold reveal imp-note">
            <Glyph name="badge-check" size={22} className="imp-note-ico" />
            <span>
              <strong>Impartiality supports the credibility of accreditation.</strong>
              It helps ensure that organizations are evaluated against the same applicable requirements without
              favoritism, bias, or undue influence.
            </span>
          </p>
        </div>
      </section>

      {/* 03 — How AAA safeguards impartiality */}
      <section className="ax-section cream" id="how-aaa-safeguards-impartiality">
        <div className="container">
          <SectionHead
            center
            eyebrow="Our Safeguards"
            title="How AAA Safeguards Impartiality"
            intro="AAA applies governance, oversight, and operational safeguards designed to protect accreditation activities from conflicts of interest, inappropriate influence, and other risks to impartiality."
          />
          <div className="imp-safe">
            <article className="imp-oversight ax-card navy ax-blue reveal">
              <div className="imp-oversight-top">
                <span className="ax-card-ico imp-oversight-ico">
                  <Glyph name="scale" />
                </span>
                <span className="ax-blue-tag">Independent Oversight</span>
              </div>
              <span className="imp-oversight-kicker">Advisory Committee</span>
              <h3>Oversight of Impartiality</h3>
              <p>
                AAA&apos;s Advisory Committee has responsibility for supporting the impartiality of accreditation
                activities. The Committee provides an additional level of oversight by considering matters that may
                affect impartiality and helping ensure that accreditation activities remain objective and independent.
              </p>
              <span className="ax-card-rule" aria-hidden="true" />
            </article>
            <div className="ax-blue-grid two">
              {SAFEGUARDS.map((s, i) => (
                <NavyCard key={s.title} icon={s.icon} no={String(i + 1).padStart(2, "0")} title={s.title}>
                  <p>{s.text}</p>
                </NavyCard>
              ))}
            </div>
          </div>
          <p className="ax-note reveal imp-note">
            <Glyph name="shield-check" size={22} className="imp-note-ico" />
            <span>
              <strong>Impartiality is protected through both governance and operational controls.</strong>
              These safeguards work together to support fair, consistent, and credible accreditation activities.
            </span>
          </p>
        </div>
      </section>

      {/* 04 — Confidentiality & information protection */}
      <section className="ax-section" id="confidentiality-information-protection">
        <div className="container">
          <SectionHead
            center
            eyebrow="Confidentiality"
            title="Protecting Information Entrusted to AAA"
            intro="Accreditation activities may require organizations to share operational, technical, commercial, and organizational information. AAA is committed to handling this information responsibly and protecting its confidentiality throughout the accreditation process."
          />
          <div className="imp-conf">
            <aside className="imp-conf-panel reveal">
              <span className="imp-conf-ico" aria-hidden="true">
                <Glyph name="lock" />
              </span>
              <p>
                Information received through accreditation activities is handled with care and accessed only as needed
                for legitimate accreditation purposes.
              </p>
              <span className="imp-conf-foot">Confidentiality</span>
            </aside>
            <div className="ax-blue-grid two">
              {CONFIDENTIALITY.map((c, i) => (
                <NavyCard key={c.title} icon={c.icon} no={String(i + 1).padStart(2, "0")} title={c.title}>
                  <p>{c.text}</p>
                </NavyCard>
              ))}
            </div>
          </div>
          <p className="ax-note gold reveal imp-note">
            <Glyph name="file-text" size={22} className="imp-note-ico" />
            <span>
              <strong>Where disclosure is required by law or other binding obligations,</strong>
              AAA will handle such disclosure in accordance with the applicable requirements.
            </span>
          </p>
        </div>
      </section>

      {/* 05 — Complaints & appeals */}
      <section className="ax-section cream" id="complaints-appeals">
        <div className="container">
          <SectionHead
            center
            eyebrow="Accountability"
            title="A Clear Process for Concerns and Appeals"
            intro="AAA maintains defined processes for handling complaints and appeals to support fairness, transparency, and accountability in its accreditation activities."
          />
          <div className="ax-blue-grid two imp-ca">
            <NavyCard icon="message" no="01" title="Complaints" href="/contact" cta="Submit a Complaint">
              <p>
                Complaints provide a formal way to raise concerns about AAA services, conduct, accreditation activities,
                or other matters that require review.
              </p>
              <p>
                Complaints are reviewed through an established process designed to ensure concerns are considered
                objectively and addressed appropriately.
              </p>
            </NavyCard>
            <NavyCard icon="refresh" no="02" title="Appeals" href="/contact" cta="Submit an Appeal">
              <p>
                Appeals provide a structured mechanism for organizations seeking formal reconsideration of an
                accreditation decision.
              </p>
              <p>
                Appeal requests are reviewed in accordance with the applicable procedure and are handled in a manner
                intended to support fairness and independence.
              </p>
            </NavyCard>
          </div>
          <div className="imp-ca-foot reveal">
            <p>
              <Glyph name="scale" size={20} className="imp-note-ico" />
              <span>
                <strong>Protecting impartiality in review.</strong> Complaints and appeals are handled in a manner
                intended to ensure that those involved in reviewing the matter are appropriately independent from the
                issue being considered.
              </span>
            </p>
            <Link href="/contact" className="ax-btn ax-btn-blue">
              View Complaints &amp; Appeals Procedure <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* 06 — Final CTA */}
      <CTA
        eyebrow="Questions or Concerns?"
        title="We're Here to Help"
        text="If you have questions about AAA's impartiality, confidentiality, complaints, appeals, or accreditation processes, our team can provide guidance and direct you to the appropriate information or procedure."
        primary={{ href: "/contact", label: "Contact AAA" }}
        secondary={{ href: "/impartiality-policy#complaints-appeals", label: "View Complaints & Appeals" }}
      />
    </div>
  );
}
