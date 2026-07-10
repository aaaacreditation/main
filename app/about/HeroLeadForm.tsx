"use client";

import { useState } from "react";

const PROGRAMS = [
  "Training & Education Provider",
  "Healthcare Organization",
  "Certification Body",
  "Inspection Body",
  "Testing Laboratory",
  "SME",
  "Other",
];

type Status = "idle" | "sending" | "ok" | "error";

export default function HeroLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const fd = new FormData(e.currentTarget);
    const country = String(fd.get("country") || "").trim();
    const payload = {
      contact: String(fd.get("contact") || "").trim(),
      business: String(fd.get("business") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      sector: String(fd.get("sector") || "").trim(),
      message: country ? `Country: ${country}` : "",
      source: "about-hero",
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
      <div className="abx-hform" role="status">
        <div className="abx-hform-done">
          <span className="tick" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m5 12 5 5L20 7" />
            </svg>
          </span>
          <h2>Request received</h2>
          <p>
            Thank you — our team will review your details and contact you shortly with the most
            suitable accreditation pathway.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form className="abx-hform" onSubmit={onSubmit} noValidate>
      <h2>Request Accreditation Information</h2>
      <p>Tell us about your organization — we&rsquo;ll guide you to the right pathway.</p>

      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="abx-form-two">
        <div className="abx-form-row">
          <label htmlFor="hf-contact">Full Name</label>
          <input id="hf-contact" name="contact" required placeholder="Your full name" autoComplete="name" />
        </div>
        <div className="abx-form-row">
          <label htmlFor="hf-business">Organization</label>
          <input id="hf-business" name="business" required placeholder="Organization name" autoComplete="organization" />
        </div>
      </div>
      <div className="abx-form-two">
        <div className="abx-form-row">
          <label htmlFor="hf-sector">Interested Program</label>
          <select id="hf-sector" name="sector" defaultValue="">
            <option value="" disabled>
              Select program
            </option>
            {PROGRAMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
        <div className="abx-form-row">
          <label htmlFor="hf-country">Country</label>
          <input id="hf-country" name="country" placeholder="Country" autoComplete="country-name" />
        </div>
      </div>
      <div className="abx-form-two">
        <div className="abx-form-row">
          <label htmlFor="hf-phone">Phone Number</label>
          <input id="hf-phone" name="phone" type="tel" placeholder="+1 000 000 0000" autoComplete="tel" />
        </div>
        <div className="abx-form-row">
          <label htmlFor="hf-email">Email Address</label>
          <input id="hf-email" name="email" type="email" required placeholder="name@example.com" autoComplete="email" />
        </div>
      </div>

      {status === "error" && (
        <p className="abx-form-err" role="alert">
          {error}
        </p>
      )}

      <button className="abx-form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Request Information"}
      </button>
    </form>
  );
}
