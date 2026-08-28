import Image from "next/image";
import Link from "next/link";
import CTA from "../../_components/CTA";
import JsonLd from "../../_components/JsonLd";
import PageHero from "../../_components/PageHero";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";
import {
  ArrowIcon,
  ClusterNav,
  DownloadIcon,
  HC_APPLICATION_FORM,
  HC_CONSULT,
  HC_EMAIL,
  LineIcon,
} from "./cluster";
import "./hc.css";

export const metadata = pageMeta({
  title: "Healthcare Accreditation for Hospitals & Clinics",
  description:
    "ISQua EEA accredited healthcare accreditation for hospitals, clinics, dental and diagnostic facilities — four documented stages, valid for three years.",
  path: "/programs/healthcare",
  keywords: [
    "healthcare accreditation",
    "hospital accreditation",
    "ISQua EEA",
    "clinic accreditation",
    "AAA healthcare standards",
  ],
});

/* --------------------------------------------------------------- content -- */

const STANDARD_SECTIONS: { label: string; note: string; chapters: string[] }[] = [
  {
    label: "Patient centered care",
    note: "Chapters 1–6",
    chapters: [
      "Patient privacy, rights & responsibilities",
      "Access, assessment & continuity of care",
      "Provision of care",
      "Medication management & use",
      "Surgical and anaesthesia care",
      "Diagnostic services and procedures",
    ],
  },
  {
    label: "Organization centered standards",
    note: "Chapters 7–12",
    chapters: [
      "Corporate governance & leadership",
      "Quality improvement & sustainability",
      "Staff planning & continuous performance",
      "Health record & information management",
      "Infection control & hand hygiene practice",
      "Facility safety & physical environment",
    ],
  },
];

const STAGES: { title: string; text: string }[] = [
  {
    title: "Preparation",
    text: "A dedicated advisor is assigned, you receive the self-assessment tool, and an action plan is set for implementing the standards. The AAA advisory team provides training and technical support.",
  },
  {
    title: "Document review",
    text: "Finalize the self-assessment tool, submit the required documents and evidence, and AAA Surveyors review what you have sent.",
  },
  {
    title: "Onsite or hybrid survey",
    text: "AAA Surveyors conduct an onsite or hybrid survey of two to five days. The final report follows within two weeks, and the facility implements corrective actions if required.",
  },
  {
    title: "Accreditation decision",
    text: "The accreditation committee reviews the surveyors' final reports, the certificate is prepared, and accreditation is granted — valid for three years.",
  },
];

const FACILITIES: { name: string; note: string }[] = [
  { name: "Hospitals", note: "Including day-care surgery centers" },
  { name: "Primary care clinics", note: "General healthcare services" },
  { name: "Specialty clinics", note: "Including ENT and dermatology" },
  { name: "Dental organizations", note: "Single chair to multi-unit" },
  { name: "Diagnostic centers", note: "X-ray, MRI, clinical analysis" },
  { name: "Rehabilitation centers", note: "Physiotherapy, occupational therapy" },
  { name: "Alternative medicine units", note: "Ayurveda and Unani centers" },
  { name: "Community pharmacies", note: "Pharmacy services in the community" },
  { name: "Medical travel agencies", note: "Facilitating travel for care" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long is AAA healthcare accreditation valid?",
    a: "Accreditation is granted for three years. The decision is made by the accreditation committee after reviewing the final reports prepared by AAA Surveyors.",
  },
  {
    q: "What does the survey involve?",
    a: "AAA Surveyors conduct an onsite or hybrid survey lasting two to five days. The AAA team sends the final report within two weeks, and the facility implements corrective actions if required.",
  },
  {
    q: "Can part of the survey be conducted remotely?",
    a: "Yes. AAA offers flexible survey options, including a hybrid approach that blends virtual and on-site components: one or more surveyors work on-site while the remainder of the team participates via video.",
  },
  {
    q: "Are AAA standards internationally recognized?",
    a: "Yes. The AAA Accreditation Standards for Healthcare Facilities have been assessed and accredited by ISQua EEA against the Guidelines and Principles for the Development of Health and Social Care Standards, 5th Edition, Version 1.0, September 2018. AAA is also an institutional member of ISQua.",
  },
  {
    q: "Does AAA help us prepare, or only assess?",
    a: "Both. Approved AAA consultants guide you step by step — from the first stage, or wherever you are, until accreditation is granted — including gap analysis, training and working through the standards. A dedicated advisor and a self-assessment tool support you from stage one.",
  },
  {
    q: "Which healthcare facilities can apply?",
    a: "Hospitals including day-care surgery centers, primary care clinics, specialty clinics, dental organizations, diagnostic centers, rehabilitation centers, alternative medicine units, community pharmacies and medical travel agencies.",
  },
  {
    q: "How can we comment on the accreditation standards?",
    a: "AAA gathers, analyses and uses feedback for continuous improvement under its Accreditation Standards Feedback Policy (Document No. P-HEC-10-V1). Email healthcare@aaa-accreditation.org to share feedback or to request a copy of draft standards for consultation.",
  },
];

/* ------------------------------------------------------------------ page -- */

export default function Page() {
  return (
    <main className="axp hcx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Programs", path: "/programs/healthcare" },
            { name: "Healthcare Accreditation", path: "/programs/healthcare" },
          ]),
          serviceSchema({
            name: "Healthcare Accreditation",
            description:
              "Accreditation of hospitals, clinics, dental, diagnostic, rehabilitation and pharmacy organizations against the AAA Accreditation Standards for Healthcare Facilities, accredited by ISQua EEA.",
            path: "/programs/healthcare",
            standard: "AAA Accreditation Standards for Healthcare Facilities",
            audience: "Hospitals and healthcare organizations",
          }),
          faqSchema(FAQS),
        ]}
      />

      {/* 01 — Hero */}
      <PageHero
        image="/home/healthcare.jpg"
        eyebrow="Healthcare Accreditation"
        badge="ISQua EEA · Accredited standards"
        title={
          <>
            Advancing excellence in <em>healthcare.</em>
          </>
        }
        intro="At the American Accreditation Association we ensure hospitals and healthcare organizations deliver safe, high-quality care while fostering continuous improvement and innovation. Partnering with AAA demonstrates your commitment to patient safety, clinical excellence and operational efficiency."
        crumbs={[{ href: "/programs/healthcare", label: "Programs" }, { label: "Healthcare Accreditation" }]}
        caption={{
          kicker: "Accreditation standards for healthcare facilities",
          title: "Developed with 174 international healthcare experts",
          chip: "ISQua EEA",
        }}
        actions={
          <>
            <Link href="/apply" className="ax-btn ax-btn-gold">
              Apply for Accreditation <ArrowIcon />
            </Link>
            <a href={HC_CONSULT} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-ghost">
              Book a Free Consultation
            </a>
          </>
        }
        meta={[
          { k: "Standards accredited by", v: "ISQua EEA" },
          { k: "Chapters of standards", v: "12" },
          { k: "Onsite / hybrid survey", v: "2–5 days" },
          { k: "Accreditation validity", v: "3 years" },
        ]}
      />

      {/* 02 — What makes us unique */}
      <section className="ax-section" id="unique">
        <div className="container">
          <div className="ax-split">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">What makes us unique?</span>
                <h2>
                  We do not just assess you — we <em>get you there.</em>
                </h2>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <p>
                AAA is the only healthcare accreditation body that will ensure you achieve
                accreditation through approved consultants who guide you step by step — taking you
                from the first stage, or from wherever you are today, until AAA healthcare
                accreditation is granted.
              </p>
              <p>
                That guidance includes gap analysis, training, and working through the standards to
                confirm they are understood and applied inside your facility. Every applicant is
                assigned a dedicated advisor committed to its specific needs, backed by a customer
                care team that stays with you for the whole journey.
              </p>
              <ul className="ax-checks">
                <li>Dedicated advisor and self-assessment tool from stage one</li>
                <li>Gap analysis, training and technical support from approved consultants</li>
                <li>Flexible onsite or hybrid survey options</li>
                <li>Accreditation granted for three years</li>
              </ul>
              <div className="ax-actions">
                <Link href="/programs/healthcare/consultation" className="ax-btn ax-btn-blue">
                  See consultation services <ArrowIcon />
                </Link>
              </div>
            </div>

            <figure className="ax-photo reveal">
              <Image
                src="/about/assessment.jpg"
                alt="An AAA surveyor reviewing documentation with clinical staff during a healthcare facility survey"
                fill
                sizes="(max-width: 980px) 92vw, 40vw"
              />
              <span className="ax-photo-badge">Onsite survey</span>
              <figcaption>
                Surveyors review documents, walk the facility and interview staff.
                <span>AAA Accreditation Standards for Healthcare Facilities</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 03 — Cluster sub-navigation */}
      <ClusterNav
        cream
        lead="Programs created according to the international requirements of ISQua and developed in consultation with 174 international healthcare experts."
      />

      {/* 04 — Standards at a glance */}
      <section className="ax-section" id="standards">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">The standards</span>
            <h2>Twelve chapters covering every aspect of care</h2>
            <p>
              AAA accreditation standards are evidence-based criteria that healthcare organizations
              must meet to achieve and maintain accreditation — recognized internationally and
              accredited by the International Society for Quality in Health Care (ISQua).
            </p>
          </div>

          <div className="ax-grid two">
            {STANDARD_SECTIONS.map((s, i) => (
              <article className="ax-card reveal" key={s.label} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-ico ax-card-ico gold" aria-hidden="true">
                    <LineIcon>
                      {i === 0 ? (
                        <>
                          <path d="M19 14c1.5-1.5 2-3.5 2-5a5 5 0 0 0-9-3 5 5 0 0 0-9 3c0 1.5.5 3.5 2 5l7 7z" />
                        </>
                      ) : (
                        <>
                          <path d="M3 21h18M5 21V7l7-4 7 4v14" />
                          <path d="M9 9h2M13 9h2M9 13h2M13 13h2M10 21v-4h4v4" />
                        </>
                      )}
                    </LineIcon>
                  </span>
                  <span className="hc-chip">{s.note}</span>
                </div>
                <h3>{s.label}</h3>
                <ul className="ax-checks gold">
                  {s.chapters.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="ax-actions center">
            <Link href="/programs/healthcare/standards" className="ax-btn ax-btn-ghost-navy">
              Read the standards in detail <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* 05 — Process and application */}
      <section className="ax-section cream" id="process">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">How it works</span>
            <h2>Four stages, fully documented</h2>
            <p>
              A transparent route from preparation to an independent accreditation decision, with a
              dedicated advisor alongside you at every stage.
            </p>
          </div>

          <div className="ax-split top">
            <div className="ax-steps-panel reveal">
              <h3>Accreditation process</h3>
              <ol className="ax-steps">
                {STAGES.map((s, i) => (
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
              <span className="ax-pill">
                <span className="ax-ico" aria-hidden="true">
                  <LineIcon strokeWidth={2}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </LineIcon>
                </span>
                Accreditation certificate valid for 3 years
              </span>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <LineIcon>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M12 12v6M9 15l3 3 3-3" />
                </LineIcon>
              </span>
              <h3>Now you can apply for accreditation</h3>
              <p>
                Complete the healthcare accreditation application form with details of your facility,
                its services and the scope you want assessed. A dedicated advisor will take it from
                there.
              </p>
              <a
                href={HC_APPLICATION_FORM}
                target="_blank"
                rel="noopener noreferrer"
                className="ax-btn ax-btn-blue"
              >
                <DownloadIcon /> Download Application Form
              </a>
              <p className="ax-panel-note">
                Prefer to talk first? Email{" "}
                <a className="ax-link" href={`mailto:${HC_EMAIL}`}>
                  {HC_EMAIL}
                </a>{" "}
                or book a free 30-minute consultation.
              </p>
              <ul className="ax-docs">
                <li className="ax-docs-title">Useful next steps</li>
                <li>
                  <Link href="/programs/healthcare/process">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </LineIcon>
                    </span>
                    Full process &amp; timeline
                    <i>Guide</i>
                  </Link>
                </li>
                <li>
                  <Link href="/programs/healthcare/who-can-apply">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <path d="m5 12 5 5L20 7" />
                      </LineIcon>
                    </span>
                    Check your eligibility
                    <i>Guide</i>
                  </Link>
                </li>
                <li>
                  <Link href="/documents">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                      </LineIcon>
                    </span>
                    AAA policies &amp; documents
                    <i>Docs</i>
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 06 — Who can be accredited */}
      <section className="ax-section" id="eligibility">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Who can be accredited?</span>
            <h2>
              Open to the full spectrum of <em>care providers.</em>
            </h2>
            <p>
              From single-chair dental offices to multi-unit hospitals, the AAA healthcare program
              accredits the complete range of healthcare facilities — including services well beyond
              the hospital, such as polyclinics, radiology, physiotherapy, fertility and eye care.
            </p>
          </div>

          <div className="ax-grid tight hc-tiles reveal">
            {FACILITIES.map((f) => (
              <div className="ax-tile" key={f.name}>
                <b>{f.name}</b>
                <span>{f.note}</span>
              </div>
            ))}
          </div>

          <div className="ax-actions center">
            <Link href="/programs/healthcare/who-can-apply" className="ax-btn ax-btn-blue">
              See every eligible facility type <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* 07 — Recognition proof band */}
      <section className="ax-section navy" id="recognition">
        <div className="container">
          <div className="ax-split even">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">International recognition</span>
                <h2>Standards assessed and accredited by ISQua EEA</h2>
                <p>
                  The AAA Accreditation Standards for Healthcare Facilities have been assessed and
                  accredited by the International Society for Quality in Health Care (ISQua EEA)
                  against the Guidelines and Principles for the Development of Health and Social Care
                  Standards, 5th Edition, Version 1.0, September 2018 — confirming that both their
                  development and their content meet international best practice.
                </p>
              </div>
              <ul className="ax-checks">
                <li>AAA is an institutional member of ISQua</li>
                <li>Programs built to ISQua&apos;s international requirements</li>
                <li>Developed with 174 international healthcare experts</li>
              </ul>
              <div className="ax-actions">
                <Link href="/programs/healthcare/international-recognition" className="ax-btn ax-btn-ghost">
                  How the recognition works <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="reveal">
              <ul className="ax-stats hc-stats">
                <li className="ax-stat">
                  <b>200+</b>
                  <span>Accredited organizations</span>
                </li>
                <li className="ax-stat">
                  <b>58+</b>
                  <span>Countries served</span>
                </li>
                <li className="ax-stat">
                  <b>100+</b>
                  <span>Assessors &amp; experts</span>
                </li>
                <li className="ax-stat">
                  <b>174</b>
                  <span>Experts consulted on the standards</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — FAQ */}
      <section className="ax-section fade-up" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Everything facilities ask before they apply</h2>
            <p>
              Don&apos;t see your question? Contact the healthcare accreditation department at{" "}
              <a className="ax-link" href={`mailto:${HC_EMAIL}`}>
                {HC_EMAIL}
              </a>
              .
            </p>
          </div>

          <div className="ax-faq-list">
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

      {/* 09 — Closing CTA */}
      <CTA
        eyebrow="Take the next step"
        title={
          <>
            Ready to accredit your <em>healthcare facility?</em>
          </>
        }
        text="Tell us about your facility and a dedicated advisor will scope your accreditation journey — the applicable chapters of the standards, the survey format that suits you, and a realistic timeline to accreditation."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Talk to the healthcare team" }}
        related={[
          { href: "/programs/healthcare/standards", label: "Accreditation Standards" },
          { href: "/programs/healthcare/process", label: "Accreditation Process" },
          { href: "/programs/healthcare/why-aaa", label: "Why AAA Accreditation?" },
          { href: "/programs/iso-15189", label: "Medical Laboratories (ISO 15189)" },
        ]}
      />
    </main>
  );
}
