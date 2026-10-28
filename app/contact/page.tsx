import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import JsonLd from "../_components/JsonLd";
import { breadcrumbSchema, ORG, SITE_NAME, SITE_URL } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import ContactForm from "./ContactForm";
import "./contact.css";
import { CONTACT, FACTS } from "@/lib/facts";

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Contact the American Accreditation Association",
    description:
      "Reach AAA in Tysons Corner, Virginia by phone, email or WhatsApp, book a 30-minute consultation, or send an enquiry — we reply within two business days.",
    path: "/contact",
  });
}

const CONSULT = "https://calendly.com/accreditationaaa/consultation-call-am";

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

const CHANNELS: { title: string; icon: React.ReactNode; lines: { k: string; v: React.ReactNode }[] }[] = [
  {
    title: "Head office",
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    lines: [
      {
        k: "United States",
        v: (
          <>
            {ORG.street}
            <br />
            {ORG.city}, {ORG.region} {ORG.postalCode}, USA
          </>
        ),
      },
    ],
  },
  {
    title: "Call or message us",
    icon: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
    lines: [
      { k: "Telephone", v: <a href="tel:+15716012616">+1 (571) 601 2616</a> },
      { k: "WhatsApp", v: <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer">{CONTACT.whatsapp}</a> },
      { k: "Fax", v: "+1 (571) 376 6582" },
    ],
  },
  {
    title: "Email us",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 7 10 6 10-6" />
      </>
    ),
    lines: [
      { k: "General enquiries", v: <a href="mailto:info@aaa-accreditation.org">info@aaa-accreditation.org</a> },
    ],
  },
  {
    title: "Book a consultation",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="m9 15 2 2 4-4" />
      </>
    ),
    lines: [
      {
        k: "30 minutes, no obligation",
        v: (
          <a href={CONSULT} target="_blank" rel="noopener noreferrer">
            Choose a time with an advisor
          </a>
        ),
      },
    ],
  },
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#contactpage`,
  url: `${SITE_URL}/contact`,
  name: "Contact the American Accreditation Association",
  description:
    "Contact details, office address and enquiry form for the American Accreditation Association (AAA).",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  mainEntity: {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    email: ORG.email,
    telephone: ORG.telephone,
    faxNumber: "+1-571-376-6582",
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG.street,
      addressLocality: ORG.city,
      addressRegion: ORG.region,
      postalCode: ORG.postalCode,
      addressCountry: ORG.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: ORG.telephone,
        email: ORG.email,
        areaServed: "US",
        availableLanguage: ["English", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: ORG.telephoneIntl,
        email: ORG.email,
        areaServed: "Worldwide",
        availableLanguage: ["English", "Arabic"],
      },
    ],
  },
};

export default function Page() {
  return (
    <div className="axp ctx">
      <JsonLd
        schema={[
          breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
          contactPageSchema,
        ]}
      />

      {/* 01 — Hero */}
      <PageHero
        background="/images/site/contact/contact-hero-team.png"
        imageAlt="The team behind AAA: assessors, technical experts and advisors"
        eyebrow="Contact"
        badge="Contact · We reply in 2 business days"
        title={
          <>
            Talk to the AAA <em>accreditation team.</em>
          </>
        }
        intro="Thanks for your interest in the American Accreditation Association. Tell us what you need — a quote, an application, a scope question, or confirmation that a certificate is genuine — and the right specialist will come back to you."
        crumbs={[{ label: "Contact" }]}
        meta={[
          { k: "Headquarters", v: "US-Based" },
          { k: "Typical reply", v: "2 days" },
          { k: "Countries served", v: String(FACTS.countries) },
          { k: "Accredited organizations", v: "200+" },
        ]}
      />

      {/* 02 — Enquiry form (overlaps the hero) */}
      <section className="ctx-talk" id="enquiry">
        <div className="container">
          <div className="ctx-card reveal">
            <div className="ctx-card-copy">
              <span className="eyebrow">Send an enquiry</span>
              <h2>How can we help?</h2>
              <p>
                One form, routed to the right team. Give us a little context and we will answer with
                specifics rather than a brochure.
              </p>
              <ul className="ctx-card-points">
                <li>Answered by an accreditation specialist, not a call centre</li>
                <li>Reply within two business days</li>
                <li>No obligation and no sales sequence</li>
              </ul>
              <p className="ctx-card-urgent">
                Prefer to talk it through? Call <a href="tel:+15716012616">+1 (571) 601 2616</a> or{" "}
                <a href={CONSULT} target="_blank" rel="noopener noreferrer">
                  book a 30-minute consultation
                </a>
                .
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 03 — Channels */}
      <section className="ax-section" id="reach-us">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Direct contact</span>
            <h2>Ways to reach the American Accreditation Association</h2>
            <p>
              Our head office is in Tysons Corner, Virginia. Assessments and advisory conversations
              run worldwide, so WhatsApp and the online calendar are usually the
              fastest route outside US hours.
            </p>
          </div>

          <div className="ax-grid four">
            {CHANNELS.map((c, i) => (
              <article className="ax-card ctx-channel reveal" key={c.title} style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-ico ax-card-ico" aria-hidden="true">
                    <LineIcon>{c.icon}</LineIcon>
                  </span>
                </div>
                <h3>{c.title}</h3>
                <ul className="ctx-channel-lines">
                  {c.lines.map((l) => (
                    <li key={l.k}>
                      <b>{l.k}</b>
                      {l.v}
                    </li>
                  ))}
                </ul>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
