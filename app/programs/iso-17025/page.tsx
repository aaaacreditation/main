import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import ProgramPage from "../../_components/ProgramPage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";

const PATH = "/programs/iso-17025";

export const metadata: Metadata = pageMeta({
  title: "Testing & Calibration Laboratories (ISO/IEC 17025)",
  description:
    "AAA accredits testing and calibration laboratories to ISO/IEC 17025 — technical competence, traceability to the SI and defensible measurement uncertainty.",
  path: PATH,
  keywords: [
    "ISO/IEC 17025 accreditation",
    "testing laboratory accreditation",
    "calibration laboratory accreditation",
    "measurement traceability",
  ],
});

const DOCUMENTS = [
  {
    label: "Application form for accreditation of testing / calibration labs",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-testing-cal-labs.doc",
    meta: "DOC",
  },
  {
    label: "Proficiency Testing policy",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Proficiency-Testing-policy.pdf",
    meta: "PDF",
  },
  {
    label: "Measurement Traceability policy",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Measurement-Traceability-policy.pdf",
    meta: "PDF",
  },
  {
    label: "Determination of uncertainty of measurement policy",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Determination-of-uncertainty-of-measurement-policy.pdf",
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
    q: "How is ISO/IEC 17025 different from ISO 9001?",
    a: "ISO 9001 addresses a quality management system. ISO/IEC 17025 additionally addresses technical competence — the people, methods, equipment, environmental conditions, metrological traceability and measurement uncertainty behind each result. Accreditation to ISO/IEC 17025 is therefore a statement about the validity of the laboratory's results, not only about its management system.",
  },
  {
    q: "Does the accreditation scope have to list every test and calibration?",
    a: "Accreditation is granted for a defined scope. The scope schedule identifies the tests or calibrations performed, the items or materials they apply to, the methods or standards used and, for calibration, the measurement range and the calibration and measurement capability. A laboratory can apply to extend its scope at any point in the cycle.",
  },
  {
    q: "Do we have to take part in proficiency testing?",
    a: "ISO/IEC 17025 requires procedures for monitoring the validity of results, and participation in proficiency testing or interlaboratory comparison is one of the principal ways of meeting that requirement where a suitable scheme is available. AAA's Proficiency Testing policy sets out how this applies to accredited laboratories.",
  },
  {
    q: "How is measurement uncertainty handled?",
    a: "Calibration laboratories evaluate the measurement uncertainty of every calibration they report. Testing laboratories identify the contributions to measurement uncertainty and evaluate it using an understanding of the method, the scope of the measurement and the results of validation. AAA's Determination of uncertainty of measurement policy sets out the expectations applied during assessment.",
  },
  {
    q: "Can an accredited laboratory issue statements of conformity?",
    a: "Yes, provided the decision rule used is documented and applied, agreed with the customer where they have not specified one, and reported clearly so the reader knows which results the statement covers and what rule was used.",
  },
  {
    q: "Can sampling and on-site testing be included?",
    a: "Yes. Where the laboratory carries out sampling, or performs testing at a customer's site rather than in a fixed facility, those activities are assessed against the same requirements — documented methods, competent personnel, controlled equipment and traceable records — and named in the scope.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Programs", path: "/programs/conformity-assessment-bodies" },
            { name: "Testing & Calibration Laboratories Accreditation", path: PATH },
          ]),
          serviceSchema({
            name: "Testing & Calibration Laboratories Accreditation (ISO/IEC 17025)",
            description:
              "Accreditation of testing and calibration laboratories against ISO/IEC 17025, covering competence, methods, metrological traceability, measurement uncertainty and reporting.",
            path: PATH,
            standard: "ISO/IEC 17025",
            audience: "Testing and calibration laboratories",
          }),
          faqSchema(FAQ),
        ]}
      />
      <ProgramPage
        title="Testing & Calibration Laboratories Accreditation"
        standard="ISO/IEC 17025"
        intro="Carried out by a competent and impartial body, accredited testing and calibration guarantees that a laboratory delivers services that are reliable and traceable to the International System of Units."
        hero="/about/team-experts.jpg"
        heroCaption={{
          kicker: "AAA accreditation",
          title: "Testing & calibration",
          chip: "ISO/IEC 17025",
        }}
        metrics={[
          { v: "ISO/IEC 17025", k: "Anchor standard" },
          { v: "SI", k: "Traceability of results" },
          { v: "3 years", k: "Accreditation cycle" },
          { v: "Annual", k: "Surveillance" },
        ]}
        overview={[
          "Inaccurate testing and measurement results can have serious consequences for manufacturing processes and generate additional costs for businesses. The reliability of the measurements carried out is therefore essential — and this involves the testing and calibration of the equipment used.",
          "Carried out by a competent and impartial body, accredited testing and calibration guarantees that the laboratory delivers services that are reliable and traceable in the International System of Units.",
          "Thanks to multilateral arrangements, the testing and calibration certificates issued are recognised in many countries around the world, which facilitates trade.",
          "Gaining recognition for your laboratory's technical competence is a means of capturing new markets, since many organisational standards used by businesses require the traceability of measurements according to the International System of Units.",
          "Assessment against ISO/IEC 17025 covers both sides of the standard: the general, structural and management-system requirements that keep the laboratory impartial and in control of its records, and the resource and process requirements that decide whether a specific result can be relied upon.",
        ]}
        whoFor={[
          "Testing laboratories in manufacturing, construction, food, environmental, chemical and materials sectors",
          "Calibration laboratories providing traceable calibration of measuring and test equipment",
          "In-house laboratories that supply results used in their own organization's conformity decisions",
          "Laboratories that carry out sampling, or that test on customer sites rather than in a fixed facility",
          "Laboratories supporting regulators, purchasers or certification bodies that require accredited results",
          "Laboratories entering export markets where traceability to the International System of Units is expected",
        ]}
        scopeHeading="What the assessment covers"
        scope={[
          "Impartiality and confidentiality — structures and safeguards that keep laboratory activities free from commercial, financial and other pressures, and protect customer information.",
          "Competence of personnel — qualification, training, authorization and monitoring of everyone who influences a result.",
          "Facilities and environmental conditions — accommodation suitable for the activities, with the monitoring and control the methods require.",
          "Equipment — selection, verification before use, calibration, maintenance, and the handling of equipment found to be out of specification.",
          "Metrological traceability — an unbroken chain of calibrations to the International System of Units, through appropriate references and calibration providers.",
          "Methods, sampling and handling of items — the right method for the purpose, verified before use and validated where non-standard, plus sampling plans and the transport, receipt and storage of items.",
          "Measurement uncertainty and validity of results — identification and evaluation of uncertainty, internal quality control, and participation in proficiency testing or interlaboratory comparison.",
          "Reporting of results — test reports and calibration certificates carrying the required information, plus statements of conformity and the decision rule applied.",
        ]}

        benefits={[
          "Independent proof that your results are reliable and traceable to the International System of Units",
          "Test and calibration certificates that are recognised in many countries around the world, which facilitates trade",
          "Recognition of technical competence that opens new markets, where standards require SI-traceable measurement",
          "Eliminates the need for repetitive testing, certification and inspection across supply chains",
          "A means of demonstrating your competence to your clients, and a passport to tenders that require accredited laboratories",
          "Annual surveillance that keeps methods, equipment control and uncertainty budgets under continuous review",
        ]}
        documents={DOCUMENTS}
        documentsHeading="Documents related to the accreditation of testing & calibration labs"
        faq={FAQ}
        related={[
          { href: "/programs/conformity-assessment-bodies", label: "All conformity assessment programs" },
          { href: "/programs/iso-15189", label: "Medical Laboratories (ISO 15189)" },
          { href: "/programs/iso-17043", label: "Proficiency Testing Providers (ISO/IEC 17043)" },
          { href: "/programs/iso-17020", label: "Inspection Bodies (ISO/IEC 17020)" },
        ]}
      />
    </>
  );
}
