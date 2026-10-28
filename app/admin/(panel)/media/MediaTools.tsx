"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

/** Multi-file uploader for the media library (posts to /api/admin/upload). */
export function MediaUploader() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");

  const upload = async (files: FileList) => {
    const list = Array.from(files);
    let failed = 0;
    for (const [i, file] of list.entries()) {
      setStatus(`Uploading ${i + 1} of ${list.length}…`);
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body }).catch(() => null);
      if (!res?.ok) failed++;
    }
    setStatus(failed ? `${failed} file${failed === 1 ? "" : "s"} failed (max 4 MB; JPG, PNG, WebP, GIF, SVG or PDF).` : "");
    router.refresh();
  };

  return (
    <div className="adm-topbar-actions">
      {status ? <span className="adm-topbar-sub" role="status">{status}</span> : null}
      <button type="button" className="btn btn-primary adm-btn" onClick={() => fileRef.current?.click()}>
        + Upload files
      </button>
      <input
        ref={fileRef}
        type="file"
        multiple
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf"
        onChange={(e) => {
          if (e.target.files?.length) void upload(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/** Copies a media URL (absolute) to the clipboard. */
export function CopyUrlButton({ url }: { url: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className="adm-linkbtn"
      onClick={async () => {
        await navigator.clipboard.writeText(new URL(url, window.location.origin).toString()).catch(() => null);
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
    >
      {done ? "Copied ✓" : "Copy URL"}
    </button>
  );
}
