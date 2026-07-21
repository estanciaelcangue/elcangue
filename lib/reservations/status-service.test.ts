import { describe, expect, it, vi } from "vitest"
import {
  canTransitionReservationStatus,
  performReservationStatusUpdate,
  type ManagedReservationStatus,
  type ReservationForNotification,
} from "./status-service"

const reservation: ReservationForNotification = {
  id: "00000000-0000-4000-8000-000000000001",
  status: "pending",
  guest_name: "Ana Pérez",
  guest_email: "ana@example.com",
  guest_phone: "+598 99 123 456",
  check_in: "2026-08-10",
  check_out: "2026-08-12",
  adults: 2,
  children: 0,
  bed_config: "Matrimonial",
  room: { name: "La Mora" },
}

function dependencies(overrides: Partial<Parameters<typeof performReservationStatusUpdate>[1]> = {}) {
  return {
    findReservation: vi.fn().mockResolvedValue(reservation),
    updateReservation: vi.fn().mockResolvedValue({}),
    notifyGuest: vi.fn().mockResolvedValue({}),
    ...overrides,
  }
}

describe("reservation status workflows", () => {
  it.each(["confirmed", "rejected", "cancelled"] as ManagedReservationStatus[])(
    "moves a pending reservation to %s and notifies the guest",
    async (status) => {
      const deps = dependencies()
      const result = await performReservationStatusUpdate({ id: reservation.id, status }, deps)

      expect(result).toEqual({})
      expect(deps.updateReservation).toHaveBeenCalledWith(reservation.id, status, "")
      expect(deps.notifyGuest).toHaveBeenCalledWith(reservation, status)
    },
  )

  it("allows cancellation after confirmation", () => {
    expect(canTransitionReservationStatus("confirmed", "cancelled")).toBe(true)
  })

  it("does not change terminal reservations", async () => {
    const deps = dependencies({
      findReservation: vi.fn().mockResolvedValue({ ...reservation, status: "rejected" }),
    })

    const result = await performReservationStatusUpdate(
      { id: reservation.id, status: "cancelled" },
      deps,
    )

    expect(result.error).toBe("Ese cambio de estado no está permitido.")
    expect(deps.updateReservation).not.toHaveBeenCalled()
    expect(deps.notifyGuest).not.toHaveBeenCalled()
  })

  it("returns a warning without reverting when email delivery fails", async () => {
    const deps = dependencies({
      notifyGuest: vi.fn().mockResolvedValue({ error: "servicio no disponible" }),
    })

    const result = await performReservationStatusUpdate(
      { id: reservation.id, status: "confirmed" },
      deps,
    )

    expect(result.warning).toContain("La reserva se actualizó")
    expect(deps.updateReservation).toHaveBeenCalledOnce()
  })

  it("does not notify when persistence fails", async () => {
    const deps = dependencies({
      updateReservation: vi.fn().mockResolvedValue({ error: "No se pudo actualizar la reserva." }),
    })

    const result = await performReservationStatusUpdate(
      { id: reservation.id, status: "confirmed" },
      deps,
    )

    expect(result.error).toBe("No se pudo actualizar la reserva.")
    expect(deps.notifyGuest).not.toHaveBeenCalled()
  })
})
