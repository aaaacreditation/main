import Link from "next/link";
import Icon from "../Icon";
import posts from "../../news/posts-data.json";

type Post = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(iso: string) {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${d}, ${y}`;
}

function cleanExcerpt(raw: string) {
  return raw
    .replace(/:\s*:/g, ":")
    .replace(/\s*\[…\]\s*$/, "…")
    .trim();
}

const LATEST: Post[] = [...(posts as Post[])]
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, 3);

export default function Insights() {
  return (
    <section className="block" id="insights">
      <div className="container">
        <div className="block-head reveal">
          <div>
            <span className="eyebrow">AAA News</span>
            <h2 className="section-heading">News &amp; events from the accreditation community.</h2>
          </div>
          <Link href="/news" className="ed-link" style={{ alignSelf: "end" }}>
            View all news <Icon name="arrow" size={14} className="arrow" />
          </Link>
        </div>

        <div className="insights-grid">
          {LATEST.map((p, i) => (
            <Link
              href={`/news/${p.slug}`}
              className="insight reveal"
              key={p.slug}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="insight-img">
                <div className="ph">AAA · News</div>
              </div>
              <div className="insight-cat">News &amp; Events</div>
              <h4>{p.title}</h4>
              <p>{cleanExcerpt(p.excerpt)}</p>
              <div className="insight-meta">
                <span>{formatDate(p.date)}</span>
                <span className="sep" />
                <span>AAA News</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
