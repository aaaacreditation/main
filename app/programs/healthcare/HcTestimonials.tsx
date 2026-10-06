"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export type Testimonial = {
  org: string;
  country: string;
  theme: string;
  quote: string;
  note?: string;
  video: string;
  image: string;
  alt: string;
};

/**
 * Section 07 — three video testimonials. Each real-photo thumbnail (and its
 * "Watch Their Story" link) opens the YouTube video in an on-page modal built
 * on <dialog>: Esc closes it, focus is trapped while open and returned to the
 * button that opened it, and the iframe is torn down on close so audio stops.
 */
export default function HcTestimonials({ items }: { items: Testimonial[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<Testimonial | null>(null);

  const open = (t: Testimonial, el: HTMLElement) => {
    openerRef.current = el;
    setActive(t);
  };

  useEffect(() => {
    if (!active) return;
    const d = dialogRef.current;
    if (d && !d.open) d.showModal();
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [active]);

  const handleClose = useCallback(() => {
    setActive(null);
    const el = openerRef.current;
    openerRef.current = null;
    if (el) requestAnimationFrame(() => el.focus());
  }, []);

  return (
    <>
      <div className="hcx-testi-grid">
        {items.map((t) => (
          <article key={t.video} className="ax-card navy ax-blue hcx-testi">
            <button
              type="button"
              className="hcx-testi-thumb"
              onClick={(e) => open(t, e.currentTarget)}
              aria-label={`Play video testimonial: ${t.org}, ${t.country}`}
            >
              <Image src={t.image} alt={t.alt} fill sizes="(max-width: 860px) 92vw, 380px" />
              <span className="hcx-play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
            <div className="hcx-testi-body">
              <div className="hcx-testi-org">
                <h3>{t.org}</h3>
                <span>{t.country}</span>
              </div>
              <span className="ax-blue-tag">{t.theme}</span>
              <blockquote>{t.quote}</blockquote>
              {t.note && <p className="hcx-testi-note">{t.note}</p>}
              <button type="button" className="hcx-testi-link" onClick={(e) => open(t, e.currentTarget)}>
                Watch Their Story <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="hcx-modal"
        aria-label={active ? `${active.org} accreditation testimonial` : "AAA healthcare accreditation testimonial"}
        onClose={handleClose}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        <div className="hcx-modal-box">
          <button type="button" className="hcx-modal-close" onClick={() => dialogRef.current?.close()} aria-label="Close video">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="hcx-modal-frame">
            {active && (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.video}?autoplay=1&rel=0`}
                title={`${active.org} — AAA healthcare accreditation testimonial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
