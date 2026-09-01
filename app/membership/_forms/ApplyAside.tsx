import Link from "next/link";
import Icon from "../../_components/Icon";

const CONSULT = "https://calendly.com/aaa-accreditation4/30min";

/**
 * The sticky rail beside every membership application form: what happens after
 * you submit, what to have ready, and how to reach the membership team.
 */
export default function ApplyAside({
  steps,
  documents,
  links,
}: {
  steps: { n: string; title: string; text: string }[];
  documents?: string[];
  links?: { href: string; label: string }[];
}) {
  return (
    <aside className="memx-apply-aside">
      <div className="ax-steps-panel reveal">
        <h3>What happens next</h3>
        <ol className="ax-steps">
          {steps.map((s) => (
            <li className="ax-step" key={s.n}>
              <span className="ax-step-num" aria-hidden="true">
                {s.n}
              </span>
              <div className="ax-step-body">
                <b>{s.title}</b>
                <span>{s.text}</span>
              </div>
            </li>
          ))}
        </ol>
        <span className="ax-pill">
          <span className="ax-ico" aria-hidden="true">
            <Icon name="shield" size={16} />
          </span>
          Reviewed by the AAA membership team
        </span>
      </div>

      <div className="ax-panel reveal">
        {documents && documents.length > 0 && (
          <>
            <span className="ax-ico ax-panel-ico" aria-hidden="true">
              <Icon name="doc" size={28} />
            </span>
            <h3>Have these ready</h3>
            <ul className="ax-checks">
              {documents.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </>
        )}

        <ul className="memx-contacts">
          <li>
            <span className="ax-ico" aria-hidden="true">
              <Icon name="mail" size={16} />
            </span>
            <a href="mailto:info@aaa-accreditation.org">info@aaa-accreditation.org</a>
          </li>
          <li>
            <span className="ax-ico" aria-hidden="true">
              <Icon name="phone" size={16} />
            </span>
            <a href="tel:+15716012616">+1 (571) 601 2616</a>
          </li>
          <li>
            <span className="ax-ico" aria-hidden="true">
              <Icon name="globe" size={16} />
            </span>
            <a href="tel:+447487550737">+44 (748) 755 0737 — international / WhatsApp</a>
          </li>
          <li>
            <span className="ax-ico" aria-hidden="true">
              <Icon name="pin" size={16} />
            </span>
            8609 Westwood Center Drive, Tysons Corner, VA 22182, USA
          </li>
        </ul>

        <a
          href={CONSULT}
          target="_blank"
          rel="noopener noreferrer"
          className="ax-btn ax-btn-ghost-navy sm"
          style={{ alignSelf: "flex-start", marginTop: 20 }}
        >
          Book a free consultation
        </a>

        {links && links.length > 0 && (
          <ul className="ax-docs">
            <li className="ax-docs-title">Related</li>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  <span className="ax-ico" aria-hidden="true">
                    <Icon name="arrowUpRight" size={16} />
                  </span>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
