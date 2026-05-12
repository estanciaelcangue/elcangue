"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export interface LoginState {
  error?: string
}

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!email || !password) {
    return { error: "Ingresá email y contraseña." }
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error || !data.user) {
    return { error: "Credenciales inválidas." }
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle()

  if (
    profileError ||
    !profile ||
    !["admin", "editor"].includes(String(profile.role))
  ) {
    await supabase.auth.signOut()
    return { error: "Este usuario no tiene permisos de administración." }
  }

  redirect("/admin/blog")
}
