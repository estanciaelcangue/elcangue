import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: "Publicación inválida." }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase.rpc("increment_blog_post_views", { post_id: id })

  if (error) {
    console.error("Error incrementing blog post views", error)
    return NextResponse.json({ error: "No pudimos registrar la vista." }, { status: 500 })
  }

  if (data === null) {
    return NextResponse.json({ error: "Publicación no encontrada." }, { status: 404 })
  }

  return NextResponse.json({ count: Number(data) })
}
