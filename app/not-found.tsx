import type { Metadata } from "next";
import Link from "@/app/_components/SiteLink";
import PageHero from "./_components/PageHero";
import NavyCard from "./_components/site/NavyCard";
import SectionHead from "./_components/site/SectionHead";
import Glyph from "./_components/site/Glyph";
import { CONTACT, PROGRAMS } from "@/lib/facts";

/**
 * Site-wide 404 (Nov 2026 SEO pass). Before this, a broken link showed the
 * bare framework page with no way back in. It keeps the 404 status (and Next
 * marks it noindex) but turns the dead end into the main entry points.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

const PATHS = [
  { href: PROGRAMS.healthcare.href, title: PROGRAMS.healthcare.label, icon: "heart-pulse", text: "Hospitals, clinics and care providers." },
  { href: PROGRAMS.cab.href, title: PROGRAMS.cab.label, icon: "shield-check", text: "Certification, inspection and laboratory accreditation." },
  { href: PROGRAMS.training.href, title: PROGRAMS.training.label, icon: "graduation", text: "Training centres, academies and e-learning providers." },
  { href: PROGRAMS.sme.href, title: PROGRAMS.sme.label, icon: "building", text: "Independent recognition for small and medium businesses." },
] as const;

export default function NotFound() {
  return (
    <div className="axp">
      <PageHero
        eyebrow="Error 404"
        badge={false}
        title={
          <>
            This page could not <em>be found.</em>
          </>
        }
        intro="The address may be mistyped, or the page may have moved when the website was rebuilt. Everything AAA published is still here — start from one of the pages below."
        crumbs={[{ label: "Page not found" }]}
        actions={
          <>
            <Link href="/" className="ax-btn ax-btn-gold">
              Go to the home page <Glyph name="arrow-right" size={16} strokeWidth={2} />
            </Link>
            <Link href={CONTACT.formHref} className="ax-btn ax-btn-ghost">
              Contact AAA
            </Link>
          </>
        }
      />

      <section className="ax-section">
        <div className="container">
          <SectionHead eyebrow="Accreditation programs" title="Looking for a program?" />
          <div className="ax-blue-grid four">
            {PATHS.map((p) => (
              <NavyCard key={p.href} icon={p.icon} title={p.title} href={p.href}>
                {p.text}
              </NavyCard>
            ))}
          </div>
        </div>
      </section>

      <section className="ax-section cream tight">
        <div className="container">
          <SectionHead eyebrow="Popular pages" title="Other places to start" />
          <ul className="ax-checks">
            <li>
              <Link href="/directory/accredited-organizations">Accredited organizations register</Link> — check whether an
              organization is accredited by AAA
            </li>
            <li>
              {/* Static app outside Next routing (public/adcp). */}
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/adcp/">Certificate verification portal</a> — verify an AAA certificate
            </li>
            <li>
              <Link href="/news">News &amp; announcements</Link> and <Link href="/articles">articles</Link>
            </li>
            <li>
              <Link href="/apply">Apply for accreditation</Link> · <Link href="/faq">Frequently asked questions</Link> ·{" "}
              <Link href="/about">About AAA</Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
