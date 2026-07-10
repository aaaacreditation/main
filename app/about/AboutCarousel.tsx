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
    const clamped = Math.max(0, Math.min(i, pages - 1));
    const card = el.children[clamped] as HTMLElement | undefined;
    if (!card) return;
    // optimistic: buttons update the UI immediately; scroll events keep it
    // in sync for touch/drag scrolling.
    setPage(clamped);
    // Chrome's mandatory scroll-snap cancels programmatic smooth scrolls,
    // yanking the track back to the current snap point. Pause snapping for
    // the animation; it re-engages once the scroll settles on the target.
    el.style.scrollSnapType = "none";
    const left =
      el.scrollLeft + card.getBoundingClientRect().left - el.getBoundingClientRect().left;
    const from = el.scrollLeft;
    el.scrollTo({ left, behavior: "smooth" });
    // Some environments silently drop programmatic smooth scrolls (reduced
    // motion, automation, flags). If nothing moved shortly after, jump
    // instantly so the buttons always navigate.
    setTimeout(() => {
      if (Math.abs(el.scrollLeft - from) < 2 && Math.abs(left - from) > 2) {
        el.scrollLeft = left;
      }
    }, 200);
    const restore = () => {
      el.style.scrollSnapType = "";
    };
    // restore is idempotent — scrollend when supported, timeout as safety net
    el.addEventListener("scrollend", restore, { once: true });
    setTimeout(restore, 800);
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
        <div
          className="abx-car-progress"
          aria-hidden="true"
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            goTo(Math.round(((e.clientX - r.left) / r.width) * (pages - 1)));
          }}
        >
          <span
            className="bar"
            style={{ width: `${((page + 1) / pages) * 100}%` }}
          />
        </div>
        <span className="abx-car-count" aria-live="polite">
          {String(page + 1).padStart(2, "0")}
          <i>/</i>
          {String(pages).padStart(2, "0")}
        </span>
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
