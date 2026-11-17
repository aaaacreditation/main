"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export type Testimonial = {
  org: string;
  country: string;
  theme: string;
  quote: string;
  note?: string;
  video: string;
  image: string;
  alt: string;
  /** The full case study, when there is one. */
  href?: string;
};

/**
 * Section 07 — three video testimonials. Each real-photo thumbnail (and its
 * "Watch Their Story" link) plays the YouTube video in place, in the card's
 * own 16:10 frame — the same click-to-play pattern as the Landmark story on
 * the TEPA page (Nov 2026 client feedback: the earlier pop-up player opened
 * in only part of the window). Starting one video stops any other, and no
 * YouTube code loads until a visitor presses play.
 */
export default function HcTestimonials({ items }: { items: Testimonial[] }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const frames = useRef(new Map<string, HTMLDivElement>());

  const play = (t: Testimonial, fromLink = false) => {
    setPlaying(t.video);
    // From the text link, bring the player into view (it sits above the copy).
    if (fromLink) frames.current.get(t.video)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <div className="hcx-testi-grid">
      {items.map((t) => (
        <article key={t.video} className="ax-card navy ax-blue hcx-testi">
          <div
            className="hcx-testi-thumb"
            ref={(el) => {
              if (el) frames.current.set(t.video, el);
              else frames.current.delete(t.video);
            }}
          >
            {playing === t.video ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${t.video}?autoplay=1&rel=0`}
                title={`${t.org} — AAA healthcare accreditation testimonial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                className="hcx-testi-play"
                onClick={() => play(t)}
                aria-label={`Play video testimonial: ${t.org}, ${t.country}`}
              >
                <Image src={t.image} alt={t.alt} fill sizes="(max-width: 860px) 92vw, 380px" />
                <span className="hcx-play" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            )}
          </div>
          <div className="hcx-testi-body">
            <div className="hcx-testi-org">
              <h3>{t.org}</h3>
              <span>{t.country}</span>
            </div>
            <span className="ax-blue-tag">{t.theme}</span>
            <blockquote>{t.quote}</blockquote>
            {t.note && <p className="hcx-testi-note">{t.note}</p>}
            <div className="hcx-testi-links">
              <button type="button" className="hcx-testi-link" onClick={() => play(t, true)}>
                Watch Their Story <span aria-hidden="true">→</span>
              </button>
              {t.href && (
                <Link href={t.href} className="hcx-testi-link">
                  Read the Case Study <span aria-hidden="true">→</span>
                </Link>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
