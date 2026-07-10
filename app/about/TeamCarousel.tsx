"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "../_components/Icon";

type Slide = {
  title: string;
  role: string;
  text: string;
  icon?: IconName;
  img?: { src: string; alt: string };
};

const SLIDES: Slide[] = [
  {
    title: "Executive Leadership",
    role: "Governance & Direction",
    text: "Experienced leadership guiding AAA's strategy, impartial governance, and international growth.",
    img: { src: "/about/leadership.jpg", alt: "AAA leadership team" },
  },
  {
    title: "Accreditation Committee",
    role: "Impartial Decisions",
    text: "An independent committee reviews assessment findings and grants accreditation on evidence alone.",
    icon: "scale",
  },
  {
    title: "Qualified Assessors",
    role: "287 Assessors & Experts",
    text: "Sector-experienced assessors who evaluate organizations against recognized standards worldwide.",
    icon: "check",
  },
  {
    title: "Technical Experts",
    role: "Sector Specialists",
    text: "Specialists across healthcare, education, conformity assessment, and enterprise development.",
    icon: "book",
  },
  {
    title: "Advisory Committees",
    role: "Standards & Guidance",
    text: "Advisory committees supporting the development and continual review of AAA requirements.",
    icon: "clipboard",
  },
  {
    title: "International Network",
    role: "57 Countries",
    text: "A worldwide professional network supporting organizations across regions and environments.",
    icon: "globe",
  },
];

const GAP = 24;

export default function TeamCarousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const step = () => {
    const card = trackRef.current?.firstElementChild as HTMLElement | undefined;
    return card ? card.offsetWidth + GAP : 0;
  };

  const sync = useCallback(() => {
    const el = trackRef.current;
    const s = step();
    if (!el || !s) return;
    setPage(Math.round(el.scrollLeft / s));
    setPages(Math.round((el.scrollWidth - el.clientWidth) / s) + 1);
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

  const goTo = (i: number) =>
    trackRef.current?.scrollTo({ left: i * step(), behavior: "smooth" });

  return (
    <div>
      <div className="abx-team-track" ref={trackRef} aria-label="AAA leadership and expertise">
        {SLIDES.map((s) => (
          <article className="abx-team-card" key={s.title}>
            <div className="abx-team-fig">
              {s.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.img.src} alt={s.img.alt} />
              ) : (
                <>
                  <span className="abx-sq" aria-hidden="true" />
                  <span className="emblem" aria-hidden="true">
                    <i>
                      <Icon name={s.icon!} size={34} strokeWidth={1.4} />
                    </i>
                  </span>
                </>
              )}
            </div>
            <div className="abx-team-cap">
              <b>{s.title}</b>
              <small>{s.role}</small>
              <p>{s.text}</p>
            </div>
          </article>
        ))}
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
