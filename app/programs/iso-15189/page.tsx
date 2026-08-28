import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import ProgramPage from "../../_components/ProgramPage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";

const PATH = "/programs/iso-15189";

export const metadata: Metadata = pageMeta({
  title: "Medical Laboratories Accreditation (ISO 15189)",
  description:
    "AAA accredits public and private medical laboratories to ISO 15189 — quality and competence across the pre-examination, examination and post-examination phases.",
  path: PATH,
  keywords: [
    "ISO 15189 accreditation",
    "medical laboratory accreditation",
    "clinical laboratory accreditation",
    "pathology laboratory quality",
  ],
});

const DOCUMENTS = [
  {
    label: "Application form for accreditation of medical labs",
    href: "https://aaa-accreditation.org/wp-content/uploads/2023/03/Application-form-for-accreditation-of-medical-labs.doc",
    meta: "DOC",
  },
  {
    label: "General requirements for accreditation",
    href: "https://aaa-accreditation.org/wp-content/uploads/2021/12/General-requirements-for-accreditation-V2.pdf",
    meta: "PDF",
  },
  {
    label: "Requirements for use of accreditation symbols",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-use-of-accreditation-symbols.pdf",
    meta: "PDF",
  },
  {
    label: "Requirements for accreditation of multi-site conformity assessment bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Requirements-for-Accreditation-of-multi-site-conformity-assessment-bodies-.pdf",
    meta: "PDF",
  },
];

const FAQ = [
  {
    q: "How does ISO 15189 differ from ISO/IEC 17025?",
    a: "Both standards address quality and technical competence, but ISO 15189 is written for medical laboratories and follows the whole patient pathway. It covers the pre-examination phase — the request, patient and sample identification, collection and transport — as well as the examination itself and the post-examination phase, including release of results, reporting to clinicians and the communication of critical results.",
  },
  {
    q: "Which examinations can be included in the scope?",
    a: "Accreditation is granted for a defined scope, which lists the examinations, the disciplines they belong to and the sites at which they are performed. Typical disciplines include clinical chemistry, haematology, microbiology, immunology, molecular diagnostics, histopathology and cytology. A laboratory may start with part of its repertoire and extend the scope later.",
  },
  {
    q: "Is point-of-care testing covered?",
    a: "The current edition of ISO 15189 brings point-of-care testing within its scope where that testing is performed under the governance of the medical laboratory. Assessment then looks at operator training and authorization, device management and quality control, and how results generated outside the laboratory reach the patient record.",
  },
  {
    q: "What is assessed in the pre-examination phase?",
    a: "The information required on a request, unambiguous identification of the patient and the primary sample, instructions for collection, handling and transport, acceptance and rejection criteria, and the arrangements for samples referred to other laboratories. Most errors reported in laboratory medicine originate before the examination begins, which is why this phase is examined closely.",
  },
  {
    q: "Do we need internal quality control and external comparison?",
    a: "Yes. The laboratory must ensure the validity of its results through internal quality control appropriate to each examination, and through interlaboratory comparison — proficiency testing where a suitable scheme exists. Results of both must be reviewed and acted on, not simply filed.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Programs", path: "/programs/conformity-assessment-bodies" },
            { name: "Medical Laboratories Accreditation", path: PATH },
          ]),
          serviceSchema({
            name: "Medical Laboratories Accreditation (ISO 15189)",
            description:
              "Accreditation of public and private medical laboratories against ISO 15189, covering the pre-examination, examination and post-examination phases of the patient pathway.",
            path: PATH,
            standard: "ISO 15189",
            audience: "Medical and clinical laboratories",
          }),
          faqSchema(FAQ),
        ]}
      />
      <ProgramPage
        title="Medical Laboratories Accreditation"
        standard="ISO 15189"
        intro="Use of accreditation for medical examinations helps improve the quality of service rendered to the patient, and contributes to the efficiency of the healthcare system by ensuring the reliability of results."
        hero="/sectors/healthcare.jpg"
        heroCaption={{
          kicker: "AAA accreditation",
          title: "Medical laboratories",
          chip: "ISO 15189",
        }}
        metrics={[
          { v: "ISO 15189", k: "Anchor standard" },
          { v: "Patient pathway", k: "Scope of assessment" },
          { v: "3 years", k: "Accreditation cycle" },
          { v: "Annual", k: "Surveillance" },
        ]}
        overview={[
          "Use of accreditation for medical examinations helps improve the quality of service rendered to the patient. Accreditation contributes to the efficiency of the healthcare system by ensuring the reliability of results.",
          "It concerns many medical-technical procedures used for the purposes of prevention, screening, and diagnosis. In this way, accreditation guarantees the harmonized and optimum quality of the biomedical examinations conducted throughout the country by public or private laboratories.",
          "ISO 15189 specifies requirements for quality and competence in medical laboratories. Unlike a purely technical standard, it follows the examination through the whole patient pathway: the pre-examination phase, where the request is made and the sample is collected and transported; the examination phase, where the method is selected, verified and controlled; and the post-examination phase, where results are reviewed, released, reported and — when they are critical — communicated without delay.",
          "Assessment is carried out by assessors with laboratory-medicine experience, who look at the same evidence a clinician relies on: that the right sample was identified, examined by a competent person on controlled equipment, and reported in a way the requester can act on.",
        ]}
        whoFor={[
          "Hospital and clinical laboratories serving inpatient and outpatient services",
          "Pathology laboratories across clinical chemistry, haematology, microbiology, immunology, histopathology, cytology and molecular diagnostics",
          "Private and commercial diagnostic laboratories, including those in diagnostic and imaging centres",
          "Reference and referral laboratories receiving samples from other laboratories",
          "Public health and screening laboratories supporting prevention and early detection programmes",
          "Point-of-care testing services operating under the governance of a medical laboratory",
        ]}
        scopeHeading="What the assessment covers"
        scope={[
          "Patient-focused quality, ethical conduct and risk management — arrangements that put the interests and safety of the patient first, supported by internal audit and management review.",
          "Competence of personnel — qualification, induction, training, authorization and continuing competence assessment for each examination performed.",
          "Accommodation and environmental conditions — facilities suitable for the work, including biosafety, storage and control of access.",
          "Equipment, reagents and consumables — selection, acceptance testing, calibration, maintenance, inventory control and adverse-incident reporting.",
          "Pre-examination processes — request information, patient and sample identification, collection instructions, transport conditions, and acceptance or rejection criteria.",
          "Examination processes — selection, verification and validation of methods, measurement uncertainty, biological reference intervals, and point-of-care testing performed under laboratory governance.",
          "Ensuring the quality of results — internal quality control designed for each examination, plus interlaboratory comparison and proficiency testing, with review of the outcomes.",
          "Post-examination processes — review and authorization of results, reporting and release, communication of critical or alert results, and retention, storage and safe disposal of samples.",
        ]}

        benefits={[
          "Improves the quality of service rendered to the patient, and the reliability of the results clinicians act on",
          "Harmonized and optimum quality of biomedical examinations across public and private laboratories",
          "Independent evidence for hospitals, insurers, referring clinicians and health authorities that the laboratory is competent",
          "Structured control of the pre-examination phase, where most laboratory errors originate",
          "A means of demonstrating your competence to your clients, and a passport to tenders that require accredited laboratories",
          "Annual surveillance that keeps methods, quality control and reporting under continuous review",
        ]}
        documents={DOCUMENTS}
        documentsHeading="Documents related to the accreditation of medical laboratories"
        faq={FAQ}
        related={[
          { href: "/programs/conformity-assessment-bodies", label: "All conformity assessment programs" },
          { href: "/programs/healthcare", label: "Healthcare Accreditation" },
          { href: "/programs/iso-17025", label: "Testing & Calibration Laboratories (ISO/IEC 17025)" },
          { href: "/programs/iso-17043", label: "Proficiency Testing Providers (ISO/IEC 17043)" },
        ]}
      />
    </>
  );
}
