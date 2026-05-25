"use server"

import { createClient } from "@/lib/supabase/server"
import { sendAdminNewReservationEmail } from "@/lib/email"
import { z } from "zod"

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
  input: unknown
): Promise<{ error?: string }> {
  const parsed = reservationSchema.safeParse(input)
  if (!parsed.success) {
    return { error: "Datos inválidos. Revisá el formulario." }
  }

  const { check_in, check_out, ...rest } = parsed.data

  if (check_out <= check_in) {
    return { error: "La fecha de salida debe ser posterior al ingreso." }
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
    return { error: "No se pudo guardar la reserva. Intentá de nuevo." }
  }

  // Send admin notification (non-blocking — don't fail the request if email fails)
  sendAdminNewReservationEmail({
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
  }).catch(console.error)

  return {}
}
