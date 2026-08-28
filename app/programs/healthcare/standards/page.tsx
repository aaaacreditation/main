import Image from "next/image";
import Link from "next/link";
import CTA from "../../../_components/CTA";
import JsonLd from "../../../_components/JsonLd";
import PageHero from "../../../_components/PageHero";
import { breadcrumbSchema, faqSchema, pageMeta } from "../../../../lib/seo";
import {
  ArrowIcon,
  ClusterNav,
  DownloadIcon,
  HC_APPLICATION_FORM,
  HC_EMAIL,
  LineIcon,
  hcRelated,
} from "../cluster";
import "../hc.css";

const SELF = "/programs/healthcare/standards";

export const metadata = pageMeta({
  title: "AAA Healthcare Accreditation Standards (12 Chapters)",
  description:
    "The AAA Accreditation Standards for Healthcare Facilities: twelve evidence-based chapters across patient centered and organization centered care.",
  path: SELF,
  keywords: [
    "healthcare accreditation standards",
    "AAA accreditation standards",
    "patient centered care standards",
    "ISQua accredited standards",
  ],
});

type Chapter = { n: number; title: string; text: string };

const PATIENT_CHAPTERS: Chapter[] = [
  {
    n: 1,
    title: "Patient privacy, rights & responsibilities",
    text: "Excellent care requires an individualized assessment of each patient's values, needs and beliefs. Patients must be informed and educated about their care, and the bill of rights made publicly available. The chapter also covers patient experience and satisfaction measurement, complaints management and the handling of patients' belongings.",
  },
  {
    n: 2,
    title: "Access, assessment & continuity of care",
    text: "The key components and requirements for ensuring patient access, comprehensive assessment and continuity of care across the whole care continuum — the framework for delivering coordinated, patient-centered services that achieve optimal health outcomes.",
  },
  {
    n: 3,
    title: "Provision of care",
    text: "Safe and effective care through clear communication, collaboration and standardized processes tailored to each patient. Special attention is given to high-risk areas such as resuscitation, blood administration and transplantation, to populations with unique needs, and to minimizing risks from clinical alarms.",
  },
  {
    n: 4,
    title: "Medication management & use",
    text: "Comprehensive requirements for the safe, effective and appropriate use of medications across the continuum of care — procurement, storage, ordering and prescribing, preparation, dispensing, administration, monitoring and documentation — designed to minimize medication errors and adverse drug events.",
  },
  {
    n: 5,
    title: "Surgical and anaesthesia care",
    text: "Policies, procedures and best practice for safe surgical and anaesthesia care: preoperative assessment and preparation, operating-room safety protocols, anaesthesia administration and monitoring, postoperative handoffs and continued care, and adverse event reporting.",
  },
  {
    n: 6,
    title: "Diagnostic services and procedures",
    text: "A framework ensuring laboratory tests, imaging and other diagnostic procedures meet the highest levels of quality and consistency, with clear guidelines for performance, competence and continual improvement — protecting the safety of both patients and staff.",
  },
];

const ORG_CHAPTERS: Chapter[] = [
  {
    n: 7,
    title: "Corporate governance & leadership",
    text: "Integrated and effective leadership with a clear, visible chain of command and communication. The organization develops its mission, vision and goals and makes them publicly available, complies with applicable laws and regulations, and manages barriers and communication problems between departments and services.",
  },
  {
    n: 8,
    title: "Quality improvement & sustainability",
    text: "A dedicated champion overseeing quality initiatives, and a quality and patient safety plan covering data aggregation and analysis, measure selection, monitoring of medication errors and adverse events, antibiotic stewardship, patient feedback, staff training, cost-effective care and a risk management framework.",
  },
  {
    n: 9,
    title: "Staff planning & continuous performance",
    text: "Optimal staffing and skill mix, job descriptions, confidential personnel files, orientation for clinical and non-clinical staff, continuous education, a staff health and safety programme, vaccination of at-risk providers, uniform credentialing and privileging, staff feedback, and regular performance and competency evaluation.",
  },
  {
    n: 10,
    title: "Health record & information management",
    text: "Accurate and secure documentation across all care settings — data security and protection, patient confidentiality on paper or in electronic systems, secure communication protocols during crises, standardized abbreviations and codes, and compliance with national laws on storage and retention of records.",
  },
  {
    n: 11,
    title: "Infection control & hand hygiene practice",
    text: "An infection prevention and control programme that identifies and minimizes the risk of acquiring and transmitting infection among patients, relatives, practitioners, support staff, students and visitors — including proactive environment surveillance, staff education, safe food preparation and safe laundry handling.",
  },
  {
    n: 12,
    title: "Facility safety & physical environment",
    text: "Effective management of the physical building, medical and non-medical equipment and people, through multidisciplinary planning, education, execution and monitoring — including risk management, the infection control programme, disaster management and recovery, utilities management and regulatory compliance.",
  },
];

const JOURNEY: { title: string; text: string }[] = [
  { title: "Identify needs", text: "Healthcare needs and priorities are identified as the starting point for any new or revised standard." },
  { title: "Research & benchmark", text: "Research and benchmarking against national and international best practice." },
  { title: "Technical committee formation", text: "Technical committees and subject matter experts are convened." },
  { title: "Develop standards", text: "The draft standards are written by the committees and experts." },
  { title: "Stakeholder consultation", text: "Drafts are shared with stakeholders for consultation, review and feedback." },
  { title: "External expert review", text: "External experts review the drafts to ensure relevance and applicability." },
  { title: "Field testing", text: "Standards are tested in real healthcare settings for clarity and feasibility." },
  { title: "Pilot survey", text: "Pilot surveys evaluate usability and effectiveness in practice." },
  { title: "Validation & analysis", text: "All feedback and pilot findings are validated and analysed." },
  { title: "Approval", text: "The standards are refined, finalized and submitted for approval." },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What are AAA accreditation standards?",
    a: "AAA's accreditation standards are a set of evidence-based criteria that healthcare organizations must meet to achieve and maintain accreditation. They are recognized internationally, accredited by the International Society for Quality in Health Care (ISQua), and developed by industry experts, healthcare professionals and stakeholders to reflect best practice in patient care, operational efficiency and organizational leadership.",
  },
  {
    q: "How many chapters are there, and how are they organised?",
    a: "There are twelve chapters in two sections: Patient Centered Care (chapters 1–6) and Organization Centered Standards (chapters 7–12).",
  },
  {
    q: "How are the standards developed?",
    a: "Through a transparent, systematic ten-step journey: identify needs, research and benchmark, form technical committees, develop standards, stakeholder consultation, external expert review, field testing, pilot survey, validation and analysis, and approval.",
  },
  {
    q: "Can we review and comment on draft standards?",
    a: "Yes. Interested parties are welcome to contribute. Email healthcare@aaa-accreditation.org to request a copy of the relevant draft standards, and it will be shared for consultation and comments.",
  },
  {
    q: "How does AAA handle feedback on the standards?",
    a: "AAA implemented a standardized mechanism to ensure feedback on healthcare accreditation standards is gathered, analysed and used for continuous improvement, under its Accreditation Standards Feedback Policy (Document No. P-HEC-10-V1). The analysis tracks KPIs such as frequency of feedback on specific standards and number of requests for clarification on terminology.",
  },
];

function ChapterGrid({ chapters }: { chapters: Chapter[] }) {
  return (
    <div className="ax-grid three">
      {chapters.map((c, i) => (
        <article className="ax-card reveal" key={c.n} style={{ transitionDelay: `${i * 45}ms` }}>
          <div className="ax-card-top">
            <span className="ax-ico ax-card-ico light" aria-hidden="true">
              <LineIcon>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </LineIcon>
            </span>
            <span className="ax-card-no" aria-hidden="true">
              {String(c.n).padStart(2, "0")}
            </span>
          </div>
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          <span className="ax-card-rule" aria-hidden="true" />
        </article>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <main className="axp hcx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Healthcare Accreditation", path: "/programs/healthcare" },
            { name: "Accreditation Standards", path: SELF },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <PageHero
        image="/programs/healthcare/standards-manual.jpg"
        eyebrow="Accreditation Standards"
        badge="Standards · Healthcare facilities"
        title={
          <>
            Twelve chapters. One <em>standard of care.</em>
          </>
        }
        intro="At the American Accreditation Association we are committed to advancing excellence in healthcare through rigorous and comprehensive accreditation standards — designed so healthcare organizations deliver safe, high-quality care while continuously improving to meet the evolving needs of patients and communities."
        crumbs={[
          { href: "/programs/healthcare", label: "Healthcare Accreditation" },
          { label: "Accreditation Standards" },
        ]}
        caption={{
          kicker: "Accreditation Standards Manual",
          title: "For healthcare facilities · 2025 Edition",
          chip: "12 chapters",
        }}
        meta={[
          { k: "Chapters", v: "12" },
          { k: "Development steps", v: "10" },
          { k: "Accredited by", v: "ISQua" },
        ]}
      />

      {/* What are the standards */}
      <section className="ax-section">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">What are AAA accreditation standards?</span>
                <h2>Evidence-based criteria, externally validated</h2>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <p>
                AAA&apos;s accreditation standards are a set of evidence-based criteria that
                healthcare organizations must meet to achieve and maintain accreditation. They are
                recognized internationally, accredited by the International Society for Quality in
                Health Care (ISQua), and developed by industry experts, healthcare professionals and
                stakeholders to reflect best practice in patient care, operational efficiency and
                organizational leadership.
              </p>
              <p>
                They follow the best international practice and comply with ISQua&apos;s requirements
                — which is why an AAA accreditation is credible to regulators, insurers and patients
                outside the country in which it was awarded.
              </p>
              <div className="ax-actions">
                <Link
                  href="/programs/healthcare/international-recognition"
                  className="ax-btn ax-btn-ghost-navy"
                >
                  How ISQua recognition works <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="reveal">
              <div className="ax-grid two tight">
                <div className="ax-tile">
                  <span className="ax-ico ax-tile-ico" aria-hidden="true">
                    <LineIcon>
                      <path d="M19 14c1.5-1.5 2-3.5 2-5a5 5 0 0 0-9-3 5 5 0 0 0-9 3c0 1.5.5 3.5 2 5l7 7z" />
                    </LineIcon>
                  </span>
                  <b>Patient centered care</b>
                  <span>Chapters 1–6 — rights, access, provision of care, medication, surgery, diagnostics.</span>
                </div>
                <div className="ax-tile">
                  <span className="ax-ico ax-tile-ico" aria-hidden="true">
                    <LineIcon>
                      <path d="M3 21h18M5 21V7l7-4 7 4v14" />
                      <path d="M9 9h2M13 9h2M9 13h2M13 13h2M10 21v-4h4v4" />
                    </LineIcon>
                  </span>
                  <b>Organization centered</b>
                  <span>Chapters 7–12 — governance, quality, staffing, records, infection control, facilities.</span>
                </div>
              </div>
              <figure className="ax-photo wide hc-stacked-photo reveal">
                <Image
                  src="/about/assessment.jpg"
                  alt="Surveyors and clinical staff working through accreditation documentation in a hospital"
                  fill
                  sizes="(max-width: 980px) 92vw, 40vw"
                />
                <figcaption>
                  Standards are applied in the real setting, not on paper.
                  <span>Documented evidence is reviewed during the survey</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Patient centered chapters */}
      <section className="ax-section cream" id="patient-centered">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Section one · Chapters 1–6</span>
            <h2>Patient centered care</h2>
            <p>
              The six chapters that govern how care reaches the patient — from the rights they hold
              on arrival to the diagnostics that inform their treatment.
            </p>
          </div>
          <ChapterGrid chapters={PATIENT_CHAPTERS} />
        </div>
      </section>

      {/* Organization centered chapters */}
      <section className="ax-section" id="organization-centered">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Section two · Chapters 7–12</span>
            <h2>Organization centered standards</h2>
            <p>
              The six chapters that govern the organization behind the care — leadership, quality,
              people, information, infection control and the physical environment.
            </p>
          </div>
          <ChapterGrid chapters={ORG_CHAPTERS} />
        </div>
      </section>

      {/* Development journey */}
      <section className="ax-section cream" id="development">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Standard development process</span>
            <h2>The AAA standards development journey</h2>
            <p>
              A transparent and systematic ten-step process designed to ensure that all standards are
              evidence-based, internationally benchmarked, practical, and responsive to stakeholder
              needs.
            </p>
          </div>

          <div className="ax-split top">
            <div className="ax-steps-panel reveal">
              <h3>Ten steps, start to approval</h3>
              <ol className="ax-steps">
                {JOURNEY.map((s, i) => (
                  <li className="ax-step" key={s.title}>
                    <span className="ax-step-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="ax-step-body">
                      <b>{s.title}</b>
                      <span>{s.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="reveal">
              <div className="ax-head">
                <h3>How the process works in practice</h3>
                <p>
                  The process begins with identifying healthcare needs and priorities, followed by
                  research and benchmarking against national and international best practice.
                  Technical committees and subject matter experts are then formed to develop the draft
                  standards.
                </p>
              </div>
              <p className="hc-para">
                During development, drafts are shared with stakeholders and external experts for
                consultation, review and feedback to ensure relevance and applicability. The standards
                then undergo field testing and pilot surveys in real healthcare settings to evaluate
                clarity, feasibility, usability and effectiveness. Following validation and analysis of
                all feedback and pilot findings, the standards are refined, finalized and submitted for
                approval.
              </p>

              <div className="ax-note gold">
                <div>
                  <strong>Contribute to the standards</strong>
                  Interested parties are welcome to contribute. If you would like to review and give
                  feedback on draft standards, email{" "}
                  <a className="ax-link" href={`mailto:${HC_EMAIL}`}>
                    {HC_EMAIL}
                  </a>{" "}
                  and a copy of the relevant draft standards will be shared for consultation and
                  comments.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback policy */}
      <section className="ax-section navy" id="feedback">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Your feedback</span>
            <h2>Your contribution and feedback is important to us</h2>
            <p>
              AAA is committed to fostering an open and transparent feedback environment, and has
              implemented a standardized mechanism so that feedback on the healthcare accreditation
              standards is effectively gathered, analysed and used for continuous improvement.
            </p>
          </div>

          <div className="ax-grid three">
            <article className="ax-card reveal">
              <h3>A documented policy</h3>
              <p>
                Feedback is handled under the AAA Accreditation Standards Feedback Policy, Document
                No. P-HEC-10-V1.
              </p>
            </article>
            <article className="ax-card reveal" style={{ transitionDelay: "60ms" }}>
              <h3>Tracked over time</h3>
              <p>
                Analysis includes KPIs such as frequency of feedback on specific standards and the
                number of requests for clarification on terminology.
              </p>
            </article>
            <article className="ax-card reveal" style={{ transitionDelay: "120ms" }}>
              <h3>Open to everyone</h3>
              <p>
                All AAA customers and stakeholders are asked to share their experience of the
                accreditation standards manual by email.
              </p>
            </article>
          </div>

          <div className="ax-actions center">
            <a href={`mailto:${HC_EMAIL}`} className="ax-btn ax-btn-ghost">
              Email {HC_EMAIL}
            </a>
          </div>
        </div>
      </section>

      {/* Apply */}
      <section className="ax-section" id="apply">
        <div className="container">
          <div className="ax-split even">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Ready when you are</span>
                <h2>
                  Now you can apply for <em>accreditation.</em>
                </h2>
                <p>
                  Once you understand the standards, the next step is the application form. A
                  dedicated advisor is assigned from stage one, and you receive the self-assessment
                  tool to measure yourself against these twelve chapters.
                </p>
              </div>
              <div className="ax-actions">
                <a
                  href={HC_APPLICATION_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ax-btn ax-btn-gold"
                >
                  <DownloadIcon /> Download Application Form
                </a>
                <Link href="/programs/healthcare/process" className="ax-btn ax-btn-ghost-navy">
                  See the process <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="reveal">
              <ul className="ax-checks gold">
                <li>Twelve chapters across patient and organization centered care</li>
                <li>Accredited by ISQua against the 5th Edition guidelines</li>
                <li>Developed with 174 international healthcare experts</li>
                <li>Self-assessment tool issued at stage one</li>
                <li>Accreditation granted for three years</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ax-section fade-up" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions about the standards</h2>
          </div>
          <div className="ax-faq-list single">
            {FAQS.map((f, i) => (
              <details className="ax-faq-item" key={f.q} open={i === 0}>
                <summary>
                  <span>{f.q}</span>
                  <span className="ax-faq-plus" aria-hidden="true" />
                </summary>
                <div className="ax-faq-a">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ClusterNav
        current={SELF}
        cream
        eyebrow="Keep reading"
        heading="More on healthcare accreditation"
      />

      <CTA
        eyebrow="Take the next step"
        title={
          <>
            Measure your facility against the <em>standards.</em>
          </>
        }
        text="A dedicated advisor will issue the self-assessment tool, walk your team through the twelve chapters and set an action plan for implementation."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Talk to the healthcare team" }}
        related={hcRelated(SELF)}
      />
    </main>
  );
}
