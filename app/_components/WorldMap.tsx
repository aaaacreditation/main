"use client";

import { useRef, useState } from "react";
import worldData from "./world-map-data.json";

type Country = { name: string; d: string; cx: number; cy: number };

const DATA = worldData as { width: number; height: number; countries: Country[] };

// Countries with AAA accreditation activity — shown in brand blue with an
// animated marker. Names must match the Natural Earth names in
// world-map-data.json (e.g. "United States of America", "Dominican Rep.").
const ACCREDITED = new Set<string>([
  // Americas
  "Canada",
  "United States of America",
  "Mexico",
  "Dominican Rep.",
  "Trinidad and Tobago",
  "Guyana",
  "Brazil",
  "Argentina",
  // Europe
  "United Kingdom",
  "Portugal",
  "Spain",
  "Germany",
  "Poland",
  "Czechia",
  "Austria",
  "Hungary",
  "Italy",
  "Serbia",
  "Romania",
  "Bulgaria",
  "Greece",
  // Middle East
  "Turkey",
  "Cyprus",
  "Lebanon",
  "Jordan",
  "Iraq",
  "Kuwait",
  "Saudi Arabia",
  "Qatar",
  "United Arab Emirates",
  "Oman",
  "Yemen",
  // Africa
  "Morocco",
  "Algeria",
  "Tunisia",
  "Libya",
  "Egypt",
  "Sudan",
  "Ghana",
  "Nigeria",
  "Ethiopia",
  "Somalia",
  "Kenya",
  "Dem. Rep. Congo",
  "Zambia",
  "Namibia",
  "Botswana",
  "South Africa",
  // Central & South Asia
  "Russia",
  "Kazakhstan",
  "Uzbekistan",
  "Kyrgyzstan",
  "Azerbaijan",
  "Mongolia",
  "Pakistan",
  "India",
  "Bangladesh",
  // Southeast Asia
  "Malaysia",
  "Indonesia",
  "Philippines",
]);

/**
 * The interactive map itself — SVG, hover tooltip and (optional) legend — with
 * no section chrome. Embed this where you need just the map (e.g. inside a card
 * on the home page). For the standalone "Countries We Operate" section, use the
 * default <WorldMap /> below.
 */
export function WorldMapFigure({ showLegend = true }: { showLegend?: boolean }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const tipRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string | null>(null);

  // Tooltip follows the pointer via direct DOM writes so the 176 country
  // paths only re-render when the hovered country changes.
  const positionTip = (e: React.PointerEvent) => {
    const wrap = wrapRef.current;
    const tip = tipRef.current;
    if (!wrap || !tip) return;
    const r = wrap.getBoundingClientRect();
    tip.style.left = `${e.clientX - r.left}px`;
    tip.style.top = `${e.clientY - r.top}px`;
  };

  const activate = (e: React.PointerEvent, name: string) => {
    positionTip(e);
    setActive(name);
  };

  const markers = DATA.countries.filter((c) => ACCREDITED.has(c.name));

  return (
    <>
      <div
        className="wm-wrap"
        ref={wrapRef}
        onPointerMove={positionTip}
        onPointerLeave={() => setActive(null)}
      >
        <svg
          className="wm-svg"
          viewBox={`0 0 ${DATA.width} ${DATA.height}`}
          role="img"
          aria-label="World map highlighting the countries where AAA operates"
        >
          {DATA.countries.map((c) => (
            <path
              key={c.name}
              d={c.d}
              className={`wm-country${ACCREDITED.has(c.name) ? " on" : ""}${
                active === c.name ? " hot" : ""
              }`}
              onPointerEnter={(e) => activate(e, c.name)}
            />
          ))}
          {markers.map((c, i) => (
            <g
              key={c.name}
              className="wm-marker"
              style={{ "--wm-delay": `${(i % 8) * 0.35}s` } as React.CSSProperties}
              onPointerEnter={(e) => activate(e, c.name)}
            >
              <circle className="halo" cx={c.cx} cy={c.cy} r={7} />
              <circle className="dot" cx={c.cx} cy={c.cy} r={4} />
            </g>
          ))}
        </svg>
        <div ref={tipRef} className={`wm-tip${active ? " show" : ""}`} aria-hidden={!active}>
          <strong>{active}</strong>
          <span className={`sub${active && ACCREDITED.has(active) ? " on" : ""}`}>
            {active && ACCREDITED.has(active) ? "AAA accredited presence" : "No AAA presence yet"}
          </span>
        </div>
      </div>
      {showLegend && (
        <div className="wm-legend">
          <span>
            <i className="sw on" /> Countries with AAA accreditation
          </span>
          <span>
            <i className="sw" /> Not yet covered
          </span>
        </div>
      )}
    </>
  );
}

export default function WorldMap({ eyebrow = "Global reach" }: { eyebrow?: string }) {
  return (
    <section className="block wm-block">
      <div className="container">
        <div className="block-head reveal">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-heading">Countries We Operate</h2>
          </div>
        </div>
        <div className="reveal">
          <WorldMapFigure />
        </div>
      </div>
    </section>
  );
}
