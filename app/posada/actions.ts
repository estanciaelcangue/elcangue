"use server"

import { createClient } from "@/lib/supabase/server"
import { sendAdminNewReservationEmail } from "@/lib/email"
import { z } from "zod"
import { normalizeLocale, type Locale } from "@/lib/i18n/config"

const reservationSchema = z.object({
  room_id: z.string().uuid(),
  guest_name: z.string().min(2),
  guest_email: z.string().email(),
  guest_phone: z.string().min(6),
  check_in: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  check_out: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.coerce.number().min(1).max(8),
  children: z.coerce.number().min(0).max(8),
  bed_config: z.string().min(1),
  guest_notes: z.string().optional(),
})

export async function createReservation(
  input: unknown,
  localeValue: Locale = "es",
): Promise<{ error?: string }> {
  const locale = normalizeLocale(localeValue)
  const copy = {
    es: { invalid: "Datos inválidos. Revisá el formulario.", dates: "La fecha de salida debe ser posterior al ingreso.", save: "No se pudo guardar la reserva. Intentá de nuevo." },
    en: { invalid: "Invalid details. Please review the form.", dates: "Check-out must be after check-in.", save: "We could not save the request. Please try again." },
    fr: { invalid: "Données invalides. Vérifiez le formulaire.", dates: "La date de départ doit être postérieure à l’arrivée.", save: "Nous n’avons pas pu enregistrer la demande. Réessayez." },
    pt: { invalid: "Dados inválidos. Revise o formulário.", dates: "A data de saída deve ser posterior à entrada.", save: "Não foi possível salvar a solicitação. Tente novamente." },
  }[locale]
  const parsed = reservationSchema.safeParse(input)
  if (!parsed.success) {
    return { error: copy.invalid }
  }

  const { check_in, check_out, ...rest } = parsed.data

  if (check_out <= check_in) {
    return { error: copy.dates }
  }

  const supabase = await createClient()

  // Fetch room name for the email
  const { data: room } = await supabase
    .from("rooms")
    .select("name")
    .eq("id", rest.room_id)
    .single()

  const { error } = await supabase.from("reservations").insert({
    ...rest,
    check_in,
    check_out,
    guest_notes: rest.guest_notes ?? "",
  })

  if (error) {
    console.error("Error creating reservation:", error)
    return { error: copy.save }
  }

  // Send admin notification (non-blocking — don't fail the request if email fails)
  const emailResult = await sendAdminNewReservationEmail({
    guestName: rest.guest_name,
    guestEmail: rest.guest_email,
    guestPhone: rest.guest_phone,
    roomName: room?.name ?? rest.room_id,
    bedConfig: rest.bed_config,
    checkIn: check_in,
    checkOut: check_out,
    adults: rest.adults,
    children: rest.children,
    guestNotes: rest.guest_notes,
  })

  if (emailResult.error) {
    console.error("Reservation saved but admin email failed", emailResult.error)
  }

  return {}
}
