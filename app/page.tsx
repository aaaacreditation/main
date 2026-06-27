import Link from "next/link";
import Icon, { type IconName } from "./_components/Icon";
import { WorldMapFigure } from "./_components/WorldMap";
import ReadinessCheck from "./programs/sme-funding-readiness/ReadinessCheck";
import HomeTeam from "./_components/home/HomeTeam";
import HomeGallery from "./_components/home/HomeGallery";
import ApplyForm from "./_components/home/ApplyForm";

const CONSULT = "https://calendly.com/aaa-accreditation/30min";
const HERO_BG = "/hero.jpg";

const HERO = {
  badge: "SME Funding Readiness Program",
  titleA: "Get your business ",
  accent: "funding-ready",
  titleB: " in 30 days",
  sub: "AAA's SME Accreditation translates your operational and financial health into a lender-readable funding-readiness score that's recognized internationally across 53+ countries.",
  stats: [
    { num: "$5.7T", label: "Global SME finance gap" },
    { num: "40%+", label: "SMEs underserved by lenders" },
    { num: "53+", label: "Countries recognized" },
  ],
  trust: [
    { n: "53+", l: "Countries" },
    { n: "100+", l: "Surveyors" },
    { n: "30", l: "Days to certify" },
    { n: "24/7", l: "Support" },
  ],
};

const PAIN: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "chart",
    title: "No standardised signal",
    text: "Lenders can't assess businesses that keep informal records. There's no universal readiness indicator that simply says: this one's ready.",
  },
  {
    icon: "search",
    title: "Opaque, slow process",
    text: "Loan decisions can drag on for three to six months, hinge on relationships, and first-time borrowers have no track record to show.",
  },
  {
    icon: "clipboard",
    title: "One-size-fits-all ratings",
    text: "Most ratings are pass or fail. Many first-time applicants don't qualify, and they're left with no pathway to improve.",
  },
  {
    icon: "industry",
    title: "Sector blindness",
    text: "Generalist lenders rarely understand sector-specific risks in agri, export, tech, or manufacturing — so genuine strengths get missed.",
  },
];

const RECOG = [
  { num: "53+", h: "Countries", p: "Active accreditation presence worldwide." },
  { num: "100+", h: "Surveyors", p: "Qualified assessors across the globe." },
  { num: "ISQua", h: "EEA Assessed", p: "Aligned with international best practice." },
  { num: "US", h: "Gov-Authorized", p: "Registered under Title 13.1, Code of Virginia." },
];

const CATEGORIES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "chart",
    title: "Financial & Funding Readiness",
    text: "Financial records, obligations awareness, funding requirements, and financial monitoring processes.",
  },
  {
    icon: "industry",
    title: "Operational Requirements",
    text: "Active operations, process documentation, resource adequacy, and stakeholder communication.",
  },
  {
    icon: "clipboard",
    title: "Management & Structure",
    text: "Legal registration, organizational structure, ownership clarity, and management responsibilities.",
  },
  {
    icon: "shield",
    title: "Governance & Compliance",
    text: "Ethical operations, risk management, regulatory compliance, and business transparency.",
  },
  {
    icon: "globe",
    title: "Market Presence & Growth",
    text: "Product and service definition, customer activity, growth objectives, and stakeholder feedback.",
  },
  {
    icon: "arrowUpRight",
    title: "Continuous Improvement",
    text: "Improvement identification, feedback collection, issue resolution, and change documentation.",
  },
];

const FLOW: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "industry",
    title: "Your business health",
    text: "We assess your real operations, finances, and governance, exactly as they are today.",
  },
  {
    icon: "chart",
    title: "Funding-readiness score",
    text: "Your evidence is scored against six weighted categories into a single, defensible score.",
  },
  {
    icon: "scale",
    title: "Lender-readable signal",
    text: "The score maps to lender KYB and credit criteria — a language banks and investors already trust.",
  },
  {
    icon: "arrowUpRight",
    title: "Faster funding access",
    text: "Walk into funding conversations with verified credibility, fewer rejections, and stronger terms.",
  },
];

const BENEFITS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "check",
    title: "Verified credibility",
    text: "An independent, internationally recognized stamp that your business is structured, transparent, and trustworthy.",
  },
  {
    icon: "chart",
    title: "Faster loan decisions",
    text: "Give lenders a pre-structured evidence pack so reviews move in weeks, not months.",
  },
  {
    icon: "shield",
    title: "Lower rejection risk",
    text: "Address the gaps that get applications rejected before you ever submit them.",
  },
  {
    icon: "globe",
    title: "Global recognition",
    text: "A credential understood across 53+ countries — valuable for exporters and cross-border partners.",
  },
  {
    icon: "scale",
    title: "Investor confidence",
    text: "Demonstrate the governance and readiness that institutional investors and partners expect.",
  },
  {
    icon: "arrowUpRight",
    title: "A clear growth path",
    text: "Progressive levels give you a visible roadmap to strengthen and re-certify as you scale.",
  },
];

const PROCESS = [
  { title: "Apply online", text: "Submit your application with basic business details and select your target accreditation level." },
  { title: "Document submission", text: "Upload required evidence: registration, financials, operational records, and governance documents." },
  { title: "Self-assessment", text: "Complete the structured questionnaire mapped to the six scoring categories." },
  { title: "Expert review", text: "AAA assessors evaluate your submission through document review, interviews, and verification." },
  { title: "Scoring & decision", text: "Final scoring, level determination, and accreditation decision by the AAA review board." },
  { title: "Certification", text: "Certificate issued with a digital verification badge and full accreditation report." },
];

const ELIGIBILITY = [
  { title: "Registered MSMEs", text: "Micro, small, and medium enterprises with valid business registration." },
  { title: "Funding-seeking businesses", text: "SMEs preparing for loans, working capital, or investor funding." },
  { title: "First-time borrowers", text: "Businesses with no prior credit track record who need a credible starting signal." },
  { title: "Exporters & growth firms", text: "Companies needing internationally recognized credibility for cross-border trade." },
];

const SECTORS = [
  "Manufacturing",
  "IT & Software Services",
  "Healthcare & Pharma",
  "Agri-Processing",
  "Textile & Apparel",
  "Clean Energy & Greentech",
  "Logistics & Transport",
  "Construction & Engineering",
  "Retail & E-commerce",
  "Consulting & Services",
  "Hospitality & Food",
  "Export & Import",
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
      "The accreditation gave our loan application a structure the bank immediately understood. It removed months of back-and-forth.",
    name: "Operations Director",
    org: "Manufacturing SME",
  },
  {
    quote:
      "As a first-time borrower, we finally had a credible signal to show lenders. The funding-readiness score made all the difference.",
    name: "Founder",
    org: "Agri-Processing Firm",
  },
  {
    quote:
      "International recognition opened cross-border partnerships we couldn't access before. A genuine growth unlock.",
    name: "Managing Partner",
    org: "Export Business",
  },
];

const FAQ = [
  {
    q: "What is AAA SME accreditation?",
    a: "AAA SME Accreditation is a small and medium business accreditation program that assesses how well a business is managed and prepared for growth. It helps SMEs demonstrate credibility, strengthen trust, and gain independent recognition for good business practices.",
  },
  {
    q: "What makes AAA different from other accreditation bodies?",
    a: "AAA focuses on business readiness, governance, and growth. Through an independent assessment process, businesses receive recognition based on established criteria, internationally aligned with recognized accreditation principles.",
  },
  {
    q: "Who can apply for AAA SME accreditation?",
    a: "AAA SME Accreditation is open to eligible small and medium enterprises across various industries. Whether you are an established business or a growing SME, you can apply if you meet the mandatory accreditation requirements.",
  },
  {
    q: "How is funding readiness assessed through AAA SME Accreditation?",
    a: "AAA evaluates Financial & Funding Readiness, Operational Requirements, Management & Structure, Governance & Compliance, Market Presence & Growth, and Continuous Improvement against defined accreditation standards. This determines how prepared a business is for funding opportunities, stakeholder expectations, and sustainable growth.",
  },
  {
    q: "How do I check whether my business is eligible?",
    a: "You can use the free AAA SME Accreditation Readiness Check above. This simple assessment helps determine whether your business is likely to qualify for accreditation.",
  },
  {
    q: "How long does the accreditation process take?",
    a: "The timeline depends on your business size, readiness, and the information provided. Most small and medium business accreditation assessments take 30 to 60 days, following a structured process of application review, evaluation, and accreditation decision.",
  },
  {
    q: "Can startups apply for accreditation?",
    a: "Yes. A startup may apply if it is actively operating and can demonstrate appropriate business practices, governance, and operational controls. Accreditation is available to SMEs at different stages of growth, provided they are engaged in ongoing business activities.",
  },
  {
    q: "How long is the AAA SME accreditation valid?",
    a: "AAA SME accreditation remains valid for a period of 3 years, subject to continued compliance with the required accreditation standards.",
  },
  {
    q: "How much does AAA SME accreditation cost?",
    a: "The cost depends on the size, complexity, and scope of the assessment. AAA provides customized quotations to businesses seeking accreditation, ensuring the process is aligned with their specific requirements.",
  },
  {
    q: "How do I get started?",
    a: "Getting started is simple. Complete the Accreditation Readiness Check above, or contact AAA directly. Our team will guide you through eligibility requirements, assessment expectations, and the next steps toward accreditation.",
  },
];

const CONTACT = [
  { icon: "mail" as IconName, label: "Email us", value: "sme@aaa-accreditation.org", href: "mailto:sme@aaa-accreditation.org" },
  { icon: "phone" as IconName, label: "Call us", value: "+1 (571) 601 2616" },
  { icon: "phone" as IconName, label: "International / WhatsApp", value: "+44 (748) 755 0737", href: "https://wa.me/447487550737" },
  { icon: "pin" as IconName, label: "Visit us", value: "8609 Westwood Center Drive, Tysons Corner, VA 22182, USA" },
];

export default function HomePage() {
  return (
    <>
      {/* 0. Hero */}
      <section className="smehome-hero">
        <div
          className="smehome-hero-bg"
          style={{ backgroundImage: `url(${HERO_BG})` }}
          role="img"
          aria-label="Accreditation professionals reviewing documentation"
        />
        <div className="smehome-hero-overlay" />
        <div className="container">
          <div className="smehome-hero-inner">
            <div className="reveal">
              <span className="smehome-badge">{HERO.badge}</span>
              <h1>
                {HERO.titleA}
                <span className="accent">{HERO.accent}</span>
                {HERO.titleB}
              </h1>
              <p className="smehome-sub">{HERO.sub}</p>
              <div className="smehome-stats">
                {HERO.stats.map((s) => (
                  <div className="smehome-stat" key={s.label}>
                    <span className="smehome-stat-num">{s.num}</span>
                    <span className="smehome-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="smehome-actions">
                <Link href="/quote" className="btn btn-gold">
                  Start your accreditation <Icon name="arrow" size={14} className="arrow" />
                </Link>
                <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                  Book a free consultation
                </a>
              </div>
            </div>

            <aside className="smehome-card reveal">
              <p className="smehome-card-title">Why SMEs trust AAA</p>
              <div className="smehome-isqua">
                <span className="smehome-isqua-badge">ISQua EEA</span>
                <p>
                  AAA accreditation standards are assessed by ISQua EEA, confirming alignment with
                  international best-practice requirements.
                </p>
              </div>
              <div className="smehome-trust-row">
                {HERO.trust.map((t) => (
                  <div className="smehome-trust" key={t.l}>
                    <span className="n">{t.n}</span>
                    <span className="l">{t.l}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 1. Why accreditation matters */}
      <section className="sme-pain" id="why-matters">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Why accreditation matters</span>
            <h2>Why SMEs struggle to access funding</h2>
            <p>
              The barrier usually isn&rsquo;t capital — it&rsquo;s the inability to demonstrate
              creditworthiness in a format lenders trust. These are the gaps that hold good
              businesses back.
            </p>
          </div>
          <div className="sme-pain-grid">
            {PAIN.map((p, i) => (
              <article className="sme-pain-card reveal" key={p.title} style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="sme-pain-ico">
                  <Icon name={p.icon} size={22} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Global recognition + world map */}
      <section className="sme-global" id="global">
        <div className="container">
          <div className="sme-global-layout with-map">
            <div className="sme-global-text reveal">
              <span className="eyebrow">Global recognition</span>
              <h2>An accreditation respected worldwide</h2>
              <p>
                AAA is a US government-authorized accreditation body operating in more than 53
                countries, with standards assessed by ISQua EEA, the global benchmark for
                accreditation bodies. Your credential travels with your business.
              </p>
              <div className="sme-recog-grid">
                {RECOG.map((r) => (
                  <div className="sme-recog" key={r.h}>
                    <div className="sme-recog-num">{r.num}</div>
                    <h4>{r.h}</h4>
                    <p>{r.p}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="sme-mapcard reveal">
              <WorldMapFigure />
              <div className="sme-mapcard-strip">
                <span className="badge">ISQua EEA</span>
                <span>AAA standards are independently assessed against international best practice.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Accreditation framework — 6 categories */}
      <section className="sme-cats" id="framework">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">AAA SME accreditation framework</span>
            <h2>Six core assessment categories</h2>
            <p>
              Your SME is evaluated across six core dimensions — the same things lenders and
              investors weigh up when they decide if you&rsquo;re funding-ready.
            </p>
          </div>
          <div className="sme-cats-grid">
            {CATEGORIES.map((c, i) => (
              <article className="sme-cat reveal" key={c.title} style={{ transitionDelay: `${i * 55}ms` }}>
                <div className="sme-cat-ico">
                  <Icon name={c.icon} size={24} />
                </div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How it supports funding readiness — flow */}
      <section className="sme-flow" id="funding">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">How it works for funding</span>
            <h2>How accreditation supports funding readiness</h2>
            <p>
              AAA converts your everyday business health into a structured, lender-readable signal
              that turns &ldquo;we can&rsquo;t assess you&rdquo; into &ldquo;you&rsquo;re
              funding-ready.&rdquo;
            </p>
          </div>
          <div className="sme-flow-grid">
            {FLOW.map((f, i) => (
              <div className="sme-flow-step reveal" key={f.title} style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="sme-flow-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="sme-flow-ico">
                  <Icon name={f.icon} size={22} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Business benefits */}
      <section className="sme-benefits" id="benefits">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Business benefits</span>
            <h2>What accreditation unlocks for your SME</h2>
            <p>
              Accreditation does more than hand you a certificate. It strengthens every conversation
              you have with lenders, investors, partners, and customers.
            </p>
          </div>
          <div className="sme-benefit-grid">
            {BENEFITS.map((b, i) => (
              <article className="sme-benefit reveal" key={b.title} style={{ transitionDelay: `${i * 55}ms` }}>
                <div className="sme-benefit-ico">
                  <Icon name={b.icon} size={22} />
                </div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="sme-band" id="apply">
        <span className="sme-band-corner" />
        <div className="container">
          <div className="sme-band-inner reveal">
            <div>
              <span className="eyebrow">Get started</span>
              <h2>Ready to become funding-ready?</h2>
              <p>
                Start your AAA SME Accreditation today, or book a free 30-minute consultation with
                our team to see where your business stands.
              </p>
            </div>
            <div className="sme-band-actions">
              <Link href="/quote" className="btn btn-gold">
                Start your accreditation <Icon name="arrow" size={14} className="arrow" />
              </Link>
              <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                Book a free consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Accreditation process */}
      <section className="sme-process" id="process">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Accreditation process</span>
            <h2>How it works, step by step</h2>
            <p>A straightforward six-step process designed to get your business accredited in 30 days.</p>
          </div>
          <div className="sme-process-grid">
            {PROCESS.map((step, i) => (
              <article className="sme-process-step reveal" key={step.title} style={{ transitionDelay: `${i * 50}ms` }}>
                <span className="sme-process-num">{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Who can apply */}
      <section className="sme-who" id="who">
        <div className="container">
          <div className="sme-head light reveal">
            <span className="eyebrow">Who can apply</span>
            <h2>Built for every growing SME</h2>
            <p>
              If you run a registered, operating business seeking credibility and funding, AAA SME
              Accreditation is for you — across the full breadth of the SME landscape.
            </p>
          </div>
          <div className="sme-who-layout">
            <ul className="sme-elig reveal">
              {ELIGIBILITY.map((e) => (
                <li key={e.title}>
                  <span className="tick">
                    <Icon name="check" size={15} strokeWidth={2.4} />
                  </span>
                  <div>
                    <h4>{e.title}</h4>
                    <p>{e.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="sme-sectors reveal">
              <span className="sme-sectors-label">Sectors we accredit</span>
              <div className="sme-sector-tags">
                {SECTORS.map((s) => (
                  <span className="sme-sector" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Free readiness check */}
      <section className="smerc" id="eligibility">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Free readiness check</span>
            <h2>Is your business ready for accreditation?</h2>
            <p>
              Answer a few quick questions and get an instant, evidence-based readiness score. It
              takes about two minutes, it&rsquo;s confidential, and there&rsquo;s nothing to sign up
              for.
            </p>
          </div>
          <div className="reveal">
            <ReadinessCheck />
          </div>
        </div>
      </section>

      {/* 9. Accredited network + testimonials */}
      <section className="sme-clients" id="clients">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Success stories</span>
            <h2>Be part of our accredited network</h2>
            <p>
              Join a growing community of organizations that have demonstrated readiness and
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
              Apply now <Icon name="arrow" size={14} className="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Gallery */}
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

      {/* 11. Leadership team */}
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

      {/* 12. FAQ */}
      <section className="sme-faq" id="faq">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Frequently asked questions</span>
            <h2>Questions, answered</h2>
            <p>
              Everything you need to know about AAA SME Accreditation: eligibility, timelines,
              validity, and how to get started.
            </p>
          </div>
          <div className="sme-faq-list">
            {FAQ.map((item, index) => (
              <details className="sme-faq-item" key={item.q} open={index === 0}>
                <summary>
                  <span>{item.q}</span>
                  <span className="sme-faq-plus" aria-hidden="true" />
                </summary>
                <div className="sme-faq-a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Contact */}
      <section className="sme-contact" id="contact">
        <span className="sme-contact-corner" />
        <div className="container">
          <div className="sme-contact-layout">
            <div className="sme-contact-info reveal">
              <span className="eyebrow">Get in touch</span>
              <h2>Ready to start your accreditation journey?</h2>
              <p>
                Our team is here to guide you every step of the way. Apply today and get accredited
                in 30 days, or book a free consultation first.
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
