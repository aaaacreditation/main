import Image from "next/image";
import Glyph from "../site/Glyph";

export type SuccessStory = {
  name: string;
  sector: string;
  country: string;
  /** The organization's testimonial, without surrounding quote marks. */
  quote: string;
  /** Certificate photo, or the video thumbnail when `video` is set. */
  img: string;
  alt: string;
  /** CSS object-position for the photo crop (default "center"), e.g. "center 35%" to show more of the top. */
  imgPosition?: string;
  logo: string;
  /** Near-zero plate padding, for logos that otherwise render small (round or very wide marks). */
  logoTight?: boolean;
  /** YouTube URL — the card shows a play button and "Watch Video". */
  video?: string;
  /** Story page; falls back to the carousel's `moreHref`. */
  href?: string;
  /** Gold kicker line, used on the featured card. */
  metric?: string;
  featured?: boolean;
};

/**
 * Home "Success Stories" auto-scrolling carousel (client mockup 04, Oct 2026).
 *
 * The track holds the stories twice and slides by -50% on a CSS loop, so it
 * never jumps. Motion pauses on hover and on keyboard focus (CSS). The
 * duplicate set is `inert`, so screen readers and Tab only meet each story
 * once. Under prefers-reduced-motion the loop is dropped entirely and the
 * row becomes a native horizontal scroller with snap points (see home.css).
 *
 * Oct 2026 corrections: the "Carousel pauses on hover" hint and the Pause
 * stories button were removed at the client's request; hover/focus pausing
 * and the reduced-motion scroller remain.
 */
export default function SuccessCarousel({
  stories,
  moreHref,
}: {
  stories: readonly SuccessStory[];
  moreHref: string;
}) {
  const group = (clone: boolean) => (
    <ul className="hx-ss-group" inert={clone} aria-hidden={clone || undefined}>
      {stories.map((s, i) => {
        const href = s.video ?? s.href ?? moreHref;
        return (
          // Index in the key: stories are admin-managed, so two can share a name.
          <li key={`${s.name}-${i}`} className="hx-ss-item">
            <article className={`ax-card navy ax-blue hx-story${s.featured ? " featured" : ""}${s.video ? " video" : ""}`}>
              <figure className="hx-story-media">
                <Image
                  src={s.img}
                  alt={clone ? "" : s.alt}
                  fill
                  sizes="(max-width: 650px) 300px, 460px"
                  style={s.imgPosition ? { objectPosition: s.imgPosition } : undefined}
                  // Load up front: cards slide into view continuously, and lazy
                  // loading made each photo pop in late. The duplicate set
                  // reuses the same cached files.
                  loading="eager"
                  fetchPriority="low"
                />
                <span className="hx-story-sector">{s.sector}</span>
                <span className="hx-story-country">
                  <Glyph name="pin" size={14} strokeWidth={2} /> {s.country}
                </span>
                {s.video && (
                  // Mouse shortcut to the same video as the "Watch Video" link
                  // below, so it stays out of the tab order.
                  <a
                    href={s.video}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hx-story-play"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Glyph name="play" size={22} strokeWidth={2} />
                  </a>
                )}
              </figure>
              <div className="hx-story-body">
                {s.featured && <span className="ax-blue-tag">Featured Story</span>}
                {s.metric && <span className="hx-story-metric">{s.metric}</span>}
                <div className="hx-story-org">
                  <span className={"hx-story-logo" + (s.logoTight ? " tight" : "")}>
                    <Image src={s.logo} alt={clone ? "" : `${s.name} logo`} fill sizes="96px" />
                  </span>
                  <h3>{s.name}</h3>
                </div>
                <p className="hx-story-quote">“{s.quote}”</p>
                <div className="hx-story-foot">
                  <a href={href} target="_blank" rel="noopener noreferrer" className="hx-story-link">
                    {s.video ? "Watch Video" : "Read Story"}{" "}
                    <Glyph name={s.video ? "play" : "arrow-right"} size={14} strokeWidth={2} />
                    <span className="sr-only"> about {s.name} (opens in a new tab)</span>
                  </a>
                  <span className="hx-story-badge">
                    <Glyph name="badge-check" size={14} strokeWidth={2} /> Accredited
                  </span>
                </div>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );

  return (
    <div className="hx-ss">
      <div
        className="hx-ss-shell"
        role="region"
        aria-roledescription="carousel"
        aria-label="AAA success stories"
        tabIndex={-1}
      >
        <div className="hx-ss-track" style={{ "--hx-ss-dur": `${stories.length * 9}s` } as React.CSSProperties}>
          {group(false)}
          {group(true)}
        </div>
      </div>
    </div>
  );
}
