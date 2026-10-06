"use client";

import { useState } from "react";

/**
 * Click-to-play YouTube facade for the healthcare explainer (Section 02).
 * Nothing from YouTube's player loads until the visitor presses play; the
 * privacy-enhanced embed is used and it never autoplays on page load.
 */
export default function HcVideo({ id, title, label }: { id: string; title: string; label?: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="hcx-video">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button type="button" className="hcx-video-btn" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube poster frame; i.ytimg.com is not an allowed next/image host */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
          <span className="hcx-play" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {label && <span className="hcx-video-label">{label}</span>}
        </button>
      )}
    </div>
  );
}
