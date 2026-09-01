import type { Metadata } from "next";
import JsonLd from "../../_components/JsonLd";
import ProgramPage from "../../_components/ProgramPage";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "../../../lib/seo";

const PATH = "/programs/iso-17024";

export const metadata: Metadata = pageMeta({
  title: "Personnel Certification Bodies (ISO/IEC 17024)",
  description:
    "AAA accredits bodies certifying persons to ISO/IEC 17024 — independent recognition of scheme design, examination integrity and impartial decisions.",
  path: PATH,
  keywords: [
    "ISO/IEC 17024 accreditation",
    "personnel certification body",
    "certification of persons",
    "certification scheme accreditation",
  ],
});

const DOCUMENTS = [
  {
    label: "Application form for accreditation of personnel certification body",
    href: "https://aaa-accreditation.org/wp-content/uploads/2020/04/Application-form-personnel-certfication.doc",
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
    q: "What is a certification scheme under ISO/IEC 17024?",
    a: "A scheme is the set of competence and other requirements for a specific category of persons, together with the processes used to assess them. It is developed and maintained with the fair and balanced participation of the interested parties it affects, and the competence requirements are derived from an analysis of the tasks the certified person is expected to perform.",
  },
  {
    q: "Can a certification body also deliver training for its own scheme?",
    a: "ISO/IEC 17024 permits it, but the body must demonstrate that training does not compromise confidentiality, information security or impartiality — in particular the security of examination material. It must not state or imply that certification would be simpler, easier or less expensive if a candidate uses its training, and the certification decision must remain independent of the training function.",
  },
  {
    q: "Who is allowed to make the certification decision?",
    a: "The decision is made by the certification body on the basis of the information gathered during the certification process, by a person or committee that did not take part in the examination or the training of that candidate. Examiners assess; they do not decide.",
  },
  {
    q: "Are examinations assessed as part of accreditation?",
    a: "Yes. Examinations must be planned and structured so that they are fair, valid and reliable, and so that they verify the competences defined in the scheme. Assessment covers how examination material is developed and reviewed, how security is maintained, how examiners and invigilators are qualified and monitored, and how results are analysed.",
  },
  {
    q: "How is certification maintained after it is granted?",
    a: "Certification is granted for a defined period. The scheme sets out surveillance and recertification requirements and intervals that confirm continued competence, together with the conditions for suspending, withdrawing or reducing certification and the rules on how certificates and marks may be used.",
  },
  {
    q: "Is this the same as accrediting a training provider?",
    a: "No. ISO/IEC 17024 accredits bodies that certify persons. Accreditation of the organizations that design and deliver training and education is a separate AAA program based on ASTM E2659.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        schema={[
          breadcrumbSchema([
            { name: "Programs", path: "/programs/conformity-assessment-bodies" },
            { name: "Personnel Certification Bodies Accreditation", path: PATH },
          ]),
          serviceSchema({
            name: "Personnel Certification Bodies Accreditation (ISO/IEC 17024)",
            description:
              "Accreditation of bodies operating certification of persons against ISO/IEC 17024, covering scheme design, examinations, impartiality and certification decisions.",
            path: PATH,
            standard: "ISO/IEC 17024",
            audience: "Personnel certification bodies",
          }),
          faqSchema(FAQ),
        ]}
      />
      <ProgramPage
        title="Personnel Certification Bodies Accreditation"
        standard="ISO/IEC 17024"
        intro="AAA offers an internationally recognized accreditation program for the certification of persons — evaluating the credibility, impartiality and technical competence of certification bodies around the world."
        hero="/about/team-assessors.jpg"
        heroCaption={{
          kicker: "AAA accreditation",
          title: "Certification of persons",
          chip: "ISO/IEC 17024",
        }}
        metrics={[
          { v: "ISO/IEC 17024", k: "Anchor standard" },
          { v: "Per scheme", k: "Scope granted" },
          { v: "3 years", k: "Accreditation cycle" },
          { v: "Annual", k: "Surveillance" },
        ]}
        overview={[
          "AAA offers an internationally recognized accreditation program for the certification of persons.",
          "The AAA accreditation program for bodies performing the certification of persons provides services for many professional and trade persons, such as auditors, welders, career professionals and doctors.",
          "Certification bodies assess an individual's skills and ensure that those skills match the requirements of the work being performed.",
          "AAA accreditation evaluates and publicly identifies the credibility, impartiality and technical competence of an organization's certification services. Accreditation is granted per certification scheme, so the assessment looks at how each scheme was developed, how candidates are examined, and how the decision to certify is separated from the people who assessed them.",
          "Certification bodies from around the world seek AAA accreditation as proof that their work is in line with the most current national and international standards and regulations.",
        ]}
        whoFor={[
          "Bodies certifying individuals against a documented certification scheme, including auditors, welders, career professionals and doctors",
          "Professional and trade associations operating competency-based credentials for their members",
          "Scheme owners that run examinations, surveillance and recertification cycles for a defined occupation",
          "Bodies certifying practitioners in regulated, safety-critical or licensed occupations",
          "Certification bodies whose credentials need to be recognized by employers, regulators and clients in other countries",
          "Organizations separating an existing training business from an impartial certification function",
        ]}
        scopeHeading="What the assessment covers"
        scope={[
          "Certification scheme design — a scheme committee with fair and balanced participation, competence requirements derived from an analysis of the tasks performed, and periodic review of the scheme.",
          "Impartiality — identification of conflicts of interest arising from ownership, governance, personnel and finance, and the safeguards that keep decisions free from commercial pressure.",
          "Separation of training and certification — where the body also trains, evidence that impartiality, examination security and confidentiality are protected.",
          "Examination development and validation — examinations planned and structured to be fair, valid and reliable, with controlled item development, review and security.",
          "Competence of personnel — qualification criteria for examiners, invigilators and reviewers, plus monitoring of their performance.",
          "The certification process — application, assessment, examination and a certification decision made by people not involved in examining that candidate.",
          "Surveillance and recertification — defined intervals and criteria confirming that certified persons remain competent and continue to meet the scheme.",
          "Certificates, marks, complaints and appeals — control of how certification is claimed, a public record of certified persons, and impartial handling of complaints and appeals.",
        ]}
        benefits={[
          "Independent confirmation that your certification decisions are competent, impartial and defensible",
          "Recognition of your credential by employers, regulators and clients that require accredited certification of persons",
          "Evidence that examinations are fair, valid, reliable and secure — the point most often challenged by candidates",
          "A means of demonstrating your competence to your clients, and a passport to tenders that require accredited providers",
          "Greater mobility for the people you certify, whose credential is backed by an internationally recognized accreditation",
          "Annual surveillance that keeps scheme content, examinations and examiner competence current",
        ]}
        documents={DOCUMENTS}
        documentsHeading="Documents related to the accreditation of Personnel Certification Bodies"
        faq={FAQ}
        related={[
          { href: "/programs/conformity-assessment-bodies", label: "All conformity assessment programs" },
          { href: "/programs/iso-17021", label: "Management Systems Certification Bodies (ISO/IEC 17021-1)" },
          { href: "/programs/astm-e2659", label: "Training & Education Providers (ASTM E2659)" },
          { href: "/programs/iso-17065", label: "Product Certification Bodies (ISO/IEC 17065)" },
        ]}
      />
    </>
  );
}
