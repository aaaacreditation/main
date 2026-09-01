import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "../../_components/CTA";
import Icon from "../../_components/Icon";
import JsonLd from "../../_components/JsonLd";
import PageHero from "../../_components/PageHero";
import { CONTACT, PROGRAMS } from "../../../lib/facts";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";
import "./school.css";

/* -------------------------------------------------------------------------
   Content is the client's own copy, recovered from the live site:
   aaa-accreditation.org/wp-json/wp/v2/pages/5294 — eligibility criteria, the
   seven reasons to accredit, the ten AAA Standards for Accreditation and the
   five-stage process (including the $350 non-refundable application fee, the
   15-day contact window and the five-year certificate). Nothing invented.
   ------------------------------------------------------------------------- */

const PATH = "/programs/school-accreditation";

export const metadata: Metadata = pageMeta({
  title: "School Accreditation Worldwide",
  description:
    "AAA accredits elementary and secondary schools worldwide — eligibility criteria, the ten AAA standards and an accreditation certificate valid for 5 years.",
  path: PATH,
  keywords: [
    "school accreditation",
    "international school accreditation",
    "American school accreditation",
    "accredited school",
    "AAA accreditation standards",
  ],
});

const APPLICATION_FORM =
  "https://aaa-accreditation.org/wp-content/uploads/2023/02/Application-for-accreditation-schools-1.docx";
const GENERAL_REQUIREMENTS =
  "https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf";
const SYMBOLS =
  "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf";

/** The four candidacy criteria, from the client's live page. */
const ELIGIBILITY: { title: string; text: string }[] = [
  {
    title: "English instruction",
    text: "Use English as a primary language of instruction and communication throughout the school.",
  },
  {
    title: "Best-practice curriculum",
    text: "Provide a curriculum which reflects best practices in American and international education.",
  },
  {
    title: "Commitment to the standards",
    text: "Commit to meeting the established standards for school accreditation.",
  },
  {
    title: "One year of operation",
    text: "Have at least one year of operation behind you before applying for candidacy.",
  },
];

/** Why accreditation, verbatim from the client's live page. */
const WHY: { title: string; text: string }[] = [
  {
    title: "A seal of educational excellence",
    text: "AAA accreditation is the seal of educational excellence for families seeking the best school education, placing your school among the best schools globally.",
  },
  {
    title: "Validated programs and transcripts",
    text: "Accreditation ensures validation of the integrity of the school's program and of the transcripts it issues.",
  },
  {
    title: "Smoother admissions and transfers",
    text: "It facilitates school and college admissions, student transfers and the admission of international students.",
  },
  {
    title: "Stronger student learning and growth",
    text: "The self-assessment and external review enhance student learning and growth by examining the educational program in detail.",
  },
  {
    title: "Strategic planning and visioning",
    text: "Accreditation positions school leaders for strategic planning and visioning, with an evidence base for the decisions they take.",
  },
  {
    title: "Assurance for parents and the public",
    text: "It assures current school parents and the broader public, including prospective families, that the school is focused on sustaining a safe and enriching educational learning environment while maintaining efficient and effective operations.",
  },
  {
    title: "Reputation and accountability",
    text: "AAA accreditation is a cornerstone of your school's reputation for educational excellence. It serves as an important marketing tool, promotes accountability to the school community and impacts parental contentment.",
  },
];

/** The ten AAA Standards for Accreditation. */
const STANDARDS: { title: string; note: string }[] = [
  { title: "Mission and Goals", note: "Purpose, direction and how they guide the school" },
  { title: "Governance", note: "Governing body, authority and oversight" },
  { title: "Administration and Organization", note: "Leadership, structure and decision-making" },
  { title: "Human Resources", note: "Recruitment, qualifications and professional development" },
  { title: "Student Achievement", note: "Learning outcomes and how progress is evidenced" },
  { title: "Student Support", note: "Guidance, wellbeing and pastoral services" },
  { title: "Education Program", note: "Curriculum design, delivery and review" },
  { title: "Information Resources", note: "Library, media and learning resources" },
  { title: "Facilities and Infrastructure", note: "Safe, fit-for-purpose learning environments" },
  {
    title: "Financial Resources and Institutional Integrity",
    note: "Financial sustainability and honest public representation",
  },
];

const STAGES: { title: string; text: string }[] = [
  {
    title: "Application for accreditation",
    text: `Complete the application form and return it to ${CONTACT.email}. Your institution is notified on receipt, and a $350 non-refundable application fee is payable at this stage.`,
  },
  {
    title: "Self-assessment",
    text: `Email ${CONTACT.email} to receive the AAA self-assessment checklist. Complete it and return it to move to the assessment stage.`,
  },
  {
    title: "Assessment visit",
    text: "The Accreditation Committee assigns a team leader and assessment team. The team leader contacts you within 15 days to arrange the visit, after which the team prepares a report determining whether the accreditation standards are being met.",
  },
  {
    title: "Accreditation decision",
    text: "The accreditation decision-making committee carries out the final review and takes the decision.",
  },
  {
    title: "Accreditation certificate",
    text: "The accreditation certificate is granted, valid for 5 years.",
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Which schools can be accredited by AAA?",
    a: "AAA accredits elementary and secondary schools and supplementary education programs, along with education corporations and other education entities, throughout the world.",
  },
  {
    q: "What are the eligibility criteria for candidacy?",
    a: "To be recognized as a Candidate for Accreditation, a school must use English as a primary language of instruction and communication throughout the school, provide a curriculum which reflects best practices in American and international education, commit to meeting the established standards for school accreditation, and have at least one year of operation.",
  },
  {
    q: "What standards does a school have to meet?",
    a: "A school must demonstrate that it meets the ten AAA Standards for Accreditation: Mission and Goals; Governance; Administration and Organization; Human Resources; Student Achievement; Student Support; Education Program; Information Resources; Facilities and Infrastructure; and Financial Resources and Institutional Integrity. The same standards apply when accreditation is renewed.",
  },
  {
    q: "How much is the application fee?",
    a: "A $350 non-refundable application fee is payable when the application is submitted. Accreditation fees themselves depend on the size and scope of the school — request a quote and we will confirm them before you commit.",
  },
  {
    q: "How long does the accreditation certificate last?",
    a: "The accreditation certificate is granted for 5 years, following the final review and decision of the AAA accreditation decision-making committee.",
  },
  {
    q: "What happens during the assessment visit?",
    a: "Once your self-assessment checklist is received, the Accreditation Committee assigns a team leader and assessment team. The team leader contacts you within 15 days to arrange the assessment. After the visit the team prepares a report determining whether the accreditation standards are being met.",
  },
  {
    q: "How do we start?",
    a: `Download the school application form, complete it and return it to ${CONTACT.email}. You can also book a free 30-minute consultation with an AAA advisor to talk the process through before you apply.`,
  },
];

export default function Page() {
  return (
    <div className="axp schx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Accreditation Programs", path: PROGRAMS.healthcare.href },
            { name: "School Accreditation", path: PATH },
          ]),
          serviceSchema({
            name: "School Accreditation",
            description:
              "AAA accredits elementary and secondary schools and supplementary education programs worldwide against the ten AAA Standards for Accreditation, leading to a certificate valid for five years.",
            path: PATH,
            audience: "Schools, education corporations and other education entities",
          }),
          faqSchema(FAQ),
        ]}
      />

      {/* 01 — Hero */}
      <PageHero
        image="/about/story-gca.jpg"
        eyebrow="School Accreditation"
        badge="School Accreditation"
        title={
          <>
            School <em>accreditation.</em>
          </>
        }
        intro="AAA is your education accreditation choice for schools, education corporations and other education entities throughout the world — a framework for the best possible educational program, and recognized credibility for its quality."
        crumbs={[
          { href: PROGRAMS.healthcare.href, label: "Programs" },
          { label: "School Accreditation" },
        ]}
        caption={{
          kicker: "Accredited education",
          title: "Recognized quality, worldwide",
          chip: "5-year validity",
        }}
        actions={
          <>
            <a
              href={APPLICATION_FORM}
              target="_blank"
              rel="noopener noreferrer"
              className="ax-btn ax-btn-gold"
            >
              <Icon name="download" size={16} /> Download Application Form
            </a>
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
          { k: "Certificate validity", v: "5 years" },
          { k: "AAA standards", v: "10" },
          { k: "Application fee", v: "$350" },
          { k: "Reach", v: "Worldwide" },
        ]}
      />

      {/* 02 — About the program */}
      <section className="ax-section" id="about">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">About the program</span>
                <h2>A framework for the best possible educational program for learners.</h2>
                <span className="ax-rule" />
              </div>
              <div className="ax-prose" style={{ marginTop: 22 }}>
                <p>
                  AAA accredits elementary and secondary schools and supplementary education
                  programs. Accreditation is a framework for the best possible educational
                  program for learners — and, alongside it, recognized credibility for the
                  quality of a school&apos;s program.
                </p>
                <p>
                  AAA is committed to assessing, supporting and promoting high-quality education
                  for all students through accreditation, professional assistance and the
                  pursuit of best practices.
                </p>
              </div>

              <div className="ax-grid two tight" style={{ marginTop: 30 }}>
                <div className="ax-metric">
                  <b>10</b>
                  <span>Standards a school must demonstrate it meets</span>
                </div>
                <div className="ax-metric">
                  <b>5 years</b>
                  <span>Validity of the accreditation certificate</span>
                </div>
              </div>
            </div>

            <figure className="ax-photo reveal">
              <Image
                src="/home/training.jpg"
                alt="Students taking part in a classroom lesson"
                fill
                sizes="(max-width: 980px) 92vw, 40vw"
              />
              <span className="ax-photo-badge">Elementary · Secondary · Supplementary</span>
              <figcaption>
                Accreditation examines the educational program itself, not just the paperwork
                around it.
                <span>Ten AAA Standards for Accreditation</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 03 — Eligibility */}
      <section className="ax-section cream" id="eligibility">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Eligibility</span>
            <h2>What makes a school a Candidate for Accreditation.</h2>
            <p>
              To be recognized as a Candidate for Accreditation by AAA, a school must meet all
              four of the following criteria.
            </p>
          </div>
          <ul className="schx-gate">
            {ELIGIBILITY.map((e, i) => (
              <li className="reveal" key={e.title} style={{ transitionDelay: `${i * 50}ms` }}>
                <b>{e.title}</b>
                {e.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 04 — Why AAA */}
      <section className="ax-section" id="why">
        <div className="container">
          <div className="ax-split wide-left top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Why AAA</span>
                <h2>What accreditation changes for your school.</h2>
              </div>
              <ol className="ax-reasons">
                {WHY.map((w, i) => (
                  <li className="ax-reason" key={w.title}>
                    <span className="ax-reason-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div>
                      <h3>{w.title}</h3>
                      <p>{w.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-panel-ico ax-ico">
                <Icon name="download" size={28} />
              </span>
              <h3>Apply for school accreditation</h3>
              <p>
                Download the application form, complete it and return it to{" "}
                <a href={`mailto:${CONTACT.email}`} className="ax-link">
                  {CONTACT.email}
                </a>
                . A $350 non-refundable application fee is payable at this stage.
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
                </a>{" "}
                or call {CONTACT.phone}.
              </p>
              <ul className="ax-docs">
                <li className="ax-docs-title">Related requirements</li>
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

      {/* 05 — The ten standards */}
      <section className="ax-section cream" id="standards">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Accreditation standards</span>
            <h2>The ten AAA Standards for Accreditation.</h2>
            <p>
              To become accredited — or to have its accreditation renewed — a school must
              demonstrate that it meets each of these standards.
            </p>
          </div>
          <div className="schx-standards" style={{ marginTop: 34 }}>
            {STANDARDS.map((s, i) => (
              <article className="schx-standard reveal" key={s.title} style={{ transitionDelay: `${i * 30}ms` }}>
                <span className="schx-standard-no" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <b>{s.title}</b>
                  <span>{s.note}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Process */}
      <section className="ax-section" id="process">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Accreditation process</span>
            <h2>From application to a five-year certificate.</h2>
            <p>
              Five stages, each with a clear owner and a clear output — so your leadership team
              always knows what happens next.
            </p>
          </div>

          <div className="ax-split wide-left top" style={{ marginTop: 34 }}>
            <div className="ax-steps-panel reveal">
              <h3>How school accreditation works</h3>
              <ol className="ax-steps">
                {STAGES.map((s, i) => (
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
                  <Icon name="cert" size={14} />
                </span>
                Accreditation certificate valid for 5 years
              </span>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-panel-ico ax-ico">
                <Icon name="mail" size={28} />
              </span>
              <h3>Talk to the education team</h3>
              <p>
                Tell us about your school — the grades you serve, your curriculum and where you
                are based. We will confirm your candidacy against the four eligibility criteria
                and set out the timeline.
              </p>
              <Link href="/contact" className="ax-btn ax-btn-blue">
                Contact the team <Icon name="arrow" size={14} />
              </Link>
              <p className="ax-panel-note">
                Email{" "}
                <a href={`mailto:${CONTACT.email}`} className="ax-link">
                  {CONTACT.email}
                </a>{" "}
                or request a{" "}
                <Link href="/quote" className="ax-link">
                  tailored quote
                </Link>
                .
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* 07 — FAQ */}
      <section className="ax-section cream" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
            <p>Common questions from school leaders considering AAA accreditation.</p>
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

      {/* 08 — Closing CTA */}
      <CTA
        eyebrow="Take the next step"
        title={
          <>
            Ready to place your school among the <em>best globally?</em>
          </>
        }
        text="Send us your school's details and we will confirm your candidacy against the four eligibility criteria, walk you through the ten standards and set out the timeline to your five-year certificate."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/quote", label: "Request a Quote" }}
        related={[
          { href: PROGRAMS.training.href, label: "Training & Education Providers" },
          { href: PROGRAMS.astm.href, label: `${PROGRAMS.astm.shortLabel} (${PROGRAMS.astm.standard})` },
          { href: PROGRAMS.cab.href, label: "All conformity assessment programs" },
        ]}
      />
    </div>
  );
}
