"use client";

import { useState } from "react";

type Cat = "team" | "board";

type Member = {
  name: string;
  role: string;
  bio: string;
  cat: Cat;
  img?: string;
};

const MEMBERS: Member[] = [
  {
    name: "Sakshi Mishra",
    role: "Partnerships Manager, SME Accreditation",
    cat: "team",
    bio: "Sakshi Mishra manages SME partnerships at AAA, helping growing businesses navigate the accreditation pathway and connect with the lenders and networks that support funding readiness.",
  },
  {
    name: "Anitha Niju",
    role: "SME Accreditation Executive",
    cat: "team",
    bio: "Anitha Niju supports SMEs throughout their accreditation journey, coordinating applications, documentation, and assessment scheduling to help businesses move efficiently toward funding-ready certification.",
  },
  {
    name: "Dr. Ruhina Khan",
    role: "Business Development Manager, Healthcare Accreditation",
    cat: "team",
    img: "https://healthcare.aaa-accreditation.org/team/Ruhina.jpg",
    bio: "Dr. Ruhina Khan is a healthcare operations strategist and accreditation expert dedicated to advancing international quality standards. She works closely with institutions to strengthen compliance, optimize systems, and build globally recognized credibility through structured, sustainable growth strategies.",
  },
  {
    name: "Willena McGee",
    role: "Board Member",
    cat: "board",
    img: "https://healthcare.aaa-accreditation.org/team/Willena.jpeg",
    bio: "Willena is an AAA board member and Founder and CEO of Uplifted Abilities. With over 20 years of experience in healthcare, project management, education, and consulting services, she guides organizations through accreditation, regulatory compliance, and business planning.",
  },
  {
    name: "Dr. Dawn Lindsey",
    role: "Board Member",
    cat: "board",
    img: "https://healthcare.aaa-accreditation.org/team/Dawn.jpeg",
    bio: "Dr. Dawn brings more than 25 years of experience in regulatory compliance, quality assurance, and operational governance. President and CEO of Vari-Tek LLC, she holds a PhD in Public Policy and Social Change and multiple certifications including Six Sigma, ISO, internal auditing, and Title IX compliance.",
  },
  {
    name: "Kara Heinrichs",
    role: "Board Member",
    cat: "board",
    img: "https://healthcare.aaa-accreditation.org/team/Kara.jpeg",
    bio: "Kara Heinrichs is a senior Learning and Leadership Development professional who has led onboarding, compliance-aligned learning systems, and performance evaluation frameworks at global organizations including Meta, LiveRamp, Auth0, and the Port of Seattle. She holds a PhD in Organizational Development.",
  },
  {
    name: "Michael Peters",
    role: "Board Member",
    cat: "board",
    img: "https://healthcare.aaa-accreditation.org/team/Michael.png",
    bio: "Michael is the CEO of Lazarus Alliance Certification and an internationally recognized cybersecurity consultant, executive, researcher, and author. He has contributed significantly to curriculum development for graduate programs in information security, advanced technology, cyberspace law, and privacy.",
  },
];

const TABS: { label: string; value: "all" | Cat }[] = [
  { label: "All", value: "all" },
  { label: "SME Team", value: "team" },
  { label: "Board Members", value: "board" },
];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => !w.endsWith("."))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function Avatar({ member }: { member: Member }) {
  const [failed, setFailed] = useState(false);
  if (member.img && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className="sme-team-avatar"
        src={member.img}
        alt={member.name}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className="sme-team-ph" aria-hidden="true">
      {initials(member.name)}
    </div>
  );
}

export default function HomeTeam() {
  const [filter, setFilter] = useState<"all" | Cat>("all");
  const shown = MEMBERS.filter((m) => filter === "all" || m.cat === filter);

  return (
    <>
      <div className="sme-team-tabs reveal" role="tablist" aria-label="Filter team members">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            role="tab"
            aria-selected={filter === t.value}
            className={"sme-team-tab" + (filter === t.value ? " active" : "")}
            onClick={() => setFilter(t.value)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="sme-team-grid reveal">
        {shown.map((m) => (
          <article className="sme-team-card" key={m.name} tabIndex={0}>
            <Avatar member={m} />
            <div className="sme-team-info">
              <h3>{m.name}</h3>
              <span className="role">{m.role}</span>
              <span className="hint">Hover to read more</span>
            </div>
            <div className="sme-team-overlay">
              <h3>{m.name}</h3>
              <span className="role">{m.role}</span>
              <span className="line" aria-hidden="true" />
              <p>{m.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
