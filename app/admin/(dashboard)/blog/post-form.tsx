"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { PostFormState } from "./actions"

type BlogCategory = "novedades" | "eventos" | "prensa" | "experiencias"

export interface EditablePost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featured_image: string
  category: BlogCategory
  published_at: string
  is_published: boolean
}

interface PostFormProps {
  action: (
    previousState: PostFormState,
    formData: FormData,
  ) => Promise<PostFormState>
  post?: EditablePost
}

const initialState: PostFormState = {}

const categoryOptions: { value: BlogCategory; label: string }[] = [
  { value: "novedades", label: "Novedades" },
  { value: "eventos", label: "Eventos" },
  { value: "prensa", label: "Prensa" },
  { value: "experiencias", label: "Experiencias" },
]

function toDateTimeLocal(value?: string) {
  if (!value) {
    return ""
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ""
  }

  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
  return localDate.toISOString().slice(0, 16)
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      <Save />
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  )
}

export function PostForm({ action, post }: PostFormProps) {
  const [state, formAction] = useActionState(action, initialState)

  return (
    <form action={formAction} className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="space-y-5 border border-border bg-card p-5">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Título
            </label>
            <Input
              id="title"
              name="title"
              defaultValue={post?.title}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug
            </label>
            <Input id="slug" name="slug" defaultValue={post?.slug} />
          </div>

          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm font-medium">
              Extracto
            </label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={post?.excerpt}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Contenido
            </label>
            <Textarea
              id="content"
              name="content"
              defaultValue={post?.content}
              rows={14}
              className="min-h-72"
            />
          </div>
        </section>

        <aside className="space-y-5 border border-border bg-card p-5">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Categoría
            </label>
            <select
              id="category"
              name="category"
              defaultValue={post?.category ?? "novedades"}
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {categoryOptions.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="featured_image" className="text-sm font-medium">
              Imagen destacada
            </label>
            <Input
              id="featured_image"
              name="featured_image"
              type="url"
              defaultValue={post?.featured_image}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="published_at" className="text-sm font-medium">
              Fecha de publicación
            </label>
            <Input
              id="published_at"
              name="published_at"
              type="datetime-local"
              defaultValue={toDateTimeLocal(post?.published_at)}
            />
          </div>

          <label className="flex items-center gap-3 border border-border bg-background px-3 py-3 text-sm">
            <input
              name="is_published"
              type="checkbox"
              defaultChecked={post?.is_published ?? false}
              className="size-4 accent-primary"
            />
            Publicado
          </label>

          {state.error && (
            <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          )}
        </aside>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="outline">
          <Link href="/admin/blog">
            <ArrowLeft />
            Volver
          </Link>
        </Button>
        <SubmitButton />
      </div>
    </form>
  )
}
