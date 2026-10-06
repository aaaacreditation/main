/**
 * Standard section heading: gold kicker, navy h2, optional intro.
 * Renders the `.ax-head` primitive so it inherits the site type scale.
 */
export default function SectionHead({
  eyebrow,
  title,
  intro,
  center,
  light,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
  /** White text — for heads placed on a navy surface. */
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`ax-head reveal${center ? " center" : ""}${light ? " light" : ""}${className ? " " + className : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  );
}
