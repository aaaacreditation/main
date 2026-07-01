"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extensions";
import { useRef, useState } from "react";

/**
 * Brand-styled TipTap editor. Serializes to HTML through a hidden input so it
 * participates in plain <form action={serverAction}> submissions.
 */
export default function RichTextEditor({
  name,
  initialHTML = "",
  placeholder = "Write your content…",
}: {
  name: string;
  initialHTML?: string;
  placeholder?: string;
}) {
  const [html, setHtml] = useState(initialHTML);
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
        link: { openOnClick: false, autolink: true, defaultProtocol: "https" },
      }),
      TiptapImage.configure({ inline: false }),
      Placeholder.configure({ placeholder }),
    ],
    content: initialHTML,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  if (!editor) {
    return (
      <div className="rte">
        <div className="rte-body rte-loading">Loading editor…</div>
        <input type="hidden" name={name} value={html} />
      </div>
    );
  }

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (leave empty to remove)", prev || "https://");
    if (url === null) return;
    if (url === "" || url === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const addImageByUrl = () => {
    const url = window.prompt("Image URL", "https://");
    if (!url || url === "https://") return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  const uploadImage = async (file: File) => {
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    if (!res.ok) {
      alert("Upload failed — check the file type/size.");
      return;
    }
    const { url } = (await res.json()) as { url: string };
    editor.chain().focus().setImage({ src: url }).run();
  };

  const btn = (active: boolean) => "rte-btn" + (active ? " on" : "");

  return (
    <div className="rte">
      <div className="rte-toolbar" role="toolbar" aria-label="Text formatting">
        <button type="button" className={btn(editor.isActive("bold"))} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><b>B</b></button>
        <button type="button" className={btn(editor.isActive("italic"))} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><i>I</i></button>
        <button type="button" className={btn(editor.isActive("underline"))} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><u>U</u></button>
        <button type="button" className={btn(editor.isActive("strike"))} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough"><s>S</s></button>
        <span className="rte-sep" />
        <button type="button" className={btn(editor.isActive("heading", { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">H2</button>
        <button type="button" className={btn(editor.isActive("heading", { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">H3</button>
        <button type="button" className={btn(editor.isActive("paragraph"))} onClick={() => editor.chain().focus().setParagraph().run()} title="Paragraph">¶</button>
        <span className="rte-sep" />
        <button type="button" className={btn(editor.isActive("bulletList"))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">•≡</button>
        <button type="button" className={btn(editor.isActive("orderedList"))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">1≡</button>
        <button type="button" className={btn(editor.isActive("blockquote"))} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">❝</button>
        <button type="button" className="rte-btn" onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">—</button>
        <span className="rte-sep" />
        <button type="button" className={btn(editor.isActive("link"))} onClick={setLink} title="Link">Link</button>
        <button type="button" className="rte-btn" onClick={addImageByUrl} title="Image from URL">Img URL</button>
        <button type="button" className="rte-btn" onClick={() => fileRef.current?.click()} title="Upload image">Upload</button>
        <span className="rte-sep" />
        <button type="button" className="rte-btn" onClick={() => editor.chain().focus().undo().run()} title="Undo">↶</button>
        <button type="button" className="rte-btn" onClick={() => editor.chain().focus().redo().run()} title="Redo">↷</button>
      </div>

      <EditorContent editor={editor} className="rte-body" />

      <input
        ref={fileRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void uploadImage(f);
          e.target.value = "";
        }}
      />
      <input type="hidden" name={name} value={html} />
    </div>
  );
}
