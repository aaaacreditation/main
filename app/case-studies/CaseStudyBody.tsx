import CaseStudyVideo from "./CaseStudyVideo";

/**
 * Renders a case-study article body: the admin editor's HTML, with every
 * paragraph that holds nothing but a YouTube link turned into a player — the
 * editor has no video block, so "paste the link on its own line" is how staff
 * place a video. Images get lazy loading.
 */
const VIDEO_P =
  /<p>\s*<a\b[^>]*\bhref="https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})[^"]*"[^>]*>[^<]*<\/a>\s*<\/p>/g;

export default function CaseStudyBody({ html, title }: { html: string; title: string }) {
  const source = html.replace(/<img (?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async" ');
  const parts: ({ html: string } | { video: string })[] = [];
  let last = 0;
  for (const m of source.matchAll(VIDEO_P)) {
    if (m.index > last) parts.push({ html: source.slice(last, m.index) });
    parts.push({ video: m[1] });
    last = m.index + m[0].length;
  }
  if (last < source.length) parts.push({ html: source.slice(last) });

  return (
    <div className="cms-prose csx-prose">
      {parts.map((p, i) =>
        "video" in p ? (
          <CaseStudyVideo key={i} id={p.video} title={`${title} — video`} />
        ) : (
          <div key={i} className="csx-chunk" dangerouslySetInnerHTML={{ __html: p.html }} />
        )
      )}
    </div>
  );
}
