"use client";

import { useId, useState } from "react";

/**
 * Tag input for the article editor (Nov 2026): the chosen tags as removable
 * chips, a text box that suggests the existing tags, and Enter / comma to add
 * one. A tag that is not in the list yet is added to Admin → Categories & Tags
 * when the article is saved. Submits as one comma-separated hidden field.
 */
export default function TagPicker({
  name,
  initial = [],
  suggestions = [],
}: {
  name: string;
  initial?: string[];
  suggestions?: string[];
}) {
  const [tags, setTags] = useState<string[]>(initial);
  const [draft, setDraft] = useState("");
  const listId = useId();
  const key = (t: string) => t.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");

  const add = (raw: string) => {
    const parts = raw.split(",").map((t) => t.trim().replace(/\s+/g, " ")).filter(Boolean);
    if (!parts.length) return;
    setTags((cur) => {
      const next = [...cur];
      for (const p of parts) {
        // Reuse the existing spelling of a known tag.
        const known = suggestions.find((s) => key(s) === key(p)) ?? p.slice(0, 60);
        if (!next.some((t) => key(t) === key(known)) && next.length < 20) next.push(known);
      }
      return next;
    });
    setDraft("");
  };

  const remove = (t: string) => setTags((cur) => cur.filter((x) => x !== t));
  const unused = suggestions.filter((s) => !tags.some((t) => key(t) === key(s)));

  return (
    <div className="adm-tagpicker">
      <input type="hidden" name={name} value={tags.join(", ")} />
      {tags.length > 0 ? (
        <ul className="adm-tagpicker-chips">
          {tags.map((t) => (
            <li key={t}>
              {t}
              <button type="button" onClick={() => remove(t)} aria-label={`Remove tag ${t}`}>
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      <input
        className="sme-input"
        list={listId}
        value={draft}
        onChange={(e) => {
          const v = e.target.value;
          if (v.includes(",")) add(v);
          else setDraft(v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add(draft);
          } else if (e.key === "Backspace" && !draft && tags.length) {
            setTags((cur) => cur.slice(0, -1));
          }
        }}
        onBlur={() => add(draft)}
        placeholder={tags.length ? "Add another tag…" : "Type a tag and press Enter"}
        aria-label="Add a tag"
      />
      <datalist id={listId}>
        {unused.map((s) => (
          <option key={s} value={s} />
        ))}
      </datalist>
      {unused.length > 0 ? (
        <div className="adm-tagpicker-suggest" aria-label="Existing tags">
          {unused.slice(0, 12).map((s) => (
            <button type="button" key={s} onClick={() => add(s)}>
              + {s}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
