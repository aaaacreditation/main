"use client";

import { useState } from "react";
import FormDone from "./FormDone";
import { block, compose, line, postLead, stack, val, type Status } from "./lead";

/**
 * AAA Organizational Membership application.
 *
 * Field set transcribed from the live WordPress form (Contact Form 7 #5151 on
 * /organizational-membership-application/). The live form asks "Where did you
 * hear about AAA?" twice — once per section — so it is asked once here.
 *
 * The live form requires an attached copy of the organization's legal status;
 * /api/leads stores text only, so that becomes an optional link field plus an
 * explicit instruction to email the document.
 */
export default function OrganizationalApplicationForm({ source }: { source: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const repTitle = val(fd, "repTitle");
    const repFirst = val(fd, "repFirstName");
    const repLast = val(fd, "repLastName");

    const payload = {
      business: val(fd, "organization"),
      contact: [repTitle, repFirst, repLast].filter(Boolean).join(" "),
      email: val(fd, "repEmail"),
      phone: val(fd, "repPhone"),
      sector: val(fd, "industry").slice(0, 100),
      stage: "Organizational membership",
      source,
      website: val(fd, "companyWebsiteHp"), // honeypot
      message: compose([
        stack("ORGANIZATION", [
          line("Legal status", val(fd, "legalStatus")),
          line("Date of establishment", val(fd, "established")),
          line("Total staff", val(fd, "staff")),
          line("Telephone", val(fd, "orgPhone")),
          line("Website", val(fd, "orgWebsite")),
          line("Official email", val(fd, "orgEmail")),
        ]),
        block("Industry / service provided", val(fd, "industry")),
        block("Main services of the organization", val(fd, "services")),
        block("Head office address", val(fd, "hqAddress")),
        block("Other operating addresses", val(fd, "otherAddresses")),
        block("Certifications / memberships gained", val(fd, "certifications")),
        stack("AUTHORIZED REPRESENTATIVE", [
          line("Occupation", val(fd, "repOccupation")),
          line("Email", val(fd, "repEmail")),
          line("Mobile phone", val(fd, "repPhone")),
          line("LinkedIn", val(fd, "repLinkedin")),
        ]),
        block("Representative address", val(fd, "repAddress")),
        block("Representative qualifications", val(fd, "repQualifications")),
        line("Where they heard about AAA", val(fd, "reference")),
        line("Legal-status document link", val(fd, "legalDocLink")),
        `Declaration accepted by the principal, signed electronically by: ${val(fd, "signature")}`,
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
          Thank you for applying for AAA Organizational Membership. Our membership team will review
          your institution&rsquo;s details and contact you within two business days. Please email a
          copy of your organization&rsquo;s legal status document (PDF or JPEG) to
          info@aaa-accreditation.org quoting your organization name.
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
          <i aria-hidden="true">1</i> Organization information
        </legend>
        <div className="memx-grid">
          <div className="memx-field full">
            <label htmlFor="om-org">
              Organization name<span className="req">*</span>
            </label>
            <input id="om-org" name="organization" required autoComplete="organization" />
          </div>
          <div className="memx-field full">
            <label htmlFor="om-industry">
              Industry / service provided<span className="req">*</span>
            </label>
            <textarea id="om-industry" name="industry" rows={2} required />
          </div>
          <div className="memx-field full">
            <label htmlFor="om-services">
              Description of the main services of the organization<span className="req">*</span>
            </label>
            <textarea id="om-services" name="services" rows={3} required />
          </div>
          <div className="memx-field">
            <label htmlFor="om-legal">
              Legal status<span className="req">*</span>
            </label>
            <input id="om-legal" name="legalStatus" required placeholder="Govt. dept., private, association…" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-established">
              Date of establishment<span className="req">*</span>
            </label>
            <input id="om-established" name="established" required placeholder="e.g. 2014" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-staff">
              Total number of staff<span className="req">*</span>
            </label>
            <input id="om-staff" name="staff" required inputMode="numeric" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-phone">
              Telephone<span className="req">*</span>
            </label>
            <input id="om-phone" name="orgPhone" type="tel" required autoComplete="tel" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-website">
              Website<span className="req">*</span>
            </label>
            <input id="om-website" name="orgWebsite" required placeholder="https://" inputMode="url" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-email">
              Official email<span className="req">*</span>
            </label>
            <input id="om-email" name="orgEmail" type="email" required placeholder="info@organization.com" />
          </div>
          <div className="memx-field full">
            <label htmlFor="om-hq">
              Head office address<span className="req">*</span>
            </label>
            <textarea id="om-hq" name="hqAddress" rows={2} required />
          </div>
          <div className="memx-field full">
            <label htmlFor="om-other">Addresses of any other places the organization operates</label>
            <textarea id="om-other" name="otherAddresses" rows={2} />
          </div>
          <div className="memx-field full">
            <label htmlFor="om-certs">
              Details of any certification / memberships gained<span className="req">*</span>
            </label>
            <textarea id="om-certs" name="certifications" rows={3} required />
          </div>
          <div className="memx-field full">
            <label htmlFor="om-legaldoc">Link to your legal status document</label>
            <input id="om-legaldoc" name="legalDocLink" placeholder="https://" inputMode="url" />
            <span className="hint">
              A copy of the organization&rsquo;s legal status (PDF or JPEG) is required. Paste a
              link here, or email it to info@aaa-accreditation.org after you submit this form.
            </span>
          </div>
        </div>
      </fieldset>

      <fieldset className="memx-fieldset">
        <legend className="memx-legend">
          <i aria-hidden="true">2</i> Authorized representative
        </legend>
        <div className="memx-grid">
          <div className="memx-field">
            <label htmlFor="om-rep-title">Title</label>
            <input id="om-rep-title" name="repTitle" placeholder="Dr / Mr / Ms / Eng." autoComplete="honorific-prefix" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-rep-occupation">
              Occupation<span className="req">*</span>
            </label>
            <input id="om-rep-occupation" name="repOccupation" required autoComplete="organization-title" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-rep-first">
              First name<span className="req">*</span>
            </label>
            <input id="om-rep-first" name="repFirstName" required autoComplete="given-name" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-rep-last">
              Last name<span className="req">*</span>
            </label>
            <input id="om-rep-last" name="repLastName" required autoComplete="family-name" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-rep-email">
              Email address<span className="req">*</span>
            </label>
            <input id="om-rep-email" name="repEmail" type="email" required autoComplete="email" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-rep-phone">
              Mobile phone<span className="req">*</span>
            </label>
            <input id="om-rep-phone" name="repPhone" type="tel" required autoComplete="tel" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-rep-linkedin">LinkedIn account</label>
            <input id="om-rep-linkedin" name="repLinkedin" placeholder="linkedin.com/in/…" />
          </div>
          <div className="memx-field">
            <label htmlFor="om-reference">Where did you hear about AAA?</label>
            <input id="om-reference" name="reference" />
          </div>
          <div className="memx-field full">
            <label htmlFor="om-rep-address">
              Full address<span className="req">*</span>
            </label>
            <textarea id="om-rep-address" name="repAddress" rows={2} required autoComplete="street-address" />
          </div>
          <div className="memx-field full">
            <label htmlFor="om-rep-quals">
              Qualifications<span className="req">*</span>
            </label>
            <textarea id="om-rep-quals" name="repQualifications" rows={3} required />
          </div>
        </div>
      </fieldset>

      <div className="memx-declare">
        <strong>Declaration (to be made by the principal)</strong>
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
            I agree to inform AAA of any changes in the ownership of the institution or senior
            management, or significant variation in the academic program, which occur more than
            three months before the scheduled date for renewing the institution&rsquo;s AAA
            membership.
          </li>
          <li>
            I accept that the term &ldquo;AAA Organizational Member&rdquo; means that my institution
            is a member of AAA, and I undertake not to represent my institution as enjoying this
            recognition before it has been granted nor after it has been withdrawn or suspended.
          </li>
          <li>
            I understand that failure of continuing compliance with the membership criteria may
            lead to the removal of my membership by AAA.
          </li>
        </ol>
        <label className="memx-consent" htmlFor="om-consent">
          <input id="om-consent" name="consent" type="checkbox" required />
          <span>I have read and accept the declaration above on behalf of my institution.</span>
        </label>
      </div>

      <div className="memx-grid">
        <div className="memx-field">
          <label htmlFor="om-signature">
            Full name (electronic signature)<span className="req">*</span>
          </label>
          <input id="om-signature" name="signature" required autoComplete="name" />
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
