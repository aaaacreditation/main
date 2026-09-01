import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import ProgramPage from "../../_components/ProgramPage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";

const PATH = "/programs/iso-17065";

export const metadata: Metadata = pageMeta({
  title: "Product Certification Bodies (ISO/IEC 17065 & Halal)",
  description:
    "AAA accredits product certification bodies to ISO/IEC 17065, and Halal certification bodies to OIC/SMIIC 2, S 2055-2:2021 and GSO 2055-2:2021.",
  path: PATH,
  keywords: [
    "ISO/IEC 17065 accreditation",
    "product certification body",
    "Halal accreditation",
    "OIC/SMIIC 2",
    "GSO 2055-2",
  ],
});

const DOCUMENTS = [
  {
    label: "Application form for accreditation of system/product certification body",
    href: "https://aaa-accreditation.org/wp-content/uploads/2023/03/Application-form-system_product-certfication-Bodies.doc",
    meta: "DOC",
  },
  {
    label: "Application form for accreditation of Halal certification bodies",
    href: "https://aaa-accreditation.org/wp-content/uploads/2023/07/Application-form-Halal-certfication-Bodies-2.doc",
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
    q: "How does ISO/IEC 17065 differ from ISO/IEC 17021-1?",
    a: "ISO/IEC 17065 applies to bodies certifying products, processes and services — the certificate says something about the thing supplied. ISO/IEC 17021-1 applies to bodies certifying management systems, where the certificate says something about how the organization is run. A body may hold both accreditations, but they are assessed separately against different standards.",
  },
  {
    q: "Who can own a product certification scheme?",
    a: "Owners of product certification schemes include industry associations, regulatory authorities, and conformity assessment bodies. These owners can apply to AAA for either public or private schemes. During assessment AAA confirms that the scheme defines the products covered, the requirements they are certified against, and the evaluation activities used.",
  },
  {
    q: "Which Halal requirements does AAA accredit against?",
    a: "AAA operates Halal accreditation for certification bodies that certify products and services as halal according to OIC/SMIIC 2 — Conformity Assessment Bodies — Requirements for Bodies Providing Halal Certification; S 2055-2:2021 — General Requirements for Halal Certification Bodies; and GSO 2055-2:2021 — Halal Products — Part 2: General Requirements for Halal Certification Bodies.",
  },
  {
    q: "Who decides whether a product is certified?",
    a: "The evaluation, the review of the evaluation and the certification decision must be carried out by competent people, and the person or group taking the decision must not be the same as those who carried out the evaluation. This separation is one of the points examined most closely during assessment.",
  },
  {
    q: "Does a certification body have to publish what it has certified?",
    a: "Yes. ISO/IEC 17065 requires the body to maintain and make available a directory of certified products, so that anyone relying on a certificate can confirm that it is valid and current, together with information on suspended or withdrawn certifications.",
  },
  {
    q: "What happens when a certified product changes?",
    a: "The certification body must have arrangements for changes affecting certification — changes to the product, to the scheme, or to the requirements it is certified against — and for surveillance that confirms continuing conformity. Where conformity is no longer demonstrated, certification is reduced, suspended or withdrawn.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Programs", path: "/programs/conformity-assessment-bodies" },
            { name: "Product Certification Bodies Accreditation", path: PATH },
          ]),
          serviceSchema({
            name: "Product Certification Bodies Accreditation (ISO/IEC 17065 & Halal)",
            description:
              "Accreditation of bodies certifying products, processes and services against ISO/IEC 17065, and of Halal certification bodies against OIC/SMIIC 2, S 2055-2:2021 and GSO 2055-2:2021.",
            path: PATH,
            standard: "ISO/IEC 17065",
            audience: "Product certification bodies and Halal certification bodies",
          }),
          faqSchema(FAQ),
        ]}
      />
      <ProgramPage
        title="Product Certification Bodies Accreditation"
        standard="ISO/IEC 17065"
        intro="Product certification demonstrates that a product, process, or service meets the set requirements of established international schemes — and AAA also accredits Halal certification bodies against the OIC/SMIIC and GSO requirements."
        hero="/sectors/agri.jpg"
        heroCaption={{
          kicker: "AAA accreditation",
          title: "Product & Halal certification",
          chip: "ISO/IEC 17065",
        }}
        metrics={[
          { v: "ISO/IEC 17065", k: "Anchor standard" },
          { v: "Halal", k: "OIC/SMIIC · GSO schemes" },
          { v: "3 years", k: "Accreditation cycle" },
          { v: "Annual", k: "Surveillance" },
        ]}
        overview={[
          "Product certification demonstrates that a product, process, or service meets the set requirements of established international schemes. Accreditation requirements are specified in ISO/IEC 17065 — Conformity assessment — Requirements for bodies certifying products, processes and services.",
          "Owners of product certification schemes include industry associations, regulatory authorities, and conformity assessment bodies. These owners can apply to AAA for either public or private schemes.",
          "AAA also provides accreditation to Halal certification bodies in different fields, in accordance with internationally and regionally recognized accreditation standards and schemes. AAA operates Halal accreditation for certification bodies that certify products and services as halal according to OIC/SMIIC 2 — Conformity Assessment Bodies — Requirements for Bodies Providing Halal Certification; S 2055-2:2021 — General Requirements for Halal Certification Bodies; and GSO 2055-2:2021 — Halal Products — Part 2: General Requirements for Halal Certification Bodies.",
          "A product certificate is only worth what stands behind it. Assessment therefore concentrates on the evidence chain: how the scheme defines what is being certified, what evaluation was performed, who reviewed it, who took the decision, and how the certification is kept current once the product reaches the market.",
        ]}
        whoFor={[
          "Bodies certifying products, processes or services against public or private certification schemes",
          "Scheme owners — industry associations, regulatory authorities and conformity assessment bodies — seeking accreditation for a scheme they operate",
          "Halal certification bodies working to OIC/SMIIC 2, S 2055-2:2021 or GSO 2055-2:2021",
          "Certification bodies operating in food, agriculture, construction products, electrical and consumer goods",
          "Bodies whose certification supports regulatory approval, market access or export requirements",
          "Certification bodies that already hold management-system accreditation and want to add product certification",
        ]}
        scopeHeading="What the assessment covers"
        scope={[
          "Impartiality and the mechanism for safeguarding it — identification of risks arising from ownership, governance and commercial relationships, and the participation of interested parties.",
          "Legal, contractual and financial standing — legal identity, enforceable agreements with clients, liability arrangements and adequate resources.",
          "Competence of personnel — evaluators, reviewers and decision-makers assessed against defined competence criteria for each scheme.",
          "Evaluation resources — internal and external testing, inspection and audit inputs, including control of outsourced work.",
          "The certification process — application and application review, evaluation, review, and a certification decision taken independently of those who performed the evaluation.",
          "Certification documents, marks and the directory of certified products, so that certification can be verified by anyone relying on it.",
          "Surveillance, changes affecting certification, and the reduction, suspension or withdrawal of certification, together with complaints, appeals, records and the management system.",
          "Halal scheme requirements — the additional requirements of OIC/SMIIC 2, S 2055-2:2021 and GSO 2055-2:2021 for bodies providing Halal certification.",
        ]}        benefits={[
          "Independent confirmation that your certification decisions rest on competent evaluation and impartial review",
          "Recognition where regulators, purchasers or scheme owners require certification by an accredited body",
          "Halal certification bodies can demonstrate conformity with the OIC/SMIIC and GSO requirements referenced across many markets",
          "Eliminates the need for repetitive testing, certification and inspection, which facilitates trade",
          "A means of demonstrating your competence to your clients, and a passport to tenders that require accredited certification bodies",
          "Annual surveillance that keeps scheme control, evaluation practice and certification decisions under review",
        ]}
        documents={DOCUMENTS}
        documentsHeading="Documents related to the accreditation of Product Certification Bodies"
        faq={FAQ}
        related={[
          { href: "/programs/conformity-assessment-bodies", label: "All conformity assessment programs" },
          { href: "/programs/iso-17021", label: "Management Systems Certification Bodies (ISO/IEC 17021-1)" },
          { href: "/programs/iso-17020", label: "Inspection Bodies (ISO/IEC 17020)" },
          { href: "/programs/iso-17025", label: "Testing & Calibration Laboratories (ISO/IEC 17025)" },
        ]}
      />
    </>
  );
}
