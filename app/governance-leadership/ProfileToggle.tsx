"use client";

import { useId, useState } from "react";

/**
 * "View Profile" disclosure for a person card. The full biography is
 * server-rendered (crawlable, present without JS) and collapsed with a
 * grid-rows transition; while closed it is `inert`, so it is skipped by
 * keyboard and assistive technology until the button expands it.
 */
export default function ProfileToggle({ name, children }: { name: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={"gov-profile" + (open ? " open" : "")}>
      <div
        id={id}
        className="gov-profile-panel"
        role="region"
        aria-label={`${name}: full profile`}
        inert={!open}
      >
        <div className="gov-profile-inner">{children}</div>
      </div>
      <button
        type="button"
        className="gov-profile-btn"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? "Hide Profile" : "View Profile"}
        <span className="gov-vh"> of {name}</span>
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
