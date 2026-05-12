"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { requireAdminSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"

export interface PostFormState {
  error?: string
}

const categories = ["novedades", "eventos", "prensa", "experiencias"] as const

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim()
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function readPostPayload(formData: FormData) {
  const title = readText(formData, "title")
  const rawSlug = readText(formData, "slug")
  const slug = slugify(rawSlug || title)
  const category = readText(formData, "category")
  const featuredImage = readText(formData, "featured_image")
  const publishedAt = readText(formData, "published_at")

  if (!title) {
    return { error: "El título es obligatorio." }
  }

  if (!slug) {
    return { error: "El slug es obligatorio." }
  }

  if (!categories.includes(category as (typeof categories)[number])) {
    return { error: "La categoría no es válida." }
  }

  if (!featuredImage) {
    return { error: "La imagen destacada es obligatoria." }
  }

  return {
    payload: {
      title,
      slug,
      excerpt: readText(formData, "excerpt"),
      content: readText(formData, "content"),
      featured_image: featuredImage,
      category,
      published_at: publishedAt
        ? new Date(publishedAt).toISOString()
        : new Date().toISOString(),
      is_published: formData.get("is_published") === "on",
    },
  }
}

function refreshBlogPaths(slug?: string) {
  revalidatePath("/blog")
  revalidatePath("/admin/blog")

  if (slug) {
    revalidatePath(`/blog/${slug}`)
  }
}

export async function createPostAction(
  _previousState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  const session = await requireAdminSession()
  const result = readPostPayload(formData)

  if ("error" in result) {
    return { error: result.error }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      ...result.payload,
      author_id: session.user.id,
    })
    .select("slug")
    .single()

  if (error) {
    console.error("Error creating blog post", error)
    return { error: "No pudimos crear la publicación." }
  }

  refreshBlogPaths(data.slug)
  redirect("/admin/blog")
}

export async function updatePostAction(
  postId: string,
  _previousState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await requireAdminSession()
  const result = readPostPayload(formData)

  if ("error" in result) {
    return { error: result.error }
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .update(result.payload)
    .eq("id", postId)
    .select("slug")
    .single()

  if (error) {
    console.error("Error updating blog post", error)
    return { error: "No pudimos guardar la publicación." }
  }

  refreshBlogPaths(data.slug)
  redirect("/admin/blog")
}

export async function deletePostAction(formData: FormData) {
  await requireAdminSession()
  const postId = readText(formData, "post_id")

  if (!postId) {
    return
  }

  const supabase = await createClient()
  const { error } = await supabase.from("blog_posts").delete().eq("id", postId)

  if (error) {
    console.error("Error deleting blog post", error)
    throw new Error("No pudimos borrar la publicación.")
  }

  refreshBlogPaths()
  redirect("/admin/blog")
}
