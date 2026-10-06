"use client";

import { useEffect, useRef } from "react";
import Glyph, { type GlyphName } from "../site/Glyph";

export type HomeMetric = { value: string; label: string; icon: GlyphName };

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Home hero credibility strip (Oct 2026 client structure): four figures from
 * lib/facts.ts with gold line icons. Unlike the kit's <Stat>, which leaves the
 * final value in place when it is already on screen at load, this strip sits
 * in the first viewport, so it always counts up once it is visible.
 * Server-renders the final figures; reduced-motion users never see the count.
 */
export default function HomeMetrics({ items }: { items: readonly HomeMetric[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    const raf: number[] = [];

    const parts = nums.map((el) => {
      const raw = el.dataset.count || "";
      const m = raw.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
      if (!m) return null;
      return { el, raw, prefix: m[1], target: Number(m[2].replace(/,/g, "")), grouped: m[2].includes(","), suffix: m[3] };
    });
    const fmt = (p: NonNullable<(typeof parts)[number]>, n: number) =>
      p.prefix + (p.grouped ? Math.round(n).toLocaleString("en-US") : String(Math.round(n))) + p.suffix;

    parts.forEach((p) => p && (p.el.textContent = fmt(p, 0)));

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        parts.forEach((p, i) => {
          if (!p) return;
          const delay = i * 140;
          const dur = 1600;
          let t0 = 0;
          const tick = (now: number) => {
            if (!t0) t0 = now;
            const t = Math.min(1, Math.max(0, (now - t0 - delay) / dur));
            p.el.textContent = t >= 1 ? p.raw : fmt(p, p.target * easeOut(t));
            if (t < 1) raf[i] = requestAnimationFrame(tick);
          };
          raf[i] = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(root);
    return () => {
      obs.disconnect();
      raf.forEach((id) => cancelAnimationFrame(id));
      parts.forEach((p) => p && (p.el.textContent = p.raw));
    };
  }, []);

  return (
    <ul className="hx-metrics" ref={ref} aria-label="AAA at a glance">
      {items.map((m) => (
        <li className="hx-metric" key={m.label}>
          <span className="hx-metric-ico" aria-hidden="true">
            <Glyph name={m.icon} />
          </span>
          <span className="hx-metric-copy">
            <b data-count={m.value}>{m.value}</b>
            <span>{m.label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
