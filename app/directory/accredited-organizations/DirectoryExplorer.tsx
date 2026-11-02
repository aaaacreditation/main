"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Glyph, { type GlyphName } from "../../_components/site/Glyph";
import {
  ACCREDITATION_TYPES,
  PROGRAM_FAMILIES,
  accreditationType,
  countryArt,
  orgStatus,
  type Accreditation,
  type Org,
  type ProgramFamily,
} from "@/app/_data/accredited-organizations";
import { CONTACT } from "@/lib/facts";

export type { Accreditation, Org } from "@/app/_data/accredited-organizations";

const ALL_COUNTRIES = "All countries";
const PAGE = 24;

/** Status filter. "Accredited" is the default so the register opens on live listings. */
const STATUSES = ["Accredited", "Suspended", "Withdrawn", "All"] as const;
type StatusFilter = (typeof STATUSES)[number];

const FAMILY_ICON: Record<ProgramFamily, GlyphName> = {
  training: "graduation",
  healthcare: "heart-pulse",
  school: "school",
  cab: "badge-check",
};

function families(o: Org): Set<ProgramFamily> {
  const out = new Set<ProgramFamily>();
  for (const a of o.accreditations) {
    const f = ACCREDITATION_TYPES[accreditationType(a)].family;
    if (f) out.add(f);
  }
  return out;
}

function typeLabel(a: Accreditation): string {
  const t = ACCREDITATION_TYPES[accreditationType(a)];
  return t.standard ? `${t.label} · ${t.standard}` : t.label;
}

function haystack(o: Org): string {
  const records = o.accreditations.map((a) => `${a.number} ${a.accreditedAs} ${a.scope}`).join(" ");
  return `${o.name} ${o.location} ${o.country} ${o.description ?? ""} ${records}`.toLowerCase();
}

function StatusPill({ status }: { status: string }) {
  const live = status === "Accredited";
  return (
    <span className={`dx-status${live ? " live" : " held"}`}>
      {live ? <Glyph name="check-circle" size={13} strokeWidth={2} /> : <span className="dx-status-dot" aria-hidden="true" />}
      {status}
    </span>
  );
}

function Logo({ o, size }: { o: Org; size: "card" | "modal" }) {
  return (
    <span className={`dx-logo ${size}`}>
      {o.logo ? (
        <Image src={o.logo} alt={`${o.name} logo`} fill sizes={size === "card" ? "260px" : "180px"} />
      ) : (
        <span className="dx-logo-mono" aria-hidden="true">
          {o.name.slice(0, 2).toUpperCase()}
        </span>
      )}
    </span>
  );
}

export default function DirectoryExplorer({ orgs }: { orgs: Org[] }) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState(ALL_COUNTRIES);
  const [family, setFamily] = useState<ProgramFamily | null>(null);
  const [status, setStatus] = useState<StatusFilter>("Accredited");
  // How many cards are revealed, keyed to the filters so any change starts from the top.
  const [paging, setPaging] = useState({ key: "", count: PAGE });
  const [active, setActive] = useState<Org | null>(null);
  const [flipped, setFlipped] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const index = useMemo(
    () => orgs.map((o) => ({ o, text: haystack(o), fams: families(o), status: orgStatus(o) })),
    [orgs]
  );

  const countries = useMemo(
    () => [ALL_COUNTRIES, ...Array.from(new Set(orgs.map((o) => o.country))).sort((a, b) => a.localeCompare(b))],
    [orgs]
  );

  // Programs with nothing under the current status filter are disabled, so a chip never leads to an empty list.
  const familyCounts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const r of index) {
      if (status !== "All" && r.status !== status) continue;
      for (const f of r.fams) c[f] = (c[f] ?? 0) + 1;
    }
    return c;
  }, [index, status]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return index
      .filter((r) => status === "All" || r.status === status)
      .filter((r) => country === ALL_COUNTRIES || r.o.country === country)
      .filter((r) => !family || r.fams.has(family))
      .filter((r) => !q || r.text.includes(q))
      .map((r) => r.o)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [index, query, country, family, status]);

  const filterKey = `${query}|${country}|${family}|${status}`;
  const shown = paging.key === filterKey ? paging.count : PAGE;

  const hasFilters = query !== "" || country !== ALL_COUNTRIES || family !== null || status !== "Accredited";

  function reset() {
    setQuery("");
    setCountry(ALL_COUNTRIES);
    setFamily(null);
    setStatus("Accredited");
  }

  // Dialog: lock scroll, close on Escape, focus the close button, restore focus on close.
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
      lastTrigger.current?.focus();
    };
  }, [active]);

  const familyLabel = PROGRAM_FAMILIES.find((f) => f.id === family)?.label;
  const visible = filtered.slice(0, shown);

  return (
    <div className="dx">
      <div className="dx-tools reveal">
        <div className="dx-search">
          <Glyph name="search" size={18} />
          <input
            type="search"
            placeholder="Search name, city or accreditation no."
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
          <Glyph name="globe" size={16} />
          <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label="Filter by country">
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <span className="dx-caret" aria-hidden="true" />
        </div>

        <div className="dx-seg" role="group" aria-label="Filter by status">
          {STATUSES.map((s) => (
            <button
              type="button"
              key={s}
              className={status === s ? "on" : undefined}
              aria-pressed={status === s}
              onClick={() => setStatus(s)}
            >
              {s === "All" ? "All statuses" : s}
            </button>
          ))}
        </div>
      </div>

      <div className="dx-chips reveal" role="group" aria-label="Filter by accreditation program">
        <span className="dx-chips-label">Accredited as</span>
        <button type="button" className={"dx-chip" + (family === null ? " on" : "")} aria-pressed={family === null} onClick={() => setFamily(null)}>
          All programs
        </button>
        {PROGRAM_FAMILIES.map((f) => (
          <button
            type="button"
            key={f.id}
            className={"dx-chip" + (family === f.id ? " on" : "")}
            aria-pressed={family === f.id}
            onClick={() => setFamily((cur) => (cur === f.id ? null : f.id))}
            disabled={!familyCounts[f.id]}
          >
            <Glyph name={FAMILY_ICON[f.id]} size={14} strokeWidth={1.9} /> {f.label}
          </button>
        ))}
      </div>

      <div className="dx-meta reveal" aria-live="polite">
        <span>
          Organizations
          {status !== "All" && <> · {status.toLowerCase()}</>}
          {familyLabel && <> · {familyLabel.toLowerCase()}</>}
          {country !== ALL_COUNTRIES && <> · {country}</>}
          {query && <> · matching “{query}”</>}
        </span>
        {hasFilters && (
          <button type="button" className="dx-reset" onClick={reset}>
            Reset all filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="dx-empty">
          <Glyph name="search" size={30} />
          <h3>No organizations match those filters</h3>
          <p>
            Try another search term, country or status — or{" "}
            <Link href={CONTACT.formHref}>ask AAA to verify a listing</Link>.
          </p>
        </div>
      ) : (
        <>
          <ul className="dx-grid">
            {visible.map((o) => {
              const st = orgStatus(o);
              const key = `${o.name}-${o.location}`;
              const art = o.flag || countryArt(o.country);
              return (
                <li key={key}>
                  {/* White front (logo, name, location); on hover or focus the country
                      artwork slides up with the organization's own description. Touch
                      screens have no hover, so a tap slides it up instead. */}
                  <article
                    className={"dx-flip" + (st === "Accredited" ? "" : " is-held") + (flipped === key ? " is-flipped" : "")}
                    onClick={() => setFlipped((cur) => (cur === key ? null : key))}
                  >
                    <div className="dx-flip-inner">
                      <div className="dx-face dx-front">
                        <Logo o={o} size="card" />
                        <span className="dx-rule" aria-hidden="true" />
                        <h3>{o.name}</h3>
                        <p className="dx-loc">
                          <Glyph name="pin" size={13} strokeWidth={2} /> {o.location}
                        </p>
                        {st !== "Accredited" && <StatusPill status={st} />}
                      </div>
                      <div className={"dx-face dx-back" + (art ? "" : " no-art")}>
                        {art && <Image className="dx-back-art" src={art} alt="" fill sizes="(max-width: 720px) 92vw, 300px" />}
                        <div className="dx-back-body">
                          <p className="dx-desc">
                            {o.description || `${o.name} is accredited by AAA. Open the record for its accreditation details.`}
                          </p>
                          <button
                            type="button"
                            className="ax-btn ax-btn-white sm dx-open"
                            aria-haspopup="dialog"
                            onClick={(e) => {
                              e.stopPropagation();
                              lastTrigger.current = e.currentTarget;
                              setActive(o);
                            }}
                          >
                            Learn More <Glyph name="arrow-right" size={14} strokeWidth={2} />
                            <span className="sr-only"> about {o.name}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

          {filtered.length > shown && (
            <div className="dx-pager">
              <p>
                Showing {visible.length} of {filtered.length}
              </p>
              <button type="button" className="ax-btn ax-btn-ghost-navy" onClick={() => setPaging({ key: filterKey, count: shown + PAGE })}>
                Show more organizations <Glyph name="plus" size={14} strokeWidth={2} />
              </button>
            </div>
          )}
        </>
      )}

      {active && (
        <div className="dx-modal" role="dialog" aria-modal="true" aria-labelledby="dx-modal-title" onClick={() => setActive(null)}>
          <div className="dx-modal-card" onClick={(e) => e.stopPropagation()}>
            <button ref={closeRef} className="dx-modal-x" onClick={() => setActive(null)} aria-label="Close">
              ×
            </button>

            <div className="dx-modal-head">
              <Logo o={active} size="modal" />
              <div>
                <StatusPill status={orgStatus(active)} />
                <h2 id="dx-modal-title">{active.name}</h2>
                <p className="dx-loc">
                  <Glyph name="pin" size={14} strokeWidth={2} /> {active.location}
                  {!active.location.includes(active.country) && <> · {active.country}</>}
                </p>
              </div>
            </div>

            {active.description && <p className="dx-modal-desc">{active.description}</p>}

            <div className="dx-records">
              <div className="dx-record-h">
                <Glyph name="shield-check" size={14} strokeWidth={2} />
                {active.accreditations.length === 1
                  ? "Accreditation record"
                  : `${active.accreditations.length} accreditation records`}
              </div>
              {active.accreditations.map((a) => (
                <div className={`dx-record${a.status === "Accredited" ? "" : " is-held"}`} key={a.number + a.accreditedAs}>
                  <div className="dx-record-top">
                    <span className="dx-record-type">{typeLabel(a)}</span>
                    <StatusPill status={a.status} />
                  </div>
                  <dl>
                    <div>
                      <dt>Accredited as</dt>
                      <dd>{a.accreditedAs}</dd>
                    </div>
                    <div>
                      <dt>Accreditation no.</dt>
                      <dd className="dx-num">{a.number}</dd>
                    </div>
                    <div>
                      <dt>Scope</dt>
                      <dd>{a.scope}</dd>
                    </div>
                    <div>
                      <dt>Valid until</dt>
                      <dd>{a.expiry}</dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>

            <p className="dx-modal-note">
              Status is shown as published in the AAA register. To confirm the current scope, validity
              or status of any listing, contact AAA with the accreditation number.
            </p>

            <div className="dx-modal-actions">
              <Link href={CONTACT.formHref} className="ax-btn ax-btn-blue sm">
                Verify this listing <Glyph name="arrow-right" size={14} strokeWidth={2} />
              </Link>
              <Link href={CONTACT.quoteHref} className="ax-btn ax-btn-ghost-navy sm">
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
