"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT } from "@/lib/facts";

/**
 * Shared success panel for the membership application forms.
 *
 * Nov 2026 (client feedback): "Email your documents" was a bare mailto link,
 * which does nothing on a computer without a mail app. The address is now shown
 * in full with a copy button, and the mail link pre-fills the subject.
 */
export default function FormDone({
  title,
  subject,
  children,
}: {
  title: string;
  /** Subject line the email link pre-fills, e.g. "Organizational membership documents". */
  subject: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked: the address stays visible and selectable.
    }
  };

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
      <div className="memx-done-mail">
        <span>Send your documents to</span>
        <a href={mailto}>{CONTACT.email}</a>
        <button type="button" onClick={copy} aria-live="polite">
          {copied ? "Address copied" : "Copy address"}
        </button>
      </div>
      <div className="memx-done-actions">
        <a className="ax-btn ax-btn-blue" href={mailto}>
          Email your documents
        </a>
        <Link className="ax-btn ax-btn-ghost-navy" href="/membership">
          Back to Membership
        </Link>
      </div>
    </div>
  );
}
