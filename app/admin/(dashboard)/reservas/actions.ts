"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { requireAdminSession } from "@/lib/admin/auth"
import { sendGuestConfirmationEmail } from "@/lib/email"

export async function updateReservationStatus(
  id: string,
  status: "confirmed" | "rejected" | "cancelled",
  adminNotes?: string
): Promise<{ error?: string }> {
  await requireAdminSession()
  const supabase = await createClient()

  // Fetch full reservation data before updating (needed for confirmation email)
  const { data: reservation } = await supabase
    .from("reservations")
    .select("*, room:rooms(name)")
    .eq("id", id)
    .single()

  const { error } = await supabase
    .from("reservations")
    .update({ status, admin_notes: adminNotes ?? "" })
    .eq("id", id)

  if (error) {
    console.error("Error updating reservation:", error)
    return { error: "No se pudo actualizar la reserva." }
  }

  // Send confirmation email to guest when admin confirms
  if (status === "confirmed" && reservation) {
    const r = reservation as {
      guest_name: string
      guest_email: string
      guest_phone: string
      check_in: string
      check_out: string
      adults: number
      children: number
      bed_config: string
      guest_notes?: string
      room: { name: string } | null
    }
    sendGuestConfirmationEmail({
      guestName: r.guest_name,
      guestEmail: r.guest_email,
      guestPhone: r.guest_phone,
      roomName: r.room?.name ?? "—",
      bedConfig: r.bed_config,
      checkIn: r.check_in,
      checkOut: r.check_out,
      adults: r.adults,
      children: r.children,
      guestNotes: r.guest_notes,
    }).catch(console.error)
  }

  revalidatePath("/admin/reservas")
  return {}
}
