"use client"

import { useRef, useState } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Youtube from "@tiptap/extension-youtube"
import { FontFamily, FontSize, TextStyle } from "@tiptap/extension-text-style"
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
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Undo2,
  Video,
} from "lucide-react"
import { normalizeEditorContent } from "@/lib/blog/content"
import { uploadBlogMedia } from "./media-upload"

type ToolbarButtonProps = {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}

function ToolbarButton({ label, active, disabled, onClick, children }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex size-9 items-center justify-center border text-sm transition disabled:opacity-40 ${
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary/50"
      }`}
    >
      {children}
    </button>
  )
}

export function RichTextEditor({ name, defaultValue = "" }: { name: string; defaultValue?: string }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [html, setHtml] = useState(() => normalizeEditorContent(defaultValue))
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      FontSize,
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ allowBase64: false }),
      Youtube.configure({ controls: true, nocookie: true }),
    ],
    content: html,
    editorProps: {
      attributes: {
        class:
          "min-h-80 px-4 py-4 outline-none [&_blockquote]:border-l-4 [&_blockquote]:border-primary/35 [&_blockquote]:pl-4 [&_h2]:mb-3 [&_h2]:mt-6 [&_h2]:font-serif [&_h2]:text-3xl [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:font-serif [&_h3]:text-2xl [&_img]:my-5 [&_img]:max-w-full [&_li]:ml-6 [&_ol]:list-decimal [&_p]:mb-4 [&_ul]:list-disc",
      },
    },
    onUpdate: ({ editor: currentEditor }) => setHtml(currentEditor.getHTML()),
  })

  if (!editor) {
    return <div className="min-h-80 animate-pulse border border-border bg-muted/30" />
  }

  const activeEditor = editor

  function setLink() {
    const previousUrl = activeEditor.getAttributes("link").href as string | undefined
    const url = window.prompt("URL del enlace", previousUrl ?? "https://")

    if (url === null) return
    if (!url.trim()) {
      activeEditor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    activeEditor.chain().focus().extendMarkRange("link").setLink({ href: url.trim(), target: "_blank" }).run()
  }

  function addVideo() {
    const url = window.prompt("URL de YouTube")
    if (url?.trim()) activeEditor.commands.setYoutubeVideo({ src: url.trim(), width: 960, height: 540 })
  }

  async function addImage(file?: File) {
    if (!file) return
    setUploading(true)
    setError("")

    try {
      const url = await uploadBlogMedia(file)
      activeEditor.chain().focus().setImage({ src: url, alt: file.name }).run()
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "No pudimos subir la imagen.")
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }

  const iconSize = 16

  return (
    <div className="overflow-hidden border border-input bg-background">
      <input type="hidden" name={name} value={html} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="sr-only"
        onChange={(event) => void addImage(event.target.files?.[0])}
      />
      <div className="flex flex-wrap gap-1 border-b border-border bg-muted/25 p-2">
        <ToolbarButton label="Deshacer" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo2 size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Rehacer" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo2 size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Párrafo" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}><Pilcrow size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Título 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Título 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Negrita" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Cursiva" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Tachado" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Lista" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Lista numerada" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Cita" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Enlace" active={editor.isActive("link")} onClick={setLink}><Link2 size={iconSize} /></ToolbarButton>
        <ToolbarButton label="Imagen" disabled={uploading} onClick={() => fileInputRef.current?.click()}>{uploading ? <LoaderCircle className="animate-spin" size={iconSize} /> : <ImagePlus size={iconSize} />}</ToolbarButton>
        <ToolbarButton label="Video de YouTube" onClick={addVideo}><Video size={iconSize} /></ToolbarButton>
        <select
          aria-label="Tipo de fuente"
          value={editor.getAttributes("textStyle").fontFamily ?? ""}
          onChange={(event) => {
            const value = event.target.value
            if (value) editor.chain().focus().setFontFamily(value).run()
            else editor.chain().focus().unsetFontFamily().run()
          }}
          className="h-9 border border-border bg-background px-2 text-xs"
        >
          <option value="">Fuente</option>
          <option value="Georgia, serif">Serif</option>
          <option value="Arial, sans-serif">Sans serif</option>
          <option value="Courier New, monospace">Monoespaciada</option>
        </select>
        <select
          aria-label="Tamaño de fuente"
          value={editor.getAttributes("textStyle").fontSize ?? ""}
          onChange={(event) => {
            const value = event.target.value
            if (value) editor.chain().focus().setFontSize(value).run()
            else editor.chain().focus().unsetFontSize().run()
          }}
          className="h-9 border border-border bg-background px-2 text-xs"
        >
          <option value="">Tamaño</option>
          {[12, 14, 16, 18, 20, 24, 28, 32].map((size) => <option key={size} value={`${size}px`}>{size}px</option>)}
        </select>
      </div>
      <EditorContent editor={editor} />
      {error && <p className="border-t border-destructive/20 bg-destructive/5 px-3 py-2 text-xs text-destructive">{error}</p>}
    </div>
  )
}
