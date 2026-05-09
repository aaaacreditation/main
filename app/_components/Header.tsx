"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "./Icon";

const PROGRAMS = [
  { href: "/programs/healthcare", label: "Healthcare Accreditation" },
  { href: "/programs/conformity-assessment-bodies", label: "Conformity Assessment Bodies" },
  { href: "/programs/training-education", label: "Training & Education Providers" },
];

const ABOUT = [
  { href: "/about", label: "About AAA" },
  { href: "/about-accreditation", label: "About Accreditation" },
  { href: "/news", label: "AAA News (Insights)" },
  { href: "/advisory-committees", label: "Advisory Technical Committees" },
  { href: "/impartiality-policy", label: "Safeguarding Impartiality Policy" },
  { href: "/partnerships", label: "National & International Partnership" },
];

const MEMBERSHIP = [
  { href: "/membership", label: "Membership Overview" },
  { href: "/membership/individual", label: "Individual Membership" },
  { href: "/membership/organizational", label: "Organizational Membership" },
];

const DIRECTORY = [
  { href: "/directory/accredited-organizations", label: "Accredited Organizations" },
  { href: "https://adcp.aaa-accreditation.org", label: "Accredited Personnel ↗" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="utility-bar">
        <div className="container">
          <div className="row">
            <div className="utility-left">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <Icon name="pin" size={12} /> Headquartered in Virginia, USA
              </span>
              <span className="dot" />
              <span>Operating across 60+ countries</span>
            </div>
            <div className="utility-right">
              <Link href="/apply">Apply</Link>
              <Link href="/about-accreditation">AAA Academy</Link>
              <Link href="/documents">Documents</Link>
              <Link href="/contact">Contact</Link>
              <span className="utility-divider" />
              <a href="#" aria-label="LinkedIn"><Icon name="linkedin" size={14} /></a>
              <a href="#" aria-label="Twitter"><Icon name="twitter" size={14} /></a>
              <a href="#" aria-label="YouTube"><Icon name="youtube" size={14} /></a>
            </div>
          </div>
        </div>
      </div>

      <header className={"site-header" + (scrolled ? " scrolled" : "")}>
        <div className="container">
          <div className="row">
            <Link href="/" className="brand" aria-label="American Accreditation Association — home">
              <Image
                src="/logo/AAA-Logo.png"
                alt="American Accreditation Association"
                width={350}
                height={120}
                priority
                className="brand-logo"
              />
            </Link>

            <nav className="nav">
              <span className="nav-item">
                <Link href="/about" className="has-caret">About</Link>
                <span className="nav-dropdown">
                  {ABOUT.map((i) => (
                    <Link key={i.href} href={i.href}>{i.label}</Link>
                  ))}
                </span>
              </span>
              <span className="nav-item">
                <Link href="/programs/healthcare" className="has-caret">Programs</Link>
                <span className="nav-dropdown">
                  {PROGRAMS.map((i) => (
                    <Link key={i.href} href={i.href}>{i.label}</Link>
                  ))}
                </span>
              </span>
              <span className="nav-item">
                <Link href="/membership" className="has-caret">Membership</Link>
                <span className="nav-dropdown">
                  {MEMBERSHIP.map((i) => (
                    <Link key={i.href} href={i.href}>{i.label}</Link>
                  ))}
                </span>
              </span>
              <span className="nav-item">
                <Link href="/directory/accredited-organizations" className="has-caret">Directory</Link>
                <span className="nav-dropdown">
                  {DIRECTORY.map((i) =>
                    i.href.startsWith("http") ? (
                      <a key={i.href} href={i.href} target="_blank" rel="noreferrer">{i.label}</a>
                    ) : (
                      <Link key={i.href} href={i.href}>{i.label}</Link>
                    )
                  )}
                </span>
              </span>
              <Link href="/news">Insights</Link>
            </nav>

            <div className="header-right">
              <button className="search-btn" aria-label="Search"><Icon name="search" size={16} /></button>
              <Link href="/quote" className="btn btn-primary">
                Get a Quote <Icon name="arrow" size={14} className="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
