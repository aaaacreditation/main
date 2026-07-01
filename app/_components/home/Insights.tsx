import Link from "next/link";
import Icon from "../Icon";
import { getPublishedPosts } from "@/lib/content";
import { formatDate } from "../../news/posts";

function cleanExcerpt(raw: string) {
  return raw
    .replace(/:\s*:/g, ":")
    .replace(/\s*\[…\]\s*$/, "…")
    .trim();
}

/** Latest three published articles, straight from the CMS. */
export default async function Insights() {
  const posts = (await getPublishedPosts()).slice(0, 3);
  if (posts.length === 0) return null;

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
          {posts.map((p, i) => {
            const cover =
              p.coverImage && !/aaa-accreditation\.org/i.test(p.coverImage) ? p.coverImage : null;
            return (
              <Link
                href={`/news/${p.slug}`}
                className="insight reveal"
                key={p.slug}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="insight-img">
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={cover} alt="" loading="lazy" />
                  ) : (
                    <div className="ph">AAA · News</div>
                  )}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
