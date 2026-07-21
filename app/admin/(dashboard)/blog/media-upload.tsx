"use client"

import { useRef, useState } from "react"
import { ImagePlus, LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export async function uploadBlogMedia(file: File) {
  const body = new FormData()
  body.set("file", file)

  const response = await fetch("/api/admin/blog/media", {
    method: "POST",
    body,
  })
  const result = (await response.json().catch(() => null)) as
    | { url?: string; error?: string }
    | null

  if (!response.ok || !result?.url) {
    throw new Error(result?.error || "No pudimos subir la imagen.")
  }

  return result.url
}

export function FeaturedImageField({ defaultValue = "" }: { defaultValue?: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(defaultValue)
  const [error, setError] = useState("")
  const [uploading, setUploading] = useState(false)

  async function handleFile(file?: File) {
    if (!file) return

    setError("")
    setUploading(true)

    try {
      setValue(await uploadBlogMedia(file))
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "No pudimos subir la imagen.")
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <Input
        id="featured_image"
        name="featured_image"
        type="url"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="https://…"
        required
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif,image/gif"
        className="sr-only"
        onChange={(event) => void handleFile(event.target.files?.[0])}
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full"
        disabled={uploading}
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? <LoaderCircle className="animate-spin" /> : <ImagePlus />}
        {uploading ? "Subiendo…" : "Subir imagen"}
      </Button>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Vista previa" className="aspect-video w-full object-cover" />
      )}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
