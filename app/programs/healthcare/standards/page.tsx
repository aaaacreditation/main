import Link from "next/link";
import CTA from "../../../_components/CTA";
import JsonLd from "../../../_components/JsonLd";
import PageHero from "../../../_components/PageHero";
import NavyCard from "../../../_components/site/NavyCard";
import SectionHead from "../../../_components/site/SectionHead";
import Glyph, { type GlyphName } from "../../../_components/site/Glyph";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";
import "./standards.css";

/*
 * AAA Healthcare Accreditation Standards — rebuilt Oct 2026 from the client's
 * healthcare-accreditation-standards.html: overview → 12 chapter titles
 * (Patient-Centered 01–06 / Organization-Centered 07–12) → 10-step
 * development journey + stakeholder feedback → final CTA. Per the README,
 * the chapters and development process live only on this page.
 */

const SELF = "/programs/healthcare/standards";
const EMAIL = "healthcare@aaa-accreditation.org";

export const metadata = pageMeta({
  title: "AAA Healthcare Accreditation Standards (12 Chapters)",
  description:
    "Explore AAA's ISQua EEA accredited healthcare standards: 12 chapters across patient-centered care and organizational systems, built through a 10-step process.",
  path: SELF,
  keywords: [
    "healthcare accreditation standards",
    "AAA healthcare standards",
    "patient-centered care standards",
    "ISQua EEA accredited standards",
    "healthcare standards development",
  ],
});

type Item = { icon: GlyphName; title: string };

const PATIENT: Item[] = [
  { icon: "lock", title: "Patient Privacy, Rights & Responsibilities" },
  { icon: "route", title: "Access, Assessment & Continuity of Care" },
  { icon: "stethoscope", title: "Provision of Care" },
  { icon: "pill", title: "Medication Management & Use" },
  { icon: "heart-pulse", title: "Surgical & Anaesthesia Care" },
  { icon: "microscope", title: "Diagnostic Services & Procedures" },
];

const ORGANIZATION: Item[] = [
  { icon: "landmark", title: "Corporate Governance & Leadership" },
  { icon: "trending-up", title: "Quality Improvement & Sustainability" },
  { icon: "users", title: "Staff Planning & Continuous Performance" },
  { icon: "file-text", title: "Health Record & Information Management" },
  { icon: "shield", title: "Infection Control & Hand Hygiene Practice" },
  { icon: "building", title: "Facility Safety & Physical Environment" },
];

const DEVELOPMENT: Item[] = [
  { icon: "search", title: "Identify Healthcare Needs & Priorities" },
  { icon: "globe", title: "Research & Benchmark Best Practices" },
  { icon: "users", title: "Form Technical Committees & Experts" },
  { icon: "file-text", title: "Develop Draft Standards" },
  { icon: "message", title: "Stakeholder Consultation & Review" },
  { icon: "user-check", title: "External Expert Feedback" },
  { icon: "hospital", title: "Field Testing in Healthcare Settings" },
  { icon: "clipboard-check", title: "Pilot Surveys & Usability Review" },
  { icon: "chart", title: "Validation, Analysis & Refinement" },
  { icon: "badge-check", title: "Final Approval" },
];

const pad = (n: number) => String(n).padStart(2, "0");

function ChapterPanel({
  icon,
  title,
  range,
  items,
  offset,
}: {
  icon: GlyphName;
  title: string;
  range: string;
  items: Item[];
  offset: number;
}) {
  return (
    <div className="hcs-panel">
      <div className="hcs-panel-head reveal">
        <span className="hcs-panel-ico">
          <Glyph name={icon} />
        </span>
        <div>
          <span className="hcs-panel-range">{range}</span>
          <h3>{title}</h3>
        </div>
      </div>
      <ol className="hcs-chapters">
        {items.map((c, i) => (
          <li key={c.title}>
            <NavyCard compact icon={c.icon} no={pad(offset + i + 1)} title={c.title} />
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HealthcareStandardsPage() {
  return (
    <div className="axp hcs">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Programs", path: "/programs" },
          { name: "Healthcare Accreditation", path: "/programs/healthcare" },
          { name: "Healthcare Accreditation Standards", path: SELF },
        ])}
      />

      <PageHero
        eyebrow="AAA Healthcare Accreditation Standards"
        crumbs={[
          { href: "/programs", label: "Programs" },
          { href: "/programs/healthcare", label: "Healthcare Accreditation" },
          { label: "Standards" },
        ]}
        title={
          <>
            Standards Designed Around <span className="hcs-gold">Better Healthcare</span>
          </>
        }
        intro="AAA's healthcare accreditation standards are evidence-based criteria designed to support patient-centered care, organizational effectiveness, safety, and continual improvement across healthcare organizations."
        actions={
          <>
            <a href="#standards-framework" className="ax-btn ax-btn-gold">
              Explore the Standards <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </a>
            <a href="#standards-development" className="ax-btn ax-btn-ghost">
              How the Standards Are Developed <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </a>
          </>
        }
        meta={[
          { v: "12", k: "Standards Chapters" },
          { v: "10", k: "Development Steps" },
          { v: "ISQua EEA", k: "Accredited Standards" },
        ]}
      />

      {/* Standards framework — 12 chapters */}
      <section className="ax-section" id="standards-framework">
        <div className="container">
          <SectionHead
            center
            eyebrow="Standards Framework"
            title="12 Chapters Covering Care and the Systems Behind It"
            intro="The framework combines patient-centered requirements with organization-centered standards, helping healthcare organizations address both the delivery of care and the systems that support it."
          />
          <div className="hcs-framework">
            <ChapterPanel icon="heart-pulse" title="Patient-Centered Care" range="Chapters 01–06" items={PATIENT} offset={0} />
            <ChapterPanel
              icon="building"
              title="Organization-Centered Standards"
              range="Chapters 07–12"
              items={ORGANIZATION}
              offset={6}
            />
          </div>
        </div>
      </section>

      {/* Standards development — 10 steps */}
      <section className="ax-section cream" id="standards-development">
        <div className="container">
          <SectionHead
            center
            eyebrow="Standards Development"
            title="A Transparent, Systematic Development Journey"
            intro="AAA follows a structured 10-step development process designed to keep healthcare standards evidence-based, internationally benchmarked, practical, and responsive to stakeholder needs."
          />
          <ol className="hcs-dev">
            {DEVELOPMENT.map((s, i) => (
              <li key={s.title}>
                <NavyCard compact icon={s.icon} no={pad(i + 1)} title={s.title} />
              </li>
            ))}
          </ol>

          <div className="ax-card navy ax-blue reveal hcs-feedback">
            <span className="ax-card-ico">
              <Glyph name="message" />
            </span>
            <div className="hcs-feedback-copy">
              <h3>Stakeholder Feedback Is Part of the Process</h3>
              <p>
                AAA welcomes healthcare stakeholders and interested parties to contribute to standards development and
                provide feedback on draft standards and the accreditation standards manual.
              </p>
            </div>
            <a href={`mailto:${EMAIL}`} className="ax-btn ax-btn-gold hcs-feedback-btn">
              <Glyph name="mail" size={15} strokeWidth={2} /> {EMAIL}
            </a>
          </div>

          <p className="hcs-back reveal">
            <Link href="/programs/healthcare">
              <Glyph name="arrow-right" size={14} strokeWidth={2} /> Back to Healthcare Accreditation
            </Link>
          </p>
        </div>
      </section>

      <CTA
        eyebrow="Healthcare Accreditation"
        title="Ready to Learn More About AAA Healthcare Accreditation?"
        text="Explore the healthcare accreditation program or contact our team to discuss the standards and the accreditation pathway for your organization."
        primary={{ href: "/programs/healthcare", label: "Explore Healthcare Accreditation" }}
        secondary={{ href: "/contact", label: "Contact AAA" }}
      />
    </div>
  );
}
