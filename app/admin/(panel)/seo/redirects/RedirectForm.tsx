"use client";

import { useActionState } from "react";
import SubmitButton from "../../../_components/SubmitButton";
import { saveRedirect, type RedirectFormState, type RedirectFormValues } from "./actions";

/**
 * Add / edit one redirect. Validation errors come back from the server action
 * and the typed values are kept, so nothing has to be re-entered.
 */
export default function RedirectForm({
  id,
  initial,
  submitLabel = "Add redirect",
}: {
  id?: string;
  initial?: RedirectFormValues;
  submitLabel?: string;
}) {
  const [state, action] = useActionState<RedirectFormState, FormData>(saveRedirect, {});
  const v = state.values ?? initial ?? { from: "", to: "", permanent: true, note: "" };
  const uid = id ?? "new";

  return (
    // key: remount with the returned values after an error (defaultValue is read once).
    <form action={action} className="adm-form" key={JSON.stringify(state.values ?? null)}>
      {id ? <input type="hidden" name="id" value={id} /> : null}
      {state.error ? (
        <p className="adm-error" role="alert">
          {state.error}
        </p>
      ) : null}

      <label className="adm-label" htmlFor={`rd-from-${uid}`}>From (old path)</label>
      <input
        id={`rd-from-${uid}`}
        className="sme-input"
        name="from"
        defaultValue={v.from}
        required
        placeholder="/old-page"
        autoComplete="off"
        spellCheck={false}
      />

      <label className="adm-label" htmlFor={`rd-to-${uid}`}>To (new path or full URL)</label>
      <input
        id={`rd-to-${uid}`}
        className="sme-input"
        name="to"
        defaultValue={v.to}
        required
        placeholder="/new-page or https://…"
        autoComplete="off"
        spellCheck={false}
      />

      <label className="adm-label" htmlFor={`rd-type-${uid}`}>Type</label>
      <select id={`rd-type-${uid}`} className="sme-select" name="type" defaultValue={v.permanent ? "permanent" : "temporary"}>
        <option value="permanent">Permanent (308) — the page has moved for good</option>
        <option value="temporary">Temporary (307) — it will come back</option>
      </select>

      <label className="adm-label" htmlFor={`rd-note-${uid}`}>Note (optional)</label>
      <input
        id={`rd-note-${uid}`}
        className="sme-input"
        name="note"
        defaultValue={v.note}
        maxLength={300}
        placeholder="Why this redirect exists"
      />

      <SubmitButton className="btn btn-primary adm-btn-sm adm-btn-block" pendingLabel="Saving…">
        {submitLabel}
      </SubmitButton>
    </form>
  );
}
