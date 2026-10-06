import Image from "next/image";
import Link from "next/link";
import JsonLd from "../../_components/JsonLd";
import PageHero from "../../_components/PageHero";
import NavyCard from "../../_components/site/NavyCard";
import SectionHead from "../../_components/site/SectionHead";
import Glyph, { type GlyphName } from "../../_components/site/Glyph";
import { FACTS } from "@/lib/facts";
import { breadcrumbSchema, pageMeta, serviceSchema } from "@/lib/seo";
import HcVideo from "./HcVideo";
import HcTestimonials, { type Testimonial } from "./HcTestimonials";
import "./healthcare.css";

/*
 * Healthcare Accreditation — rebuilt Oct 2026 on the client's final
 * "Healthcare Accreditation" package (README.txt, latest revisions win):
 * 01 Hero → 02 Why (video left + 2×3 benefits) → 03 Eligibility (10 tiles,
 * two rows of five, no photo) → 04 ISQua EEA recognition → 04b Team →
 * 05 What We Evaluate (two core areas only; chapters live on /standards) →
 * 06 Four-stage journey → 07 Video testimonials → 08 Final CTA.
 */

const PATH = "/programs/healthcare";
const IMG = "/images/site/healthcare";
const DESCRIPTION =
  "Independent healthcare accreditation for hospitals, clinics, dental, diagnostic and specialized facilities, built on ISQua EEA accredited standards.";

export const metadata = pageMeta({
  title: "Healthcare Accreditation for Hospitals & Clinics",
  description: DESCRIPTION,
  path: PATH,
  keywords: [
    "healthcare accreditation",
    "hospital accreditation",
    "clinic accreditation",
    "ISQua EEA accredited standards",
    "AAA healthcare accreditation",
    "patient safety accreditation",
  ],
});

const BENEFITS: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "shield-check",
    title: "Safer, Higher-Quality Care",
    text: "Strengthen systems and practices that support patient safety, quality of care, and consistent service delivery.",
  },
  {
    icon: "heart-pulse",
    title: "Greater Patient Confidence",
    text: "Demonstrate that your organization has undergone an independent assessment against defined healthcare accreditation standards.",
  },
  {
    icon: "gauge",
    title: "Stronger Organizational Performance",
    text: "Identify gaps, improve processes, strengthen accountability, and promote greater consistency across the organization.",
  },
  {
    icon: "refresh",
    title: "A Culture of Continual Improvement",
    text: "Encourage teams to monitor performance, address weaknesses, and sustain improvements beyond the accreditation assessment.",
  },
  {
    icon: "award",
    title: "Stronger Reputation & Credibility",
    text: "Demonstrate a visible commitment to quality that can strengthen confidence among patients, healthcare professionals, partners, and other stakeholders.",
  },
  {
    icon: "trending-up",
    title: "Competitive & Growth Opportunities",
    text: "Strengthen your organization's position in the healthcare market and support opportunities to attract patients, build partnerships, and engage with organizations that value independently assessed quality.",
  },
];

const ELIGIBLE: { icon: GlyphName; title: string }[] = [
  { icon: "hospital", title: "Hospitals" },
  { icon: "stethoscope", title: "Clinics & Medical Centers" },
  { icon: "sparkles", title: "Dental Organizations" },
  { icon: "activity", title: "Rehabilitation Centers" },
  { icon: "target", title: "Specialized Healthcare Facilities" },
  { icon: "microscope", title: "Diagnostic & Treatment Centers" },
  { icon: "globe", title: "Medical Tourism" },
  { icon: "clock", title: "Day Care & Ambulatory" },
  { icon: "leaf", title: "Alternative Medicine Units" },
  { icon: "plus", title: "Other Healthcare Organizations" },
];

const WHY_AAA: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "badge-check",
    title: "Internationally Accredited Healthcare Standards",
    text: "Healthcare standards independently accredited by ISQua EEA.",
  },
  {
    icon: "scale",
    title: "Independent Accreditation",
    text: "Structured assessment and independent accreditation decision-making.",
  },
  {
    icon: "stethoscope",
    title: "Healthcare Expertise",
    text: "Assessments supported by qualified healthcare assessors and technical experts.",
  },
  {
    icon: "route",
    title: "A Structured Path to Accreditation",
    text: "Clear preparation, assessment, corrective-action, decision, and ongoing accreditation stages.",
  },
];

const TEAM: { name: string; role: string; photo: string; bio: string }[] = [
  {
    name: "Dr. Ruhina Khan",
    role: "Business Development Manager – Healthcare Accreditation",
    photo: `${IMG}/team-ruhina.webp`,
    bio: "Dr. Ruhina Khan is a healthcare operations strategist and accreditation expert dedicated to advancing international quality standards. She works closely with healthcare institutions to strengthen compliance, optimize systems, and build globally recognized credibility through structured, sustainable growth strategies.",
  },
  {
    name: "Willena McGee",
    role: "Board Member",
    photo: `${IMG}/team-willena.webp`,
    bio: "Willena is an AAA board member and Founder and CEO of Uplifted Abilities. With over 20 years of experience in healthcare, project management, education, and consulting services, she guides new and existing Non-Emergency Medical Transportation (NEMT) providers through accreditation, regulatory compliance, and business planning.",
  },
  {
    name: "Antonia Vitori",
    role: "Healthcare Accreditation Surveyor",
    photo: `${IMG}/team-antonia.jpeg`,
    bio: "Antonia brings many years of experience in the healthcare compliance sector and currently serves as an AAA Healthcare Accreditation Surveyor. She graduated from the Royal College of Surgeons in Ireland and is the Chief Governance, Risk and Compliance Officer at Brookhaven Healthcare Ireland. She previously held the position of Compliance, Quality and Safety Manager at Cowper Care Ireland.",
  },
  {
    name: "Dr. Rodolfo Buccico",
    role: "Accreditation Advisor",
    photo: `${IMG}/team-rodolfo.png`,
    bio: "Dr. Rodolfo Buccico is a seasoned medical and public health professional with extensive expertise in preventive medicine, epidemiology, and healthcare management. He currently serves as a Chief Medical Officer and advisor, bringing deep experience in public health strategy, real-world evidence, and patient-centred care. With a background in hygiene and preventive medicine from the Università Federico II di Napoli, he has held leadership roles including director of clinical services and senior healthcare administration.",
  },
];

const STAGES: { icon: GlyphName; title: string; text: string; badge?: string }[] = [
  {
    icon: "clipboard",
    title: "Preparation",
    text: "Review the standards, identify gaps, and prepare your organization for assessment.",
  },
  {
    icon: "file-check",
    title: "Document Review",
    text: "Submit the required documentation and supporting evidence for review.",
  },
  {
    icon: "search-check",
    title: "Onsite / Hybrid Survey",
    text: "Healthcare surveyors evaluate implementation of the applicable standards.",
    badge: "Typically 2–5 Days",
  },
  {
    icon: "gavel",
    title: "Accreditation Decision",
    text: "Assessment results undergo independent review and an accreditation decision is made.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    org: "Global Medical City",
    country: "Egypt",
    theme: "Patient Safety & Trust",
    quote:
      "“AAA accreditation helps ensure patient safety and supports patients in receiving the best possible medical care.”",
    note: "Translated from Arabic",
    video: "AZd-Wi2o5UI",
    image: `${IMG}/testimonial-gmc.webp`,
    alt: "Global Medical City healthcare accreditation testimonial",
  },
  {
    org: "Domus Salutis",
    country: "Italy",
    theme: "Consistency & Quality",
    quote:
      "“Accreditation means greater safety in procedures and protocols, and greater confidence that staff follow patients using consistent methods.”",
    note: "Translated from Italian",
    video: "SxgILo3vjGU",
    image: `${IMG}/testimonial-domus.webp`,
    alt: "Domus Salutis healthcare accreditation testimonial",
  },
  {
    org: "Dr. Paul’s",
    country: "India",
    theme: "Systems & Organizational Improvement",
    quote:
      "“The accreditation journey has been a structured and valuable process that helped us strengthen our systems, documentation, patient safety practices and overall operational experience.”",
    video: "zpzh6QtLdSI",
    image: `${IMG}/testimonial-dr-paul.webp`,
    alt: "Dr. Paul’s healthcare accreditation testimonial",
  },
];

const arrow = <Glyph name="arrow-right" size={14} strokeWidth={2} />;

export default function HealthcarePage() {
  return (
    <div className="axp hcx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Programs", path: "/programs" },
            { name: "Healthcare Accreditation", path: PATH },
          ]),
          serviceSchema({
            name: "AAA Healthcare Accreditation",
            description: DESCRIPTION,
            path: PATH,
            standard: "AAA Accreditation Standards for Healthcare Facilities",
            audience: "Healthcare organizations",
          }),
        ]}
      />

      {/* 01 — Hero */}
      <PageHero
        eyebrow="Healthcare Accreditation"
        crumbs={[{ href: "/programs", label: "Programs" }, { label: "Healthcare Accreditation" }]}
        title={
          <>
            Healthcare Accreditation
            <span className="hcx-h1-sub">
              Accreditation for Safer Care, Stronger Performance and Global Recognition
            </span>
          </>
        }
        intro="The American Accreditation Association provides independent healthcare accreditation designed to help healthcare organizations demonstrate quality, strengthen systems, and build confidence among patients, partners, and stakeholders."
        image={`${IMG}/military-hospital-healthcare-accreditation.jpg`}
        imageAlt="Healthcare team at an accredited military hospital holding an accreditation certificate"
        caption={{ kicker: "ISQua EEA Accredited Standards", title: "Accreditation Standards for Healthcare Facilities" }}
        actions={
          <>
            <Link href="/apply" className="ax-btn ax-btn-gold">
              Apply for Accreditation {arrow}
            </Link>
            <Link href="/contact" className="ax-btn ax-btn-ghost">
              Talk to a Healthcare Accreditation Expert {arrow}
            </Link>
            <ul className="hcx-chips" aria-label="What defines AAA healthcare accreditation">
              <li>Independent Accreditation</li>
              <li>Healthcare-Focused Standards</li>
              <li>International Recognition</li>
            </ul>
          </>
        }
      />

      {/* 02 — Why healthcare accreditation */}
      <section className="ax-section" id="why-healthcare-accreditation">
        <div className="container">
          <SectionHead
            center
            className="hcx-oneline"
            eyebrow="Why Healthcare Accreditation"
            title="Better Care. Stronger Performance. Greater Confidence."
            intro="Healthcare accreditation provides an independent framework for strengthening quality, patient safety, and organizational performance while demonstrating a clear commitment to continual improvement."
          />
          <div className="hcx-why">
            <div className="hcx-why-media reveal">
              <HcVideo id="CvsM6YXA2JQ" title="AAA Healthcare Accreditation Explained" label="AAA Healthcare Accreditation Explained" />
              <p className="hcx-why-quote">
                <Glyph name="quote" size={22} />
                <span>
                  Accreditation turns a commitment to quality into something patients, partners, and stakeholders can see
                  and trust.
                </span>
              </p>
            </div>
            <div className="ax-blue-grid two hcx-why-grid">
              {BENEFITS.map((b) => (
                <NavyCard key={b.title} compact icon={b.icon} title={b.title}>
                  <p>{b.text}</p>
                </NavyCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Eligible healthcare organizations */}
      <section className="ax-section cream" id="who-can-apply">
        <div className="container">
          <SectionHead
            center
            className="hcx-oneline"
            eyebrow="Eligible Healthcare Organizations"
            title="One Accreditation Framework. Diverse Healthcare Settings."
            intro="AAA Healthcare Accreditation is designed for a wide range of healthcare organizations across different sizes, specialties, and care settings."
          />
          <div className="ax-blue-grid five hcx-elig">
            {ELIGIBLE.map((e) => (
              <NavyCard key={e.title} compact icon={e.icon} title={e.title} />
            ))}
          </div>
          <p className="hcx-elig-contact reveal">
            Not sure if your organization is eligible?{" "}
            <Link href="/contact">
              Contact our healthcare team <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* 04 — International recognition / ISQua EEA */}
      <section className="ax-section" id="international-recognition">
        <div className="container">
          <SectionHead
            center
            eyebrow="International Recognition"
            title="Healthcare Standards Accredited by ISQua EEA"
            intro="AAA's Accreditation Standards for Healthcare Facilities have been accredited by the International Society for Quality in Health Care External Evaluation Association (ISQua EEA), following independent external evaluation against internationally recognized principles for the development of health and social care standards."
          />

          <div className="hcx-recog reveal">
            <div className="hcx-recog-main ax-card navy ax-blue">
              <div className="hcx-recog-mark">
                <span className="hcx-plate">
                  <Image
                    src={`${IMG}/isqua-eea-accredited-standards-2025-2029.png`}
                    alt="ISQua EEA Accredited Standards 2025-2029"
                    width={241}
                    height={67}
                  />
                </span>
                <div>
                  <span className="ax-blue-tag">ISQua EEA Accredited Standards</span>
                  <h3>Accreditation Standards for Healthcare Facilities</h3>
                  <span className="hcx-recog-dates">
                    <Glyph name="calendar" size={15} /> Recognition period: May 2025 – May 2029
                  </span>
                </div>
              </div>
              <p className="hcx-recog-text">
                The recognition applies specifically to AAA&apos;s Accreditation Standards for Healthcare Facilities and
                reflects independent external evaluation of the standards.
              </p>
              <ul className="hcx-recog-checks">
                <li>Independent external evaluation of AAA&apos;s healthcare accreditation standards</li>
                <li>Alignment with internationally recognized principles for health and social care standards</li>
              </ul>
            </div>

            <figure className="hcx-cert">
              <div className="hcx-cert-frame">
                <Image
                  src={`${IMG}/isqua-eea-standards-certificate.webp`}
                  alt="ISQua EEA certificate for AAA healthcare accreditation standards"
                  width={1488}
                  height={2105}
                  sizes="(max-width: 980px) 80vw, 340px"
                />
              </div>
              <a
                href="/docs/site/isqua-eea-standards-certificate-5th-ed.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ax-btn ax-btn-blue"
              >
                View Recognition Certificate <Glyph name="arrow-up-right" size={14} strokeWidth={2} />
              </a>
            </figure>
          </div>

          <h3 className="hcx-subhead reveal">Why AAA Healthcare Accreditation?</h3>
          <div className="ax-blue-grid four">
            {WHY_AAA.map((w, i) => (
              <NavyCard key={w.title} icon={w.icon} no={String(i + 1).padStart(2, "0")} title={w.title}>
                <p>{w.text}</p>
              </NavyCard>
            ))}
          </div>

          <p className="ax-note reveal hcx-recog-note">
            ISQua EEA accreditation applies specifically to AAA&apos;s Accreditation Standards for Healthcare Facilities and
            should not be interpreted as accreditation or endorsement of every AAA program or activity.
          </p>
        </div>
      </section>

      {/* 04b — Meet our healthcare accreditation team */}
      <section className="ax-section cream" id="healthcare-team">
        <div className="container">
          <SectionHead
            center
            eyebrow="Meet Our Team"
            title="Meet Our Healthcare Accreditation Team"
            intro="Healthcare, accreditation, governance, and quality expertise supporting our healthcare accreditation program."
          />
          <div className="hcx-team">
            {TEAM.map((m) => (
              <article key={m.name} className="ax-card navy ax-blue reveal hcx-member">
                <span className="hcx-portrait">
                  <Image src={m.photo} alt={m.name} fill sizes="112px" />
                </span>
                <h3>{m.name}</h3>
                <span className="ax-blue-kicker">{m.role}</span>
                <details className="hcx-bio">
                  <summary>
                    View Profile <Glyph name="plus" size={14} strokeWidth={2} />
                  </summary>
                  <p>{m.bio}</p>
                </details>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — What we evaluate */}
      <section className="ax-section" id="what-we-evaluate">
        <div className="container hcx-eval">
          <div className="hcx-eval-copy">
            <SectionHead
              eyebrow="What We Evaluate"
              title="A Comprehensive Framework for Healthcare Quality Standards"
              intro="AAA healthcare accreditation evaluates both the experience and delivery of patient care and the organizational systems that support safe, effective, and consistent healthcare services."
            />
            <div className="ax-actions reveal">
              <Link href="/programs/healthcare/standards" className="ax-btn ax-btn-blue">
                Explore the Healthcare Accreditation Standards {arrow}
              </Link>
            </div>
          </div>
          <div className="hcx-eval-cards">
            <NavyCard icon="heart-pulse" title="Patient-Centered Care">
              <p>
                Focuses on how care is accessed, delivered, coordinated, and experienced by patients, with emphasis on
                safety, rights, continuity, and quality of clinical care.
              </p>
            </NavyCard>
            <span className="hcx-eval-plus" aria-hidden="true">
              <Glyph name="plus" size={18} strokeWidth={2.2} />
            </span>
            <NavyCard icon="building" title="Organization-Centered Standards">
              <p>
                Focuses on the leadership, workforce, quality, information, infection prevention, safety, and operational
                systems that support reliable healthcare delivery.
              </p>
            </NavyCard>
          </div>
        </div>
      </section>

      {/* 06 — Accreditation journey */}
      <section className="ax-section cream" id="accreditation-journey">
        <div className="container">
          <SectionHead
            center
            eyebrow="Our Accreditation Process"
            title="A Clear and Transparent Process"
            intro="Our structured process ensures a fair, consistent, and internationally benchmarked assessment."
          />
          <div className="hcx-journey">
            <ol className="hcx-stages">
              {STAGES.map((s, i) => (
                <li key={s.title}>
                  <NavyCard compact icon={s.icon} no={String(i + 1).padStart(2, "0")} title={s.title}>
                    <p>{s.text}</p>
                    {s.badge && (
                      <span className="hcx-badge">
                        <Glyph name="clock" size={13} strokeWidth={2} /> {s.badge}
                      </span>
                    )}
                  </NavyCard>
                </li>
              ))}
            </ol>

            <div className="ax-card navy ax-blue reveal hcx-outcome">
              <span className="hcx-outcome-kicker">Successful Completion</span>
              <span className="ax-card-ico hcx-outcome-ico">
                <Glyph name="award" />
              </span>
              <h3>AAA Healthcare Accreditation</h3>
              <strong className="hcx-outcome-valid">{`Valid for ${FACTS.cycleYears} Years`}</strong>
              <p className="hcx-cycle" aria-label="Maintain, Improve, Renew">
                <span>Maintain</span>
                <i aria-hidden="true">→</i>
                <span>Improve</span>
                <i aria-hidden="true">→</i>
                <span>Renew</span>
              </p>
              <div className="hcx-periodic">
                <span className="ps-title">
                  <Glyph name="calendar" size={14} strokeWidth={2} /> 18-Month Periodic Survey
                </span>
                <span className="ps-text">Confirms continued conformity during the accreditation cycle.</span>
              </div>
            </div>
          </div>
          <div className="ax-actions center reveal">
            <Link href="/programs/healthcare/process" className="ax-btn ax-btn-ghost-navy">
              View the Full Accreditation Process {arrow}
            </Link>
          </div>
        </div>
      </section>

      {/* 07 — Accreditation in practice */}
      <section className="ax-section" id="accreditation-in-practice">
        <div className="container">
          <SectionHead
            center
            eyebrow="Accreditation in Practice"
            title="Hear From AAA-Accredited Healthcare Organizations"
            intro="Healthcare organizations across different countries share how AAA accreditation has supported patient safety, stronger systems, consistent practices, and greater confidence."
          />
          <HcTestimonials items={TESTIMONIALS} />
          <p className="hcx-testi-foot reveal">
            <strong>Real Healthcare Organizations. Real Accreditation Experiences.</strong>
            <span>Egypt • Italy • India</span>
          </p>
        </div>
      </section>

      {/* 08 — Final CTA */}
      <section className="ax-close" id="final-cta">
        <span className="ax-close-corner" aria-hidden="true" />
        <div className="container">
          <div className="ax-close-inner reveal">
            <span className="eyebrow">Ready to Get Started?</span>
            <h2>Start Your Healthcare Accreditation Journey</h2>
            <p>
              Take the next step toward demonstrating your commitment to quality, patient safety, and stronger
              organizational performance through AAA Healthcare Accreditation.
            </p>
            <div className="ax-close-actions">
              <Link href="/apply" className="ax-btn ax-btn-gold">
                Apply for Accreditation {arrow}
              </Link>
              <Link href="/contact" className="ax-btn ax-btn-ghost">
                Talk to a Healthcare Accreditation Expert {arrow}
              </Link>
            </div>
            <p className="hcx-reassure">
              Our healthcare accreditation team can help you understand the application requirements, accreditation
              scope, and next steps for your organization.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
