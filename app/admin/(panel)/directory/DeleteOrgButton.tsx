"use client";

import { useFormStatus } from "react-dom";

/**
 * Delete button that lives inside the editor form (forms can't nest) and
 * submits it to the delete action instead, after a native confirm. It skips
 * the form's own validation, so a half-filled record never blocks a delete.
 */
export default function DeleteOrgButton({
  action,
  confirmText,
  children,
}: {
  action: (formData: FormData) => Promise<void>;
  confirmText: string;
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="adm-danger adm-btn-block dir-delete"
      formAction={action}
      formNoValidate
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
