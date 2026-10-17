"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated figure for stat strips. Accepts the display strings from
 * lib/facts.ts ("59+", "20,162", "287") and counts up to them once scrolled
 * into view; anything non-numeric ("Multiple", "Virginia, USA") renders as-is.
 * Server-renders the final value, so no-JS and reduced-motion users see it.
 */
export default function Stat({
  value,
  duration = 1500,
  countOnLoad = false,
}: {
  value: string | number;
  duration?: number;
  /** Count up even when already on screen at page load (hero stat strips, whose row fades in after a delay). */
  countOnLoad?: boolean;
}) {
  const s = String(value);
  const m = s.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(s);

  useEffect(() => {
    if (!m || !ref.current) return;
    const [, prefix, num, suffix] = m;
    const target = Number(num.replace(/,/g, ""));
    const grouped = num.includes(",");
    if (!Number.isFinite(target) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fmt = (n: number) => prefix + (grouped ? Math.round(n).toLocaleString("en-US") : Math.round(n)) + suffix;
    let raf = 0;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    if (!countOnLoad && rect.top < window.innerHeight && rect.bottom > 0) return; // already visible on load: leave the final value
    // The real value stays rendered until the figure enters view, so it can
    // never get stuck at 0 if the observer doesn't fire.
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        setDisplay(fmt(0));
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          setDisplay(fmt(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s, duration, countOnLoad]);

  return <span ref={ref}>{display}</span>;
}
