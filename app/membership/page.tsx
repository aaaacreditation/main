import Link from "next/link";
import Image from "next/image";
import Icon from "../_components/Icon";
import JsonLd from "../_components/JsonLd";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import { pageMeta, breadcrumbSchema, faqSchema } from "../../lib/seo";
import "./membership.css";

export const metadata = pageMeta({
  title: "Membership: Individual & Organizational",
  description:
    "Join AAA as an individual or organizational member: a validated membership certificate, ADCP directory listing, free annual training and committee eligibility.",
  path: "/membership",
});

const CONSULT = "https://calendly.com/aaa-accreditation4/30min";

/* ------------------------------------------------------------------ content
   Every fact below is transcribed from the client's live membership pages
   (aaa-accreditation.org/membership, /individual-membership and
   /organizational-membership). Nothing here is invented.
   ------------------------------------------------------------------------ */

const TRACKS = [
  {
    href: "/membership/individual",
    apply: "/membership/individual/apply",
    title: "Individual Membership",
    tagline: "Advance in your accreditation knowledge and career.",
    price: "$350",
    term: "2-year membership",
    text: "Designed for professionals passionate about shaping accreditation standards — industry experts, educators and quality professionals who want an active role in promoting quality and global excellence.",
    points: [
      "Support the advancement of quality and competence across industries.",
      "Gain recognition as a valued contributor to the accreditation ecosystem.",
      "Access exclusive learning resources, leadership opportunities and professional development programs.",
    ],
  },
  {
    href: "/membership/organizational",
    apply: "/membership/organizational/apply",
    title: "Organizational Membership",
    tagline: "The first step in the journey to full accreditation.",
    price: "$500",
    term: "1-year membership",
    text: "The entry point for institutions that want to be aligned with AAA without undergoing the full accreditation process — and a credit against accreditation fees when you go further.",
    points: [
      "Enhance your credibility and brand reputation.",
      "Showcase your commitment to maintaining high-quality standards.",
      "Access exclusive resources and professional support to prepare for full accreditation.",
    ],
  },
];

const COMPARE: { row: string; ind: React.ReactNode; org: React.ReactNode }[] = [
  {
    row: "Who it is for",
    ind: "Individual professionals — industry experts, educators and quality professionals.",
    org: "Any entity with an interest in promoting quality and competence through accreditation.",
  },
  { row: "Term", ind: <b>2 years</b>, org: <b>1 year</b> },
  { row: "Fee", ind: <b>$350</b>, org: <b>$500</b> },
  {
    row: "Membership certificate",
    ind: "Official AAA certificate, validated through our platform and linkable to your professional profiles with a unique URL.",
    org: "Official AAA certificate with a unique validation URL — plus the right to use the AAA Membership Logo on your website and promotional material.",
  },
  {
    row: "Free training",
    ind: "One free training course each year.",
    org: "Two members of your institution attend one free training course each year.",
  },
  {
    row: "ADCP directory",
    ind: "You are listed in the American Directory for Competent Persons.",
    org: "Two members of your institution are listed in the American Directory for Competent Persons.",
  },
  {
    row: "Professional branding",
    ind: "QR-coded membership email signature.",
    org: "QR-coded membership email signature for your team.",
  },
  {
    row: "Educational webinars",
    ind: "Free webinars on standards development, quality management, internal audits and assessment preparation.",
    org: "Free webinars on standards development, quality management, internal audits and assessment preparation.",
  },
  {
    row: "Content contribution",
    ind: "Publish two articles or papers annually on the AAA website, with backlinks.",
    org: "Publish two articles or papers annually on the AAA website, with backlinks.",
  },
  {
    row: "Technical committees",
    ind: "Eligible to join AAA Technical Committees.",
    org: "Eligible to join AAA Technical Committees.",
  },
  {
    row: "Credit toward accreditation",
    ind: <span className="no">Not applicable</span>,
    org: "Membership fees are deducted from accreditation fees when an accreditation application is submitted within the first year of membership.",
  },
  {
    row: "What you submit",
    ind: "Updated CV, university degree, and evidence of competency and qualifications in the relevant field.",
    org: "Organization details, legal status document and an authorized representative.",
  },
];

const WHY_JOIN = [
  {
    icon: "book" as const,
    title: "Exclusive resources",
    text: "Resources tailored for personal and organizational development — from webinars on international standards development to assessment-preparation material.",
  },
  {
    icon: "globe" as const,
    title: "A global community",
    text: "Networking with like-minded professionals and institutions across the quality and accreditation community, in every region AAA serves.",
  },
  {
    icon: "chart" as const,
    title: "Leadership opportunities",
    text: "Career-building opportunities that enhance your credibility — including eligibility to join AAA Technical Committees and help shape industry standards.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Choose your membership",
    text: "Individual membership for professionals, organizational membership for institutions. Both can be applied for online.",
  },
  {
    n: "02",
    title: "Submit your application",
    text: "Complete the membership form with your details, then email the supporting documents AAA asks for — a CV for individuals, a legal status document for organizations.",
  },
  {
    n: "03",
    title: "Be recognized and listed",
    text: "On approval you receive your validated membership certificate and your enrolment in the American Directory for Competent Persons.",
  },
];

const FAQ = [
  {
    q: "What is the difference between individual and organizational membership?",
    a: "Individual membership is for professionals who want to advance their accreditation knowledge and career — it runs for two years at $350. Organizational membership is for institutions that want to be associated with AAA, runs for one year at $500, and includes a licence to use the AAA Membership Logo plus benefits for two members of staff.",
  },
  {
    q: "How much does AAA membership cost?",
    a: "Individual membership costs $350 and lasts two years. Organizational membership costs $500 and lasts one year.",
  },
  {
    q: "Is membership the same as accreditation?",
    a: "No. Membership is an association with AAA, not an accreditation decision. For institutions it can be the first step in the journey to full accreditation, and it also benefits organizations that want to be associated with AAA without going through the full accreditation process. Members undertake not to represent themselves as accredited before accreditation has been granted.",
  },
  {
    q: "Can membership fees be credited against accreditation fees?",
    a: "Yes, for organizational members. Membership fees are deducted from accreditation fees if an accreditation application is submitted within the first year of the membership duration.",
  },
  {
    q: "What do I need to apply for individual membership?",
    a: "An updated CV, a university degree, and evidence of competency and qualifications in the relevant field.",
  },
  {
    q: "What is the ADCP?",
    a: "The American Directory for Competent Persons — the AAA directory in which members are listed. Individual members are listed personally; organizational members can enrol two members of their staff.",
  },
];

export default function Page() {
  return (
    <main className="axp memx">
      <JsonLd
        schema={[
          breadcrumbSchema([{ name: "Membership", path: "/membership" }]),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        image="/member-approved-nigar.jpg"
        eyebrow="AAA Membership"
        title={
          <>
            Your gateway to excellence and <em>professional growth.</em>
          </>
        }
        intro="The American Accreditation Association invites both organizations and individuals to become part of a prestigious global community dedicated to advancing accreditation standards and fostering professional development."
        crumbs={[{ label: "Membership" }]}
        meta={[
          { k: "Individual", v: "$350 / 2 yrs" },
          { k: "Organizational", v: "$500 / 1 yr" },
          { k: "Directory", v: "ADCP listing" },
        ]}
        caption={{
          kicker: "Nigar Aslanova · Azerbaijan",
          title: "Five-star approved AAA member",
          chip: "Member",
        }}
        actions={
          <>
            <Link href="/membership/apply" className="ax-btn ax-btn-gold">
              Apply for Membership <Icon name="arrow" size={16} />
            </Link>
            <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-ghost">
              Book a Free Consultation
            </a>
          </>
        }
      />

      {/* 01 — the two pathways */}
      <section className="ax-section" id="pathways">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Membership pathways</span>
            <h2>Two ways to join the AAA community</h2>
            <p>
              Whether you are building professional standing or preparing an institution for a
              stronger accreditation journey, membership gives you a visible, verifiable connection
              to a standards-focused international community.
            </p>
          </div>

          <div className="ax-grid two">
            {TRACKS.map((t, i) => (
              <article className="ax-card reveal" key={t.title} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-ico ax-card-ico gold" aria-hidden="true">
                    <Icon name={i === 0 ? "shield" : "industry"} size={24} />
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {t.price}
                  </span>
                </div>
                <h3>{t.title}</h3>
                <p>
                  <strong>{t.tagline}</strong> {t.text}
                </p>
                <ul className="ax-checks gold">
                  {t.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <div className="ax-actions" style={{ marginTop: 22 }}>
                  <Link href={t.href} className="ax-btn ax-btn-blue sm">
                    {t.term} — learn more <Icon name="arrow" size={15} />
                  </Link>
                  <Link href={t.apply} className="ax-btn ax-btn-ghost-navy sm">
                    Apply
                  </Link>
                </div>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — side-by-side comparison */}
      <section className="ax-section cream" id="compare">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">Side by side</span>
            <h2>Individual or organizational — what changes?</h2>
            <p>
              The two memberships share the same benefit set. What differs is the term, the fee,
              who the benefits apply to, and what happens when you go on to full accreditation.
            </p>
          </div>

          <div className="memx-compare reveal" style={{ marginTop: 34 }}>
            <table>
              <caption className="memx-sr">
                Comparison of AAA individual and organizational membership
              </caption>
              <thead>
                <tr>
                  <th scope="col">Benefit</th>
                  <th scope="col">
                    <b>Individual</b> For professionals
                  </th>
                  <th scope="col">
                    <b>Organizational</b> For institutions
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.row}>
                    <th scope="row">{r.row}</th>
                    <td>{r.ind}</td>
                    <td>{r.org}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="memx-scroll-hint reveal">Scroll the table sideways on smaller screens.</p>

          <div className="memx-compare-foot reveal">
            <Link href="/membership/individual/apply" className="ax-btn ax-btn-blue">
              Apply as an individual <Icon name="arrow" size={16} />
            </Link>
            <Link href="/membership/organizational/apply" className="ax-btn ax-btn-ghost-navy">
              Apply as an organization <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 03 — why join */}
      <section className="ax-section navy" id="why">
        <div className="container">
          <div className="ax-split top">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Why join AAA?</span>
                <h2>
                  More than a designation — a commitment to <em>excellence and global impact.</em>
                </h2>
                <p>
                  Membership with AAA is more than just a designation. It is a working relationship
                  with an accreditation body that operates internationally, and a set of benefits
                  you can point to.
                </p>
              </div>
              <ul className="ax-stats three" aria-label="AAA at a glance">
                <li className="ax-stat">
                  <b>200+</b>
                  <span>Accredited organizations</span>
                </li>
                <li className="ax-stat">
                  <b>58+</b>
                  <span>Countries served</span>
                </li>
                <li className="ax-stat">
                  <b>100+</b>
                  <span>Assessors &amp; experts</span>
                </li>
              </ul>
            </div>

            <div className="ax-grid reveal">
              {WHY_JOIN.map((w, i) => (
                <article className="ax-card" key={w.title} style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="ax-card-top">
                    <span className="ax-ico ax-card-ico" aria-hidden="true">
                      <Icon name={w.icon} size={24} />
                    </span>
                  </div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — how to join */}
      <section className="ax-section" id="how">
        <div className="container">
          <div className="ax-split">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">How to join</span>
                <h2>Becoming a member takes three steps</h2>
                <p>
                  Applications are reviewed by the AAA membership team. You will hear back within
                  two business days with confirmation of your membership type and the payment
                  instructions for the method you selected.
                </p>
              </div>
              <div className="ax-steps-panel" style={{ marginTop: 30 }}>
                <h3>Your application route</h3>
                <ol className="ax-steps">
                  {STEPS.map((s) => (
                    <li className="ax-step" key={s.n}>
                      <span className="ax-step-num" aria-hidden="true">
                        {s.n}
                      </span>
                      <div className="ax-step-body">
                        <b>{s.title}</b>
                        <span>{s.text}</span>
                      </div>
                    </li>
                  ))}
                </ol>
                <span className="ax-pill">
                  <span className="ax-ico" aria-hidden="true">
                    <Icon name="mail" size={16} />
                  </span>
                  Questions? info@aaa-accreditation.org
                </span>
              </div>
            </div>

            <div className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <Icon name="clipboard" size={28} />
              </span>
              <h3>Start your membership application</h3>
              <p>
                One form covers both tracks — choose individual or organizational membership as you
                begin, and the AAA membership team takes it from there.
              </p>
              <Link href="/membership/apply" className="ax-btn ax-btn-gold">
                Apply for Membership <Icon name="arrow" size={16} />
              </Link>
              <ul className="ax-docs">
                <li className="ax-docs-title">Or go straight to a track</li>
                <li>
                  <Link href="/membership/individual/apply">
                    <span className="ax-ico" aria-hidden="true">
                      <Icon name="clipboard" size={16} />
                    </span>
                    Individual membership application
                    <i>FORM</i>
                  </Link>
                </li>
                <li>
                  <Link href="/membership/individual/recognized-competency">
                    <span className="ax-ico" aria-hidden="true">
                      <Icon name="cert" size={16} />
                    </span>
                    Recognized Competency Member
                    <i>FORM</i>
                  </Link>
                </li>
                <li>
                  <Link href="/membership/organizational/apply">
                    <span className="ax-ico" aria-hidden="true">
                      <Icon name="industry" size={16} />
                    </span>
                    Organizational membership application
                    <i>FORM</i>
                  </Link>
                </li>
              </ul>
              <p className="ax-panel-note">
                Applying does not create a membership until AAA confirms the outcome of its review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — members in practice */}
      <section className="ax-section cream" id="members">
        <div className="container">
          <div className="ax-split reverse">
            <figure className="ax-photo reveal">
              <Image
                src="/member-org-sowmya.jpg"
                alt="Dr. Sowmya NS, COO of Study Medic in India, sharing a five-star testimonial about her organization's association with the American Accreditation Association."
                fill
                sizes="(max-width: 980px) 92vw, 36vw"
              />
              <span className="ax-photo-badge">Members worldwide</span>
              <figcaption>
                Institutions and professionals across the AAA network.
                <span>Dr. Sowmya NS · COO, Study Medic · India</span>
              </figcaption>
            </figure>

            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Membership in practice</span>
                <h2>What members get, in plain terms</h2>
                <p>
                  Both memberships carry the same eight benefits. Individual members hold them
                  personally; organizational members extend the training and directory benefits to
                  two members of staff and gain a licence to display the AAA Membership Logo.
                </p>
              </div>
              <ul className="ax-checks">
                <li>An official membership certificate, validated through the AAA platform with a unique URL.</li>
                <li>One free training course each year.</li>
                <li>Enrolment in the American Directory for Competent Persons (ADCP).</li>
                <li>A QR-coded membership email signature.</li>
                <li>Free webinars on standards development, quality management, internal audits and assessment preparation.</li>
                <li>Two articles or papers published annually on the AAA website, with backlinks.</li>
                <li>Networking with peers across the quality and accreditation community.</li>
                <li>Eligibility to join AAA Technical Committees and help shape industry standards.</li>
              </ul>
              <div className="ax-actions">
                <Link href="/membership/individual" className="ax-btn ax-btn-blue">
                  Individual membership <Icon name="arrow" size={16} />
                </Link>
                <Link href="/membership/organizational" className="ax-btn ax-btn-ghost-navy">
                  Organizational membership
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — FAQ */}
      <section className="ax-section" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
            <p>Common questions about AAA membership, what it costs and what it includes.</p>
          </div>
          <div className="ax-faq-list">
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
        eyebrow="Take the first step"
        title={
          <>
            Ready to transform your journey with <em>AAA membership?</em>
          </>
        }
        text="Take the first step toward transforming your journey with AAA Accreditation Membership today. Tell us which track fits you and our membership team will handle the rest."
        primary={{ href: "/membership/apply", label: "Apply for Membership" }}
        secondary={{ href: "/contact", label: "Contact Membership" }}
        related={[
          { href: "/membership/individual", label: "Individual Membership" },
          { href: "/membership/organizational", label: "Organizational Membership" },
          { href: "/directory/accredited-organizations", label: "Accredited organizations" },
        ]}
      />
    </main>
  );
}
