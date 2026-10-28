import Image from "next/image";
import Link from "next/link";
import PageHero from "../../_components/PageHero";
import CTA from "../../_components/CTA";
import NavyCard from "../../_components/site/NavyCard";
import SectionHead from "../../_components/site/SectionHead";
import Glyph from "../../_components/site/Glyph";
import { CONTACT } from "@/lib/facts";
import SchemeVideo from "./SchemeVideo";
import SchemeAdvisorForm from "./SchemeAdvisorForm";
import type { SchemeData, SchemeDoc, SchemeQuote, SchemeTile } from "./types";
import "./scheme.css";

/*
 * Shared conformity-assessment scheme page (Oct 2026 client structure).
 * Eight routes render through this component so their section order, layout
 * and behaviour stay identical; only the data object changes per scheme.
 *
 *   01 Hero · 02 Who should apply · 03 Benefits · 04 Assessment areas ·
 *   05 Process + application/resources · 06 Testimonial · 07 FAQ · 08 CTA
 */

const pad = (i: number) => String(i + 1).padStart(2, "0");

function isExternal(href: string) {
  return href.startsWith("http");
}

function Quote({ q, compact }: { q: SchemeQuote; compact?: boolean }) {
  return (
    <figure className={"schx-quote" + (compact ? " compact" : "")}>
      <span className="schx-quote-mark" aria-hidden="true">
        <Glyph name="quote" size={compact ? 30 : 38} strokeWidth={1.5} />
      </span>
      <blockquote>{q.quote}</blockquote>
      <figcaption>
        <strong>{q.name}</strong>
        {q.lines?.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </figcaption>
    </figure>
  );
}

function Tiles({
  tiles,
  cols,
  numbered = true,
  compact,
}: {
  tiles: SchemeTile[];
  cols?: string;
  numbered?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={"ax-blue-grid" + (cols ? " " + cols : "")}>
      {tiles.map((t, i) => (
        <NavyCard key={t.title} icon={t.icon} no={numbered ? pad(i) : undefined} title={t.title} compact={compact}>
          {t.text && <p>{t.text}</p>}
        </NavyCard>
      ))}
    </div>
  );
}

function DocLink({ d }: { d: SchemeDoc }) {
  const view = d.meta === "VIEW";
  const inner = (
    <>
      <Glyph name={view ? "folder" : "file-text"} size={18} />
      <span className="schx-doc-label">{d.label}</span>
      <i>
        {view ? "View" : "Download"}
        {d.meta && !view ? ` · ${d.meta}` : ""}
        <Glyph name={view ? "arrow-right" : "download"} size={13} strokeWidth={2} />
      </i>
    </>
  );
  return (
    <li>
      {isExternal(d.href) ? (
        <a href={d.href} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <Link href={d.href}>{inner}</Link>
      )}
    </li>
  );
}

export default function SchemePage({ data }: { data: SchemeData }) {
  const { hero, advisor, suitability, benefits, areas, process, testimonial: tm, faq, cta } = data;
  const hasSide = Boolean(process.application || process.resources?.length);
  const areaCols = areas.tiles.length % 4 === 0 ? "four" : "";

  return (
    <div className={`axp schx schx-${data.slug}`}>
      {/* 01 — Hero */}
      <PageHero
        eyebrow={hero.standard}
        crumbs={[
          { href: "/programs", label: "Programs" },
          { href: "/programs/conformity-assessment-bodies", label: "Conformity Assessment Bodies" },
          { label: data.crumb },
        ]}
        title={hero.title}
        intro={hero.lead}
        image={hero.image}
        imageAlt={hero.imageAlt}
        caption={hero.caption ? { kicker: hero.standard, title: hero.caption } : undefined}
        meta={hero.stats}
        actions={
          <>
            <Link href="/apply" className="ax-btn ax-btn-gold">
              Apply for Accreditation <Glyph name="arrow-right" size={14} strokeWidth={2} />
            </Link>
            <a href={CONTACT.consultationUrl} target="_blank" rel="noopener noreferrer" className="ax-btn ax-btn-ghost">
              Book a Free Consultation
            </a>
          </>
        }
      />

      {/* 02 — Who should apply */}
      <section className="ax-section" id="who-should-apply">
        <div className={"container schx-suit" + (advisor ? "" : " solo")}>
          <div className="schx-suit-copy">
            <SectionHead eyebrow="Who Should Apply?" title={suitability.title} />
            <div className="ax-prose reveal">
              {suitability.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>

          {advisor && (
            <aside className="schx-advisor reveal" aria-labelledby={`${data.slug}-advisor-h`}>
              <div className="schx-advisor-head">
                <span className="ax-card-ico">
                  <Glyph name="message" />
                </span>
                <div>
                  <h3 id={`${data.slug}-advisor-h`}>Speak with an Accreditation Advisor</h3>
                  <p>{advisor.intro}</p>
                </div>
              </div>
              <SchemeAdvisorForm
                field={advisor.field}
                placeholder={advisor.placeholder}
                sector={advisor.sector}
                source={advisor.source}
              />
            </aside>
          )}
        </div>

        <div className="container">
          <h3 className="schx-label reveal">
            <span aria-hidden="true" />
            {suitability.label}
          </h3>
          <div className="schx-suit-grid">
            <Tiles tiles={suitability.tiles} cols="four" numbered={false} compact />
          </div>
        </div>
      </section>

      {/* 03 — Benefits */}
      <section className="ax-section cream" id="benefits">
        <div className="container">
          <SectionHead eyebrow="Benefits" title={benefits.title} />
          <div className="schx-benefits">
            <div className="schx-figures">
              {benefits.image ? (
                <figure className="schx-figure reveal">
                  <div className="schx-figure-img">
                    <Image
                      src={benefits.image.src}
                      alt={benefits.image.alt}
                      width={benefits.image.width}
                      height={benefits.image.height}
                      sizes="(max-width: 980px) 92vw, 460px"
                    />
                  </div>
                  <figcaption>
                    {benefits.captionTitle && <strong>{benefits.captionTitle}</strong>}
                    <span>{benefits.caption}</span>
                  </figcaption>
                </figure>
              ) : (
                <div className="schx-figure schx-figure-panel reveal">
                  <span className="ax-card-ico">
                    <Glyph name="chart" />
                  </span>
                  {benefits.captionTitle && <strong>{benefits.captionTitle}</strong>}
                  <p>{benefits.caption}</p>
                </div>
              )}
              {benefits.secondImage && (
                <figure className="schx-figure reveal">
                  <div className="schx-figure-img">
                    <Image
                      src={benefits.secondImage.src}
                      alt={benefits.secondImage.alt}
                      width={benefits.secondImage.width}
                      height={benefits.secondImage.height}
                      sizes="(max-width: 980px) 92vw, 460px"
                    />
                  </div>
                </figure>
              )}
            </div>
            <div className="ax-blue-grid two">
              {benefits.items.map((b, i) => (
                <NavyCard key={b.title} icon={b.icon} no={pad(i)} title={b.title}>
                  <p>{b.text}</p>
                </NavyCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Assessment areas */}
      <section className="ax-section" id="assessment-areas">
        <div className="container">
          <SectionHead center eyebrow="Assessment Areas" title="Key Areas Assessed During Accreditation" intro={areas.intro} />
          <Tiles tiles={areas.tiles} cols={areaCols} />
          {areas.note && (
            <p className="ax-note gold reveal schx-note">
              <Glyph name="cpu" size={22} />
              <span>
                <strong>{areas.note.title}</strong>
                {areas.note.text}
              </span>
            </p>
          )}
        </div>
      </section>

      {/* 05 — Process + application / resources */}
      <section className="ax-section cream" id="process">
        <div className="container">
          <SectionHead
            center={!hasSide}
            className={hasSide ? "" : "schx-process-head"}
            eyebrow="How It Works"
            title={process.title}
          />
          {/* Without an application card or resources the steps run left to right. */}
          <div className={hasSide ? "schx-process" : "schx-process flow"}>
            <div className="schx-rail-wrap">
              <h3 className="schx-label">
                <span aria-hidden="true" />
                Accreditation Process
              </h3>
              <ol className="schx-rail" style={{ "--n": process.steps.length } as React.CSSProperties}>
                {process.steps.map((s, i) => (
                  <li key={s.title} className="reveal">
                    <span className="schx-rail-no" aria-hidden="true">
                      {pad(i)}
                    </span>
                    <div className="schx-rail-card">
                      <span className="schx-rail-step">Step {i + 1}</span>
                      <h4>{s.title}</h4>
                      <p>{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {hasSide && (
              <aside className="schx-side">
                {process.application && (
                  <div className="schx-app reveal">
                    <span className="schx-app-ico" aria-hidden="true">
                      <Glyph name="file-text" />
                    </span>
                    <h3>Accreditation Application Form</h3>
                    <p>{process.application.text}</p>
                    <a
                      href={process.application.href}
                      className="ax-btn ax-btn-gold"
                      target={isExternal(process.application.href) ? "_blank" : undefined}
                      rel={isExternal(process.application.href) ? "noopener noreferrer" : undefined}
                    >
                      <Glyph name="download" size={15} strokeWidth={2} /> Download Application Form
                    </a>
                    <p className="schx-app-note">{process.application.note}</p>
                  </div>
                )}

                {process.resources && process.resources.length > 0 && (
                  <div className="schx-docs reveal">
                    <h3>{process.resourcesTitle ?? "Application Documents & Resources"}</h3>
                    <ul>
                      {process.resources.map((d) => (
                        <DocLink key={d.label} d={d} />
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            )}
          </div>
        </div>
      </section>

      {/* 06 — Testimonial(s) */}
      <section className="ax-section" id="testimonials">
        <div className="container">
          <SectionHead center eyebrow={tm.eyebrow ?? "Client Experience"} title={tm.title} intro={tm.intro} />

          {(tm.media || tm.quote || tm.story) && (
            <div className="schx-tm reveal">
              {tm.media && (
                <div className="schx-tm-media">
                  {tm.media.kind === "video" && <SchemeVideo id={tm.media.id} title={tm.media.title} />}
                  {tm.media.kind === "image" && (
                    <figure className="schx-tm-photo">
                      <Image
                        src={tm.media.image.src}
                        alt={tm.media.image.alt}
                        width={tm.media.image.width}
                        height={tm.media.image.height}
                        sizes="(max-width: 980px) 92vw, 560px"
                      />
                      {tm.media.caption && <figcaption>{tm.media.caption}</figcaption>}
                    </figure>
                  )}
                  {tm.media.kind === "logo" && (
                    <div className="schx-tm-logo">
                      <span className="schx-plate">
                        <Image
                          src={tm.media.image.src}
                          alt={tm.media.image.alt}
                          width={tm.media.image.width}
                          height={tm.media.image.height}
                          sizes="360px"
                        />
                      </span>
                      {tm.media.caption && <p>{tm.media.caption}</p>}
                    </div>
                  )}
                </div>
              )}
              <div className="schx-tm-copy">
                {tm.story && (
                  <div className="schx-story">
                    <h3>{tm.story.title}</h3>
                    <p>{tm.story.text}</p>
                  </div>
                )}
                {tm.quote && <Quote q={tm.quote} />}
              </div>
            </div>
          )}

          {tm.highlights && tm.highlights.length > 0 && (
            <div className="schx-highlights">
              <Tiles tiles={tm.highlights} numbered={false} />
            </div>
          )}

          {tm.cards && tm.cards.length > 0 && <Tiles tiles={tm.cards} />}

          {tm.clients && (
            <div className="schx-clients reveal">
              <div>
                <h3>{tm.clients.title}</h3>
                <p>{tm.clients.text}</p>
              </div>
              <span className="schx-plate wide">
                <Image
                  src={tm.clients.image.src}
                  alt={tm.clients.image.alt}
                  width={tm.clients.image.width}
                  height={tm.clients.image.height}
                  sizes="(max-width: 980px) 92vw, 620px"
                />
              </span>
            </div>
          )}

          {tm.second && (
            <div className="schx-second reveal">
              <figure className="schx-second-photo">
                <Image
                  src={tm.second.image.src}
                  alt={tm.second.image.alt}
                  width={tm.second.image.width}
                  height={tm.second.image.height}
                  sizes="(max-width: 760px) 60vw, 260px"
                />
              </figure>
              <Quote q={tm.second.quote} compact />
            </div>
          )}
        </div>
      </section>

      {/* 07 — FAQ */}
      <section className="ax-section cream" id="faq">
        <div className="container">
          <SectionHead center eyebrow="FAQ" title="Frequently Asked Questions" intro={faq.intro} />
          <div className="ax-faq-list reveal">
            {faq.items.map((f) => (
              <details className="ax-faq-item" key={f.q}>
                <summary>
                  {f.q}
                  <span className="ax-faq-plus" aria-hidden="true" />
                </summary>
                <div className="ax-faq-a">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 08 — Final CTA */}
      <CTA
        eyebrow="Take the Next Step"
        title={cta.title}
        text={cta.text}
        primary={{ href: "/apply", label: "Apply for Accreditation" }}
        secondary={{ href: CONTACT.consultationUrl, label: "Book a Free Consultation" }}
        related={data.related}
      />
    </div>
  );
}
