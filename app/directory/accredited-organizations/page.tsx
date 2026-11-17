import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../../_components/CTA";
import PageHero from "../../_components/PageHero";
import JsonLd from "../../_components/JsonLd";
import Icon from "../../_components/Icon";
import DirectoryExplorer from "./DirectoryExplorer";
import { TermKind } from "@prisma/client";
import { getAccreditedOrganizations, registerStats } from "@/lib/directory";
import { getTerms } from "@/lib/taxonomy";
import { CONTACT, FACTS } from "@/lib/facts";
import { SITE_URL, breadcrumbSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import "./directory.css";
import WhatsAppIcon from "../../_components/WhatsAppIcon";

/**
 * The public register of AAA-accredited organizations.
 *
 * The entries come from the database (admin: /admin/directory) through
 * getAccreditedOrganizations(), with the bundled JSON snapshot as the
 * no-database fallback; saving in the admin revalidates this page.
 *
 * No "Before you search" primer or register intro (Oct 30 2026, client): the
 * hero leads straight into the filters and cards. registerStats(orgs).countries is how many countries
 * the entries come from; country counts inside an organization's own
 * description belong to that organization and are never rewritten.
 */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { organizations } = registerStats(await getAccreditedOrganizations());
  return seoPage({
    title: "Accredited Organizations Register",
    description: `Search AAA\u2019s public register of accredited organizations: ${organizations} universities, training providers, certification bodies, laboratories and healthcare institutions.`,
    path: "/directory/accredited-organizations",
    keywords: [
      "AAA accredited organizations",
      "accreditation register",
      "verify AAA accreditation",
      "accredited training providers",
      "accredited certification bodies",
    ],
  });
}

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

const VERIFY: { title: string; text: string }[] = [
  {
    title: "Find the organization",
    text: "Search by name, city, keyword or accreditation number, or filter the register by program, status and country. Every entry opens its record: what it is accredited as, the scope, the accreditation number, validity and status.",
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

export default async function Page() {
  const [orgs, customTags] = await Promise.all([getAccreditedOrganizations(), getTerms(TermKind.ORG_TAG)]);
  const stats = registerStats(orgs);

  const schema = [
    breadcrumbSchema([{ name: "Accredited Organizations", path: "/directory/accredited-organizations" }]),
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
        numberOfItems: stats.organizations,
        itemListElement: orgs.map((o, i) => ({
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
        crumbs={[{ label: "Accredited Organizations" }]}
        meta={[
          { k: "Accredited organizations", v: FACTS.organizations },
          { k: "Countries in this register", v: String(stats.countries) },
          { k: "Countries AAA serves", v: FACTS.countriesPlus },
        ]}
      />

      {/* 02 — The register */}
      <section className="ax-section cream" id="register">
        <div className="container">
          <DirectoryExplorer orgs={orgs} customTags={customTags.map((t) => ({ slug: t.slug, name: t.name }))} />
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
                      <WhatsAppIcon size={16} />
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
          { href: "/about-accreditation", label: "About accreditation" },
          { href: "/news", label: "Newly accredited organizations" },
        ]}
      />
    </div>
  );
}
