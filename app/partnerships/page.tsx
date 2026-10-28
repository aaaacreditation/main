import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import NavyCard from "../_components/site/NavyCard";
import SectionHead from "../_components/site/SectionHead";
import Stat from "../_components/site/Stat";
import Glyph from "../_components/site/Glyph";
import { FACTS } from "@/lib/facts";
import { breadcrumbSchema } from "@/lib/seo";
import { seoPage } from "@/lib/seo-overrides";
import "./partnerships.css";

/*
 * Recognition & Partnerships — rebuilt Oct 2026 on the client's final package
 * ("Recognition Partnerships": Hero → International Recognition → Professional
 * Networks → Formal Cooperation Agreements → Global Reach & Local Support →
 * Final Partnership CTA), rendered in the AAA design system.
 *
 * Approved decisions applied: only the ISQua EEA standards certificate is shown
 * as a visual; the ISQua institutional membership lives inside the main
 * recognition card (logo, short statement, dates, text link to its PDF) with no
 * separate membership box. Earth Day Network is omitted. The "local
 * representatives do not constitute external recognition" line is removed.
 */

export async function generateMetadata(): Promise<Metadata> {
  return seoPage({
    title: "Recognition & Partnerships",
    description:
      "AAA's international recognition and partnerships: ISQua EEA accredited healthcare standards, ISQua membership, professional networks and cooperation agreements.",
    path: "/partnerships",
    keywords: [
      "AAA recognition",
      "ISQua EEA accredited standards",
      "ISQua institutional member",
      "accreditation partnerships",
      "AAACE",
      "AGCAS",
      "CONIES",
      "accreditation cooperation agreements",
    ],
  });
}

const IMG = "/images/site/partnerships";

const NETWORKS = [
  {
    logo: { src: `${IMG}/conies-logo.png`, w: 592, h: 460, alt: "International Confederation of Higher Education logo" },
    tag: "International Collaboration & Recognition",
    title: "International Confederation of Higher Education",
    kicker: "Council on International Higher Education Supervision (CONIES)",
    text: "AAA has signed an Agreement for International Collaboration and Recognition with CONIES in the area of accreditation and certification of educational institutions.",
    areas: ["Accreditation", "Quality Assurance", "Higher Education"],
  },
  {
    logo: { src: `${IMG}/aaace-logo.png`, w: 676, h: 384, alt: "American Association for Adult and Continuing Education logo" },
    tag: "Professional Membership",
    title: "American Association for Adult and Continuing Education",
    kicker: "Adult and continuing education professional network",
    text: "AAA is an active member of AAACE, an organization dedicated to leadership in adult and continuing education, the exchange of research and best practices, and the advancement of professional standards.",
    areas: ["Adult Education", "Professional Standards", "Best Practices"],
  },
  {
    logo: { src: `${IMG}/agcas-logo.png`, w: 722, h: 229, alt: "Association of Graduate Careers Advisory Services logo" },
    tag: "Professional Membership",
    title: "Association of Graduate Careers Advisory Services",
    kicker: "Higher education career development and graduate employment network",
    text: "AAA is a member of AGCAS, the professional membership organization supporting higher education career development and graduate employment professionals.",
    areas: ["Higher Education", "Career Development", "Graduate Outcomes"],
  },
];

const REPS = [
  ["🇬🇭", "Ghana"],
  ["🇳🇦", "Namibia"],
  ["🇳🇵", "Nepal"],
  ["🇵🇹", "Portugal"],
  ["🇿🇲", "Zambia"],
  ["🇸🇴", "Somalia"],
  ["🇧🇭", "Bahrain"],
  ["🇸🇷", "Suriname"],
  ["🇮🇹", "Italy"],
  ["🇺🇿", "Uzbekistan"],
  ["🇸🇦", "Saudi Arabia"],
  ["🇯🇴", "Jordan"],
  ["🇹🇷", "Türkiye"],
  ["🇶🇦", "Qatar"],
  ["🇪🇬", "Egypt"],
  ["🇮🇳", "India"],
  ["🇲🇦", "Morocco"],
  ["🇹🇳", "Tunisia"],
  ["🇲🇳", "Mongolia"],
  ["🇦🇿", "Azerbaijan"],
  ["🇮🇶", "Iraq"],
  ["🇰🇿", "Kazakhstan"],
] as const;

const REACH = [
  { v: FACTS.countriesPlus, k: "Countries of Operation" },
  { v: String(REPS.length), k: "Local Representatives" },
  { v: FACTS.organizations, k: "Accredited Organizations" },
  { v: FACTS.certificates, k: "Accredited Certificates" },
];

export default function PartnershipsPage() {
  return (
    <div className="axp prt">
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About AAA", path: "/about" },
          { name: "Recognition & Partnerships", path: "/partnerships" },
        ])}
      />

      {/* 01 — Hero */}
      <PageHero
        eyebrow="Recognition & Partnerships"
        crumbs={[{ href: "/about", label: "About AAA" }, { label: "Recognition & Partnerships" }]}
        title={
          <>
            Recognition &amp; <span className="prt-gold">Partnerships</span>
          </>
        }
        intro={
          <>
            <span className="prt-tagline">International Recognition. Meaningful Partnerships. Greater Confidence.</span>
            AAA builds relationships with international organizations, professional institutions, and partners to
            advance quality, strengthen professional cooperation, and support the wider adoption of credible
            accreditation practices.
          </>
        }
        image={`${IMG}/recognition-partnerships-hero.webp`}
        imageAlt="AAA international partnership ceremony"
        caption={{ kicker: "International cooperation", title: "AAA international partnership ceremony" }}
        actions={
          <>
            <a href="#recognition" className="ax-btn ax-btn-gold">
              Explore Our Recognition <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </a>
            <a href="#cta" className="ax-btn ax-btn-ghost">
              Partner With AAA
            </a>
            <ul className="prt-chips" aria-label="Areas of engagement">
              <li>International Recognition</li>
              <li>Professional Collaboration</li>
              <li>Global Partnerships</li>
            </ul>
          </>
        }
      />

      {/* 02 — International recognition */}
      <section className="ax-section cream" id="recognition">
        <div className="container">
          <SectionHead
            center
            eyebrow="International Recognition"
            title="Recognition That Strengthens Confidence"
            intro="AAA's commitment to credible accreditation is supported by independent international recognition and engagement with respected organizations in quality and healthcare."
          />

          <div className="prt-recog reveal">
            <article className="prt-recog-main ax-card navy ax-blue">
              <div className="prt-recog-mark">
                <span className="prt-plate">
                  <Image
                    src={`${IMG}/isqua-eea-accredited-standards-2025-2029.png`}
                    alt="ISQua EEA Accredited Standards 2025-2029"
                    width={2410}
                    height={665}
                    sizes="240px"
                  />
                </span>
                <span className="ax-blue-tag">ISQua EEA Accredited Standards</span>
              </div>
              <h3>AAA Healthcare Standards Accredited by ISQua EEA</h3>
              <p className="prt-recog-text">
                AAA&apos;s Accreditation Standards for Healthcare Facilities have been accredited by the International
                Society for Quality in Health Care External Evaluation Association (ISQua EEA), following independent
                external evaluation against internationally recognized principles for the development of health and
                social care standards.
              </p>

              <dl className="prt-recog-facts">
                <div>
                  <dt>
                    <Glyph name="file-check" size={15} /> Accredited Standards
                  </dt>
                  <dd>Accreditation Standards for Healthcare Facilities</dd>
                </div>
                <div>
                  <dt>
                    <Glyph name="calendar" size={15} /> Recognition Period
                  </dt>
                  <dd>May 2025 – May 2029</dd>
                </div>
              </dl>

              <div className="prt-member">
                <span className="prt-plate prt-plate-member">
                  <Image
                    src={`${IMG}/isqua-institutional-member-2026-2027.png`}
                    alt="ISQua Institutional Member 2026-2027"
                    width={1557}
                    height={1152}
                    sizes="110px"
                  />
                </span>
                <div>
                  <h4>ISQua Institutional Membership</h4>
                  <p>
                    AAA is also an institutional member of the International Society for Quality in Health Care (ISQua),
                    supporting engagement with the international healthcare quality community.
                  </p>
                  <span className="prt-member-dates">
                    <b>Membership Period</b> 21 September 2026 – 21 September 2027
                  </span>
                  <a
                    href="/docs/site/isqua-institutional-membership-certificate-2026-2027.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="prt-textlink"
                  >
                    View Membership Certificate <Glyph name="arrow-up-right" size={14} strokeWidth={2} />
                  </a>
                </div>
              </div>
            </article>

            <figure className="prt-cert">
              <div className="prt-cert-frame">
                <Image
                  src={`${IMG}/isqua-eea-standards-certificate.webp`}
                  alt="ISQua EEA certificate for AAA Accreditation Standards for Healthcare Facilities"
                  width={1488}
                  height={2105}
                  sizes="(max-width: 980px) 90vw, 400px"
                />
              </div>
              <a
                href="/docs/site/isqua-eea-standards-certificate-5th-ed.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ax-btn ax-btn-blue"
              >
                View Recognition Certificate <Glyph name="arrow-up-right" size={14} strokeWidth={2} />
              </a>
            </figure>
          </div>

          <p className="ax-note reveal prt-recog-note">
            ISQua EEA accreditation applies specifically to AAA&apos;s Accreditation Standards for Healthcare
            Facilities. Institutional membership is a separate relationship with ISQua.
          </p>
        </div>
      </section>

      {/* 03 — Professional networks */}
      <section className="ax-section" id="professional-networks">
        <div className="container">
          <SectionHead
            center
            eyebrow="Professional Networks & Institutional Relationships"
            title="Connected Through Quality, Education & Professional Cooperation"
            intro="AAA engages with international institutions and professional networks that support quality assurance, education, professional development, and the exchange of knowledge and good practices."
          />
          <div className="ax-blue-grid">
            {NETWORKS.map((n) => (
              <article key={n.title} className="ax-card navy ax-blue reveal prt-net">
                <span className="prt-plate prt-net-logo">
                  <Image src={n.logo.src} alt={n.logo.alt} width={n.logo.w} height={n.logo.h} sizes="200px" />
                </span>
                <span className="ax-blue-tag">{n.tag}</span>
                <h3>{n.title}</h3>
                <span className="ax-blue-kicker">{n.kicker}</span>
                <div className="ax-blue-body">
                  <p>{n.text}</p>
                </div>
                <ul className="prt-areas" aria-label="Focus areas">
                  {n.areas.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Formal cooperation agreements */}
      <section className="ax-section cream" id="formal-cooperation">
        <div className="container">
          <div className="prt-coop-intro">
            <div>
              <SectionHead
                eyebrow="Formal Cooperation Agreements"
                title="Advancing Quality Through International Cooperation"
                intro="AAA works with public institutions, accreditation bodies, and quality assurance organizations through formal agreements focused on capacity building, professional development, joint accreditation activities, and stronger quality systems."
              />
            </div>

            <figure className="prt-mosaic reveal">
              <div className="prt-mosaic-a">
                <Image
                  src={`${IMG}/cooperation-photo-3.webp`}
                  alt="AAA international cooperation agreement signing"
                  fill
                  sizes="(max-width: 980px) 100vw, 600px"
                />
              </div>
              <div className="prt-mosaic-b">
                <Image
                  src={`${IMG}/cooperation-photo-1.webp`}
                  alt="AAA international cooperation activity"
                  fill
                  sizes="(max-width: 980px) 50vw, 300px"
                />
              </div>
              <div className="prt-mosaic-c">
                <Image
                  src={`${IMG}/cooperation-photo-2.jpg`}
                  alt="AAA international cooperation activity"
                  fill
                  sizes="(max-width: 980px) 50vw, 300px"
                />
              </div>
              <figcaption>
                <Glyph name="handshake" size={16} /> International cooperation in action
              </figcaption>
            </figure>
          </div>

          <div className="ax-blue-grid prt-coop-grid">
            <NavyCard icon="handshake" no="01" tag="🇲🇳 Mongolia" title="Two Cooperation Agreements">
              <h4>Healthcare Cooperation</h4>
              <p>
                AAA and Mongolia&apos;s Ministry of Health cooperate to build the capacity of healthcare accreditation
                staff and specialists.
              </p>
              <h4>Education Cooperation</h4>
              <p>
                AAA and the Mongolian National Council for Education Accreditation cooperate on joint school
                accreditation assessments, professional networking, and training in international standards, quality
                assurance, internal audits, and assessment preparation.
              </p>
            </NavyCard>
            <NavyCard
              icon="graduation"
              no="02"
              tag="🇰🇿 Kazakhstan"
              title="Education Quality Cooperation"
              kicker="International Agency for Independent Accreditation & Assessment of the Quality of Education «MANAoCO»"
            >
              <p>
                AAA&apos;s cooperation with MANAoCO supports the quality and relevance of educational institutions and
                programs in Kazakhstan, helping them meet the needs of students, parents, and the wider community.
              </p>
              <p className="prt-focus">Education Quality • Accreditation • International Cooperation</p>
            </NavyCard>
            <NavyCard
              icon="layers"
              no="03"
              tag="🇸🇴 Somalia"
              title="Accreditation Capacity Building"
              kicker="Somalia's National Accreditation Body"
            >
              <p>
                AAA signed an MoU with Somalia&apos;s National Accreditation Body to support its professional team
                through training, opportunities to observe selected assessments, and focused training on relevant
                accreditation standards.
              </p>
              <p className="prt-focus">Capacity Building • Assessment Experience • Standards Training</p>
            </NavyCard>
          </div>
        </div>
      </section>

      {/* 05 — Global reach, local support */}
      <section className="ax-section" id="global-reach">
        <div className="container">
          <SectionHead
            center
            eyebrow="Global Reach & Local Support"
            title="International Reach. Local Support."
            intro={`AAA operates across more than ${FACTS.countries} countries, supporting accredited organizations through an international network of assessors, experts, and local representatives.`}
          />

          <ul className="ax-metrics prt-reach reveal">
            {REACH.map((r) => (
              <li className="ax-metric" key={r.k}>
                <b>
                  <Stat value={r.v} />
                </b>
                <span>{r.k}</span>
              </li>
            ))}
          </ul>

          <div className="prt-rep">
            <figure className="prt-rep-photo reveal">
              <Image
                src={`${IMG}/local-representation-feature.webp`}
                alt="AAA local representation and international engagement"
                fill
                sizes="(max-width: 980px) 100vw, 520px"
              />
            </figure>
            <div className="prt-rep-panel reveal">
              <div className="prt-rep-head">
                <span className="ax-card-ico">
                  <Glyph name="pin" />
                </span>
                <h3>Our Local Representation</h3>
              </div>
              <p>
                AAA works with appointed local representatives in selected markets to facilitate communication, provide
                information about accreditation pathways, and connect organizations with the appropriate AAA team.
              </p>
              <ul className="prt-flags" aria-label="Countries with AAA local representatives">
                {REPS.map(([flag, name]) => (
                  <li key={name}>
                    <span aria-hidden="true">{flag}</span>
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — Final partnership CTA */}
      <CTA
        eyebrow="Partnership Opportunities"
        title="Build a Partnership with AAA"
        text="We welcome opportunities to collaborate with accreditation bodies, government institutions, professional organizations, educational institutions, and other organizations committed to advancing quality."
        primary={{ href: "/contact", label: "Discuss a Partnership" }}
        secondary={{ href: "/contact", label: "Contact AAA" }}
      />
    </div>
  );
}
