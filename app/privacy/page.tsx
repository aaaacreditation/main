import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import PageBody from "../_components/PageBody";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={<>Privacy <em>policy.</em></>}
        intro="How AAA collects, processes and stores personal data — and the choices you have over your information."
        crumbs={[{ label: "Privacy Policy" }]}
        meta={[
          { k: "Effective date", v: "May 2026" },
          { k: "Jurisdiction", v: "Virginia, USA" },
        ]}
      />
      <PageBody label="Policy text">
        <h2>1. Scope</h2>
        <p>
          This policy applies to personal data collected through aaa-accreditation.org and through
          AAA application, assessment and member-management processes.
        </p>

        <h2 style={{ marginTop: 40 }}>2. Information we collect</h2>
        <ul className="bullets">
          <li>Contact information (name, email, organization) submitted via forms.</li>
          <li>Application and assessment records related to accreditation decisions.</li>
          <li>Standard web-server logs and anonymous analytics on site usage.</li>
        </ul>

        <h2 style={{ marginTop: 40 }}>3. How we use information</h2>
        <ul className="bullets">
          <li>To respond to enquiries, quotes and applications.</li>
          <li>To operate accreditation, surveillance and recertification activities.</li>
          <li>To meet our obligations under recognition arrangements.</li>
        </ul>

        <h2 style={{ marginTop: 40 }}>4. Sharing</h2>
        <p>
          AAA does not sell personal data. We share information only with assessors, committees,
          and recognition partners as required to operate accreditation programs, or where
          required by applicable law.
        </p>

        <h2 style={{ marginTop: 40 }}>5. Your choices</h2>
        <p>
          You may request access to, correction of, or deletion of your personal data by writing
          to <a href="mailto:privacy@aaa-accreditation.org" className="ed-link">privacy@aaa-accreditation.org</a>.
        </p>

        <h2 style={{ marginTop: 40 }}>6. Contact</h2>
        <p>
          For any privacy-related question, contact{" "}
          <a href="mailto:privacy@aaa-accreditation.org" className="ed-link">privacy@aaa-accreditation.org</a>.
        </p>
      </PageBody>
    </>
  );
}
