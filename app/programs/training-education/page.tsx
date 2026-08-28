import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "../../_components/CTA";
import Icon from "../../_components/Icon";
import JsonLd from "../../_components/JsonLd";
import PageHero from "../../_components/PageHero";
import { CASE_STUDIES } from "../../_data/case-studies";
import { CONTACT, FACTS, PROGRAMS } from "../../../lib/facts";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";
import AdvisorForm from "./AdvisorForm";
import "./tep.css";

/* -------------------------------------------------------------------------
   Content is the client's own copy, recovered from the live site:
     · aaa-accreditation.org/wp-json/wp/v2/pages/9959  (Training & Education
       Providers Accreditation — benefits, requirements, ADCP, testimonials)
     · .../pages/3454 (ASTM E2659 — the fields covered and what an assessment
       evaluates)
   Facts, figures and quotes are reused verbatim or lightly re-phrased for
   tone; nothing has been invented.
   ------------------------------------------------------------------------- */

const PATH = "/programs/training-education";

export const metadata: Metadata = pageMeta({
  title: "Training & Education Provider Accreditation",
  description:
    "Get your courses accredited by AAA — classroom, workshop or e-learning, delivered anywhere. Recognized course quality, the AAA mark and ADCP learner listing.",
  path: PATH,
  keywords: [
    "training provider accreditation",
    "education provider accreditation",
    "accredited training courses",
    "course accreditation",
    "ASTM E2659",
    "American Directory of Competent Personnel",
  ],
});

const APPLICATION_FORM =
  "https://aaa-accreditation.org/wp-content/uploads/2023/01/Application-form-Training-education-providers.docx";
const GUIDELINE =
  "https://aaa-accreditation.org/wp-content/uploads/2020/04/Guidline-for-accreditation-of-training-providers.pdf";
const GENERAL_REQUIREMENTS =
  "https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf";
const SYMBOLS =
  "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf";

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

/** What accreditation of a training & education provider means. */
const MEANS = [
  "Curriculums — presentations, handouts, tutor notes, exercises and case studies — are relevant to the Body of Knowledge and kept up to date with changes to the course topic.",
  "Instructors and tutors are appropriately qualified, skilled in teaching, experienced in the subject area and familiar with the course topic.",
  "The institution has the capability to offer the courses in terms of organization, resources, trainers and operational controls.",
];

/** The fields AAA accredits, taken from the client's ASTM E2659 page. */
const FIELDS: { label: string; note: string; icon: React.ReactNode }[] = [
  {
    label: "Academies & centres",
    note: "Training academies, centres and agencies",
    icon: (
      <>
        <path d="M3 21h18M5 21V9l7-5 7 5v12" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
  },
  {
    label: "Managerial",
    note: "Management and business programs",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18" />
      </>
    ),
  },
  {
    label: "Social & humanitarian",
    note: "Community, social and humanitarian training",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      </>
    ),
  },
  {
    label: "Media",
    note: "Media and communication courses",
    icon: (
      <>
        <path d="m16 9 5-3v12l-5-3z" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </>
    ),
  },
  {
    label: "IT & technology",
    note: "Information technology and digital skills",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
  },
  {
    label: "Vocational",
    note: "Technical and vocational qualifications",
    icon: (
      <>
        <path d="m14 7 3 3-8 8-3 1 1-3z" />
        <path d="M3 21h18M17 4l3 3" />
      </>
    ),
  },
  {
    label: "Continuing learning",
    note: "CPD and continuing professional programs",
    icon: (
      <>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 3v6h-6" />
      </>
    ),
  },
  {
    label: "Blended & e-learning",
    note: "Online, blended and hybrid delivery",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </>
    ),
  },
];

/** Benefits, verbatim from the client's live page. */
const BENEFITS: { title: string; text: string }[] = [
  {
    title: "International recognition",
    text: "Accreditation from AAA is proof of your ability to meet the high levels of professionalism in your course material and course provision that AAA requires — it is a mark of quality.",
  },
  {
    title: "The AAA accreditation symbol and mark",
    text: "Permission to use the AAA accreditation symbol and mark on your training materials, training certificates and publicity materials.",
  },
  {
    title: "Add your certified students to the directory",
    text: "You gain access to add your certified students to the American Directory of Competent Personnel, where their qualifications can be verified by anyone.",
  },
  {
    title: "Demonstrate adoption of new technologies",
    text: "Show your customers that you are adopting new technologies with the AAA digital certificate service — every certificate carries a unique, AAA-validated URL.",
  },
  {
    title: "Expand into new markets",
    text: "By running a course that has received AAA accreditation you will not only attract more delegates, but also be able to expand into new markets.",
  },
  {
    title: "Increase revenues",
    text: "Increase your revenues and gain the opportunity to train worldwide.",
  },
  {
    title: "Access to our research",
    text: "You also have access to AAA research — giving you key insights into what delegates from specific industries really want from their trainer.",
  },
];

/** What an assessment evaluates (client's ASTM E2659 page). */
const ASSESSED: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Corporate structure",
    text: "Legal identity, governance, responsibilities and the management arrangements behind your training operation.",
    icon: (
      <>
        <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
        <path d="M9 8h2M13 8h2M9 12h2M13 12h2M10 21v-4h4v4" />
      </>
    ),
  },
  {
    title: "Facilities",
    text: "Training venues, equipment and learning environments — including the platforms used for e-learning and blended delivery.",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
  },
  {
    title: "Staffing",
    text: "Instructor qualifications, subject-matter experience, teaching skill and the records that evidence them.",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m17 11 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Curriculum",
    text: "Learning outcomes, course materials, exercises and case studies, and how they are kept current with the Body of Knowledge.",
    icon: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </>
    ),
  },
  {
    title: "Product development",
    text: "How new courses are designed, reviewed, piloted and revised, and how learner feedback feeds back into the material.",
    icon: (
      <>
        <path d="M12 2v4M12 18v4M4.9 4.9l2.9 2.9M16.2 16.2l2.9 2.9M2 12h4M18 12h4M4.9 19.1l2.9-2.9M16.2 7.8l2.9-2.9" />
        <circle cx="12" cy="12" r="3.2" />
      </>
    ),
  },
  {
    title: "Administration",
    text: "Enrolment, records, certification, complaints and the day-to-day controls that keep delivery consistent.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </>
    ),
  },
];

const PROVIDER_REQUIREMENTS = [
  "The institution must provide proof that all applicable learning outcomes are covered in the course.",
  "The curriculum — presentations, handouts, tutor notes, exercises and case studies — is relevant to the Body of Knowledge and kept up to date in line with changes to the training topic.",
];

const INSTRUCTOR_REQUIREMENTS = [
  "A minimum of five (5) years of relevant experience.",
  "Relevant qualifications related to the area of learning.",
];

const PROCESS: { title: string; text: string }[] = [
  {
    title: "Application",
    text: "Complete the application form with your organization details, the courses you deliver and the accreditation scope you are requesting.",
  },
  {
    title: "Document review",
    text: "AAA reviews your curriculum, instructor records and operational controls against the accreditation requirements and confirms the assessment plan.",
  },
  {
    title: "Assessment",
    text: "Experienced assessors evaluate your corporate structure, facilities, staffing, curriculum, product development and administration.",
  },
  {
    title: "Corrective action",
    text: "Any findings are addressed and evidence of effective correction is reviewed and accepted before a decision is taken.",
  },
  {
    title: "Accreditation decision",
    text: "An independent decision-making committee grants accreditation and issues your certificate and accredited scope.",
  },
  {
    title: "Directory listing & mark",
    text: "Your organization is listed in the AAA directories and you receive permission to use the AAA accreditation symbol and mark, plus login credentials for the ADCP.",
  },
];

const ADCP_FEATURES: { title: string; points: string[]; icon: React.ReactNode }[] = [
  {
    title: "Adding certified personnel",
    points: [
      "List your certified trainees and employees in the directory.",
      "Their qualifications and skills gain visibility on a recognized platform.",
    ],
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8v6M22 11h-6" />
      </>
    ),
  },
  {
    title: "Digital certificates with validation",
    points: [
      "Issue digital certificates to your certified personnel.",
      "Each certificate carries a unique URL validated by AAA, providing authenticity and credibility.",
    ],
    icon: (
      <>
        <path d="M4 4h12v10H4z" />
        <circle cx="17" cy="17" r="4" />
        <path d="m15.5 17 1 1 2-2M7 8h6M7 11h4" />
      </>
    ),
  },
  {
    title: "Dedicated login credentials",
    points: [
      "Every accredited organization receives its own email ID and password for the ADCP.",
      "Use them to create and manage certificates for students and trainees completing accredited courses.",
    ],
    icon: (
      <>
        <rect x="4" y="11" width="16" height="10" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4M12 15v2" />
      </>
    ),
  },
  {
    title: "Enhanced credibility and reputation",
    points: [
      "Being listed in the ADCP demonstrates a commitment to maintaining high standards.",
      "It strengthens your brand reputation and supports trust among stakeholders and clients.",
    ],
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
];

/** Named testimonials, verbatim from the client's live page. */
const VOICES = [
  {
    initials: "SS",
    quote:
      "AAA Accreditation increased our reach, ensured the quality of education that we provide, and provided learners with trust and assurance in our institution.",
    name: "Shoeb Shaikh",
    role: "Head, Cinute Digital Center · Mumbai, India",
  },
  {
    initials: "WM",
    quote:
      "Achieving AAA accreditation is a significant milestone for our institution. It validates our commitment to high standards and enhances our credibility within the industry.",
    name: "Willena McGee",
    role: "CEO, Uplifted Abilities · South Carolina, USA",
  },
];

/** Accredited education and training organizations, from the shared case-study data. */
const STORY_NAMES = ["Priority Global", "IIBMS", "Study Medic", "Cinute Digital", "Monarch Master Injectors"];
const STORIES = STORY_NAMES.map((n) => CASE_STUDIES.find((c) => c.name === n)).filter(
  (c): c is (typeof CASE_STUDIES)[number] => Boolean(c)
);

const GUIDES = [
  {
    href: "/news/what-is-training-accreditation-and-why-does-it-matter-for-training-providers",
    label: "What is training accreditation — and why does it matter?",
    kicker: "Guide",
  },
  {
    href: "/news/how-to-get-your-training-centre-accredited-a-step-by-step-guide-2026",
    label: "How to get your training centre accredited: a step-by-step guide",
    kicker: "Guide",
  },
  {
    href: "/news/accredited-vs-non-accredited-training-providers-whats-the-real-difference",
    label: "Accredited vs. non-accredited training providers: the real difference",
    kicker: "Comparison",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Who can apply for AAA training and education provider accreditation?",
    a: "Academies, training centres, agencies and organizations that deliver training courses in fields such as managerial, social, humanitarian, media, IT and vocational subjects, as well as continuing learning and blended learning. Courses may be classroom-based, workshop-based or e-learning, of any length, and delivered anywhere in the world.",
  },
  {
    q: "Which standard is the accreditation based on?",
    a: "Accreditation of training and education providers is based on the international American standard ASTM E2659. Getting accredited requires providers to demonstrate that they are competent, that their trainers are qualified and that their curricula meet the requirements.",
  },
  {
    q: "What exactly does the accreditation cover?",
    a: "Accreditation covers both the course materials and the individuals who deliver the programs. It confirms that curriculums are relevant to the Body of Knowledge and kept up to date, that instructors are appropriately qualified and experienced, and that the institution has the organization, resources and trainers needed to offer the courses.",
  },
  {
    q: "What are the requirements for instructors?",
    a: "Instructors must have a minimum of five (5) years of relevant experience and relevant qualifications related to the area of learning. They must also be skilled in teaching and familiar with the course topic.",
  },
  {
    q: "What does the assessment look at?",
    a: "The accreditation process involves an evaluation of the training provider's corporate structure, facilities, staffing, curriculum, product development and administration.",
  },
  {
    q: "Can we use the AAA accreditation mark on our certificates?",
    a: "Yes. Accreditation gives you permission to use the AAA accreditation symbol and mark on your training materials, training certificates and publicity materials, in line with the AAA requirements for the use of accreditation symbols.",
  },
  {
    q: "Can we list the learners we certify?",
    a: "Yes. Accredited organizations receive a dedicated email ID and password for the American Directory of Competent Personnel (ADCP), where you can create and manage digital certificates for students and trainees completing your accredited courses. Each certificate carries a unique, AAA-validated URL that employers and partners can use to verify it.",
  },
  {
    q: "How do we start?",
    a: `Download the application form, complete it and return it to ${CONTACT.email}. You can also book a free 30-minute consultation with an AAA advisor, or send your details through the enquiry form on this page and an advisor will come back to you.`,
  },
];

export default function Page() {
  return (
    <div className="axp tepx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Accreditation Programs", path: PROGRAMS.healthcare.href },
            { name: "Training & Education Providers Accreditation", path: PATH },
          ]),
          serviceSchema({
            name: "Training & Education Providers Accreditation",
            description:
              "AAA accreditation for training and education providers — academies, centres, agencies and organizations delivering classroom, workshop and e-learning courses anywhere in the world. Based on the international American standard ASTM E2659.",
            path: PATH,
            standard: "ASTM E2659",
            audience: "Training and education providers",
          }),
          faqSchema(FAQ),
        ]}
      />

      {/* 01 — Hero */}
      <PageHero
        image="/about/story-iibms.jpg"
        eyebrow="Training & Education Providers"
        badge="Training & Education Providers"
        title={
          <>
            Get your courses <em>accredited.</em>
          </>
        }
        intro="AAA accreditation gives training and education providers the opportunity to have their programs formally recognized — classroom, workshop-based or e-learning, of any length, delivered anywhere in the world."
        crumbs={[
          { href: PROGRAMS.healthcare.href, label: "Programs" },
          { label: "Training & Education Providers" },
        ]}
        caption={{
          kicker: "Accredited course delivery",
          title: "Recognized course quality, worldwide",
          chip: "ASTM E2659",
        }}
        actions={
          <>
            <Link href="/apply" className="ax-btn ax-btn-gold">
              Apply for Accreditation <Icon name="arrow" size={14} />
            </Link>
            <a
              href={CONTACT.consultationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ax-btn ax-btn-ghost"
            >
              Book a Free Consultation
            </a>
          </>
        }
        meta={[
          { k: "Accredited organizations", v: FACTS.organizations },
          { k: "Countries served", v: FACTS.countriesPlus },
          { k: "Assessors & experts", v: FACTS.assessors },
          { k: "Anchor standard", v: "ASTM E2659" },
        ]}
      />

      {/* 02 — Advisor lead form, overlapping the hero */}
      <section className="tepx-advisor" id="enquire">
        <div className="container">
          <div className="tepx-advisor-card reveal">
            <div className="tepx-advisor-copy">
              <span className="eyebrow">Talk to us</span>
              <h2>Speak with an accreditation advisor</h2>
              <p>
                Tell us what you teach and how you deliver it. An advisor will confirm what is
                required for your courses and what happens next.
              </p>
              <ul className="ax-checks">
                <li>A clear view of the requirements for your courses and instructors</li>
                <li>The documents to prepare and the stages of the assessment</li>
                <li>No obligation — and no cost for the conversation</li>
              </ul>
            </div>
            <AdvisorForm />
          </div>
        </div>
      </section>

      {/* 03 — What accreditation means */}
      <section className="ax-section" id="what-it-means">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">What it means</span>
                <h2>Recognition for your course quality, your trainers and your learners.</h2>
                <span className="ax-rule" />
              </div>
              <div className="ax-prose" style={{ marginTop: 22 }}>
                <p>
                  Accreditation brings together the value of the AAA brand and your
                  organization&apos;s own knowledge and skills to create effective, validated
                  programs. It covers both the course materials and the individuals who perform
                  them — so what a learner receives from you is backed by an independent
                  American accreditation body.
                </p>
                <p>
                  Courses may be classroom-based, workshop-based or delivered entirely online.
                  They can be of any length and delivered anywhere in the world.
                </p>
              </div>

              <span className="ax-label" style={{ marginTop: 30 }}>
                Accreditation means that
              </span>
              <ul className="ax-checks gold">
                {MEANS.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>

            <figure className="ax-photo reveal">
              <Image
                src="/home/training.jpg"
                alt="Delegates taking part in a classroom training session"
                fill
                sizes="(max-width: 980px) 92vw, 40vw"
              />
              <span className="ax-photo-badge">Any format, any length</span>
              <figcaption>
                Classroom, workshop or e-learning — accreditation follows the course, not the
                room.
                <span>Assessed against ASTM E2659</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 04 — Who we accredit */}
      <section className="ax-section cream" id="who">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Who we accredit</span>
            <h2>Academies, centres, agencies and organizations that train.</h2>
            <p>
              AAA accredits providers delivering training in a wide range of fields and majors —
              from short professional courses to full continuing-learning programs.
            </p>
          </div>
          <div className="ax-grid four tight" style={{ marginTop: 34 }}>
            {FIELDS.map((f, i) => (
              <article className="ax-tile reveal" key={f.label} style={{ transitionDelay: `${i * 40}ms` }}>
                <span className="ax-tile-ico ax-ico">
                  <LineIcon>{f.icon}</LineIcon>
                </span>
                <b>{f.label}</b>
                <span>{f.note}</span>
              </article>
            ))}
          </div>
          <div className="ax-note gold" style={{ marginTop: 26 }}>
            <div>
              <strong>Not sure your courses qualify?</strong>
              Blended learning, continuing learning and specialist scopes are all in range. Send
              us your course list and we will tell you exactly what applies —{" "}
              <a href="#enquire" className="ax-link">
                ask an advisor
              </a>
              .
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Benefits */}
      <section className="ax-section" id="benefits">
        <div className="container">
          <div className="ax-split wide-left top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Benefits</span>
                <h2>What accreditation does for your training business.</h2>
              </div>
              <ol className="ax-reasons">
                {BENEFITS.map((b, i) => (
                  <li className="ax-reason" key={b.title}>
                    <span className="ax-reason-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h3>{b.title}</h3>
                      <p>{b.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-panel-ico ax-ico">
                <Icon name="download" size={28} />
              </span>
              <h3>Download the application form</h3>
              <p>
                The form asks for your organization details, the courses you deliver and the
                accreditation scope you are requesting. Complete it and return it to{" "}
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
                <li className="ax-docs-title">Related requirements</li>
                <li>
                  <a href={GUIDELINE} target="_blank" rel="noopener noreferrer">
                    <span className="ax-ico">
                      <Icon name="doc" size={16} />
                    </span>
                    Guideline for accreditation of training providers
                    <i>PDF</i>
                  </a>
                </li>
                <li>
                  <a href={GENERAL_REQUIREMENTS} target="_blank" rel="noopener noreferrer">
                    <span className="ax-ico">
                      <Icon name="doc" size={16} />
                    </span>
                    General requirements for accreditation
                    <i>PDF</i>
                  </a>
                </li>
                <li>
                  <a href={SYMBOLS} target="_blank" rel="noopener noreferrer">
                    <span className="ax-ico">
                      <Icon name="doc" size={16} />
                    </span>
                    Requirements for use of accreditation symbols
                    <i>PDF</i>
                  </a>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 06 — What we assess */}
      <section className="ax-section cream" id="assessment">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">What we assess</span>
            <h2>Six areas that decide whether a course is worth accrediting.</h2>
            <p>
              The accreditation process involves an evaluation of the training provider&apos;s
              corporate structure, facilities, staffing, curriculum, product development and
              administration.
            </p>
          </div>
          <div className="ax-grid three" style={{ marginTop: 34 }}>
            {ASSESSED.map((a, i) => (
              <article className="ax-card reveal" key={a.title} style={{ transitionDelay: `${i * 45}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-card-ico ax-ico">
                    <LineIcon>{a.icon}</LineIcon>
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>

          <div className="ax-split even top" style={{ marginTop: 46 }}>
            <div className="reveal">
              <span className="ax-label">Requirements for training providers</span>
              <ul className="ax-checks">
                {PROVIDER_REQUIREMENTS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <span className="ax-label">Requirements for instructors</span>
              <ul className="ax-checks gold">
                {INSTRUCTOR_REQUIREMENTS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — Process */}
      <section className="ax-section" id="process">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">How it works</span>
            <h2>From application to an accredited scope.</h2>
            <p>
              A transparent, evidence-based route with clear expectations at every stage — and a
              named advisor with you throughout.
            </p>
          </div>

          <div className="ax-split wide-left top" style={{ marginTop: 34 }}>
            <div className="ax-steps-panel reveal">
              <h3>The accreditation process</h3>
              <ol className="ax-steps">
                {PROCESS.map((s, i) => (
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
                Assessed against ASTM E2659
              </span>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-panel-ico ax-ico">
                <Icon name="clipboard" size={28} />
              </span>
              <h3>Ready to start?</h3>
              <p>
                Send us the courses you deliver and the countries you deliver them in. We will
                confirm the applicable requirements, the assessment plan and the fees before you
                commit to anything.
              </p>
              <Link href="/apply" className="ax-btn ax-btn-blue">
                Apply for Accreditation <Icon name="arrow" size={14} />
              </Link>
              <p className="ax-panel-note">
                Questions first?{" "}
                <Link href="/contact" className="ax-link">
                  Contact the accreditation team
                </Link>{" "}
                or call {CONTACT.phone}.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* 08 — ADCP */}
      <section className="ax-section navy" id="adcp">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">ADCP</span>
            <h2>The American Directory of Competent Personnel.</h2>
            <p>
              An exclusive platform for accredited organizations. Once accredited, you gain a
              username and password for the directory — a global platform to validate and
              showcase the competencies of your certified trainees, staff and students.
            </p>
          </div>

          <div className="ax-grid four" style={{ marginTop: 34 }}>
            {ADCP_FEATURES.map((f, i) => (
              <article className="ax-card reveal" key={f.title} style={{ transitionDelay: `${i * 45}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-card-ico gold ax-ico">
                    <LineIcon>{f.icon}</LineIcon>
                  </span>
                </div>
                <h3>{f.title}</h3>
                <ul className="ax-checks" style={{ marginTop: 4 }}>
                  {f.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="ax-split top" style={{ marginTop: 46 }}>
            <div className="reveal">
              <span className="ax-label" style={{ color: "var(--aaa-gold-100)" }}>
                Why it matters
              </span>
              <ul className="ax-checks">
                <li>
                  <span>
                    <strong>Global recognition</strong> — the directory gives certified personnel
                    and your organization international visibility and a competitive edge in the
                    global market.
                  </span>
                </li>
                <li>
                  <span>
                    <strong>Ease of verification</strong> — employers, partners and other
                    stakeholders can verify a person&apos;s credentials through the AAA-validated
                    unique URL.
                  </span>
                </li>
              </ul>
            </div>

            <div className="tepx-adcp-panel reveal">
              <span className="kicker">Digital certificate</span>
              <strong>Every learner you certify gets a verifiable record</strong>
              <div className="tepx-adcp-url">
                <i aria-hidden="true" />
                Unique AAA-validated verification link on every certificate
              </div>
              <div className="tepx-adcp-url">
                <i aria-hidden="true" />
                Your own ADCP login to create and manage certificates
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 09 — Proof */}
      <section className="ax-section" id="stories">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Accredited institutions</span>
            <h2>We&apos;re proud of the success our accredited institutions have seen.</h2>
          </div>

          <div className="tepx-voices" style={{ marginTop: 34 }}>
            {VOICES.map((v) => (
              <figure className="ax-quote reveal" key={v.name}>
                <div className="tepx-voice">
                  <span className="ax-avatar" aria-hidden="true">
                    {v.initials}
                  </span>
                  <div>
                    <blockquote>&ldquo;{v.quote}&rdquo;</blockquote>
                    <p className="tepx-voice-person">
                      <b>{v.name}</b>
                      {v.role}
                    </p>
                  </div>
                </div>
              </figure>
            ))}
          </div>

          <div className="tepx-stories">
            {STORIES.map((s) => (
              <article className="tepx-story reveal" key={s.name}>
                {s.logo && (
                  <div className="tepx-story-logo">
                    <Image src={s.logo} alt={`${s.name} logo`} width={220} height={80} />
                  </div>
                )}
                <blockquote>&ldquo;{s.quote}&rdquo;</blockquote>
                <div className="tepx-story-who">
                  <strong>{s.name}</strong>
                  <span>
                    {s.sector} · {s.country}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <div className="ax-actions center" style={{ marginTop: 34 }}>
            <Link href="/directory/accredited-organizations" className="ax-btn ax-btn-ghost-navy">
              See accredited organizations <Icon name="arrow" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 10 — FAQ */}
      <section className="ax-section cream" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
            <p>
              Common questions from training centres, academies and education providers
              considering AAA accreditation.
            </p>
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

          <div style={{ marginTop: 46 }}>
            <span className="ax-label">Further reading</span>
            <div className="tepx-guides">
              {GUIDES.map((g) => (
                <Link href={g.href} className="ax-card reveal" key={g.href}>
                  <span className="ax-label" style={{ marginBottom: 8 }}>
                    {g.kicker}
                  </span>
                  <h3 style={{ marginTop: 0 }}>{g.label}</h3>
                  <span className="ax-card-go">
                    Read the guide <Icon name="arrow" size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11 — Closing CTA */}
      <CTA
        eyebrow="Take the next step"
        title={
          <>
            Ready to have your courses <em>accredited?</em>
          </>
        }
        text="Tell us what you teach, how you deliver it and where. Our team will confirm the requirements that apply to your courses and instructors, then come back with a tailored quote."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/quote", label: "Request a Quote" }}
        related={[
          { href: PROGRAMS.astm.href, label: `${PROGRAMS.astm.shortLabel} (${PROGRAMS.astm.standard})` },
          { href: PROGRAMS.school.href, label: PROGRAMS.school.label },
          { href: PROGRAMS.iso17024.href, label: `${PROGRAMS.iso17024.shortLabel} (${PROGRAMS.iso17024.standard})` },
          { href: PROGRAMS.cab.href, label: "All conformity assessment programs" },
        ]}
      />
    </div>
  );
}
