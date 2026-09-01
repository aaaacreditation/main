import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../../_components/PageHero";
import CTA from "../../_components/CTA";
import JsonLd from "../../_components/JsonLd";
import Icon from "../../_components/Icon";
import DirectoryExplorer from "./DirectoryExplorer";
import { ACCREDITED_ORGANIZATIONS, REGISTER_STATS } from "@/app/_data/accredited-organizations";
import { CONTACT, FACTS } from "@/lib/facts";
import { SITE_URL, breadcrumbSchema, pageMeta } from "@/lib/seo";
import "./directory.css";

/**
 * The public register of AAA-accredited organizations.
 *
 * Two different country figures appear on this page and they are deliberately
 * distinct: REGISTER_STATS.countries is how many countries the entries below
 * come from, while FACTS.countries (58) is AAA's canonical worldwide reach.
 * Country counts inside an organization's own description belong to that
 * organization and are never rewritten.
 */
export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: "Accredited Organizations Register",
  description: `Search AAA\u2019s public register of accredited organizations: ${REGISTER_STATS.organizations} universities, training providers, certification bodies, laboratories and healthcare institutions.`,
  path: "/directory/accredited-organizations",
  keywords: [
    "AAA accredited organizations",
    "accreditation register",
    "verify AAA accreditation",
    "accredited training providers",
    "accredited certification bodies",
  ],
});

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

const MEANING: { title: string; text: string; icon: React.ReactNode }[] = [
  {
    title: "An independent judgement of competence",
    text: "Accreditation is a formal, third-party attestation that an organization has the people, procedures and controls to do what it says it does — assessed against an international standard rather than self-declared.",
    icon: (
      <>
        <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z" />
        <path d="m8.8 12 2.3 2.3 4.1-4.4" />
      </>
    ),
  },
  {
    title: "Impartiality, evidenced",
    text: "Every accreditation decision is taken independently of the assessment team, and risks to impartiality and conflicts of interest are identified, controlled and monitored throughout the cycle.",
    icon: <path d="M12 3v18M8 21h8M2 8h20M5 8l-3 6a3 3 0 0 0 6 0L5 8zM19 8l-3 6a3 3 0 0 0 6 0l-3-6z" />,
  },
  {
    title: "Scope is specific",
    text: "Accreditation is granted for a defined scope — the standards, sectors, activities and locations named on the certificate. A listing in this register is not a blanket endorsement of everything an organization does.",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M9 13h6M9 17h4" />
      </>
    ),
  },
  {
    title: "Maintained, not awarded once",
    text: `AAA accreditation runs on a ${FACTS.cycleLabel} with annual surveillance. Status can change between cycles, so confirm any listing with AAA before relying on it.`,
    icon: (
      <>
        <path d="M21 12a9 9 0 0 1-15.36 6.36L3 16M3 21v-5h5" />
        <path d="M3 12a9 9 0 0 1 15.36-6.36L21 8M21 3v5h-5" />
      </>
    ),
  },
];

const VERIFY: { title: string; text: string }[] = [
  {
    title: "Find the organization",
    text: "Search by name, city or keyword, or filter the register by country. Entries marked “Record on file” publish the accredited scope, number, validity and status.",
  },
  {
    title: "Check the scope on the certificate",
    text: "The accreditation certificate names the standards, activities and locations covered. Ask the organization for a copy if the scope matters to your decision.",
  },
  {
    title: "Confirm with AAA",
    text: `Email ${CONTACT.email} or call ${CONTACT.phone} with the organization name and, where you have it, the accreditation number. We will verify it against the accreditation file.`,
  },
  {
    title: "Verify accredited personnel",
    text: "Individual credentials issued by AAA-accredited organizations are held in the American Directory of Competent Personnel (ADCP), a separate personnel register.",
  },
];

export default function Page() {
  const schema = [
    breadcrumbSchema([
      { name: "Directory", path: "/directory" },
      { name: "Accredited Organizations", path: "/directory/accredited-organizations" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Accredited Organizations — AAA public register",
      url: `${SITE_URL}/directory/accredited-organizations`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntity: {
        "@type": "ItemList",
        name: "Organizations accredited by the American Accreditation Association",
        numberOfItems: REGISTER_STATS.organizations,
        itemListElement: ACCREDITED_ORGANIZATIONS.map((o, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Organization",
            name: o.name,
            address: {
              "@type": "PostalAddress",
              addressLocality: o.location,
              addressCountry: o.country,
            },
          },
        })),
      },
    },
  ];

  return (
    <div className="axp dxp">
      <JsonLd schema={schema} />

      <PageHero
        image="/hero.jpg"
        eyebrow="Public register"
        badge="Public register"
        title={
          <>
            Accredited <em>organizations.</em>
          </>
        }
        intro="The public register of organizations holding AAA accreditation — universities, training and education providers, certification and inspection bodies, laboratories, schools and healthcare institutions."
        crumbs={[{ href: "/directory", label: "Directory" }, { label: "Accredited Organizations" }]}
        meta={[
          { k: "Organizations listed", v: String(REGISTER_STATS.organizations) },
          { k: "Countries in this register", v: String(REGISTER_STATS.countries) },
          { k: "Countries AAA serves", v: FACTS.countriesPlus },
        ]}
      />

      {/* 01 — What a listing means */}
      <section className="ax-section" id="what-it-means">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Before you search</span>
            <h2>What accreditation in this register means</h2>
            <p>
              Accreditation is not a marketing badge. It is an independent, evidence-based
              judgement about an organization&rsquo;s competence, impartiality and consistency —
              held to a defined scope and re-tested on a fixed cycle.
            </p>
          </div>

          <div className="ax-grid four">
            {MEANING.map((m, i) => (
              <article className="ax-card reveal" key={m.title} style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-card-ico" aria-hidden="true">
                    <LineIcon>{m.icon}</LineIcon>
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{m.title}</h3>
                <p>{m.text}</p>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>

          <div className="ax-note gold reveal" style={{ marginTop: 28 }}>
            <div>
              <strong>About the figures on this page</strong>
              The {REGISTER_STATS.organizations} entries below come from{" "}
              {REGISTER_STATS.countries} countries. AAA itself serves{" "}
              {FACTS.countriesLabel} worldwide and works with {FACTS.organizationsLabel}; this
              page lists the organizations currently published in the register. Any country or
              client figure inside an organization&rsquo;s own description is that
              organization&rsquo;s statement about itself.
            </div>
          </div>
        </div>
      </section>

      {/* 02 — The register */}
      <section className="ax-section cream" id="register">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">The register</span>
            <h2>
              {REGISTER_STATS.organizations} organizations, {REGISTER_STATS.countries} countries.
            </h2>
            <p>
              Search by name, city or keyword; narrow by country or focus area; or show only the
              entries that publish a full accreditation record. Descriptions are supplied by the
              organizations themselves.
            </p>
          </div>

          <div style={{ marginTop: "clamp(28px, 3.2vw, 42px)" }}>
            <DirectoryExplorer orgs={ACCREDITED_ORGANIZATIONS} />
          </div>
        </div>
      </section>

      {/* 03 — How to verify */}
      <section className="ax-section navy" id="verify">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Due diligence</span>
                <h2>How to verify an accreditation</h2>
                <p>
                  Funders, regulators, employers and prospective clients rely on this register.
                  Four steps confirm that a listing is current and that it covers the activity you
                  care about.
                </p>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <ul className="ax-checks gold" style={{ marginTop: 26 }}>
                <li>Listings show the organization&rsquo;s own description, not AAA marketing copy.</li>
                <li>Accreditation numbers and validity dates are shown where they are published.</li>
                <li>AAA will confirm the status of any listing on request.</li>
              </ul>
            </div>

            <div className="ax-steps-panel reveal">
              <h3>Verification steps</h3>
              <ol className="ax-steps">
                {VERIFY.map((v, i) => (
                  <li className="ax-step" key={v.title}>
                    <span className="ax-step-num" aria-hidden="true">
                      {i + 1}
                    </span>
                    <div className="ax-step-body">
                      <b>{v.title}</b>
                      <span>{v.text}</span>
                    </div>
                  </li>
                ))}
              </ol>
              <a
                href="https://adcp.aaa-accreditation.org"
                target="_blank"
                rel="noopener noreferrer"
                className="ax-pill"
              >
                <span className="ax-ico" aria-hidden="true">
                  <LineIcon>
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </LineIcon>
                </span>
                Open the ADCP personnel directory
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Get listed */}
      <section className="ax-section fade-up" id="get-listed">
        <div className="container">
          <div className="ax-split">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Join the register</span>
                <h2>Not listed here yet?</h2>
                <p>
                  Organizations appear in this register once they hold AAA accreditation and agree
                  to a public listing. Accreditation starts with a scoping conversation: the
                  standard that applies to you, the activities and locations to be covered, and the
                  evidence an assessment will look for.
                </p>
              </div>
              <div className="ax-actions">
                <Link href="/apply" className="ax-btn ax-btn-blue">
                  Apply for accreditation <Icon name="arrow" size={14} />
                </Link>
                <Link href="/programs/conformity-assessment-bodies" className="ax-btn ax-btn-ghost-navy">
                  Browse the programs
                </Link>
              </div>
            </div>

            <aside className="ax-panel reveal">
              <span className="ax-panel-ico" aria-hidden="true">
                <LineIcon>
                  <path d="M4 4h12v10H4z" />
                  <circle cx="17" cy="17" r="4" />
                  <path d="m15.5 17 1 1 2-2M7 8h6M7 11h4" />
                </LineIcon>
              </span>
              <h3>Confirm a listing</h3>
              <p>
                Checking an organization before a funding decision, a tender or an enrolment? Send
                us the organization name and, where you have it, the accreditation number.
              </p>
              <Link href="/contact" className="ax-btn ax-btn-blue">
                Contact AAA <Icon name="arrow" size={14} />
              </Link>
              <ul className="ax-docs">
                <li className="ax-docs-title">Direct lines</li>
                <li>
                  <a href={`mailto:${CONTACT.email}`}>
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon>
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </LineIcon>
                    </span>
                    {CONTACT.email}
                    <i>EMAIL</i>
                  </a>
                </li>
                <li>
                  <a href={CONTACT.phoneHref}>
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon>
                        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                      </LineIcon>
                    </span>
                    {CONTACT.phone}
                    <i>USA</i>
                  </a>
                </li>
                <li>
                  <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">
                    <span className="ax-ico" aria-hidden="true">
                      <LineIcon>
                        <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5z" />
                      </LineIcon>
                    </span>
                    {CONTACT.whatsapp}
                    <i>INTL</i>
                  </a>
                </li>
              </ul>
              <p className="ax-panel-note">{CONTACT.addressLine}</p>
            </aside>
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Get listed"
        title="Ready to add your organization to this register?"
        text="Tell us about your organization — sector, applicable standards and the countries you operate in — and our team will scope the right accreditation route and come back with a tailored quote."
        related={[
          { href: "/directory", label: "All AAA directories" },
          { href: "/about-accreditation", label: "About accreditation" },
          { href: "/news", label: "Newly accredited organizations" },
        ]}
      />
    </div>
  );
}
