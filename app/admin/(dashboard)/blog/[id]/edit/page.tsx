import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { updatePostAction } from "../../actions"
import { PostForm, type EditablePost } from "../../post-form"

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, content, featured_image, category, published_at, is_published")
    .eq("id", id)
    .maybeSingle()

  if (error) {
    console.error("Error loading blog post for edit", error)
  }

  if (!post) {
    notFound()
  }

  const updateAction = updatePostAction.bind(null, post.id)

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Blog
        </p>
        <h1 className="mt-2 text-3xl">Editar post</h1>
      </div>
      <PostForm action={updateAction} post={post as EditablePost} />
    </div>
  )
}
