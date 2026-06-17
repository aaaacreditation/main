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
            <h2>Accreditation built on internationally recognized standards.</h2>
          </div>
          <div>
            <div className="stats-grid">
              <div className="stat reveal">
                <StatNum value={12} suffix="" />
                <div className="lbl">Accreditation programs</div>
              </div>
              <div className="stat reveal" style={{ transitionDelay: "120ms" }}>
                <StatNum value={8} suffix="" />
                <div className="lbl">International standards applied</div>
              </div>
              <div className="stat reveal" style={{ transitionDelay: "240ms" }}>
                <StatNum value={6} suffix="" />
                <div className="lbl">International partner organizations</div>
              </div>
              <div className="stats-caption">As of June 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
