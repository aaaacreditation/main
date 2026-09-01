import Link from "next/link";
import Icon from "../_components/Icon";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import { pageMeta, breadcrumbSchema, faqSchema } from "@/lib/seo";
import "./faq.css";

export const metadata = pageMeta({
  title: "Accreditation FAQ",
  description:
    "Answers about AAA accreditation — what accreditation is, which programs we run, how to apply, plus healthcare accreditation and membership questions.",
  path: "/faq",
  keywords: [
    "accreditation FAQ",
    "how to get accredited",
    "AAA accreditation process",
    "healthcare accreditation questions",
    "accreditation body",
  ],
});

const CONSULT = "https://calendly.com/aaa-accreditation4/30min";

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

/**
 * `a` is the canonical plain-text answer — it is what goes into the FAQPage
 * JSON-LD. `list` is an optional structured tail rendered on the page and
 * folded into the schema text so crawlers see exactly what readers see.
 */
type QA = { q: string; a: string; a2?: string; list?: string[] };
type Group = {
  id: string;
  title: string;
  blurb: string;
  lead: string;
  icon: React.ReactNode;
  items: QA[];
};

const GROUPS: Group[] = [
  {
    id: "about",
    title: "About AAA & accreditation",
    blurb: "Who we are, what accreditation means, and how AAA is recognized internationally.",
    lead: "Accreditation is third-party recognition of competence. These answers cover what that means in practice, who AAA is, and the standards our own work is measured against.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 16v-5M12 8h.01" />
      </>
    ),
    items: [
      {
        q: "What is accreditation?",
        a: "Accreditation is a formal process by which a recognized body evaluates and certifies that an institution meets predefined and established quality standards. The accreditation process aims to enhance service quality and ensure safety through compliance with global standards.",
      },
      {
        q: "Who is the American Accreditation Association (AAA)?",
        a: "AAA is the American Accreditation Association, authorized by the US government — the State Corporation Commission of the Commonwealth of Virginia — to transact its business according to the articles of cooperation under Title 13.1 of the Code of Virginia and to offer a full range of comprehensive accreditation services.",
        a2: "AAA is a third-party accreditation body that delivers accreditation services according to various international standards.",
      },
      {
        q: "Which accreditation programs does AAA offer?",
        a: "AAA delivers a range of accreditation programs using international standards.",
        list: [
          "Healthcare Accreditation",
          "Training Providers Accreditation",
          "Schools Accreditation",
          "Testing & Calibration Laboratories (ISO/IEC 17025)",
          "Medical Laboratories (ISO 15189)",
          "Personnel Certification Bodies (ISO/IEC 17024)",
          "Management Systems Certification Bodies Accreditation (ISO/IEC 17021-1)",
          "Product Certification Bodies (ISO/IEC 17065)",
          "Inspection Bodies (ISO/IEC 17020)",
          "Proficiency Testing Providers (ISO/IEC 17043)",
        ],
      },
      {
        q: "What are the benefits of accreditation?",
        a: "To industry and trade, accreditation facilitates trade and eliminates the need for repetitive testing, certification and inspection. To regulators, it provides a reliable and impartial basis for sound decision-making.",
        a2: "To conformity assessment service providers — testing, calibration and medical laboratories, certification bodies and inspection bodies — accreditation is a means of demonstrating competency to clients, an effective marketing tool, and a passport to submit tenders to contractors that require independently verified conformity assessment providers. To users of accredited services and consumers, accreditation is a guarantee of reliable and comparable conformity assessment results, and it increases the reliability of products.",
      },
      {
        q: "Is AAA internationally recognized?",
        a: "AAA is an institutional member of the International Society for Quality in Health Care (ISQua), which has been working to improve the quality and safety of health care worldwide for over 30 years.",
        a2: "The AAA Accreditation Standards for Healthcare Facilities have been assessed and accredited by ISQua EEA against the Guidelines and Principles for the Development of Health and Social Care Standards, 5th Edition — meaning their development and content have been found to meet international best-practice requirements.",
      },
    ],
  },
  {
    id: "applying",
    title: "Applying for accreditation",
    blurb: "The four stages every applicant goes through, and what happens at each one.",
    lead: "Although there may be certain differences from one application to another, the general route is the same for every candidate body: application, document review, assessment, decision.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 15l2 2 4-4" />
      </>
    ),
    items: [
      {
        q: "What are the steps to get accreditation?",
        a: "Although there may be certain differences from one application to another, the general process remains the same for all candidate bodies and follows four stages: Application, Document Review, Assessment and Decision.",
      },
      {
        q: "How do I apply?",
        a: "You send the accreditation application form to AAA and pay the application fees. AAA then issues a letter confirming that your accreditation is in process. Application forms for every accreditation program are available in our document library.",
      },
      {
        q: "What happens during document review and assessment?",
        a: "AAA reviews your application and the related documents and sends you a Document Review Compliance Report; you revise your documents according to the review results if needed.",
        a2: "AAA then defines the assessment dates and the assessment team, conducts an on-site assessment visit, and sends an assessment report that includes a recommendation for accreditation. You implement corrective actions if needed, and the accreditation committee reviews the file for a decision.",
      },
      {
        q: "How long is an AAA accreditation certificate valid?",
        a: "Once the accreditation decision is taken, AAA issues an accreditation certificate valid for 2 years, and your organization is registered in the American Directory of Competent Personnel (ADCP).",
      },
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare accreditation",
    blurb: "Eligible facility types, the ISQua-accredited standards, and how surveys are run.",
    lead: "AAA's healthcare program covers everything from single-chair dental offices to full hospitals, against standards assessed and accredited by ISQua EEA.",
    icon: (
      <>
        <path d="M12 21s-7-4.35-9.33-8.5A5.5 5.5 0 0 1 12 6.5a5.5 5.5 0 0 1 9.33 6c-2.33 4.15-9.33 8.5-9.33 8.5z" />
        <path d="M12 10v5M9.5 12.5h5" />
      </>
    ),
    items: [
      {
        q: "Who can be accredited under the healthcare program?",
        a: "A wide range of healthcare organizations are eligible for AAA healthcare accreditation.",
        list: [
          "Hospitals, including day-care surgery centers",
          "Primary care clinics that primarily provide general healthcare services",
          "Specialty clinics, ranging from specialty practices with minor operating-room setups, including ENT and dermatology clinics",
          "Dental organizations, from single-chair dental offices to multi-unit dental clinics and hospitals",
          "Diagnostic centers, including X-ray centers, MRI centers, clinical analysis and other imaging facilities",
          "Rehabilitation centers, such as physiotherapy and occupational therapy clinics",
          "Alternative medicine units, including Ayurveda and Unani medical centers",
          "Community pharmacies",
          "Medical travel agencies",
        ],
      },
      {
        q: "What are the AAA accreditation standards?",
        a: "AAA's accreditation standards are a set of evidence-based criteria that healthcare organizations must meet to achieve and maintain accreditation.",
        a2: "The standards are recognized internationally, accredited by the International Society for Quality in Health Care (ISQua), and developed by industry experts, healthcare professionals and stakeholders to reflect best practices in patient care, operational efficiency and organizational leadership.",
      },
      {
        q: "Why choose AAA for healthcare accreditation?",
        a: "AAA accreditation programs were created according to the international requirements of ISQua and in consultation with 174 international healthcare experts. Our streamlined four-step process is designed for ease and efficiency, with a dedicated advisor guiding you every step of the way.",
        a2: "Once accredited, you receive permission to use the golden AAA accreditation symbol and mark on your healthcare documents, records and publicity materials, and you gain access to add your certified trainees and staff to the American Directory of Competent Personnel (ADCP).",
      },
      {
        q: "Can survey visits be conducted remotely?",
        a: "We offer flexible survey options, including on-site or a hybrid approach blending virtual and on-site components. A hybrid survey is conducted with one or more surveyors on-site while the remainder of the team participates remotely via video. This adaptability ensures we can accommodate your preferences and circumstances while providing a thorough and effective assessment.",
      },
      {
        q: "How can I review and comment on draft standards?",
        a: "Interested parties are welcome to contribute to the standards development process. To review and provide feedback on draft standards, submit a request by email to healthcare@aaa-accreditation.org and a copy of the relevant draft standards will be shared for consultation and comments.",
        a2: "Feedback is gathered, analysed and used for continuous improvement according to the AAA Accreditation Standards Feedback Policy (Document No. P-HEC-10-V1).",
      },
    ],
  },
  {
    id: "membership",
    title: "Membership",
    blurb: "Individual and organizational membership — what each costs and what it includes.",
    lead: "AAA invites both organizations and individuals to join. Membership is the entry point for institutions aligning with AAA before full accreditation, and for professionals who want to help shape the standards.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    items: [
      {
        q: "What membership options does AAA offer?",
        a: "AAA invites both organizations and individuals to join. Organizational membership is the perfect entry point for institutions aspiring to be aligned with AAA without undergoing the full accreditation process. Individual membership is designed for professionals passionate about shaping accreditation standards — industry experts, educators and quality professionals.",
      },
      {
        q: "What does individual membership cost and require?",
        a: "Individual membership lasts 2 years and costs $350. Eligibility requirements are an updated CV, a university degree, and evidence of competency and qualifications in the relevant field.",
        list: [
          "An official membership certificate validated through our platform with a unique URL",
          "One free training course each year",
          "Listing in the American Directory for Competent Persons (ADCP)",
          "A QR-coded membership email signature",
          "Free educational webinars",
          "Publication of two articles or papers annually on the AAA website",
          "Networking opportunities and eligibility to join AAA Technical Committees",
        ],
      },
      {
        q: "What does organizational membership cost and include?",
        a: "Organizational membership costs $500 for 1 year, and membership fees are deducted from accreditation fees if an accreditation application is submitted within the first year of the membership duration.",
        a2: "Members receive an official membership certificate, are allowed to use the AAA Membership Logo on their website and promotional material, and two members of the institution are eligible to attend one free training course each year and be listed in the American Directory for Competent Persons (ADCP), alongside webinars, content contribution, networking and technical committee eligibility.",
      },
    ],
  },
];

const TOTAL_QUESTIONS = GROUPS.reduce((n, g) => n + g.items.length, 0);

/** Flattened Q/A pairs — one FAQPage entry per question, answers as plain text. */
const SCHEMA_FAQS = GROUPS.flatMap((g) =>
  g.items.map((item) => ({
    q: item.q,
    a: [item.a, item.a2, item.list ? `${item.list.join("; ")}.` : ""].filter(Boolean).join(" "),
  })),
);

export default function Page() {
  return (
    <main className="axp faqx">
      <JsonLd
        schema={[breadcrumbSchema([{ name: "FAQ", path: "/faq" }]), faqSchema(SCHEMA_FAQS)]}
      />

      <PageHero
        image="/hero.jpg"
        eyebrow="FAQ"
        badge="Answers · Updated for 2026"
        title={
          <>
            Frequently asked <em>questions.</em>
          </>
        }
        intro="Clear, factual answers about AAA, our accreditation programs, the application process, healthcare accreditation and membership — written the way our assessors would explain them."
        crumbs={[{ label: "FAQ" }]}
        caption={{
          kicker: "American Accreditation Association",
          title: "Tysons Corner, Virginia · Serving 58 countries",
          chip: "ISQua EEA assessed",
        }}
        meta={[
          { k: "Topic areas", v: String(GROUPS.length) },
          { k: "Questions answered", v: String(TOTAL_QUESTIONS) },
          { k: "Accreditation programs", v: "10" },
          { k: "Countries served", v: "58" },
        ]}
        actions={
          <>
            <Link href="/apply" className="ax-btn ax-btn-gold">
              Apply for Accreditation <Icon name="arrow" size={14} />
            </Link>
            <Link href="/documents" className="ax-btn ax-btn-ghost">
              Document library
            </Link>
          </>
        }
      />

      {/* 01 — Topic index */}
      <section className="ax-section" id="topics">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Browse by topic</span>
            <h2>Start where your question lives.</h2>
            <p>
              Four topic areas cover everything organizations ask us before they apply. Every
              answer below is the same answer our accreditation team gives on a call.
            </p>
          </div>
          <div className="faqx-topics">
            {GROUPS.map((g, i) => (
              <a
                className="faqx-topic reveal"
                key={g.id}
                href={`#${g.id}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="faqx-topic-top">
                  <span className="ax-ico faqx-topic-ico" aria-hidden="true">
                    <LineIcon>{g.icon}</LineIcon>
                  </span>
                  <span className="faqx-topic-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <b>{g.title}</b>
                <span>{g.blurb}</span>
                <i>
                  {g.items.length} question{g.items.length === 1 ? "" : "s"}
                </i>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 02–05 — One section per topic */}
      {GROUPS.map((g, gi) => (
        <section
          className={"ax-section" + (gi % 2 === 0 ? " cream" : "")}
          id={g.id}
          key={g.id}
          aria-labelledby={`${g.id}-heading`}
        >
          <div className="container">
            <div className="ax-head reveal">
              <span className="eyebrow">
                Topic {String(gi + 1).padStart(2, "0")}
              </span>
              <h2 id={`${g.id}-heading`}>
                {g.title}
                <span className="faqx-tally">
                  {g.items.length} question{g.items.length === 1 ? "" : "s"}
                </span>
              </h2>
              <p>{g.lead}</p>
              <span className="ax-rule" aria-hidden="true" />
            </div>

            <div className="ax-faq-list" style={{ marginTop: "clamp(28px, 3.2vw, 42px)" }}>
              {g.items.map((item, i) => (
                <details
                  className="ax-faq-item reveal"
                  key={item.q}
                  open={gi === 0 && i === 0}
                >
                  <summary>
                    <span>{item.q}</span>
                    <span className="ax-faq-plus" aria-hidden="true" />
                  </summary>
                  <div className="ax-faq-a">
                    <p>{item.a}</p>
                    {item.a2 && <p>{item.a2}</p>}
                    {item.list && (
                      <ul>
                        {item.list.map((li) => (
                          <li key={li}>{li}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 06 — Ask us directly */}
      <section className="ax-section navy" id="ask">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Still looking?</span>
            <h2>Ask us the question that isn&rsquo;t here.</h2>
            <p>
              Our accreditation team answers scope, eligibility and fee questions directly — no
              call-centre script, no obligation to apply.
            </p>
          </div>

          <ul className="faqx-channels reveal">
            <li className="faqx-channel">
              <span className="ax-ico" aria-hidden="true">
                <LineIcon>
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" />
                </LineIcon>
              </span>
              <b>Email</b>
              <a href="mailto:info@aaa-accreditation.org">info@aaa-accreditation.org</a>
            </li>
            <li className="faqx-channel">
              <span className="ax-ico" aria-hidden="true">
                <LineIcon>
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                </LineIcon>
              </span>
              <b>United States</b>
              <a href="tel:+15716012616">+1 (571) 601 2616</a>
            </li>
            <li className="faqx-channel">
              <span className="ax-ico" aria-hidden="true">
                <LineIcon>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
                </LineIcon>
              </span>
              <b>International / WhatsApp</b>
              <a href="tel:+447487550737">+44 (748) 755 0737</a>
            </li>
            <li className="faqx-channel">
              <span className="ax-ico" aria-hidden="true">
                <LineIcon>
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18M9 15l2 2 4-4" />
                </LineIcon>
              </span>
              <b>Book a call</b>
              <a href={CONSULT} target="_blank" rel="noopener noreferrer">
                30-minute consultation
              </a>
            </li>
          </ul>
        </div>
      </section>

      <CTA
        eyebrow="Next step"
        title={
          <>
            Ready to start your <em>accreditation?</em>
          </>
        }
        text="Tell us your sector, the standards that apply to you, and the countries you operate in. An advisor will scope the assessment and come back with a tailored quote."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Talk to an advisor" }}
        related={[
          { href: "/about-accreditation", label: "About accreditation" },
          { href: "/documents", label: "Document library" },
          { href: "/membership", label: "Membership" },
        ]}
      />
    </main>
  );
}
