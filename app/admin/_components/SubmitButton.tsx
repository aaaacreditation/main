"use client";

import { useFormStatus } from "react-dom";

/** Form submit button that shows a busy state while the server action runs. */
export default function SubmitButton({
  children,
  className = "btn btn-primary",
  pendingLabel = "Saving…",
  name,
  value,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  pendingLabel?: string;
  /** Sent with the form when this button submits it (several buttons, one form). */
  name?: string;
  value?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending || disabled} aria-busy={pending} name={name} value={value}>
      {pending ? pendingLabel : children}
    </button>
  );
}
