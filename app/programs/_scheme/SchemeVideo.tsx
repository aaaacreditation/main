"use client";

import { useState } from "react";

/**
 * Click-to-play YouTube facade for the scheme testimonials. Shows YouTube's
 * poster frame with a play button and only mounts the privacy-enhanced player
 * (youtube-nocookie.com, autoplay after the click) once the visitor asks.
 */
export default function SchemeVideo({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="schx-video">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button type="button" className="schx-video" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube poster, not worth an images.remotePatterns entry */}
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" />
      <span className="schx-video-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="schx-video-label">Watch the video</span>
    </button>
  );
}
