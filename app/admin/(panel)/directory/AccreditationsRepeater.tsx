"use client";

import { useId, useState } from "react";
import { ACCREDITATION_STATUSES } from "@/app/_data/accredited-organizations";

/**
 * The accreditation records of one organization: add, remove and reorder rows.
 * Rows are controlled state keyed by a stable id, and the whole list is
 * serialized into one hidden `accreditations` input as JSON — the server
 * action validates it again (accreditedAs required, at most MAX rows).
 */

export const MAX_RECORDS = 30;

export type RecordInput = {
  accreditedAs: string;
  number: string;
  scope: string;
  expiry: string;
  status: string;
};

type Row = RecordInput & { key: string };

const EXPIRY_TEXT =
  /^(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}$/i;

// Initial rows get deterministic keys ("i0", "i1"…) because the keys also
// build element ids, which must match between the server render and
// hydration; rows added later only ever exist on the client.
let seq = 0;
const nextKey = () => `n${++seq}`;

const blank = (key = nextKey()): Row => ({
  key,
  accreditedAs: "",
  number: "",
  scope: "",
  expiry: "",
  status: "Accredited",
});

export default function AccreditationsRepeater({
  initial,
  accreditedAsOptions,
}: {
  initial: RecordInput[];
  accreditedAsOptions: string[];
}) {
  const uid = useId();
  const listId = `${uid}-accredited-as`;
  const [rows, setRows] = useState<Row[]>(() =>
    initial.length > 0 ? initial.map((r, i) => ({ ...r, key: `i${i}` })) : [blank("i0")]
  );

  const update = (key: string, field: keyof RecordInput, value: string) =>
    setRows((rs) => rs.map((r) => (r.key === key ? { ...r, [field]: value } : r)));
  const remove = (key: string) => setRows((rs) => rs.filter((r) => r.key !== key));
  const move = (i: number, by: -1 | 1) =>
    setRows((rs) => {
      const j = i + by;
      if (j < 0 || j >= rs.length) return rs;
      const next = rs.slice();
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  const add = () => setRows((rs) => (rs.length >= MAX_RECORDS ? rs : [...rs, blank()]));

  const payload = JSON.stringify(
    rows.map(({ accreditedAs, number, scope, expiry, status }) => ({ accreditedAs, number, scope, expiry, status }))
  );

  return (
    <div>
      <input type="hidden" name="accreditations" value={payload} />
      <datalist id={listId}>
        {accreditedAsOptions.map((v) => (
          <option key={v} value={v} />
        ))}
      </datalist>

      {rows.length === 0 ? (
        <p className="adm-hint">
          No accreditation records. A published organization needs at least one — add a record or save it as a draft.
        </p>
      ) : null}

      <div className="adm-repeater">
        {rows.map((r, i) => {
          const id = (f: string) => `${uid}-${r.key}-${f}`;
          const expiryBad = r.expiry.trim() !== "" && !EXPIRY_TEXT.test(r.expiry.trim().replace(/\s+/g, " "));
          return (
            <fieldset className="adm-repeater-row" key={r.key} aria-label={`Accreditation record ${i + 1}`}>
              <div className="adm-repeater-head">
                <span>
                  Record {i + 1}
                  {r.number ? <span className="dir-rec-tag"> · {r.number}</span> : null}
                </span>
                <span className="dir-rec-actions">
                  <button
                    type="button"
                    className="adm-linkbtn"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label={`Move record ${i + 1} up`}
                  >
                    ↑ Up
                  </button>
                  <button
                    type="button"
                    className="adm-linkbtn"
                    onClick={() => move(i, 1)}
                    disabled={i === rows.length - 1}
                    aria-label={`Move record ${i + 1} down`}
                  >
                    ↓ Down
                  </button>
                  <button
                    type="button"
                    className="adm-danger-link"
                    onClick={() => remove(r.key)}
                    aria-label={`Remove record ${i + 1}`}
                  >
                    Remove
                  </button>
                </span>
              </div>

              <div className="adm-fields">
                <div>
                  <label className="adm-label" htmlFor={id("as")}>
                    Accredited as *
                  </label>
                  <input
                    id={id("as")}
                    className="sme-input"
                    list={listId}
                    required
                    maxLength={300}
                    value={r.accreditedAs}
                    onChange={(e) => update(r.key, "accreditedAs", e.target.value)}
                    placeholder="e.g. Training & Education Provider"
                  />
                </div>
                <div>
                  <label className="adm-label" htmlFor={id("no")}>
                    Accreditation number
                  </label>
                  <input
                    id={id("no")}
                    className="sme-input"
                    maxLength={120}
                    value={r.number}
                    onChange={(e) => update(r.key, "number", e.target.value)}
                    placeholder="e.g. TP26823"
                  />
                </div>
                <div className="full">
                  <label className="adm-label" htmlFor={id("scope")}>
                    Scope
                  </label>
                  <textarea
                    id={id("scope")}
                    className="sme-textarea"
                    rows={2}
                    maxLength={4000}
                    value={r.scope}
                    onChange={(e) => update(r.key, "scope", e.target.value)}
                    placeholder="As published on the certificate"
                  />
                </div>
                <div>
                  <label className="adm-label" htmlFor={id("exp")}>
                    Expiry
                  </label>
                  <input
                    id={id("exp")}
                    className="sme-input"
                    maxLength={60}
                    value={r.expiry}
                    onChange={(e) => update(r.key, "expiry", e.target.value)}
                    placeholder="May 1, 2029"
                    aria-describedby={id("exp-hint")}
                  />
                  {expiryBad ? (
                    <p className="dir-rec-warn" id={id("exp-hint")}>
                      Not in “Month D, YYYY” form — it will be published as typed, but renewal alerts can’t
                      read the date.
                    </p>
                  ) : (
                    <p className="adm-hint" id={id("exp-hint")}>
                      Published as typed. Use “Month D, YYYY” so renewal alerts can read it.
                    </p>
                  )}
                </div>
                <div>
                  <label className="adm-label" htmlFor={id("status")}>
                    Status
                  </label>
                  <select
                    id={id("status")}
                    className="sme-select"
                    value={r.status}
                    onChange={(e) => update(r.key, "status", e.target.value)}
                  >
                    {(ACCREDITATION_STATUSES as readonly string[]).includes(r.status) ? null : (
                      <option value={r.status}>{r.status} (saves as Accredited)</option>
                    )}
                    {ACCREDITATION_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </fieldset>
          );
        })}
      </div>

      <div className="dir-rec-add">
        <button type="button" className="btn btn-ghost adm-btn-sm" onClick={add} disabled={rows.length >= MAX_RECORDS}>
          + Add accreditation record
        </button>
        <span className="adm-hint" style={{ margin: 0 }}>
          {rows.length} of {MAX_RECORDS} · the first Accredited record leads the public register card
        </span>
      </div>
    </div>
  );
}
