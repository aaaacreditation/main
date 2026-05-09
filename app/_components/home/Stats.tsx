"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1800) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.floor(eased * target));
              if (p < 1) requestAnimationFrame(tick);
              else setVal(target);
            };
            requestAnimationFrame(tick);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [target, duration]);
  return { ref, val };
}

function StatNum({ value, suffix }: { value: number; suffix: string }) {
  const { ref, val } = useCountUp(value);
  return (
    <div className="num" ref={ref}>
      {val.toLocaleString()}
      <span className="suffix">{suffix}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="stats-block">
      <div className="container">
        <div className="stats-inner">
          <div className="reveal">
            <span className="eyebrow">AAA in numbers</span>
            <h2>Measurable, transparent, and updated quarterly.</h2>
          </div>
          <div>
            <div className="stats-grid">
              <div className="stat reveal">
                <StatNum value={12400} suffix="+" />
                <div className="lbl">Accredited certificates</div>
              </div>
              <div className="stat reveal" style={{ transitionDelay: "120ms" }}>
                <StatNum value={62} suffix="" />
                <div className="lbl">Countries we operate in</div>
              </div>
              <div className="stat reveal" style={{ transitionDelay: "240ms" }}>
                <StatNum value={180} suffix="+" />
                <div className="lbl">Active assessors</div>
              </div>
              <div className="stats-caption">Updated quarterly · As of Q1 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
