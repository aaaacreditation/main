"use client";

import { useState } from "react";

const BASE = "https://healthcare.aaa-accreditation.org/images/";

const ITEMS: { file: string; cap: string }[] = [
  { file: "gallery-1.jpeg", cap: "Accreditation Assessment" },
  { file: "gallery-2.jpeg", cap: "On-Site Evaluation" },
  { file: "gallery-5.jpeg", cap: "Certification Ceremony" },
  { file: "gallery-6.jpeg", cap: "Partner Engagement" },
  { file: "gallery-7.jpeg", cap: "Surveyor Training" },
  { file: "gallery-8.jpeg", cap: "Global Recognition" },
];

function GalleryItem({ file, cap }: { file: string; cap: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="sme-gallery-item">
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={BASE + file}
          alt={`AAA accreditation — ${cap}`}
          loading="lazy"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="sme-gallery-ph" aria-hidden="true">
          <span className="mark">AAA</span>
          <span>{cap}</span>
        </div>
      )}
      <figcaption className="sme-gallery-cap">{cap}</figcaption>
    </figure>
  );
}

export default function HomeGallery() {
  return (
    <div className="sme-gallery-grid reveal">
      {ITEMS.map((it) => (
        <GalleryItem key={it.file} file={it.file} cap={it.cap} />
      ))}
    </div>
  );
}
