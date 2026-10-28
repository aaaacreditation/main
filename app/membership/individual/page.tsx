import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "../../_components/PageHero";
import JsonLd from "../../_components/JsonLd";
import NavyCard from "../../_components/site/NavyCard";
import SectionHead from "../../_components/site/SectionHead";
import Glyph, { type GlyphName } from "../../_components/site/Glyph";
import { breadcrumbSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import "./ind.css";

/*
 * Individual Membership — rebuilt Oct 2026 on the client's final page
 * structure ("Indivdual membership" package: Hero → Who Should Consider →
 * Benefits → Professional Engagement Platform → Eligibility & How to Join →
 * Meet Our Individual Members → Final CTA), rendered in the AAA design system
 * with the SME blue card. Page styles live in ./ind.css under `.mind`
 * (membership.css is shared by the other membership routes and is
 * intentionally not imported here).
 */

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Individual Membership",
    description:
      "AAA Individual Membership: $350 for two years. Membership certificate, one complimentary training course a year, ADCP listing, webinars and networking.",
    path: "/membership/individual",
    keywords: [
      "AAA individual membership",
      "American Accreditation Association membership",
      "quality professional membership",
      "professional affiliation",
      "ADCP listing",
    ],
  });
}

const IMG = "/images/site/membership-individual";
const APPLY = "/membership/individual/apply";
const AFFILIATION =
  "AAA Individual Membership represents professional affiliation with the American Accreditation Association. It does not constitute personnel certification, accreditation, or independent certification of an individual's competence.";

const FIT: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "badge-check",
    title: "Quality & Accreditation Professionals",
    text: "Professionals working in quality management, accreditation, conformity assessment, auditing or related quality-focused fields.",
  },
  {
    icon: "flask",
    title: "Industry & Technical Professionals",
    text: "Experienced specialists who want to engage with an international professional community focused on competence, quality and continuous improvement.",
  },
  {
    icon: "graduation",
    title: "Educators, Trainers & Consultants",
    text: "Professionals involved in education, training, consulting and professional development who want to expand their learning and professional connections.",
  },
  {
    icon: "network",
    title: "Professionals Seeking Greater Engagement",
    text: "Individuals interested in professional visibility, knowledge sharing, networking and participation in relevant AAA activities and initiatives.",
  },
];

const BENEFITS: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "certificate",
    title: "Professional Recognition",
    text: "Receive an official AAA Individual Membership Certificate with online validation and a unique verification link.",
  },
  {
    icon: "graduation",
    title: "Professional Development",
    text: "Benefit from one complimentary AAA training course each year, together with access to educational webinars and professional learning opportunities.",
  },
  {
    icon: "id-card",
    title: "Professional Visibility",
    text: "Strengthen your professional presence through eligible ADCP listing and QR-coded membership communication and email-signature benefits.",
  },
  {
    icon: "lightbulb",
    title: "Knowledge & Thought Leadership",
    text: "Contribute up to two articles or papers annually through applicable AAA channels, subject to editorial and publication requirements.",
  },
  {
    icon: "globe",
    title: "Professional Community",
    text: "Connect with professionals from different countries and fields through networking, knowledge exchange and AAA community activities.",
  },
  {
    icon: "handshake",
    title: "Participation & Contribution",
    text: "Eligible members may participate in relevant AAA Technical Committees and other professional activities, subject to applicable requirements.",
  },
];

const PLATFORM: { icon: GlyphName; step: string; title: string; text: string }[] = [
  {
    icon: "book",
    step: "Learn",
    title: "Training & Webinars",
    text: "Access complimentary AAA training opportunities, educational webinars and professional learning activities that support continued development.",
  },
  {
    icon: "eye",
    step: "Be Visible",
    title: "Recognition & Professional Presence",
    text: "Build professional visibility through your membership credentials, online validation, eligible ADCP listing and QR-coded communication benefits.",
  },
  {
    icon: "file-text",
    step: "Contribute",
    title: "Articles & Technical Participation",
    text: "Share expertise through applicable publication opportunities and participate in relevant AAA Technical Committees and professional initiatives.",
  },
  {
    icon: "users",
    step: "Connect",
    title: "International Professional Community",
    text: "Build relationships with professionals from different countries, disciplines and sectors through AAA networking and community activities.",
  },
];

const ELIGIBILITY = [
  "Updated professional CV or résumé.",
  "University degree or equivalent higher-education qualification.",
  "Evidence of professional competency, qualifications and experience relevant to your field.",
];

const STEPS: { icon: GlyphName; title: string; text: string }[] = [
  {
    icon: "file-text",
    title: "Apply",
    text: "Complete the Individual Membership application and submit the required professional information and supporting documents.",
  },
  {
    icon: "search-check",
    title: "Review",
    text: "AAA reviews your education, professional background, qualifications and evidence against the applicable membership requirements.",
  },
  {
    icon: "badge-check",
    title: "Approval",
    text: "Applicants who successfully meet the applicable requirements are approved for AAA Individual Membership.",
  },
  {
    icon: "rocket",
    title: "Access Your Benefits",
    text: "Receive your membership credentials and begin using the applicable learning, visibility, networking and participation benefits.",
  },
];

const MEMBERS = [
  {
    name: "Dr. Abdualrahman Alshehry",
    role: "Associate Professor, King Saud University, College of Nursing",
    country: "Saudi Arabia",
    img: `${IMG}/dr-abdualrahman-alshehry.png`,
    w: 244,
    h: 250,
  },
  {
    name: "Dr. Marcel Hetu",
    role: "Professor & Director of Academic Affairs, University of Phoenix",
    country: "USA",
    img: `${IMG}/dr-marcel-hetu.webp`,
    w: 597,
    h: 597,
  },
  {
    // README: no "Dr." title for Francesco Serini (the file name predates the correction).
    name: "Francesco Serini",
    role: "Director of Training Academy L' importanza di Ser Frank",
    country: "Italy",
    img: `${IMG}/dr-francesco-serini.png`,
    w: 352,
    h: 319,
  },
];

export default function IndividualMembershipPage() {
  return (
    <div className="axp mind">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Membership", path: "/membership" },
          { name: "Individual Membership", path: "/membership/individual" },
        ])}
      />

      {/* 01 — Hero */}
      <PageHero
        eyebrow="Individual Membership"
        crumbs={[{ href: "/membership", label: "Membership" }, { label: "Individual Membership" }]}
        title={
          <>
            Individual Membership
            <span className="mind-tagline">Connect. Develop. Contribute. Be Recognized.</span>
          </>
        }
        intro="Join an international community of professionals committed to quality, competence and continuous improvement, with opportunities for professional development, visibility, knowledge sharing and participation in AAA activities."
        image={`${IMG}/individual-membership-hero.webp`}
        imageAlt="Professional displaying an AAA-registered certificate"
        caption={{
          kicker: "AAA Individual Membership",
          title: "Professional engagement, development and visibility within the AAA quality community.",
        }}
        actions={
          <>
            <Link href={APPLY} className="ax-btn ax-btn-gold">
              Become an Individual Member <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
            <a href="#benefits" className="ax-btn ax-btn-ghost">
              Explore Member Benefits
            </a>
            <ul className="mind-chips" aria-label="Individual Membership at a glance">
              <li>
                <strong>$350</strong> 2-Year Membership
              </li>
              <li>Professional Development</li>
              <li>Global Quality Community</li>
            </ul>
            <p className="mind-hero-note">
              <Glyph name="scale" size={18} />
              <span>{AFFILIATION}</span>
            </p>
          </>
        }
      />

      {/* 02 — Who should consider */}
      <section className="ax-section" id="who-should-consider-individual-membership">
        <div className="container">
          <SectionHead
            center
            eyebrow="Is Individual Membership Right for You?"
            title="Who Should Consider Individual Membership?"
            intro="AAA Individual Membership is designed for professionals who want to strengthen their professional engagement, continue developing their knowledge, contribute expertise and connect with a wider quality-focused community."
          />
          <div className="ax-blue-grid four">
            {FIT.map((f, i) => (
              <NavyCard key={f.title} icon={f.icon} no={String(i + 1).padStart(2, "0")} title={f.title}>
                <p>{f.text}</p>
              </NavyCard>
            ))}
          </div>
          <p className="ax-note mind-note reveal">
            <Glyph name="scale" size={20} />
            <span>
              <strong>Important:</strong>
              Individual Membership represents professional affiliation with AAA. It does not constitute personnel
              certification, accreditation, or independent certification of an individual&apos;s competence.
            </span>
          </p>
        </div>
      </section>

      {/* 03 — Benefits */}
      <section className="ax-section cream" id="benefits">
        <div className="container">
          <SectionHead
            center
            eyebrow="Your Membership Benefits"
            title="Benefits That Support Your Professional Journey"
            intro="Individual Membership combines professional recognition with practical opportunities to learn, contribute, connect and increase your visibility within the AAA quality community."
          />
          <div className="ax-blue-grid">
            {BENEFITS.map((b, i) => (
              <NavyCard key={b.title} icon={b.icon} no={String(i + 1).padStart(2, "0")} title={b.title}>
                <p>{b.text}</p>
              </NavyCard>
            ))}
          </div>

          <div className="mind-training reveal">
            <span className="mind-training-fig" aria-hidden="true">
              1×
            </span>
            <div>
              <h3>Complimentary AAA Training Every Year</h3>
              <p>
                Individual Members benefit from one complimentary AAA training course each year during their membership
                period, providing a practical professional-development benefit alongside membership recognition.
              </p>
            </div>
            <span className="mind-training-ico" aria-hidden="true">
              <Glyph name="graduation" />
            </span>
          </div>
        </div>
      </section>

      {/* 04 — Professional engagement platform */}
      <section className="ax-section" id="professional-platform">
        <div className="container">
          <SectionHead
            center
            eyebrow="More Than a Membership"
            title="More Than Membership. A Platform for Professional Engagement."
            intro="AAA Individual Membership gives professionals more than a certificate. It creates practical opportunities to learn, increase visibility, contribute expertise and connect with an international community."
          />
          <div className="mind-platform">
            <div className="ax-blue-grid two">
              {PLATFORM.map((p, i) => (
                <NavyCard
                  key={p.step}
                  icon={p.icon}
                  no={String(i + 1).padStart(2, "0")}
                  tag={p.step}
                  title={p.title}
                >
                  <p>{p.text}</p>
                </NavyCard>
              ))}
            </div>
            <figure className="mind-testimonial reveal">
              <div className="mind-testimonial-frame">
                <Image
                  src={`${IMG}/borbala-horvath-testimonial.webp`}
                  alt="AAA Individual Member Borbala Horvath testimonial"
                  width={940}
                  height={788}
                  sizes="(max-width: 980px) 92vw, 460px"
                />
              </div>
              <figcaption>
                <Glyph name="quote" size={16} /> Real AAA Individual Member Testimonial
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 05 — Eligibility & how to join */}
      <section className="ax-section cream" id="membership-eligibility-process">
        <div className="container">
          <SectionHead
            center
            eyebrow="Membership Details & Application"
            title="Individual Membership: Eligibility & How to Join"
            intro="Everything you need to know before applying—from the membership fee and eligibility requirements to the simple four-step application process."
          />

          <div className="mind-join reveal">
            <div className="mind-join-fee">
              <span className="mind-join-label">Individual Membership Fee</span>
              <span className="mind-join-fig">$350</span>
              <span className="mind-join-term">
                <Glyph name="calendar" size={15} /> 2-Year Membership
              </span>
              <p>
                One membership fee provides two years of access to applicable Individual Membership benefits,
                professional-development opportunities and AAA community activities.
              </p>
            </div>
            <div className="mind-join-elig">
              <h3>Eligibility Requirements</h3>
              <ul className="mind-join-list">
                {ELIGIBILITY.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
              <p className="mind-join-review">
                <Glyph name="search-check" size={18} />
                <span>
                  Applications are reviewed by AAA before Individual Membership is approved. Submission of an
                  application does not by itself constitute approval or certification.
                </span>
              </p>
            </div>
          </div>

          <p className="mind-steps-title reveal">How to Join</p>
          <ol className="mind-steps">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="mind-step-dot" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <NavyCard icon={s.icon} no={String(i + 1).padStart(2, "0")} title={s.title}>
                  <p>{s.text}</p>
                </NavyCard>
              </li>
            ))}
          </ol>

          <div className="mind-join-cta reveal">
            <Link href={APPLY} className="ax-btn ax-btn-blue">
              Apply for Individual Membership <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
            <p>
              Prepare your updated CV, university qualification and supporting evidence of professional competency and
              experience before submitting your application.
            </p>
          </div>
        </div>
      </section>

      {/* 06 — Meet our individual members */}
      <section className="ax-section" id="meet-our-members">
        <div className="container">
          <SectionHead
            center
            eyebrow="A Global Professional Community"
            title="Meet Our Individual Members"
            intro="Professionals from different countries, disciplines and sectors are part of the AAA community, connected by a shared commitment to quality, competence and continuous professional development."
          />
          <div className="ax-blue-grid">
            {MEMBERS.map((m) => (
              <NavyCard key={m.name} tag="AAA Individual Member" title={m.name} kicker={m.role} className="mind-member">
                <span className="mind-member-photo">
                  <Image src={m.img} alt={m.name} width={m.w} height={m.h} sizes="144px" />
                </span>
                <span className="mind-member-country">
                  <Glyph name="pin" size={14} strokeWidth={2} /> {m.country}
                </span>
              </NavyCard>
            ))}
          </div>
          <p className="mind-global reveal">
            <Glyph name="globe" size={18} />
            One professional community, connecting members across countries and fields through learning, knowledge
            sharing and professional engagement.
          </p>
        </div>
      </section>

      {/* 07 — Final CTA (hand-rolled .ax-close so the facts + note stay in the same band) */}
      <section className="ax-close" id="join-aaa-individual-membership">
        <span className="ax-close-corner" aria-hidden="true" />
        <div className="container">
          <div className="ax-close-inner reveal">
            <span className="eyebrow">Join the AAA Professional Community</span>
            <h2>Connect. Develop. Contribute. Be Recognized.</h2>
            <p>
              Join an international community of professionals committed to quality, competence and continuous
              improvement—and make active use of opportunities for learning, visibility, knowledge sharing and
              professional engagement.
            </p>
            <ul className="mind-facts" aria-label="Individual Membership facts">
              <li>
                <Glyph name="award" size={15} /> $350 Membership Fee
              </li>
              <li>
                <Glyph name="calendar" size={15} /> 2-Year Membership
              </li>
              <li>
                <Glyph name="globe" size={15} /> International Professional Community
              </li>
            </ul>
            <div className="ax-close-actions">
              <Link href={APPLY} className="ax-btn ax-btn-gold">
                Become an Individual Member <Glyph name="arrow-right" size={14} strokeWidth={2} />
              </Link>
              <Link href="/membership/organizational" className="ax-btn ax-btn-ghost">
                Explore Organizational Membership
              </Link>
            </div>
            <p className="mind-final-note">{AFFILIATION}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
