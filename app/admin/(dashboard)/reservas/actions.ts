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

export async function updateReservationStatus(
  id: string,
  status: ManagedReservationStatus,
  adminNotes?: string
): Promise<{ error?: string; warning?: string }> {
  await requireAdminSession()
  const supabase = await createClient()

  const result = await performReservationStatusUpdate(
    { id, status, adminNotes },
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
}
