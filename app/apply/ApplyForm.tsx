"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";
type FieldKey = "org" | "country" | "rep" | "email" | "program" | "scope";
type Errors = Partial<Record<FieldKey, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Program list preserved from the previous /apply form. The ISO/IEC 17021-1
 * entry now carries the program's current name, "Management Systems
 * Certification Bodies Accreditation".
 */
const PROGRAMS = [
  "Healthcare Accreditation",
  "Medical Laboratories (ISO 15189)",
  "Testing & Calibration (ISO/IEC 17025)",
  "Inspection Bodies (ISO/IEC 17020)",
  "Management Systems Certification Bodies Accreditation (ISO/IEC 17021-1)",
  "Product Certification (ISO/IEC 17065)",
  "Personnel Certification (ISO/IEC 17024)",
  "Proficiency Testing (ISO/IEC 17043)",
  "Training Providers (ASTM E-2659)",
];

const SITUATIONS = [
  "First accreditation",
  "Adding scopes to an existing AAA accreditation",
  "Renewal / reassessment",
  "Transfer from another accreditation body",
];

const EMPTY = {
  org: "",
  country: "",
  rep: "",
  email: "",
  phone: "",
  program: "",
  situation: "",
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
      stage: values.situation,
      message: [
        `Country of registration: ${values.country.trim()}`,
        values.situation && `Situation: ${values.situation}`,
        `Requested scope:\n${values.scope.trim()}`,
      ]
        .filter(Boolean)
        .join("\n\n"),
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
          Thank you — an AAA accreditation advisor will review the scope you described for{" "}
          <b>{values.org.trim()}</b> and reply to <b>{values.email.trim()}</b> within two business
          days with the correct application form and the documents to prepare.
        </p>
        <p className="apx-form-done-next">
          You can get a head start by{" "}
          <a href="#forms">downloading the application form for your program</a>.
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
          <label htmlFor="ap-org">Legal entity name</label>
          <input
            id="ap-org"
            name="org"
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
          <label htmlFor="ap-country">Country of registration</label>
          <input
            id="ap-country"
            name="country"
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
          <label htmlFor="ap-rep">Authorized representative</label>
          <input
            id="ap-rep"
            name="rep"
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
          <label htmlFor="ap-email">Email</label>
          <input
            id="ap-email"
            name="email"
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
          <label htmlFor="ap-program">Program applied for</label>
          <select
            id="ap-program"
            name="program"
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
          <label htmlFor="ap-situation">
            Your situation <i>optional</i>
          </label>
          <select
            id="ap-situation"
            name="situation"
            value={values.situation}
            onChange={(e) => set("situation", e.target.value)}
          >
            <option value="">Not sure yet</option>
            {SITUATIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="apx-field">
          <label htmlFor="ap-phone">
            Phone <i>optional</i>
          </label>
          <input
            id="ap-phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            autoComplete="tel"
            placeholder="+1 571 000 0000"
          />
        </div>

        <div className="apx-field full">
          <label htmlFor="ap-scope">Scope statement</label>
          <textarea
            id="ap-scope"
            name="scope"
            rows={4}
            value={values.scope}
            onChange={(e) => set("scope", e.target.value)}
            placeholder="Describe the activities you want accredited — tests, methods, technical sectors, certification schemes, inspection types — plus the sites the accreditation should cover."
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
          <p className="apx-form-note">
            This starts the conversation. The formal application is the signed application form for
            your program, submitted with your fees.
          </p>
        </div>
      </div>
    </form>
  );
}
