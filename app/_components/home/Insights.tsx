import Link from "next/link";
import Icon from "../Icon";

const ARTICLES = [
  {
    cat: "Standards",
    title: "What ISO/IEC 17025:2017 means for testing laboratories in 2026",
    excerpt:
      "A field guide to scope extension, decision rules, and impartiality risk in modern lab accreditation.",
    date: "Apr 18, 2026",
    read: "8 min read",
    ph: "Editorial · Laboratory",
  },
  {
    cat: "Healthcare",
    title: "Patient-safety outcomes after ISO 15189 accreditation: a 5-year review",
    excerpt:
      "Findings from 320 accredited medical laboratories across the GCC, Africa, and Southeast Asia.",
    date: "Apr 02, 2026",
    read: "12 min read",
    ph: "Editorial · Hospital",
  },
  {
    cat: "Policy",
    title: "AAA publishes 2026 Impartiality Safeguarding Framework",
    excerpt: "An updated public policy separating accreditation decisions from commercial relationships.",
    date: "Mar 21, 2026",
    read: "6 min read",
    ph: "Editorial · Policy",
  },
];

export default function Insights() {
  return (
    <section className="block" id="insights">
      <div className="container">
        <div className="block-head reveal">
          <div>
            <span className="eyebrow">Insights</span>
            <h2 className="section-heading">Editorial coverage of the standards we work with.</h2>
          </div>
          <Link href="/news" className="ed-link" style={{ alignSelf: "end" }}>
            View all insights <Icon name="arrow" size={14} className="arrow" />
          </Link>
        </div>

        <div className="insights-grid">
          {ARTICLES.map((a, i) => (
            <article
              className="insight reveal"
              key={a.title}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="insight-img">
                <div className="ph">{a.ph}</div>
              </div>
              <div className="insight-cat">{a.cat}</div>
              <h4>{a.title}</h4>
              <p>{a.excerpt}</p>
              <div className="insight-meta">
                <span>{a.date}</span>
                <span className="sep" />
                <span>{a.read}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
