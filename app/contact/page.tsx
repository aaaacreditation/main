import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import { pageMeta, breadcrumbSchema, faqSchema, ORG, SITE_NAME, SITE_URL } from "@/lib/seo";
import ContactForm from "./ContactForm";
import "./contact.css";

export const metadata: Metadata = pageMeta({
  title: "Contact the American Accreditation Association",
  description:
    "Reach AAA in Tysons Corner, Virginia by phone, email or WhatsApp, book a 30-minute consultation, or send an enquiry — we reply within two business days.",
  path: "/contact",
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

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

/* Contact details are the organisation's real, published details (lib/seo ORG
   plus the fax and healthcare mailbox carried over from the live site). */
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
      { k: "International / WhatsApp", v: <a href="tel:+447487550737">+44 (748) 755 0737</a> },
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
      {
        k: "Healthcare standards",
        v: <a href="mailto:healthcare@aaa-accreditation.org">healthcare@aaa-accreditation.org</a>,
      },
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

const ROUTES: { title: string; text: string; href: string; cta: string; icon: React.ReactNode }[] = [
  {
    title: "Start an accreditation application",
    text: "Download the application form for your program and see the four assessment stages.",
    href: "/apply",
    cta: "Apply",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M12 12v6M9 15l3 3 3-3" />
      </>
    ),
  },
  {
    title: "Request a quote",
    text: "Tell us your standard, sites and scope and we will price the assessment.",
    href: "/quote",
    cta: "Get a quote",
    icon: (
      <>
        <path d="M12 2v20M17 6.5c0-2-2.2-3-5-3s-5 .9-5 2.8c0 3.9 10 2 10 5.9 0 2-2.2 3.1-5 3.1s-5-1.1-5-3" />
      </>
    ),
  },
  {
    title: "Verify an accreditation",
    text: "Check whether an organization holds a current AAA accreditation and what its scope covers.",
    href: "/directory/accredited-organizations",
    cta: "Open the directory",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
  },
  {
    title: "Download requirements & policies",
    text: "General requirements, use of accreditation symbols, multi-site rules and public documents.",
    href: "/documents",
    cta: "Documents",
    icon: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </>
    ),
  },
  {
    title: "Raise a complaint or appeal",
    text: "Our impartiality policy explains how complaints and appeals against accreditation decisions are handled.",
    href: "/impartiality-policy",
    cta: "Impartiality policy",
    icon: (
      <>
        <path d="M12 3v18M8 21h8M2 8h20M5 8l-3 6a3 3 0 0 0 6 0L5 8zM19 8l-3 6a3 3 0 0 0 6 0l-3-6z" />
      </>
    ),
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "How quickly will AAA reply to my enquiry?",
    a: "Enquiries sent through this page are answered within two business days. If your request is urgent, call the office on +1 (571) 601 2616 or message the international line on +44 (748) 755 0737.",
  },
  {
    q: "Where is the American Accreditation Association based?",
    a: "AAA's head office is at 8609 Westwood Center Drive, Tysons Corner, VA 22182, United States. Assessments are delivered worldwide through a network of assessors and technical experts.",
  },
  {
    q: "Can I speak to someone before I apply?",
    a: "Yes. You can book a free 30-minute consultation with an accreditation advisor at any time — the advisor will help you define the right program, standard and accreditation scope before you commit to an application.",
  },
  {
    q: "Who should I contact about a quote?",
    a: "Use the quote request form so your enquiry reaches the team with the scoping information they need — organization, country, program, number of sites and estimated scopes. That avoids a round of follow-up questions and shortens the time to a firm price.",
  },
  {
    q: "How do I verify that an organization is accredited by AAA?",
    a: "Search the directory of accredited organizations. If the certificate you are checking is not listed, or the scope does not match, contact us with the certificate number and we will confirm its status.",
  },
  {
    q: "How are complaints and appeals handled?",
    a: "Complaints about AAA or an accredited organization, and appeals against accreditation decisions, are handled under AAA's published impartiality arrangements. Send them to info@aaa-accreditation.org and mark the subject line 'Complaint' or 'Appeal'.",
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
    <main className="axp ctx">
      <JsonLd
        schema={[
          breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
          contactPageSchema,
          faqSchema(FAQ),
        ]}
      />

      {/* 01 — Hero */}
      <PageHero
        image="/about/leadership.jpg"
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
          { k: "Head office", v: "Tysons Corner, VA" },
          { k: "Typical reply", v: "2 days" },
          { k: "Countries served", v: "58" },
          { k: "Accredited organizations", v: "200+" },
        ]}
        caption={{
          kicker: "American Accreditation Association",
          title: "Assessors, technical experts and advisors across 58 countries",
          chip: "Tysons Corner, VA",
        }}
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
              run worldwide, so the international line and the online calendar are usually the
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

      {/* 04 — Routing */}
      <section className="ax-section cream" id="routing">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Point your enquiry</span>
                <h2>Some questions have a faster answer than email</h2>
                <p>
                  Five of the requests we receive most often already have a page built for them.
                  Starting there gets you a complete answer in minutes instead of a thread.
                </p>
              </div>
              <span className="ax-rule" aria-hidden="true" />
            </div>

            <ul className="ctx-route-list reveal">
              {ROUTES.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="ctx-route">
                    <span className="ax-ico ctx-route-ico" aria-hidden="true">
                      <LineIcon>{r.icon}</LineIcon>
                    </span>
                    <span>
                      <b>{r.title}</b>
                      <span>{r.text}</span>
                    </span>
                    <span className="ctx-route-go">
                      {r.cta} <Arrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 05 — Office / global reach */}
      <section className="ax-section navy" id="office">
        <div className="container">
          <div className="ax-split even top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Our office</span>
                <h2>Headquartered in Virginia, working across 58 countries</h2>
                <p>
                  AAA is an international accreditation body headquartered in the Washington, DC
                  metropolitan area. Correspondence, applications and certificates are issued from
                  the US head office; assessments are delivered locally by our assessor network.
                </p>
              </div>
              <ul className="ax-checks">
                <li>200+ accredited organizations worldwide</li>
                <li>100+ assessors and technical experts</li>
                <li>Assessed against the ISQua EEA international standards</li>
                <li>English and Arabic correspondence supported</li>
              </ul>
            </div>

            <div className="ctx-visit-card reveal">
              <h3>Head office</h3>
              <address>
                <b>American Accreditation Association</b>
                {ORG.street}
                <br />
                {ORG.city}, {ORG.region} {ORG.postalCode}
                <br />
                United States
              </address>
              <div className="ax-actions">
                <a
                  className="ax-btn ax-btn-white"
                  href="https://www.google.com/maps/search/?api=1&query=8609+Westwood+Center+Drive+Tysons+Corner+VA+22182"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps
                </a>
                <a className="ax-btn ax-btn-ghost" href={CONSULT} target="_blank" rel="noopener noreferrer">
                  Book a consultation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — FAQ */}
      <section className="ax-section fade-up" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Contacting AAA — common questions</h2>
            <p>Response times, office details, and where to send applications, quotes and appeals.</p>
          </div>
          <div className="ax-faq-list reveal">
            {FAQ.map((item, i) => (
              <details className="ax-faq-item" key={item.q} open={i === 0}>
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
        eyebrow="Next step"
        title="Ready to move from question to application?"
        text="Whether you need a price, a scope discussion or the application pack itself, the next step is a short conversation with an accreditation advisor."
        primary={{ href: "/quote", label: "Request a Quote" }}
        secondary={{ href: "/apply", label: "Apply for Accreditation" }}
        related={[
          { href: "/faq", label: "Full FAQ" },
          { href: "/about", label: "About AAA" },
          { href: "/directory/accredited-organizations", label: "Accredited organizations" },
        ]}
      />
    </main>
  );
}
