"use client";

import { useEffect, useRef } from "react";

export type Stat = { num: string; label: string };

/** Split "200+" into prefix / value / suffix so the number can be animated. */
function parseStat(raw: string) {
  const m = raw.match(/^([^0-9]*)([\d.,]+)(.*)$/);
  if (!m) return { prefix: "", value: 0, suffix: raw, decimals: 0 };
  const value = parseFloat(m[2].replace(/,/g, ""));
  const decimals = (m[2].split(".")[1] || "").length;
  return { prefix: m[1], value, suffix: m[3], decimals };
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Hero metric rail — renders the shared `.ax-stats` primitive and counts each
 * figure up once it scrolls into view. Figures come from lib/facts.ts.
 */
export default function HeroStats({ stats }: { stats: readonly Stat[] }) {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nums = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    if (!nums.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const run = (el: HTMLElement, delay: number) => {
      const { prefix, value, suffix, decimals } = parseStat(el.dataset.count || "");
      if (reduced || !value) {
        el.textContent = el.dataset.count || "";
        return;
      }
      const dur = 1500;
      let start = 0;
      const frame = (now: number) => {
        if (!start) start = now;
        const t = Math.min(1, (now - start - delay) / dur);
        if (t < 0 || Number.isNaN(t)) {
          requestAnimationFrame(frame);
          return;
        }
        el.textContent = `${prefix}${(value * easeOut(t)).toFixed(decimals)}${suffix}`;
        if (t < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          nums.forEach((el, i) => run(el, i * 130));
          obs.disconnect();
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(root);
    return () => obs.disconnect();
  }, []);

  return (
    <ul className="ax-stats three" ref={ref} aria-label="AAA at a glance">
      {stats.map((s) => (
        <li className="ax-stat" key={s.label}>
          <b data-count={s.num}>{s.num}</b>
          <span>{s.label}</span>
        </li>
      ))}
    </ul>
  );
}
