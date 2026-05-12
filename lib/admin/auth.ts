import { redirect } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/server"

export type AdminRole = "admin" | "editor"

export interface AdminProfile {
  id: string
  full_name: string
  role: AdminRole
}

export interface AdminSession {
  user: User
  profile: AdminProfile
}

const adminRoles: AdminRole[] = ["admin", "editor"]

export async function getAdminSession(): Promise<AdminSession | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .maybeSingle()

  if (error) {
    console.error("Error loading admin profile", error)
    return null
  }

  if (!profile || !adminRoles.includes(profile.role as AdminRole)) {
    return null
  }

  return {
    user,
    profile: {
      id: profile.id,
      full_name: profile.full_name,
      role: profile.role as AdminRole,
    },
  }
}

export async function requireAdminSession() {
  const session = await getAdminSession()

  if (!session) {
    redirect("/admin/login")
  }

  return session
}
