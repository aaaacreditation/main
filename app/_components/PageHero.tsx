import Link from "next/link";
import SealRosette from "./SealRosette";

export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  meta,
  image,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: { href?: string; label: string }[];
  meta?: { k: string; v: string }[];
  image?: string;
}) {
  return (
    <section className={"about-hero" + (image ? " has-image" : "")}>
      {image && (
        <div
          className="about-hero-bg"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
      )}
      <SealRosette spin={!!image} />
      <div className="container">
        <div className="crumbs">
          <Link href="/">Home</Link>
          {crumbs?.map((c, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span className="sep" />
              {c.href ? (
                <Link href={c.href}>{c.label}</Link>
              ) : (
                <span className="current">{c.label}</span>
              )}
            </span>
          ))}
        </div>

        <div className="about-hero-grid">
          <div className="reveal">
            <span className="eyebrow">{eyebrow}</span>
            <h1>{title}</h1>
          </div>

          {(intro || meta) && (
            <div className="about-hero-side reveal">
              {intro && <p>{intro}</p>}
              {meta && (
                <div className="about-hero-meta">
                  {meta.map((m) => (
                    <div className="cell" key={m.k}>
                      <div className="k">{m.k}</div>
                      <div className="v">{m.v}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
