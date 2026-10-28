"use client";

import { useActionState } from "react";
import SubmitButton from "../../../_components/SubmitButton";
import { bulkImportRedirects, type BulkImportState } from "./actions";

/** Paste many redirects at once: one "/old-path /new-path" per line. */
export default function BulkImport() {
  const [state, action] = useActionState<BulkImportState, FormData>(bulkImportRedirects, {});
  const errors = state.errors ?? [];

  return (
    // key: remount after each run so the box holds only the lines that still need fixing.
    <form action={action} className="adm-panel adm-form" key={JSON.stringify([state.remaining, state.created, state.updated])}>
      <h3>Bulk paste</h3>
      <p className="adm-hint">
        One per line: <code>/old-path /new-path</code>. Add <code>307</code> at the end of a line to make it
        temporary. Lines starting with <code>#</code> are ignored.
      </p>

      {state.error ? (
        <p className="adm-error" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.done ? (
        <p className={"adm-toast" + (errors.length ? "" : " ok")} role="status">
          {state.created} created, {state.updated} updated
          {state.skipped ? `, ${state.skipped} skipped (already redirected)` : ""}
          {errors.length ? `, ${errors.length} line${errors.length === 1 ? "" : "s"} need fixing` : ""}.
        </p>
      ) : null}
      {errors.length ? (
        <ul className="adm-issues">
          {errors.map((e) => (
            <li key={e.line} className="error">
              <span>
                <strong>Line {e.line}</strong> <code>{e.text}</code> — {e.reason}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <label className="adm-label" htmlFor="rd-bulk">Redirects</label>
      <textarea
        id="rd-bulk"
        className="sme-textarea"
        name="lines"
        rows={7}
        spellCheck={false}
        defaultValue={state.remaining ?? ""}
        placeholder={"/old-page /new-page\n/events/2024 /news 307"}
      />

      <label className="adm-label" htmlFor="rd-bulk-type">Default type</label>
      <select id="rd-bulk-type" className="sme-select" name="type" defaultValue="permanent">
        <option value="permanent">Permanent (308)</option>
        <option value="temporary">Temporary (307)</option>
      </select>

      <label className="adm-check">
        <input type="checkbox" name="overwrite" value="1" />
        <span>
          Replace existing redirects
          <small>Otherwise a source that is already redirected is skipped.</small>
        </span>
      </label>

      <SubmitButton className="btn btn-ghost adm-btn-sm adm-btn-block" pendingLabel="Importing…">
        Import redirects
      </SubmitButton>
    </form>
  );
}
