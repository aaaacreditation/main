"use client";

import { useFormStatus } from "react-dom";

/** Form submit button that shows a busy state while the server action runs. */
export default function SubmitButton({
  children,
  className = "btn btn-primary",
  pendingLabel = "Saving…",
}: {
  children: React.ReactNode;
  className?: string;
  pendingLabel?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending}>
      {pending ? pendingLabel : children}
    </button>
  );
}
