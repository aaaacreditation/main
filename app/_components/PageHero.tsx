import Link from "next/link";
import Image from "next/image";
import { Children, isValidElement, type ReactNode } from "react";
import Stat from "./site/Stat";

/**
 * Shared inner-page hero.
 *
 * Oct 2026 (v2): editorial split hero, drawing on institutional heroes on
 * Mobbin (Okta, Legora, PayPal "Executive Leadership", Deel). The page photo
 * is no longer a card — it bleeds to the right edge of the viewport as a tall
 * panel with a sweeping bottom-left curve, revealed by a clip-path wipe and a
 * slow drift. Copy sits on the navy field over a softly moving aura and
 * enters block by block. All motion is CSS (no hydration flash) and
 * `prefers-reduced-motion` turns it off. Styles: `.ax-hero.v2` in aaa-ds.css.
 *
 * The prop API is unchanged — ~37 pages render through this component.
 */

/** Plain-text length of the title, used to pick a headline size. */
function textLength(node: ReactNode): number {
  let n = 0;
  Children.forEach(node, (c) => {
    if (typeof c === "string" || typeof c === "number") n += String(c).length;
    else if (isValidElement<{ children?: ReactNode }>(c)) n += textLength(c.props.children);
  });
  return n;
}

export default function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  meta,
  image,
  imageAlt = "",
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
  /** Alt text for the hero photo; leave empty only when the image is purely decorative. */
  imageAlt?: string;
  /** `red` swaps the hero wash to the flag-red accent — use only where urgency is the story. */
  accent?: "gold" | "red";
  /** Optional kicker above the h1. Defaults to the eyebrow text. */
  badge?: string;
  actions?: React.ReactNode;
  caption?: { kicker: string; title: string; chip?: string };
}) {
  const hasVisual = Boolean(image);
  const len = textLength(title);
  const size = len > 48 ? "xl" : len > 30 ? "lg" : "md";

  return (
    <section className={"ax-hero v2" + (hasVisual ? " has-visual" : "") + (accent === "red" ? " red" : "")}>
      <div className="axh-aura" aria-hidden="true">
        <span />
        <span />
      </div>

      {hasVisual && (
        <div className="ax-hero-visual">
          <figure className="ax-hero-photo">
            <span className="axh-media">
              <Image
                src={image!}
                alt={imageAlt}
                fill
                sizes="(max-width: 980px) 100vw, 50vw"
                priority
              />
            </span>
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
          <span className="axh-arc" aria-hidden="true" />
        </div>
      )}

      <div className="container">
        <div className="ax-hero-grid solo">
          <div className="ax-hero-copy">
            <nav className="ax-crumbs axh-in" style={{ "--d": 0 } as React.CSSProperties} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              {crumbs?.map((c, i) => (
                <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <span aria-hidden="true">/</span>
                  {c.href ? <Link href={c.href}>{c.label}</Link> : <strong>{c.label}</strong>}
                </span>
              ))}
            </nav>

            <span
              className={"ax-hero-badge axh-in" + (accent === "red" ? " red" : "")}
              style={{ "--d": 1 } as React.CSSProperties}
            >
              <i aria-hidden="true" />
              {badge ?? eyebrow}
            </span>

            <h1 className="axh-in" data-size={size} style={{ "--d": 2 } as React.CSSProperties}>
              {title}
            </h1>

            {intro && (
              <p className="ax-hero-lead axh-in" style={{ "--d": 3 } as React.CSSProperties}>
                {intro}
              </p>
            )}

            {actions && (
              <div className="ax-actions axh-in" style={{ "--d": 4 } as React.CSSProperties}>
                {actions}
              </div>
            )}

            {meta && meta.length > 0 && (
              <ul
                className={"ax-stats axh-in" + (meta.length === 3 ? " three" : "")}
                style={{ "--d": 5 } as React.CSSProperties}
              >
                {meta.map((m) => (
                  <li className="ax-stat" key={m.k}>
                    <b>
                      <Stat value={m.v} countOnLoad />
                    </b>
                    <span>{m.k}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <span className="axh-rule" aria-hidden="true" />
    </section>
  );
}
