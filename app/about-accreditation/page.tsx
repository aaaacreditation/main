import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import PageBody from "../_components/PageBody";
import CTA from "../_components/CTA";

export const metadata: Metadata = { title: "About Accreditation" };

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="About Accreditation"
        title={<>What accreditation is — and why it <em>travels.</em></>}
        intro="Accreditation is the formal, third-party recognition that an organization is competent to perform a specific activity, evaluated against an internationally-recognized standard."
        crumbs={[{ label: "About Accreditation" }]}
        meta={[
          { k: "Anchor standard", v: "ISO/IEC 17011" },
          { k: "Family of standards", v: "ISO/IEC 17000-series" },
        ]}
      />
      <PageBody label="Definition">
        <h2>Accreditation, plainly stated.</h2>
        <p>
          Accreditation is a formal, independent assessment that determines whether an organization
          has the competence and impartiality to carry out a specific conformity-assessment activity —
          such as testing, calibration, inspection, certification, or proficiency testing — against
          a published international standard.
        </p>
        <p>
          The accreditation body (AAA) does not test products, certify systems, or train people.
          It assesses the bodies that do, against the relevant ISO/IEC standard for that activity.
        </p>

        <h2 style={{ marginTop: 48 }}>Why accreditation matters</h2>
        <ul className="bullets">
          <li>It makes trust portable: an accredited certificate is recognized abroad without re-testing.</li>
          <li>It supports international trade by aligning conformity-assessment results across borders.</li>
          <li>It protects consumers, patients, and the public by ensuring competence is demonstrated.</li>
          <li>It separates technical assessment from commercial relationships — a structural safeguard.</li>
        </ul>

        <h2 style={{ marginTop: 48 }}>The international framework</h2>
        <p>
          Accreditation bodies operate under <strong>ISO/IEC 17011</strong>, the international
          standard for accreditation bodies. Recognition partnerships such as ILAC and IAF
          create the multilateral arrangements that allow an AAA-accredited certificate to be
          accepted across more than sixty operating jurisdictions.
        </p>
      </PageBody>
      <CTA />
    </>
  );
}
