"use server"

import { z } from "zod"
import { createClient } from "@/lib/supabase/server"
import { normalizeLocale, type Locale } from "@/lib/i18n/config"

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
  requestedLocale: Locale,
  _previousState: ContactMessageState,
  formData: FormData,
): Promise<ContactMessageState> {
  const locale = normalizeLocale(requestedLocale)
  const copy = {
    es: { invalid: "Revisá los datos del formulario.", error: "No pudimos enviar tu mensaje. Intentá nuevamente.", success: "Gracias. Recibimos tu mensaje y te contactaremos pronto." },
    en: { invalid: "Please review the form details.", error: "We could not send your message. Please try again.", success: "Thank you. We received your message and will contact you soon." },
    fr: { invalid: "Veuillez vérifier les informations du formulaire.", error: "Nous n’avons pas pu envoyer votre message. Réessayez.", success: "Merci. Nous avons reçu votre message et vous contacterons bientôt." },
    pt: { invalid: "Revise os dados do formulário.", error: "Não foi possível enviar sua mensagem. Tente novamente.", success: "Obrigado. Recebemos sua mensagem e entraremos em contato em breve." },
  }[locale]
  const parsed = messageSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return { error: copy.invalid }
  }

  if (parsed.data.website) {
    return { success: copy.success }
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
    return { error: copy.error }
  }

  return { success: copy.success }
}
