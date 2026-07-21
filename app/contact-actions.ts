"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

export type ContactMessageOrigin = "contact" | "events" | "destination_wedding" | "home"

export type ContactMessageState = {
  error?: string
  success?: string
}

const messageSchema = z.object({
  name: z.string().trim().min(2, "Ingresá tu nombre.").max(120),
  email: z.string().trim().email("Ingresá un email válido.").max(254),
  phone: z.string().trim().max(40).optional().default(""),
  subject: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(5, "Escribí un mensaje.").max(5000),
  website: z.string().max(0).optional(),
})

export async function submitContactMessage(
  origin: ContactMessageOrigin,
  _previousState: ContactMessageState,
  formData: FormData,
): Promise<ContactMessageState> {
  const parsed = messageSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Revisá los datos del formulario." }
  }

  if (parsed.data.website) {
    return { success: "Gracias. Recibimos tu mensaje." }
  }

  const supabase = await createClient()
  const { error } = await supabase.rpc("submit_contact_message", {
    message_origin: origin,
    sender_name: parsed.data.name,
    sender_email: parsed.data.email,
    sender_phone: parsed.data.phone,
    message_subject: parsed.data.subject,
    message_body: parsed.data.message,
    message_metadata: { page: origin },
  })

  if (error) {
    console.error("Error saving contact message", error)
    return { error: "No pudimos enviar tu mensaje. Intentá nuevamente." }
  }

  return { success: "Gracias. Recibimos tu mensaje y te contactaremos pronto." }
}
