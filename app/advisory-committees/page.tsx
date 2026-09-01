import Link from "next/link";
import Icon from "../_components/Icon";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import { pageMeta, breadcrumbSchema, faqSchema } from "@/lib/seo";
import "./advisory-committees.css";

export const metadata = pageMeta({
  title: "Advisory Technical Committees",
  description:
    "AAA's 12 Advisory Technical Committees set the technical requirements for each accreditation scope — experts drawn from every stakeholder group.",
  path: "/advisory-committees",
  keywords: [
    "AAA advisory technical committees",
    "accreditation technical committee",
    "accreditation governance",
    "technical requirements accreditation",
  ],
});

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
 * The 12 committees, grouped by the accreditation program each advises on.
 * Committee numbers are the client's own numbering and are preserved.
 */
type Cluster = {
  program: string;
  href: string;
  standard: string;
  icon: React.ReactNode;
  committees: { num: number; name: string }[];
};

const CLUSTERS: Cluster[] = [
  {
    program: "Laboratories Accreditation",
    href: "/programs/iso-17025",
    standard: "ISO/IEC 17025 · ISO 15189",
    icon: (
      <>
        <path d="M9 2v7L4 19a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 19l-5-10V2" />
        <path d="M8 2h8M7 15h10" />
      </>
    ),
    committees: [
      { num: 1, name: "Food & Environmental Testing Labs Committee" },
      { num: 2, name: "Material Testing Labs Committee" },
      { num: 3, name: "Medical Labs Committee" },
      { num: 4, name: "Calibration Labs Committee" },
    ],
  },
  {
    program: "Inspection Bodies Accreditation",
    href: "/programs/iso-17020",
    standard: "ISO/IEC 17020",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
    committees: [
      { num: 5, name: "Non Destructive Testing Committee" },
      { num: 6, name: "Industrial Inspection Committee" },
    ],
  },
  {
    program: "Management Systems Certification Bodies Accreditation",
    href: "/programs/iso-17021",
    standard: "ISO/IEC 17021-1",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <path d="m14.5 17.5 2 2 4-4" />
      </>
    ),
    committees: [
      { num: 9, name: "QMS, OHSAS Committee" },
      { num: 10, name: "FSMS Committee" },
      { num: 11, name: "EMS & Energy Management System Committee" },
    ],
  },
  {
    program: "Personnel Certification Bodies Accreditation",
    href: "/programs/iso-17024",
    standard: "ISO/IEC 17024",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-1a6 6 0 0 1 12 0v1" />
      </>
    ),
    committees: [{ num: 7, name: "Personnel Certification Bodies Committee" }],
  },
  {
    program: "Product Certification Bodies Accreditation",
    href: "/programs/iso-17065",
    standard: "ISO/IEC 17065",
    icon: (
      <>
        <path d="m21 16-9 5-9-5V8l9-5 9 5z" />
        <path d="m3 8 9 5 9-5M12 13v8" />
      </>
    ),
    committees: [{ num: 12, name: "Product Certification Bodies Committee" }],
  },
  {
    program: "Training Providers Accreditation",
    href: "/programs/training-education",
    standard: "ASTM E2659",
    icon: (
      <>
        <path d="M22 10 12 5 2 10l10 5 10-5z" />
        <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      </>
    ),
    committees: [{ num: 8, name: "Training Providers Accreditation Committee" }],
  },
];

const TOTAL_COMMITTEES = CLUSTERS.reduce((n, c) => n + c.committees.length, 0);

const STAKEHOLDERS: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "Professional bodies",
    text: "Sector associations and professional institutes that hold the technical knowledge for the scope being accredited.",
    icon: (
      <>
        <path d="M3 21h18M5 21V8l7-4 7 4v13" />
        <path d="M10 21v-6h4v6" />
      </>
    ),
  },
  {
    title: "Accredited organizations",
    text: "The laboratories, inspection bodies, certification bodies and training providers that live with the requirements in practice.",
    icon: (
      <>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="m9 14 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Customers",
    text: "The buyers and users of accredited services, whose confidence in results is what accreditation ultimately protects.",
    icon: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      </>
    ),
  },
  {
    title: "Regulatory bodies",
    text: "Regulators who rely on accreditation as a reliable and impartial basis for sound decision-making.",
    icon: (
      <>
        <path d="M12 3v18M8 21h8M2 8h20" />
        <path d="M5 8l-3 6a3 3 0 0 0 6 0L5 8zM19 8l-3 6a3 3 0 0 0 6 0l-3-6z" />
      </>
    ),
  },
];

const DUTIES: { title: string; text: string }[] = [
  {
    title: "Advise on technical matters",
    text: "Provide advice on technical matters related to the development and operation of AAA accreditation activities.",
  },
  {
    title: "Formulate the technical requirements",
    text: "Formulate and review the technical requirements applying in each scope of accreditation.",
  },
  {
    title: "Identify assessors",
    text: "Identify potential assessors and sources of assessors for the related accreditation program.",
  },
];

const FAQ = [
  {
    q: "What do the AAA Advisory Technical Committees do?",
    a: "The role of the AAA Advisory Technical Committees is to provide advice on technical matters related to the development and operation of AAA accreditation activities. They are also responsible for the formulation and review of the technical requirements in each scope of accreditation, and the identification of potential assessors and sources of assessors for the related accreditation program.",
  },
  {
    q: "How many committees are there?",
    a: "There are 12 Advisory Technical Committees, covering the different programs of accreditation offered by AAA — laboratories, inspection bodies, personnel certification bodies, management systems certification bodies, product certification bodies and training providers.",
  },
  {
    q: "Who sits on an Advisory Technical Committee?",
    a: "Each committee is composed of experts representing all the stakeholders in the related scope of accreditation — for example professional bodies, accredited organizations, customers and regulatory bodies.",
  },
  {
    q: "Can I join an AAA Technical Committee?",
    a: "Yes. Eligibility to join AAA Technical Committees is one of the benefits of AAA individual membership, which is designed for industry experts, educators and quality professionals. Individual membership requires an updated CV, a university degree, and evidence of competency and qualifications in the relevant field.",
  },
];

export default function Page() {
  return (
    <main className="axp atcx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Advisory Technical Committees", path: "/advisory-committees" },
          ]),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        image="/about/team-advisory.jpg"
        eyebrow="Governance"
        badge="Governance · Technical requirements"
        title={
          <>
            Advisory <em>technical committees.</em>
          </>
        }
        intro="Twelve committees decide what AAA actually assesses against. Each one is composed of experts representing every stakeholder in its scope — professional bodies, accredited organizations, customers and regulators — so the technical requirements reflect the sector, not just the accreditor."
        crumbs={[{ label: "Advisory Technical Committees" }]}
        caption={{
          kicker: "Technical governance",
          title: "Requirements written by the sectors they govern",
          chip: "12 committees",
        }}
        meta={[
          { k: "Committees", v: String(TOTAL_COMMITTEES) },
          { k: "Programs covered", v: String(CLUSTERS.length) },
          { k: "Stakeholder groups", v: "4" },
          { k: "Assessors & experts", v: "100+" },
        ]}
        actions={
          <>
            <Link href="/membership/individual" className="ax-btn ax-btn-gold">
              Join as an individual member <Icon name="arrow" size={14} />
            </Link>
            <a href="#committees" className="ax-btn ax-btn-ghost">
              See the 12 committees
            </a>
          </>
        }
      />

      {/* 01 — Role */}
      <section className="ax-section" id="role">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Their role</span>
                <h2>Where AAA&rsquo;s technical requirements come from.</h2>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <p style={{ marginTop: 24 }}>
                The role of the AAA Advisory Technical Committees is to provide advice on technical
                matters related to the development and operation of AAA accreditation activities.
                There are 12 committees covering the different programs of accreditation.
              </p>
              <p>
                Each is composed of experts representing all the stakeholders in the related scope
                of accreditation — professional bodies, accredited organizations, customers and
                regulatory bodies. That composition is deliberate: a requirement written only by
                the accreditor is a requirement nobody in the field has had to defend.
              </p>
              <div className="ax-note gold" style={{ marginTop: 26 }}>
                <span>
                  <strong>International Accreditation &hellip; Accepted Globally</strong>
                  Committee work is what keeps that promise technically honest, program by program.
                </span>
              </div>
            </div>

            <div className="ax-steps-panel reveal">
              <h3>What each committee is responsible for</h3>
              <ol className="ax-steps">
                {DUTIES.map((d, i) => (
                  <li className="ax-step" key={d.title}>
                    <span className="ax-step-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="ax-step-body">
                      <b>{d.title}</b>
                      <span>{d.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <span className="ax-pill">
                <span className="ax-ico" aria-hidden="true">
                  <LineIcon strokeWidth={2}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </LineIcon>
                </span>
                Advisory to AAA — accreditation decisions stay independent
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Stakeholder composition */}
      <section className="ax-section navy" id="composition">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Composition</span>
            <h2>Four stakeholder groups, in every committee.</h2>
            <p>
              A committee that hears only from accreditors writes requirements only accreditors can
              live with. AAA committees are built to hear from everyone the scope affects.
            </p>
          </div>

          <div className="atcx-stake">
            {STAKEHOLDERS.map((s, i) => (
              <article
                className="atcx-stake-card reveal"
                key={s.title}
                style={{ transitionDelay: `${i * 55}ms` }}
              >
                <span className="ax-ico" aria-hidden="true">
                  <LineIcon>{s.icon}</LineIcon>
                </span>
                <b>{s.title}</b>
                <span>{s.text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — The twelve committees */}
      <section className="ax-section cream" id="committees">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">The committees</span>
            <h2>Twelve committees, six accreditation programs.</h2>
            <p>
              Each committee owns the technical requirements for a defined scope. Follow the
              program link to see what accreditation to that scope involves.
            </p>
            <span className="ax-rule" aria-hidden="true" />
          </div>

          <div className="atcx-clusters" style={{ marginTop: "clamp(30px, 3.4vw, 46px)" }}>
            {CLUSTERS.map((c, i) => (
              <section
                className="atcx-cluster reveal"
                key={c.program}
                style={{ transitionDelay: `${i * 45}ms` }}
                aria-label={c.program}
              >
                <div className="atcx-cluster-head">
                  <div className="atcx-cluster-id">
                    <span className="ax-ico atcx-cluster-ico" aria-hidden="true">
                      <LineIcon>{c.icon}</LineIcon>
                    </span>
                    <div>
                      <h3>{c.program}</h3>
                      <span>
                        {c.standard} ·{" "}
                        {c.committees.length === 1
                          ? "1 committee"
                          : `${c.committees.length} committees`}
                      </span>
                    </div>
                  </div>
                  <Link className="atcx-cluster-link" href={c.href}>
                    View program <Icon name="arrow" size={13} />
                  </Link>
                </div>
                <ul className="atcx-members">
                  {c.committees.map((m) => (
                    <li className="atcx-member" key={m.num}>
                      <span className="atcx-member-no" aria-hidden="true">
                        {m.num}
                      </span>
                      <b>{m.name}</b>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Join */}
      <section className="ax-section" id="join">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Contribute</span>
                <h2>Bring your expertise to a committee.</h2>
                <p>
                  Eligibility to join AAA Technical Committees is one of the benefits of individual
                  membership — the route for industry experts, educators and quality professionals
                  who want a hand in the standards rather than just a certificate against them.
                </p>
              </div>
              <ul className="ax-checks gold">
                <li>An updated CV, a university degree, and evidence of competency in your field</li>
                <li>Two-year individual membership — $350</li>
                <li>Listing in the American Directory for Competent Persons (ADCP)</li>
                <li>One free training course each year, plus free educational webinars</li>
                <li>Publication of two articles or papers annually on the AAA website</li>
              </ul>
              <div className="ax-actions">
                <Link href="/membership/individual" className="ax-btn ax-btn-blue">
                  Individual membership <Icon name="arrow" size={14} />
                </Link>
                <Link href="/contact" className="ax-btn ax-btn-ghost-navy">
                  Ask about a committee
                </Link>
              </div>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <LineIcon>
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="m17 11 2 2 4-4" />
                </LineIcon>
              </span>
              <h3>Assessors &amp; experts</h3>
              <p>
                Committees also identify potential assessors and sources of assessors for their
                accreditation program. AAA works with a network of over 100 assessors and technical
                experts across 58 countries.
              </p>
              <Link href="/contact" className="ax-btn ax-btn-blue">
                Register your interest <Icon name="arrow" size={14} />
              </Link>
              <p className="ax-panel-note">
                Tell us your technical field, sectors and the standards you have worked to, and the
                accreditation team will route your details to the relevant committee.
              </p>
              <ul className="ax-docs">
                <li className="ax-docs-title">Related governance</li>
                <li>
                  <Link href="/impartiality-policy">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </LineIcon>
                    </span>
                    Safeguarding Impartiality Policy
                    <i>Policy</i>
                  </Link>
                </li>
                <li>
                  <Link href="/documents">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon strokeWidth={2}>
                        <rect x="3" y="4" width="18" height="16" rx="2" />
                        <path d="M3 10h18M8 15h8" />
                      </LineIcon>
                    </span>
                    General requirements for accreditation
                    <i>Library</i>
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 05 — FAQ */}
      <section className="ax-section cream" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions about the committees.</h2>
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
        eyebrow="Get started"
        title={
          <>
            Accredited to requirements the <em>sector helped write.</em>
          </>
        }
        text="Tell us about your organization and our team will scope your accreditation journey — your sector, the applicable standards, and the geographies you operate in."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/membership/individual", label: "Become a member" }}
        related={[
          { href: "/about-accreditation", label: "About accreditation" },
          { href: "/impartiality-policy", label: "Impartiality policy" },
          { href: "/documents", label: "Document library" },
        ]}
      />
    </main>
  );
}
