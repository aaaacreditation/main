import Link from "next/link";
import Image from "next/image";
import PageHero from "../../_components/PageHero";
import JsonLd from "../../_components/JsonLd";
import NavyCard from "../../_components/site/NavyCard";
import SectionHead from "../../_components/site/SectionHead";
import Glyph, { type GlyphName } from "../../_components/site/Glyph";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";
import "./org.css";

/*
 * Organizational Membership — rebuilt Oct 2026 on the client's final page
 * structure ("Organizational Membership" package: Hero → Who Should Consider →
 * Benefits → Membership vs Accreditation → Plan → How It Works → Real Members →
 * Final CTA), rendered in the AAA design system with the SME blue card.
 * Page styles live in ./org.css under `.morg` (membership.css is shared by the
 * other membership routes and is intentionally not imported here).
 */

export const metadata = pageMeta({
  title: "Organizational Membership",
  description:
    "Join the AAA global quality community for $500 a year: membership certificate, complimentary training places, ADCP listing, webinars and networking.",
  path: "/membership/organizational",
  keywords: [
    "AAA organizational membership",
    "American Accreditation Association membership",
    "quality community membership",
    "membership vs accreditation",
    "ADCP listing",
  ],
});

const IMG = "/images/site/membership-organizational";
const APPLY = "/membership/organizational/apply";

const FIT: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "compass",
    title: "Not Yet Ready for Accreditation",
    text: "Organizations that are interested in AAA but are not yet ready to begin a formal accreditation process can use membership as a way to engage, learn, and prepare.",
  },
  {
    icon: "graduation",
    title: "Seeking Professional Development",
    text: "Organizations looking for learning opportunities, webinars, training benefits, and access to quality-focused professional development activities.",
  },
  {
    icon: "network",
    title: "Interested in Participation & Knowledge Sharing",
    text: "Organizations wishing to connect with the AAA community, contribute knowledge, participate in relevant activities, and build stronger professional relationships.",
  },
];

const BENEFITS: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "certificate",
    title: "Membership Recognition",
    text: "Receive an official AAA Organizational Membership Certificate, online validation, and the right to use the AAA Organizational Member Logo in accordance with applicable rules.",
  },
  {
    icon: "graduation",
    title: "Professional Development",
    text: "Two representatives from your organization can benefit from one complimentary AAA training course each year, supporting continued learning and professional growth.",
  },
  {
    icon: "id-card",
    title: "Professional Visibility",
    text: "Two eligible representatives can be listed in the American Directory for Competent Persons (ADCP), supported by QR-coded membership communication benefits.",
  },
  {
    icon: "lightbulb",
    title: "Knowledge & Insights",
    text: "Access educational webinars and quality-focused resources covering standards, management systems, internal audits and preparation for future assessment activities.",
  },
  {
    icon: "file-text",
    title: "Share Your Expertise",
    text: "Organizational Members may have opportunities to contribute up to two articles or papers annually through AAA channels, subject to applicable editorial and publication requirements.",
  },
  {
    icon: "handshake",
    title: "Participate & Connect",
    text: "Build professional relationships through AAA networking opportunities and become eligible to participate in relevant Technical Committees and community activities.",
  },
];

/** true = included in Organizational Membership; every row is included in accreditation. */
const COMPARE: [string, boolean][] = [
  ["Access to AAA professional community", true],
  ["Professional development opportunities", true],
  ["Complimentary training benefits", true],
  ["Access to educational webinars", true],
  ["Networking opportunities", true],
  ["Opportunities to contribute articles/papers", true],
  ["Eligibility to participate in relevant Technical Committees", true],
  ["ADCP listing for eligible representatives", true],
  ["Member communication/signature benefits", true],
  ["Independent assessment against defined requirements", false],
  ["Formal accreditation decision", false],
  ["AAA Accreditation Certificate", false],
  ["Accredited status for the approved scope", false],
  ["Use of applicable AAA Accreditation Symbol", false],
  ["Listing in the AAA Accredited Directory", false],
  ["Independent demonstration of conformity/competence", false],
  ["Formal recognition through the applicable AAA accreditation program", false],
];

const PLAN = [
  "Official AAA Organizational Membership Certificate",
  "Use of the AAA Organizational Member Logo, subject to applicable rules",
  "Two complimentary training places annually",
  "Educational webinars and professional development opportunities",
  "ADCP listing for two eligible representatives",
  "QR-coded membership communication/signature benefits",
  "Opportunities to contribute articles or papers through AAA channels",
  "Networking and relevant Technical Committee participation opportunities",
];

const STEPS: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "file-text",
    title: "Submit Your Application",
    text: "Complete the Organizational Membership application and provide the required information about your organization.",
  },
  {
    icon: "search-check",
    title: "Application Review",
    text: "AAA reviews the submitted information to confirm that the application meets the applicable Organizational Membership requirements.",
  },
  {
    icon: "badge-check",
    title: "Membership Approval",
    text: "Following successful review and completion of the applicable membership requirements, your organization is approved as an AAA Organizational Member.",
  },
  {
    icon: "rocket",
    title: "Access Your Benefits",
    text: "Begin using the applicable membership benefits, professional development opportunities and AAA community resources during your membership period.",
  },
];

const MEMBERS = [
  {
    name: "MasterMinds Business School",
    country: "United Kingdom",
    sector: "Education",
    text: "A UK-based business school providing executive education, professional courses, university pathways, corporate training and international learning activities.",
    img: `${IMG}/member-masterminds-business-school.jpg`,
    alt: "MasterMinds Business School representatives at a professional education event",
    pos: "center 35%",
  },
  {
    name: "International Agency for Quality of Education Assessment",
    country: "Kazakhstan",
    sector: "Quality Assurance",
    text: "Part of the international quality community, with activities focused on education quality assurance and the assessment of educational quality.",
    img: `${IMG}/member-international-agency-kazakhstan.jpg`,
    alt: "Representatives of an education quality assurance organization in Kazakhstan",
    pos: "center 30%",
  },
  {
    name: "Eagleversity Royal Professional University",
    country: "United States",
    sector: "Education",
    text: "A professional higher education institution with a practice-based approach that connects academic learning with professional and experiential development.",
    img: `${IMG}/member-eagleversity-usa.jpeg`,
    alt: "Eagleversity Royal Professional University representatives in academic regalia",
    pos: "center 30%",
  },
];

function Tick({ gold, label }: { gold?: boolean; label: string }) {
  return (
    <span className={`morg-tick${gold ? " gold" : ""}`}>
      <Glyph name="check" size={14} strokeWidth={2.6} />
      <span className="sr-only">{label}</span>
    </span>
  );
}

export default function OrganizationalMembershipPage() {
  return (
    <div className="axp morg">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Membership", path: "/membership" },
          { name: "Organizational Membership", path: "/membership/organizational" },
        ])}
      />

      {/* 01 — Hero */}
      <PageHero
        eyebrow="Organizational Membership"
        crumbs={[{ href: "/membership", label: "Membership" }, { label: "Organizational Membership" }]}
        title={
          <>
            Organizational Membership
            <span className="morg-tagline">Join the AAA Global Quality Community</span>
          </>
        }
        intro="Connect your organization with an international community committed to quality, competence and continuous improvement, with access to professional development, networking and knowledge-sharing opportunities."
        image={`${IMG}/organizational-membership-hero.jpg`}
        imageAlt="Organizational member team with membership certificate"
        caption={{
          kicker: "AAA Organizational Member",
          title: "A real AAA Organizational Membership organization and team.",
        }}
        actions={
          <>
            <Link href={APPLY} className="ax-btn ax-btn-gold">
              Become an Organizational Member <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
            <a href="#benefits" className="ax-btn ax-btn-ghost">
              Explore Member Benefits
            </a>
            <ul className="morg-chips" aria-label="Organizational Membership at a glance">
              <li>
                <strong>$500</strong> / Year
              </li>
              <li>Professional Development</li>
              <li>Global Quality Community</li>
            </ul>
            <p className="morg-hero-note">
              <Glyph name="lightbulb" size={18} />
              <span>
                If your organization is eligible for an AAA accreditation program, accreditation provides the stronger
                recognition pathway. Organizational Membership can support organizations that want to engage with the
                AAA community while preparing for future accreditation.
              </span>
            </p>
          </>
        }
      />

      {/* 02 — Who should consider membership */}
      <section className="ax-section" id="who-should-consider-membership">
        <div className="container">
          <SectionHead
            center
            eyebrow="Is Membership Right for Your Organization?"
            title="Who Should Consider Organizational Membership?"
            intro="Organizational Membership is designed for organizations that want to engage with the AAA quality community, access professional development opportunities, and participate in knowledge-sharing activities."
          />
          <div className="ax-blue-grid">
            {FIT.map((f, i) => (
              <NavyCard key={f.title} icon={f.icon} no={String(i + 1).padStart(2, "0")} title={f.title}>
                <p>{f.text}</p>
              </NavyCard>
            ))}
          </div>

          <div className="morg-callout reveal">
            <span className="morg-callout-ico" aria-hidden="true">
              <Glyph name="award" />
            </span>
            <div>
              <h3>Eligible for an AAA Accreditation Program?</h3>
              <p>
                If your organization is eligible for accreditation, accreditation provides the stronger recognition
                pathway and should be considered as the primary option. Organizational Membership is most suitable when
                your organization is not yet ready to pursue accreditation.
              </p>
            </div>
            <Link href="/programs" className="ax-btn ax-btn-blue">
              Explore Accreditation Programs <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* 03 — Benefits */}
      <section className="ax-section cream" id="benefits">
        <div className="container">
          <SectionHead
            center
            eyebrow="Membership Benefits"
            title="Practical Benefits for Your Organization"
            intro="Organizational Membership gives your organization access to professional development, visibility, knowledge-sharing and participation opportunities within the AAA community."
          />
          <div className="ax-blue-grid">
            {BENEFITS.map((b, i) => (
              <NavyCard key={b.title} icon={b.icon} no={String(i + 1).padStart(2, "0")} title={b.title}>
                <p>{b.text}</p>
              </NavyCard>
            ))}
          </div>
          <p className="ax-note morg-note reveal">
            Membership provides professional and community benefits. It does not represent accreditation or confer
            accredited status. The next section explains how accreditation provides the stronger recognition pathway
            for eligible organizations.
          </p>
        </div>
      </section>

      {/* 04 — Membership vs accreditation */}
      <section className="ax-section" id="membership-vs-accreditation">
        <div className="container">
          <SectionHead
            center
            eyebrow="Membership & Accreditation"
            title="Membership Is a Starting Point. Accreditation Goes Further."
            intro="Organizational Membership connects your organization with the AAA community and provides valuable professional benefits. Accreditation includes the applicable professional and community benefits while adding independent assessment and formal recognition against defined requirements."
          />

          <div className="morg-compare">
            <div className="morg-table-wrap reveal">
              <table className="morg-table">
                <caption className="sr-only">
                  Comparison of Organizational Membership and AAA Accreditation benefits and recognition
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Benefits &amp; Recognition</th>
                    <th scope="col">Organizational Membership</th>
                    <th scope="col" className="is-accred">
                      <span className="morg-accred-label">Stronger Recognition</span>
                      AAA Accreditation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map(([label, member]) => (
                    <tr key={label} className={member ? undefined : "is-extra"}>
                      <th scope="row">{label}</th>
                      <td>
                        {member ? (
                          <Tick label="Included" />
                        ) : (
                          <>
                            <span className="morg-dash" aria-hidden="true">
                              —
                            </span>
                            <span className="sr-only">Not included</span>
                          </>
                        )}
                      </td>
                      <td className="is-accred">
                        <Tick gold label="Included" />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">Annual / Program Cost</th>
                    <td>$500 / year</td>
                    <td className="is-accred">Depends on program &amp; scope</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <aside className="morg-compare-side">
              <NavyCard
                icon="trending-up"
                tag="Stronger Recognition"
                title="Why Go Further with Accreditation?"
                href="/programs"
                cta="Explore Accreditation Programs"
              >
                <p>
                  If your organization is eligible for an AAA accreditation program, accreditation provides the stronger
                  pathway. In addition to applicable professional and community benefits, accreditation involves
                  independent assessment against defined requirements and provides formal accredited status within the
                  approved scope.
                </p>
              </NavyCard>
              <NavyCard
                icon="users"
                title="Not Ready for Accreditation Yet?"
                href={APPLY}
                cta="Become an Organizational Member"
              >
                <p>
                  Organizational Membership allows your organization to engage with the AAA community, access member
                  benefits, and prepare for a future accreditation journey.
                </p>
              </NavyCard>
            </aside>
          </div>

          <p className="ax-note gold morg-credit reveal">
            <Glyph name="refresh" size={20} />
            <span>
              <strong>Move from Membership to Accreditation:</strong>
              If you apply for AAA accreditation during your first year of membership, your{" "}
              <b>$500 membership fee can be credited toward your accreditation fees</b>, subject to the applicable AAA
              terms and program requirements.
            </span>
          </p>
        </div>
      </section>

      {/* 05 — Membership plan */}
      <section className="ax-section cream" id="membership-plan">
        <div className="container morg-plan">
          <div className="morg-plan-copy">
            <SectionHead
              eyebrow="Organizational Membership"
              title="One Membership. Practical Benefits Throughout the Year."
              intro="Join the AAA quality community through a straightforward annual membership designed to support professional development, participation, visibility and knowledge sharing."
            />
            <div className="morg-credit-card reveal">
              <span className="morg-callout-ico" aria-hidden="true">
                <Glyph name="trending-up" />
              </span>
              <div>
                <h3>Planning to Move Forward with Accreditation?</h3>
                <p>
                  If your organization applies for AAA accreditation during the first year of membership, the $500
                  membership fee can be credited toward the accreditation fees, subject to applicable AAA terms and
                  program requirements.
                </p>
              </div>
            </div>
          </div>

          <aside className="morg-price reveal" aria-labelledby="morg-price-h">
            <div className="morg-price-head">
              <span className="morg-price-label">Annual Membership Fee</span>
              <span className="morg-price-fig">$500</span>
              <span className="morg-price-per">per organization / year</span>
              <p>
                Organizational Membership is valid for one year and can be renewed annually in accordance with
                applicable AAA membership requirements.
              </p>
            </div>
            <div className="morg-price-body">
              <h3 id="morg-price-h">Your Organizational Membership Includes</h3>
              <ul className="morg-price-list">
                {PLAN.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <div className="morg-price-actions">
                <Link href={APPLY} className="ax-btn ax-btn-gold">
                  Apply for Organizational Membership <Glyph name="arrow-right" size={14} strokeWidth={2} />
                </Link>
                <Link href="/programs" className="ax-btn ax-btn-ghost">
                  Explore Accreditation Programs
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 06 — How membership works */}
      <section className="ax-section" id="how-membership-works">
        <div className="container">
          <SectionHead
            center
            eyebrow="Simple Membership Process"
            title="How Organizational Membership Works"
            intro="A straightforward process to join the AAA community and begin accessing Organizational Membership benefits."
          />
          <ol className="morg-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="morg-step-dot" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <NavyCard icon={s.icon} no={String(i + 1).padStart(2, "0")} title={s.title}>
                  <p>{s.text}</p>
                </NavyCard>
              </li>
            ))}
          </ol>

          <div className="morg-callout reveal">
            <span className="morg-callout-ico" aria-hidden="true">
              <Glyph name="flag" />
            </span>
            <div>
              <h3>Ready to Join the AAA Community?</h3>
              <p>
                Start with the Organizational Membership application. If your organization is ready for formal
                accreditation, explore the applicable accreditation program instead.
              </p>
            </div>
            <Link href={APPLY} className="ax-btn ax-btn-blue">
              Start Membership Application <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* 07 — Real organizational members */}
      <section className="ax-section cream" id="organizational-members">
        <div className="container">
          <SectionHead
            center
            eyebrow="AAA Organizational Members"
            title="Organizations Connected Through Quality"
            intro="AAA Organizational Membership brings together organizations from different countries that share an interest in quality, professional development, knowledge exchange and international engagement."
          />
          <div className="ax-blue-grid">
            {MEMBERS.map((m) => (
              <NavyCard key={m.name} title={m.name} className="morg-member">
                <figure className="morg-member-photo">
                  <Image
                    src={m.img}
                    alt={m.alt}
                    fill
                    sizes="(max-width: 560px) 92vw, (max-width: 860px) 46vw, 380px"
                    style={{ objectPosition: m.pos }}
                  />
                  <figcaption>
                    <span className="morg-member-tag country">
                      <Glyph name="pin" size={12} strokeWidth={2} /> {m.country}
                    </span>
                    <span className="morg-member-tag">{m.sector}</span>
                  </figcaption>
                </figure>
                <p>{m.text}</p>
                <span className="morg-member-foot">
                  <Glyph name="badge-check" size={16} /> AAA Organizational Member
                </span>
              </NavyCard>
            ))}
          </div>

          <div className="morg-callout reveal">
            <span className="morg-callout-ico" aria-hidden="true">
              <Glyph name="globe" />
            </span>
            <div>
              <h3>Be Part of the AAA Quality Community</h3>
              <p>
                Connect your organization with an international professional community focused on quality, learning and
                knowledge sharing. If your organization is ready for formal recognition, explore the applicable AAA
                accreditation pathway.
              </p>
            </div>
            <Link href={APPLY} className="ax-btn ax-btn-blue">
              Become an Organizational Member <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* 08 — Final CTA (hand-rolled .ax-close so the choose-pair stays in the same band) */}
      <section className="ax-close" id="membership-final-cta">
        <span className="ax-close-corner" aria-hidden="true" />
        <div className="container">
          <div className="ax-close-inner reveal">
            <span className="eyebrow">Your Next Step</span>
            <h2>Ready to Connect Your Organization with AAA?</h2>
            <p>
              Join the AAA professional community through Organizational Membership, or take the stronger recognition
              pathway through accreditation if your organization is ready to be independently assessed against defined
              requirements.
            </p>
            <div className="ax-close-actions">
              <Link href={APPLY} className="ax-btn ax-btn-gold">
                Apply for Organizational Membership <Glyph name="arrow-right" size={14} strokeWidth={2} />
              </Link>
              <Link href="/programs" className="ax-btn ax-btn-ghost">
                Explore Accreditation Programs
              </Link>
            </div>
          </div>
          <div className="morg-choose reveal">
            <div>
              <span className="morg-choose-ico" aria-hidden="true">
                <Glyph name="users" size={20} />
              </span>
              <strong>Choose Membership if...</strong>
              <p>
                Your organization wants professional development, networking, knowledge sharing and engagement with the
                AAA community, but is not yet ready for accreditation.
              </p>
            </div>
            <div>
              <span className="morg-choose-ico" aria-hidden="true">
                <Glyph name="shield-check" size={20} />
              </span>
              <strong>Choose Accreditation if...</strong>
              <p>
                Your organization is eligible and ready for independent assessment and formal recognition within an
                approved accreditation scope.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
