import Link from "next/link";
import Image from "next/image";
import Icon from "../../_components/Icon";
import JsonLd from "../../_components/JsonLd";
import PageHero from "../../_components/PageHero";
import CTA from "../../_components/CTA";
import { pageMeta, breadcrumbSchema, faqSchema } from "../../../lib/seo";
import "../membership.css";

export const metadata = pageMeta({
  title: "Organizational Membership",
  description:
    "AAA Organizational Membership: $500 for one year, credited against your accreditation fees. Certificate, logo licence and ADCP listing for two staff.",
  path: "/membership/organizational",
});

const CONSULT = "https://calendly.com/aaa-accreditation4/30min";

/* Content transcribed from aaa-accreditation.org/organizational-membership. */

const WHO_CAN_JOIN = [
  "Institutions taking the first step in the journey to full AAA accreditation.",
  "Organizations that want to be associated with AAA without going through the full accreditation process.",
  "Any entity with an interest in promoting quality and competence through accreditation.",
  "Institutions that want a visible way to showcase their commitment to high-quality standards.",
];

const BENEFITS = [
  {
    icon: "cert" as const,
    title: "Global Recognition",
    text: "An official membership certificate from AAA, validated through our platform with a unique URL — plus permission to use the AAA Membership Logo on your website and promotional material.",
  },
  {
    icon: "book" as const,
    title: "Professional Training",
    text: "Two members of your institution are eligible to attend one free training course each year to enhance their expertise.",
  },
  {
    icon: "clipboard" as const,
    title: "Directory Enrolment",
    text: "Two members of your institution are listed in the prestigious American Directory for Competent Persons (ADCP).",
  },
  {
    icon: "mail" as const,
    title: "Professional Branding",
    text: "Receive a QR-coded membership email signature so your team can showcase its affiliation.",
  },
  {
    icon: "chart" as const,
    title: "Educational Webinars",
    text: "Access free webinars on international standards development, quality management, internal audits and assessment preparation in your area of interest.",
  },
  {
    icon: "doc" as const,
    title: "Content Contribution",
    text: "Publish two articles or papers annually on the AAA website, with backlinks to your institution's website or professional account.",
  },
  {
    icon: "globe" as const,
    title: "Networking Opportunities",
    text: "Connect and collaborate with peers in the quality and accreditation community through various networking initiatives.",
  },
  {
    icon: "scale" as const,
    title: "Committee Membership",
    text: "Gain eligibility to join AAA Technical Committees and actively engage in shaping your industry's standards.",
  },
];

const INCLUDED = [
  "Validated membership certificate + AAA Membership Logo licence",
  "Two staff: one free training course each year",
  "Two staff listed in the ADCP professional directory",
  "Two published articles or papers a year, with backlinks",
  "Eligibility for AAA Technical Committees",
];

const STEPS = [
  {
    n: "01",
    title: "Apply for membership",
    text: "Submit the organizational membership application with your institution's details and an authorized representative, then email a copy of your legal status document.",
  },
  {
    n: "02",
    title: "Get recognized",
    text: "Receive your official membership certificate and AAA Membership Logo licence, and enrol two members of staff in the ADCP directory.",
  },
  {
    n: "03",
    title: "Credit it toward accreditation",
    text: "Submit an accreditation application within the first year of membership and your $500 membership fee is deducted from your accreditation fees.",
  },
];

const FAQ = [
  {
    q: "How much does AAA organizational membership cost and how long does it last?",
    a: "Organizational membership costs $500 and runs for one year.",
  },
  {
    q: "Can the membership fee be credited against accreditation fees?",
    a: "Yes. Membership fees are deducted from accreditation fees if an accreditation application is submitted within the first year of the membership duration.",
  },
  {
    q: "Who can become an organizational member?",
    a: "Organizational membership is appropriate for any entity that has an interest in promoting quality and competence through accreditation. It can be the first step in the journey to full accreditation, and it also benefits institutions that would like to be associated with AAA without going through the full accreditation process.",
  },
  {
    q: "Does organizational membership mean my institution is accredited?",
    a: "No. The term “AAA Organizational Member” means the institution is a member of AAA. Members undertake not to represent their institution as accredited before accreditation has been granted, nor after it has been withdrawn or suspended.",
  },
  {
    q: "How many staff benefit from an organizational membership?",
    a: "Two members of your institution are eligible for one free training course each year and are listed in the American Directory for Competent Persons.",
  },
];

export default function Page() {
  return (
    <main className="axp memx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Membership", path: "/membership" },
            { name: "Organizational Membership", path: "/membership/organizational" },
          ]),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        image="/member-org-sowmya.jpg"
        eyebrow="Organizational Membership"
        title={
          <>
            Your first step to excellence and <em>global recognition.</em>
          </>
        }
        intro="AAA membership can be the first step in the journey to full accreditation — and it also benefits institutions that want to be associated with AAA without going through the full accreditation process."
        crumbs={[{ href: "/membership", label: "Membership" }, { label: "Organizational" }]}
        meta={[
          { k: "Term", v: "1 year" },
          { k: "Fee", v: "$500" },
          { k: "Staff covered", v: "2 members" },
        ]}
        caption={{
          kicker: "Dr. Sowmya NS · Study Medic, India",
          title: "Associated with AAA Accreditation",
          chip: "Member",
        }}
        actions={
          <>
            <Link href="/membership/organizational/apply" className="ax-btn ax-btn-gold">
              Apply for Organizational Membership <Icon name="arrow" size={16} />
            </Link>
            <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-ghost">
              Book a Free Consultation
            </a>
          </>
        }
      />

      {/* 01 — who it is for */}
      <section className="ax-section" id="who">
        <div className="container">
          <div className="ax-split">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">Who it&rsquo;s for</span>
                <h2>Open to any organization committed to quality</h2>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <p style={{ marginTop: 22 }}>
                Organizational membership is appropriate for any entity that has an interest in
                promoting quality and competence through accreditation — whether as a first step
                toward full accreditation or as a lasting association with AAA.
              </p>
              <ul className="ax-checks gold">
                {WHO_CAN_JOIN.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="ax-actions">
                <Link href="/membership/organizational/apply" className="ax-btn ax-btn-blue">
                  Start your application <Icon name="arrow" size={16} />
                </Link>
                <Link href="/membership/individual" className="ax-btn ax-btn-ghost-navy">
                  Compare individual
                </Link>
              </div>
            </div>

            <div className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <Icon name="industry" size={28} />
              </span>
              <h3>What you&rsquo;ll need to apply</h3>
              <p>
                The application asks for your institution&rsquo;s profile and one authorized
                representative who signs the declaration on its behalf.
              </p>
              <ul className="ax-checks">
                <li>Organization profile: legal status, date of establishment and staff count</li>
                <li>Head office address and any other operating locations</li>
                <li>Details of any certifications or memberships already held</li>
                <li>An authorized representative with their qualifications and contact details</li>
                <li>A copy of the organization&rsquo;s legal status document</li>
              </ul>
              <Link href="/membership/organizational/apply" className="ax-btn ax-btn-gold">
                Apply now <Icon name="arrow" size={16} />
              </Link>
              <p className="ax-panel-note">
                The declaration is made by the principal of the institution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — benefits */}
      <section className="ax-section cream" id="benefits">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">Member benefits</span>
            <h2>Why become a member of AAA Accreditation?</h2>
            <p>
              Eight ways membership elevates your institution&rsquo;s credibility, capability and
              connections across the global quality and accreditation community.
            </p>
          </div>

          <div className="ax-grid four">
            {BENEFITS.map((b, i) => (
              <article className="ax-card reveal" key={b.title} style={{ transitionDelay: `${i * 45}ms` }}>
                <div className="ax-card-top">
                  <span className="ax-ico ax-card-ico" aria-hidden="true">
                    <Icon name={b.icon} size={24} />
                  </span>
                  <span className="ax-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
                <span className="ax-card-rule" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — price + accreditation credit */}
      <section className="ax-section" id="details">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">Membership details</span>
            <h2>Membership that can pay for itself</h2>
          </div>

          <div className="memx-price-card reveal" style={{ marginTop: 34 }}>
            <div className="memx-price-main">
              <span className="eyebrow">Organizational membership</span>
              <div className="memx-fig">
                <span className="cur">$</span>500
                <span className="per">/ 1 year</span>
              </div>
              <p>
                A single fee of $500 covers a full one-year organizational membership for your
                institution — no recurring charges and no hidden costs.
              </p>
              <Link href="/membership/organizational/apply" className="ax-btn ax-btn-gold">
                Apply for Organizational Membership <Icon name="arrow" size={16} />
              </Link>
              <div className="memx-credit on-dark">
                <span className="ax-ico" aria-hidden="true">
                  <Icon name="cert" size={16} />
                </span>
                $500 membership &rarr; credited toward accreditation
              </div>
            </div>

            <div className="memx-price-side">
              <h3>What the fee covers</h3>
              <ul className="ax-checks gold">
                {INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="memx-price-note">
                <strong>Fees credited toward accreditation.</strong> Membership fees are deducted
                from accreditation fees if an accreditation application is submitted within the
                first year of the membership duration. Joining as a professional instead? See{" "}
                <Link href="/membership/individual">Individual Membership</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — how to join */}
      <section className="ax-section cream" id="how">
        <div className="container">
          <div className="ax-split">
            <div className="reveal">
              <div className="ax-head">
                <span className="eyebrow">How to join</span>
                <h2>Becoming a member takes three steps</h2>
                <p>
                  From application to recognition — and on to accreditation — the path to AAA
                  organizational membership is straightforward and supported at every stage.
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
                  Send your legal status document to info@aaa-accreditation.org
                </span>
              </div>
            </div>

            <figure className="ax-photo reveal">
              <Image
                src="/member-org-sowmya.jpg"
                alt="Dr. Sowmya NS, COO of Study Medic in India, sharing a five-star testimonial about her organization's association with the American Accreditation Association."
                fill
                sizes="(max-width: 980px) 92vw, 36vw"
              />
              <span className="ax-photo-badge">Verified membership</span>
              <figcaption>
                Institutions across the AAA network hold verified membership and recognition.
                <span>Dr. Sowmya NS · COO, Study Medic · India</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 05 — FAQ */}
      <section className="ax-section" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Frequently asked questions</h2>
            <p>Common questions about AAA organizational membership.</p>
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
            Ready to associate your institution with <em>AAA?</em>
          </>
        }
        text="Complete the organizational membership application and the AAA membership team will confirm your membership, issue your certificate and logo licence, and explain how your fee is credited if you go on to full accreditation."
        primary={{ href: "/membership/organizational/apply", label: "Apply for Organizational Membership" }}
        secondary={{ href: "/contact", label: "Contact Membership" }}
        related={[
          { href: "/membership", label: "Membership overview" },
          { href: "/membership/individual", label: "Individual Membership" },
          { href: "/programs/smes-accreditation-program", label: "SME Accreditation Program" },
        ]}
      />
    </main>
  );
}
