import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

/*
 * Small renderer for the markdown-ish plain text stored in posts-data.json.
 * Supported: "# .. #####" headings, "- " bullet lists, "1. " ordered lists,
 * blank-line-separated paragraphs, [text](url) links and **bold** spans.
 * Everything is emitted as React elements — no dangerouslySetInnerHTML.
 * Images from the old site are intentionally skipped.
 */

type Block =
  | { type: "heading"; level: number; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

// URL part tolerates one level of parentheses, e.g. ".../file%20(2024).pdf"
const LINK_RE = /\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;

/** Old-site root links go to the new home page; everything else stays external. */
function internalHref(href: string): string | null {
  const m = href.match(/^https?:\/\/(?:www\.)?aaa-accreditation\.org\/?$/i);
  return m ? "/" : null;
}

function renderLinks(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let i = 0;
  LINK_RE.lastIndex = 0;
  for (let m = LINK_RE.exec(text); m; m = LINK_RE.exec(text)) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    const [, label, href] = m;
    const internal = internalHref(href);
    const key = `${keyPrefix}-a${i++}`;
    nodes.push(
      internal ? (
        <Link key={key} href={internal} className="ed-link">
          {label}
        </Link>
      ) : (
        <a
          key={key}
          href={href}
          className="ed-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label}
        </a>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let i = 0;
  BOLD_RE.lastIndex = 0;
  for (let m = BOLD_RE.exec(text); m; m = BOLD_RE.exec(text)) {
    if (m.index > last)
      nodes.push(...renderLinks(text.slice(last, m.index), `${keyPrefix}-t${i}`));
    nodes.push(
      <strong key={`${keyPrefix}-b${i}`} style={{ fontWeight: 600 }}>
        {renderLinks(m[1], `${keyPrefix}-bl${i}`)}
      </strong>
    );
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length)
    nodes.push(...renderLinks(text.slice(last), `${keyPrefix}-t${i}`));
  return nodes;
}

function parseBlocks(content: string): Block[] {
  const blocks: Block[] = [];
  let para: string[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: "p", text: para.join(" ") });
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) {
      // Blank lines end paragraphs but keep lists open (items in the source
      // data are separated by blank lines).
      flushPara();
      continue;
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      flushList();
      blocks.push({ type: "heading", level: h[1].length, text: h[2].trim() });
      continue;
    }
    const ul = line.match(/^[-*]\s+(.*)$/);
    if (ul) {
      flushPara();
      if (!list || list.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(ul[1].trim());
      continue;
    }
    const ol = line.match(/^\d+[.)]\s+(.*)$/);
    if (ol) {
      flushPara();
      if (!list || list.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(ol[1].trim());
      continue;
    }
    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "");

const h3Style: CSSProperties = {
  fontSize: 22,
  fontWeight: 500,
  letterSpacing: "-0.015em",
  color: "var(--ink-900)",
  margin: "36px 0 14px",
  maxWidth: "30ch",
};
const h4Style: CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--ink-900)",
  margin: "30px 0 12px",
  maxWidth: "40ch",
};
const olStyle: CSSProperties = {
  margin: "0 0 18px",
  padding: "0 0 0 22px",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  fontSize: 15,
  lineHeight: 1.65,
  color: "var(--ink-700)",
  maxWidth: "64ch",
};

export default function ArticleBody({
  content,
  title,
}: {
  content: string;
  title?: string;
}) {
  let blocks = parseBlocks(content);

  // Many migrated posts repeat their own title as a leading heading —
  // drop it so it doesn't duplicate the page header.
  if (
    title &&
    blocks.length > 0 &&
    blocks[0].type === "heading" &&
    normalize(blocks[0].text) === normalize(title)
  ) {
    blocks = blocks.slice(1);
  }

  if (blocks.length === 0) {
    return (
      <p>
        The original announcement was published without article text. For more
        information about this update, please{" "}
        <Link href="/contact" className="ed-link">
          contact AAA
        </Link>
        .
      </p>
    );
  }

  let renderedHeadings = 0;
  return (
    <>
      {blocks.map((b, i) => {
        const key = `blk-${i}`;
        switch (b.type) {
          case "heading": {
            const inline = renderInline(b.text, key);
            const topMargin = renderedHeadings++ === 0 && i === 0 ? undefined : 40;
            if (b.level <= 2)
              return (
                <h2 key={key} style={topMargin ? { marginTop: topMargin } : undefined}>
                  {inline}
                </h2>
              );
            if (b.level === 3)
              return (
                <h3 key={key} style={h3Style}>
                  {inline}
                </h3>
              );
            return (
              <h4 key={key} style={h4Style}>
                {inline}
              </h4>
            );
          }
          case "ul":
            return (
              <ul key={key} className="bullets">
                {b.items.map((item, j) => (
                  <li key={`${key}-li${j}`}>
                    <span>{renderInline(item, `${key}-li${j}`)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} style={olStyle}>
                {b.items.map((item, j) => (
                  <li key={`${key}-li${j}`}>
                    {renderInline(item, `${key}-li${j}`)}
                  </li>
                ))}
              </ol>
            );
          default:
            return <p key={key}>{renderInline(b.text, key)}</p>;
        }
      })}
    </>
  );
}
