import type { Metadata } from "next";
import Link from "next/link";
import Icon, { type IconName } from "../../_components/Icon";
import PageHero from "../../_components/PageHero";
import ReadinessCheck from "./ReadinessCheck";

export const metadata: Metadata = {
  title: "SME Funding Readiness Accreditation",
  description:
    "AAA SME Accreditation is an international accreditation that turns your operational and financial health into a lender-readable funding-readiness score, recognized across 53+ countries. Check your readiness for free.",
};

const CONSULT = "https://calendly.com/aaa-accreditation/30min";

const FUNDING_GAP = [
  {
    num: "$5.7T",
    label: "The annual finance gap facing small and medium businesses in emerging markets.",
  },
  {
    num: "40%+",
    label: "Of formal small and medium businesses can't get the financing they need.",
  },
  {
    num: "90%",
    label: "Of all businesses worldwide are SMEs, together driving half of global GDP.",
  },
];

const PAIN: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "chart",
    title: "No standard signal",
    text: "Lenders have no easy way to read a business that keeps informal records. There's no common measure that simply says: this one's ready.",
  },
  {
    icon: "search",
    title: "A slow, closed process",
    text: "Loan decisions can drag on for three to six months. They often come down to who you know, and a first-time borrower has nothing to point back to.",
  },
  {
    icon: "clipboard",
    title: "One size fits all",
    text: "Most ratings are just pass or fail. Plenty of first-time applicants don't make the cut, and they're left with no real way to improve and try again.",
  },
  {
    icon: "industry",
    title: "Sector blindness",
    text: "A generalist lender rarely gets the real risks in farming, exports, tech, or manufacturing. Genuine strengths get missed, and good businesses get turned away.",
  },
];

const WHO_FOR = [
  "SMEs seeking funding or investment",
  "Businesses planning growth or market expansion",
  "Organisations pursuing contracts that require demonstrated standards",
  "Companies strengthening credibility with customers and stakeholders",
  "Leaders building a stronger, more resilient business",
];

const CATEGORIES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "chart",
    title: "Financial & Funding Readiness",
    text: "Your financial records, awareness of obligations and liabilities, what funding you need and why, and how you track cash flow and sustainability.",
  },
  {
    icon: "industry",
    title: "Operational Requirements",
    text: "Active operations and delivery, documented processes, enough resources to do the work, and clear communication with clients and stakeholders.",
  },
  {
    icon: "clipboard",
    title: "Management & Structure",
    text: "Legal registration, a defined organisational structure, and clear ownership and management responsibilities.",
  },
  {
    icon: "shield",
    title: "Governance & Compliance",
    text: "Ethical operations, managing business risk, meeting legal and regulatory rules, and being transparent about who you are.",
  },
  {
    icon: "globe",
    title: "Market Presence & Growth",
    text: "A clear offer and target market, real customer activity, growth plans, and listening to customer feedback.",
  },
  {
    icon: "arrowUpRight",
    title: "Continuous Improvement",
    text: "Spotting what to improve, acting on feedback, fixing issues, and keeping a record of the changes you make.",
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
    text: "The score gives lenders the structured evidence they look for, in a way banks and investors already understand.",
  },
  {
    icon: "arrowUpRight",
    title: "Faster funding access",
    text: "Walk into funding conversations with verified credibility and fewer rejections.",
  },
];

const BENEFIT_GROUPS: { icon: IconName; title: string; items: string[] }[] = [
  {
    icon: "chart",
    title: "Funding & Finance",
    items: [
      "Funding readiness",
      "Greater lender confidence",
      "Funding & credit support",
      "Access to financial partners",
      "Government scheme support",
      "Investor readiness",
      "Better financial documentation",
      "Reduced funding rejection risk",
      "Faster credit assessment",
    ],
  },
  {
    icon: "shield",
    title: "Trust & Credibility",
    items: [
      "Verified credibility",
      "Customer & partner trust",
      "Global recognition",
      "Competitive advantage",
      "Accreditation mark usage",
      "Public directory listing",
      "Independent third-party validation",
      "Enhanced business reputation",
    ],
  },
  {
    icon: "cert",
    title: "Business Excellence",
    items: [
      "Stronger governance",
      "Operational excellence",
      "Process improvement",
      "Risk management",
      "Compliance readiness",
      "Better decision-making",
      "Training & capability building",
      "Mentorship & expert guidance",
      "Continuous growth roadmap",
    ],
  },
  {
    icon: "arrowUpRight",
    title: "Growth & Market Opportunities",
    items: [
      "Networking & business connections",
      "Market access opportunities",
      "Export & international readiness",
      "Increased market visibility",
      "B2B partnerships",
      "Investor engagement opportunities",
      "Strategic collaborations",
      "ESG readiness support",
      "Expansion support",
    ],
  },
];

const PROCESS = [
  { title: "Application", text: "Send your accreditation application to AAA with your business details and the level you're aiming for." },
  { title: "Documents", text: "Share the evidence we review: business registration, financial records, operational documents, and governance details." },
  { title: "Assessment", text: "AAA assessors evaluate your submission through document review, interviews, and verification of your operations." },
  { title: "Feedback", text: "If anything needs strengthening, our assessors tell you what to address, so you can act on it before any decision is made." },
  { title: "Decision", text: "The AAA accreditation committee reviews your assessment and makes the accreditation decision." },
  { title: "Certificate", text: "Your accreditation certificate is issued, valid for three years, with a digital verification badge." },
];

const ELIGIBILITY = [
  { title: "Registered SMEs", text: "Small and medium businesses with valid registration." },
  { title: "Funding-seeking businesses", text: "SMEs getting ready for loans, working capital, or investor funding." },
  { title: "First-time borrowers", text: "Businesses with no credit track record yet who need a credible place to start." },
  { title: "Exporters & growth firms", text: "Companies that need recognised credibility to trade across borders." },
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
  "Monarch Master Injectors",
  "Adya Pain Management",
  "Clarivate",
  "Global Medical City Hospital, Egypt",
  "Caribbean Cancer Research Institute, Trinidad & Tobago",
  "Rocklin International School, Malaysia",
  "World Academy for Research and Development, UK",
  "American College of Teachers and Trainers, USA",
  "Lazarus Alliance, USA",
  "International Science and Technology University, Poland",
  "KCertification, Brazil",
];

const FAQ = [
  {
    q: "What is AAA SME accreditation?",
    a: "AAA SME Accreditation is a program for small and medium businesses that assesses how well your business is run and how prepared it is to grow. It helps you show credibility, build trust, and earn independent recognition for good business practices.",
  },
  {
    q: "What makes AAA different from other accreditation bodies?",
    a: "AAA focuses on business readiness, governance, and growth. Through an independent assessment, your business earns recognition based on established criteria that align with recognised accreditation principles.",
  },
  {
    q: "Who can apply for AAA SME accreditation?",
    a: "Any eligible small or medium enterprise can apply, across a wide range of industries. Whether you are well established or still growing, you can apply as long as you meet the mandatory accreditation requirements.",
  },
  {
    q: "How is funding readiness assessed?",
    a: "Your business is assessed across six areas: Financial & Funding Readiness, Operational Requirements, Management & Structure, Governance & Compliance, Market Presence & Growth, and Continuous Improvement. Together they show how prepared you are for funding, partnerships, and steady growth.",
  },
  {
    q: "How do I check whether my business is eligible?",
    a: "You can use the free Readiness Check above. It takes a couple of minutes and gives you an instant view of where your business stands and what to work on before you apply.",
  },
  {
    q: "How long does the accreditation process take?",
    a: "It depends on your business size, how ready you are, and the information you provide. Most assessments take typically 30 to 60 days, following a clear process of application, review, and decision.",
  },
  {
    q: "Can startups apply for accreditation?",
    a: "Yes. A startup can apply as long as it is actively operating and can show sound business practices, governance, and operational controls. Accreditation is open to SMEs at different stages, provided the business is genuinely up and running.",
  },
  {
    q: "How long is the accreditation valid?",
    a: "Your accreditation is valid for three years, as long as you continue to meet the required standards.",
  },
  {
    q: "How much does AAA SME accreditation cost?",
    a: "Cost depends on the size, complexity, and scope of the assessment. AAA gives each business a customised quote so the process fits its specific needs.",
  },
  {
    q: "How do I get started?",
    a: "Getting started is simple. Run the free Readiness Check above, or contact AAA directly. Our team will walk you through the eligibility requirements, what to expect from the assessment, and your next steps.",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="SME Funding Readiness Program"
        title={
          <>
            Build Trust. Improve <em>Funding Readiness</em>. Grow Your Business.
          </>
        }
        intro="The American Accreditation Association's funding readiness program turns the operational and financial health of your SME into a funding-readiness score that lenders can read, recognized internationally across 53+ countries."
        crumbs={[{ href: "/programs/healthcare", label: "Programs" }, { label: "SME Funding Readiness" }]}
        meta={[
          { k: "Recognition", v: "53+ countries" },
          { k: "Readiness check", v: "Free · 2 minutes" },
        ]}
      />

      {/* The funding gap (global) */}
      <section className="sme-stats" id="why">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Why accreditation matters</span>
            <h2>The funding gap is real, and bigger than most people think</h2>
            <p>
              Across the world, strong businesses are turned away from funding
              every day. The numbers behind the gap are striking.
            </p>
          </div>
          <div className="sme-stats-grid">
            {FUNDING_GAP.map((s, i) => (
              <div className="sme-stat reveal" key={s.num} style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="sme-stat-num">{s.num}</span>
                <span className="sme-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="sme-stats-note reveal">
            These businesses are not short on potential. They just can&rsquo;t show
            lenders what they need to see. That is the gap we help close.
          </p>
        </div>
      </section>

      {/* Why SMEs struggle */}
      <section className="sme-pain">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">The problem</span>
            <h2>Why so many SMEs struggle to get funding</h2>
            <p>
              For most small and medium businesses, the problem isn&rsquo;t money
              to lend. It&rsquo;s that they can&rsquo;t show their strength in a way
              a lender recognises. A good business with informal records still looks
              risky on paper, and that is what holds the funding back &mdash; almost
              anywhere you go.
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

      {/* What is AAA SME Accreditation? (dark band) */}
      <section className="sme-global" id="about">
        <div className="container">
          <div className="sme-global-layout">
            <div className="sme-global-text reveal">
              <span className="eyebrow">About the program</span>
              <h2>What is AAA SME Accreditation?</h2>
              <p>
                AAA SME Accreditation is an international accreditation for SMEs
                that independently assesses key areas of business performance,
                governance, financial readiness, and operational effectiveness.
              </p>
              <p>
                It gives your business an objective, third-party view of how it is
                run &mdash; and a credential that lenders, investors, partners, and
                customers can trust.
              </p>
            </div>
            <aside className="sme-isqua reveal">
              <h4 className="sme-about-cardh">Who it&rsquo;s for</h4>
              <ul className="sme-wholist">
                {WHO_FOR.map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      {/* 6 core assessment categories */}
      <section className="sme-cats" id="framework">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">AAA SME accreditation framework</span>
            <h2>Six things we assess, the same six lenders care about</h2>
            <p>
              Your business is scored across six weighted areas. Together they make
              up your funding-readiness score, and they line up closely with what a
              lender or investor looks at before they say yes.
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

      {/* How accreditation supports funding readiness (flow) */}
      <section className="sme-flow" id="funding">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">How it works for funding</span>
            <h2>How accreditation supports funding readiness</h2>
            <p>
              AAA turns your everyday business health into a structured,
              lender-readable signal. It changes the conversation from &ldquo;we
              can&rsquo;t assess you&rdquo; into &ldquo;you&rsquo;re
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

      {/* Business benefits (grouped) */}
      <section className="sme-benefits" id="benefits">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Business benefits</span>
            <h2>What accreditation unlocks for your business</h2>
            <p>
              Accreditation does more than hand you a certificate. It strengthens
              every conversation you have with lenders, investors, partners, and
              customers.
            </p>
          </div>
          <div className="sme-bgroup-grid">
            {BENEFIT_GROUPS.map((g, i) => (
              <article className="sme-bgroup reveal" key={g.title} style={{ transitionDelay: `${i * 55}ms` }}>
                <div className="sme-bgroup-ico">
                  <Icon name={g.icon} size={22} />
                </div>
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA band */}
      <section className="sme-band" id="apply">
        <span className="sme-band-corner" />
        <div className="container">
          <div className="sme-band-inner reveal">
            <div>
              <span className="eyebrow">Get started</span>
              <h2>Ready to become funding-ready?</h2>
              <p>
                Start your AAA SME Accreditation today, or book a free 30-minute
                consultation with our team to see where your business stands.
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

      {/* Process */}
      <section className="sme-process" id="process">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Accreditation process</span>
            <h2>How it works, step by step</h2>
            <p>A clear six-step process that takes your business from application to a recognised credential.</p>
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

      {/* Who can apply (dark) */}
      <section className="sme-who" id="who">
        <div className="container">
          <div className="sme-head light reveal">
            <span className="eyebrow">Who can apply</span>
            <h2>Built for every growing SME</h2>
            <p>
              If you run a registered, working business that wants more credibility
              and access to funding, AAA SME Accreditation is for you &mdash;
              wherever you are in the world.
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
                  <span className="sme-sector" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free readiness check (interactive) */}
      <section className="smerc" id="readiness">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Free readiness check</span>
            <h2>Check your funding readiness in two minutes</h2>
            <p>
              Answer twelve quick questions across the six areas we assess.
              You&rsquo;ll get an instant readiness score and see exactly where your
              business stands. No sign-up, no obligation.
            </p>
          </div>
          <div className="reveal">
            <ReadinessCheck />
          </div>
        </div>
      </section>

      {/* Accredited worldwide */}
      <section className="sme-clients" id="accredited">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Accredited worldwide</span>
            <h2>Organisations accredited by AAA around the world</h2>
            <p>
              From clinics and hospitals to universities, schools, and professional
              firms, organisations across more than 53 countries hold AAA
              accreditation.
            </p>
          </div>
          <div className="sme-orgstrip reveal">
            {ORGS.map((o) => (
              <span className="sme-orgchip" key={o}>{o}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sme-faq" id="faq">
        <div className="container">
          <div className="sme-head reveal">
            <span className="eyebrow">Frequently asked questions</span>
            <h2>Questions, answered</h2>
            <p>
              Everything you need to know about AAA SME Accreditation: eligibility,
              timelines, validity, and how to get started.
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

      {/* Contact (closing) */}
      <section className="sme-contact" id="contact">
        <span className="sme-contact-corner" />
        <div className="container">
          <div className="sme-contact-layout">
            <div className="sme-contact-info reveal">
              <span className="eyebrow">Get in touch</span>
              <h2>Ready to start your accreditation journey?</h2>
              <p>
                Our team is here to guide you every step of the way. Apply today and
                get accredited, or book a free consultation first.
              </p>
              <a href={CONSULT} target="_blank" rel="noopener noreferrer" className="sme-consult">
                <span className="sme-consult-ico"><Icon name="cert" size={22} /></span>
                <span>
                  <strong>Book a free 30-minute consultation</strong>
                  <em>Talk to an accreditation specialist. No obligation.</em>
                </span>
                <Icon name="arrow" size={16} className="arrow" />
              </a>
            </div>

            <div className="sme-contact-details reveal">
              <a className="sme-contact-item" href="mailto:sme@aaa-accreditation.org">
                <span className="ico"><Icon name="mail" size={18} /></span>
                <span><strong>Email us</strong>sme@aaa-accreditation.org</span>
              </a>
              <div className="sme-contact-item">
                <span className="ico"><Icon name="phone" size={18} /></span>
                <span><strong>Call us</strong>+1 (571) 601 2616</span>
              </div>
              <a className="sme-contact-item" href="https://wa.me/447487550737" target="_blank" rel="noopener noreferrer">
                <span className="ico"><Icon name="phone" size={18} /></span>
                <span><strong>International / WhatsApp</strong>+44 (748) 755 0737</span>
              </a>
              <div className="sme-contact-item">
                <span className="ico"><Icon name="pin" size={18} /></span>
                <span><strong>Visit us</strong>8609 Westwood Center Drive, Tysons Corner, VA 22182, USA</span>
              </div>
              <Link href="/quote" className="btn btn-gold sme-contact-cta">
                Request a Quote <Icon name="arrow" size={14} className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
