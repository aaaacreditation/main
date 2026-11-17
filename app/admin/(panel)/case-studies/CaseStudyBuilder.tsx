"use client";

import { useRef, useState } from "react";
import ImageField from "../../_components/ImageField";
import RichTextEditor from "../../_components/RichTextEditor";
import {
  BACKGROUNDS,
  BLOCK_LABELS,
  LAYOUTS,
  emptyBlock,
  emptySection,
  layoutFromBody,
  newId,
  parseLayout,
  youTubeId,
  type Background,
  type Block,
  type BlockType,
  type CaseStudyLayout,
  type LayoutKey,
  type LayoutSection,
} from "@/lib/case-study-layout";

/**
 * Case study page builder (Nov 2026, client): sections of 1–3 columns holding
 * text, image, video and quote blocks. Sections and blocks are reordered by
 * dragging their ⠿ handle (blocks also move between columns and sections), or
 * with the arrow buttons for keyboard and touch use.
 *
 * Submits the layout as JSON in the hidden `layout` field, and `layoutDirty`
 * only once something was changed — an untouched case study is saved exactly
 * as it was (its body is not regenerated).
 */

type Drag = { kind: "section" | "block"; id: string } | null;
type Drop =
  | { kind: "section"; index: number }
  | { kind: "block"; sectionId: string; col: number; index: number }
  | null;

const BLOCK_TYPES = Object.keys(BLOCK_LABELS) as BlockType[];

/** Deep copy with fresh ids (duplicate section). */
function cloneSection(s: LayoutSection): LayoutSection {
  return {
    ...s,
    id: newId("s"),
    columns: s.columns.map((col) => col.map((b) => ({ ...b, id: newId("b") }))),
  };
}

/** Same blocks, new column count: extra columns fold into the last one. */
function reshape(s: LayoutSection, layout: LayoutKey): LayoutSection {
  const width = LAYOUTS[layout].cols.length;
  const columns: Block[][] = Array.from({ length: width }, (_, i) => [...(s.columns[i] ?? [])]);
  for (const extra of s.columns.slice(width)) columns[width - 1].push(...extra);
  return { ...s, layout, columns };
}

function hasContent(s: LayoutSection) {
  return s.columns.some((c) => c.length > 0);
}

export default function CaseStudyBuilder({ initialLayout, initialBody }: { initialLayout: unknown; initialBody: string }) {
  const [layout, setLayout] = useState<CaseStudyLayout>(
    () => parseLayout(initialLayout) ?? layoutFromBody(initialBody)
  );
  const [dirty, setDirty] = useState(false);
  const drag = useRef<Drag>(null);
  const [dragging, setDragging] = useState<Drag>(null);
  const [drop, setDrop] = useState<Drop>(null);
  const sectionEls = useRef(new Map<string, HTMLElement>());

  const update = (fn: (sections: LayoutSection[]) => LayoutSection[]) => {
    setLayout((l) => ({ v: 1, sections: fn(l.sections) }));
    setDirty(true);
  };

  /* ------------------------------------------------------------ sections */
  const addSection = (key: LayoutKey) => update((ss) => [...ss, emptySection(key)]);
  const patchSection = (id: string, patch: Partial<Pick<LayoutSection, "background">> & { layout?: LayoutKey }) =>
    update((ss) =>
      ss.map((s) => {
        if (s.id !== id) return s;
        const next = patch.layout && patch.layout !== s.layout ? reshape(s, patch.layout) : s;
        return { ...next, ...(patch.background ? { background: patch.background } : {}) };
      })
    );
  const moveSectionTo = (id: string, index: number) =>
    update((ss) => {
      const from = ss.findIndex((s) => s.id === id);
      if (from < 0) return ss;
      const next = [...ss];
      const [s] = next.splice(from, 1);
      next.splice(from < index ? index - 1 : index, 0, s);
      return next;
    });
  const removeSection = (id: string) => {
    const s = layout.sections.find((x) => x.id === id);
    if (s && hasContent(s) && !window.confirm("Remove this section and everything in it?")) return;
    update((ss) => ss.filter((x) => x.id !== id));
  };
  const duplicateSection = (id: string) =>
    update((ss) => ss.flatMap((s) => (s.id === id ? [s, cloneSection(s)] : [s])));

  /* -------------------------------------------------------------- blocks */
  const addBlock = (sectionId: string, col: number, type: BlockType) =>
    update((ss) =>
      ss.map((s) =>
        s.id !== sectionId ? s : { ...s, columns: s.columns.map((c, i) => (i === col ? [...c, emptyBlock(type)] : c)) }
      )
    );
  const patchBlock = (id: string, patch: Partial<Block>) =>
    update((ss) =>
      ss.map((s) => ({
        ...s,
        columns: s.columns.map((c) => c.map((b) => (b.id === id ? ({ ...b, ...patch } as Block) : b))),
      }))
    );
  const removeBlock = (id: string) => {
    if (!window.confirm("Remove this block?")) return;
    update((ss) => ss.map((s) => ({ ...s, columns: s.columns.map((c) => c.filter((b) => b.id !== id)) })));
  };
  /** Move a block to (section, column, index), wherever it is now. */
  const moveBlockTo = (id: string, sectionId: string, col: number, index: number) =>
    update((ss) => {
      let block: Block | undefined;
      let fromSection = "";
      let fromCol = -1;
      let fromIndex = -1;
      const without = ss.map((s) => ({
        ...s,
        columns: s.columns.map((c, ci) =>
          c.filter((b, bi) => {
            if (b.id !== id) return true;
            block = b;
            fromSection = s.id;
            fromCol = ci;
            fromIndex = bi;
            return false;
          })
        ),
      }));
      if (!block) return ss;
      const at = fromSection === sectionId && fromCol === col && fromIndex < index ? index - 1 : index;
      return without.map((s) =>
        s.id !== sectionId
          ? s
          : { ...s, columns: s.columns.map((c, ci) => (ci === col ? [...c.slice(0, at), block!, ...c.slice(at)] : c)) }
      );
    });

  /* ------------------------------------------------------- drag and drop */
  const startDrag = (e: React.DragEvent, d: NonNullable<Drag>, image?: HTMLElement | null) => {
    drag.current = d;
    setDragging(d);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", d.id);
    if (image) e.dataTransfer.setDragImage(image, 24, 24);
  };
  const endDrag = () => {
    drag.current = null;
    setDragging(null);
    setDrop(null);
  };

  const onSectionOver = (e: React.DragEvent<HTMLElement>, index: number) => {
    if (drag.current?.kind !== "section") return;
    e.preventDefault();
    const r = e.currentTarget.getBoundingClientRect();
    const at = e.clientY < r.top + r.height / 2 ? index : index + 1;
    if (drop?.kind !== "section" || drop.index !== at) setDrop({ kind: "section", index: at });
  };
  const onColumnOver = (e: React.DragEvent<HTMLElement>, sectionId: string, col: number) => {
    if (drag.current?.kind !== "block") return;
    e.preventDefault();
    e.stopPropagation();
    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>(":scope > .csb-block"));
    let at = items.findIndex((el) => {
      const r = el.getBoundingClientRect();
      return e.clientY < r.top + r.height / 2;
    });
    if (at < 0) at = items.length;
    if (drop?.kind !== "block" || drop.sectionId !== sectionId || drop.col !== col || drop.index !== at)
      setDrop({ kind: "block", sectionId, col, index: at });
  };
  const onDropHere = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const d = drag.current;
    if (d && drop) {
      if (d.kind === "section" && drop.kind === "section") moveSectionTo(d.id, drop.index);
      if (d.kind === "block" && drop.kind === "block") moveBlockTo(d.id, drop.sectionId, drop.col, drop.index);
    }
    endDrag();
  };

  const sections = layout.sections;
  const blockCount = sections.reduce((n, s) => n + s.columns.reduce((m, c) => m + c.length, 0), 0);

  return (
    <div className={"csb" + (dragging ? ` is-dragging drag-${dragging.kind}` : "")}>
      <input type="hidden" name="layout" value={JSON.stringify(layout)} />
      <input type="hidden" name="layoutDirty" value={dirty ? "1" : ""} />

      <p className="adm-hint csb-help">
        Build the page from sections. Each section is a row of 1–3 columns; add text, images, YouTube videos and
        quotes to a column. Drag the <b>⠿</b> handle to reorder sections or to move a block, including into another
        column or section. The arrows do the same without dragging.
      </p>

      {sections.length === 0 ? <p className="csb-empty">No sections yet. Add the first one below.</p> : null}

      <div className="csb-sections" onDragOver={(e) => drag.current?.kind === "section" && e.preventDefault()} onDrop={onDropHere}>
        {sections.map((s, si) => (
          <div key={s.id} className="csb-slot">
            {drop?.kind === "section" && drop.index === si ? <div className="csb-indicator" aria-hidden="true" /> : null}
            <section
              ref={(el) => {
                if (el) sectionEls.current.set(s.id, el);
                else sectionEls.current.delete(s.id);
              }}
              className={`csb-section bg-${s.background}` + (dragging?.id === s.id ? " is-source" : "")}
              onDragOver={(e) => onSectionOver(e, si)}
              onDrop={onDropHere}
              aria-label={`Section ${si + 1}`}
            >
              <header className="csb-section-bar">
                <button
                  type="button"
                  className="csb-handle"
                  draggable
                  onDragStart={(e) => startDrag(e, { kind: "section", id: s.id }, sectionEls.current.get(s.id))}
                  onDragEnd={endDrag}
                  aria-label={`Drag section ${si + 1}`}
                  title="Drag to reorder"
                >
                  ⠿
                </button>
                <strong>Section {si + 1}</strong>
                <label className="csb-field">
                  <span>Columns</span>
                  <select
                    className="sme-select"
                    value={s.layout}
                    onChange={(e) => patchSection(s.id, { layout: e.target.value as LayoutKey })}
                  >
                    {(Object.keys(LAYOUTS) as LayoutKey[]).map((k) => (
                      <option key={k} value={k}>
                        {LAYOUTS[k].label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="csb-field">
                  <span>Background</span>
                  <select
                    className="sme-select"
                    value={s.background}
                    onChange={(e) => patchSection(s.id, { background: e.target.value as Background })}
                  >
                    {(Object.keys(BACKGROUNDS) as Background[]).map((k) => (
                      <option key={k} value={k}>
                        {BACKGROUNDS[k]}
                      </option>
                    ))}
                  </select>
                </label>
                <span className="csb-bar-actions">
                  <button type="button" onClick={() => moveSectionTo(s.id, si - 1)} disabled={si === 0} aria-label="Move section up" title="Move up">
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSectionTo(s.id, si + 2)}
                    disabled={si === sections.length - 1}
                    aria-label="Move section down"
                    title="Move down"
                  >
                    ↓
                  </button>
                  <button type="button" onClick={() => duplicateSection(s.id)} title="Duplicate section">
                    Duplicate
                  </button>
                  <button type="button" className="danger" onClick={() => removeSection(s.id)} title="Remove section">
                    Remove
                  </button>
                </span>
              </header>

              <div className={`csb-grid cols-${s.layout}`}>
                {s.columns.map((col, ci) => (
                  <div
                    key={ci}
                    className={"csb-col" + (drop?.kind === "block" && drop.sectionId === s.id && drop.col === ci ? " is-target" : "")}
                    onDragOver={(e) => onColumnOver(e, s.id, ci)}
                    onDrop={onDropHere}
                  >
                    {col.map((b, bi) => (
                      <BlockCard
                        key={b.id}
                        block={b}
                        indicatorBefore={drop?.kind === "block" && drop.sectionId === s.id && drop.col === ci && drop.index === bi}
                        isSource={dragging?.id === b.id}
                        canUp={bi > 0}
                        canDown={bi < col.length - 1}
                        canLeft={ci > 0}
                        canRight={ci < s.columns.length - 1}
                        onUp={() => moveBlockTo(b.id, s.id, ci, bi - 1)}
                        onDown={() => moveBlockTo(b.id, s.id, ci, bi + 2)}
                        onLeft={() => moveBlockTo(b.id, s.id, ci - 1, s.columns[ci - 1].length)}
                        onRight={() => moveBlockTo(b.id, s.id, ci + 1, s.columns[ci + 1].length)}
                        onRemove={() => removeBlock(b.id)}
                        onChange={(patch) => patchBlock(b.id, patch)}
                        onDragStart={(e, el) => startDrag(e, { kind: "block", id: b.id }, el)}
                        onDragEnd={endDrag}
                      />
                    ))}
                    {drop?.kind === "block" && drop.sectionId === s.id && drop.col === ci && drop.index === col.length ? (
                      <div className="csb-indicator" aria-hidden="true" />
                    ) : null}
                    <div className="csb-add-block" role="group" aria-label={`Add to column ${ci + 1}`}>
                      {BLOCK_TYPES.map((t) => (
                        <button key={t} type="button" onClick={() => addBlock(s.id, ci, t)}>
                          + {BLOCK_LABELS[t]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ))}
        {drop?.kind === "section" && drop.index === sections.length ? <div className="csb-indicator" aria-hidden="true" /> : null}
      </div>

      <div className="csb-add-section">
        <span>Add a section:</span>
        {(Object.keys(LAYOUTS) as LayoutKey[]).map((k) => (
          <button key={k} type="button" onClick={() => addSection(k)} title={`Add a ${LAYOUTS[k].label.toLowerCase()} section`}>
            <span className="csb-shape" aria-hidden="true">
              {LAYOUTS[k].cols.map((w, i) => (
                <i key={i} style={{ flexGrow: w }} />
              ))}
            </span>
            {LAYOUTS[k].label}
          </button>
        ))}
      </div>
      <p className="adm-hint">
        {sections.length} section{sections.length === 1 ? "" : "s"} · {blockCount} block{blockCount === 1 ? "" : "s"}.
        Leave the builder empty for a card-only entry (home, SME or program page card).
      </p>
    </div>
  );
}

function BlockCard({
  block: b,
  indicatorBefore,
  isSource,
  canUp,
  canDown,
  canLeft,
  canRight,
  onUp,
  onDown,
  onLeft,
  onRight,
  onRemove,
  onChange,
  onDragStart,
  onDragEnd,
}: {
  block: Block;
  indicatorBefore: boolean;
  isSource: boolean;
  canUp: boolean;
  canDown: boolean;
  canLeft: boolean;
  canRight: boolean;
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  onRemove: () => void;
  onChange: (patch: Partial<Block>) => void;
  onDragStart: (e: React.DragEvent, el: HTMLElement | null) => void;
  onDragEnd: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const vid = b.type === "video" ? youTubeId(b.url) : null;

  return (
    <>
      {indicatorBefore ? <div className="csb-indicator" aria-hidden="true" /> : null}
      <div ref={ref} className={`csb-block type-${b.type}` + (isSource ? " is-source" : "")}>
        <div className="csb-block-bar">
          <button
            type="button"
            className="csb-handle"
            draggable
            onDragStart={(e) => onDragStart(e, ref.current)}
            onDragEnd={onDragEnd}
            aria-label={`Drag ${BLOCK_LABELS[b.type]} block`}
            title="Drag to move"
          >
            ⠿
          </button>
          <span className="csb-block-type">{BLOCK_LABELS[b.type]}</span>
          <span className="csb-bar-actions">
            {canLeft ? (
              <button type="button" onClick={onLeft} aria-label="Move to the column on the left" title="Move left">
                ←
              </button>
            ) : null}
            {canRight ? (
              <button type="button" onClick={onRight} aria-label="Move to the column on the right" title="Move right">
                →
              </button>
            ) : null}
            <button type="button" onClick={onUp} disabled={!canUp} aria-label="Move block up" title="Move up">
              ↑
            </button>
            <button type="button" onClick={onDown} disabled={!canDown} aria-label="Move block down" title="Move down">
              ↓
            </button>
            <button type="button" className="danger" onClick={onRemove} aria-label="Remove block" title="Remove">
              ✕
            </button>
          </span>
        </div>

        <div className="csb-block-body">
          {b.type === "text" ? (
            <RichTextEditor
              initialHTML={b.html}
              placeholder="Write this part of the case study…"
              onChange={(html) => onChange({ html })}
            />
          ) : null}

          {b.type === "image" ? (
            <>
              <ImageField label="Image" initial={b.src} onChange={(src) => onChange({ src })} />
              <input
                className="sme-input"
                value={b.alt}
                maxLength={300}
                onChange={(e) => onChange({ alt: e.target.value })}
                placeholder="Alt text — describe the image for screen readers"
                aria-label="Alt text"
              />
              <input
                className="sme-input"
                value={b.caption}
                maxLength={500}
                onChange={(e) => onChange({ caption: e.target.value })}
                placeholder="Caption (optional)"
                aria-label="Caption"
              />
            </>
          ) : null}

          {b.type === "video" ? (
            <>
              <input
                className="sme-input"
                value={b.url}
                maxLength={500}
                inputMode="url"
                onChange={(e) => onChange({ url: e.target.value })}
                placeholder="YouTube link — https://www.youtube.com/watch?v=…"
                aria-label="YouTube link"
              />
              {vid ? (
                // eslint-disable-next-line @next/next/no-img-element -- YouTube poster frame preview
                <img className="csb-video-thumb" src={`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`} alt="" />
              ) : b.url ? (
                <p className="adm-error csb-inline-error">That is not a YouTube link. Upload the video to YouTube and paste its link.</p>
              ) : (
                <p className="adm-hint">Videos play from YouTube, so the page stays fast.</p>
              )}
              <input
                className="sme-input"
                value={b.caption}
                maxLength={500}
                onChange={(e) => onChange({ caption: e.target.value })}
                placeholder="Caption (optional)"
                aria-label="Caption"
              />
            </>
          ) : null}

          {b.type === "quote" ? (
            <>
              <textarea
                className="sme-textarea"
                rows={3}
                value={b.text}
                maxLength={2000}
                onChange={(e) => onChange({ text: e.target.value })}
                placeholder="The quote, without quote marks"
                aria-label="Quote"
              />
              <input
                className="sme-input"
                value={b.by}
                maxLength={200}
                onChange={(e) => onChange({ by: e.target.value })}
                placeholder="Who said it — Name, Role"
                aria-label="Quote by"
              />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
