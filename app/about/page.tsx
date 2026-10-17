import Link from "next/link";
import Image from "next/image";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import NavyCard from "../_components/site/NavyCard";
import SectionHead from "../_components/site/SectionHead";
import Stat from "../_components/site/Stat";
import Glyph from "../_components/site/Glyph";
import { FACTS } from "@/lib/facts";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";
import "./about.css";

/*
 * About AAA — rebuilt Oct 2026 on the client's final page structure
 * ("About aaa" package: Hero → Who We Are → Purpose & Direction → Values →
 * International Recognition → Learn More → Final CTA), rendered in the AAA
 * design system with the SME blue card everywhere a card appears.
 */

export const metadata = pageMeta({
  title: "About AAA",
  description:
    `The American Accreditation Association is an independent international accreditation body headquartered in Virginia, USA, serving organizations across ${FACTS.countriesPlus} countries.`,
  path: "/about",
  keywords: [
    "American Accreditation Association",
    "about AAA",
    "international accreditation body",
    "ISQua EEA accredited standards",
    "independent accreditation",
  ],
});

const IMG = "/images/site/about";

const GLANCE = [
  { v: "Virginia, USA", k: "Head Office" },
  { v: FACTS.countriesPlus, k: "Countries Served" },
  { v: FACTS.organizations, k: "Accredited Organizations" },
  { v: FACTS.assessors, k: "Assessors & Experts" },
  { v: FACTS.certificates, k: "Accredited Certificates" },
  { v: "Multiple", k: "Accreditation Programs" },
];

const VALUES = [
  {
    icon: "shield-check",
    title: "Integrity",
    text: "We conduct our activities with honesty, professionalism, transparency, and ethical responsibility.",
  },
  {
    icon: "scale",
    title: "Impartiality",
    text: "Accreditation decisions are made independently and objectively, based on evidence and established accreditation requirements.",
  },
  {
    icon: "user-check",
    title: "Competence",
    text: "We engage qualified assessors, technical experts, and accreditation professionals with the knowledge and experience relevant to their fields.",
  },
  {
    icon: "award",
    title: "Excellence",
    text: "We pursue excellence in our own work while encouraging accredited organizations to strengthen quality, performance, and continual improvement.",
  },
  {
    icon: "handshake",
    title: "Collaboration",
    text: "We believe meaningful collaboration with organizations, experts, and partners strengthens knowledge, creates lasting value, and supports positive impact.",
  },
] as const;

const LINKS = [
  {
    icon: "landmark",
    title: "Governance & Leadership",
    text: "Learn about AAA's leadership, governance structure, oversight, and institutional responsibilities.",
    href: "/governance-leadership",
  },
  {
    icon: "globe",
    title: "Recognition & Partnerships",
    text: "Explore international recognition, memberships, professional engagement, and strategic partnerships.",
    href: "/partnerships",
  },
  {
    icon: "book",
    title: "About Accreditation",
    text: "Understand what accreditation is, why it matters, and how it supports confidence and quality.",
    href: "/about-accreditation",
  },
  {
    icon: "scale",
    title: "Impartiality & Integrity",
    text: "Learn about the principles and safeguards that support fair, independent, and credible accreditation activities.",
    href: "/impartiality-policy",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="axp abt">
      <JsonLd schema={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About AAA", path: "/about" }])} />

      <PageHero
        eyebrow="About AAA"
        crumbs={[{ label: "About AAA" }]}
        title={
          <>
            About the <span className="abt-gold">American Accreditation Association</span>
          </>
        }
        intro="The American Accreditation Association is an international accreditation body working with organizations around the world to strengthen quality, demonstrate competence and create new opportunities through independent accreditation."
        image={`${IMG}/aaa-about-team-hero.webp`}
        imageAlt="International team behind the American Accreditation Association"
        caption={{ kicker: "Independent • Impartial • International", title: `Accreditation across ${FACTS.countriesPlus} countries` }}
        actions={
          <>
            <Link href="/programs" className="ax-btn ax-btn-gold">
              Discover Our Accreditation Programs <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
            <Link href="/contact" className="ax-btn ax-btn-ghost">
              Talk to an Accreditation Expert
            </Link>
            <ul className="abt-chips" aria-label="What defines AAA">
              <li>International Perspective</li>
              <li>Independent &amp; Impartial</li>
              <li>Quality-Focused</li>
            </ul>
          </>
        }
      />

      {/* 02 — Who we are */}
      <section className="ax-section" id="who-we-are">
        <div className="container abt-who">
          <div className="abt-who-copy">
            <SectionHead
              eyebrow="Who We Are"
              title="An International Accreditation Organization Committed to Quality and Confidence"
            />
            <div className="ax-prose reveal">
              <p>
                The American Accreditation Association (AAA) is an independent accreditation organization committed to
                promoting quality, competence, and confidence worldwide.
              </p>
              <p>
                Headquartered in Virginia, United States, AAA delivers accreditation services through an international
                network of assessors and technical experts, supporting organizations across{" "}
                <strong>{FACTS.countriesPlus} countries</strong>.
              </p>
              <p>
                AAA works with healthcare organizations, training and education providers, conformity assessment bodies,
                SMEs, and professional institutions seeking to demonstrate alignment with recognized standards, pursue
                continual improvement, and strengthen stakeholder confidence.
              </p>
              <p>
                Through structured, impartial, and transparent accreditation processes, AAA supports organizations in
                strengthening credibility, improving performance, and demonstrating a sustained commitment to quality and
                excellence.
              </p>
            </div>
          </div>

          <aside className="abt-glance reveal" aria-labelledby="abt-glance-h">
            <div className="abt-glance-head">
              <span className="ax-card-ico">
                <Glyph name="globe" />
              </span>
              <h3 id="abt-glance-h">AAA at a Glance</h3>
            </div>
            <dl className="abt-glance-grid">
              {GLANCE.map((g) => (
                <div key={g.k}>
                  <dt>{g.k}</dt>
                  <dd>
                    <Stat value={g.v} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="abt-glance-foot">Independent • Impartial • International</p>
          </aside>
        </div>
      </section>

      {/* 03 — Purpose & direction */}
      <section className="ax-section cream" id="purpose-and-direction">
        <div className="container">
          <SectionHead
            center
            eyebrow="Our Purpose"
            title="Our Purpose and Direction"
            intro="AAA is guided by a clear mission and vision focused on quality, competence, confidence, and continual improvement."
          />
          <div className="ax-blue-grid two">
            <NavyCard icon="target" no="01" title="Our Mission" kicker="Inspiring Confidence Through Quality">
              <p>
                To provide impartial and credible accreditation services that recognize excellence, promote continual
                improvement, and strengthen confidence in organizations worldwide.
              </p>
            </NavyCard>
            <NavyCard icon="compass" no="02" title="Our Vision" kicker="Excellence Through Accreditation">
              <p>
                To advance a world where quality, competence, and continual improvement are recognized and trusted
                through credible accreditation.
              </p>
            </NavyCard>
          </div>
        </div>
      </section>

      {/* 04 — Values */}
      <section className="ax-section" id="our-values">
        <div className="container">
          <SectionHead
            center
            eyebrow="Our Values"
            title="Principles That Guide Our Work"
            intro="Our values shape how AAA approaches accreditation, works with organizations, and supports confidence in quality and competence across different sectors and regions."
          />
          <div className="ax-blue-grid five">
            {VALUES.map((v, i) => (
              <NavyCard key={v.title} icon={v.icon} no={String(i + 1).padStart(2, "0")} title={v.title}>
                <p>{v.text}</p>
              </NavyCard>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — International recognition */}
      <section className="ax-section cream" id="international-recognition">
        <div className="container">
          <SectionHead
            center
            eyebrow="International Recognition"
            title="Recognition That Strengthens Confidence"
            intro="AAA's international credibility is supported by external recognition, internationally aligned accreditation practices, and engagement with recognized quality organizations and frameworks."
          />

          <div className="abt-recog reveal">
            <div className="abt-recog-main ax-card navy ax-blue">
              <div className="abt-recog-mark">
                <span className="abt-plate">
                  <Image
                    src={`${IMG}/isqua-eea-accredited-standards-2025-2029.png`}
                    alt="ISQua EEA Accredited Standards 2025–2029 recognition mark"
                    width={241}
                    height={67}
                  />
                </span>
                <div>
                  <span className="ax-blue-tag">ISQua EEA Accredited Healthcare Standards</span>
                  <h3>Accreditation Standards for Healthcare Facilities</h3>
                  <span className="abt-recog-dates">
                    <Glyph name="calendar" size={15} /> Accredited May 2025 – May 2029
                  </span>
                </div>
              </div>
              <p className="abt-recog-text">
                AAA&apos;s Accreditation Standards for Healthcare Facilities have been accredited by the International
                Society for Quality in Health Care External Evaluation Association (ISQua EEA), following independent
                assessment against the Guidelines and Principles for the Development of Health and Social Care Standards,
                5th Edition.
              </p>
              <ul className="abt-recog-checks">
                <li>Independent external assessment of AAA&apos;s healthcare accreditation standards</li>
                <li>Alignment with an internationally recognized healthcare quality framework</li>
                <li>Formal recognition applies specifically to the accredited healthcare standards and scope</li>
              </ul>

              <div className="abt-member">
                <span className="abt-plate">
                  <Image
                    src={`${IMG}/isqua-institutional-member-2026-2027.png`}
                    alt="ISQua Institutional Member 2026–2027"
                    width={190}
                    height={67}
                  />
                </span>
                <div>
                  <h4>Institutional Member of ISQua</h4>
                  <p>
                    AAA is also an institutional member of the International Society for Quality in Health Care (ISQua),
                    supporting engagement with the international healthcare quality community.
                  </p>
                  <span className="abt-recog-dates">21 September 2026 – 21 September 2027</span>
                  <a
                    href="/docs/site/isqua-institutional-membership-certificate-2026-2027.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="abt-textlink"
                  >
                    View Membership Certificate <Glyph name="arrow-up-right" size={14} strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>

            <figure className="abt-cert">
              <div className="abt-cert-frame">
                <Image
                  src={`${IMG}/isqua-eea-standards-certificate.webp`}
                  alt="ISQua EEA certificate for AAA Accreditation Standards for Healthcare Facilities"
                  width={1488}
                  height={2105}
                  sizes="(max-width: 980px) 90vw, 420px"
                />
              </div>
              <a
                href="/docs/site/isqua-eea-standards-certificate-5th-ed.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ax-btn ax-btn-blue"
              >
                View Accreditation Certificate <Glyph name="arrow-up-right" size={14} strokeWidth={2} />
              </a>
            </figure>
          </div>

          <p className="ax-note reveal abt-recog-note">
            ISQua institutional membership is separate from ISQua EEA accreditation, which applies specifically to
            AAA&apos;s Accreditation Standards for Healthcare Facilities and does not automatically apply to all AAA
            programs.
          </p>
          <div className="abt-center reveal">
            <Link href="/partnerships" className="ax-btn ax-btn-ghost-navy">
              Explore Recognition &amp; Partnerships <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* 06 — Learn more */}
      <section className="ax-section" id="learn-more-about-aaa">
        <div className="container">
          <SectionHead
            center
            eyebrow="Explore More"
            title="Learn More About AAA"
            intro="Explore the areas that provide deeper insight into AAA's governance, recognition, accreditation role, and commitment to impartiality and integrity."
          />
          <div className="ax-blue-grid four">
            {LINKS.map((l, i) => (
              <NavyCard
                key={l.href}
                icon={l.icon}
                no={String(i + 1).padStart(2, "0")}
                title={l.title}
                href={l.href}
                cta="Explore"
              >
                <p>{l.text}</p>
              </NavyCard>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Final CTA */}
      <CTA
        eyebrow="Take the Next Step"
        title="Ready to Learn More About Accreditation?"
        text="Explore AAA accreditation programs or speak with our team to identify the pathway that best fits your organization."
        primary={{ href: "/programs", label: "Discover Our Accreditation Programs" }}
        secondary={{ href: "/contact", label: "Talk to an Accreditation Expert" }}
      />
    </div>
  );
}
