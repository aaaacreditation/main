import Link from "next/link";
import Icon, { type IconName } from "./_components/Icon";
import { WorldMapFigure } from "./_components/WorldMap";
import SealRosette from "./_components/SealRosette";
import Intro from "./_components/home/Intro";
import Programs from "./_components/home/Programs";
import Why from "./_components/home/Why";
import Insights from "./_components/home/Insights";
import HomeTeam from "./_components/home/HomeTeam";
import HomeGallery from "./_components/home/HomeGallery";
import ApplyForm from "./_components/home/ApplyForm";
import HeroStats from "./_components/home/HeroStats";

const CONSULT = "https://calendly.com/aaa-accreditation/30min";
const HERO_BG = "/hero.jpg";

const HERO = {
  badge: "US-authorized accreditation body",
  titleA: "International Accreditation ",
  accent: "Accepted Globally",
  sub: "The American Accreditation Association offers accreditation worldwide, based on internationally recognized standards that ensure the competence of accredited organizations — and the global acceptance of their results.",
  stats: [
    { num: "200+", label: "Accredited organizations" },
    { num: "53+", label: "Countries served" },
    { num: "100+", label: "Assessors & experts" },
  ],
};

/* Sample certificate the hero renders as a product visual (illustrative). */
const CERT_STANDARDS = ["ISO 15189", "ISO/IEC 17025", "ISQua EEA"];

/* Standards the AAA programs are aligned with — shown in the hero marquee. */
const STANDARDS = [
  "ISQua EEA",
  "ISO/IEC 17021-1",
  "ISO/IEC 17025",
  "ISO 15189",
  "ISO/IEC 17020",
  "ISO/IEC 17024",
  "ISO/IEC 17065",
  "ISO/IEC 17043",
  "ASTM E2659",
];

const REASONS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "shield",
    title: "Internationally recognized standards",
    text: "AAA accreditation standards are assessed by ISQua EEA, reflecting alignment with international best-practice requirements.",
  },
  {
    icon: "clipboard",
    title: "Dedicated accreditation coordinator",
    text: "Each applicant is assigned a dedicated coordinator to manage communication, coordinate the process, and provide timely support.",
  },
  {
    icon: "scale",
    title: "Flexible assessment options",
    text: "AAA provides on-site, hybrid, and virtual assessment options while maintaining the same rigorous requirements and decision process.",
  },
  {
    icon: "globe",
    title: "Proven international experience",
    text: "With activity across 53+ countries, AAA works with organizations of different sizes, sectors, and regional contexts.",
  },
];

const GR_STATS = [
  { num: "53+", label: "Countries served" },
  { num: "200+", label: "Accredited organizations" },
  { num: "100+", label: "Assessors & experts" },
  { num: "ISQua", label: "EEA assessed" },
];

const ORGS = [
  { name: "GovernValU Consulting", loc: "Türkiye", mono: "GV" },
  { name: "T&C Board", loc: "Gujarat, India", mono: "T&C" },
  { name: "Millennia Wellness", loc: "Texas, USA", mono: "MW" },
  { name: "Indian Institute for Business Management Studies", loc: "Mumbai, India", mono: "IIBMS" },
  { name: "RC Business Growth Consultancies", loc: "Business Growth Consultancy", mono: "RC" },
];

const TESTIMONIALS = [
  {
    quote:
      "The assessment was rigorous and fair. Accreditation gave our quality system a structure that international partners immediately trust.",
    name: "Laboratory Director",
    org: "Medical Laboratory",
  },
  {
    quote:
      "AAA accreditation opened cross-border recognition we couldn't access before. Our results are now accepted without re-testing.",
    name: "Quality Manager",
    org: "Testing Laboratory",
  },
  {
    quote:
      "Recognition against an international benchmark changed how institutions and corporate clients view our programs.",
    name: "Director of Education",
    org: "Training Provider",
  },
];

const CONTACT = [
  { icon: "mail" as IconName, label: "Email us", value: "info@aaa-accreditation.org", href: "mailto:info@aaa-accreditation.org" },
  { icon: "phone" as IconName, label: "Call us", value: "+1 (571) 601 2616" },
  { icon: "phone" as IconName, label: "International / WhatsApp", value: "+44 (748) 755 0737", href: "https://wa.me/447487550737" },
  { icon: "pin" as IconName, label: "Visit us", value: "8609 Westwood Center Drive, Tysons Corner, VA 22182, USA" },
];

export default function HomePage() {
  return (
    <>
      {/* 0. Hero */}
      <section className="hero2">
        <div
          className="hero2-bg"
          style={{ backgroundImage: `url(${HERO_BG})` }}
          role="img"
          aria-label="Accreditation professionals reviewing documentation"
        />
        <div className="hero2-shade" aria-hidden="true" />
        <div className="hero2-grain" aria-hidden="true" />
        <div className="hero2-glow" aria-hidden="true" />

        <div className="container">
          <div className="hero2-grid">
            <div className="hero2-copy reveal">
              <span className="hero2-badge">
                <span className="hero2-dot" aria-hidden="true" />
                {HERO.badge}
              </span>
              <h1>
                {HERO.titleA}
                <span className="hero2-accent">
                  {HERO.accent}
                  <svg className="hero2-underline" viewBox="0 0 240 14" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M3 10.5 C 62 4.5, 172 3.5, 237 8.5" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>
              <p className="hero2-sub">{HERO.sub}</p>
              <div className="hero2-actions">
                <Link href="/quote" className="btn btn-gold">
                  Get a Quote <Icon name="arrow" size={14} className="arrow" />
                </Link>
                <Link href="#programs" className="btn btn-ghost-light">
                  Explore our programs
                </Link>
              </div>
              <HeroStats stats={HERO.stats} />
            </div>

            {/* Product visual — sample certificate of accreditation */}
            <aside className="hero2-visual reveal" aria-hidden="true">
              <div className="sc-card">
                <div className="sc-head">
                  <span className="sc-mark">AAA</span>
                  <span className="sc-head-txt">
                    <strong>Certificate of Accreditation</strong>
                    <em>International accreditation · sample</em>
                  </span>
                  <span className="sc-verified">
                    <Icon name="check" size={11} strokeWidth={3} /> Verified
                  </span>
                </div>

                <div className="cert-body">
                  <SealRosette />
                  <span className="cert-line">This certifies that</span>
                  <span className="cert-org">Your Organization</span>
                  <span className="cert-line">
                    has demonstrated competence and impartiality in accordance with
                  </span>
                  <div className="cert-stds">
                    {CERT_STANDARDS.map((s) => (
                      <span className="std-pill light" key={s}>{s}</span>
                    ))}
                  </div>
                </div>

                <div className="cert-meta">
                  <div>
                    <em>Decision</em>
                    <strong>Granted</strong>
                  </div>
                  <div>
                    <em>Validity</em>
                    <strong>3 years</strong>
                  </div>
                  <div>
                    <em>Verification</em>
                    <strong>Digital</strong>
                  </div>
                </div>

                <div className="sc-foot">
                  <span className="sc-isqua">ISQua EEA</span>
                  <p>Standards assessed by ISQua EEA · Verifiable online</p>
                </div>
              </div>

              <div className="sc-chip sc-chip-a">
                <span className="sc-chip-ico"><Icon name="shield" size={16} /></span>
                ISQua EEA-assessed standards
              </div>
              <div className="sc-chip sc-chip-b">
                <span className="sc-chip-ico"><Icon name="globe" size={16} /></span>
                Accepted in 53+ countries
              </div>
            </aside>
          </div>
        </div>

        {/* Standards marquee */}
        <div className="hero2-band">
          <div className="container hero2-band-inner">
            <span className="hero2-band-label">Programs aligned with international standards</span>
            <div className="hero2-marquee" aria-hidden="true">
              <div className="hero2-marquee-track">
                {[...STANDARDS, ...STANDARDS].map((s, i) => (
                  <span className="hero2-mq-item" key={`${s}-${i}`}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Mission statement */}
      <Intro />

      {/* 2. Our services — three accreditation programs (photo cards) */}
      <Programs />

      {/* 3. Why AAA */}
      <Why />

      {/* 4. Global recognition — reasons + numbers + world map */}
      <section className="smegr" id="global">
        <div className="container">
          <div className="sme-head light reveal">
            <span className="eyebrow">Global recognition</span>
            <h2>Why organizations around the world trust AAA</h2>
            <p>
              AAA brings together internationally recognized standards, structured coordination,
              flexible assessment options, and international experience across a growing global
              network.
            </p>
          </div>
          <div className="smegr-layout">
            <div className="smegr-reasons reveal">
              {REASONS.map((r) => (
                <div className="smegr-reason" key={r.title}>
                  <div className="smegr-reason-ico">
                    <Icon name={r.icon} size={22} />
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>

            <div className="smegr-visual reveal">
              <div className="smegr-stats">
                <div className="smegr-stats-grid">
                  {GR_STATS.map((s) => (
                    <div className="smegr-stat" key={s.label}>
                      <div className="smegr-stat-num">{s.num}</div>
                      <div className="smegr-stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="smegr-map">
                <div className="smegr-map-head">
                  <div>
                    <h3>Countries we operate in</h3>
                    <p>
                      AAA&rsquo;s international footprint reflects its growing role supporting
                      quality-focused organizations across regions and sectors.
                    </p>
                  </div>
                  <span className="smegr-map-badge">Global presence</span>
                </div>
                <div className="smegr-map-image">
                  <WorldMapFigure />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. News & events */}
      <Insights />

      {/* 6. Accredited network + testimonials */}
      <section className="sme-clients" id="clients">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Success stories</span>
            <h2>Be part of our accredited network</h2>
            <p>
              Join a growing community of organizations that have demonstrated competence and
              credibility through AAA accreditation.
            </p>
          </div>
          <div className="sme-orgs-grid reveal">
            {ORGS.map((o) => (
              <article className="sme-org" key={o.name}>
                <div className="sme-org-mono">{o.mono}</div>
                <h3>{o.name}</h3>
                <p>{o.loc}</p>
              </article>
            ))}
          </div>
          <div className="sme-testi-row">
            {TESTIMONIALS.map((t, i) => (
              <figure className="sme-testi reveal" key={t.name + i} style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="sme-testi-mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote>{t.quote}</blockquote>
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.org}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "44px" }} className="reveal">
            <Link href="/quote" className="btn btn-primary">
              Get a Quote <Icon name="arrow" size={14} className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Gallery */}
      <section className="sme-gallery" id="gallery">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Gallery</span>
            <h2>Excellence in action</h2>
            <p>
              Moments from AAA accreditation assessments, certification ceremonies, and engagements
              with organizations worldwide.
            </p>
          </div>
          <HomeGallery />
        </div>
      </section>

      {/* 8. Leadership team */}
      <section className="sme-team" id="team">
        <div className="container">
          <div className="sme-head light reveal">
            <span className="eyebrow">Leadership team</span>
            <h2>Meet our team</h2>
            <p>
              Dedicated professionals committed to elevating standards worldwide. Hover over a card
              to read each bio.
            </p>
          </div>
          <HomeTeam />
        </div>
      </section>

      {/* 9. Contact + quote request */}
      <section className="sme-contact" id="contact">
        <span className="sme-contact-corner" />
        <div className="container">
          <div className="sme-contact-layout">
            <div className="sme-contact-info reveal">
              <span className="eyebrow">Get in touch</span>
              <h2>Ready to start your accreditation journey?</h2>
              <p>
                Tell us about your organization and our team will scope your accreditation
                pathway — the applicable standards, the process, and a tailored quotation.
              </p>
              <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="sme-consult">
                <span className="sme-consult-ico">
                  <Icon name="cert" size={22} />
                </span>
                <span>
                  <strong>Book a free 30-minute consultation</strong>
                  <em>Talk to an accreditation specialist. No obligation.</em>
                </span>
                <Icon name="arrow" size={16} className="arrow" />
              </a>
              <div className="sme-contact-list">
                {CONTACT.map((c) =>
                  c.href ? (
                    <a
                      className="sme-contact-item"
                      key={c.label}
                      href={c.href}
                      {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      <span className="ico">
                        <Icon name={c.icon} size={18} />
                      </span>
                      <span>
                        <strong>{c.label}</strong>
                        {c.value}
                      </span>
                    </a>
                  ) : (
                    <div className="sme-contact-item" key={c.label}>
                      <span className="ico">
                        <Icon name={c.icon} size={18} />
                      </span>
                      <span>
                        <strong>{c.label}</strong>
                        {c.value}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            <ApplyForm />
          </div>
        </div>
      </section>
    </>
  );
}
