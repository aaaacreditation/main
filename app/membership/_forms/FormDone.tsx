import Link from "next/link";

/** Shared success panel for the membership application forms. */
export default function FormDone({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="memx-form-done" role="status">
      <span className="tick" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 12 5 5L20 7" />
        </svg>
      </span>
      <strong>{title}</strong>
      {children}
      <div className="memx-done-actions">
        <a className="ax-btn ax-btn-blue" href="mailto:info@aaa-accreditation.org">
          Email your documents
        </a>
        <Link className="ax-btn ax-btn-ghost-navy" href="/membership">
          Back to Membership
        </Link>
      </div>
    </div>
  );
}
