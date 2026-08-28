"use client";

import { useState } from "react";
import Icon from "../Icon";
import { PROGRAMS } from "@/lib/facts";

/**
 * Homepage "Request a quote" form.
 *
 * Posts to the shared /api/leads endpoint with `source: "home-quote"` so
 * homepage enquiries can be filtered from program-page enquiries in the admin
 * Content Studio. Modelled on app/programs/iso-17021/AdvisorForm.tsx.
 */

const OPTIONS = [
  PROGRAMS.healthcare.label,
  PROGRAMS.cab.label,
  PROGRAMS.training.label,
  PROGRAMS.sme.label,
  PROGRAMS.school.label,
  "Other / not sure yet",
];

type Status = "idle" | "sending" | "ok" | "error";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      business: String(fd.get("business") || "").trim(),
      contact: String(fd.get("contact") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      sector: String(fd.get("program") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      source: "home-quote",
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
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data?.error || "Something went wrong — please try again.");
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong — please try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="hx-form reveal">
        <div className="hx-form-done" role="status">
          <i aria-hidden="true">
            <Icon name="check" size={24} strokeWidth={2.6} />
          </i>
          <strong>Request received</strong>
          <p>
            Thank you — an AAA accreditation specialist will review your details and come back to
            you within one business day with the applicable standards, the process and a tailored
            quotation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="hx-form reveal">
      <h3>Request a quote</h3>
      <p>
        Send us your details and an accreditation specialist will respond within one business day.
        No obligation.
      </p>

      <form onSubmit={onSubmit} noValidate>
        {/* Honeypot — hidden from real users, catches naive bots */}
        <input
          className="hx-hp"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="hx-form-grid">
          <div className="hx-field">
            <label htmlFor="hq-business">Organization</label>
            <input
              id="hq-business"
              name="business"
              required
              placeholder="Organization name"
              autoComplete="organization"
            />
          </div>
          <div className="hx-field">
            <label htmlFor="hq-contact">Contact person</label>
            <input id="hq-contact" name="contact" required placeholder="Your name" autoComplete="name" />
          </div>
          <div className="hx-field">
            <label htmlFor="hq-email">Email</label>
            <input
              id="hq-email"
              name="email"
              type="email"
              required
              placeholder="name@organization.com"
              autoComplete="email"
            />
          </div>
          <div className="hx-field">
            <label htmlFor="hq-phone">Phone</label>
            <input
              id="hq-phone"
              name="phone"
              type="tel"
              placeholder="Include country code"
              autoComplete="tel"
            />
          </div>
          <div className="hx-field full">
            <label htmlFor="hq-program">Accreditation program</label>
            <select id="hq-program" name="program" required defaultValue="">
              <option value="" disabled>
                Which program are you interested in?
              </option>
              {OPTIONS.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="hx-field full">
            <label htmlFor="hq-message">About your organization</label>
            <textarea
              id="hq-message"
              name="message"
              rows={3}
              placeholder="Scope, locations and anything else we should know (optional)"
            />
          </div>

          {status === "error" && (
            <p className="hx-form-err" role="alert">
              {error}
            </p>
          )}

          <div className="hx-form-foot">
            <button type="submit" className="ax-btn ax-btn-blue" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Request my quote"}
              {status !== "sending" && <Icon name="arrow" size={15} />}
            </button>
            <p className="hx-form-note">
              Your details are confidential and used only to answer your accreditation enquiry.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
