import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import ProgramPage from "../../_components/ProgramPage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";

const PATH = "/programs/iso-17043";

export const metadata: Metadata = pageMeta({
  title: "Proficiency Testing Providers (ISO/IEC 17043)",
  description:
    "AAA accredits proficiency testing providers to ISO/IEC 17043 — scheme design, homogeneity and stability of PT items, assigned values and performance evaluation.",
  path: PATH,
  keywords: [
    "ISO/IEC 17043 accreditation",
    "proficiency testing provider",
    "interlaboratory comparison",
    "PT scheme accreditation",
  ],
});

const DOCUMENTS = [
  {
    label: "Application form for accreditation of PT providers",
    href: "https://aaa-accreditation.org/wp-content/uploads/2023/03/Application-form-PT-providers-V2.docx",
    meta: "DOCX",
  },
  {
    label: "Checklist for ISO/IEC 17043",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Checklist-for-ISO-17043.docx",
    meta: "DOCX",
  },
  {
    label: "Proficiency Testing policy",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Proficiency-Testing-policy.pdf",
    meta: "PDF",
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
    q: "What is a proficiency testing scheme?",
    a: "A proficiency testing scheme is the design and operation of an interlaboratory comparison, in one or more rounds, for a defined type of item, test or measurement. Participants examine the same material and their results are compared with an assigned value so that their performance can be evaluated against criteria agreed before the round begins.",
  },
  {
    q: "How are proficiency testing items checked before distribution?",
    a: "The provider must show that the batch of items is sufficiently homogeneous, and — where the property could change over the round — sufficiently stable. This matters because a participant should be scored on its own performance, not on variation between the items it happened to receive.",
  },
  {
    q: "How is participant performance evaluated?",
    a: "Each participant's result is compared with the assigned value using the statistical design set out in the scheme documentation, commonly through standardized performance scores such as z-scores. The assigned value, its uncertainty and the criteria for acceptable performance are established before results are evaluated and are explained in the report issued to participants.",
  },
  {
    q: "Can a provider subcontract part of a scheme?",
    a: "Yes. A provider may subcontract work such as item production, testing for homogeneity or statistical analysis, provided it retains responsibility for the scheme, informs participants, and can demonstrate the competence of the subcontractor for the work performed.",
  },
  {
    q: "Why do laboratories take part in proficiency testing?",
    a: "Testing, calibration and medical laboratories need objective evidence that their results are valid. Participation in an accredited scheme is one of the principal ways of meeting the requirements of ISO/IEC 17025 and ISO 15189 for monitoring the validity of results, alongside internal quality control.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Programs", path: "/programs/conformity-assessment-bodies" },
            { name: "Proficiency Testing Providers Accreditation", path: PATH },
          ]),
          serviceSchema({
            name: "Proficiency Testing Providers Accreditation (ISO/IEC 17043)",
            description:
              "Accreditation of proficiency testing providers against ISO/IEC 17043, covering scheme design, preparation of PT items, assigned values, statistical analysis and reporting.",
            path: PATH,
            standard: "ISO/IEC 17043",
            audience: "Proficiency testing providers",
          }),
          faqSchema(FAQ),
        ]}
      />
      <ProgramPage
        title="Proficiency Testing Providers Accreditation"
        standard="ISO/IEC 17043"
        intro="AAA offers an internationally recognized accreditation program for proficiency testing providers — the organizations that take responsibility for all aspects of the development and operation of proficiency testing schemes."
        hero="/about/team-advisory.jpg"
        heroCaption={{
          kicker: "AAA accreditation",
          title: "Proficiency testing",
          chip: "ISO/IEC 17043",
        }}
        metrics={[
          { v: "ISO/IEC 17043", k: "Anchor standard" },
          { v: "Per scheme", k: "Scope granted" },
          { v: "3 years", k: "Accreditation cycle" },
          { v: "Annual", k: "Surveillance" },
        ]}
        overview={[
          "Proficiency testing providers are organizations that take responsibility for all aspects of the development and operation of proficiency testing schemes.",
          "Requirements for AAA's accreditation program for proficiency testing providers are defined in ISO/IEC 17043:2010 — Conformity assessment — General requirements for proficiency testing.",
          "Accredited proficiency testing providers produce proficiency testing samples that compare results from similar testing laboratories, allowing those laboratories to assess and demonstrate the reliability of the data they produce, to identify areas where their testing and measurement methods need improvement, to identify further training needs of staff, to foster confidence in the performance of their testing and measurements, and to assure laboratory competence and confidence in results.",
          "Because participating laboratories rely on the score they receive, the credibility of a scheme rests on details that are invisible from the outside: whether the items distributed were genuinely homogeneous, how the assigned value was established, and whether the statistical design was fixed before the results arrived. Accreditation to ISO/IEC 17043 puts exactly those decisions under independent assessment.",
        ]}
        whoFor={[
          "Organizations that design and operate proficiency testing schemes for testing, calibration or medical laboratories",
          "Organizers of interlaboratory comparisons in a defined technical field or industry sector",
          "Sector bodies and industry associations running proficiency schemes for their members",
          "Reference material producers and laboratories that also operate proficiency testing schemes",
          "Regulators and scheme owners needing independent confirmation that a scheme is technically and statistically sound",
          "Providers whose participants must cite accredited proficiency testing in their own ISO/IEC 17025 or ISO 15189 accreditation",
        ]}
        scopeHeading="What the assessment covers"
        scope={[
          "Impartiality, confidentiality and conflicts of interest — including protection of participant identity and results.",
          "Competence of personnel — scheme coordinators, technical advisers and the statisticians responsible for the design and analysis.",
          "Design of proficiency testing schemes — the statistical design, the number and frequency of rounds, and the criteria for evaluating performance, all fixed in advance.",
          "Preparation of proficiency testing items — production or procurement, and the assessment of homogeneity and, where relevant, stability.",
          "Handling, storage, packaging, labelling and distribution of items so that every participant receives comparable material in a comparable condition.",
          "Assignment of values — the method used to establish the assigned value and its uncertainty, and the traceability of that value where applicable.",
          "Statistical analysis, evaluation of performance and reporting — performance statistics interpreted against the pre-established criteria, and reports that present them clearly to participants.",
          "Subcontracting, records, complaints and appeals, and the management system, including internal audit, management review and corrective action.",
        ]}

        benefits={[
          "Independent confirmation that your scheme design, item homogeneity and statistics stand up to technical scrutiny",
          "Participants can cite your accredited scheme as evidence when demonstrating the validity of their own results",
          "Credibility with regulators and sector bodies that specify accredited proficiency testing in their requirements",
          "A means of demonstrating your competence to your clients, and a passport to tenders that require accredited providers",
          "Clearer, more defensible reports — the assigned value and performance criteria are documented before results are evaluated",
          "Annual surveillance that keeps scheme design, statistical treatment and reporting under continuous review",
        ]}
        documents={DOCUMENTS}
        documentsHeading="Documents related to the accreditation of proficiency testing providers"
        faq={FAQ}
        related={[
          { href: "/programs/conformity-assessment-bodies", label: "All conformity assessment programs" },
          { href: "/programs/iso-17025", label: "Testing & Calibration Laboratories (ISO/IEC 17025)" },
          { href: "/programs/iso-15189", label: "Medical Laboratories (ISO 15189)" },
          { href: "/programs/iso-17020", label: "Inspection Bodies (ISO/IEC 17020)" },
        ]}
      />
    </>
  );
}
