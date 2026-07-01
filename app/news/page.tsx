import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "../_components/PageHero";
import CTA from "../_components/CTA";
import { formatDate } from "./posts";
import { getPublishedPosts, type PublicPost } from "@/lib/content";

export const metadata: Metadata = { title: "AAA News & Events" };
export const revalidate = 300;

const RECENT_COUNT = 12;

export default async function Page() {
  const posts = await getPublishedPosts();
  const recent = posts.slice(0, RECENT_COUNT);
  const archive = posts.slice(RECENT_COUNT);

  // posts are sorted newest-first, so years come out in descending order.
  const byYear = new Map<string, PublicPost[]>();
  for (const p of archive) {
    const year = p.date.slice(0, 4);
    const group = byYear.get(year);
    if (group) group.push(p);
    else byYear.set(year, [p]);
  }

  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="AAA News"
        title={
          <>
            News &amp; events from <em>the accreditation community.</em>
          </>
        }
        intro="Accreditation announcements, milestones, and guidance from the American Accreditation Association."
        crumbs={[{ label: "AAA News" }]}
        meta={[
          { k: "Articles", v: String(posts.length) },
          { k: "Latest", v: posts.length ? formatDate(posts[0].date) : "—" },
        ]}
      />

      <section className="block">
        <div className="container">
          <div className="block-head reveal">
            <div>
              <span className="eyebrow">Latest</span>
              <h2>Recent announcements.</h2>
            </div>
            <p className="lede-side">
              Newly accredited organizations, recognitions and editorial
              insights from the AAA newsroom.
            </p>
          </div>
          <div className="insights-grid">
            {recent.map((p, i) => (
              <Link
                href={`/news/${p.slug}`}
                className="insight reveal"
                key={p.slug}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="insight-img">
                  <div className="ph">News · {p.date.slice(0, 4)}</div>
                </div>
                <div className="insight-cat">{formatDate(p.date)}</div>
                <h4>{p.title}</h4>
                <p>{p.excerpt}</p>
                <span className="ed-link" style={{ marginTop: 4 }}>
                  Read article
                  <span className="arrow" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block alt">
        <div className="container">
          <div className="block-head reveal">
            <div>
              <span className="eyebrow">Archive</span>
              <h2>Earlier news, by year.</h2>
            </div>
            <p className="lede-side">
              {archive.length} more articles migrated from the AAA newsroom.
            </p>
          </div>

          {[...byYear.entries()].map(([year, items]) => (
            <div key={year} style={{ marginTop: 44 }}>
              <div className="insight-cat" style={{ marginBottom: 18 }}>
                {year} · {items.length} {items.length === 1 ? "article" : "articles"}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "16px 40px",
                }}
              >
                {items.map((p) => (
                  <li
                    key={p.slug}
                    style={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    <Link href={`/news/${p.slug}`} className="ed-link">
                      {p.title}
                    </Link>
                    <span className="insight-meta" style={{ marginTop: 0 }}>
                      {formatDate(p.date)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
