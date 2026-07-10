"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "../_components/Icon";

/**
 * Generic scroll-snap carousel. Receives already-rendered slide cards as
 * children (from the server component) and provides prev/next controls plus
 * position dots. Used for both the leadership and success-story rails.
 */
export default function AboutCarousel({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const step = () => {
    const first = trackRef.current?.firstElementChild as HTMLElement | undefined;
    const second = trackRef.current?.children[1] as HTMLElement | undefined;
    if (!first) return 0;
    // gap-aware step: distance between two slide left edges, else card width.
    if (second) return second.offsetLeft - first.offsetLeft;
    return first.offsetWidth;
  };

  const sync = useCallback(() => {
    const el = trackRef.current;
    const s = step();
    if (!el || !s) return;
    setPage(Math.round(el.scrollLeft / s));
    setPages(Math.max(1, Math.round((el.scrollWidth - el.clientWidth) / s) + 1));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = pages - 1;
    const clamped = Math.max(0, Math.min(i, max));
    el.scrollTo({ left: clamped * step(), behavior: "smooth" });
  };

  return (
    <div className="abx-car">
      <div className="abx-car-track" ref={trackRef} aria-label={label}>
        {children}
      </div>
      <div className="abx-car-nav">
        <button
          type="button"
          className="abx-car-btn"
          aria-label="Previous"
          disabled={page <= 0}
          onClick={() => goTo(page - 1)}
        >
          <Icon name="arrow" size={18} className="flip" strokeWidth={2} />
        </button>
        <div className="abx-car-dots" role="tablist" aria-label="Carousel position">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === page}
              aria-label={`Go to slide ${i + 1}`}
              className={`abx-car-dot${i === page ? " on" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="abx-car-btn"
          aria-label="Next"
          disabled={page >= pages - 1}
          onClick={() => goTo(page + 1)}
        >
          <Icon name="arrow" size={18} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
