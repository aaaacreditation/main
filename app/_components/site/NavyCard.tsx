import Link from "next/link";
import Glyph, { type GlyphName } from "./Glyph";

/**
 * The site's card — the SMEs Accreditation page's blue pillar card, made
 * portable (Oct 2026, at the client's request that every card match it).
 *
 * Navy gradient surface on an animated border track (red accents orbiting a
 * steel-blue ring), thin gold-ring icon top-left, translucent ghost numeral
 * top-right, white title, gold gradient rule. Unlike the SME original the
 * description is visible by default — this is an informational site and the
 * healthcare brief explicitly rules out "flipping" cards.
 *
 * Renders `.ax-card.navy.ax-blue` from app/aaa-ds.css. Place it on white or
 * cream sections, never inside `.ax-section.navy`.
 */
export default function NavyCard({
  icon,
  no,
  tag,
  title,
  kicker,
  children,
  href,
  cta = "Learn more",
  external,
  className = "",
  compact,
}: {
  icon?: GlyphName;
  /** Ghost numeral, e.g. "01". Pass `true` is not supported — format it yourself. */
  no?: string;
  /** Small gold chip above the title, e.g. "ISO/IEC 17025". */
  tag?: string;
  title: React.ReactNode;
  /** Short gold line under the title (e.g. a tagline or a role). */
  kicker?: React.ReactNode;
  children?: React.ReactNode;
  href?: string;
  cta?: string;
  external?: boolean;
  className?: string;
  /** Tighter padding and no rule — for dense grids (10+ tiles). */
  compact?: boolean;
}) {
  const cls = `ax-card navy ax-blue reveal${compact ? " compact" : ""}${className ? " " + className : ""}`;
  const body = (
    <>
      {(icon || no) && (
        <div className="ax-card-top">
          {icon ? (
            <span className="ax-card-ico">
              <Glyph name={icon} />
            </span>
          ) : (
            <span />
          )}
          {no && <span className="ax-card-no">{no}</span>}
        </div>
      )}
      {tag && <span className="ax-blue-tag">{tag}</span>}
      <h3>{title}</h3>
      {kicker && <span className="ax-blue-kicker">{kicker}</span>}
      {children && <div className="ax-blue-body">{children}</div>}
      {href ? (
        <span className="ax-card-go">
          {cta} <Glyph name="arrow-right" size={14} strokeWidth={2} />
        </span>
      ) : (
        !compact && <span className="ax-card-rule" aria-hidden="true" />
      )}
    </>
  );

  if (href) {
    return external || href.startsWith("http") ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    ) : (
      <Link href={href} className={cls}>
        {body}
      </Link>
    );
  }
  return <article className={cls}>{body}</article>;
}
