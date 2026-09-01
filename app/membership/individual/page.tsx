import Link from "next/link";
import Image from "next/image";
import Icon from "../../_components/Icon";
import JsonLd from "../../_components/JsonLd";
import PageHero from "../../_components/PageHero";
import CTA from "../../_components/CTA";
import { pageMeta, breadcrumbSchema, faqSchema } from "../../../lib/seo";
import "../membership.css";

export const metadata = pageMeta({
  title: "Individual Membership",
  description:
    "AAA Individual Membership: $350 for two years. Validated certificate, one free training course a year, ADCP directory listing and committee eligibility.",
  path: "/membership/individual",
});

const CONSULT = "https://calendly.com/aaa-accreditation4/30min";

/* Content transcribed from aaa-accreditation.org/individual-membership. */

const IDEAL_FOR = [
  "Enhance your professional credentials and credibility.",
  "Gain recognition as a leader in promoting excellence and competence in your field.",
  "Access cutting-edge resources that support career growth and development.",
  "Contribute to setting global quality and accreditation standards.",
];

const BENEFITS = [
  {
    icon: "cert" as const,
    title: "Global Recognition",
    text: "Receive an official membership certificate from AAA, validated through our platform and linkable to your professional profiles with a unique URL.",
  },
  {
    icon: "book" as const,
    title: "Professional Training",
    text: "Attend one free training course each year to enhance your expertise.",
  },
  {
    icon: "clipboard" as const,
    title: "Directory Enrolment",
    text: "Be listed in the prestigious American Directory for Competent Persons (ADCP).",
  },
  {
    icon: "mail" as const,
    title: "Professional Branding",
    text: "Receive a QR-coded membership email signature to showcase your affiliation.",
  },
  {
    icon: "chart" as const,
    title: "Educational Webinars",
    text: "Access free webinars on international standards development, quality management, internal audits and assessment preparation in your area of interest.",
  },
  {
    icon: "doc" as const,
    title: "Content Contribution",
    text: "Publish two articles or papers annually on the AAA website, with backlinks to your personal website or professional account.",
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
  "Validated membership certificate with a unique URL",
  "One free training course every year",
  "Listing in the ADCP professional directory",
  "Two published articles or papers a year, with backlinks",
  "Eligibility for AAA Technical Committees",
];

const REQUIREMENTS = [
  "An updated CV",
  "A university degree",
  "Evidence of competency and qualifications in the relevant field",
];

const STEPS = [
  {
    n: "01",
    title: "Prepare your documents",
    text: "Gather your updated CV, your university degree and evidence of competency and qualifications in your field.",
  },
  {
    n: "02",
    title: "Submit the membership form",
    text: "Complete the individual membership application with your professional background, then email your CV so the competency review can begin.",
  },
  {
    n: "03",
    title: "Get verified and listed",
    text: "On approval you receive your validated certificate and your place in the American Directory for Competent Persons.",
  },
];

const FAQ = [
  {
    q: "How much does AAA individual membership cost and how long does it last?",
    a: "Individual membership costs $350 and runs for two years.",
  },
  {
    q: "Who is eligible for individual membership?",
    a: "Professionals who can provide an updated CV, a university degree, and evidence of competency and qualifications in the relevant field — industry experts, educators and quality professionals among them.",
  },
  {
    q: "What is the American Directory for Competent Persons?",
    a: "The ADCP is the AAA directory of competent persons. Individual members are enrolled in it, and their membership certificate is validated through the AAA platform with a unique URL that can be linked from professional profiles.",
  },
  {
    q: "Does individual membership mean I am accredited by AAA?",
    a: "No. Individual membership is a professional association with AAA and recognition of your competence as a member. It is not an accreditation of an organization, and members undertake not to represent themselves as accredited.",
  },
  {
    q: "What is a Recognized Competency Member application?",
    a: "It is a separate individual membership application route offered by AAA, using the same application form and the same supporting documents as the standard individual membership application.",
  },
];

export default function Page() {
  return (
    <main className="axp memx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Membership", path: "/membership" },
            { name: "Individual Membership", path: "/membership/individual" },
          ]),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        image="/member-approved-nigar.jpg"
        eyebrow="Individual Membership"
        title={
          <>
            Unlock new horizons in your <em>professional journey.</em>
          </>
        }
        intro="Membership with AAA isn’t just about accreditation — it’s about expanding your potential, connecting with a prestigious global network, and excelling in your professional endeavors."
        crumbs={[{ href: "/membership", label: "Membership" }, { label: "Individual" }]}
        meta={[
          { k: "Term", v: "2 years" },
          { k: "Fee", v: "$350" },
          { k: "Directory", v: "ADCP listing" },
        ]}
        caption={{
          kicker: "Nigar Aslanova · Azerbaijan",
          title: "Five-star approved AAA member",
          chip: "Member",
        }}
        actions={
          <>
            <Link href="/membership/individual/apply" className="ax-btn ax-btn-gold">
              Apply for Individual Membership <Icon name="arrow" size={16} />
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
                <h2>Built for professionals who set the standard</h2>
              </div>
              <span className="ax-rule" aria-hidden="true" />
              <p style={{ marginTop: 22 }}>
                Whether you are an industry expert, educator or quality professional, individual
                membership with AAA lets you play an active role in promoting quality and global
                excellence. Individual membership is ideal for anyone looking to:
              </p>
              <ul className="ax-checks gold">
                {IDEAL_FOR.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="ax-actions">
                <Link href="/membership/individual/apply" className="ax-btn ax-btn-blue">
                  Start your application <Icon name="arrow" size={16} />
                </Link>
                <Link href="/membership/organizational" className="ax-btn ax-btn-ghost-navy">
                  Compare organizational
                </Link>
              </div>
            </div>

            <div className="ax-panel reveal">
              <span className="ax-ico ax-panel-ico" aria-hidden="true">
                <Icon name="cert" size={28} />
              </span>
              <h3>What you&rsquo;ll need to apply</h3>
              <p>
                AAA reviews each application against its membership criteria. Have these ready
                before you begin — the form takes a few minutes once you do.
              </p>
              <ul className="ax-checks">
                {REQUIREMENTS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <Link href="/membership/individual/apply" className="ax-btn ax-btn-gold">
                Apply now <Icon name="arrow" size={16} />
              </Link>
              <p className="ax-panel-note">
                Applying for the Recognized Competency Member route instead?{" "}
                <Link href="/membership/individual/recognized-competency" className="ax-link">
                  Use this form
                </Link>
                .
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
              Eight ways membership advances your expertise, credibility and connections across the
              global quality and accreditation community.
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

      {/* 03 — membership details / price */}
      <section className="ax-section" id="details">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">Membership details</span>
            <h2>One fee. Two years. Everything included.</h2>
          </div>

          <div className="memx-price-card reveal" style={{ marginTop: 34 }}>
            <div className="memx-price-main">
              <span className="eyebrow">Individual membership</span>
              <div className="memx-fig">
                <span className="cur">$</span>350
                <span className="per">/ 2 years</span>
              </div>
              <p>
                A single fee of $350 covers your full two-year individual membership — no recurring
                charges and no hidden costs.
              </p>
              <Link href="/membership/individual/apply" className="ax-btn ax-btn-gold">
                Apply for Individual Membership <Icon name="arrow" size={16} />
              </Link>
            </div>

            <div className="memx-price-side">
              <h3>What the fee covers</h3>
              <ul className="ax-checks gold">
                {INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="memx-price-note">
                Representing an institution instead? <Link href="/membership/organizational">
                  Organizational Membership
                </Link>{" "}
                extends the training and directory benefits to two members of your staff.
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
                  From application to recognition, the path to AAA individual membership is
                  straightforward and supported at every stage.
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
                  Send your CV to info@aaa-accreditation.org
                </span>
              </div>
            </div>

            <figure className="ax-photo reveal">
              <Image
                src="/sme-journey-team.jpg"
                alt="AAA members and assessors working together during a quality assessment session."
                fill
                sizes="(max-width: 980px) 92vw, 36vw"
              />
              <span className="ax-photo-badge">The AAA network</span>
              <figcaption>
                Professionals across 58 countries hold AAA membership and recognition.
                <span>Networking, training and technical committee work</span>
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
            <p>Common questions about AAA individual membership.</p>
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
            Ready to join as an <em>individual member?</em>
          </>
        }
        text="Complete the individual membership application and the AAA membership team will review your professional background, confirm the fee and guide you through enrolment in the ADCP."
        primary={{ href: "/membership/individual/apply", label: "Apply for Individual Membership" }}
        secondary={{ href: "/contact", label: "Contact Membership" }}
        related={[
          { href: "/membership", label: "Membership overview" },
          { href: "/membership/individual/recognized-competency", label: "Recognized Competency Member" },
          { href: "/membership/organizational", label: "Organizational Membership" },
        ]}
      />
    </main>
  );
}
