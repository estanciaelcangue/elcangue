"use server"

import { revalidatePath } from "next/cache"
import { requireAdminSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"

const roles = ["admin", "editor", "viewer"] as const

function readText(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim()
}

export async function updateProfileAction(formData: FormData) {
  const session = await requireAdminSession()

  if (session.profile.role !== "admin") {
    throw new Error("No tenés permisos para editar usuarios.")
  }

  const profileId = readText(formData, "profile_id")
  const fullName = readText(formData, "full_name")
  const role = readText(formData, "role")

  if (!profileId || !roles.includes(role as (typeof roles)[number])) {
    throw new Error("Perfil inválido.")
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      role,
      updated_at: new Date().toISOString(),
    })
    .eq("id", profileId)

  if (error) {
    console.error("Error updating profile", error)
    throw new Error("No pudimos guardar el perfil.")
  }

  revalidatePath("/admin/usuarios")
}
