"use client";

import { useFormStatus } from "react-dom";

/** Destructive submit button with a native confirm guard. */
export default function DangerButton({
  children,
  confirmText = "Delete permanently? This cannot be undone.",
  className = "adm-danger",
}: {
  children: React.ReactNode;
  confirmText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={className}
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      {pending ? "Deleting…" : children}
    </button>
  );
}
