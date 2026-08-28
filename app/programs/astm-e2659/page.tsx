import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "../../_components/CTA";
import Icon from "../../_components/Icon";
import JsonLd from "../../_components/JsonLd";
import PageHero from "../../_components/PageHero";
import { CONTACT, PROGRAMS } from "../../../lib/facts";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";

/* -------------------------------------------------------------------------
   Content is the client's own copy, recovered from the live site:
   aaa-accreditation.org/wp-json/wp/v2/pages/3454 — the fields and majors
   covered, what an assessment evaluates, the seven benefits (mark of quality,
   ADAO, ADCP, webinars, raising standards, marketing pack, staying informed)
   and the four related documents. Nothing invented.

   This is the standard-anchored page for the program. The buyer-facing
   program page lives at /programs/training-education and the two link to
   each other rather than repeating one another.
   ------------------------------------------------------------------------- */

const PATH = "/programs/astm-e2659";

export const metadata: Metadata = pageMeta({
  title: "Certificate Programs Accreditation (ASTM E2659)",
  description:
    "AAA accredits training and education providers to the international American standard ASTM E2659 — competence, qualified trainers and compliant curricula.",
  path: PATH,
  keywords: [
    "ASTM E2659",
    "certificate program accreditation",
    "training provider accreditation standard",
    "ADAO",
    "ADCP",
  ],
});

const APPLICATION_FORM =
  "https://aaa-accreditation.org/wp-content/uploads/2023/01/Application-form-Training-education-providers.docx";

const DOCUMENTS: { label: string; href: string; meta: string }[] = [
  {
    label: "Guideline for accreditation of training providers",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Guidline-for-accreditation-of-training-providers.pdf",
    meta: "PDF",
  },
  {
    label: "Application form for training & education providers",
    href: APPLICATION_FORM,
    meta: "DOCX",
  },
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
];

function LineIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** What accreditation to ASTM E2659 requires a provider to demonstrate. */
const DEMONSTRATE = [
  "That the organization delivering the training is competent.",
  "That its trainers are qualified for the subjects they teach.",
  "That its curricula meet the requirements of the standard.",
];

/** Fields and majors covered, from the client's live page. */
const FIELDS = [
  "Managerial and business courses",
  "Social and humanitarian programs",
  "Media and communication",
  "Information technology",
  "Vocational courses",
  "Continuing learning",
  "Blended learning",
  "All other types of training and scopes",
];

/** What the accreditation process evaluates. */
const EVALUATED: { title: string; text: string }[] = [
  {
    title: "Corporate structure",
    text: "The legal identity, governance and management arrangements of the organization delivering the training.",
  },
  {
    title: "Facilities",
    text: "The venues, equipment and learning environments used to deliver courses, including online platforms for blended and e-learning.",
  },
  {
    title: "Staffing",
    text: "The qualifications, subject experience and teaching competence of trainers, and the records that evidence them.",
  },
  {
    title: "Curriculum",
    text: "Learning outcomes, course materials and how the curriculum is kept aligned with the Body of Knowledge.",
  },
  {
    title: "Product development",
    text: "How new courses are designed, reviewed and revised, and how learner feedback feeds back into the material.",
  },
  {
    title: "Administration",
    text: "Enrolment, records, certification and the day-to-day controls that keep delivery consistent.",
  },
];

/** The seven benefits AAA publishes for this program. */
const BENEFITS: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Mark of quality",
    text: "AAA is an independent, well-established and globally recognized accreditation body. Once accredited, an organization can display the appropriate AAA logo and accreditation statement on its publicity materials.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Listing on the ADAO",
    text: "Accredited organizations are listed on the American Directory of Accredited Organizations, providing information for external agencies, partners and prospective trainees about the organization and the courses it offers.",
    icon: (
      <>
        <path d="M3 21h18M5 21V9l7-5 7 5v12" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
  },
  {
    title: "Listing on the ADCP",
    text: "People trained and certified by an accredited provider are listed on the American Directory for Competent Personnel, providing information for the public about the person and the certificate achieved.",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6M22 11h-6" />
      </>
    ),
  },
  {
    title: "Webinar service",
    text: "Accredited organizations receive invitations to join webinars covering a variety of topics designed for training providers and the standards that apply to them.",
    icon: (
      <>
        <path d="m16 9 5-3v12l-5-3z" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </>
    ),
  },
  {
    title: "Raising standards",
    text: "AAA assessments are conducted by highly experienced assessors with extensive knowledge of the sector, who provide invaluable advice on your quality assurance processes through the assessment.",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 15 4-4 3 3 5-6" />
      </>
    ),
  },
  {
    title: "Marketing support pack",
    text: "Accredited organizations are provided with free marketing resources — logos, symbols and statements — to support stakeholder engagement, marketing campaigns and business development.",
    icon: (
      <>
        <path d="M3 11v3a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z" />
        <path d="M16 9a4 4 0 0 1 0 6" />
      </>
    ),
  },
  {
    title: "Staying informed",
    text: "Continual advice and updates on sector changes are provided through regular newsletters, posts on the AAA website and social media.",
    icon: (
      <>
        <path d="M4 4h16v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
];

const STEPS: { title: string; text: string }[] = [
  {
    title: "Application",
    text: "Download and complete the application form for training and education providers, describing your organization, your courses and the scope you are requesting.",
  },
  {
    title: "Document review",
    text: "AAA reviews your curricula, trainer records and operational controls against ASTM E2659 and the general requirements for accreditation.",
  },
  {
    title: "Assessment",
    text: "Experienced assessors evaluate your corporate structure, facilities, staffing, curriculum, product development and administration.",
  },
  {
    title: "Decision & listing",
    text: "An independent decision is taken, your accredited scope is issued, and your organization and certified learners are listed on the ADAO and ADCP.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is ASTM E2659?",
    a: "ASTM E2659 is the international American standard on which AAA bases the accreditation of education and training service providers. Accreditation to the standard requires a provider to demonstrate that it is competent, that its trainers are qualified and that its curricula meet the requirements.",
  },
  {
    q: "Which organizations can be accredited to ASTM E2659?",
    a: "Education and training service providers — academies, centres, agencies and organizations — that deliver training courses across fields and majors such as managerial, social, humanitarian, media, IT and vocational subjects, as well as continuing learning, blended learning and all other types of training and scopes.",
  },
  {
    q: "What does the assessment evaluate?",
    a: "The accreditation process involves an evaluation of the training provider's corporate structure, facilities, staffing, curriculum, product development and administration.",
  },
  {
    q: "What is the difference between the ADAO and the ADCP?",
    a: "The American Directory of Accredited Organizations (ADAO) lists accredited organizations and the courses they offer, for external agencies, partners and prospective trainees. The American Directory for Competent Personnel (ADCP) lists the people trained and certified by those accredited providers, together with the certificate each person achieved.",
  },
  {
    q: "How is this page different from the Training & Education Providers program page?",
    a: "This page sets out the standard, the requirements and the documents. The Training & Education Providers Accreditation page covers the same program from the provider's point of view — the benefits, the ADCP digital certificate service, the process and how to speak to an advisor.",
  },
  {
    q: "Which documents do we need before applying?",
    a: "The guideline for accreditation of training providers, the application form for training and education providers, the general requirements for accreditation and the requirements for use of accreditation symbols. All four are linked on this page.",
  },
  {
    q: "How do we apply?",
    a: `Download the application form, complete it and return it to ${CONTACT.email}. You can also book a free 30-minute consultation with an AAA advisor before you apply.`,
  },
];

export default function Page() {
  return (
    <div className="axp">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Accreditation Programs", path: PROGRAMS.healthcare.href },
            { name: "Conformity Assessment Bodies", path: PROGRAMS.cab.href },
            { name: "Certificate Programs Accreditation (ASTM E2659)", path: PATH },
          ]),
          serviceSchema({
            name: "Certificate Programs Accreditation",
            description:
              "AAA accredits education and training service providers — academies, centres, agencies and organizations — against the international American standard ASTM E2659, evaluating corporate structure, facilities, staffing, curriculum, product development and administration.",
            path: PATH,
            standard: "ASTM E2659",
            audience: "Education and training service providers",
          }),
          faqSchema(FAQ),
        ]}
      />

      {/* 01 — Hero */}
      <PageHero
        image="/about/team-experts.jpg"
        eyebrow="ASTM E2659"
        badge="ASTM E2659"
        title={
          <>
            Certificate programs <em>accreditation.</em>
          </>
        }
        intro="AAA accredits education and training service providers — academies, centres, agencies and organizations — against the international American standard ASTM E2659."
        crumbs={[
          { href: PROGRAMS.healthcare.href, label: "Programs" },
          { href: PROGRAMS.cab.href, label: "Conformity Assessment Bodies" },
          { label: "ASTM E2659" },
        ]}
        caption={{
          kicker: "Standard-anchored assessment",
          title: "Competence, qualified trainers, compliant curricula",
          chip: "ASTM E2659",
        }}
        actions={
          <>
            <Link href="/apply" className="ax-btn ax-btn-gold">
              Apply for Accreditation <Icon name="arrow" size={14} />
            </Link>
            <a
              href={APPLICATION_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="ax-btn ax-btn-ghost"
            >
              <Icon name="download" size={16} /> Download Application Form
            </a>
          </>
        }
        meta={[
          { k: "Anchor standard", v: "ASTM E2659" },
          { k: "Applies to", v: "Training providers" },
          { k: "Directories", v: "ADAO · ADCP" },
          { k: "Reach", v: "Worldwide" },
        ]}
      />

      {/* 02 — About the standard */}
      <section className="ax-section" id="about">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">The standard</span>
                <h2>What accreditation to ASTM E2659 asks of a training provider.</h2>
                <span className="ax-rule" />
              </div>
              <p style={{ marginTop: 22 }}>
                AAA provides accreditation to education and training service providers —
                academies, centres, agencies and organizations that deliver training courses
                across a wide range of fields and majors. The accreditation is based on the
                international American standard <strong>ASTM E2659</strong>.
              </p>

              <span className="ax-label" style={{ marginTop: 30 }}>
                Getting accredited requires you to demonstrate
              </span>
              <ul className="ax-checks gold">
                {DEMONSTRATE.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>

              <span className="ax-label" style={{ marginTop: 30 }}>
                Fields and majors covered
              </span>
              <ul className="ax-checks">
                {FIELDS.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>

            <figure className="ax-photo reveal">
              <Image
                src="/about/story-iibms.jpg"
                alt="A trainer delivering a professional development session to delegates"
                fill
                sizes="(max-width: 980px) 92vw, 40vw"
              />
              <span className="ax-photo-badge">Academies · Centres · Agencies</span>
              <figcaption>
                One standard behind every accredited course, whatever the subject or format.
                <span>International American standard ASTM E2659</span>
              </figcaption>
            </figure>
          </div>

          <div className="ax-note gold" style={{ marginTop: 40 }}>
            <div>
              <strong>Looking for the program page?</strong>
              This page sets out the standard and its requirements.{" "}
              <Link href={PROGRAMS.training.href} className="ax-link">
                Training &amp; Education Providers Accreditation
              </Link>{" "}
              covers the same program from a provider&apos;s point of view — benefits, digital
              certificates, learner listing and how to speak to an advisor.
            </div>
          </div>
        </div>
      </section>

      {/* 03 — What is evaluated */}
      <section className="ax-section cream" id="evaluation">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">The assessment</span>
            <h2>Six areas an ASTM E2659 assessment evaluates.</h2>
            <p>
              The accreditation process involves an evaluation of the training provider&apos;s
              corporate structure, facilities, staffing, curriculum, product development and
              administration.
            </p>
          </div>
          <ol className="ax-reasons" style={{ marginTop: 30, maxWidth: 880, marginInline: "auto" }}>
            {EVALUATED.map((e, i) => (
              <li className="ax-reason reveal" key={e.title}>
                <span className="ax-reason-num" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>{e.title}</h3>
                  <p>{e.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — Benefits */}
      <section className="ax-section" id="benefits">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Benefits</span>
            <h2>What accredited training providers get from AAA.</h2>
            <p>
              Beyond the certificate: directory listings, marketing resources and continuing
              access to the assessors and updates that keep your standards current.
            </p>
          </div>
          <div className="ax-grid three" style={{ marginTop: 34 }}>
            {BENEFITS.map((b, i) => (
              <article className="ax-card reveal" key={b.title} style={{ transitionDelay: `${i * 45}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-card-ico ax-ico">
                    <LineIcon>{b.icon}</LineIcon>
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — How to apply + documents */}
      <section className="ax-section cream" id="apply">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">How to apply</span>
            <h2>From application to an accredited scope.</h2>
          </div>

          <div className="ax-split wide-left top" style={{ marginTop: 34 }}>
            <div className="ax-steps-panel reveal">
              <h3>The accreditation route</h3>
              <ol className="ax-steps">
                {STEPS.map((s, i) => (
                  <li className="ax-step" key={s.title}>
                    <span className="ax-step-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="ax-step-body">
                      <b>{s.title}</b>
                      <span>{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <span className="ax-pill">
                <span className="ax-ico">
                  <Icon name="shield" size={14} />
                </span>
                Assessed by experienced sector assessors
              </span>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-panel-ico ax-ico">
                <Icon name="doc" size={28} />
              </span>
              <h3>Documents for training providers</h3>
              <p>
                Everything you need to prepare a submission. Complete the application form and
                return it to{" "}
                <a href={`mailto:${CONTACT.email}`} className="ax-link">
                  {CONTACT.email}
                </a>
                .
              </p>
              <a
                href={APPLICATION_FORM}
                className="ax-btn ax-btn-blue"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="download" size={16} /> Download Application Form
              </a>
              <p className="ax-panel-note">
                Prefer to talk first?{" "}
                <a
                  href={CONTACT.consultationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ax-link"
                >
                  Book a free 30-minute consultation
                </a>
                .
              </p>
              <ul className="ax-docs">
                <li className="ax-docs-title">Related documents</li>
                {DOCUMENTS.map((d) => (
                  <li key={d.label}>
                    <a href={d.href} target="_blank" rel="noopener noreferrer">
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

      {/* 06 — FAQ */}
      <section className="ax-section" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
            <p>Common questions about ASTM E2659 accreditation for training providers.</p>
          </div>
          <div className="ax-faq-list">
            {FAQ.map((f, i) => (
              <details className="ax-faq-item" key={f.q} open={i === 0}>
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

      {/* 07 — Closing CTA */}
      <CTA
        eyebrow="Next step"
        title={
          <>
            Ready to be accredited to <em>ASTM E2659?</em>
          </>
        }
        text="Tell us about your organization, the courses you deliver and the scope you want accredited. We will confirm the applicable requirements and come back with a tailored quote."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/quote", label: "Request a Quote" }}
        related={[
          { href: PROGRAMS.training.href, label: PROGRAMS.training.label },
          { href: PROGRAMS.school.href, label: PROGRAMS.school.label },
          { href: PROGRAMS.iso17024.href, label: `${PROGRAMS.iso17024.shortLabel} (${PROGRAMS.iso17024.standard})` },
          { href: PROGRAMS.cab.href, label: "All conformity assessment programs" },
        ]}
      />
    </div>
  );
}
