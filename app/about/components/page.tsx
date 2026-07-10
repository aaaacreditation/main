import type { Metadata } from "next";
import Link from "next/link";
import Icon from "../../_components/Icon";
import { WorldMapFigure } from "../../_components/WorldMap";
import "./lab.css";

export const metadata: Metadata = {
  title: "About — Component Lab",
  description:
    "Internal design lab: on-brand component and section variations for the AAA About page. Pick the styles you like by label.",
  robots: { index: false, follow: false },
};

/* ---- shared demo data ---- */
const STATS = [
  { num: "57", label: "Countries Served" },
  { num: "200+", label: "Accredited Organizations" },
  { num: "287", label: "Assessors & Experts" },
  { num: "20,162", label: "Accredited Certificates" },
];

const VALUES = [
  { icon: "shield", title: "Integrity", text: "We conduct all our activities with honesty, professionalism, and ethical responsibility." },
  { icon: "scale", title: "Impartiality", text: "Accreditation decisions are made independently and objectively, based solely on evidence." },
  { icon: "check", title: "Competence", text: "We work with qualified assessors and technical experts with relevant sector experience." },
  { icon: "chart", title: "Excellence", text: "We encourage organizations to pursue continual improvement and sustainable quality." },
] as const;

const PROGRAMS = [
  { icon: "book", title: "Training & Education Providers", text: "Supporting educational institutions and training providers in demonstrating excellence." },
  { icon: "medical", title: "Healthcare Organizations", text: "Promoting safer, higher-quality healthcare through internationally recognized standards." },
  { icon: "cert", title: "Conformity Assessment Bodies", text: "Accreditation for certification bodies, inspection bodies, and testing laboratories." },
  { icon: "industry", title: "SMEs", text: "Helping small and medium enterprises strengthen governance, credibility, and readiness." },
] as const;

const NAV = [
  ["palette", "Palette"],
  ["buttons", "Buttons"],
  ["type", "Typography"],
  ["cards", "Cards"],
  ["stats", "Stat Bands"],
  ["heroes", "Heroes"],
  ["mission", "Mission & Vision"],
  ["programs", "Programs"],
  ["map", "Map"],
  ["cta", "CTA"],
];

function Head({ idx, title, desc, id }: { idx: string; title: string; desc?: string; id: string }) {
  return (
    <div className="lab-block-head" id={id}>
      <span className="idx">{idx}</span>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
  );
}

export default function ComponentLab() {
  return (
    <div className="lab">
      {/* ---------------- Hero ---------------- */}
      <header className="lab-hero">
        <div className="lab-container">
          <span className="kick">About Page · Component Lab</span>
          <h1>Pick the look for the About page.</h1>
          <p>
            Every block below is built from the AAA brand system — navy{" "}
            <b style={{ color: "#f4e7c6" }}>#173d73</b> + gold{" "}
            <b style={{ color: "#f4e7c6" }}>#b38a2e</b>, Poppins. Browse the variations,
            note the labels you like (e.g. <b style={{ color: "#f4e7c6" }}>CARD 04</b>,{" "}
            <b style={{ color: "#f4e7c6" }}>HERO B</b>), and I&rsquo;ll assemble the final page from your picks.
          </p>
        </div>
      </header>

      {/* ---------------- Sticky nav ---------------- */}
      <nav className="lab-nav">
        <div className="lab-container lab-nav-inner">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* ---------------- Palette ---------------- */}
      <section className="lab-block">
        <div className="lab-container">
          <Head id="palette" idx="00 — Foundation" title="Brand palette" desc="The full set of tokens every component draws from." />
          <div className="sw-grid">
            {[
              ["Brand Navy", "#173d73"],
              ["Royal Blue", "#244f93"],
              ["Brand Dark", "#061a2c"],
              ["Deep Gradient", "#0b2d50"],
              ["Brand Gold", "#b38a2e"],
              ["Deep Gold", "#8e6b18"],
              ["Pale Gold", "#f4e7c6"],
              ["Blue 50", "#eef4ff"],
            ].map(([name, hex]) => (
              <div className="sw" key={hex}>
                <div className="chip" style={{ background: hex }} />
                <div className="meta">
                  <b>{name}</b>
                  <span>{hex}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Buttons ---------------- */}
      <section className="lab-block alt">
        <div className="lab-container">
          <Head id="buttons" idx="01 — Actions" title="Buttons" desc="Twelve on-brand button treatments, plus sizes and states. Gold gradient is reserved for the single highest-priority CTA per page." />

          <div className="g g-2">
            <div className="spec center">
              <span className="tag">BTN 01 · Primary</span>
              <button className="lb lb-primary">Explore Programs <Icon name="arrow" className="arw" /></button>
            </div>
            <div className="spec center">
              <span className="tag">BTN 02 · Gold CTA</span>
              <button className="lb lb-gold">Get a Quote <Icon name="arrow" className="arw" /></button>
            </div>
            <div className="spec center">
              <span className="tag">BTN 03 · Solid Navy</span>
              <button className="lb lb-solid">Contact AAA</button>
            </div>
            <div className="spec center">
              <span className="tag">BTN 04 · Outline</span>
              <button className="lb lb-outline">Learn More</button>
            </div>
            <div className="spec center">
              <span className="tag">BTN 05 · Soft Tint</span>
              <button className="lb lb-soft">View Documents</button>
            </div>
            <div className="spec center">
              <span className="tag">BTN 06 · Gold Outline</span>
              <button className="lb lb-gold-outline">Apply Now</button>
            </div>
            <div className="spec center">
              <span className="tag">BTN 07 · Pill</span>
              <button className="lb lb-pill">Explore Programs <Icon name="arrow" className="arw" /></button>
            </div>
            <div className="spec center">
              <span className="tag">BTN 08 · Pill Outline</span>
              <button className="lb lb-pill-outline">Read the Standard</button>
            </div>
            <div className="spec center">
              <span className="tag">BTN 09 · Text Link</span>
              <button className="lb lb-link">Learn more <Icon name="arrow" className="arw" /></button>
            </div>
            <div className="spec center">
              <span className="tag">BTN 12 · Icon</span>
              <button className="lb lb-icon" aria-label="Search"><Icon name="search" /></button>
            </div>
            <div className="spec dark center">
              <span className="tag">BTN 10 · Ghost (on dark)</span>
              <button className="lb lb-ghost-light">Contact AAA</button>
            </div>
            <div className="spec dark center">
              <span className="tag">BTN 11 · White (on dark)</span>
              <button className="lb lb-white">Get a Quote <Icon name="arrow" className="arw" /></button>
            </div>
          </div>

          <div className="g g-2" style={{ marginTop: 22 }}>
            <div className="spec">
              <span className="tag">Sizes</span>
              <div className="btn-row">
                <button className="lb lb-primary lb-sm">Small</button>
                <button className="lb lb-primary">Medium</button>
                <button className="lb lb-primary lb-lg">Large</button>
              </div>
            </div>
            <div className="spec">
              <span className="tag">States</span>
              <div className="btn-row">
                <button className="lb lb-primary">Default</button>
                <button className="lb lb-primary is-disabled">Disabled</button>
                <button className="lb lb-outline is-disabled">Disabled</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Typography ---------------- */}
      <section className="lab-block">
        <div className="lab-container">
          <Head id="type" idx="02 — Type" title="Typography & eyebrows" desc="Poppins across the board. The type scale, weights, and five kicker/eyebrow styles you can pair with any section." />

          <div className="stack">
            <div className="spec">
              <span className="tag">TYPE · Scale</span>
              <div className="type-scale">
                <div><span className="lbl">H1 / Hero · 700</span><div className="h1">Inspiring Confidence</div></div>
                <div><span className="lbl">H2 / Section · 600</span><div className="h2">Recognizing Excellence Worldwide</div></div>
                <div><span className="lbl">H3 · 600</span><div className="h3">Independent &amp; Impartial Accreditation</div></div>
                <div><span className="lbl">H4 · 600</span><div className="h4">Evidence-Based Decision-Making</div></div>
                <div><span className="lbl">Body Large · 400</span><div className="body">The American Accreditation Association supports organizations worldwide in demonstrating quality, competence, and continual improvement.</div></div>
                <div><span className="lbl">Small / Caption · 400</span><div className="small">Headquartered in Virginia, USA · Supporting 57 countries</div></div>
              </div>
            </div>

            <div className="g g-2">
              <div className="spec">
                <span className="tag">TYPE · Weights</span>
                <div className="weights">
                  <span className="w3">Aa<small>300 Light</small></span>
                  <span className="w4">Aa<small>400 Regular</small></span>
                  <span className="w5">Aa<small>500 Medium</small></span>
                  <span className="w6">Aa<small>600 SemiBold</small></span>
                  <span className="w7">Aa<small>700 Bold</small></span>
                </div>
              </div>
              <div className="spec">
                <span className="tag">Kickers · K1–K5</span>
                <div className="kv">
                  <span className="k-flag"><i className="rule" /><b>Who We Are</b></span>
                  <span className="k-pill">Our Values</span>
                  <span className="k-bar">Mission &amp; Vision</span>
                  <span className="k-dot">What We Do</span>
                  <span className="k-underline">Why AAA Stands Apart</span>
                </div>
              </div>
            </div>

            <div className="g g-3">
              <div className="spec">
                <span className="tag">HEAD A · Left</span>
                <div className="sh">
                  <span className="k-bar">Our Values</span>
                  <h3>Principles that guide our work</h3>
                  <p>Impartial governance, international expertise, and evidence-based decisions.</p>
                </div>
              </div>
              <div className="spec">
                <span className="tag">HEAD B · Center</span>
                <div className="sh sh--center">
                  <span className="k-flag" style={{ alignItems: "center" }}><i className="rule" /><b>What We Do</b></span>
                  <h3>Accreditation across sectors</h3>
                  <p>Helping organizations demonstrate quality and competence.</p>
                </div>
              </div>
              <div className="spec">
                <span className="tag">HEAD C · Split</span>
                <div className="sh sh--split">
                  <div>
                    <span className="k-pill">Why AAA</span>
                    <h3 style={{ marginBottom: 0 }}>Built on trust</h3>
                  </div>
                  <p className="sh-r">A professional accreditation system combining impartial governance, structured assessment, and independent review.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Cards ---------------- */}
      <section className="lab-block alt">
        <div className="lab-container">
          <Head id="cards" idx="03 — Cards" title="Cards" desc="Twelve card styles for values, programs, stats, quotes, and features. Mix and match — most share the same icon treatment." />

          <div className="g g-3">
            <div className="spec pad-lg">
              <span className="tag">CARD 01 · Icon-top</span>
              <div className="c01">
                <span className="card-ico"><Icon name="shield" /></span>
                <h4>Integrity</h4>
                <p>We conduct all activities with honesty, professionalism, and ethical responsibility.</p>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CARD 02 · Gold top-bar</span>
              <div className="c02">
                <span className="n">01</span>
                <h4>Impartiality</h4>
                <p>Accreditation decisions are made independently and objectively, based on evidence.</p>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CARD 03 · Left border</span>
              <div className="c03">
                <h4><Icon name="check" /> Evidence-Based</h4>
                <p>Every outcome is supported by documented evidence and a structured decision process.</p>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CARD 04 · Icon-ring</span>
              <div className="c04">
                <div className="ring"><Icon name="globe" /></div>
                <h4>Collaboration</h4>
                <p>Effective collaboration with organizations and partners creates lasting value.</p>
              </div>
            </div>
            <div className="spec dark pad-lg">
              <span className="tag">CARD 05 · Glass (dark)</span>
              <div className="c05">
                <span className="card-ico"><Icon name="scale" /></span>
                <h4>Independent Review</h4>
                <p>Objective, evidence-based accreditation decisions, free from conflicts of interest.</p>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CARD 06 · Link + arrow</span>
              <a className="c06" href="#cards">
                <span className="card-ico"><Icon name="medical" /></span>
                <h4>Healthcare</h4>
                <p>Promoting safer, higher-quality healthcare through recognized standards.</p>
                <span className="more">Learn more <Icon name="arrow" /></span>
              </a>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CARD 07 · Ribbon seal</span>
              <div className="c07">
                <span className="ribbon"><Icon name="shield" /></span>
                <h4>Training &amp; Education Providers</h4>
                <div className="rule" />
                <p>Supporting institutions and training providers in demonstrating excellence.</p>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CARD 08 · Stat tile</span>
              <div className="c08">
                <div className="num">57</div>
                <div className="lbl">Countries Served</div>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CARD 09 · Quote</span>
              <div className="c09">
                <div className="mark">&ldquo;</div>
                <blockquote>Accreditation is more than recognition — it is a commitment to quality and continual improvement.</blockquote>
                <div className="by">
                  <span className="av">ED</span>
                  <div><b>Executive Director</b><span>American Accreditation Association</span></div>
                </div>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CARD 10 · Gold feature</span>
              <div className="c10">
                <span className="card-ico"><Icon name="flag" /></span>
                <h4>Our Mission</h4>
                <p>Impartial, credible accreditation that recognizes excellence and strengthens confidence.</p>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CARD 11 · Split side</span>
              <div className="c11">
                <div className="side"><Icon name="cert" /></div>
                <div className="body">
                  <h4>Conformity Assessment</h4>
                  <p>Accreditation for certification bodies, inspection bodies, and testing laboratories.</p>
                </div>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CARD 12 · Minimal</span>
              <div className="c12">
                <div className="top"><span className="n">04</span><Icon name="arrowUpRight" /></div>
                <h4>Continual Improvement</h4>
                <p>Accreditation as a pathway for performance improvement, not only recognition.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Stat bands ---------------- */}
      <section className="lab-block">
        <div className="lab-container">
          <Head id="stats" idx="04 — Metrics" title="Stat bands" desc="Four ways to present the AAA numbers — on light, on navy, gold-accented, or divided columns." />
          <div className="stack">
            <div className="spec">
              <span className="tag">STAT 01 · Inline</span>
              <div className="stat-inline">
                {STATS.map((s) => (<div key={s.label}><strong>{s.num}</strong><span>{s.label}</span></div>))}
              </div>
            </div>
            <div className="spec">
              <span className="tag">STAT 02 · Navy boxes</span>
              <div className="stat-navy">
                {STATS.map((s) => (<div key={s.label}><strong>{s.num}</strong><span>{s.label}</span></div>))}
              </div>
            </div>
            <div className="g g-2">
              <div className="spec">
                <span className="tag">STAT 03 · Gold tiles</span>
                <div className="stat-gold">
                  {STATS.slice(0, 4).map((s) => (<div key={s.label}><strong>{s.num}</strong><span>{s.label}</span></div>))}
                </div>
              </div>
              <div className="spec">
                <span className="tag">STAT 04 · Dividers</span>
                <div className="stat-div">
                  {STATS.map((s) => (<div key={s.label}><strong>{s.num}</strong><div className="u" /><span>{s.label}</span></div>))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Heroes ---------------- */}
      <section className="lab-block alt">
        <div className="lab-container">
          <Head id="heroes" idx="05 — Heroes" title="Hero variations" desc="Three page-opening treatments. A and B are dark and bold; C is a lighter editorial option." />
          <div className="stack">
            <div className="spec pad-lg">
              <span className="tag">HERO A · Split + panel</span>
              <div className="hero-demo heroA">
                <div className="in">
                  <span className="eyebrow">About AAA</span>
                  <h3>About the American Accreditation Association</h3>
                  <p>Independent accreditation services across multiple sectors, supporting organizations in 57 countries.</p>
                  <div className="acts">
                    <button className="lb lb-gold">Explore Programs <Icon name="arrow" className="arw" /></button>
                    <button className="lb lb-ghost-light">Contact AAA</button>
                  </div>
                </div>
                <div className="panel">
                  <div className="mini">
                    {STATS.map((s) => (<div key={s.label}><strong>{s.num}</strong><span>{s.label}</span></div>))}
                  </div>
                </div>
              </div>
            </div>

            <div className="spec pad-lg">
              <span className="tag">HERO B · Centered + strip</span>
              <div className="hero-demo heroB">
                <span className="eyebrow">Inspiring Confidence · Recognizing Excellence</span>
                <h3>Independent accreditation, trusted worldwide</h3>
                <p>The American Accreditation Association supports organizations in demonstrating quality, competence, and continual improvement.</p>
                <div className="acts">
                  <button className="lb lb-gold">Explore Programs <Icon name="arrow" className="arw" /></button>
                  <button className="lb lb-ghost-light">Get a Quote</button>
                </div>
                <div className="strip">
                  {STATS.map((s) => (<div key={s.label}><strong>{s.num}</strong><span>{s.label}</span></div>))}
                </div>
              </div>
            </div>

            <div className="spec pad-lg">
              <span className="tag">HERO C · Editorial + seal</span>
              <div className="hero-demo heroC">
                <div>
                  <span className="eyebrow">About AAA</span>
                  <h3>Building confidence through accreditation</h3>
                  <p>Headquartered in Virginia, USA, AAA delivers accreditation through an international network of assessors and technical experts.</p>
                  <div className="acts">
                    <button className="lb lb-primary">Explore Programs <Icon name="arrow" className="arw" /></button>
                    <button className="lb lb-outline">Contact AAA</button>
                  </div>
                </div>
                <div className="seal">
                  <div className="badge"><b>57</b><span>Countries</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Mission & Vision ---------------- */}
      <section className="lab-block">
        <div className="lab-container">
          <Head id="mission" idx="06 — Purpose" title="Mission &amp; Vision" desc="Three layouts for the purpose-and-direction section." />
          <div className="stack">
            <div className="spec pad-lg">
              <span className="tag">MV A · Two cards</span>
              <div className="mvA">
                <div className="card">
                  <span className="card-ico"><Icon name="flag" /></span>
                  <div className="lead">Our Mission</div>
                  <h4>Inspiring Confidence Through Quality</h4>
                  <p>To provide impartial, credible accreditation that recognizes excellence and promotes continual improvement worldwide.</p>
                </div>
                <div className="card">
                  <span className="card-ico"><Icon name="globe" /></span>
                  <div className="lead">Our Vision</div>
                  <h4>Excellence Through Accreditation</h4>
                  <p>To be recognized as a leading international accreditation organization that inspires confidence and advances quality.</p>
                </div>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">MV B · Navy / Gold panels</span>
              <div className="mvB">
                <div className="p navy">
                  <span className="ico"><Icon name="flag" /></span>
                  <h4>Our Mission</h4>
                  <p>To provide impartial and credible accreditation services that recognize excellence and strengthen confidence in organizations worldwide.</p>
                </div>
                <div className="p gold">
                  <span className="ico"><Icon name="globe" /></span>
                  <h4>Our Vision</h4>
                  <p>To be recognized as a leading international accreditation organization advancing quality, competence, and continual improvement.</p>
                </div>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">MV C · Editorial rows</span>
              <div className="mvC">
                <div className="row">
                  <span className="card-ico"><Icon name="flag" /></span>
                  <div><h4>Our Mission</h4><p>Impartial, credible accreditation that recognizes excellence and promotes continual improvement.</p></div>
                </div>
                <div className="row v">
                  <span className="card-ico"><Icon name="globe" /></span>
                  <div><h4>Our Vision</h4><p>A leading international accreditation organization that inspires confidence and advances quality.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Programs ---------------- */}
      <section className="lab-block alt">
        <div className="lab-container">
          <Head id="programs" idx="07 — Sectors" title="Programs / What we do" desc="Three ways to present the four accreditation sectors." />
          <div className="stack">
            <div className="spec pad-lg">
              <span className="tag">PROG A · 4-up feature</span>
              <div className="pA">
                {PROGRAMS.map((p) => (
                  <div className="card" key={p.title}>
                    <span className="card-ico"><Icon name={p.icon} /></span>
                    <h4>{p.title}</h4>
                    <p>{p.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">PROG B · List + dividers</span>
              <div className="pB">
                {PROGRAMS.map((p) => (
                  <div className="row" key={p.title}>
                    <span className="card-ico"><Icon name={p.icon} /></span>
                    <div className="txt"><h4>{p.title}</h4><p>{p.text}</p></div>
                    <span className="go"><Icon name="arrow" /></span>
                  </div>
                ))}
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">PROG C · Numbered</span>
              <div className="pC">
                {PROGRAMS.map((p, i) => (
                  <div className="card" key={p.title}>
                    <span className="idx">{String(i + 1).padStart(2, "0")}</span>
                    <div><h4>{p.title}</h4><p>{p.text}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Map ---------------- */}
      <section className="lab-block">
        <div className="lab-container">
          <Head id="map" idx="08 — Global reach" title="World map frames" desc="Same interactive map (kept as-is), presented three different ways." />
          <div className="stack">
            <div className="spec pad-lg">
              <span className="tag">MAP A · Card + stat rail</span>
              <div className="mapA">
                <div className="rail">
                  <h4>Supporting Organizations Worldwide</h4>
                  <p>AAA&rsquo;s global presence reflects its commitment across countries, sectors, and professional environments.</p>
                  {STATS.slice(0, 3).map((s) => (
                    <div className="st" key={s.label}><strong>{s.num}</strong><span>{s.label}</span></div>
                  ))}
                </div>
                <div className="fig"><WorldMapFigure showLegend={false} /></div>
              </div>
            </div>
            <div className="spec dark pad-lg">
              <span className="tag">MAP B · Dark band</span>
              <div className="mapB">
                <span className="eyebrow">Global Reach</span>
                <h4>Countries We Operate</h4>
                <p>Highlighting the countries where AAA has an accredited presence across five continents.</p>
                <div className="fig"><WorldMapFigure showLegend /></div>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">MAP C · Split + framed</span>
              <div className="mapC">
                <div className="copy">
                  <span className="k-bar">Global Reach</span>
                  <h4>A presence across 57 countries</h4>
                  <p>AAA works with organizations and experts across different sectors, regions, and professional environments.</p>
                  <div className="mini">
                    {STATS.slice(0, 2).map((s) => (
                      <div key={s.label}><strong>{s.num}</strong><span>{s.label}</span></div>
                    ))}
                  </div>
                </div>
                <div className="fig"><WorldMapFigure showLegend={false} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="lab-block alt">
        <div className="lab-container">
          <Head id="cta" idx="09 — Conversion" title="CTA bands" desc="Three closing calls-to-action: bold navy, gold statement, or lighter boxed." />
          <div className="stack">
            <div className="spec pad-lg">
              <span className="tag">CTA A · Navy band</span>
              <div className="ctaA">
                <div className="in">
                  <h4>Building Trust. Inspiring Confidence. Recognizing Excellence.</h4>
                  <p>Join organizations across 57 countries that have chosen AAA as their accreditation partner.</p>
                  <div className="acts">
                    <button className="lb lb-gold">Explore Programs <Icon name="arrow" className="arw" /></button>
                    <button className="lb lb-ghost-light">Get a Quote</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CTA B · Gold statement</span>
              <div className="ctaB">
                <div>
                  <h4>Ready to begin your accreditation journey?</h4>
                  <p>Talk to our team about the right program for your organization.</p>
                </div>
                <div className="acts">
                  <button className="lb lb-white">Get a Quote <Icon name="arrow" className="arw" /></button>
                </div>
              </div>
            </div>
            <div className="spec pad-lg">
              <span className="tag">CTA C · Boxed light</span>
              <div className="ctaC">
                <div>
                  <span className="k-bar">Get Started</span>
                  <h4>Explore AAA accreditation programs</h4>
                  <p>Independent, internationally recognized accreditation across multiple sectors.</p>
                </div>
                <div className="acts">
                  <button className="lb lb-primary">Explore Programs <Icon name="arrow" className="arw" /></button>
                  <button className="lb lb-outline">Contact AAA</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="lab-foot">
        <div className="lab-container">
          Tell me which labels you want — e.g. <b>HERO B</b>, <b>CARD 04 + 07</b>, <b>STAT 02</b>, <b>MAP C</b>, <b>CTA A</b> — and I&rsquo;ll build the final About page from your selection.
        </div>
      </footer>
    </div>
  );
}
