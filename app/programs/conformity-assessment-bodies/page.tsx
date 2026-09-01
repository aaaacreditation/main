import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "../../_components/CTA";
import Icon from "../../_components/Icon";
import type { IconName } from "../../_components/Icon";
import JsonLd from "../../_components/JsonLd";
import PageHero from "../../_components/PageHero";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";
import "./cab.css";

const PATH = "/programs/conformity-assessment-bodies";

export const metadata: Metadata = pageMeta({
  title: "Conformity Assessment Bodies Accreditation",
  description:
    "AAA accredits inspection bodies, laboratories and certification bodies to ISO/IEC 17020, 17021-1, 17024, 17025, 17043, 17065, ISO 15189 and the Halal schemes.",
  path: PATH,
  keywords: [
    "conformity assessment body accreditation",
    "ISO/IEC 17025 accreditation",
    "ISO/IEC 17020 accreditation",
    "ISO 15189 accreditation",
    "Halal accreditation",
  ],
});

/* ------------------------------------------------------------------ data */

type Scheme = {
  icon: IconName;
  title: string;
  standard: string;
  href: string;
  desc: string;
};

const SCHEMES: Scheme[] = [
  {
    icon: "search",
    title: "Inspection Bodies Accreditation",
    standard: "ISO/IEC 17020",
    href: "/programs/iso-17020",
    desc: "For Type A, B and C bodies that examine materials, products, installations, plant, processes or services and report on their conformity.",
  },
  {
    icon: "cert",
    title: "Management Systems Certification Bodies Accreditation",
    standard: "ISO/IEC 17021-1",
    href: "/programs/iso-17021",
    desc: "For bodies certifying management systems — audit programmes, competence of audit teams, certification decisions and the surveillance cycle.",
  },
  {
    icon: "shield",
    title: "Personnel Certification Bodies Accreditation",
    standard: "ISO/IEC 17024",
    href: "/programs/iso-17024",
    desc: "For bodies certifying individuals through documented schemes, with examinations designed to be fair, valid, reliable and secure.",
  },
  {
    icon: "flask",
    title: "Testing & Calibration Laboratories Accreditation",
    standard: "ISO/IEC 17025",
    href: "/programs/iso-17025",
    desc: "For testing and calibration laboratories: methods, equipment, metrological traceability to the SI and evaluation of measurement uncertainty.",
  },
  {
    icon: "medical",
    title: "Medical Laboratories Accreditation",
    standard: "ISO 15189",
    href: "/programs/iso-15189",
    desc: "For clinical, pathology and reference laboratories, across the pre-examination, examination and post-examination phases of the patient pathway.",
  },
  {
    icon: "industry",
    title: "Product Certification Bodies Accreditation",
    standard: "ISO/IEC 17065",
    href: "/programs/iso-17065",
    desc: "For bodies certifying products, processes and services against public or private schemes that support market access.",
  },
  {
    icon: "chart",
    title: "Proficiency Testing Providers Accreditation",
    standard: "ISO/IEC 17043",
    href: "/programs/iso-17043",
    desc: "For providers that design proficiency testing schemes and evaluate laboratory performance against criteria set before the round begins.",
  },
  {
    icon: "globe",
    title: "Halal Certification Bodies Accreditation",
    standard: "Halal",
    href: "/programs/iso-17065",
    desc: "For bodies certifying products and services as halal to OIC/SMIIC 2, S 2055-2:2021 and GSO 2055-2:2021, alongside ISO/IEC 17065.",
  },
];

/* Benefits copy is the client's own "Benefits of Accreditation" text. */
const AUDIENCES: { icon: IconName; label: string; items: string[] }[] = [
  {
    icon: "globe",
    label: "To industry and trade",
    items: [
      "Accreditation facilitates trade",
      "Eliminates the need for repetitive testing, certification, and inspection",
    ],
  },
  {
    icon: "scale",
    label: "To regulators",
    items: [
      "Accreditation provides a reliable and impartial basis for sound decision-making",
    ],
  },
  {
    icon: "cert",
    label: "To conformity assessment service providers",
    items: [
      "A means of demonstrating your competence to your clients",
      "An effective marketing tool and a passport to submit tenders to contractors that require independently verified conformity assessment service providers",
    ],
  },
  {
    icon: "check",
    label: "To users of accredited services and consumers",
    items: [
      "Your guarantee of reliable and comparable conformity assessment results",
      "Accreditation increases the reliability of products",
    ],
  },
];

const COMMON = [
  {
    t: "Impartiality",
    d: "Every standard in this family starts in the same place: can the body reach a conclusion that is not shaped by who is paying for it? Assessment examines ownership, governance, financing and personnel, the risks to impartiality those create, and the safeguards applied to each one.",
  },
  {
    t: "Competence",
    d: "Qualification criteria, training, authorization and ongoing monitoring for everyone whose judgement affects a result — inspectors, analysts, examiners, auditors, and the people who take the final decision.",
  },
  {
    t: "Controlled processes",
    d: "Documented methods and procedures applied consistently, with the facilities, equipment and measurement traceability that each activity requires, and validation where a method is non-standard.",
  },
  {
    t: "Records and reporting",
    d: "Results must be traceable back to what was actually done. Assessment covers technical records, authorized signatories, and the content of reports, certificates and scope statements.",
  },
  {
    t: "Management system and appeals",
    d: "Internal audit, management review and corrective action, together with impartial routes for anyone who wants to complain about the body or appeal a decision it has taken.",
  },
];

const PROCESS = [
  {
    t: "Application",
    d: "Submit the application form for your activity, setting out the scope you want accredited, the sites involved and your supporting documentation.",
  },
  {
    t: "Document review",
    d: "AAA reviews the submission against the anchor standard and the general requirements, then confirms the assessment plan, the team and the fees.",
  },
  {
    t: "Assessment",
    d: "Qualified assessors evaluate conformity on site, remotely or in a hybrid arrangement, including witnessing your people carrying out real work where the standard requires it.",
  },
  {
    t: "Corrective action",
    d: "Any findings are addressed by your team, and evidence that the correction was effective is reviewed and accepted before the file moves on.",
  },
  {
    t: "Accreditation decision",
    d: "An independent decision panel — separate from the assessment team — grants accreditation and issues the certificate and the scope schedule.",
  },
  {
    t: "Surveillance and reassessment",
    d: "Annual surveillance keeps the accreditation live across the three-year cycle, followed by a full reassessment before renewal.",
  },
];

const GENERAL_DOCS = [
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
    label: "Requirements for accreditation of multi-site conformity assessment bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-Accreditation-of-multi-site-conformity-assessment-bodies-.pdf",
    meta: "PDF",
  },
];

const FAQ = [
  {
    q: "What is the difference between certification and accreditation?",
    a: "Certification is a statement about an organization, a product or a person, issued by a certification body. Accreditation is a statement about that body: independent confirmation that it is competent, impartial and consistent in the work it performs. AAA accredits conformity assessment bodies — the certificates their clients hold are issued by those bodies, not by AAA.",
  },
  {
    q: "Which standard applies to my organization?",
    a: "It follows the activity. Examining items or installations and reporting on their conformity is inspection (ISO/IEC 17020). Certifying management systems is ISO/IEC 17021-1, certifying people is ISO/IEC 17024, and certifying products, processes or services is ISO/IEC 17065. Testing and calibration laboratories work to ISO/IEC 17025, medical laboratories to ISO 15189, and organizations running interlaboratory comparisons to ISO/IEC 17043.",
  },
  {
    q: "Can one organization hold more than one accreditation?",
    a: "Yes. Many bodies hold two or more — for example inspection and testing, or management system and product certification. Each activity is assessed against its own standard and carries its own scope, and the body must be able to show that combining the activities does not compromise impartiality.",
  },
  {
    q: "How long does accreditation last?",
    a: "AAA accreditation is granted for a three-year cycle with annual surveillance assessments, followed by a full reassessment before the cycle is renewed. Changes to your scope, key personnel or sites are notified to AAA and may lead to an extension-to-scope assessment.",
  },
  {
    q: "We operate from several sites — how is that handled?",
    a: "Multi-site arrangements are assessed against AAA's Requirements for accreditation of multi-site conformity assessment bodies, published alongside the general requirements. Read it before applying, because it affects how you describe your sites on the application form and how the assessment is planned.",
  },
];

/* ---------------------------------------------------------------- page */

export default function Page() {
  return (
    <div className="cabx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Conformity Assessment Bodies Accreditation", path: PATH },
          ]),
          serviceSchema({
            name: "Conformity Assessment Bodies Accreditation",
            description:
              "AAA accreditation programs for inspection bodies, management system, personnel and product certification bodies, testing, calibration and medical laboratories, proficiency testing providers and Halal certification bodies.",
            path: PATH,
            audience: "Conformity assessment bodies",
          }),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        image="/home/conformity.jpg"
        eyebrow="Accreditation Programs"
        badge="Conformity Assessment Bodies"
        title={
          <>
            Conformity assessment bodies <em>accreditation.</em>
          </>
        }
        intro="Accreditation for the inspection bodies, laboratories and certification bodies whose results the rest of the economy relies on — each assessed against the ISO/IEC standard written for its activity."
        crumbs={[{ label: "Conformity Assessment Bodies" }]}
        caption={{
          kicker: "AAA accreditation",
          title: "Competence, impartiality, consistency",
          chip: "8 schemes",
        }}
        actions={
          <>
            <Link href="/apply" className="ax-btn ax-btn-gold">
              Apply for Accreditation <Icon name="arrow" size={14} />
            </Link>
            <Link href="#programs" className="ax-btn ax-btn-ghost">
              Browse the programs
            </Link>
          </>
        }
        meta={[
          { k: "Accreditation schemes", v: "8" },
          { k: "Accredited organizations", v: "200+" },
          { k: "Countries served", v: "58+" },
          { k: "Assessors & experts", v: "100+" },
        ]}
      />

      {/* --------------------------------------------------- What it means -- */}
      <section className="ax-section" id="what-it-is">
        <div className="container">
          <div className="ax-split top wide-left">
            <div>
              <div className="ax-head">
                <span className="eyebrow">The short version</span>
                <h2>What conformity assessment accreditation is</h2>
                <span className="ax-rule" />
              </div>
              <div className="ax-prose" style={{ marginTop: 24 }}>
                <p>
                  Accreditation is a formal process by which a recognized body evaluates and
                  certifies that an institution meets predefined and established quality
                  standards. The accreditation process aims to enhance service quality, and
                  ensure safety through compliance with global standards.
                </p>
                <p>
                  <strong>Conformity assessment</strong> is the umbrella term for the activities
                  that establish whether something meets a requirement — testing it, calibrating
                  the instruments used to measure it, inspecting it, or certifying a product, a
                  management system or a person. Accreditation sits one layer above: an
                  independent judgement of whether the body doing that work is competent,
                  impartial and consistent.
                </p>
                <p>
                  That distinction matters commercially. A certificate is only as good as the
                  body that issued it, which is why regulators, purchasers and tender conditions
                  increasingly ask not just for a certificate but for one issued under
                  accreditation.
                </p>
                <p>
                  Internationally, accreditation bodies work to ISO/IEC 17011, and each
                  conformity assessment activity has its own anchor standard: ISO/IEC 17020 for
                  inspection, ISO/IEC 17021-1 for management systems certification, ISO/IEC 17024
                  for certification of persons, ISO/IEC 17025 for testing and calibration,
                  ISO 15189 for medical laboratories, ISO/IEC 17065 for product certification and
                  ISO/IEC 17043 for proficiency testing. AAA is a third-party accreditation body
                  that delivers accreditation services according to these international
                  standards.
                </p>
              </div>
            </div>

            <aside className="ax-panel">
              <span className="ax-panel-ico ax-ico">
                <Icon name="clipboard" size={28} />
              </span>
              <h3>Not sure which program applies?</h3>
              <p>
                Tell us what your organization actually does — what you examine, test, certify
                or compare — and we will confirm the applicable standard, the scope you can
                apply for and what the assessment will involve.
              </p>
              <Link href="/contact" className="ax-btn ax-btn-blue">
                Talk to an assessor <Icon name="arrow" size={14} />
              </Link>
              <p className="ax-panel-note">
                Ready to move? <Link href="/quote" className="ax-link">Request a quote</Link> or{" "}
                <Link href="/apply" className="ax-link">start an application</Link>.
              </p>

              <ul className="ax-docs">
                <li className="ax-docs-title">Applies to every program</li>
                {GENERAL_DOCS.map((d) => (
                  <li key={d.label}>
                    <a href={d.href}>
                      <span className="ax-ico">
                        <Icon name="doc" size={16} />
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

      {/* ------------------------------------------------ Scheme directory -- */}
      <section className="ax-section fade" id="programs">
        <div className="container">
          <div className="ax-head center">
            <span className="eyebrow">Program directory</span>
            <h2>Choose the accreditation path that matches your activity</h2>
            <p>
              Eight accreditation schemes across seven programs. Each one is assessed against
              the relevant international standard, with the competence, impartiality, reporting
              and surveillance requirements tailored to the service being accredited.
            </p>
          </div>

          <div className="ax-grid four">
            {SCHEMES.map((s) => (
              <Link className="ax-card cabx-scheme" href={s.href} key={s.title}>
                <div className="ax-card-top">
                  <span className="ax-card-ico ax-ico">
                    <Icon name={s.icon} size={22} />
                  </span>
                  <span className="cabx-std">{s.standard}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <span className="ax-card-rule" />
                <span className="ax-card-go">
                  Explore program <Icon name="arrow" size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Benefits -- */}
      <section className="ax-section cream" id="benefits">
        <div className="container">
          <div className="ax-head center">
            <span className="eyebrow">Benefits of accreditation</span>
            <h2>Who accreditation is worth something to</h2>
            <p>
              Accreditation is rarely bought for its own sake. It earns its place because four
              different audiences get something concrete from it.
            </p>
          </div>

          <div className="ax-grid four">
            {AUDIENCES.map((a) => (
              <article className="ax-card cabx-audience" key={a.label}>
                <div className="ax-card-top">
                  <span className="ax-card-ico ax-ico light">
                    <Icon name={a.icon} size={22} />
                  </span>
                </div>
                <h3>{a.label}</h3>
                <ul className="ax-checks">
                  {a.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <span className="ax-card-rule" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------- What gets assessed -- */}
      <section className="ax-section fade-up" id="assessed">
        <div className="container">
          <div className="ax-split">
            <div>
              <div className="ax-head">
                <span className="eyebrow">Common ground</span>
                <h2>What every AAA accreditation assesses</h2>
                <span className="ax-rule" />
                <p>
                  The technical requirements differ by standard, but five themes run through all
                  eight schemes. If you are preparing an application, these are the areas worth
                  looking at first.
                </p>
              </div>

              <ol className="ax-reasons">
                {COMMON.map((c, i) => (
                  <li className="ax-reason" key={c.t}>
                    <span className="ax-reason-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h3>{c.t}</h3>
                      <p>{c.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <figure className="ax-photo cabx-figure">
              <Image
                src="/about/team-committee.jpg"
                alt="An AAA accreditation decision panel reviewing an assessment file"
                fill
                sizes="(max-width: 980px) 100vw, 520px"
              />
              <span className="ax-photo-badge">Independent decision</span>
              <figcaption>
                Accreditation decisions are taken separately from the assessment team.
                <span>Assessment · review · decision · surveillance</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Process -- */}
      <section className="ax-section" id="process">
        <div className="container">
          <div className="ax-head center">
            <span className="eyebrow">How it works</span>
            <h2>The accreditation process</h2>
            <p>
              The route is the same for every program in this family. What changes is the
              anchor standard your organization is assessed against and the scope you apply for.
            </p>
          </div>

          <div className="ax-split wide-left top">
            <div className="ax-steps-panel">
              <h3>Step by step</h3>
              <ol className="ax-steps">
                {PROCESS.map((s, i) => (
                  <li className="ax-step" key={s.t}>
                    <span className="ax-step-num">{i + 1}</span>
                    <span className="ax-step-body">
                      <b>{s.t}</b>
                      <span>{s.d}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <span className="ax-pill">
                <span className="ax-ico">
                  <Icon name="shield" size={14} />
                </span>
                Accreditation is valid for 3 years, with annual surveillance
              </span>
            </div>

            <div className="ax-panel">
              <span className="ax-panel-ico ax-ico">
                <Icon name="doc" size={28} />
              </span>
              <h3>Before you apply</h3>
              <p>
                Each program has its own application form and, where one exists, a checklist
                against the anchor standard. Three documents apply to every program in this
                family — read them first.
              </p>
              <ul className="ax-docs">
                {GENERAL_DOCS.map((d) => (
                  <li key={d.label}>
                    <a href={d.href}>
                      <span className="ax-ico">
                        <Icon name="doc" size={16} />
                      </span>
                      {d.label}
                      <i>{d.meta}</i>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="ax-panel-note">
                Program-specific forms are on each program page, and the full library is in{" "}
                <Link href="/documents" className="ax-link">Documents</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ FAQ -- */}
      <section className="ax-section cream" id="faq">
        <div className="container">
          <div className="ax-head center">
            <span className="eyebrow">Questions</span>
            <h2>Frequently asked questions</h2>
            <p>Common questions about accreditation for conformity assessment bodies.</p>
          </div>
          <div className="ax-faq-list">
            {FAQ.map((f) => (
              <details className="ax-faq-item" key={f.q}>
                <summary>
                  {f.q}
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

      <CTA
        eyebrow="Next step"
        title="Ready to have your conformity assessment work accredited?"
        text="Tell us what your organization does, the scope you want accredited and the sites involved. We will confirm the applicable standard and requirements, then come back with a tailored quote."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/quote", label: "Request a Quote" }}
        related={[
          { href: "/programs/iso-17021", label: "Management Systems Certification Bodies" },
          { href: "/programs/iso-17025", label: "Testing & Calibration Laboratories" },
          { href: "/programs/iso-15189", label: "Medical Laboratories" },
          { href: "/documents", label: "Documents" },
        ]}
      />
    </div>
  );
}
