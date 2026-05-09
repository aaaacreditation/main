import type { Metadata } from "next";
import Link from "next/link";
import CTA from "../../_components/CTA";
import Icon from "../../_components/Icon";
import type { IconName } from "../../_components/Icon";

export const metadata: Metadata = {
  title: "Training & Education Providers",
  description:
    "AAA accreditation for training and education providers, including program recognition, instructor requirements, digital certificates, and ADCP directory visibility.",
};

const MEANS = [
  "Curriculums, including presentations, handouts, course tutor notes, exercises, and case studies, are relevant to the Body of Knowledge and kept up-to-date with changes to the course topic.",
  "Instructors and tutors are appropriately qualified, skilled in teaching, experienced in the subject area, and familiar with the course topic.",
  "The institution has the capability to offer the courses in terms of organization, resources, trainers, and operational controls.",
];

const BENEFITS = [
  {
    title: "International Recognition",
    body:
      "Accreditation is proof of your ability to meet high levels of professionalism in course material and course provision. It is a mark of quality.",
  },
  {
    title: "Accreditation symbol and mark from AAA",
    body:
      "Use the AAA accreditation mark to communicate that your training program has been independently reviewed against defined requirements.",
  },
  {
    title: "Add your certified students to the directory",
    body:
      "Accredited organizations can list certified trainees, staff, and students on a recognized platform for easier verification.",
  },
  {
    title: "Demonstrate adoption of new technologies",
    body:
      "Digital validation, online records, and directory visibility show clients that your organization maintains modern credentialing practices.",
  },
  {
    title: "Expand into new markets",
    body:
      "International visibility helps training providers reach learners, employers, and partners outside their home market.",
  },
  {
    title: "Increase revenues",
    body:
      "Accredited programs can command stronger trust, helping providers convert interest into enrollments and institutional partnerships.",
  },
  {
    title: "Access to our researches",
    body:
      "Accredited providers can access AAA research, standards updates, and program guidance supporting continuous improvement.",
  },
];

const REQUIREMENTS = [
  {
    title: "Accreditation Requirements for Training Providers",
    items: [
      "The institution must provide proof that all applicable learning outcomes are covered in the course.",
      "The curriculum, including presentations, handouts, course tutor notes, exercises, and case studies, is relevant to the Body of Knowledge and kept up-to-date in line with changes to the training topic.",
    ],
  },
  {
    title: "Accreditation Requirements for Instructors",
    items: [
      "A minimum of five (5) years of relevant experience.",
      "Relevant qualifications related to the area of learning.",
    ],
  },
];

const FEATURES: { icon: IconName; title: string; image?: string; bullets: string[] }[] = [
  {
    icon: "clipboard",
    title: "Adding Certified Personnel",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1000&q=82",
    bullets: [
      "Accredited organizations can list certified trainees and employees in the directory.",
      "This listing enhances the visibility of qualifications and skills on a recognized platform.",
    ],
  },
  {
    icon: "cert",
    title: "Digital Certificates with Validation",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=82",
    bullets: [
      "You can issue digital certificates to your certified personnel.",
      "Each certificate includes a unique URL link validated by AAA, providing authenticity and credibility.",
    ],
  },
  {
    icon: "shield",
    title: "Dedicated Login Credentials",
    bullets: [
      "Each accredited organization is provided with a separate email ID and password to access the ADCP.",
      "Using these credentials, organizations can create and manage certificates for students and trainees completing accredited courses.",
    ],
  },
  {
    icon: "globe",
    title: "Enhanced Credibility and Reputation",
    bullets: [
      "Being listed in the ADCP demonstrates your organization's commitment to maintaining high standards.",
      "This strengthens your brand reputation and supports trust among stakeholders and clients.",
    ],
  },
];

const STORIES = [
  {
    name: "Shoeb Shaikh",
    role: "Head, Cinute Digital Center",
    location: "Mumbai, India",
    quote:
      "AAA Accreditation increased our reach, ensured the quality of education that we provide, and provided learners with trust and assurance in our institution.",
  },
  {
    name: "Willena McGee",
    role: "CEO, Uplifted Abilities",
    location: "South Carolina, USA",
    quote:
      "Achieving AAA accreditation is a significant milestone for our institution. It validates our commitment to high standards and enhances our credibility within the industry.",
  },
];

function TEHero() {
  return (
    <section className="te-hero">
      <div className="te-hero-media" aria-hidden="true" />
      <div className="container">
        <div className="te-crumbs">
          <Link href="/">Home</Link>
          <span />
          <Link href="/programs/healthcare">Programs</Link>
          <span />
          <strong>Training & Education Providers</strong>
        </div>
        <div className="te-hero-content">
          <span className="eyebrow">Accreditation Program</span>
          <h1>
            <span>Training & Education</span>
            <span>Providers Accreditation</span>
          </h1>
          <p>
            Accreditation of training and education providers ensures that
            competence delivered through courses is demonstrable, auditable, and
            portable across borders.
          </p>
          <div className="te-hero-actions">
            <Link href="/quote" className="btn btn-gold">
              Request a Quote <Icon name="arrow" size={14} className="arrow" />
            </Link>
            <Link href="#application" className="btn btn-ghost-light">
              Download Application <Icon name="download" size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TEIntro() {
  return (
    <section className="te-intro">
      <div className="container">
        <div className="te-intro-grid">
          <div className="te-intro-copy">
            <span className="eyebrow">Program Recognition</span>
            <h2>Formal recognition for course quality, instructor competence, and learner trust.</h2>
            <p>
              AAA accreditation for training and education providers offers the
              opportunity to have programs formally recognized. Accreditation
              brings together the value of the AAA brand and your organization&apos;s
              own knowledge and skills to create effective, validated programs.
            </p>
            <p>
              Courses may be classroom, workshop-based, or e-learning. They can
              be of any length and delivered anywhere in the world.
              Accreditation covers the course materials and the individuals who
              perform the programs.
            </p>
          </div>

          <div className="te-intro-visual">
            <div className="te-photo-main" />
            <div className="te-photo-card">
              <Icon name="cert" size={24} />
              <strong>ASTM E-2659</strong>
              <span>Certificate program recognition</span>
            </div>
          </div>
        </div>

        <div className="te-means">
          <h3>Accreditation of a training and education provider means that:</h3>
          <ul>
            {MEANS.map((item) => (
              <li key={item}>
                <Icon name="check" size={15} strokeWidth={1.9} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function TEBenefits() {
  return (
    <section className="te-benefits">
      <div className="container">
        <div className="te-section-head">
          <span className="eyebrow">Benefits</span>
          <h2 className="section-heading">Benefits of accreditation for your training and education programs.</h2>
        </div>
        <div className="te-benefit-list">
          {BENEFITS.map((benefit, index) => (
            <details className="te-benefit" key={benefit.title} open={index === 0}>
              <summary>
                <span>{benefit.title}</span>
                <Icon name="arrow" size={14} />
              </summary>
              <p>{benefit.body}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function TERequirements() {
  return (
    <section className="te-requirements">
      <div className="container">
        <div className="te-req-grid">
          {REQUIREMENTS.map((group) => (
            <article className="te-req-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <Icon name="check" size={15} strokeWidth={1.9} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TESuccess() {
  return (
    <section className="te-success">
      <div className="container">
        <div className="te-section-head centered">
          <span className="eyebrow">Accredited Institutions</span>
          <h2 className="section-heading">We&apos;re proud of the success our accredited institutions have seen.</h2>
        </div>
        <div className="te-story-grid">
          {STORIES.map((story) => (
            <article className="te-story" key={story.name}>
              <div className="te-story-avatar">{story.name.split(" ").map((part) => part[0]).join("")}</div>
              <div>
                <h3>{story.name}</h3>
                <p className="role">{story.role}</p>
                <p className="loc">{story.location}</p>
                <blockquote>{story.quote}</blockquote>
              </div>
            </article>
          ))}
        </div>
        <div className="te-story-action">
          <Link href="/contact" className="btn btn-primary">
            Contact us <Icon name="mail" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TEAdcp() {
  return (
    <section className="te-adcp">
      <div className="container">
        <div className="te-adcp-head">
          <span className="eyebrow">ADCP</span>
          <h2>American Directory of Competent Personnel</h2>
        </div>

        <div className="te-adcp-intro">
          <p>
            The American Accreditation Association provides an exclusive platform
            for accredited organizations. Once your organization achieves
            accreditation, you gain a username and password to access this
            directory, which serves as a global platform to validate and showcase
            the competencies of certified trainees, staff, and students.
          </p>
          <div className="te-adcp-screen">
            <span>ADCP</span>
            <strong>American Directory of Competent Personnel</strong>
            <div className="search-line" />
          </div>
        </div>

        <div className="te-feature-grid">
          {FEATURES.map((feature) => (
            <article className="te-feature" key={feature.title}>
              {feature.image ? (
                <div className="te-feature-image" style={{ backgroundImage: `url(${feature.image})` }} />
              ) : (
                <div className="te-feature-icon">
                  <Icon name={feature.icon} size={44} strokeWidth={1.25} />
                </div>
              )}
              <h3>{feature.title}</h3>
              <ul>
                {feature.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Icon name="check" size={14} strokeWidth={1.9} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="te-global-card">
          <div>
            <h3>Global Recognition</h3>
            <p>
              The directory ensures international visibility, giving certified
              personnel and your organization a competitive edge in the global market.
            </p>
            <h3>Ease of Verification</h3>
            <p>
              Employers, partners, and stakeholders can easily verify certified
              personnel through the AAA-validated unique URL link.
            </p>
          </div>
          <div className="te-global-image" />
        </div>
      </div>
    </section>
  );
}

function TEApplication() {
  return (
    <section className="te-application" id="application">
      <div className="container">
        <div className="te-download">
          <h2>Now you can download the application form</h2>
          <Link href="/documents" className="btn btn-primary">
            Download Now <Icon name="download" size={14} />
          </Link>
        </div>

        <div className="te-contact-panel">
          <div>
            <span className="eyebrow">Contact</span>
            <h2>Start your accreditation conversation.</h2>
            <p>
              Share your organization details and our team will guide you through
              eligibility, scope, documentation, and next steps.
            </p>
          </div>
          <form className="te-contact-form">
            <input aria-label="Your Name" placeholder="Your Name" />
            <input aria-label="Your Email" placeholder="Your Email" type="email" />
            <input aria-label="Your Telephone Number" placeholder="Your Telephone Number" />
            <input aria-label="Subject" placeholder="Subject" />
            <textarea aria-label="Your Message" placeholder="Your Message" />
            <input aria-label="Referral source" placeholder="Where did you hear about AAA?" />
            <button type="button" className="btn btn-primary">Contact Us</button>
          </form>
        </div>
      </div>
    </section>
  );
}

function TESchool() {
  return (
    <section className="te-school">
      <div className="container">
        <article className="te-school-card">
          <div className="te-school-image" />
          <div>
            <span className="eyebrow">Related Program</span>
            <h2>School Accreditation</h2>
            <p>
              AAA also supports school accreditation pathways for institutions
              seeking recognized quality assurance in education delivery.
            </p>
            <Link href="/quote" className="btn btn-primary">
              Read More <Icon name="arrow" size={14} className="arrow" />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <>
      <TEHero />
      <TEIntro />
      <TEBenefits />
      <TERequirements />
      <TESuccess />
      <TEAdcp />
      <TEApplication />
      <TESchool />
      <CTA />
    </>
  );
}
