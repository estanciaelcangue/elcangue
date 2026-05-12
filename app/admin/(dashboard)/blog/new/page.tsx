import { createPostAction } from "../actions"
import { PostForm } from "../post-form"

export default function NewBlogPostPage() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
          Blog
        </p>
        <h1 className="mt-2 text-3xl">Nuevo post</h1>
      </div>
      <PostForm action={createPostAction} />
    </div>
  )
}
