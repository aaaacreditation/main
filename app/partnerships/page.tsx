import Link from "next/link";
import Icon from "../_components/Icon";
import PageHero from "../_components/PageHero";
import WorldMap from "../_components/WorldMap";
import CTA from "../_components/CTA";
import JsonLd from "../_components/JsonLd";
import { pageMeta, breadcrumbSchema, faqSchema } from "@/lib/seo";
import "./partnerships.css";

export const metadata = pageMeta({
  title: "Partnerships & Memberships",
  description:
    "AAA's international network — ISQua, UNESCO's Institute for Lifelong Learning, AAACE, CONIES, the Earth Day Network and AGCAS, across three fields.",
  path: "/partnerships",
  keywords: [
    "AAA partnerships",
    "ISQua member",
    "UNESCO Institute for Lifelong Learning",
    "AAACE",
    "CONIES",
    "AGCAS",
    "accreditation memberships",
  ],
});

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

type Partner = {
  mark: string;
  markNote: string;
  name: string;
  full: string;
  relationship: string;
  field: string;
  scope: string;
  site?: { href: string; label: string };
};

const PARTNERS: Partner[] = [
  {
    mark: "ISQua",
    markNote: "Since 1985",
    name: "ISQua",
    full: "International Society for Quality in Health Care",
    relationship: "Institutional member",
    field: "Healthcare quality",
    scope:
      "AAA is a member of the International Society for Quality in Health Care (ISQua), which has been working to improve the quality and safety of health care worldwide for over 30 years through education, knowledge sharing, external evaluation, supporting health systems worldwide and connecting like-minded people through health care networks. ISQua's members are continually working towards quality improvement in health care around the world.",
    site: { href: "https://isqua.org/", label: "isqua.org" },
  },
  {
    mark: "UNESCO",
    markNote: "UIL",
    name: "UNESCO",
    full: "United Nations Educational, Scientific and Cultural Organization",
    relationship: "Partner",
    field: "Lifelong learning",
    scope:
      "AAA is a partner with UNESCO by supporting the Institute for Lifelong Learning — the key education-related institute and the only organizational unit in the UN family that holds a global mandate for lifelong learning — taking a holistic, integrated, inter-sectoral and cross-sectoral approach to lifelong learning as the guiding paradigm for 21st century education.",
    site: { href: "https://uil.unesco.org/", label: "uil.unesco.org" },
  },
  {
    mark: "AAACE",
    markNote: "Founded 1982",
    name: "AAACE",
    full: "American Association for Adult and Continuing Education",
    relationship: "Active member",
    field: "Adult education",
    scope:
      "AAA is an active member of AAACE, dedicated to providing leadership for the field of adult and continuing education by expanding opportunities for adult growth and development; the dissemination of theory, research, information, and best practices; promoting identity and standards for the profession; and advocating relevant public policy and social change initiatives. AAACE was founded as the result of a merger between the National Association for Public and Continuing Adult Education (NAPCAE) and the Adult Education Association (AEA) in 1982.",
    site: { href: "https://www.aaace.org/", label: "aaace.org" },
  },
  {
    mark: "CONIES",
    markNote: "INQAAHE-recognized",
    name: "CONIES",
    full: "Council on International Higher Education Supervision",
    relationship: "Signed agreement",
    field: "Higher education",
    scope:
      "AAA signed an Agreement for International collaboration and recognition in the area of Accreditation and Certification of Education Institutions with the Council on International Higher Education Supervision (CONIES), recognized by The International Network for Quality Assurance Agencies in Higher Education (INQAAHE). The mission of CONIES: a voluntary, non-governmental, membership association dedicated to quality assurance certification and programme validation through accreditation via peer evaluation.",
  },
  {
    mark: "Earth Day",
    markNote: "192 countries",
    name: "Earth Day Network",
    full: "Earth Day Network",
    relationship: "Full member",
    field: "Environment",
    scope:
      "AAA is a full member of the Earth Day organization, the world's largest organization, working with more than 150,000 partners in over 192 countries. The mission is to diversify, educate and activate the environmental movement worldwide.",
    site: { href: "https://www.earthday.org/", label: "earthday.org" },
  },
  {
    mark: "AGCAS",
    markNote: "Higher education",
    name: "AGCAS",
    full: "Association of Graduate Careers Advisory Services",
    relationship: "Member",
    field: "Graduate careers",
    scope:
      "AAA is a member of AGCAS, the expert membership organisation for higher education student career development and graduate employment professionals that support the best possible career outcomes from higher education for individuals, institutions, society and the economy.",
    site: { href: "https://www.agcas.org.uk/", label: "agcas.org.uk" },
  },
];

const METRICS: { big: string; small: string }[] = [
  { big: "6", small: "Partner organizations & memberships" },
  { big: "30+ yrs", small: "ISQua improving healthcare quality worldwide" },
  { big: "192", small: "Countries reached by the Earth Day Network" },
  { big: "150,000+", small: "Earth Day Network partner organizations" },
];

const MEANING: { title: string; text: string }[] = [
  {
    title: "Standards assessed by ISQua EEA",
    text: "The AAA Accreditation Standards for Healthcare Facilities have been assessed and accredited by ISQua EEA against the Guidelines and Principles for the Development of Health and Social Care Standards, 5th Edition.",
  },
  {
    title: "Built with 174 international experts",
    text: "AAA accreditation programs were created according to the international requirements of ISQua and in consultation with 174 international healthcare experts.",
  },
  {
    title: "Recognized across education networks",
    text: "The CONIES agreement covers international collaboration and recognition in the accreditation and certification of education institutions, and CONIES is recognized by INQAAHE.",
  },
];

const FAQ = [
  {
    q: "Which international organizations is AAA a member of?",
    a: "AAA is a member of the International Society for Quality in Health Care (ISQua), an active member of the American Association for Adult and Continuing Education (AAACE), a full member of the Earth Day Network, and a member of the Association of Graduate Careers Advisory Services (AGCAS). AAA is also a partner of UNESCO through its support for the Institute for Lifelong Learning, and has signed an agreement for international collaboration and recognition with the Council on International Higher Education Supervision (CONIES).",
  },
  {
    q: "What does AAA's ISQua membership mean?",
    a: "ISQua — the International Society for Quality in Health Care — has been working to improve the quality and safety of health care worldwide for over 30 years through education, knowledge sharing, external evaluation and support for health systems worldwide. Beyond membership, the AAA Accreditation Standards for Healthcare Facilities have been assessed and accredited by ISQua EEA against the Guidelines and Principles for the Development of Health and Social Care Standards, 5th Edition.",
  },
  {
    q: "What is the AAA partnership with UNESCO?",
    a: "AAA is a partner with UNESCO by supporting the Institute for Lifelong Learning — the key education-related institute and the only organizational unit in the UN family that holds a global mandate for lifelong learning, taking a holistic, integrated, inter-sectoral and cross-sectoral approach to lifelong learning as the guiding paradigm for 21st century education.",
  },
  {
    q: "What is CONIES and why did AAA sign an agreement with it?",
    a: "CONIES is the Council on International Higher Education Supervision, a voluntary, non-governmental membership association dedicated to quality assurance certification and programme validation through accreditation via peer evaluation, recognized by the International Network for Quality Assurance Agencies in Higher Education (INQAAHE). AAA signed an agreement with CONIES for international collaboration and recognition in the area of accreditation and certification of education institutions.",
  },
  {
    q: "How many countries does AAA operate in?",
    a: "AAA serves organizations in 58 countries worldwide, supported by a network of over 100 assessors and technical experts.",
  },
];

export default function Page() {
  return (
    <main className="axp ptx">
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "National & International Partnership", path: "/partnerships" },
          ]),
          faqSchema(FAQ),
        ]}
      />

      <PageHero
        image="/about/team-network.jpg"
        eyebrow="International Network"
        badge="Memberships · Partnerships · Agreements"
        title={
          <>
            National &amp; international <em>partnerships.</em>
          </>
        }
        intro="Accreditation only travels as far as the networks behind it. AAA holds memberships, partnerships and signed agreements with organizations in healthcare quality, lifelong learning, adult and higher education, graduate careers and the environment — and its healthcare standards are assessed by ISQua EEA."
        crumbs={[{ label: "National & International Partnership" }]}
        caption={{
          kicker: "AAA network",
          title: "Assessors, experts and partner organizations across 58 countries",
          chip: "ISQua EEA assessed",
        }}
        meta={[
          { k: "Partner organizations", v: "6" },
          { k: "Countries served", v: "58" },
          { k: "Assessors & experts", v: "100+" },
          { k: "Accredited organizations", v: "200+" },
        ]}
        actions={
          <>
            <a href="#partners" className="ax-btn ax-btn-gold">
              Meet the partners <Icon name="arrow" size={14} />
            </a>
            <Link href="/about-accreditation" className="ax-btn ax-btn-ghost">
              Why it matters
            </Link>
          </>
        }
      />

      {/* 01 — Why the network matters */}
      <section className="ax-section" id="network">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">The network</span>
            <h2>Recognition is built, not claimed.</h2>
            <p>
              An accreditation body earns credibility the same way the organizations it accredits
              do: by submitting its work to people outside it. AAA&rsquo;s memberships and
              agreements put its standards, its people and its methods in front of international
              bodies in every field it accredits.
            </p>
            <span className="ax-rule" aria-hidden="true" />
          </div>

          <div className="ax-metrics" style={{ marginTop: "clamp(30px, 3.4vw, 46px)" }}>
            {METRICS.map((m, i) => (
              <div className="ax-metric reveal" key={m.small} style={{ transitionDelay: `${i * 55}ms` }}>
                <b>{m.big}</b>
                <span>{m.small}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 — The partners */}
      <section className="ax-section cream" id="partners">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">Our partners</span>
            <h2>Six organizations, four fields.</h2>
            <p>
              Each relationship is described below exactly as it stands — membership, partnership or
              a signed agreement. Nothing here is a co-branding arrangement or an endorsement of
              individual accreditations.
            </p>
            <span className="ax-rule" aria-hidden="true" />
          </div>

          <div className="ptx-partners" style={{ marginTop: "clamp(30px, 3.4vw, 46px)" }}>
            {PARTNERS.map((p, i) => (
              <article
                className="ptx-partner reveal"
                key={p.name}
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                <div className="ptx-mark" aria-hidden="true">
                  <b>{p.mark}</b>
                  <span>{p.markNote}</span>
                </div>
                <div>
                  <div className="ptx-partner-head">
                    <span className="ptx-rel">{p.relationship}</span>
                    <span className="ptx-field">{p.field}</span>
                  </div>
                  <h3>
                    {p.name}
                    <span>{p.full}</span>
                  </h3>
                  <p>{p.scope}</p>
                  {p.site && (
                    <a
                      className="ptx-site"
                      href={p.site.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.site.label}
                      <svg
                        viewBox="0 0 24 24"
                        width="13"
                        height="13"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — What the network delivers */}
      <section className="ax-section navy" id="recognition">
        <div className="container">
          <div className="ax-head reveal">
            <span className="eyebrow">What it delivers</span>
            <h2>What these relationships actually change.</h2>
            <p>
              The point of an international network is not the logo wall. It is that AAA&rsquo;s
              standards have been examined by people who set the benchmark, and that the
              organizations AAA accredits inherit that scrutiny.
            </p>
          </div>

          <ul className="ptx-recognition reveal" style={{ marginTop: "clamp(28px, 3.2vw, 42px)" }}>
            {MEANING.map((m) => (
              <li key={m.title}>
                <b>{m.title}</b>
                <span>{m.text}</span>
              </li>
            ))}
          </ul>

          <div className="ax-split top" style={{ marginTop: "clamp(36px, 4vw, 56px)" }}>
            <div className="reveal">
              <div className="ax-head">
                <h3>For accredited organizations</h3>
              </div>
              <ul className="ax-checks">
                <li>
                  Accreditation against standards whose development has been externally assessed,
                  not written in-house and left unchecked
                </li>
                <li>
                  Permission to use the golden AAA accreditation symbol and mark on documents,
                  records and publicity materials
                </li>
                <li>
                  Listing of certified trainees and staff in the American Directory of Competent
                  Personnel (ADCP)
                </li>
                <li>Recognition across the 58 countries AAA serves</li>
              </ul>
            </div>
            <div className="reveal">
              <div className="ax-head">
                <h3>For buyers and regulators</h3>
              </div>
              <ul className="ax-checks">
                <li>
                  A reliable and impartial basis for sound decision-making, backed by an
                  internationally networked accreditor
                </li>
                <li>Comparable conformity assessment results across borders</li>
                <li>
                  A published impartiality policy and a complaints and appeals procedure open to all
                  stakeholders
                </li>
                <li>Technical requirements set by committees that include regulators themselves</li>
              </ul>
            </div>
          </div>

          <div className="ax-actions">
            <Link href="/impartiality-policy" className="ax-btn ax-btn-ghost">
              <span className="ax-ico" style={{ width: 15, height: 15 }} aria-hidden="true">
                <LineIcon strokeWidth={2}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </LineIcon>
              </span>
              Impartiality policy
            </Link>
            <Link href="/advisory-committees" className="ax-btn ax-btn-ghost">
              Advisory technical committees
            </Link>
          </div>
        </div>
      </section>

      {/* 04 — Where we operate */}
      <WorldMap eyebrow="Where we work" />

      {/* 05 — FAQ */}
      <section className="ax-section cream" id="faq">
        <div className="container">
          <div className="ax-head center reveal">
            <span className="eyebrow">FAQ</span>
            <h2>Questions about AAA&rsquo;s network.</h2>
          </div>
          <div className="ax-faq-list single">
            {FAQ.map((item, i) => (
              <details className="ax-faq-item reveal" key={item.q} open={i === 0}>
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
        eyebrow="Join the network"
        title={
          <>
            International accreditation, <em>accepted globally.</em>
          </>
        }
        text="Tell us about your organization and our team will scope your accreditation journey — your sector, the applicable standards, and the geographies you operate in."
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: "/membership", label: "Explore membership" }}
        related={[
          { href: "/about-accreditation", label: "About accreditation" },
          { href: "/advisory-committees", label: "Advisory committees" },
          { href: "/directory/accredited-organizations", label: "Accredited organizations" },
        ]}
      />
    </main>
  );
}
