import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";

export const metadata: Metadata = { title: "AAA News & Insights" };

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
  {
    cat: "Programs",
    title: "Personnel certification under ISO/IEC 17024 — common findings",
    excerpt: "An analysis of the most frequent nonconformities raised during personnel certification audits.",
    date: "Feb 28, 2026",
    read: "9 min read",
    ph: "Editorial · Personnel",
  },
  {
    cat: "Inspection",
    title: "Independent inspection bodies: scope drift and how to prevent it",
    excerpt: "Notes for technical managers operating under ISO/IEC 17020 across multiple sectors.",
    date: "Feb 10, 2026",
    read: "7 min read",
    ph: "Editorial · Inspection",
  },
  {
    cat: "Recognition",
    title: "AAA expands recognition partnerships in Southeast Asia",
    excerpt: "Two new memoranda extend mutual recognition for testing and inspection bodies.",
    date: "Jan 15, 2026",
    read: "5 min read",
    ph: "Editorial · Recognition",
  },
];

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="AAA News (Insights)"
        title={<>Editorial coverage of <em>the standards we work with.</em></>}
        intro="Field notes, policy updates, and technical guidance from AAA assessors and program managers."
        crumbs={[{ label: "Insights" }]}
      />
      <section className="block">
        <div className="container">
          <div className="insights-grid">
            {ARTICLES.map((a, i) => (
              <article
                className="insight reveal"
                key={a.title}
                style={{ transitionDelay: `${i * 60}ms` }}
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
                <Link href="#" className="ed-link" style={{ marginTop: 4 }}>Read article</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
