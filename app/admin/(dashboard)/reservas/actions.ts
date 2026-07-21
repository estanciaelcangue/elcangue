"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { requireAdminSession } from "@/lib/admin/auth"
import { sendReservationStatusEmail } from "@/lib/email"
import {
  performReservationStatusUpdate,
  type ManagedReservationStatus,
  type ReservationForNotification,
} from "@/lib/reservations/status-service"
import { sendAdminNewReservationEmail } from "@/lib/email"
import { z } from "zod"

export type ManualReservationState = {
  error?: string
  success?: string
  warning?: string
}

const manualReservationSchema = z.object({
  guest_email: z.string().trim().email("Ingresá un email válido."),
  guest_phone: z.string().trim().min(6, "Ingresá un teléfono válido.").max(40),
  room_id: z.string().uuid("Seleccioná una habitación."),
  check_in: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ingresá la fecha de ingreso."),
  check_out: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ingresá la fecha de salida."),
  bed_config: z.string().trim().min(1, "Seleccioná una configuración."),
})

const updateReservationStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["confirmed", "rejected", "cancelled"]),
  adminNotes: z.string().max(2000).optional(),
})

export async function createManualReservationAction(
  _previousState: ManualReservationState,
  formData: FormData,
): Promise<ManualReservationState> {
  await requireAdminSession()
  const parsed = manualReservationSchema.safeParse(Object.fromEntries(formData))

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Revisá los datos ingresados." }
  }

  if (parsed.data.check_out <= parsed.data.check_in) {
    return { error: "La fecha de salida debe ser posterior al ingreso." }
  }

  const supabase = await createClient()
  const { data: room, error: roomError } = await supabase
    .from("rooms")
    .select("id, name, bed_configs")
    .eq("id", parsed.data.room_id)
    .eq("is_active", true)
    .maybeSingle()

  if (roomError || !room) {
    return { error: "La habitación seleccionada no está disponible." }
  }

  if (!(room.bed_configs as string[]).includes(parsed.data.bed_config)) {
    return { error: "La configuración no corresponde a esa habitación." }
  }

  const guestName = parsed.data.guest_email.split("@")[0]
  const { error } = await supabase.from("reservations").insert({
    ...parsed.data,
    guest_name: guestName,
    adults: 2,
    children: 0,
    guest_notes: "Reserva cargada manualmente desde el panel.",
    status: "pending",
  })

  if (error) {
    console.error("Error creating manual reservation", error)
    return { error: "No se pudo crear la reserva." }
  }

  const emailResult = await sendAdminNewReservationEmail({
    guestName,
    guestEmail: parsed.data.guest_email,
    guestPhone: parsed.data.guest_phone,
    roomName: room.name,
    bedConfig: parsed.data.bed_config,
    checkIn: parsed.data.check_in,
    checkOut: parsed.data.check_out,
    adults: 2,
    children: 0,
    guestNotes: "Reserva cargada manualmente desde el panel.",
  })

  revalidatePath("/admin/reservas")
  return emailResult.error
    ? {
        success: "Reserva creada.",
        warning: `No se pudo enviar el aviso por email: ${emailResult.error}`,
      }
    : { success: "Reserva creada y aviso enviado." }
}

export async function updateReservationStatus(
  id: string,
  status: ManagedReservationStatus,
  adminNotes?: string
): Promise<{ error?: string; warning?: string }> {
  await requireAdminSession()
  const parsed = updateReservationStatusSchema.safeParse({ id, status, adminNotes })

  if (!parsed.success) {
    console.error("Invalid reservation status update payload", parsed.error.flatten())
    return { error: "No se pudo procesar el cambio de estado." }
  }

  const supabase = await createClient()

  try {
    const result = await performReservationStatusUpdate(
      parsed.data,
      {
        async findReservation(reservationId) {
          const { data, error } = await supabase
            .from("reservations")
            .select("*, room:rooms(name)")
            .eq("id", reservationId)
            .maybeSingle()

          if (error) {
            console.error("Error loading reservation before status update", error)
            return null
          }

          return data as ReservationForNotification | null
        },
        async updateReservation(reservationId, nextStatus, notes) {
          const { error } = await supabase
            .from("reservations")
            .update({ status: nextStatus, admin_notes: notes })
            .eq("id", reservationId)

          if (error) {
            console.error("Error updating reservation", error)
            return { error: "No se pudo actualizar la reserva." }
          }

          return {}
        },
        async notifyGuest(reservation, nextStatus) {
          return sendReservationStatusEmail({
            guestName: reservation.guest_name,
            guestEmail: reservation.guest_email,
            guestPhone: reservation.guest_phone,
            roomName: reservation.room?.name ?? "—",
            bedConfig: reservation.bed_config,
            checkIn: reservation.check_in,
            checkOut: reservation.check_out,
            adults: reservation.adults,
            children: reservation.children,
            guestNotes: reservation.guest_notes,
          }, nextStatus)
        },
      },
    )

    revalidatePath("/admin/reservas")
    return result
  } catch (error) {
    console.error("Unexpected error updating reservation status", error)
    return { error: "No se pudo actualizar la reserva. Revisá los logs para ver el detalle." }
  }
}
