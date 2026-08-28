import Link from "next/link";
import CTA from "../../../_components/CTA";
import JsonLd from "../../../_components/JsonLd";
import PageHero from "../../../_components/PageHero";
import { breadcrumbSchema, faqSchema, pageMeta } from "../../../../lib/seo";
import { ArrowIcon, ClusterNav, LineIcon, hcRelated } from "../cluster";
import "../hc.css";

const SELF = "/programs/healthcare/international-recognition";
const ISQUA_MEMBERS = "https://isqua.org/membership/institutional-members.html";

export const metadata = pageMeta({
  title: "International Recognition: AAA Standards & ISQua",
  description:
    "AAA's healthcare standards are assessed and accredited by ISQua EEA against the Guidelines and Principles for Health and Social Care Standards, 5th Edition.",
  path: SELF,
  keywords: [
    "ISQua EEA",
    "ISQua accredited standards",
    "international healthcare accreditation recognition",
  ],
});

const MILESTONES: { year: string; title: string; text: string }[] = [
  {
    year: "1985",
    title: "Foundation of ISQua",
    text: "Established to promote and advance quality and safety in healthcare globally.",
  },
  {
    year: "1995",
    title: "International Accreditation Programme launched",
    text: "Introduced a framework to accredit healthcare organizations and improve standards worldwide.",
  },
  {
    year: "1999",
    title: "First international conference",
    text: "Hosted the inaugural conference bringing together global leaders in healthcare quality.",
  },
  {
    year: "2005",
    title: "Accreditation of Accreditors (IAA)",
    text: "Launched a programme to accredit accreditation bodies, setting high standards for the organizations that accredit others.",
  },
  {
    year: "2010",
    title: "Expansion of educational programmes",
    text: "Developed training and certification programmes for healthcare professionals and organizations.",
  },
  {
    year: "2015",
    title: "30th anniversary",
    text: "Marked three decades of advancing healthcare quality and safety globally.",
  },
  {
    year: "2018",
    title: "ISQua Fellowship Programme",
    text: "Recognized outstanding contributions to healthcare quality through a prestigious fellowship programme.",
  },
  {
    year: "2020",
    title: "Response to the COVID-19 pandemic",
    text: "Provided resources, guidelines and support to healthcare organizations during the global crisis.",
  },
  {
    year: "2023",
    title: "Focus on digital health and innovation",
    text: "Embraced technology and innovation to improve healthcare quality.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What exactly has ISQua accredited?",
    a: "ISQua EEA has assessed and accredited the AAA Accreditation Standards for Healthcare Facilities against the Guidelines and Principles for the Development of Health and Social Care Standards, 5th Edition, Version 1.0, September 2018. This means both the development of AAA's standards and their content have been assessed and found to meet international best practice requirements.",
  },
  {
    q: "Is AAA a member of ISQua?",
    a: "Yes. AAA is an institutional member of the International Society for Quality in Health Care (ISQua).",
  },
  {
    q: "What is ISQua?",
    a: "ISQua was established in 1985 with a vision to promote quality and safety in health care through international co-operation and collaboration. It has been working to improve the quality and safety of healthcare worldwide for over 30 years through education, knowledge sharing, external evaluation and supporting health systems, connecting healthcare professionals across more than 70 countries and 6 continents.",
  },
  {
    q: "What does ISQua EEA recognition mean for our facility?",
    a: "It means the standards you are being assessed against are themselves externally validated to an international benchmark — so an AAA accreditation is credible to regulators, insurers, partners and patients outside the country where it was awarded.",
  },
];

export default function Page() {
  return (
    <main className="axp hcx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Healthcare Accreditation", path: "/programs/healthcare" },
            { name: "International Recognition", path: SELF },
          ]),
          faqSchema(FAQS),
        ]}
      />

      <PageHero
        image="/programs/healthcare/isqua-conference.jpg"
        eyebrow="International Recognition"
        badge="ISQua EEA · Accredited standards"
        title={
          <>
            Standards validated against an <em>international benchmark.</em>
          </>
        }
        intro="AAA provides accreditation to the healthcare sector in accordance with the AAA Accreditation Standards for Healthcare Facilities — standards that have themselves been assessed and accredited by the International Society for Quality in Health Care (ISQua EEA)."
        crumbs={[
          { href: "/programs/healthcare", label: "Healthcare Accreditation" },
          { label: "International Recognition" },
        ]}
        caption={{
          kicker: "International Society for Quality in Health Care",
          title: "Delegates at an ISQua international conference",
          chip: "ISQua",
        }}
        meta={[
          { k: "Standards accredited by", v: "ISQua EEA" },
          { k: "Benchmark edition", v: "5th Ed." },
          { k: "ISQua established", v: "1985" },
        ]}
      />

      {/* The recognition itself */}
      <section className="ax-section">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">The recognition</span>
                <h2>Assessed and accredited by ISQua EEA</h2>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <p>
                The AAA standards have been assessed and accredited by the International Society for
                Quality in Health Care (ISQua EEA) against the{" "}
                <strong>
                  Guidelines and Principles for the Development of Health and Social Care Standards,
                  5th Edition, Version 1.0, September 2018
                </strong>
                .
              </p>
              <p>
                In practice this means that both the development of AAA&apos;s Accreditation
                Standards for Healthcare Facilities and their content have been assessed and found to
                meet international best-practice requirements. You are not simply being measured
                against a private checklist — you are being measured against standards that have
                themselves been externally examined.
              </p>
              <div className="ax-note gold">
                <div>
                  <strong>Why this matters when you are audited elsewhere</strong>
                  Regulators, insurers, referral partners and international patients increasingly ask
                  who validated the standard behind an accreditation. ISQua EEA is the answer that
                  travels.
                </div>
              </div>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <LineIcon>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
                </LineIcon>
              </span>
              <h3>AAA is an institutional member of ISQua</h3>
              <p>
                ISQua has been working to improve the quality and safety of health care worldwide for
                over 30 years — through education, knowledge sharing, external evaluation and
                supporting health systems, connecting like-minded people through networks of
                healthcare professionals that span more than 70 countries and 6 continents.
              </p>
              <a href={ISQUA_MEMBERS} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-blue">
                View ISQua institutional members <ArrowIcon />
              </a>
              <p className="ax-panel-note">
                ISQua&apos;s members work continually towards quality improvement in health care
                around the world.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ISQua milestones */}
      <section className="ax-section cream" id="isqua">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">About ISQua</span>
                <h2>
                  Four decades of international <em>quality and safety.</em>
                </h2>
                <p>
                  ISQua was established in 1985 with a vision to promote quality and safety in health
                  care through international co-operation and collaboration — and it is dedicated to
                  making that vision a reality.
                </p>
              </div>
              <ul className="ax-checks gold">
                <li>Education and knowledge sharing for healthcare professionals</li>
                <li>External evaluation of standards and accreditation bodies</li>
                <li>Support for health systems worldwide</li>
                <li>Networks spanning 70+ countries and 6 continents</li>
              </ul>
              <div className="ax-actions">
                <Link href="/programs/healthcare/standards" className="ax-btn ax-btn-ghost-navy">
                  See the standards ISQua assessed <ArrowIcon />
                </Link>
              </div>
            </div>

            <div className="ax-steps-panel reveal">
              <h3>ISQua main milestones</h3>
              <ol className="ax-steps">
                {MILESTONES.map((m) => (
                  <li className="ax-step" key={m.year}>
                    <span className="ax-step-num hc-year" aria-hidden="true">
                      {m.year.slice(2)}
                    </span>
                    <div className="ax-step-body">
                      <b>
                        {m.year} — {m.title}
                      </b>
                      <span>{m.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* What it means for you */}
      <section className="ax-section navy">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">What it means for you</span>
            <h2>Recognition your stakeholders can verify</h2>
            <p>
              International recognition is only useful if someone else can check it. Every part of the
              chain behind an AAA healthcare accreditation is externally traceable.
            </p>
          </div>

          <div className="ax-grid three">
            <article className="ax-card reveal">
              <div className="ax-card-top">
                <span className="ax-ico ax-card-ico" aria-hidden="true">
                  <LineIcon>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 11.5 2 2 4-4" />
                  </LineIcon>
                </span>
              </div>
              <h3>The standard is validated</h3>
              <p>
                AAA&apos;s healthcare standards were assessed and accredited by ISQua EEA against the
                5th Edition guidelines — development process and content alike.
              </p>
            </article>

            <article className="ax-card reveal" style={{ transitionDelay: "60ms" }}>
              <div className="ax-card-top">
                <span className="ax-ico ax-card-ico" aria-hidden="true">
                  <LineIcon>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </LineIcon>
                </span>
              </div>
              <h3>The expertise is documented</h3>
              <p>
                The programmes were created to ISQua&apos;s international requirements and in
                consultation with 174 international healthcare experts.
              </p>
            </article>

            <article className="ax-card reveal" style={{ transitionDelay: "120ms" }}>
              <div className="ax-card-top">
                <span className="ax-ico ax-card-ico" aria-hidden="true">
                  <LineIcon>
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <path d="m9 14 2 2 4-4" />
                  </LineIcon>
                </span>
              </div>
              <h3>The certificate is checkable</h3>
              <p>
                Accredited organizations are listed in AAA&apos;s public directory, so anyone can
                confirm your status and scope.
              </p>
            </article>
          </div>

          <div className="ax-actions center">
            <Link href="/directory/accredited-organizations" className="ax-btn ax-btn-ghost">
              Search accredited organizations <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ax-section" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions about AAA&apos;s international recognition</h2>
          </div>
          <div className="ax-faq-list single">
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

      <ClusterNav
        current={SELF}
        cream
        eyebrow="Keep reading"
        heading="More on healthcare accreditation"
      />

      <CTA
        eyebrow="Take the next step"
        title={
          <>
            Accreditation that holds up <em>internationally.</em>
          </>
        }
        text="Talk to the healthcare team about how AAA accreditation is recognized in the markets you operate in, and what it would take for your facility to achieve it."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/contact", label: "Talk to the healthcare team" }}
        related={hcRelated(SELF)}
      />
    </main>
  );
}
