"use client";

import { useRef, useState } from "react";
import worldData from "./world-map-data.json";

type Country = { name: string; d: string; cx: number; cy: number };

const DATA = worldData as { width: number; height: number; countries: Country[] };

// Countries with AAA accreditation activity — shown in brand blue with an
// animated marker. Names must match the Natural Earth names in
// world-map-data.json (e.g. "United States of America", "Czechia").
//
// Oct 2026: replaced with the client's list from the "Website corrections"
// document. Scotland is drawn as part of the United Kingdom; the list's
// duplicate UAE and Georgia rows appear once. Bahrain and Malta are too small
// for the 110m outlines and are marker-only entries (see
// scripts/generate-world-map.mjs).
const ACCREDITED = new Set<string>([
  // Americas
  "Canada",
  "United States of America",
  "Mexico",
  "Panama",
  "Jamaica",
  "Trinidad and Tobago",
  "Guyana",
  "Suriname",
  "Brazil",
  "Uruguay",
  // Europe
  "United Kingdom",
  "Portugal",
  "Spain",
  "France",
  "Switzerland",
  "Germany",
  "Italy",
  "Malta",
  "Poland",
  "Czechia",
  "Hungary",
  "Turkey",
  "Georgia",
  "Azerbaijan",
  // Middle East
  "Lebanon",
  "Jordan",
  "Iraq",
  "Saudi Arabia",
  "Bahrain",
  "Qatar",
  "United Arab Emirates",
  "Yemen",
  // Africa
  "Morocco",
  "Tunisia",
  "Egypt",
  "Côte d'Ivoire",
  "Ghana",
  "Nigeria",
  "Somalia",
  "Kenya",
  "Angola",
  "Zambia",
  "Namibia",
  "South Africa",
  // Central & South Asia
  "Kazakhstan",
  "Uzbekistan",
  "Mongolia",
  "Pakistan",
  "India",
  "Nepal",
  "Bangladesh",
  // Southeast Asia & Oceania
  "Thailand",
  "Malaysia",
  "Philippines",
  "Australia",
]);

/**
 * The interactive world map (outlines, markers, name tooltip). Loaded by
 * WorldMapFigure only when the map scrolls near the viewport (Nov 2026, speed):
 * its ~120 KB of country outlines are neither in the page HTML nor in the
 * JavaScript every visitor downloads up front. One delegated pointer listener
 * reads `data-c`, which only accredited countries and markers carry
 * (client, Oct 22 2026).
 */
export default function WorldMapInteractive() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const hotRef = useRef<Element | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const markers = DATA.countries.filter((c) => ACCREDITED.has(c.name));

  // The country outline stays highlighted while its marker is hovered too.
  const setHot = (name: string | null) => {
    hotRef.current?.classList.remove("hot");
    const el = name ? wrapRef.current?.querySelector(`path[data-c="${CSS.escape(name)}"]`) ?? null : null;
    el?.classList.add("hot");
    hotRef.current = el;
  };

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const tip = tipRef.current;
    if (wrap && tip) {
      const r = wrap.getBoundingClientRect();
      tip.style.left = `${e.clientX - r.left}px`;
      tip.style.top = `${e.clientY - r.top}px`;
    }
    const name = (e.target as Element).closest?.("[data-c]")?.getAttribute("data-c") ?? null;
    if (name !== active) {
      setActive(name);
      setHot(name);
    }
  };

  return (
    <div
      className="wm-wrap"
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={() => {
        setActive(null);
        setHot(null);
      }}
    >
      <svg
        className="wm-svg"
        viewBox={`0 0 ${DATA.width} ${DATA.height}`}
        role="img"
        aria-label="World map highlighting the countries where AAA operates"
      >
        {DATA.countries.filter((c) => c.d).map((c) =>
          ACCREDITED.has(c.name) ? (
            <path key={c.name} d={c.d} className="wm-country on" data-c={c.name} />
          ) : (
            <path key={c.name} d={c.d} className="wm-country" />
          )
        )}
        {markers.map((c, i) => (
          <g
            key={c.name}
            className="wm-marker"
            data-c={c.name}
            style={{ "--wm-delay": `${(i % 8) * 0.35}s` } as React.CSSProperties}
          >
            <circle className="halo" cx={c.cx} cy={c.cy} r={7} />
            <circle className="dot" cx={c.cx} cy={c.cy} r={4} />
          </g>
        ))}
      </svg>
      <div ref={tipRef} className={`wm-tip${active ? " show" : ""}`} aria-hidden={!active}>
        <strong>{active}</strong>
        <span className="sub on">AAA accredited presence</span>
      </div>
    </div>
  );
}
