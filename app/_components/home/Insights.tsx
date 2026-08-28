import Link from "next/link";
import { getPublishedPosts } from "@/lib/content";
import { formatDate } from "../../news/posts";

function cleanExcerpt(raw: string) {
  return raw
    .replace(/:\s*:/g, ":")
    .replace(/\s*\[…\]\s*$/, "…")
    .trim();
}

/**
 * Latest three published articles, straight from the CMS. Cover images come
 * from the migrated WordPress library; anything still pointing at the legacy
 * domain is replaced with a branded placeholder.
 */
export default async function Insights() {
  const posts = (await getPublishedPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <div className="hx-news">
      {posts.map((p, i) => {
        const cover =
          p.coverImage && !/aaa-accreditation\.org/i.test(p.coverImage) ? p.coverImage : null;
        return (
          <Link
            href={`/news/${p.slug}`}
            className="hx-news-card reveal"
            key={p.slug}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="hx-news-img">
              {cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={cover} alt="" loading="lazy" />
              ) : (
                <div className="ph">AAA · News</div>
              )}
            </div>
            <div className="hx-news-body">
              <span className="hx-news-cat">News &amp; events</span>
              <h3>{p.title}</h3>
              <p>{cleanExcerpt(p.excerpt)}</p>
              <div className="hx-news-meta">{formatDate(p.date)}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
