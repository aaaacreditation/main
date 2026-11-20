/**
 * Rendered page HTML → readable Markdown, for /llms-full.txt (Nov 2026).
 *
 * A small streaming converter for the site's own, well-formed React output —
 * not a general HTML parser. It keeps headings, paragraphs, lists, links,
 * bold text and table rows; it drops scripts, styles, SVG icons, forms and
 * buttons, and anything marked aria-hidden or hidden (carousels render their
 * slides twice, the second copy aria-hidden).
 */

const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const SKIP = new Set([
  "script",
  "style",
  "noscript",
  "svg",
  "form",
  "button",
  "select",
  "textarea",
  "template",
  "iframe",
  "video",
  "audio",
  "canvas",
  "dialog",
  // Breadcrumbs, pagination, "on this page" lists — navigation, not content.
  "nav",
]);
const BLOCK = new Set([
  "p",
  "div",
  "section",
  "article",
  "header",
  "footer",
  "aside",
  "ul",
  "ol",
  "table",
  "figure",
  "figcaption",
  "blockquote",
  "dl",
  "details",
  "summary",
  "address",
  "main",
]);

const ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  middot: "·",
  copy: "©",
  reg: "®",
  trade: "™",
};

export function decodeHtml(s: string): string {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(n) ? String.fromCodePoint(n) : m;
    }
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

function attr(attrs: string, name: string): string | null {
  const m = attrs.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? decodeHtml(m[2] ?? m[3] ?? "") : null;
}

/**
 * @param html     page HTML (only <main> is converted when present)
 * @param baseUrl  absolute origin for root-relative links, e.g. "https://aaa-accreditation.org"
 */
export function htmlToMarkdown(html: string, baseUrl: string): string {
  const main = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/i)?.[1] ?? html;
  const out: string[] = [];
  const links: { at: number; href: string }[] = [];
  let skipDepth = 0;
  let pre = 0;

  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>|([^<]+)/g;
  for (let m = re.exec(main); m; m = re.exec(main)) {
    const [, close, rawTag, attrs = "", selfClose, text] = m;
    if (text !== undefined) {
      if (skipDepth) continue;
      const t = decodeHtml(text);
      out.push(pre ? t : t.replace(/\s+/g, " "));
      continue;
    }
    if (!rawTag) continue; // comment
    const tag = rawTag.toLowerCase();
    const isVoid = VOID.has(tag) || selfClose === "/";

    if (skipDepth) {
      if (isVoid) continue;
      skipDepth += close ? -1 : 1;
      continue;
    }
    if (!close && !isVoid) {
      const hidden = /\saria-hidden\s*=\s*["']true["']/i.test(` ${attrs}`) || /(?:^|\s)hidden(?:\s|=|$)/i.test(attrs);
      if (SKIP.has(tag) || hidden) {
        skipDepth = 1;
        continue;
      }
    }

    if (close) {
      if (/^h[1-6]$/.test(tag)) out.push("\n\n");
      else if (tag === "a") {
        const link = links.pop();
        if (link) {
          const label = out.splice(link.at).join("").replace(/\s+/g, " ").trim();
          if (label && link.href) out.push(`[${label}](${link.href}) `);
          else if (label) out.push(`${label} `);
        }
      } else if (tag === "strong" || tag === "b") out.push("** ");
      else if (tag === "span" || tag === "em" || tag === "i" || tag === "small" || tag === "time") out.push(" ");
      else if (tag === "pre") {
        pre = Math.max(0, pre - 1);
        out.push("\n```\n\n");
      } else if (tag === "li" || tag === "tr" || tag === "dt" || tag === "dd") out.push("\n");
      else if (tag === "td" || tag === "th") out.push(" | ");
      else if (BLOCK.has(tag)) out.push("\n\n");
      continue;
    }

    // Opening (or void) tag.
    if (/^h[1-6]$/.test(tag)) out.push(`\n\n${"#".repeat(Number(tag[1]))} `);
    else if (tag === "a") {
      const href = attr(attrs, "href") ?? "";
      const ok = href && !href.startsWith("#") && !/^(javascript|data):/i.test(href);
      const abs = !ok ? "" : href.startsWith("/") && !href.startsWith("//") ? `${baseUrl}${href}` : href;
      links.push({ at: out.length, href: abs });
    } else if (tag === "strong" || tag === "b") out.push("**");
    else if (tag === "br") out.push("\n");
    else if (tag === "li") out.push("\n- ");
    else if (tag === "tr" || tag === "dt" || tag === "dd") out.push("\n");
    else if (tag === "blockquote") out.push("\n\n> ");
    else if (tag === "pre") {
      pre++;
      out.push("\n\n```\n");
    } else if (tag === "hr") out.push("\n\n---\n\n");
    else if (BLOCK.has(tag)) out.push("\n\n");
  }

  return out
    .join("")
    .replace(/\*\*\s*\*\*/g, "")
    .replace(/ +([,.;:!?)])/g, "$1")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/ {2,}/g, " ")
    .replace(/(\n- )+(?=\n)/g, "")
    .replace(/^\s*\|\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
