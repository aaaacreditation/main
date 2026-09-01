/**
 * Shared long-form body shell (policy pages, program overviews, articles).
 *
 * Aug 2026: re-skinned onto the `.ax-*` design system — a sticky editorial
 * label rail on the left, `.ax-prose` typography on the right.
 */
export default function PageBody({
  label,
  children,
  aside,
}: {
  label: string;
  children: React.ReactNode;
  /** Optional right-hand rail (document list, apply panel, contact card). */
  aside?: React.ReactNode;
}) {
  return (
    <section className="ax-section ax-body">
      <div className="container">
        <div className={"ax-body-grid" + (aside ? " has-aside" : "")}>
          <div className="ax-body-label reveal">
            <span className="ax-label">{label}</span>
            <span className="ax-rule" />
          </div>
          <div className="ax-prose reveal">{children}</div>
          {aside && <div className="ax-body-aside reveal">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
