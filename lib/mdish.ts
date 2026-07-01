/**
 * Helpers for the two content formats that coexist in the CMS:
 *  - legacy WordPress posts migrated as "markdown-ish" plain text
 *    (# headings, - bullets, 1. lists, [text](url), **bold**)
 *  - HTML produced by the admin rich-text editor
 */

const LINK_RE = /\[([^\]]+)\]\(((?:[^()\s]|\([^()\s]*\))+)\)/g;
const BOLD_RE = /\*\*([^*]+)\*\*/g;

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** True when the string already contains block/inline HTML markup. */
export function looksLikeHtml(content: string): boolean {
  return /<\s*(p|h[1-6]|ul|ol|li|div|img|blockquote|table|figure|br|hr|strong|em|a)\b/i.test(
    content
  );
}

function inline(text: string): string {
  let out = esc(text);
  out = out.replace(LINK_RE, (_m, label: string, href: string) => {
    const safe = /^(https?:\/\/|\/|mailto:)/i.test(href) ? href : "#";
    return `<a href="${safe}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });
  out = out.replace(BOLD_RE, "<strong>$1</strong>");
  return out;
}

/** Converts markdown-ish legacy content to clean HTML (for the editor / prose view). */
export function mdishToHtml(content: string): string {
  const html: string[] = [];
  let para: string[] = [];
  let list: { tag: "ul" | "ol"; items: string[] } | null = null;

  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${inline(para.join(" "))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      html.push(
        `<${list.tag}>${list.items.map((i) => `<li>${inline(i)}</li>`).join("")}</${list.tag}>`
      );
      list = null;
    }
  };

  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) {
      flushPara();
      continue; // blank lines keep lists open, matching the legacy renderer
    }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      flushPara();
      flushList();
      const level = Math.min(4, Math.max(2, h[1].length));
      html.push(`<h${level}>${inline(h[2].trim())}</h${level}>`);
      continue;
    }
    const ul = line.match(/^[-*]\s+(.*)$/);
    if (ul) {
      flushPara();
      if (!list || list.tag !== "ul") {
        flushList();
        list = { tag: "ul", items: [] };
      }
      list.items.push(ul[1].trim());
      continue;
    }
    const ol = line.match(/^\d+[.)]\s+(.*)$/);
    if (ol) {
      flushPara();
      if (!list || list.tag !== "ol") {
        flushList();
        list = { tag: "ol", items: [] };
      }
      list.items.push(ol[1].trim());
      continue;
    }
    flushList();
    para.push(line);
  }
  flushPara();
  flushList();
  return html.join("\n");
}

/** Content ready for the TipTap editor — converts legacy text on the fly. */
export function toEditorHtml(content: string): string {
  if (!content) return "";
  return looksLikeHtml(content) ? content : mdishToHtml(content);
}
