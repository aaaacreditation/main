"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/*
 * The map's width/height ratio (world-map-data.json is drawn on a 980 × 520
 * viewBox). The placeholder keeps exactly this space, so nothing moves when
 * the map arrives.
 */
const RATIO = "980 / 520";

const WorldMapInteractive = dynamic(() => import("./WorldMapInteractive"), {
  ssr: false,
  loading: () => <div className="wm-wrap"><div style={{ aspectRatio: RATIO }} /></div>,
});

/**
 * The map with its (optional) legend and no section chrome — embed this where
 * you need just the map (e.g. inside a card on the home page). For the
 * standalone "Countries We Operate" section, use the default <WorldMap />.
 *
 * Nov 2026 (speed): the map is decorative and sits below the fold, so it is
 * fetched only when it comes within ~600px of the viewport.
 */
export function WorldMapFigure({ showLegend = true }: { showLegend?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={ref}>
        {near ? <WorldMapInteractive /> : <div className="wm-wrap"><div style={{ aspectRatio: RATIO }} /></div>}
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
