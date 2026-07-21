"use server"

import { revalidatePath } from "next/cache"
import { requireAdminSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"

export async function setMessageReadAction(formData: FormData) {
  await requireAdminSession()
  const id = String(formData.get("message_id") ?? "")
  const isRead = formData.get("is_read") === "true"

  if (!/^[0-9a-f-]{36}$/i.test(id)) return

  const supabase = await createClient()
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: isRead })
    .eq("id", id)

  if (error) console.error("Error updating contact message", error)
  revalidatePath("/admin/mensajes")
}
