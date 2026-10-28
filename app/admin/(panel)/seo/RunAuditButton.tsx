"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/** Starts a crawl (POST /api/admin/seo/audit) and refreshes the page when it ends. */
export default function RunAuditButton({ alreadyRunning = false }: { alreadyRunning?: boolean }) {
  const router = useRouter();
  const [scope, setScope] = useState<"core" | "all">("core");
  const [busy, setBusy] = useState(false);
  const [startedAt, setStartedAt] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!busy) return;
    const id = window.setInterval(() => setElapsed(Math.round((Date.now() - startedAt) / 1000)), 1000);
    return () => window.clearInterval(id);
  }, [busy, startedAt]);

  const start = async () => {
    setBusy(true);
    setError("");
    setElapsed(0);
    setStartedAt(Date.now());
    try {
      const res = await fetch("/api/admin/seo/audit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ scope }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) setError(data.error || `The audit couldn't run (error ${res.status}).`);
    } catch {
      setError("The connection dropped while the audit was running. It may still finish — refresh this page in a minute.");
    } finally {
      setBusy(false);
      router.refresh();
    }
  };

  const mins = Math.floor(elapsed / 60);
  const secs = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="seo-run">
      <div className="seo-run-row">
        <label>
          Pages to check
          <select
            className="sme-select"
            value={scope}
            onChange={(e) => setScope(e.target.value === "all" ? "all" : "core")}
            disabled={busy}
          >
            <option value="core">Site pages + the 10 newest articles (recommended)</option>
            <option value="all">Everything in the sitemap, every article (slower)</option>
          </select>
        </label>
        <button type="button" className="btn btn-primary adm-btn" onClick={start} disabled={busy || alreadyRunning} aria-busy={busy}>
          {busy ? "Crawling…" : "Run new audit"}
        </button>
      </div>
      {busy ? (
        <p className="seo-run-status" role="status">
          Crawling… this can take a few minutes. Keep this tab open. ({mins}:{secs})
        </p>
      ) : alreadyRunning ? (
        <p className="seo-run-status" role="status">An audit is already running — refresh in a minute to see the results.</p>
      ) : null}
      {error ? <p className="adm-error" role="alert">{error}</p> : null}
    </div>
  );
}
