"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  LoaderCircle,
  Minus,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
  Unlink,
  X,
} from "lucide-react";
import { uploadImage } from "@/lib/upload-client";

function stripMarkup(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function ToolButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? "bg-matcha-deep text-cream"
          : "text-ink-soft hover:bg-matcha-soft hover:text-matcha-deep"
      }`}
    >
      {children}
    </button>
  );
}

function initialCounts(html: string) {
  const text = stripMarkup(html);
  return {
    words: text ? text.split(/\s+/).length : 0,
    characters: text.length,
  };
}

export function RichTextEditor({
  name = "contentHtml",
  initialContent = "",
  onChange,
}: {
  name?: string;
  initialContent?: string;
  onChange?: (html: string) => void;
}) {
  const [html, setHtml] = useState(initialContent);
  const [counts, setCounts] = useState(() => initialCounts(initialContent));
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkValue, setLinkValue] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const imageInputRef = useRef<HTMLInputElement>(null);
  const imageHandler = useRef<(files: File[]) => void>(() => {});
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          autolink: true,
          HTMLAttributes: {
            rel: "noopener noreferrer",
            target: "_blank",
          },
        },
      }),
      TiptapImage.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: { loading: "lazy" },
      }),
      Placeholder.configure({
        placeholder: "Tulis isi berita di sini. Bisa tempel atau tarik gambar langsung ke editor...",
      }),
    ],
    content: initialContent || "<p></p>",
    editorProps: {
      attributes: {
        class: "prose-editor",
        "aria-label": "Isi berita",
      },
      handleDrop: (_view, event) => {
        const files = Array.from(event.dataTransfer?.files ?? []).filter((file) =>
          file.type.startsWith("image/"),
        );
        if (files.length === 0) {
          return false;
        }
        event.preventDefault();
        imageHandler.current(files);
        return true;
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((file) =>
          file.type.startsWith("image/"),
        );
        if (files.length === 0) {
          return false;
        }
        event.preventDefault();
        imageHandler.current(files);
        return true;
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const nextHtml = currentEditor.getHTML();
      setHtml(nextHtml);
      setCounts(initialCounts(nextHtml));
      onChangeRef.current?.(nextHtml);
    },
  });

  const toolbar = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => ({
      bold: currentEditor?.isActive("bold") ?? false,
      italic: currentEditor?.isActive("italic") ?? false,
      underline: currentEditor?.isActive("underline") ?? false,
      strike: currentEditor?.isActive("strike") ?? false,
      h2: currentEditor?.isActive("heading", { level: 2 }) ?? false,
      h3: currentEditor?.isActive("heading", { level: 3 }) ?? false,
      bulletList: currentEditor?.isActive("bulletList") ?? false,
      orderedList: currentEditor?.isActive("orderedList") ?? false,
      blockquote: currentEditor?.isActive("blockquote") ?? false,
      link: currentEditor?.isActive("link") ?? false,
      canUndo: currentEditor?.can().undo() ?? false,
      canRedo: currentEditor?.can().redo() ?? false,
    }),
  });

  const insertImages = useCallback(async (files: File[]) => {
    if (!editor || files.length === 0) {
      return;
    }

    setUploading(true);
    setUploadError("");
    try {
      for (const file of files) {
        const url = await uploadImage(file, "posts");
        editor
          .chain()
          .focus()
          .setImage({ src: url, alt: file.name.replace(/\.[^.]+$/, "") })
          .run();
      }
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Gambar gagal diunggah.",
      );
    } finally {
      setUploading(false);
    }
  }, [editor]);

  useEffect(() => {
    imageHandler.current = (files) => {
      void insertImages(files);
    };
  }, [insertImages]);

  useEffect(() => {
    if (!linkOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLinkOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [linkOpen]);

  const openLinkEditor = () => {
    if (!editor) {
      return;
    }
    const current = editor.getAttributes("link").href as string | undefined;
    setLinkValue(current ?? "");
    setLinkOpen((value) => !value);
  };

  const applyLink = () => {
    if (!editor) {
      return;
    }
    const raw = linkValue.trim();
    if (!raw) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setLinkOpen(false);
      return;
    }

    const href = /^(https?:\/\/|mailto:|\/)/i.test(raw)
      ? raw
      : `https://${raw}`;
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setLinkOpen(false);
  };

  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_10px_30px_rgba(24,56,35,0.04)]">
      <input type="hidden" name={name} value={html} />

      <div className="flex flex-wrap items-center gap-0.5 border-b border-line bg-[linear-gradient(180deg,#fcfdf8,#f6fbf2)] px-2 py-1.5">
        <div className="mr-1 flex items-center gap-0.5 border-r border-line pr-1.5">
          <ToolButton
            label="Undo"
            disabled={!toolbar?.canUndo}
            onClick={() => editor?.chain().focus().undo().run()}
          >
            <Undo2 size={15} />
          </ToolButton>
          <ToolButton
            label="Redo"
            disabled={!toolbar?.canRedo}
            onClick={() => editor?.chain().focus().redo().run()}
          >
            <Redo2 size={15} />
          </ToolButton>
        </div>

        <div className="mr-1 flex items-center gap-0.5 border-r border-line pr-1.5">
          <ToolButton
            label="Tebal"
            active={toolbar?.bold}
            onClick={() => editor?.chain().focus().toggleBold().run()}
          >
            <Bold size={15} />
          </ToolButton>
          <ToolButton
            label="Miring"
            active={toolbar?.italic}
            onClick={() => editor?.chain().focus().toggleItalic().run()}
          >
            <Italic size={15} />
          </ToolButton>
          <ToolButton
            label="Garis bawah"
            active={toolbar?.underline}
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
          >
            <Underline size={15} />
          </ToolButton>
          <ToolButton
            label="Coret"
            active={toolbar?.strike}
            onClick={() => editor?.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={15} />
          </ToolButton>
        </div>

        <div className="mr-1 flex items-center gap-0.5 border-r border-line pr-1.5">
          <ToolButton
            label="Heading 2"
            active={toolbar?.h2}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 size={15} />
          </ToolButton>
          <ToolButton
            label="Heading 3"
            active={toolbar?.h3}
            onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
          >
            <Heading3 size={15} />
          </ToolButton>
        </div>

        <div className="mr-1 flex items-center gap-0.5 border-r border-line pr-1.5">
          <ToolButton
            label="Daftar poin"
            active={toolbar?.bulletList}
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
          >
            <List size={15} />
          </ToolButton>
          <ToolButton
            label="Daftar nomor"
            active={toolbar?.orderedList}
            onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={15} />
          </ToolButton>
          <ToolButton
            label="Kutipan"
            active={toolbar?.blockquote}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={15} />
          </ToolButton>
          <ToolButton
            label="Garis pemisah"
            onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          >
            <Minus size={15} />
          </ToolButton>
        </div>

        <div className="flex items-center gap-0.5">
          <ToolButton
            label="Tautan"
            active={toolbar?.link}
            onClick={openLinkEditor}
          >
            <Link2 size={15} />
          </ToolButton>
          <ToolButton
            label="Hapus tautan"
            disabled={!toolbar?.link}
            onClick={() => editor?.chain().focus().unsetLink().run()}
          >
            <Unlink size={15} />
          </ToolButton>
          <ToolButton
            label="Hapus format"
            onClick={() =>
              editor?.chain().focus().unsetAllMarks().clearNodes().run()
            }
          >
            <RemoveFormatting size={15} />
          </ToolButton>
          <ToolButton
            label="Sisipkan gambar"
            disabled={uploading}
            onClick={() => imageInputRef.current?.click()}
          >
            {uploading ? (
              <LoaderCircle size={15} className="animate-spin" />
            ) : (
              <ImagePlus size={15} />
            )}
          </ToolButton>
        </div>
      </div>

      {linkOpen && (
        <div className="flex items-center gap-2 border-b border-line bg-matcha-mist px-3 py-2">
          <input
            type="url"
            value={linkValue}
            onChange={(event) => setLinkValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                applyLink();
              }
            }}
            placeholder="https://contoh.sch.id"
            aria-label="URL tautan"
            className="h-8 min-w-0 flex-1 rounded-lg border border-line bg-white px-3 text-[12px] text-ink outline-none focus:border-matcha-deep"
          />
          <button
            type="button"
            onClick={applyLink}
            className="rounded-lg bg-matcha-deep px-3 py-1.5 text-[11px] font-semibold text-cream"
          >
            Terapkan
          </button>
          <button
            type="button"
            onClick={() => setLinkOpen(false)}
            aria-label="Tutup dialog tautan"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {uploadError && (
        <p role="alert" className="border-b border-[#b42318]/15 bg-[#b42318]/5 px-3 py-2 text-[11px] text-[#8a1c14]">
          {uploadError}
        </p>
      )}

      <EditorContent editor={editor} />

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line bg-white px-3 py-2 text-[11px] text-muted">
        <span>{counts.words} kata · {counts.characters} karakter</span>
        <span>Tarik atau tempel gambar langsung ke editor</span>
      </div>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        multiple
        data-image-input="editor"
        className="sr-only"
        onChange={(event) => {
          if (event.target.files) {
            void insertImages(Array.from(event.target.files));
          }
          event.target.value = "";
        }}
      />
    </div>
  );
}
