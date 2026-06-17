import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../../_components/CTA";
import Icon from "../../_components/Icon";
import PageHero from "../../_components/PageHero";

export const metadata: Metadata = {
  title: "School Accreditation",
  description:
    "AAA accredits elementary and secondary schools and supplementary education programs worldwide. Eligibility criteria, the ten AAA accreditation standards, and the accreditation process leading to a certificate valid for 5 years.",
};

const ELIGIBILITY = [
  "Use English as a primary language of instruction and communication throughout the school.",
  "Provide a curriculum which reflects best practices in American and international education.",
  "Commit to meeting the established standards for school accreditation.",
  "Have at least one year of operation.",
];

const WHY = [
  {
    title: "Seal of educational excellence",
    body:
      "AAA accreditation is the seal of educational excellence for families seeking the best school education, placing your school among the best schools globally.",
  },
  {
    title: "Validated programs and transcripts",
    body:
      "AAA accreditation ensures validation of the integrity of the school's program and transcripts.",
  },
  {
    title: "Admissions and transfers",
    body:
      "Facilitates school and college admissions, transfers, and the admission of international students.",
  },
  {
    title: "Student learning and growth",
    body:
      "Enhances student learning and growth by examining the educational program.",
  },
  {
    title: "Strategic planning and visioning",
    body: "Positions school leaders for strategic planning and visioning.",
  },
  {
    title: "Assurance for parents and the public",
    body:
      "Assures current school parents and the broader public, including prospective families, that the school is focused on sustaining a safe and enriching educational learning environment while maintaining efficient and effective operations.",
  },
  {
    title: "Reputation and accountability",
    body:
      "AAA accreditation is a cornerstone of your school's reputation for educational excellence. It serves as an important marketing tool, promotes accountability to the school community, and impacts parental contentment.",
  },
];

const STANDARDS: { title: string; items: string[] }[] = [
  {
    title: "Standards 1–5",
    items: [
      "Standard 1: Mission and Goals",
      "Standard 2: Governance",
      "Standard 3: Administration and Organization",
      "Standard 4: Human Resources",
      "Standard 5: Student Achievement",
    ],
  },
  {
    title: "Standards 6–10",
    items: [
      "Standard 6: Student Support",
      "Standard 7: Education Program",
      "Standard 8: Information Resources",
      "Standard 9: Facilities and Infrastructure",
      "Standard 10: Financial Resources and Institutional Integrity",
    ],
  },
];

const STAGES: { cap: string; title: string; items: string[] }[] = [
  {
    cap: "Step 01",
    title: "Application",
    items: [
      "Complete the application form and return it to info@aaa-accreditation.org",
      "Your institution will be notified upon receipt of your application",
      "Payment of a $350 non-refundable application fee",
    ],
  },
  {
    cap: "Step 02",
    title: "Self-Assessment",
    items: [
      "Email info@aaa-accreditation.org to receive the self-assessment checklist",
      "Complete and return the checklist to move to the assessment stage",
    ],
  },
  {
    cap: "Step 03",
    title: "Assessment Visit",
    items: [
      "The Accreditation Committee assigns a team leader and assessment team",
      "The team leader contacts you within 15 days to arrange your assessment",
      "The assessment team prepares a report determining whether the accreditation standards are being met",
    ],
  },
  {
    cap: "Step 04",
    title: "Accreditation Decision",
    items: [
      "Final review and accreditation decision by the accreditation decision-making committee",
      "The accreditation certificate is granted, valid for 5 years",
    ],
  },
];

function SchoolHero() {
  return (
    <PageHero
      image="/hero.jpg"
      eyebrow="Accreditation Program"
      title={<>School <em>accreditation.</em></>}
      intro="AAA is your education accreditation choice for schools, education corporations, and other education entities throughout the world."
      crumbs={[{ href: "/programs/healthcare", label: "Programs" }, { label: "School Accreditation" }]}
      meta={[
        { k: "Scope", v: "Schools & education entities" },
        { k: "Reach", v: "Worldwide" },
      ]}
    />
  );
}

function SchoolIntro() {
  return (
    <section className="te-intro">
      <div className="container">
        <div className="te-intro-grid">
          <div className="te-intro-copy">
            <span className="eyebrow">About the Program</span>
            <h2>AAA Accreditation for Schools.</h2>
            <p>
              AAA accredits elementary and secondary schools and supplementary
              education programs. Accreditation is a framework for the best
              possible educational program for learners, in addition to
              delivering recognized credibility for the quality of a school&apos;s
              program.
            </p>
            <p>
              AAA is committed to assessing, supporting, and promoting
              high-quality education for all students through accreditation,
              professional assistance, and the pursuit of best practices.
            </p>
          </div>

          <div className="te-intro-visual">
            <div className="te-photo-main" />
            <div className="te-photo-card">
              <Icon name="cert" size={24} />
              <strong>Valid for 5 Years</strong>
              <span>Accreditation certificate granted upon a successful decision</span>
            </div>
          </div>
        </div>

        <div className="te-means">
          <h3>
            To be recognized as a Candidate for Accreditation by AAA, a school
            must meet the following criteria:
          </h3>
          <ul>
            {ELIGIBILITY.map((item) => (
              <li key={item}>
                <Icon name="check" size={15} strokeWidth={1.9} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SchoolWhy() {
  return (
    <section className="te-benefits">
      <div className="container">
        <div className="te-section-head">
          <span className="eyebrow">Why AAA</span>
          <h2 className="section-heading">Why accreditation for your school by AAA?</h2>
        </div>
        <div className="te-benefit-list">
          {WHY.map((reason, index) => (
            <details className="te-benefit" key={reason.title} open={index === 0}>
              <summary>
                <span>{reason.title}</span>
                <Icon name="arrow" size={14} />
              </summary>
              <p>{reason.body}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function SchoolStandards() {
  return (
    <section className="te-requirements">
      <div className="container">
        <div className="te-section-head">
          <span className="eyebrow">Accreditation Standards</span>
          <h2 className="section-heading">
            To become accredited, or renew accreditation, a school must
            demonstrate that it meets the Standards for Accreditation.
          </h2>
        </div>
        <div className="te-req-grid">
          {STANDARDS.map((group) => (
            <article className="te-req-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={15} strokeWidth={1.9} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SchoolProcess() {
  return (
    <section className="hc-process" id="process">
      <div className="container">
        <div className="hc-process-head reveal">
          <div>
            <span className="eyebrow">Accreditation Process</span>
            <h2 className="section-heading">From application to a five-year certificate.</h2>
          </div>
          <span className="meta">Certificate validity 5 years · $350 application fee</span>
        </div>

        <div className="hc-process-grid">
          {STAGES.map((stage, i) => (
            <div
              className="hc-stage reveal"
              key={stage.title}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="hc-stage-num">{String(i + 1).padStart(2, "0")}</div>
              <div className="hc-stage-cap">{stage.cap}</div>
              <h4>{stage.title}</h4>
              <ul>
                {stage.items.map((item) => (
                  <li key={item}>
                    <Icon name="cert" size={14} strokeWidth={1.6} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hc-process-foot reveal">
          <div>
            <h4>You can apply now for accreditation</h4>
            <p>
              Download the application form and return it to{" "}
              <a href="mailto:info@aaa-accreditation.org">info@aaa-accreditation.org</a>.
            </p>
          </div>
          <Link href="/documents" className="btn btn-primary">
            Download Application Form <Icon name="download" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <SchoolHero />
      <SchoolIntro />
      <SchoolWhy />
      <SchoolStandards />
      <SchoolProcess />
      <CTA />
    </>
  );
}
