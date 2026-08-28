"use client";

import { useState } from "react";

// Photos are hosted on the AAA healthcare subdomain (not in this repo), so
// they are rendered with a plain <img> — next/image would need a
// remotePatterns entry for that host. Each tile falls back to a branded
// placeholder if the remote file is unavailable.
const BASE = "https://healthcare.aaa-accreditation.org/images/";

const ITEMS: { file: string; cap: string }[] = [
  { file: "gallery-1.jpeg", cap: "Accreditation assessment" },
  { file: "gallery-2.jpeg", cap: "On-site evaluation" },
  { file: "gallery-5.jpeg", cap: "Certification ceremony" },
  { file: "gallery-6.jpeg", cap: "Partner engagement" },
  { file: "gallery-7.jpeg", cap: "Assessor training" },
  { file: "gallery-8.jpeg", cap: "Global recognition" },
];

function GalleryItem({ file, cap }: { file: string; cap: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="hx-gal-item">
      {failed ? (
        <div className="hx-gal-ph" aria-hidden="true">
          <b>AAA</b>
          <span>{cap}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={BASE + file}
          alt={`AAA accreditation — ${cap}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      <figcaption className="hx-gal-cap">{cap}</figcaption>
    </figure>
  );
}

export default function HomeGallery() {
  return (
    <div className="hx-gal reveal">
      {ITEMS.map((it) => (
        <GalleryItem key={it.file} file={it.file} cap={it.cap} />
      ))}
    </div>
  );
}
