"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Icon from "../../_components/Icon";
import type { Org } from "@/app/_data/accredited-organizations";

export type { Accreditation, Org } from "@/app/_data/accredited-organizations";

const ALL = "All countries";

/**
 * Focus areas are a *search shortcut*, not a classification AAA assigns.
 *
 * Each chip matches the words an organization uses in its own name and
 * description, so an entry can match several areas or none. Nothing derived
 * here is ever printed on a card as though it were part of the accreditation
 * record — the authoritative scope always comes from the record itself.
 */
const FOCUS_AREAS: { id: string; label: string; test: RegExp }[] = [
  {
    id: "higher-education",
    label: "Higher education",
    test: /universit|college|higher education|postgraduate|doctoral|bachelor|master'?s|degree|campus|academia|business school|ects|mba/i,
  },
  {
    id: "training",
    label: "Training & development",
    test: /training|academy|learning|course|cpd|ceu|professional development|coaching|skills|workshop|instructor|curricul/i,
  },
  {
    id: "healthcare",
    label: "Healthcare & clinical",
    test: /health|medic|clinic|hospital|nursing|dental|patient|pharma|psycholog|therap|wellness|aesthet|cancer|laser|surger|diagnostic|rehabilit/i,
  },
  {
    id: "conformity",
    label: "Conformity assessment",
    test: /certification|inspection|laborator|testing|proficiency|calibrat|conformity|registrar|iso\/?iec|iso [0-9]|audit|standards body|assessment body/i,
  },
  {
    id: "schools",
    label: "Schools & K–12",
    test: /international school|k-12|k–12|prek|pre-k|primary school|secondary school|kindergarten|pupils/i,
  },
  {
    id: "consulting",
    label: "Consulting & advisory",
    test: /consult|advisory|advisor|business development/i,
  },
];

function haystack(o: Org): string {
  return `${o.name} ${o.description ?? ""}`;
}

function initials(name: string): string {
  const words = name
    .replace(/[^A-Za-z0-9 &]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const letters = words
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (letters || name.slice(0, 2)).toUpperCase();
}

export default function DirectoryExplorer({ orgs }: { orgs: Org[] }) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState(ALL);
  const [focus, setFocus] = useState<string | null>(null);
  const [onlyRecord, setOnlyRecord] = useState(false);
  const [active, setActive] = useState<Org | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const countries = useMemo(
    () => [
      ALL,
      ...Array.from(new Set(orgs.map((o) => o.country))).sort((a, b) => a.localeCompare(b)),
    ],
    [orgs]
  );

  const focusCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const area of FOCUS_AREAS) {
      counts[area.id] = orgs.filter((o) => area.test.test(haystack(o))).length;
    }
    return counts;
  }, [orgs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const area = FOCUS_AREAS.find((a) => a.id === focus);
    return orgs
      .filter((o) => country === ALL || o.country === country)
      .filter((o) => !onlyRecord || Boolean(o.accreditation))
      .filter((o) => !area || area.test.test(haystack(o)))
      .filter(
        (o) =>
          !q ||
          `${o.name} ${o.location} ${o.country} ${o.description ?? ""}`.toLowerCase().includes(q)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [orgs, query, country, focus, onlyRecord]);

  const hasFilters = query !== "" || country !== ALL || focus !== null || onlyRecord;

  function reset() {
    setQuery("");
    setCountry(ALL);
    setFocus(null);
    setOnlyRecord(false);
  }

  // Dialog: lock scroll, close on Escape, move focus to the close button.
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <div className="dx">
      <div className="dx-tools reveal">
        <div className="dx-search">
          <Icon name="search" size={18} />
          <input
            type="search"
            placeholder="Search organizations, cities, keywords…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search the register of accredited organizations"
          />
          {query && (
            <button className="dx-clear" onClick={() => setQuery("")} aria-label="Clear search">
              ×
            </button>
          )}
        </div>

        <div className="dx-select">
          <Icon name="globe" size={16} />
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            aria-label="Filter by country"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <span className="dx-caret" aria-hidden="true" />
        </div>

        <button
          type="button"
          className={"dx-toggle" + (onlyRecord ? " on" : "")}
          onClick={() => setOnlyRecord((v) => !v)}
          aria-pressed={onlyRecord}
        >
          <Icon name="shield" size={15} /> Record on file
        </button>
      </div>

      <div className="dx-chips reveal">
        <span className="dx-chips-label">Focus area</span>
        {FOCUS_AREAS.map((area) => (
          <button
            type="button"
            key={area.id}
            className={"dx-chip" + (focus === area.id ? " on" : "")}
            aria-pressed={focus === area.id}
            onClick={() => setFocus((f) => (f === area.id ? null : area.id))}
          >
            {area.label} <b>{focusCounts[area.id]}</b>
          </button>
        ))}
        <p className="dx-chips-note">
          Focus areas search the wording each organization uses to describe itself, so an entry can
          appear under more than one. The authoritative scope of any accreditation is the one shown
          on its record.
        </p>
      </div>

      <div className="dx-meta reveal">
        <span>
          <strong>{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "organization" : "organizations"}
          {country !== ALL && <> in {country}</>}
          {focus && <> under {FOCUS_AREAS.find((a) => a.id === focus)?.label.toLowerCase()}</>}
          {query && <> matching “{query}”</>}
        </span>
        {hasFilters && (
          <button type="button" className="dx-reset" onClick={reset}>
            Reset all filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="dx-empty">
          <Icon name="search" size={30} />
          <h3>No organizations match those filters</h3>
          <p>Try a different search term, another country, or reset the filters.</p>
        </div>
      ) : (
        <div className="dx-grid">
          {filtered.map((o) => (
            <button
              type="button"
              className="dx-card reveal"
              key={`${o.name}-${o.location}`}
              onClick={() => setActive(o)}
              aria-haspopup="dialog"
            >
              <span className="dx-card-top">
                <span className="dx-mono" aria-hidden="true">
                  {initials(o.name)}
                </span>
                {o.accreditation && (
                  <span className="dx-badge">
                    <Icon name="shield" size={11} /> Record on file
                  </span>
                )}
              </span>
              <h3>{o.name}</h3>
              <p className="dx-loc">
                <Icon name="pin" size={13} /> {o.location}
              </p>
              {o.description && <p className="dx-desc">{o.description}</p>}
              <span className="dx-more">
                View details <Icon name="arrow" size={13} />
              </span>
            </button>
          ))}
        </div>
      )}

      {active && (
        <div
          className="dx-modal"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          onClick={() => setActive(null)}
        >
          <div className="dx-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeRef}
              className="dx-modal-x"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="dx-modal-head">
              {active.logo ? (
                <span className="dx-modal-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={active.logo} alt={`${active.name} logo`} />
                </span>
              ) : (
                <span className="dx-mono" aria-hidden="true">
                  {initials(active.name)}
                </span>
              )}
              <div>
                <h2>{active.name}</h2>
                <p className="dx-loc">
                  <Icon name="pin" size={14} /> {active.location} · {active.country}
                </p>
              </div>
            </div>

            {active.description && <p className="dx-modal-desc">{active.description}</p>}

            {active.accreditation ? (
              <div className="dx-record">
                <div className="dx-record-h">
                  <Icon name="shield" size={13} /> Accreditation record
                </div>
                <dl>
                  <div>
                    <dt>Accredited as</dt>
                    <dd>{active.accreditation.accreditedAs}</dd>
                  </div>
                  <div>
                    <dt>Accreditation no.</dt>
                    <dd>{active.accreditation.number}</dd>
                  </div>
                  <div>
                    <dt>Scope</dt>
                    <dd>{active.accreditation.scope}</dd>
                  </div>
                  <div>
                    <dt>Valid until</dt>
                    <dd>{active.accreditation.expiry}</dd>
                  </div>
                  <div>
                    <dt>Status</dt>
                    <dd>{active.accreditation.status}</dd>
                  </div>
                </dl>
              </div>
            ) : (
              <p className="dx-modal-note">
                A structured accreditation record is not published for this entry. To confirm the
                current scope, validity or status of any listing, contact AAA and we will verify it
                against the accreditation file.
              </p>
            )}

            <div className="dx-modal-actions">
              <Link href="/contact" className="ax-btn ax-btn-blue sm">
                Verify this listing <Icon name="arrow" size={14} />
              </Link>
              <Link href="/quote" className="ax-btn ax-btn-ghost-navy sm">
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
