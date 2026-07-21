import { NextResponse } from "next/server"
import { getAdminSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
  ["image/gif", "gif"],
])

export async function POST(request: Request) {
  const session = await getAdminSession()

  if (!session) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 })
  }

  let formData: FormData

  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: "No pudimos leer el archivo." }, { status: 400 })
  }

  const file = formData.get("file")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Seleccioná una imagen." }, { status: 400 })
  }

  const extension = ALLOWED_TYPES.get(file.type)

  if (!extension) {
    return NextResponse.json(
      { error: "Formato no admitido. Usá JPG, PNG, WebP, AVIF o GIF." },
      { status: 415 },
    )
  }

  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "La imagen debe pesar menos de 5 MB." },
      { status: 413 },
    )
  }

  const objectPath = `${session.user.id}/${crypto.randomUUID()}.${extension}`
  const supabase = await createClient()
  const { error } = await supabase.storage.from("blog-media").upload(objectPath, file, {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  })

  if (error) {
    console.error("Error uploading blog media", error)
    return NextResponse.json(
      { error: "No pudimos subir la imagen. Verificá la migración de Storage." },
      { status: 500 },
    )
  }

  const { data } = supabase.storage.from("blog-media").getPublicUrl(objectPath)
  return NextResponse.json({ url: data.publicUrl })
}
