"use client";

import { useId, useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * "Speak with an Accreditation Advisor" — the lead form from the client's
 * scheme heroes. Posts to the shared /api/leads endpoint with a per-scheme
 * `source` so enquiries can be filtered in the admin Content Studio.
 */
export default function SchemeAdvisorForm({
  field,
  placeholder,
  sector,
  source,
}: {
  /** Label of the free-text field, e.g. "Testing Activities". */
  field: string;
  placeholder: string;
  sector: string;
  source: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const uid = useId();
  const id = (n: string) => `${uid}-${n}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const country = String(fd.get("country") || "").trim();
    const scope = String(fd.get("scope") || "").trim();

    const payload = {
      contact: String(fd.get("contact") || "").trim(),
      business: String(fd.get("organization") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      sector,
      message: [country && `Country: ${country}`, scope && `${field}:\n${scope}`].filter(Boolean).join("\n\n"),
      source,
      website: String(fd.get("website") || ""), // honeypot
    };

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Something went wrong. Please try again.");
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="schx-form-done" role="status">
        <strong>Request received</strong>
        <p>Thank you. An AAA accreditation advisor will review your request and contact you within two business days.</p>
      </div>
    );
  }

  return (
    <form className="schx-form" onSubmit={onSubmit}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="schx-hp"
      />
      <div className="schx-form-grid">
        <div className="schx-field">
          <label htmlFor={id("contact")}>Full Name</label>
          <input id={id("contact")} name="contact" required autoComplete="name" placeholder="Your name" />
        </div>
        <div className="schx-field">
          <label htmlFor={id("org")}>Organization</label>
          <input id={id("org")} name="organization" required autoComplete="organization" placeholder="Organization name" />
        </div>
        <div className="schx-field">
          <label htmlFor={id("country")}>Country</label>
          <input id={id("country")} name="country" autoComplete="country-name" placeholder="Country" />
        </div>
        <div className="schx-field">
          <label htmlFor={id("email")}>Email</label>
          <input
            id={id("email")}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@organization.com"
          />
        </div>
        <div className="schx-field full">
          <label htmlFor={id("scope")}>{field}</label>
          <textarea id={id("scope")} name="scope" rows={3} placeholder={placeholder} />
        </div>
      </div>
      {status === "error" && (
        <p className="schx-form-err" role="alert">
          {error}
        </p>
      )}
      <button className="ax-btn ax-btn-gold block" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request Information"}
      </button>
    </form>
  );
}
