import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import Icon from "../_components/Icon";
import { REGISTER_STATS } from "@/app/_data/accredited-organizations";
import { CONTACT, FACTS } from "@/lib/facts";
import { SITE_URL, breadcrumbSchema, faqSchema, pageMeta } from "@/lib/seo";

/**
 * The AAA directory hub.
 *
 * `/directory` was previously a 404 even though the header, the About page and
 * the home page all link into it. It now introduces the two registers AAA
 * publishes: the organization register held on this site, and the ADCP
 * personnel directory, which lives on its own subdomain.
 */
export const revalidate = 3600;

const ADCP_URL = "https://adcp.aaa-accreditation.org";

export const metadata: Metadata = pageMeta({
  title: "AAA Directories & Public Registers",
  description:
    "Look up an AAA-accredited organization or a credential held in the American Directory of Competent Personnel, and confirm any listing directly with AAA.",
  path: "/directory",
  keywords: [
    "AAA directory",
    "accreditation register",
    "verify AAA accreditation",
    "American Directory of Competent Personnel",
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

const FAQ: { q: string; a: string }[] = [
  {
    q: "How do I check whether an organization is accredited by AAA?",
    a: "Search the public register of accredited organizations by name, city or keyword, or filter it by country. If you cannot find an organization, or you need to confirm that a listing is still current, contact AAA with the organization name and any accreditation number you hold and we will verify it against the accreditation file.",
  },
  {
    q: "What is the difference between the two directories?",
    a: "The register of accredited organizations lists organizations that hold AAA accreditation. The American Directory of Competent Personnel (ADCP) is a separate directory that validates the competencies of individuals — trainees, staff and students — certified through AAA-accredited organizations.",
  },
  {
    q: "Does a listing mean everything the organization does is accredited?",
    a: "No. Accreditation is granted for a defined scope: the standards, sectors, activities and locations named on the accreditation certificate. A listing confirms that an organization holds AAA accreditation, not that every service it offers falls inside that scope.",
  },
  {
    q: "How long does AAA accreditation last?",
    a: `AAA accreditation runs on a ${FACTS.cycleLabel} with annual surveillance, so status can change between cycles. Confirm any listing with AAA before relying on it for a funding, procurement or enrolment decision.`,
  },
];

export default function Page() {
  return (
    <div className="axp">
      <JsonLd
        schema={[
          breadcrumbSchema([{ name: "Directory", path: "/directory" }]),
          faqSchema(FAQ),
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "AAA public directories",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Accredited Organizations",
                url: `${SITE_URL}/directory/accredited-organizations`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "American Directory of Competent Personnel (ADCP)",
                url: ADCP_URL,
              },
            ],
          },
        ]}
      />

      <PageHero
        image="/about/assessment.jpg"
        eyebrow="Directories"
        badge="Public registers"
        title={
          <>
            Look up an <em>accredited organization.</em>
          </>
        }
        intro="AAA publishes two registers: the organizations that hold AAA accreditation, and the individual credentials issued through them. Both exist so that funders, regulators, employers and clients can check a claim rather than take it on trust."
        crumbs={[{ label: "Directory" }]}
        meta={[
          { k: "Organizations listed", v: String(REGISTER_STATS.organizations) },
          { k: "Countries AAA serves", v: FACTS.countriesPlus },
          { k: "Accreditation cycle", v: `${FACTS.cycleYears} years` },
        ]}
      />

      {/* 01 — The two registers */}
      <section className="ax-section" id="registers">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Choose a register</span>
            <h2>Two directories, two questions</h2>
            <p>
              Checking an organization and checking a person are different lookups. Start with the
              one that matches the claim in front of you.
            </p>
          </div>

          <div className="ax-grid two">
            <Link href="/directory/accredited-organizations" className="ax-card reveal">
              <div className="ax-card-top">
                <span className="ax-card-ico" aria-hidden="true">
                  <LineIcon>
                    <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
                    <path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4" />
                  </LineIcon>
                </span>
                <span className="ax-card-no" aria-hidden="true">
                  01
                </span>
              </div>
              <h3>Accredited organizations</h3>
              <p>
                The public register of organizations holding AAA accreditation — universities,
                training and education providers, certification and inspection bodies,
                laboratories, schools and healthcare institutions. Search by name, city or keyword,
                filter by country, and open any entry to see the accreditation record where one is
                published.
              </p>
              <span className="ax-card-go">
                Search the register <Icon name="arrow" size={13} />
              </span>
            </Link>

            <a href={ADCP_URL} target="_blank" rel="noopener noreferrer" className="ax-card reveal">
              <div className="ax-card-top">
                <span className="ax-card-ico" aria-hidden="true">
                  <LineIcon>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="m16.5 11.5 1.8 1.8 3.7-3.7" />
                  </LineIcon>
                </span>
                <span className="ax-card-no" aria-hidden="true">
                  02
                </span>
              </div>
              <h3>Accredited personnel (ADCP)</h3>
              <p>
                The American Directory of Competent Personnel is AAA&rsquo;s platform for validating
                the competencies of certified trainees, staff and students. Accredited organizations
                receive credentials to publish their people&rsquo;s records there, and certificates
                issued through the platform can be checked against it.
              </p>
              <span className="ax-card-go">
                Open ADCP <Icon name="arrowUpRight" size={13} />
              </span>
            </a>
          </div>

          <div className="ax-note reveal" style={{ marginTop: 28 }}>
            <div>
              <strong>Can&rsquo;t find what you are looking for?</strong>
              Not every accredited organization appears in the public register, and accreditation
              status can change between cycles. Email{" "}
              <a href={`mailto:${CONTACT.email}`} className="ax-link">
                {CONTACT.email}
              </a>{" "}
              or call {CONTACT.phone} with the organization name and any accreditation number you
              hold, and AAA will confirm the listing against the accreditation file.
            </div>
          </div>
        </div>
      </section>

      {/* 02 — What a listing tells you */}
      <section className="ax-section navy" id="what-a-listing-means">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Reading a listing</span>
                <h2>What a directory entry does — and does not — tell you</h2>
                <p>
                  Accreditation is a formal, third-party attestation of competence, impartiality
                  and consistent operation, assessed against an international standard. It is
                  granted for a defined scope and re-tested on a fixed cycle.
                </p>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <ul className="ax-checks gold" style={{ marginTop: 26 }}>
                <li>
                  A listing confirms that the organization holds AAA accreditation for a stated
                  scope.
                </li>
                <li>
                  The scope on the accreditation certificate — the standards, activities and
                  locations covered — is what governs.
                </li>
                <li>
                  Descriptions in the register are written by the organizations themselves, not by
                  AAA.
                </li>
                <li>
                  Where an entry publishes an accreditation number and validity date, both are
                  shown on the record.
                </li>
              </ul>
            </div>

            <div className="ax-steps-panel reveal">
              <h3>Confirming a claim</h3>
              <ol className="ax-steps">
                <li className="ax-step">
                  <span className="ax-step-num" aria-hidden="true">
                    1
                  </span>
                  <div className="ax-step-body">
                    <b>Search the register</b>
                    <span>
                      Look the organization up by name or country in the accredited organizations
                      register.
                    </span>
                  </div>
                </li>
                <li className="ax-step">
                  <span className="ax-step-num" aria-hidden="true">
                    2
                  </span>
                  <div className="ax-step-body">
                    <b>Read the scope</b>
                    <span>
                      Check that the activity you care about falls inside the accredited scope on
                      the certificate.
                    </span>
                  </div>
                </li>
                <li className="ax-step">
                  <span className="ax-step-num" aria-hidden="true">
                    3
                  </span>
                  <div className="ax-step-body">
                    <b>Verify with AAA</b>
                    <span>
                      Send us the organization name and accreditation number and we will confirm
                      the current status.
                    </span>
                  </div>
                </li>
              </ol>
              <span className="ax-pill">
                <span className="ax-ico" aria-hidden="true">
                  <LineIcon>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </LineIcon>
                </span>
                {FACTS.cycleLabel} · {FACTS.surveillanceLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — FAQ */}
      <section className="ax-section cream" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions about the registers</h2>
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
        eyebrow="Get listed"
        title="Want your organization in the register?"
        text="Accreditation starts with a scoping conversation: the standard that applies to you, the activities and locations to be covered, and the evidence an assessment will look for."
        related={[
          { href: "/directory/accredited-organizations", label: "Accredited organizations" },
          { href: "/about-accreditation", label: "About accreditation" },
          { href: "/programs/conformity-assessment-bodies", label: "Accreditation programs" },
        ]}
      />
    </div>
  );
}
