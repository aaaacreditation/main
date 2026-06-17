import Link from "next/link";
import Icon from "../Icon";

type Case = {
  quote: string;
  name: string;
  role: string;
  org: string;
  loc: string;
  std: string;
  initials: string;
};

// Two rows scrolling in opposite directions. Each row is duplicated once in
// render so the CSS marquee can loop seamlessly at translateX(-50%).
const ROW_A: Case[] = [
  {
    quote:
      "AAA's assessment was rigorous and fair. Accreditation to ISO 15189 opened doors with referral hospitals that now accept our results without question.",
    name: "Dr. Amina Okonkwo",
    role: "Laboratory Director",
    org: "Meridian Medical Laboratories",
    loc: "Lagos, Nigeria",
    std: "ISO 15189",
    initials: "MM",
  },
  {
    quote:
      "Becoming an AAA-accredited testing laboratory gave our clients the international confidence they needed. Cross-border contracts followed within months.",
    name: "Lars Henriksson",
    role: "Quality Manager",
    org: "Nordic Materials Testing",
    loc: "Gothenburg, Sweden",
    std: "ISO/IEC 17025",
    initials: "NM",
  },
  {
    quote:
      "The process sharpened our impartiality controls. Our certificates now carry weight in markets that previously required re-testing.",
    name: "Priya Raman",
    role: "Scheme Manager",
    org: "Crest Certification Services",
    loc: "Bengaluru, India",
    std: "ISO/IEC 17065",
    initials: "CC",
  },
  {
    quote:
      "AAA recognition validated our programs against an international benchmark. Enrolment from corporate clients rose noticeably the following year.",
    name: "Daniel Mbeki",
    role: "Director of Education",
    org: "Summit Professional Academy",
    loc: "Nairobi, Kenya",
    std: "ASTM E2659",
    initials: "SP",
  },
  {
    quote:
      "Our inspection reports are now accepted across the region. The AAA mark removed a barrier we had struggled with for years.",
    name: "Carla Ferreira",
    role: "Operations Lead",
    org: "Atlantic Inspection Group",
    loc: "Porto, Portugal",
    std: "ISO/IEC 17020",
    initials: "AI",
  },
];

const ROW_B: Case[] = [
  {
    quote:
      "Accreditation reshaped how we approach patient safety. The framework gave our teams a shared standard to rally around.",
    name: "Dr. Hassan Al-Rashid",
    role: "Chief Medical Officer",
    org: "Al Noor Specialist Hospital",
    loc: "Amman, Jordan",
    std: "Healthcare",
    initials: "AN",
  },
  {
    quote:
      "Certifying our personnel through an AAA-accredited scheme gave employers real assurance. Our certified professionals are now in demand.",
    name: "Mei-Ling Chen",
    role: "Certification Lead",
    org: "Pacific Skills Institute",
    loc: "Taipei, Taiwan",
    std: "ISO/IEC 17024",
    initials: "PS",
  },
  {
    quote:
      "AAA held us to a high bar on competence and consistency — exactly the discipline our management-systems clients expect.",
    name: "Tomás Herrera",
    role: "Managing Director",
    org: "Vanguard Compliance Bureau",
    loc: "Monterrey, Mexico",
    std: "ISO/IEC 17021",
    initials: "VC",
  },
  {
    quote:
      "Proficiency-testing accreditation set us apart immediately. Laboratories choose our schemes because the AAA mark guarantees reliability.",
    name: "Sophie Dubois",
    role: "Programme Director",
    org: "Calibre Proficiency Schemes",
    loc: "Lyon, France",
    std: "ISO/IEC 17043",
    initials: "CP",
  },
  {
    quote:
      "International accreditation gave our graduates' credentials global currency. Partner universities now recognise our programs directly.",
    name: "Prof. Robert Adeyemi",
    role: "Vice-Chancellor",
    org: "Woodcroft University",
    loc: "Accra, Ghana",
    std: "School Accreditation",
    initials: "WU",
  },
];

function CaseCard({ c }: { c: Case }) {
  return (
    <figure className="cs-card">
      <span className="cs-qmark" aria-hidden>
        &rdquo;
      </span>
      <span className="cs-badge">{c.std}</span>
      <blockquote className="cs-quote">{c.quote}</blockquote>
      <figcaption className="cs-by">
        <span className="cs-avatar" aria-hidden>
          {c.initials}
        </span>
        <span className="cs-id">
          <span className="cs-name">{c.name}</span>
          <span className="cs-role">
            {c.role}, {c.org}
          </span>
          <span className="cs-loc">{c.loc}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function CaseStudies() {
  return (
    <section className="block cases-block" id="case-studies">
      <div className="container">
        <div className="block-head reveal" style={{ textAlign: "center", display: "block" }}>
          <span className="eyebrow" style={{ display: "inline-flex" }}>
            Case Studies
          </span>
          <h2 className="section-heading" style={{ maxWidth: "22ch", margin: "14px auto 16px" }}>
            Trusted by organizations across the world.
          </h2>
          <p className="cases-lede">
            From medical laboratories to universities, see how AAA accreditation helps
            organizations earn recognition, open new markets, and raise the bar on quality.
          </p>
        </div>
      </div>

      <div className="cs-rows reveal" aria-label="Accreditation success stories">
        <div className="cs-row">
          <div className="cs-track">
            {[...ROW_A, ...ROW_A].map((c, i) => (
              <CaseCard c={c} key={`a-${i}`} />
            ))}
          </div>
        </div>
        <div className="cs-row reverse">
          <div className="cs-track">
            {[...ROW_B, ...ROW_B].map((c, i) => (
              <CaseCard c={c} key={`b-${i}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="cases-foot">
          <Link href="/directory/accredited-organizations" className="ed-link cases-ed-link">
            Explore accredited organizations <Icon name="arrow" size={14} className="arrow" />
          </Link>
        </div>
      </div>
    </section>
  );
}
