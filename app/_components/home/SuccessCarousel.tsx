"use client";

import Image from "next/image";
import { useState } from "react";
import Glyph from "../site/Glyph";

export type SuccessStory = {
  name: string;
  img: string;
  alt: string;
  sector: string;
  country: string;
  metric: string;
  quote: string;
  desc: string;
  href: string;
  featured?: boolean;
};

/**
 * Home "Success Stories" auto-scrolling carousel (client mockup 04, Oct 2026).
 *
 * The track holds the stories twice and slides by -50% on a CSS loop, so it
 * never jumps. Motion pauses on hover and on keyboard focus (CSS), and the
 * Pause / Play button gives everyone a way to stop it (WCAG 2.2.2). The
 * duplicate set is `inert`, so screen readers and Tab only meet each story
 * once. Under prefers-reduced-motion the loop is dropped entirely and the
 * row becomes a native horizontal scroller with snap points (see home.css).
 */
export default function SuccessCarousel({ stories }: { stories: readonly SuccessStory[] }) {
  const [paused, setPaused] = useState(false);

  const group = (clone: boolean) => (
    <ul className="hx-ss-group" inert={clone} aria-hidden={clone || undefined}>
      {stories.map((s) => (
        <li key={s.name} className="hx-ss-item">
          <article className={`ax-card navy ax-blue hx-story${s.featured ? " featured" : ""}`}>
            <figure className="hx-story-media">
              <Image
                src={s.img}
                alt={clone ? "" : s.alt}
                fill
                sizes="(max-width: 650px) 300px, 460px"
                // Load up front: cards slide into view continuously, and lazy
                // loading made each photo pop in late. The duplicate set
                // reuses the same cached files.
                loading="eager"
                fetchPriority="low"
              />
              <span className="hx-story-sector">{s.sector}</span>
              <span className="hx-story-country">
                <Glyph name="pin" size={14} strokeWidth={2} /> {s.country}
              </span>
            </figure>
            <div className="hx-story-body">
              {s.featured && <span className="ax-blue-tag">Featured Story</span>}
              <span className="hx-story-metric">{s.metric}</span>
              <h3>{s.name}</h3>
              <p className="hx-story-quote">{s.quote}</p>
              <p className="hx-story-desc">{s.desc}</p>
              <div className="hx-story-foot">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hx-story-link">
                  Read Story <Glyph name="arrow-right" size={14} strokeWidth={2} />
                  <span className="sr-only"> about {s.name} (opens in a new tab)</span>
                </a>
                <span className="hx-story-badge">
                  <Glyph name="badge-check" size={14} strokeWidth={2} /> Accredited
                </span>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={`hx-ss${paused ? " is-paused" : ""}`}>
      <div
        className="hx-ss-shell"
        role="region"
        aria-roledescription="carousel"
        aria-label="AAA success stories"
        tabIndex={-1}
      >
        <div className="hx-ss-track" style={{ "--hx-ss-dur": `${stories.length * 9}s` } as React.CSSProperties}>
          {group(false)}
          {group(true)}
        </div>
      </div>
      <div className="hx-ss-controls">
        <p className="hx-ss-hint">Carousel pauses on hover.</p>
        <button
          type="button"
          className="hx-ss-toggle"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? (
            <>
              <Glyph name="play" size={14} strokeWidth={2} /> Play stories
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>{" "}
              Pause stories
            </>
          )}
        </button>
      </div>
    </div>
  );
}
