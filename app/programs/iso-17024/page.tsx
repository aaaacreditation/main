import type { Metadata } from "next";
import ProgramPage from "../../_components/ProgramPage";

export const metadata: Metadata = {
  title: "Personnel Certification Bodies Accreditation — ISO/IEC 17024",
  description:
    "AAA offers an internationally recognized accreditation program for bodies performing the certification of persons — evaluating the credibility, impartiality and technical competence of their certification services.",
};

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

export default function Page() {
  return (
    <ProgramPage
      title="Personnel Certification Bodies Accreditation"
      standard="ISO/IEC 17024"
      intro="AAA offers an internationally recognized accreditation program for the certification of persons — evaluating the credibility, impartiality and technical competence of certification bodies around the world."
      overview={[
        "AAA offers an internationally recognized accreditation program for the certification of persons.",
        "The AAA accreditation program for bodies performing the certification of persons provides services for many professional and trade persons, such as auditors, welders, career professionals and doctors.",
        "Certification bodies assess an individual's skills and ensure that those skills match the requirements of the work being performed.",
        "AAA accreditation evaluates and publicly identifies the credibility, impartiality and technical competence of an organization's certification services.",
        "Certification bodies from around the world seek AAA accreditation as proof that their work is in line with the most current national and international standards and regulations.",
      ]}
      documents={DOCUMENTS}
      documentsHeading="Documents related to the accreditation of Personnel Certification Bodies"
      related={[
        { href: "/programs/training-education", label: "Training Providers" },
        { href: "/programs/iso-17021", label: "System Certification (ISO/IEC 17021-1)" },
      ]}
    />
  );
}
