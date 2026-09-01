import Link from "next/link";

/**
 * Shared building blocks for the healthcare accreditation cluster
 * (/programs/healthcare and its six children).
 *
 * Aug 2026 — built on the portable `.ax-*` design system (app/aaa-ds.css) so
 * the cluster carries the same navy/gold editorial language as the two
 * client-approved reference pages.
 */

export const HC_APPLICATION_FORM =
  "https://aaa-accreditation.org/wp-content/uploads/2025/02/Application-form.docx";
export const HC_CONSULT = "https://calendly.com/aaa-accreditation4/30min";
export const HC_EMAIL = "healthcare@aaa-accreditation.org";

/** Inline stroke icon wrapper — matches the reference pages' icon language. */
export function LineIcon({
  children,
  strokeWidth = 1.7,
}: {
  children: React.ReactNode;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

/* ------------------------------------------------------------------ cluster */

export type HcChild = {
  href: string;
  title: string;
  blurb: string;
  icon: React.ReactNode;
};

/**
 * The six healthcare sub-pages. Titles and blurbs are the client's own labels
 * from the live site's healthcare hub.
 */
export const HC_CHILDREN: HcChild[] = [
  {
    href: "/programs/healthcare/standards",
    title: "Accreditation Standards",
    blurb:
      "The twelve chapters of evidence-based criteria behind AAA healthcare accreditation, and how they are developed.",
    icon: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M9 7h7M9 11h7" />
      </>
    ),
  },
  {
    href: "/programs/healthcare/process",
    title: "Accreditation Process",
    blurb:
      "Your guide to the full accreditation journey — four documented stages, phase-by-phase timelines and what to expect.",
    icon: (
      <>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="m9 14 2 2 4-4" />
      </>
    ),
  },
  {
    href: "/programs/healthcare/why-aaa",
    title: "Why AAA Accreditation?",
    blurb:
      "Seven reasons facilities choose AAA — international recognition, a simple four-step process and a dedicated advisor throughout.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 11.5 2 2 4-4" />
      </>
    ),
  },
  {
    href: "/programs/healthcare/consultation",
    title: "Consultation Services",
    blurb:
      "Gap analysis, documentation support, staff training, mock surveys and a continuous compliance strategy.",
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8M8 13h5" />
      </>
    ),
  },
  {
    href: "/programs/healthcare/international-recognition",
    title: "International Recognition",
    blurb:
      "How AAA standards were assessed and accredited by ISQua EEA, and what institutional ISQua membership means.",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
      </>
    ),
  },
  {
    href: "/programs/healthcare/who-can-apply",
    title: "Who Can Be Accredited?",
    blurb:
      "The healthcare facilities eligible to apply — from single-chair dental offices to multi-site hospitals.",
    icon: (
      <>
        <path d="M3 21h18M6 21V8l6-5 6 5v13" />
        <path d="M12 10v5M9.5 12.5h5" />
      </>
    ),
  },
];

/**
 * Cluster sub-navigation. Rendered on the hub and, with `current` set, on every
 * child page so siblings are always one click away.
 */
export function ClusterNav({
  current,
  eyebrow = "Explore the program",
  heading = "The healthcare program, in six parts",
  lead,
  cream = false,
}: {
  /** href of the page rendering this nav — it is excluded from the grid. */
  current?: string;
  eyebrow?: string;
  heading?: string;
  lead?: string;
  cream?: boolean;
}) {
  const items = HC_CHILDREN.filter((c) => c.href !== current);

  return (
    <section className={"ax-section" + (cream ? " cream" : "")} id="explore">
      <div className="container">
        <div className="ax-head center reveal">
          <span className="eyebrow">{eyebrow}</span>
          <h2>{heading}</h2>
          {lead && <p>{lead}</p>}
        </div>

        <div className="ax-grid three">
          {items.map((c, i) => (
            <Link
              className="ax-card reveal"
              href={c.href}
              key={c.href}
              style={{ transitionDelay: `${i * 55}ms` }}
            >
              <div className="ax-card-top">
                <span className="ax-ico ax-card-ico" aria-hidden="true">
                  <LineIcon>{c.icon}</LineIcon>
                </span>
                <span className="ax-card-no" aria-hidden="true">
                  {String(HC_CHILDREN.indexOf(c) + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{c.title}</h3>
              <p>{c.blurb}</p>
              <span className="ax-card-go">
                Learn more <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Related-links row used by every child page's closing CTA. */
export function hcRelated(current?: string) {
  return [
    { href: "/programs/healthcare", label: "Healthcare Accreditation" },
    ...HC_CHILDREN.filter((c) => c.href !== current).slice(0, 3).map((c) => ({
      href: c.href,
      label: c.title,
    })),
  ];
}
