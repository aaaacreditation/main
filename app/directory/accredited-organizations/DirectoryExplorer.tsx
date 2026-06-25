"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Icon from "../../_components/Icon";

export type Accreditation = {
  accreditedAs: string;
  number: string;
  scope: string;
  expiry: string;
  status: string;
};

export type Org = {
  name: string;
  location: string;
  country: string;
  description?: string;
  accreditation?: Accreditation;
  /** Optional per-organization artwork; falls back to a category image. */
  image?: string;
  /** Optional logo image; falls back to a monogram of the org name. */
  logo?: string;
};

const ALL = "All countries";

function initials(name: string): string {
  const words = name
    .replace(/[^A-Za-z0-9 &]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const letters = words.slice(0, 2).map((w) => w[0]).join("");
  return (letters || name.slice(0, 2)).toUpperCase();
}

/** Pick a thematic background when an organization has no bespoke image. */
const CATEGORY_IMAGES: { test: RegExp; src: string }[] = [
  {
    test: /health|medic|clinic|hospital|wellness|aesthet|pain|dental|nursing|pharma|psycholog|therap|rheumat|radiolog|injector/i,
    src: "/home/healthcare.jpg",
  },
  {
    test: /certif|conformit|inspect|laborator|testing|quality|iso\b|registrar|survey|metrolog|calibrat|standard|assessment|forensic/i,
    src: "/home/conformity.jpg",
  },
];

function bgFor(o: Org): string {
  if (o.image) return o.image;
  const hay = `${o.name} ${o.description ?? ""}`;
  for (const c of CATEGORY_IMAGES) if (c.test.test(hay)) return c.src;
  return "/home/training.jpg";
}

export default function DirectoryExplorer({ orgs }: { orgs: Org[] }) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState(ALL);
  const [onlyRecord, setOnlyRecord] = useState(false);
  const [active, setActive] = useState<Org | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const countries = useMemo(
    () => [ALL, ...Array.from(new Set(orgs.map((o) => o.country))).sort((a, b) => a.localeCompare(b))],
    [orgs]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orgs
      .filter((o) => country === ALL || o.country === country)
      .filter((o) => !onlyRecord || !!o.accreditation)
      .filter(
        (o) =>
          !q ||
          `${o.name} ${o.location} ${o.country} ${o.description ?? ""}`.toLowerCase().includes(q)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [orgs, query, country, onlyRecord]);

  const hasFilters = query !== "" || country !== ALL || onlyRecord;

  function reset() {
    setQuery("");
    setCountry(ALL);
    setOnlyRecord(false);
  }

  // Modal: lock scroll, close on Escape, move focus to the close button.
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
    <div className="dirx">
      <div className="dirx-controls reveal">
        <div className="dirx-search">
          <Icon name="search" size={18} />
          <input
            type="text"
            placeholder="Search organizations, locations, keywords…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search accredited organizations"
          />
          {query && (
            <button className="dirx-clear" onClick={() => setQuery("")} aria-label="Clear search">
              ×
            </button>
          )}
        </div>

        <div className="dirx-filters">
          <div className="dirx-select">
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
            <span className="dirx-caret" aria-hidden="true" />
          </div>

          <button
            className={"dirx-toggle" + (onlyRecord ? " on" : "")}
            onClick={() => setOnlyRecord((v) => !v)}
            aria-pressed={onlyRecord}
          >
            <Icon name="shield" size={15} /> Accreditation on record
          </button>
        </div>
      </div>

      <div className="dirx-meta reveal">
        <span>
          <strong>{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "organization" : "organizations"}
          {country !== ALL && <> in {country}</>}
          {query && <> matching “{query}”</>}
        </span>
        {hasFilters && (
          <button className="dirx-reset" onClick={reset}>
            Reset filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="dirx-empty">
          <Icon name="search" size={28} />
          <h3>No organizations found</h3>
          <p>Try a different search term or clear the filters.</p>
        </div>
      ) : (
        <div className="aocard-grid">
          {filtered.map((o) => (
            <article
              className="aocard"
              key={`${o.name}-${o.location}`}
              onClick={() => setActive(o)}
            >
              <div
                className="aocard-media"
                style={{ backgroundImage: `url(${bgFor(o)})` }}
                aria-hidden="true"
              />
              <div className="aocard-shade" aria-hidden="true" />

              <div className="aocard-content">
                {o.accreditation && (
                  <div className="aocard-head">
                    <span className="aocard-badge">
                      <Icon name="shield" size={12} /> Accredited
                    </span>
                  </div>
                )}

                <div className="aocard-body">
                  <h3 className="aocard-name">{o.name}</h3>
                  <p className="aocard-loc">
                    <Icon name="pin" size={14} /> {o.location}
                  </p>

                  <div className="aocard-reveal">
                    <div className="aocard-reveal-inner">
                      {o.description && <p className="aocard-desc">{o.description}</p>}
                      <button
                        className="aocard-cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActive(o);
                        }}
                      >
                        Learn more <Icon name="arrow" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {active && (
        <div
          className="aomodal"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          onClick={() => setActive(null)}
        >
          <div className="aomodal-card" onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeRef}
              className="aomodal-x"
              onClick={() => setActive(null)}
              aria-label="Close"
            >
              ×
            </button>
            <div
              className="aomodal-media"
              style={{ backgroundImage: `url(${bgFor(active)})` }}
              aria-hidden="true"
            />
            <span className="aomodal-logo" aria-hidden="true">
              {active.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={active.logo} alt="" />
              ) : (
                initials(active.name)
              )}
            </span>

            <div className="aomodal-body">
              <h3>{active.name}</h3>
              <p className="aomodal-loc">
                <Icon name="pin" size={15} /> {active.location} · {active.country}
              </p>

              {active.description && <p className="aomodal-desc">{active.description}</p>}

              {active.accreditation && (
                <div className="aomodal-record">
                  <div className="aomodal-record-h">
                    <Icon name="shield" size={14} /> Accreditation on record
                  </div>
                  <dl>
                    <div>
                      <dt>Accredited as</dt>
                      <dd>{active.accreditation.accreditedAs}</dd>
                    </div>
                    <div>
                      <dt>Accred. No.</dt>
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
              )}

              <div className="aomodal-actions">
                <Link href="/quote" className="btn btn-primary">
                  Get a Quote <Icon name="arrow" size={14} className="arrow" />
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Contact AAA
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
