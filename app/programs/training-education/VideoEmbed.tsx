"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Click-to-play YouTube facade. Shows a local poster frame with a pulsing
 * play button and only loads the (privacy-enhanced) YouTube player once the
 * visitor asks for it, so the page carries no third-party script on load.
 */
export default function VideoEmbed({
  id,
  title,
  poster,
  label,
}: {
  id: string;
  title: string;
  poster: string;
  label?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  if (playing) {
    return (
      <iframe
        className="tepx-video-frame"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button type="button" className="tepx-video" onClick={() => setPlaying(true)} aria-label={`Play video: ${title}`}>
      <Image src={poster} alt="" fill sizes="(max-width: 980px) 100vw, 600px" />
      <span className="tepx-video-play" aria-hidden="true">
        {!reduce && (
          <motion.i
            className="tepx-video-ring"
            animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      {label && <span className="tepx-video-label">{label}</span>}
    </button>
  );
}
