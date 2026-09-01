import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "../../_components/Icon";
import AdvisorForm from "./AdvisorForm";
import "./cb.css";

export const metadata: Metadata = {
  title: { absolute: "Management Systems Certification Bodies Accreditation (ISO/IEC 17021-1) | AAA" },
  description:
    "AAA accredits management systems certification bodies to ISO/IEC 17021-1 — independent recognition of competence, impartiality and consistent certification decisions across ISO 9001, 14001, 45001, 27001, 22000 and more.",
};

const CONSULT = "https://calendly.com/aaa-accreditation4/30min";
const APPLICATION_FORM =
  "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-system_product-certfication-Bodies.doc";
const ASSETS = "/programs/iso-17021";

function LineIcon({ children, strokeWidth = 1.7 }: { children: React.ReactNode; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

// Content below is transcribed from the client's "17021" section files
// (Aug 2026): hero, suitability, benefits, assessment areas, process &
// application, testimonials, FAQ and final CTA.

const STATS: { big: string; small: string }[] = [
  { big: "58+", small: "Countries served worldwide" },
  { big: "287", small: "Assessors & experts" },
  { big: "3 years", small: "Accreditation validity" },
  { big: "International", small: "Accreditation services" },
];

const SCHEMES: { code: string; name: string; icon: React.ReactNode }[] = [
  {
    code: "ISO 9001",
    name: "Quality Management",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12 2.5 2.5 5-5" />
      </>
    ),
  },
  {
    code: "ISO 14001",
    name: "Environmental Management",
    icon: (
      <>
        <path d="M20 4c-8 0-14 4-14 12a6 6 0 0 0 6 6c8 0 8-10 8-18z" />
        <path d="M4 20c4-4 7-7 12-10" />
      </>
    ),
  },
  {
    code: "ISO 45001",
    name: "Occupational Health & Safety",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v6M9 11h6" />
      </>
    ),
  },
  {
    code: "ISO/IEC 27001",
    name: "Information Security",
    icon: (
      <>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4M12 15v2" />
      </>
    ),
  },
  {
    code: "ISO 22000",
    name: "Food Safety Management",
    icon: <path d="M3 2v7a3 3 0 0 0 6 0V2M6 2v20M21 15V2a5 5 0 0 0-3 5v6zM18 13v9" />,
  },
  {
    code: "ISO 50001",
    name: "Energy Management",
    icon: <path d="M13 2 4 14h7l-2 8 9-12h-7z" />,
  },
  {
    code: "ISO 22301",
    name: "Business Continuity",
    icon: (
      <>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 3v6h-6" />
      </>
    ),
  },
  {
    code: "Other schemes",
    name: "Other management-system schemes",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="M17.5 14v7M14 17.5h7" />
      </>
    ),
  },
];

const BENEFITS: { title: string; text: string }[] = [
  {
    title: "Demonstrate certification competence",
    text: "Provide independent evidence that your certification body has the competent auditors, reviewers, decision-makers, and management systems needed to deliver reliable certification services.",
  },
  {
    title: "Strengthen confidence in certification decisions",
    text: "Build confidence among certified clients, regulators, procurement authorities, and other stakeholders that certification decisions are based on competent and consistent audits.",
  },
  {
    title: "Protect impartiality and credibility",
    text: "Demonstrate that risks to impartiality, conflicts of interest, and commercial pressures are identified, evaluated, controlled, and monitored.",
  },
  {
    title: "Support market access and growth",
    text: "Strengthen your certification body’s credibility, improve its competitive position, and support access to new clients, sectors, and international markets.",
  },
];

const AREAS: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Structure & Governance",
    text: "Legal identity, organizational structure, responsibilities, authority, governance arrangements, and management controls.",
    icon: <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-4h4v4" />,
  },
  {
    title: "Impartiality Management",
    text: "Identification, evaluation, control, and monitoring of risks to impartiality and conflicts of interest.",
    icon: <path d="M12 3v18M8 21h8M2 8h20M5 8l-3 6a3 3 0 0 0 6 0L5 8zM19 8l-3 6a3 3 0 0 0 6 0l-3-6z" />,
  },
  {
    title: "Personnel Competence",
    text: "Competence criteria, qualifications, technical knowledge, experience, training, authorization, and ongoing monitoring.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    title: "Audit Team Selection",
    text: "Selection and assignment of competent auditors and technical experts according to scheme, sector, and client activities.",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="m17 11 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Audit Planning & Delivery",
    text: "Application review, audit-time determination, Stage 1 and Stage 2 audits, surveillance, recertification, and special audits.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </>
    ),
  },
  {
    title: "Certification Review & Decision",
    text: "Independent review and decisions to grant, maintain, renew, suspend, withdraw, or change certification.",
    icon: (
      <>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="m9 14 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Records & Public Information",
    text: "Audit records, certification files, certificate content, public directories, confidentiality, and client information.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </>
    ),
  },
  {
    title: "Complaints & Corrective Actions",
    text: "Complaints, appeals, nonconformities, corrective actions, internal audits, management review, and improvement.",
    icon: (
      <>
        <path d="M3 12a9 9 0 0 1 15.36-6.36L21 8M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-15.36 6.36L3 16M3 21v-5h5" />
      </>
    ),
  },
];

const PROCESS: { title: string; text: string }[] = [
  {
    title: "Submit your application",
    text: "Define the management-system standards, technical sectors, offices, and requested accreditation scope.",
  },
  {
    title: "Document review",
    text: "AAA reviews management-system documents, certification procedures, competence criteria, impartiality controls, and audit processes.",
  },
  {
    title: "Accreditation assessment",
    text: "Qualified assessors evaluate compliance with ISO/IEC 17021-1. The assessment may include office review, certification-file review, and witnessing of audit activities.",
  },
  {
    title: "Corrective actions",
    text: "Where findings are identified, the certification body submits corrective actions and supporting evidence.",
  },
  {
    title: "Independent accreditation decision",
    text: "The assessment results and supporting evidence are reviewed independently before a decision is made.",
  },
  {
    title: "Accreditation granted",
    text: "Successful certification bodies receive an accreditation certificate and approved scope, valid for three years.",
  },
];

// Supporting documents carried over from the previous version of this page.
const DOCUMENTS: { label: string; href: string; meta: string }[] = [
  {
    label: "General requirements for accreditation",
    href: "https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf",
    meta: "PDF",
  },
  {
    label: "Requirements for use of accreditation symbols",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf",
    meta: "PDF",
  },
  {
    label: "Accreditation of multi-site conformity assessment bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-Accreditation-of-multi-site-conformity-assessment-bodies-.pdf",
    meta: "PDF",
  },
];

const IMPACTS: { title: string; text: string }[] = [
  { title: "Technical expertise", text: "Assessment supported by knowledgeable subject-matter experts." },
  { title: "Strong collaboration", text: "A professional and collaborative accreditation experience." },
  { title: "Greater credibility", text: "Accreditation reinforced confidence and supported future growth." },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is ISO/IEC 17021-1?",
    a: "ISO/IEC 17021-1 specifies requirements for the competence, consistency, and impartiality of bodies providing audit and certification of management systems.",
  },
  {
    q: "Does a certification body need to offer all management-system standards?",
    a: "No. A certification body may provide certification for one or more management-system standards and is not required to offer every type of management-system certification.",
  },
  {
    q: "Can a newly established certification body apply?",
    a: "Yes. A newly established certification body may apply when it has implemented its management system and can demonstrate operational capability, competent personnel, impartiality controls, and effective certification processes.",
  },
  {
    q: "What is included in the accreditation scope?",
    a: "The scope normally identifies the management-system standards and technical sectors for which the certification body has demonstrated competence.",
  },
  {
    q: "Is witness assessment required?",
    a: "Witness assessment may form part of the accreditation process to confirm auditor competence and effective implementation of the certification body’s audit procedures.",
  },
  {
    q: "Can several certification schemes be included?",
    a: "Yes. A certification body may request accreditation for several management-system standards, provided it demonstrates competence and compliance for each requested scheme and technical sector.",
  },
  {
    q: "How long is accreditation valid?",
    a: "AAA accreditation is valid for three years, subject to continued compliance with accreditation requirements and completion of applicable surveillance or reassessment activities.",
  },
  {
    q: "How do I begin?",
    a: "Complete the accreditation application form or contact the AAA team to discuss your certification schemes, technical sectors, offices, and proposed accreditation scope.",
  },
];

export default function Page() {
  return (
    <main className="cbx">
      {/* 01 — Hero */}
      <section className="cbx-hero" id="top">
        <div className="container cbx-hero-grid">
          <div className="cbx-hero-copy reveal">
            <nav className="cbx-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/programs/conformity-assessment-bodies">Conformity Assessment Bodies</Link>
              <span>/</span>
              <strong>ISO/IEC 17021-1</strong>
            </nav>

            <span className="cbx-hero-badge">
              <i aria-hidden="true" />
              ISO/IEC 17021-1 · Management systems
            </span>
            <h1>Management Systems Certification Bodies Accreditation</h1>
            <p className="cbx-hero-lead">
              Demonstrate the competence, impartiality, and consistent operation of your
              certification body through accreditation against ISO/IEC 17021-1. AAA accreditation
              provides independent recognition that your organization conducts management-system
              audits and certification activities professionally, consistently, and with reliable
              certification decisions.
            </p>

            <div className="cbx-hero-actions">
              <Link href="/apply" className="cbx-btn cbx-btn-gold">
                Apply for Accreditation
                <Icon name="arrow" size={16} />
              </Link>
              <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="cbx-btn cbx-btn-ghost">
                Book a Free Consultation
              </a>
            </div>

            <ul className="cbx-stats" aria-label="AAA at a glance">
              {STATS.map((s) => (
                <li className="cbx-stat" key={s.small}>
                  <b>{s.big}</b>
                  <span>{s.small}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cbx-hero-visual reveal">
            <figure className="cbx-hero-photo">
              <Image
                src={`${ASSETS}/hero-qml.jpg`}
                alt="Quality Management Lead (QML) representatives holding their framed AAA ISO/IEC 17021-1 accreditation certificate"
                fill
                priority
                sizes="(max-width: 980px) 92vw, 42vw"
              />
              <figcaption>
                <div className="cbx-cap">
                  <span>Quality Management Lead (QML) · Spain</span>
                  <strong>AAA-accredited management systems certification body</strong>
                </div>
                <span className="cbx-cert-chip">ISO/IEC 17021-1</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 01b — Advisor form (from the client's hero) */}
      <section className="cbx-advisor" id="advisor">
        <div className="container">
          <div className="cbx-advisor-card reveal">
            <div className="cbx-advisor-copy">
              <span className="eyebrow">Talk to us</span>
              <h2>Speak with an Accreditation Advisor</h2>
              <p>
                Tell us about your certification schemes, technical sectors, and requested scope.
                An advisor will come back to you with the next steps.
              </p>
              <ul className="cbx-advisor-points">
                <li>Response within two business days</li>
                <li>Guidance on defining your accreditation scope</li>
                <li>Clear view of documents, timelines, and assessment stages</li>
              </ul>
            </div>
            <AdvisorForm />
          </div>
        </div>
      </section>

      {/* 02 — Suitability */}
      <section className="cbx-fit" id="who">
        <div className="container cbx-fit-grid">
          <div className="cbx-fit-copy reveal">
            <div className="cbx-head">
              <span className="eyebrow">Who should apply?</span>
              <h2>
                Is <span className="nowrap">ISO/IEC 17021-1</span> accreditation right for your
                certification body?
              </h2>
            </div>
            <span className="cbx-rule" aria-hidden="true" />
            <p>
              ISO/IEC 17021-1 is the internationally recognized standard for bodies providing audit
              and certification of management systems. Accreditation demonstrates that a
              certification body has the competent personnel, impartiality controls, audit
              processes, certification procedures, and management systems required to deliver
              consistent and credible certification services.
            </p>
            <p>
              A certification body may offer one or several management-system certification schemes
              and does not need to provide certification for every type of management system.
              Whether your organization is newly established or already provides certification
              services, accreditation offers independent confirmation that its activities are
              performed competently, impartially, and consistently.
            </p>
          </div>

          <div className="reveal">
            <span className="cbx-fit-label">Suitable for certification bodies offering</span>
            <div className="cbx-schemes">
              {SCHEMES.map((s, i) => (
                <article className="cbx-scheme" key={s.code} style={{ transitionDelay: `${i * 40}ms` }}>
                  <span className="cbx-ico cbx-scheme-ico" aria-hidden="true">
                    <LineIcon>{s.icon}</LineIcon>
                  </span>
                  <div className="cbx-scheme-txt">
                    <b>{s.code}</b>
                    <span>{s.name}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Why it matters */}
      <section className="cbx-why" id="why">
        <div className="container cbx-why-grid">
          <div className="reveal">
            <div className="cbx-head">
              <span className="eyebrow">Benefits</span>
              <h2>
                Why <span className="nowrap">ISO/IEC 17021-1</span> accreditation matters
              </h2>
            </div>
            <ol className="cbx-why-list">
              {BENEFITS.map((b, i) => (
                <li className="cbx-why-item" key={b.title}>
                  <span className="cbx-why-num" aria-hidden="true">{i + 1}</span>
                  <div>
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <figure className="cbx-photo-card reveal">
            <Image
              src={`${ASSETS}/kcertification-iso9001.jpg`}
              alt="KCertification presenting an ISO 9001 certificate to a certified client"
              fill
              sizes="(max-width: 980px) 92vw, 36vw"
            />
            <span className="cbx-photo-badge">Accredited certification in practice</span>
            <figcaption>
              Supporting credible management-systems certification and stronger client confidence.
              <span>KCertification · AAA-accredited certification body · Brazil</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 04 — Assessment areas */}
      <section className="cbx-areas" id="assessment">
        <div className="container">
          <div className="cbx-head center reveal">
            <span className="eyebrow">What we assess</span>
            <h2>Key areas assessed during accreditation</h2>
            <p>
              AAA evaluates the governance, competence, impartiality, audit, and decision-making
              controls needed to provide credible management-systems certification.
            </p>
          </div>
          <div className="cbx-areas-grid">
            {AREAS.map((a, i) => (
              <article className="cbx-area reveal" key={a.title} style={{ transitionDelay: `${i * 45}ms` }}>
                <div className="cbx-area-top">
                  <span className="cbx-ico cbx-area-ico" aria-hidden="true">
                    <LineIcon>{a.icon}</LineIcon>
                  </span>
                  <span className="cbx-area-no" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <span className="cbx-area-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Process & application */}
      <section className="cbx-process" id="process">
        <div className="container">
          <div className="cbx-head center reveal">
            <span className="eyebrow">How it works</span>
            <h2>Accreditation process &amp; application</h2>
            <p>
              A transparent, evidence-based route from application to an independent accreditation
              decision — with clear expectations at every stage.
            </p>
          </div>

          <div className="cbx-process-grid">
            <div className="cbx-steps-panel reveal">
              <h3>Accreditation process</h3>
              <ol className="cbx-steps">
                {PROCESS.map((step, i) => (
                  <li className="cbx-step" key={step.title}>
                    <span className="cbx-step-num" aria-hidden="true">{i + 1}</span>
                    <div className="cbx-step-body">
                      <b>{step.title}</b>
                      <span>{step.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <span className="cbx-validity">
                <span className="cbx-ico" aria-hidden="true">
                  <LineIcon strokeWidth={2}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </LineIcon>
                </span>
                Accreditation certificate valid for 3 years
              </span>
            </div>

            <aside className="cbx-apply-card reveal">
              <span className="cbx-ico cbx-apply-ico" aria-hidden="true">
                <LineIcon>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M12 12v6M9 15l3 3 3-3" />
                </LineIcon>
              </span>
              <h3>Accreditation application form</h3>
              <p>
                Complete the application form to provide information about your organization,
                certification activities, requested management-system standards, technical sectors,
                locations, and proposed accreditation scope.
              </p>
              <a href={APPLICATION_FORM} className="cbx-btn cbx-btn-blue" target="_blank" rel="noopener noreferrer">
                <Icon name="download" size={16} /> Download Application Form
              </a>
              <p className="cbx-apply-note">
                Additional technical requirements and supporting information will be provided by the
                AAA accreditation team as applicable to your requested scope.
              </p>
              <ul className="cbx-docs">
                <li className="cbx-docs-title">Related requirements</li>
                {DOCUMENTS.map((d) => (
                  <li key={d.href}>
                    <a href={d.href} target="_blank" rel="noopener noreferrer">
                      <span className="cbx-ico" aria-hidden="true">
                        <LineIcon strokeWidth={2}>
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <path d="M14 2v6h6" />
                        </LineIcon>
                      </span>
                      {d.label}
                      <i>{d.meta}</i>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 06 — Testimonials */}
      <section className="cbx-voices" id="testimonials">
        <div className="container">
          <div className="cbx-head center reveal">
            <span className="eyebrow">Testimonials</span>
            <h2>Hear from AAA-accredited certification bodies</h2>
            <p>
              Discover how AAA accreditation has supported certification bodies through technical
              expertise, professional collaboration, and stronger market credibility.
            </p>
          </div>

          <div className="cbx-voice-main reveal">
            <div className="cbx-voice-brand">
              <span className="cbx-voice-tag">Featured</span>
              <div className="cbx-voice-logo">
                <Image
                  src={`${ASSETS}/lazarus-alliance-logo.png`}
                  alt="Lazarus Alliance — Proactive Cyber Security"
                  width={900}
                  height={167}
                />
              </div>
              <span>AAA-accredited certification body · Arizona, United States</span>
            </div>

            <figure className="cbx-voice-quote">
              <span className="cbx-ico cbx-voice-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.6 6.4v3.2c-1.7.5-2.6 1.6-2.7 3.4H9.6V18H3.9v-5c0-3.9 1.9-6.1 5.7-6.6zm10.5 0v3.2c-1.7.5-2.6 1.6-2.7 3.4h2.7V18h-5.7v-5c0-3.9 1.9-6.1 5.7-6.6z" />
                </svg>
              </span>
              <blockquote>
                The AAA team is very technically precise, with strong subject-matter expertise and
                great collaboration. I do not hesitate to endorse AAA to prospective customers.
              </blockquote>
              <figcaption className="cbx-voice-person">
                <strong>Michael Peters</strong>
                <span>CEO, Lazarus Alliance</span>
              </figcaption>
              <div className="cbx-impacts">
                {IMPACTS.map((i) => (
                  <div className="cbx-impact" key={i.title}>
                    <b>{i.title}</b>
                    <span>{i.text}</span>
                  </div>
                ))}
              </div>
            </figure>
          </div>

          <div className="cbx-clients reveal">
            <h3>Accreditation supporting recognized client relationships</h3>
            <p>
              Lazarus Alliance provides accredited certification and assurance services to
              organizations across technology, government, cybersecurity, and other sectors. The
              organizations shown are clients of Lazarus Alliance, not organizations directly
              accredited by AAA.
            </p>
            <Image
              src={`${ASSETS}/lazarus-alliance-clients.png`}
              alt="Examples of Lazarus Alliance client organizations"
              width={1600}
              height={156}
            />
          </div>

          <figure className="cbx-voice-support reveal">
            <span className="cbx-avatar" aria-hidden="true">KC</span>
            <div>
              <blockquote>
                We began the process seeking a reliable partner to accredit our services, and from
                start to finish, everything was handled with professionalism.
              </blockquote>
              <p>
                <b>Christiano Baros</b> · CEO, KCertification · São Paulo, Brazil
              </p>
            </div>
          </figure>
        </div>
      </section>

      {/* 07 — FAQ */}
      <section className="sme-faq" id="faq">
        <div className="container">
          <div className="cbx-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
            <p>Common questions about ISO/IEC 17021-1 accreditation for management-systems certification bodies.</p>
          </div>
          <div className="sme-faq-list">
            {FAQ.map((item, index) => (
              <details className="sme-faq-item" key={item.q} open={index === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="sme-faq-plus" aria-hidden="true" />
                </summary>
                <div className="sme-faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Final CTA */}
      <section className="sme-contact" id="apply">
        <span className="sme-contact-corner" />
        <div className="container">
          <div className="cbx-close reveal">
            <span className="eyebrow">Take the next step</span>
            <h2>
              Ready to apply for <span className="nowrap">ISO/IEC 17021-1</span> accreditation?
            </h2>
            <p>
              Take the next step toward independent recognition of your certification body’s
              competence, impartiality, and consistent operation. Our team is ready to guide you
              through the accreditation process and help define the appropriate management-system
              certification scope.
            </p>
            <div className="cbx-close-actions">
              <Link href="/apply" className="cbx-btn cbx-btn-gold">
                Apply for Accreditation <Icon name="arrow" size={16} />
              </Link>
              <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="cbx-btn cbx-btn-ghost">
                Book a Free Consultation
              </a>
              <a href={APPLICATION_FORM} target="_blank" rel="noopener noreferrer" className="cbx-btn cbx-btn-ghost">
                <Icon name="download" size={16} /> Download Application Form
              </a>
            </div>
            <div className="cbx-related">
              <span>Related programs:</span>
              <Link href="/programs/iso-17065">Product Certification (ISO/IEC 17065)</Link>
              <Link href="/programs/iso-17024">Personnel Certification (ISO/IEC 17024)</Link>
              <Link href="/programs/conformity-assessment-bodies">All CAB programs</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
