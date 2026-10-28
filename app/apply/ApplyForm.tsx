"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";
type FieldKey = "org" | "country" | "rep" | "email" | "program" | "heard" | "phone" | "scope";
type Errors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Program list preserved from the previous /apply form. The ISO/IEC 17021-1
 * entry now carries the program's current name, "Management Systems
 * Certification Bodies Accreditation".
 */
const PROGRAMS = [
  "Healthcare Accreditation",
  "Training & Education Provider",
  "Medical Laboratories (ISO 15189)",
  "Testing & Calibration (ISO/IEC 17025)",
  "Inspection Bodies (ISO/IEC 17020)",
  "Management Systems Certification Bodies Accreditation (ISO/IEC 17021-1)",
  "Product Certification (ISO/IEC 17065)",
  "Personnel Certification (ISO/IEC 17024)",
  "Proficiency Testing (ISO/IEC 17043)",
];

const HEARD_ABOUT = [
  "Google / search engine",
  "LinkedIn",
  "Facebook / Instagram",
  "Referral from a colleague or partner",
  "Event or webinar",
  "Email from AAA",
  "Other",
];

const EMPTY = {
  org: "",
  country: "",
  rep: "",
  email: "",
  phone: "",
  program: "",
  heard: "",
  scope: "",
};

/**
 * "Start your application" form for /apply.
 *
 * Posts to the shared /api/leads endpoint with source "apply-form". This
 * registers the intent to apply and puts an advisor in touch — the formal
 * application is still the signed program application form (Stage 1).
 */
export default function ApplyForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [failure, setFailure] = useState("");

  function set(key: keyof typeof EMPTY, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!values.org.trim()) next.org = "Please enter the legal entity name.";
    if (!values.country.trim()) next.country = "Please enter the country of registration.";
    if (!values.rep.trim()) next.rep = "Please name an authorized representative.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Please enter a valid email address.";
    if (!values.program) next.program = "Please choose the program you are applying for.";
    if (!values.heard) next.heard = "Please tell us where you heard about us.";
    if (values.phone.replace(/\D/g, "").length < 7) next.phone = "Please enter a phone number with the country code.";
    if (values.scope.trim().length < 10) next.scope = "Please describe the scope you want accredited.";
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      setFailure("Please correct the highlighted fields and try again.");
      return;
    }

    const fd = new FormData(e.currentTarget);
    const payload = {
      contact: values.rep.trim(),
      business: values.org.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      sector: values.program,
      message: [
        `Country of registration: ${values.country.trim()}`,
        `Heard about us: ${values.heard}`,
        `Requested scope:\n${values.scope.trim()}`,
      ].join("\n\n"),
      source: "apply-form",
      website: String(fd.get("website") || ""), // honeypot
    };

    setStatus("sending");
    setFailure("");
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
      setFailure(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "ok") {
    return (
      <div className="apx-form-done" role="status">
        <span className="tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 12 5 5L20 7" />
          </svg>
        </span>
        <strong>Application enquiry received</strong>
        <p>
          Thank you for submitting your accreditation request. One of our Accreditation Advisors will
          contact you within 48 working hours to discuss your requirements and guide you through the
          next steps.
        </p>
      </div>
    );
  }

  return (
    <form className="apx-form" onSubmit={onSubmit} noValidate>
      {/* honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <div className="apx-form-grid">
        <div className="apx-field">
          <label htmlFor="ap-org">
            Legal entity name<span className="req">*</span>
          </label>
          <input
            id="ap-org"
            name="org"
            required
            value={values.org}
            onChange={(e) => set("org", e.target.value)}
            autoComplete="organization"
            placeholder="As registered"
            aria-invalid={Boolean(errors.org)}
            aria-describedby={errors.org ? "ap-org-err" : undefined}
          />
          {errors.org && (
            <span className="apx-err" id="ap-org-err">
              {errors.org}
            </span>
          )}
        </div>

        <div className="apx-field">
          <label htmlFor="ap-country">
            Country of registration<span className="req">*</span>
          </label>
          <input
            id="ap-country"
            name="country"
            required
            value={values.country}
            onChange={(e) => set("country", e.target.value)}
            autoComplete="country-name"
            placeholder="Country"
            aria-invalid={Boolean(errors.country)}
            aria-describedby={errors.country ? "ap-country-err" : undefined}
          />
          {errors.country && (
            <span className="apx-err" id="ap-country-err">
              {errors.country}
            </span>
          )}
        </div>

        <div className="apx-field">
          <label htmlFor="ap-rep">
            Authorized representative<span className="req">*</span>
          </label>
          <input
            id="ap-rep"
            name="rep"
            required
            value={values.rep}
            onChange={(e) => set("rep", e.target.value)}
            autoComplete="name"
            placeholder="Name and role"
            aria-invalid={Boolean(errors.rep)}
            aria-describedby={errors.rep ? "ap-rep-err" : undefined}
          />
          {errors.rep && (
            <span className="apx-err" id="ap-rep-err">
              {errors.rep}
            </span>
          )}
        </div>

        <div className="apx-field">
          <label htmlFor="ap-email">
            Email<span className="req">*</span>
          </label>
          <input
            id="ap-email"
            name="email"
            required
            type="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
            placeholder="name@organization.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "ap-email-err" : undefined}
          />
          {errors.email && (
            <span className="apx-err" id="ap-email-err">
              {errors.email}
            </span>
          )}
        </div>

        <div className="apx-field full">
          <label htmlFor="ap-program">
            Program applied for<span className="req">*</span>
          </label>
          <select
            id="ap-program"
            name="program"
            required
            value={values.program}
            onChange={(e) => set("program", e.target.value)}
            aria-invalid={Boolean(errors.program)}
            aria-describedby={errors.program ? "ap-program-err" : undefined}
          >
            <option value="" disabled>
              Select a program…
            </option>
            {PROGRAMS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          {errors.program && (
            <span className="apx-err" id="ap-program-err">
              {errors.program}
            </span>
          )}
        </div>

        <div className="apx-field">
          <label htmlFor="ap-heard">
            Where did you hear about us?<span className="req">*</span>
          </label>
          <select
            id="ap-heard"
            name="heard"
            required
            value={values.heard}
            onChange={(e) => set("heard", e.target.value)}
            aria-invalid={Boolean(errors.heard)}
            aria-describedby={errors.heard ? "ap-heard-err" : undefined}
          >
            <option value="" disabled>
              Select an option…
            </option>
            {HEARD_ABOUT.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          {errors.heard && (
            <span className="apx-err" id="ap-heard-err">
              {errors.heard}
            </span>
          )}
        </div>

        <div className="apx-field">
          <label htmlFor="ap-phone">
            Phone<span className="req">*</span>
          </label>
          <input
            id="ap-phone"
            name="phone"
            required
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            autoComplete="tel"
            placeholder="+1 571 000 0000"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "ap-phone-err" : undefined}
          />
          {errors.phone && (
            <span className="apx-err" id="ap-phone-err">
              {errors.phone}
            </span>
          )}
        </div>

        <div className="apx-field full">
          <label htmlFor="ap-scope">
            Scope statement<span className="req">*</span>
          </label>
          <textarea
            id="ap-scope"
            name="scope"
            required
            rows={4}
            value={values.scope}
            onChange={(e) => set("scope", e.target.value)}
            placeholder="What activities are you seeking accreditation for?"
            aria-invalid={Boolean(errors.scope)}
            aria-describedby={errors.scope ? "ap-scope-err" : undefined}
          />
          {errors.scope && (
            <span className="apx-err" id="ap-scope-err">
              {errors.scope}
            </span>
          )}
        </div>

        {status === "error" && failure && (
          <p className="apx-form-err full" role="alert">
            {failure}
          </p>
        )}

        <div className="apx-form-foot">
          <button className="ax-btn ax-btn-gold" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Start my application"}
            {status !== "sending" && (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
