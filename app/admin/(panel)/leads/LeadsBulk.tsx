"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

/*
 * Bulk actions for the leads table. The table is one server-rendered <form>
 * whose rows carry `name="ids"` checkboxes; these two islands only count and
 * toggle those checkboxes. The form sets autoComplete="off" so the browser
 * never restores ticks or picks on back navigation (the bar starts empty).
 */

type Option = { value: string; label: string };

function rowBoxes(form: HTMLFormElement | null) {
  return form ? Array.from(form.querySelectorAll<HTMLInputElement>('input[type="checkbox"][name="ids"]')) : [];
}

type Snapshot = { selected: number; total: number; hasAction: boolean };

/**
 * Reads the enclosing form on every change (and after a reset — React resets
 * the form once the action succeeds): how many rows are ticked, and whether
 * a bulk status or owner has been chosen.
 */
function useFormSnapshot(ref: React.RefObject<HTMLElement | null>): Snapshot {
  const [snap, setSnap] = useState<Snapshot>({ selected: 0, total: 0, hasAction: false });
  useEffect(() => {
    const form = ref.current?.closest("form") ?? null;
    if (!form) return;
    const read = () => {
      const boxes = rowBoxes(form);
      const pick = (name: string) => (form.elements.namedItem(name) as HTMLSelectElement | null)?.value ?? "";
      setSnap({
        selected: boxes.filter((b) => b.checked).length,
        total: boxes.length,
        hasAction: Boolean(pick("bulkStatus") || pick("bulkAssignee")),
      });
    };
    // "reset" fires before the fields are restored; read on the next tick.
    const onReset = () => window.setTimeout(read, 0);
    form.addEventListener("change", read);
    form.addEventListener("reset", onReset);
    return () => {
      form.removeEventListener("change", read);
      form.removeEventListener("reset", onReset);
    };
  }, [ref]);
  return snap;
}

/** Header checkbox: ticks/unticks every row; shows the mixed state. */
export function SelectAllLeads() {
  const ref = useRef<HTMLInputElement>(null);
  const { selected, total } = useFormSnapshot(ref);
  useEffect(() => {
    const box = ref.current;
    if (!box) return;
    box.checked = total > 0 && selected === total;
    box.indeterminate = selected > 0 && selected < total;
  }, [selected, total]);

  return (
    <input
      ref={ref}
      type="checkbox"
      aria-label="Select all leads on this page"
      onChange={(e) => {
        const form = e.currentTarget.form;
        const on = e.currentTarget.checked;
        rowBoxes(form).forEach((b) => {
          b.checked = on;
        });
        // Programmatic ticks don't fire change events; announce once for the bar.
        form?.dispatchEvent(new Event("change", { bubbles: true }));
      }}
    />
  );
}

function ApplyButton({ disabled }: { disabled: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary adm-btn-sm" disabled={disabled || pending} aria-busy={pending}>
      {pending ? "Applying…" : "Apply"}
    </button>
  );
}

/** Bar above the table: selection count, status + owner pickers, Apply. */
export function LeadsBulkBar({ statuses, assignees }: { statuses: Option[]; assignees: Option[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { selected, hasAction } = useFormSnapshot(ref);

  return (
    <div ref={ref} className="adml-bulk" data-active={selected > 0 ? "" : undefined}>
      <span className="adml-bulk-count" aria-live="polite">
        {selected > 0 ? `${selected} selected` : "Tick leads to update them together"}
      </span>
      <select className="sme-select" name="bulkStatus" defaultValue="" aria-label="Set status of the selected leads">
        <option value="">Status: no change</option>
        {statuses.map((s) => (
          <option key={s.value} value={s.value}>
            Set status: {s.label}
          </option>
        ))}
      </select>
      <select className="sme-select" name="bulkAssignee" defaultValue="" aria-label="Assign the selected leads">
        <option value="">Owner: no change</option>
        <option value="none">Unassign</option>
        {assignees.map((a) => (
          <option key={a.value} value={a.value}>
            Assign to {a.label}
          </option>
        ))}
      </select>
      <ApplyButton disabled={selected === 0 || !hasAction} />
    </div>
  );
}
