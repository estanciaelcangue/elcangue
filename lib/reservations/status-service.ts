export type ReservationStatus = "pending" | "confirmed" | "rejected" | "cancelled"
export type ManagedReservationStatus = Exclude<ReservationStatus, "pending">

export type ReservationForNotification = {
  id: string
  status: ReservationStatus
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

type StatusDependencies = {
  findReservation: (id: string) => Promise<ReservationForNotification | null>
  updateReservation: (
    id: string,
    status: ManagedReservationStatus,
    adminNotes: string,
  ) => Promise<{ error?: string }>
  notifyGuest: (
    reservation: ReservationForNotification,
    status: ManagedReservationStatus,
  ) => Promise<{ error?: string }>
}

const allowedTransitions: Record<ReservationStatus, ManagedReservationStatus[]> = {
  pending: ["confirmed", "rejected", "cancelled"],
  confirmed: ["cancelled"],
  rejected: [],
  cancelled: [],
}

export function canTransitionReservationStatus(
  current: ReservationStatus,
  next: ManagedReservationStatus,
) {
  return allowedTransitions[current].includes(next)
}

export async function performReservationStatusUpdate(
  input: { id: string; status: ManagedReservationStatus; adminNotes?: string },
  dependencies: StatusDependencies,
): Promise<{ error?: string; warning?: string }> {
  const reservation = await dependencies.findReservation(input.id)

  if (!reservation) {
    return { error: "La reserva no existe o ya no está disponible." }
  }

  if (!canTransitionReservationStatus(reservation.status, input.status)) {
    return { error: "Ese cambio de estado no está permitido." }
  }

  const updateResult = await dependencies.updateReservation(
    reservation.id,
    input.status,
    input.adminNotes?.trim() ?? "",
  )

  if (updateResult.error) {
    return { error: updateResult.error }
  }

  const notificationResult = await dependencies.notifyGuest(reservation, input.status)

  if (notificationResult.error) {
    return {
      warning: `La reserva se actualizó, pero no se pudo enviar el email: ${notificationResult.error}`,
    }
  }

  return {}
}
