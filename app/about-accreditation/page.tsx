import Link from "next/link";
import Icon from "../_components/Icon";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import { pageMeta, breadcrumbSchema, faqSchema } from "@/lib/seo";
import "./about-accreditation.css";

export const metadata = pageMeta({
  title: "What Is Accreditation?",
  description:
    "What accreditation is, how it differs from certification, who accredits the accreditors, and why it matters to buyers, regulators and the bodies assessed.",
  path: "/about-accreditation",
  keywords: [
    "what is accreditation",
    "accreditation vs certification",
    "ISO/IEC 17011",
    "ILAC IAF",
    "conformity assessment",
    "benefits of accreditation",
  ],
});

const STANDARDS_PDF =
  "https://aaa-accreditation.org/wp-content/uploads/2024/11/AAA-Accreditation-Standards-v-1.pdf";
const GENERAL_REQUIREMENTS =
  "https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf";

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

const BENEFITS: { audience: string; title: string; text: string; icon: React.ReactNode }[] = [
  {
    audience: "Industry & trade",
    title: "Fewer repeat tests, easier trade",
    text: "Accreditation facilitates trade and eliminates the need for repetitive testing, certification and inspection.",
    icon: (
      <>
        <path d="M3 21h18M6 21V9l6-5 6 5v12" />
        <path d="M10 21v-6h4v6" />
      </>
    ),
  },
  {
    audience: "Regulators",
    title: "An impartial basis for decisions",
    text: "Accreditation provides a reliable and impartial basis for sound decision-making.",
    icon: (
      <>
        <path d="M12 3v18M8 21h8M2 8h20" />
        <path d="M5 8l-3 6a3 3 0 0 0 6 0L5 8zM19 8l-3 6a3 3 0 0 0 6 0l-3-6z" />
      </>
    ),
  },
  {
    audience: "Conformity assessment providers",
    title: "Proof of competence, and a passport to tenders",
    text: "For testing, calibration and medical laboratories, certification bodies and inspection bodies, accreditation is a means of demonstrating competency to clients. It is an effective marketing tool and a passport to submit tenders to contractors that require independently verified conformity assessment service providers.",
    icon: (
      <>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="m9 14 2 2 4-4" />
      </>
    ),
  },
  {
    audience: "Users & consumers",
    title: "Results you can compare and rely on",
    text: "Accreditation is your guarantee of reliable and comparable conformity assessment results, and it increases the reliability of products.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

const PROGRAMS: { name: string; standard: string; href: string; icon: React.ReactNode }[] = [
  {
    name: "Healthcare Accreditation",
    standard: "AAA Accreditation Standards · ISQua EEA assessed",
    href: "/programs/healthcare",
    icon: (
      <>
        <path d="M12 21s-7-4.35-9.33-8.5A5.5 5.5 0 0 1 12 6.5a5.5 5.5 0 0 1 9.33 6C19 16.65 12 21 12 21z" />
        <path d="M12 10v5M9.5 12.5h5" />
      </>
    ),
  },
  {
    name: "Training Providers Accreditation",
    standard: "ASTM E2659",
    href: "/programs/training-education",
    icon: (
      <>
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      </>
    ),
  },
  {
    name: "Schools Accreditation",
    standard: "AAA school standards",
    href: "/programs/school-accreditation",
    icon: (
      <>
        <path d="M3 21h18M5 21V8l7-5 7 5v13" />
        <path d="M9 21v-6h6v6M10 11h4" />
      </>
    ),
  },
  {
    name: "Testing & Calibration Laboratories",
    standard: "ISO/IEC 17025",
    href: "/programs/iso-17025",
    icon: (
      <>
        <path d="M9 2v7L4 19a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 19l-5-10V2" />
        <path d="M8 2h8M7 15h10" />
      </>
    ),
  },
  {
    name: "Medical Laboratories",
    standard: "ISO 15189",
    href: "/programs/iso-15189",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
  },
  {
    name: "Personnel Certification Bodies",
    standard: "ISO/IEC 17024",
    href: "/programs/iso-17024",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-1a6 6 0 0 1 12 0v1" />
      </>
    ),
  },
  {
    name: "Management Systems Certification Bodies Accreditation",
    standard: "ISO/IEC 17021-1",
    href: "/programs/iso-17021",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="m14.5 17.5 2 2 4-4" />
      </>
    ),
  },
  {
    name: "Product Certification Bodies",
    standard: "ISO/IEC 17065",
    href: "/programs/iso-17065",
    icon: (
      <>
        <path d="m21 16-9 5-9-5V8l9-5 9 5z" />
        <path d="m3 8 9 5 9-5M12 13v8" />
      </>
    ),
  },
  {
    name: "Inspection Bodies",
    standard: "ISO/IEC 17020",
    href: "/programs/iso-17020",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
  },
  {
    name: "Proficiency Testing Providers",
    standard: "ISO/IEC 17043",
    href: "/programs/iso-17043",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 15 3.5-4 3 2.5L20 7" />
      </>
    ),
  },
];

const STAGES: { title: string; text: string }[] = [
  {
    title: "Application",
    text: "You send the accreditation application form to AAA and pay the application fees. AAA issues a letter confirming that your accreditation is in process.",
  },
  {
    title: "Document review",
    text: "AAA reviews your application and related documents and sends you a Document Review Compliance Report. You revise your documents according to the review results if needed.",
  },
  {
    title: "Assessment",
    text: "AAA defines the assessment dates and the assessment team, conducts the assessment visit, and sends an assessment report that includes a recommendation for accreditation.",
  },
  {
    title: "Decision",
    text: "You implement corrective actions if needed, and the accreditation committee reviews the file and takes the accreditation decision.",
  },
];

const FAQ = [
  {
    q: "What is accreditation?",
    a: "Accreditation is a formal process by which a recognized body evaluates and certifies that an institution meets predefined and established quality standards. The accreditation process aims to enhance service quality and ensure safety through compliance with global standards.",
  },
  {
    q: "What is the difference between accreditation and certification?",
    a: "In conformity-assessment terms, certification applies to a product, process, service, management system or person: a certification body attests that the thing conforms to a specified standard. Accreditation applies one level up — to the organization itself. It is formal recognition that a laboratory, inspection body, certification body, healthcare organization or training provider is competent and impartial in the work it performs. In short: certification says the output conforms; accreditation says the organization producing that output is competent to say so.",
  },
  {
    q: "Who accredits the accreditation bodies?",
    a: "ILAC and IAF are the international organizations for accreditation bodies operating in accordance with ISO/IEC 17011 and involved in the accreditation of conformity assessment bodies, including laboratories, inspection bodies and certification bodies. In healthcare, ISQua — the International Society for Quality in Health Care — performs external evaluation of accreditation standards and of the organizations that set them.",
  },
  {
    q: "What is ISO/IEC 17011?",
    a: "ISO/IEC 17011 is the international standard that sets out the requirements accreditation bodies themselves operate to. It is the reference framework used by ILAC and IAF for the accreditation of conformity assessment bodies such as laboratories, inspection bodies and certification bodies.",
  },
  {
    q: "Is AAA internationally recognized?",
    a: "AAA is an institutional member of the International Society for Quality in Health Care (ISQua), which has been working to improve the quality and safety of health care worldwide for over 30 years. The AAA Accreditation Standards for Healthcare Facilities have been assessed and accredited by ISQua EEA against the Guidelines and Principles for the Development of Health and Social Care Standards, 5th Edition.",
  },
  {
    q: "Which organizations can apply to AAA for accreditation?",
    a: "AAA accredits healthcare organizations, training providers, schools, testing and calibration laboratories (ISO/IEC 17025), medical laboratories (ISO 15189), personnel certification bodies (ISO/IEC 17024), management systems certification bodies (ISO/IEC 17021-1), product certification bodies (ISO/IEC 17065), inspection bodies (ISO/IEC 17020) and proficiency testing providers (ISO/IEC 17043). AAA serves organizations in 58 countries.",
  },
  {
    q: "How does the AAA accreditation process work?",
    a: "Although there may be certain differences from one application to another, the general process remains the same for all candidate bodies and follows four stages: Application, Document Review, Assessment and Decision.",
  },
];

export default function Page() {
  return (
    <main className="axp aax">
      <JsonLd
        schema={[
          breadcrumbSchema([{ name: "About Accreditation", path: "/about-accreditation" }]),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        image="/home/conformity.jpg"
        eyebrow="About Accreditation"
        badge="Explainer · Conformity assessment"
        title={
          <>
            What accreditation is — and why it <em>matters.</em>
          </>
        }
        intro="Accreditation is a formal process by which a recognized body evaluates and certifies that an institution meets predefined and established quality standards. This page explains what that means, how accreditation differs from certification, and who holds the accreditors to account."
        crumbs={[{ label: "About Accreditation" }]}
        caption={{
          kicker: "Conformity assessment",
          title: "Competence, impartiality and consistency — independently verified",
          chip: "ISO/IEC 17011 framework",
        }}
        meta={[
          { k: "Reference framework", v: "ISO/IEC 17011" },
          { k: "International bodies", v: "ILAC · IAF" },
          { k: "AAA programs", v: "10" },
          { k: "Countries served", v: "58" },
        ]}
        actions={
          <>
            <Link href="/apply" className="ax-btn ax-btn-gold">
              Apply for Accreditation <Icon name="arrow" size={14} />
            </Link>
            <Link href="/documents" className="ax-btn ax-btn-ghost">
              Read the requirements
            </Link>
          </>
        }
      />

      {/* 01 — The definition */}
      <section className="ax-section" id="definition">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">The definition</span>
                <h2>Accreditation, plainly stated.</h2>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <p style={{ marginTop: 24 }}>
                Accreditation exists to answer one question that no organization can credibly
                answer about itself: <strong>is this body competent, impartial and consistent
                in the work it performs?</strong> An accreditation body answers it from the
                outside, against published standards, on the basis of evidence gathered during an
                assessment.
              </p>
              <p>
                AAA is a third-party accreditation body that delivers accreditation services
                according to various international standards. It is authorized by the State
                Corporation Commission of the Commonwealth of Virginia to transact its business
                under Title 13.1 of the Code of Virginia and to offer a full range of
                comprehensive accreditation services.
              </p>
              <ul className="ax-checks">
                <li>Evaluated against predefined, published quality standards</li>
                <li>Performed by a recognized third party, not by the organization itself</li>
                <li>Evidence-based: document review followed by on-site assessment</li>
                <li>Decided independently of the team that carried out the assessment</li>
              </ul>
            </div>

            <div className="aax-def reveal">
              <span className="ax-ico aax-def-mark" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.6 6.4v3.2c-1.7.5-2.6 1.6-2.7 3.4H9.6V18H3.9v-5c0-3.9 1.9-6.1 5.7-6.6zm10.5 0v3.2c-1.7.5-2.6 1.6-2.7 3.4h2.7V18h-5.7v-5c0-3.9 1.9-6.1 5.7-6.6z" />
                </svg>
              </span>
              <p>
                Accreditation is a formal process by which a recognized body evaluates and
                certifies that an institution meets predefined and established quality standards.
                The accreditation process aims to enhance service quality and ensure safety
                through compliance with global standards.
              </p>
              <cite>American Accreditation Association</cite>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Accreditation vs certification */}
      <section className="ax-section cream" id="vs-certification">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Often confused</span>
            <h2>Accreditation is not certification.</h2>
            <p>
              The two words are used interchangeably in everyday speech, but in conformity
              assessment they sit at different levels. One assesses the output; the other assesses
              the organization producing it.
            </p>
          </div>

          <div className="aax-vs" style={{ marginTop: "clamp(30px, 3.4vw, 46px)" }}>
            <article className="aax-vs-card lead reveal">
              <span className="aax-vs-tag">Accreditation</span>
              <h3>Recognition of the organization</h3>
              <p>
                Formal recognition that a body — a laboratory, an inspection body, a certification
                body, a healthcare organization, a training provider or a school — is competent
                and impartial in the work it performs, granted by a third-party accreditation body
                such as AAA.
              </p>
              <dl className="aax-vs-facts">
                <div>
                  <dt>Applies to</dt>
                  <dd>The organization and its defined scope of activity</dd>
                </div>
                <div>
                  <dt>Answers</dt>
                  <dd>&ldquo;Is this body competent and impartial?&rdquo;</dd>
                </div>
                <div>
                  <dt>Granted by</dt>
                  <dd>An accreditation body</dd>
                </div>
                <div>
                  <dt>Framework</dt>
                  <dd>ISO/IEC 17011 and the standard for the activity being accredited</dd>
                </div>
              </dl>
            </article>

            <article className="aax-vs-card reveal">
              <span className="aax-vs-tag">Certification</span>
              <h3>Attestation about the output</h3>
              <p>
                Attestation that a product, process, service, management system or person conforms
                to a specified standard — for example ISO 9001 certification of a management
                system, or certification of an individual&rsquo;s competence against a scheme.
              </p>
              <dl className="aax-vs-facts">
                <div>
                  <dt>Applies to</dt>
                  <dd>A product, process, service, system or person</dd>
                </div>
                <div>
                  <dt>Answers</dt>
                  <dd>&ldquo;Does this conform to the standard?&rdquo;</dd>
                </div>
                <div>
                  <dt>Granted by</dt>
                  <dd>A certification body</dd>
                </div>
                <div>
                  <dt>Framework</dt>
                  <dd>The scheme or standard being certified against</dd>
                </div>
              </dl>
            </article>
          </div>

          <div className="ax-note gold reveal" style={{ marginTop: 20 }}>
            <span>
              <strong>Where the two meet</strong>
              A certification body issues certificates; an accreditation body accredits the
              certification body. That is exactly what AAA does under{" "}
              <Link href="/programs/iso-17021">
                Management Systems Certification Bodies Accreditation (ISO/IEC 17021-1)
              </Link>{" "}
              — so the certificates that body issues carry independently verified competence
              behind them.
            </span>
          </div>
        </div>
      </section>

      {/* 03 — Who accredits the accreditors */}
      <section className="ax-section navy" id="framework">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">The international framework</span>
                <h2>Who accredits the accreditors?</h2>
                <p>
                  Accreditation bodies are not a law unto themselves. They work to a published
                  standard of their own, and they are subject to external evaluation.
                </p>
              </div>
              <ul className="ax-checks" style={{ marginTop: 26 }}>
                <li>
                  <strong style={{ color: "#fff" }}>ILAC</strong>&nbsp;and&nbsp;
                  <strong style={{ color: "#fff" }}>IAF</strong>&nbsp;are the international
                  organizations for accreditation bodies operating in accordance with ISO/IEC
                  17011 and involved in the accreditation of conformity assessment bodies —
                  including laboratories, inspection bodies and certification bodies.
                </li>
                <li>
                  <strong style={{ color: "#fff" }}>ISO/IEC 17011</strong>&nbsp;is the reference
                  standard for the accreditation bodies themselves — the requirements they operate
                  to when assessing others.
                </li>
                <li>
                  <strong style={{ color: "#fff" }}>ISQua</strong>&nbsp;— the International Society
                  for Quality in Health Care — has been working to improve the quality and safety
                  of health care worldwide for over 30 years through education, knowledge sharing,
                  external evaluation, and support for health systems around the world. AAA is an
                  institutional member.
                </li>
              </ul>
            </div>

            <div className="ax-steps-panel reveal">
              <h3>AAA&rsquo;s external recognition</h3>
              <ol className="ax-steps">
                <li className="ax-step">
                  <span className="ax-step-num" aria-hidden="true">
                    1
                  </span>
                  <div className="ax-step-body">
                    <b>ISQua institutional membership</b>
                    <span>
                      AAA is an institutional member of the International Society for Quality in
                      Health Care.
                    </span>
                  </div>
                </li>
                <li className="ax-step">
                  <span className="ax-step-num" aria-hidden="true">
                    2
                  </span>
                  <div className="ax-step-body">
                    <b>Standards assessed by ISQua EEA</b>
                    <span>
                      The AAA Accreditation Standards for Healthcare Facilities have been assessed
                      and accredited by ISQua EEA against the Guidelines and Principles for the
                      Development of Health and Social Care Standards, 5th Edition.
                    </span>
                  </div>
                </li>
                <li className="ax-step">
                  <span className="ax-step-num" aria-hidden="true">
                    3
                  </span>
                  <div className="ax-step-body">
                    <b>Standards built with the sector</b>
                    <span>
                      AAA accreditation programs were created according to the international
                      requirements of ISQua and in consultation with 174 international healthcare
                      experts.
                    </span>
                  </div>
                </li>
                <li className="ax-step">
                  <span className="ax-step-num" aria-hidden="true">
                    4
                  </span>
                  <div className="ax-step-body">
                    <b>Impartiality held open to scrutiny</b>
                    <span>
                      AAA publishes its Safeguarding Impartiality Policy and operates an impartial
                      complaints and appeals procedure open to all stakeholders.
                    </span>
                  </div>
                </li>
              </ol>
              <span className="ax-pill">
                <span className="ax-ico" aria-hidden="true">
                  <LineIcon strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </LineIcon>
                </span>
                Read the{" "}
                <Link href="/impartiality-policy" style={{ color: "var(--aaa-gold-100)" }}>
                  Safeguarding Impartiality Policy
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Benefits */}
      <section className="ax-section" id="benefits">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Why it matters</span>
            <h2>The benefits of accreditation, by audience.</h2>
            <p>
              Accreditation is not a badge. It removes duplicated work, gives regulators something
              defensible to rely on, opens tenders, and lets buyers compare results across borders.
            </p>
          </div>

          <div className="ax-grid four">
            {BENEFITS.map((b, i) => (
              <article
                className="ax-card aax-benefit reveal"
                key={b.audience}
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <div className="ax-card-top">
                  <span className="ax-ico ax-card-ico" aria-hidden="true">
                    <LineIcon>{b.icon}</LineIcon>
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <span className="ax-label" style={{ marginTop: 16, marginBottom: 0 }}>
                  {b.audience}
                </span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — Programs */}
      <section className="ax-section cream" id="programs">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">What AAA accredits</span>
            <h2>Ten accreditation programs, all built on international standards.</h2>
            <p>
              AAA&rsquo;s services span healthcare, education and the full range of conformity
              assessment bodies. Each program has its own standard, its own scope definition and
              its own application pack.
            </p>
            <span className="ax-rule" aria-hidden="true" />
          </div>

          <div className="aax-programs" style={{ marginTop: "clamp(30px, 3.4vw, 46px)" }}>
            {PROGRAMS.map((p, i) => (
              <Link
                className="aax-program reveal"
                href={p.href}
                key={p.href}
                style={{ transitionDelay: `${i * 35}ms` }}
              >
                <span className="ax-ico aax-program-ico" aria-hidden="true">
                  <LineIcon>{p.icon}</LineIcon>
                </span>
                <span className="aax-program-txt">
                  <b>{p.name}</b>
                  <span>{p.standard}</span>
                </span>
                <Icon name="arrow" size={14} />
              </Link>
            ))}
          </div>

          <div className="ax-actions reveal">
            <Link href="/documents" className="ax-btn ax-btn-ghost-navy">
              <Icon name="doc" size={14} /> Browse the document library
            </Link>
            <Link href="/apply" className="ax-btn ax-btn-blue">
              Apply for Accreditation <Icon name="arrow" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 06 — How it works */}
      <section className="ax-section" id="process">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">How it works</span>
            <h2>Four stages, the same for every applicant.</h2>
            <p>
              Although there may be certain differences from one application to another, the
              general process remains the same for all candidate bodies.
            </p>
          </div>

          <div className="ax-split top">
            <div className="ax-steps-panel reveal">
              <h3>The accreditation route</h3>
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
                Accredited organizations are registered in the ADCP
              </span>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <LineIcon>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M12 12v6M9 15l3 3 3-3" />
                </LineIcon>
              </span>
              <h3>Read before you apply</h3>
              <p>
                Every requirement AAA assesses against is published. Start with the general
                requirements and the AAA Accreditation Standards, then pick up the application form
                for your program.
              </p>
              <Link href="/apply" className="ax-btn ax-btn-blue">
                Start an application <Icon name="arrow" size={14} />
              </Link>
              <p className="ax-panel-note">
                Not sure which program fits? Tell us your sector and the countries you operate in
                and an advisor will scope it with you.
              </p>
              <ul className="ax-docs">
                <li className="ax-docs-title">Core documents</li>
                <li>
                  <a href={GENERAL_REQUIREMENTS} target="_blank" rel="noopener noreferrer">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                      </LineIcon>
                    </span>
                    General requirements for accreditation
                    <i>PDF</i>
                  </a>
                </li>
                <li>
                  <a href={STANDARDS_PDF} target="_blank" rel="noopener noreferrer">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                      </LineIcon>
                    </span>
                    AAA Accreditation Standards
                    <i>PDF</i>
                  </a>
                </li>
                <li>
                  <Link href="/documents">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="M3 10h18M8 15h8" />
                      </LineIcon>
                    </span>
                    All application forms &amp; policies
                    <i>Library</i>
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 07 — FAQ */}
      <section className="ax-section cream" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Accreditation, answered.</h2>
            <p>
              The questions organizations and buyers most often ask about what accreditation is and
              what it is worth.
            </p>
          </div>
          <div className="ax-faq-list single">
            {FAQ.map((item, i) => (
              <details className="ax-faq-item reveal" key={item.q} open={i === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="ax-faq-plus" aria-hidden="true" />
                </summary>
                <div className="ax-faq-a">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA
        eyebrow="International accreditation"
        title={
          <>
            International accreditation, <em>accepted globally.</em>
          </>
        }
        text="Tell us your sector, the standards that apply and the countries you operate in. Our team will scope your accreditation and come back with a tailored quote."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Speak with an advisor" }}
        related={[
          { href: "/documents", label: "Document library" },
          { href: "/faq", label: "FAQ" },
          { href: "/partnerships", label: "Partnerships" },
          { href: "/advisory-committees", label: "Advisory committees" },
        ]}
      />
    </main>
  );
}
