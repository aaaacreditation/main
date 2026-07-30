"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
};

export default function CountUp({ value, prefix = "", suffix = "", decimals = 0, duration = 1400 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(() => prefix + (0).toFixed(decimals) + suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finish = () => setDisplay(prefix + value.toFixed(decimals) + suffix);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        obs.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(prefix + (value * eased).toFixed(decimals) + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, prefix, suffix, decimals, duration]);

  return <span ref={ref}>{display}</span>;
}
