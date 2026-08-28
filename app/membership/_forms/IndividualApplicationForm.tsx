"use client";

import { useState } from "react";
import FormDone from "./FormDone";
import { block, compose, line, postLead, val, type Status } from "./lead";

/**
 * AAA Individual Membership application.
 *
 * Field set transcribed from the live WordPress form (Contact Form 7 #5617 on
 * /individual-membership-application/ and #5619 on the Recognized Competency
 * Member variant — the two forms are field-for-field identical, so one
 * component serves both routes and the `track` prop records which category the
 * applicant chose).
 *
 * The live form ends with a required CV upload; /api/leads stores text only, so
 * the upload is replaced by an optional link field plus an explicit instruction
 * to email the CV. The typed full name is the electronic signature — the live
 * form's separate "Date" box is unnecessary because the submission timestamp is
 * recorded automatically.
 */
export default function IndividualApplicationForm({
  source,
  track,
}: {
  /** `source` recorded on the lead, e.g. "membership-individual-application". */
  source: string;
  /** Membership category, written into the lead so both routes stay distinct. */
  track: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const first = val(fd, "firstName");
    const last = val(fd, "lastName");
    const title = val(fd, "title");

    const payload = {
      business: val(fd, "organization"),
      contact: [title, first, last].filter(Boolean).join(" "),
      email: val(fd, "email"),
      phone: val(fd, "phone"),
      sector: val(fd, "industry").slice(0, 100),
      stage: track,
      source,
      website: val(fd, "companyWebsiteHp"), // honeypot
      message: compose([
        `Membership category: ${track}`,
        line("Occupation / title", val(fd, "occupation")),
        line("Organization website", val(fd, "orgWebsite")),
        line("LinkedIn", val(fd, "linkedin")),
        line("Years of experience", val(fd, "experience")),
        block("Industry / service provided", val(fd, "industry")),
        block("Main services of the organization", val(fd, "services")),
        block("Education / qualifications", val(fd, "education")),
        block("Training obtained", val(fd, "training")),
        block("Certifications / memberships gained", val(fd, "certifications")),
        block("Full address", val(fd, "address")),
        line("Where they heard about AAA", val(fd, "reference")),
        line("CV link", val(fd, "cvLink")),
        `Declaration accepted, signed electronically by: ${val(fd, "signature")}`,
      ]),
    };

    setStatus("sending");
    setError("");
    try {
      await postLead(payload);
      setStatus("ok");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "ok") {
    return (
      <FormDone title="Application received">
        <p>
          Thank you for applying for AAA {track.toLowerCase()}. Our membership team will review
          your details and contact you within two business days. Please email your CV (PDF or
          JPEG) to info@aaa-accreditation.org quoting your full name so we can complete the
          competency review.
        </p>
      </FormDone>
    );
  }

  return (
    <form className="memx-form" onSubmit={onSubmit} noValidate>
      <input
        type="text"
        name="companyWebsiteHp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />

      <fieldset className="memx-fieldset">
        <legend className="memx-legend">
          <i aria-hidden="true">1</i> Member information
        </legend>
        <div className="memx-grid">
          <div className="memx-field">
            <label htmlFor="im-title">Title</label>
            <input id="im-title" name="title" placeholder="Dr / Mr / Ms / Eng." autoComplete="honorific-prefix" />
          </div>
          <div className="memx-field">
            <label htmlFor="im-first">
              First name<span className="req">*</span>
            </label>
            <input id="im-first" name="firstName" required autoComplete="given-name" />
          </div>
          <div className="memx-field">
            <label htmlFor="im-last">
              Last name<span className="req">*</span>
            </label>
            <input id="im-last" name="lastName" required autoComplete="family-name" />
          </div>
          <div className="memx-field">
            <label htmlFor="im-email">
              Email address<span className="req">*</span>
            </label>
            <input id="im-email" name="email" type="email" required autoComplete="email" placeholder="name@organization.com" />
          </div>
          <div className="memx-field">
            <label htmlFor="im-phone">
              Mobile phone<span className="req">*</span>
            </label>
            <input id="im-phone" name="phone" type="tel" required autoComplete="tel" placeholder="+1 571 601 2616" />
          </div>
          <div className="memx-field">
            <label htmlFor="im-linkedin">LinkedIn account</label>
            <input id="im-linkedin" name="linkedin" placeholder="linkedin.com/in/…" />
          </div>
          <div className="memx-field full">
            <label htmlFor="im-address">
              Full address<span className="req">*</span>
            </label>
            <textarea id="im-address" name="address" rows={2} required autoComplete="street-address" />
          </div>
        </div>
      </fieldset>

      <fieldset className="memx-fieldset">
        <legend className="memx-legend">
          <i aria-hidden="true">2</i> Organization &amp; role
        </legend>
        <div className="memx-grid">
          <div className="memx-field">
            <label htmlFor="im-org">
              Organization name<span className="req">*</span>
            </label>
            <input id="im-org" name="organization" required autoComplete="organization" />
          </div>
          <div className="memx-field">
            <label htmlFor="im-occupation">
              Occupation / title<span className="req">*</span>
            </label>
            <input id="im-occupation" name="occupation" required autoComplete="organization-title" />
          </div>
          <div className="memx-field full">
            <label htmlFor="im-orgweb">Organization website</label>
            <input id="im-orgweb" name="orgWebsite" placeholder="https://" inputMode="url" />
          </div>
          <div className="memx-field full">
            <label htmlFor="im-industry">
              Industry / service provided<span className="req">*</span>
            </label>
            <textarea id="im-industry" name="industry" rows={2} required />
          </div>
          <div className="memx-field full">
            <label htmlFor="im-services">
              Description of the main services of the organization<span className="req">*</span>
            </label>
            <textarea id="im-services" name="services" rows={3} required />
          </div>
        </div>
      </fieldset>

      <fieldset className="memx-fieldset">
        <legend className="memx-legend">
          <i aria-hidden="true">3</i> Competency &amp; experience
        </legend>
        <div className="memx-grid">
          <div className="memx-field full">
            <label htmlFor="im-education">
              Education / qualifications<span className="req">*</span>
            </label>
            <textarea id="im-education" name="education" rows={3} required />
          </div>
          <div className="memx-field full">
            <label htmlFor="im-training">
              Training obtained<span className="req">*</span>
            </label>
            <textarea id="im-training" name="training" rows={3} required />
          </div>
          <div className="memx-field full">
            <label htmlFor="im-certs">
              Details of any certification / memberships gained<span className="req">*</span>
            </label>
            <textarea id="im-certs" name="certifications" rows={3} required />
          </div>
          <div className="memx-field">
            <label htmlFor="im-experience">
              Years of experience<span className="req">*</span>
            </label>
            <input id="im-experience" name="experience" required />
          </div>
          <div className="memx-field">
            <label htmlFor="im-reference">Where did you hear about AAA?</label>
            <input id="im-reference" name="reference" />
          </div>
          <div className="memx-field full">
            <label htmlFor="im-cv">Link to your CV</label>
            <input id="im-cv" name="cvLink" placeholder="https://" inputMode="url" />
            <span className="hint">
              A copy of your CV (PDF or JPEG) is required. Paste a link here, or email it to
              info@aaa-accreditation.org after you submit this form.
            </span>
          </div>
        </div>
      </fieldset>

      <div className="memx-declare">
        <strong>Declaration</strong>
        <ol>
          <li>
            I declare that the information provided in this application is correct and all
            supporting documents are genuine and accurate.
          </li>
          <li>
            I have taken reasonable steps to confirm the accuracy of the claims made by staff in
            respect of qualifications and experience.
          </li>
          <li>I am prepared to accept the final decision of AAA as to the outcome of this application.</li>
          <li>
            I agree to indemnify AAA against all claims, demands, expenses and complaints arising
            from inaccuracies in the information given by me above.
          </li>
          <li>
            I understand that failure of continuing compliance with the membership criteria may
            lead to the removal of my membership by AAA.
          </li>
        </ol>
        <label className="memx-consent" htmlFor="im-consent">
          <input id="im-consent" name="consent" type="checkbox" required />
          <span>I have read and accept the declaration above.</span>
        </label>
      </div>

      <div className="memx-grid">
        <div className="memx-field">
          <label htmlFor="im-signature">
            Full name (electronic signature)<span className="req">*</span>
          </label>
          <input id="im-signature" name="signature" required autoComplete="name" />
          <span className="hint">The date of your application is recorded automatically.</span>
        </div>
      </div>

      {status === "error" && (
        <p className="memx-form-err" role="alert">
          {error}
        </p>
      )}

      <div className="memx-form-foot">
        <button className="ax-btn ax-btn-gold" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Submit application"}
          {status !== "sending" && (
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          )}
        </button>
        <p className="memx-form-note">
          Your details are used only to process your AAA membership application. Submitting this
          form does not create a membership until AAA confirms the outcome of its review.
        </p>
      </div>
    </form>
  );
}
