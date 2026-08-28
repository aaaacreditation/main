import Link from "next/link";
import Image from "next/image";

/**
 * Shared inner-page hero.
 *
 * Aug 2026: re-skinned onto the `.ax-*` design system (app/aaa-ds.css) so every
 * inner page carries the same navy/gold editorial language as the two
 * client-approved reference pages (/programs/iso-17021 and
 * /programs/smes-accreditation-program). The prop API is unchanged — ~25 pages
 * render through this component.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  meta,
  image,
  accent = "gold",
  badge,
  actions,
  caption,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: { href?: string; label: string }[];
  meta?: { k: string; v: string }[];
  image?: string;
  /** `red` swaps the hero wash to the flag-red accent — use only where urgency is the story. */
  accent?: "gold" | "red";
  /** Optional pill above the h1. Defaults to the eyebrow text. */
  badge?: string;
  actions?: React.ReactNode;
  caption?: { kicker: string; title: string; chip?: string };
}) {
  const hasVisual = Boolean(image);

  return (
    <section className={"ax-hero" + (accent === "red" ? " red" : "")}>
      <div className="container">
        <div className={"ax-hero-grid" + (hasVisual ? "" : " solo")}>
          <div className="ax-hero-copy">
            <nav className="ax-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              {crumbs?.map((c, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <span aria-hidden="true">/</span>
                  {c.href ? <Link href={c.href}>{c.label}</Link> : <strong>{c.label}</strong>}
                </span>
              ))}
            </nav>

            <span className={"ax-hero-badge" + (accent === "red" ? " red" : "")}>
              <i aria-hidden="true" />
              {badge ?? eyebrow}
            </span>

            <h1>{title}</h1>

            {intro && <p className="ax-hero-lead">{intro}</p>}

            {actions && <div className="ax-actions">{actions}</div>}

            {meta && meta.length > 0 && (
              <ul className={"ax-stats" + (meta.length === 3 ? " three" : "")}>
                {meta.map((m) => (
                  <li className="ax-stat" key={m.k}>
                    <b>{m.v}</b>
                    <span>{m.k}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {hasVisual && (
            <div className="ax-hero-visual">
              <figure className="ax-hero-photo">
                <Image
                  src={image!}
                  alt=""
                  fill
                  sizes="(max-width: 980px) 100vw, 600px"
                  priority
                />
                {caption && (
                  <figcaption>
                    <span className="ax-cap">
                      <span>{caption.kicker}</span>
                      <strong>{caption.title}</strong>
                    </span>
                    {caption.chip && <span className="ax-chip">{caption.chip}</span>}
                  </figcaption>
                )}
              </figure>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
