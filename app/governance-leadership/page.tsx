import Link from "next/link";
import Image from "next/image";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import NavyCard from "../_components/site/NavyCard";
import SectionHead from "../_components/site/SectionHead";
import Stat from "../_components/site/Stat";
import Glyph, { type GlyphName } from "../_components/site/Glyph";
import { FACTS } from "@/lib/facts";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";
import ProfileToggle from "./ProfileToggle";
import "./governance.css";

/*
 * Governance & Leadership — new route, Oct 2026, built on the client's
 * "Governance and Leadership" package (Hero → How AAA Is Governed → Board of
 * Trustees → Meet Our Team → Governance Principles → Final CTA).
 * Approved decisions applied (package README): hero title "Leadership &
 * Governance" with the supporting line "Leadership with Purpose. Governance
 * with Integrity."; Dr. JoNeil Conley removed from the Board — six trustees,
 * two rows of three.
 */

export const metadata = pageMeta({
  title: "Governance & Leadership",
  description:
    "Meet AAA's Board of Trustees and team, and see how governance, oversight and clear accountability protect the impartiality of every accreditation decision.",
  path: "/governance-leadership",
  keywords: [
    "AAA governance",
    "AAA Board of Trustees",
    "accreditation body leadership",
    "accreditation governance structure",
    "American Accreditation Association team",
  ],
});

const IMG = "/images/site/governance";

const STRUCTURE: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "landmark",
    title: "Board of Trustees",
    text: "Provides strategic direction, governance, and organizational oversight.",
  },
  {
    icon: "briefcase",
    title: "Executive Leadership",
    text: "Responsible for management, implementation, and organizational operations.",
  },
  {
    icon: "clipboard-check",
    title: "Technical & Accreditation Committees",
    text: "Provide technical oversight, accreditation review, and decision-making.",
  },
  {
    icon: "search-check",
    title: "Assessors & Technical Experts",
    text: "Provide independent assessment and specialist expertise across AAA accreditation activities.",
  },
];

const SUPPORT: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "list-check",
    title: "Clear Responsibilities",
    text: "Defined roles support accountability across governance, management, and accreditation activities.",
  },
  {
    icon: "scale",
    title: "Impartial Decision-Making",
    text: "Governance arrangements support objective accreditation decisions and protect against inappropriate influence.",
  },
  {
    icon: "user-check",
    title: "Technical Competence",
    text: "Qualified professionals, committees, assessors, and experts support credible accreditation activities.",
  },
];

type Trustee = { name: string; img: string; w: number; h: number; summary: string; bio: string };

const BOARD: Trustee[] = [
  {
    name: "Kara Heinrichs",
    img: "kara.webp",
    w: 476,
    h: 637,
    summary:
      "Senior Learning and Leadership Development professional with extensive experience in large-scale training, governance, and program evaluation.",
    bio: "Kara Heinrichs is a senior Learning and Leadership Development professional with extensive experience designing, implementing, and evaluating large-scale training and development programs across enterprise environments. She has led onboarding, compliance-aligned learning systems, and performance evaluation frameworks for global organizations including Meta, LiveRamp, Auth0, and the Port of Seattle. With a PhD in Organizational Development and strong expertise in governance, dashboards, and program evaluation, Kara brings a structured, quality-driven approach to workforce development.",
  },
  {
    name: "Dr. Willena McGee",
    img: "willena.jpg",
    w: 1223,
    h: 2048,
    summary:
      "Founder and CEO of Uplifted Abilities, with over 20 years of experience in healthcare, project management, education, and consulting.",
    bio: "Willena is an AAA board member and Founder and CEO of Uplifted Abilities. With over 20 years of experience in healthcare, project management, education, and consulting services, she guides new and existing Non-Emergency Medical Transportation (NEMT) providers through accreditation, regulatory compliance, and business planning.",
  },
  {
    name: "Michael Peters",
    img: "michael.jpg",
    w: 1245,
    h: 1245,
    summary:
      "CEO of Lazarus Alliance Certification and internationally recognized cybersecurity expert with extensive IT, business leadership, and curriculum development experience.",
    bio: "Michael is the CEO of Lazarus Alliance Certification and has served as an independent information cybersecurity consultant, executive, researcher, and author. He is an internationally recognized and awarded security expert with years of IT and business leadership experience. He has contributed significantly to curriculum development for graduate degree programs in information security, advanced technology, cyberspace law, and privacy, and to industry-standard professional certifications.",
  },
  {
    name: "Dr. Samir Aziz",
    img: "samir.webp",
    w: 766,
    h: 1106,
    summary:
      "Academic leader and strategic management consultant with over 25 years of global experience in governance, strategic planning, and higher education.",
    bio: "Dr. Samir Aziz is an academic leader and strategic management consultant currently serving as Dean of the School of Business & Economics at American International Theism University (AITU). He holds a PhD in Strategic Management and is an academic member of the European Corporate Governance Institute (ECGI). With over 25 years of global experience, he is a Certified Strategy Professional (CSP) and Certified Governance Professional (CGP), specializing in corporate governance, strategic planning, and higher education performance standards.",
  },
  {
    name: "Orlando Santana",
    img: "orlando.png",
    w: 476,
    h: 637,
    summary:
      "Brings over 30 years of development, health and safety experience across multinational organizations, including leadership roles at American Airlines.",
    bio: "With over 30 years of experience in development, Health and Safety across multinational organizations including American Airlines as the International Safety Head Lead, Orlando brings a wealth of expertise and a deep commitment to quality education in accreditation.",
  },
  {
    name: "Dr. Dawn Lindsey",
    img: "dawn.jpg",
    w: 892,
    h: 1163,
    summary:
      "Brings more than 25 years of experience in regulatory compliance, quality assurance, operational governance, and organizational leadership.",
    bio: "Dr. Dawn brings more than 25 years of experience in regulatory compliance, quality assurance, and operational governance. She serves as the President and CEO of Vari-Tek LLC. Dr. Dawn holds a PhD in Public Policy and Social Change, as well as a Doctorate in Educational Leadership. She also maintains multiple professional certifications, including Six Sigma, ISO and internal auditing, OSHA reporting, and Title IX compliance.",
  },
];

const TEAM: { name: string; role: string; img: string; w: number; h: number }[] = [
  { name: "Dr. Ruhina Khan", role: "Senior Manager, Business Development", img: "ruhina.webp", w: 476, h: 637 },
  { name: "Dr. Antonia Vitori", role: "Healthcare Accreditation Surveyor", img: "antonia.jpeg", w: 200, h: 200 },
  { name: "Sakshi Mishra", role: "SMEs Accreditation Manager", img: "sakshi.png", w: 476, h: 637 },
  { name: "Lauren Jensen", role: "International Partnership Department", img: "lauren.jpg", w: 1024, h: 1024 },
  { name: "Babita Singh", role: "Business Development Executive", img: "babita.webp", w: 1080, h: 1350 },
  { name: "Rachel Azar", role: "Country Representative, Tunisia & Morocco", img: "rachel.jpg", w: 1032, h: 1524 },
  { name: "Dr. Rodolfo Buccico", role: "Accreditation Advisor", img: "rodolfo.png", w: 186, h: 143 },
  { name: "Dr. Eve Tsz Ling", role: "Healthcare Accreditation Surveyor", img: "eve.webp", w: 476, h: 637 },
  { name: "Naushin Palawaker", role: "Customer Care Coordinator", img: "naushin.webp", w: 864, h: 1184 },
  { name: "Joanne Isber", role: "Labs Accreditation Instructor", img: "joanne.jpeg", w: 189, h: 266 },
  { name: "Katerina Eleni", role: "Accreditation Assessor", img: "katerina.png", w: 476, h: 637 },
  { name: "Dr. Terri E. Anderson", role: "Healthcare Accreditation Surveyor", img: "terri.webp", w: 476, h: 637 },
  { name: "Dr. Rana Allam", role: "Standard Development Committee", img: "rana.png", w: 264, h: 369 },
  { name: "Dr. Shakti Derbar", role: "Accreditation Technical Committee", img: "shakti.jpeg", w: 389, h: 389 },
  { name: "Paritosh Palav", role: "Country Representative, Qatar & East Africa", img: "paritosh.png", w: 476, h: 637 },
];

const PRINCIPLES: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "scale",
    title: "Impartiality",
    text: "Accreditation decisions are protected from commercial, financial, or other undue influence.",
  },
  {
    icon: "gavel",
    title: "Independent Decision-Making",
    text: "Assessment activities and accreditation decisions follow defined responsibilities and processes.",
  },
  {
    icon: "award",
    title: "Competence",
    text: "Governance, technical, and accreditation activities are supported by individuals with relevant professional and technical expertise.",
  },
  {
    icon: "shield-check",
    title: "Accountability",
    text: "Defined governance structures, responsibilities, and oversight support consistency and confidence in AAA’s activities.",
  },
];

function Portrait({ src, alt, w, h, size }: { src: string; alt: string; w: number; h: number; size: number }) {
  return (
    <span className="gov-portrait">
      <Image src={`${IMG}/${src}`} alt={alt} width={w} height={h} sizes={`${size}px`} />
    </span>
  );
}

export default function GovernanceLeadershipPage() {
  return (
    <div className="axp gov">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About AAA", path: "/about" },
          { name: "Governance & Leadership", path: "/governance-leadership" },
        ])}
      />

      {/* 01 — Hero */}
      <PageHero
        eyebrow="Governance & Leadership"
        crumbs={[{ label: "About AAA", href: "/about" }, { label: "Governance & Leadership" }]}
        title={
          <>
            Leadership &amp; <span className="gov-gold">Governance</span>
          </>
        }
        intro={
          <>
            <span className="gov-tagline">Leadership with Purpose. Governance with Integrity.</span>
            AAA’s governance framework provides strategic oversight, clear accountability, and responsible leadership to
            support the integrity, impartiality, and effectiveness of its accreditation activities.
          </>
        }
        image={`${IMG}/governance-hero.webp`}
        imageAlt="AAA governance and leadership in accreditation activity"
        actions={
          <>
            <a href="#leadership" className="ax-btn ax-btn-gold gov-jump">
              Meet Our Leadership <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </a>
            <a href="#governance" className="ax-btn ax-btn-ghost gov-jump">
              How AAA Is Governed <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </a>
            <ul className="gov-chips" aria-label="Governance focus areas">
              <li>Strategic Oversight</li>
              <li>Accountability</li>
              <li>Impartiality</li>
              <li>Technical Expertise</li>
            </ul>
          </>
        }
      />

      {/* 02 — How AAA is governed */}
      <section className="ax-section" id="governance">
        <div className="container">
          <SectionHead
            center
            eyebrow="How AAA Is Governed"
            title="Clear Governance. Defined Accountability."
            intro="AAA maintains a governance structure designed to support strategic oversight, responsible management, technical competence, and impartial accreditation activities."
          />
          <div className="gov-tiers">
            <div className="ax-blue-grid four">
              {STRUCTURE.map((s, i) => (
                <NavyCard key={s.title} icon={s.icon} no={String(i + 1).padStart(2, "0")} title={s.title}>
                  <p>{s.text}</p>
                </NavyCard>
              ))}
            </div>
          </div>
          <ul className="gov-support reveal">
            {SUPPORT.map((s) => (
              <li key={s.title}>
                <span className="gov-support-ico" aria-hidden="true">
                  <Glyph name={s.icon} />
                </span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Board of Trustees */}
      <section className="ax-section cream" id="leadership">
        <div className="container">
          <SectionHead
            center
            eyebrow="Board of Trustees"
            title="Strategic Oversight from Experienced Leaders"
            intro="AAA’s Board of Trustees brings together experienced professionals from healthcare, education, quality, governance, technology, and organizational leadership to provide strategic direction and oversight for the American Accreditation Association."
          />
          <div className="ax-blue-grid gov-board">
            {BOARD.map((p) => (
              <article key={p.name} className="ax-card navy ax-blue reveal gov-person">
                <Portrait src={p.img} alt={p.name} w={p.w} h={p.h} size={116} />
                <h3>{p.name}</h3>
                <span className="ax-blue-kicker">Board of Trustees</span>
                <div className="ax-blue-body">
                  <p>{p.summary}</p>
                </div>
                <ProfileToggle name={p.name}>
                  <p>{p.bio}</p>
                </ProfileToggle>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Meet our team */}
      <section className="ax-section" id="team">
        <div className="container">
          <SectionHead
            center
            eyebrow="Meet Our Team"
            title="The People Behind AAA"
            intro="AAA brings together professionals with expertise across accreditation, healthcare, laboratories, standards development, business development, international partnerships, technical committees, client support, and regional representation—working together to deliver credible accreditation services worldwide."
          />
          <div className="ax-blue-grid five gov-team">
            {TEAM.map((p) => (
              <article key={p.name} className="ax-card navy ax-blue compact reveal gov-person gov-member">
                <Portrait src={p.img} alt={p.name} w={p.w} h={p.h} size={92} />
                <h3>{p.name}</h3>
                <span className="ax-blue-kicker">{p.role}</span>
              </article>
            ))}
          </div>

          <div className="gov-force reveal">
            <span className="gov-force-ico" aria-hidden="true">
              <Glyph name="users" />
            </span>
            <strong className="gov-force-num">
              <Stat value={FACTS.assessors} />
            </strong>
            <p>Assessors &amp; Experts supporting AAA’s international accreditation activities</p>
          </div>
        </div>
      </section>

      {/* 05 — Governance principles */}
      <section className="ax-section cream" id="governance-principles">
        <div className="container gov-principles">
          <div className="gov-principles-head">
            <SectionHead
              eyebrow="Governance Principles"
              title="Governance Built on Accountability and Independence"
              intro="AAA’s governance framework is designed to support impartiality, objective decision-making, technical competence, and clear accountability across its accreditation activities."
            />
            <Link href="/impartiality-policy" className="ax-btn ax-btn-ghost-navy reveal">
              Learn more about Impartiality &amp; Independence <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
          </div>
          <div className="ax-blue-grid two">
            {PRINCIPLES.map((p, i) => (
              <NavyCard key={p.title} icon={p.icon} no={String(i + 1).padStart(2, "0")} title={p.title}>
                <p>{p.text}</p>
              </NavyCard>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Final CTA */}
      <CTA
        eyebrow="Learn More About AAA"
        title="Explore the Framework Behind Our Accreditation Activities"
        text="Learn more about how AAA supports impartiality, international recognition, and transparent accreditation practices across its programs."
        primary={{ href: "/impartiality-policy", label: "Impartiality & Independence" }}
        secondary={{ href: "/partnerships", label: "Recognition & Partnerships" }}
      />
    </div>
  );
}
