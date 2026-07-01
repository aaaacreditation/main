"use client";

import { useRef, useState } from "react";

/** Cover/hero image picker: upload to /api/admin/upload or paste a URL. */
export default function ImageField({
  name,
  label,
  initial = "",
}: {
  name: string;
  label: string;
  initial?: string;
}) {
  const [url, setUrl] = useState(initial);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    setBusy(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      if (!res.ok) {
        alert("Upload failed — check the file type/size.");
        return;
      }
      const data = (await res.json()) as { url: string };
      setUrl(data.url);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="adm-imgfield">
      <span className="adm-label">{label}</span>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="adm-imgfield-preview" />
      ) : (
        <div className="adm-imgfield-empty">No image selected</div>
      )}
      <div className="adm-imgfield-row">
        <button
          type="button"
          className="btn btn-ghost adm-btn-sm"
          onClick={() => fileRef.current?.click()}
          disabled={busy}
        >
          {busy ? "Uploading…" : "Upload image"}
        </button>
        {url ? (
          <button type="button" className="adm-danger-link" onClick={() => setUrl("")}>
            Remove
          </button>
        ) : null}
      </div>
      <input
        className="sme-input adm-imgfield-url"
        type="text"
        placeholder="…or paste an image URL"
        value={url}
        onChange={(e) => setUrl(e.target.value.trim())}
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void upload(f);
          e.target.value = "";
        }}
      />
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
