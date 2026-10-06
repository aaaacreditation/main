"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Click-to-play YouTube facade for the Lazarus Alliance testimonial. Shows the
 * local poster frame and only loads the privacy-enhanced player once the
 * visitor presses play — no third-party script on page load, no autoplay.
 */
export default function CabVideo({
  id,
  title,
  poster,
  alt,
  label,
  sub,
}: {
  id: string;
  title: string;
  poster: string;
  alt: string;
  label: string;
  sub: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="cabh-video is-playing">
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
    <button type="button" className="cabh-video" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
      <Image src={poster} alt={alt} fill sizes="(max-width: 980px) 100vw, 640px" />
      <span className="cabh-video-play" aria-hidden="true">
        <i />
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="cabh-video-label">
        <strong>{label}</strong>
        <span>{sub}</span>
      </span>
    </button>
  );
}
