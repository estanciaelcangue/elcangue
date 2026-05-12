import Link from "next/link"
import { Edit, ExternalLink, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { requireAdminSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"
import { deletePostAction } from "./actions"

interface BlogPostRow {
  id: string
  slug: string
  title: string
  category: string
  is_published: boolean
  published_at: string
  author: { full_name: string } | { full_name: string }[] | null
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("es-UY", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function getAuthorName(post: BlogPostRow) {
  const author = Array.isArray(post.author) ? post.author[0] : post.author
  return author?.full_name || "Sin autor"
}

export default async function AdminBlogPage() {
  await requireAdminSession()
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("blog_posts")
    .select("id, slug, title, category, is_published, published_at, author:profiles(full_name)")
    .order("published_at", { ascending: false })

  const posts = (data ?? []) as BlogPostRow[]

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Blog
          </p>
          <h1 className="mt-2 text-3xl">Publicaciones</h1>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus />
            Nuevo post
          </Link>
        </Button>
      </div>

      {error ? (
        <div className="border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            No pudimos cargar las publicaciones. Revisá que la migración de blog
            esté aplicada en Supabase.
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className="border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            Todavía no hay publicaciones.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-background">
              <tr>
                <th className="px-4 py-3 font-medium">Título</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  Categoría
                </th>
                <th className="hidden px-4 py-3 font-medium lg:table-cell">
                  Autor
                </th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  Fecha
                </th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-4">
                    <p className="font-medium text-foreground">{post.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      /blog/{post.slug}
                    </p>
                  </td>
                  <td className="hidden px-4 py-4 capitalize text-muted-foreground md:table-cell">
                    {post.category}
                  </td>
                  <td className="hidden px-4 py-4 text-muted-foreground lg:table-cell">
                    {getAuthorName(post)}
                  </td>
                  <td className="hidden px-4 py-4 text-muted-foreground sm:table-cell">
                    {formatDate(post.published_at)}
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex rounded-md border border-border px-2 py-1 text-xs">
                      {post.is_published ? "Publicado" : "Borrador"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      {post.is_published && (
                        <Button asChild variant="ghost" size="icon-sm">
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <ExternalLink />
                            <span className="sr-only">Ver</span>
                          </Link>
                        </Button>
                      )}
                      <Button asChild variant="ghost" size="icon-sm">
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Edit />
                          <span className="sr-only">Editar</span>
                        </Link>
                      </Button>
                      <form action={deletePostAction}>
                        <input type="hidden" name="post_id" value={post.id} />
                        <Button type="submit" variant="ghost" size="icon-sm">
                          <Trash2 />
                          <span className="sr-only">Borrar</span>
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
