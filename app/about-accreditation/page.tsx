import type { Metadata } from "next";
import PageHero from "../_components/PageHero";
import PageBody from "../_components/PageBody";
import CTA from "../_components/CTA";

export const metadata: Metadata = {
  title: "About Accreditation",
  description:
    "Accreditation is a formal process by which a recognized body evaluates and certifies that an institution meets predefined and established quality standards — enhancing service quality and ensuring safety through compliance with global standards. Learn about the ILAC/IAF framework, AAA's programs, and the benefits of accreditation.",
};

export default function Page() {
  return (
    <>
      <PageHero
        image="/hero.jpg"
        eyebrow="About Accreditation"
        title={<>What accreditation is — and why it <em>matters.</em></>}
        intro="Accreditation is a formal process by which a recognized body evaluates and certifies that an institution meets predefined and established quality standards."
        crumbs={[{ label: "About Accreditation" }]}
        meta={[
          { k: "Framework", v: "ISO/IEC 17011 · ILAC · IAF" },
          { k: "Membership", v: "ISQua" },
        ]}
      />
      <PageBody label="Overview">
        <h2>Accreditation, plainly stated.</h2>
        <p>
          Accreditation is a formal process by which a recognized body evaluates and certifies
          that an institution meets predefined and established quality standards. The
          accreditation process aims to enhance service quality and to ensure safety through
          compliance with global standards.
        </p>
        <p>
          AAA is a third-party accreditation body that delivers accreditation services
          according to various international standards.
        </p>

        <h2 style={{ marginTop: 48 }}>The international framework: ILAC &amp; IAF</h2>
        <p>
          <strong>ILAC</strong> and <strong>IAF</strong> are the international organizations
          for accreditation bodies operating in accordance with <strong>ISO/IEC 17011</strong>{" "}
          and involved in the accreditation of conformity assessment bodies — including
          laboratories, inspection bodies, and certification bodies.
        </p>
        <p>
          AAA is a member of the <strong>International Society for Quality in Healthcare
          (ISQua)</strong>, which has been working to improve the quality and safety of
          healthcare worldwide for over 30 years through education, knowledge sharing,
          external evaluation, and support for health systems around the world.
        </p>

        <h2 style={{ marginTop: 48 }}>AAA accreditation programs</h2>
        <p>
          AAA&apos;s services include a range of accreditation programs using international
          standards:
        </p>
        <ul className="bullets">
          <li>Healthcare Accreditation</li>
          <li>Training Providers Accreditation (ASTM E2659)</li>
          <li>Schools Accreditation</li>
          <li>Testing &amp; Calibration Laboratories (ISO/IEC 17025)</li>
          <li>Medical Laboratories (ISO 15189)</li>
          <li>Personnel Certification Bodies (ISO/IEC 17024)</li>
          <li>System Certification Bodies (ISO/IEC 17021)</li>
          <li>Product Certification Bodies (ISO/IEC 17065)</li>
          <li>Inspection Bodies (ISO/IEC 17020)</li>
          <li>Proficiency Testing Providers (ISO/IEC 17043)</li>
        </ul>

        <h2 style={{ marginTop: 48 }}>The benefits of accreditation</h2>
        <ul className="bullets">
          <li>
            <strong>For industry and trade</strong> — accreditation facilitates trade and
            eliminates the need for repetitive testing, certification, and inspection.
          </li>
          <li>
            <strong>For regulators</strong> — accreditation provides a reliable and impartial
            basis for sound decision-making.
          </li>
          <li>
            <strong>For conformity assessment service providers</strong> — for testing,
            calibration, and medical laboratories, certification bodies (management systems,
            product, and personnel), and inspection bodies, accreditation is a means of
            demonstrating your competency to your clients. It is an effective marketing tool
            and a passport to submit tenders to contractors that require independently
            verified conformity assessment service providers.
          </li>
          <li>
            <strong>For users of accredited services and consumers</strong> — accreditation is
            your guarantee of reliable and comparable conformity assessment results, and it
            increases the reliability of products.
          </li>
        </ul>

        <p style={{ marginTop: 32 }}>
          <strong>&ldquo;International Accreditation &hellip; Accepted Globally&rdquo;</strong>
        </p>
      </PageBody>
      <CTA />
    </>
  );
}
