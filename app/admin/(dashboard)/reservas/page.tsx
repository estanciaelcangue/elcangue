import { requireAdminSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"
import { ReservationRow } from "./reservation-row"
import { ManualReservationForm } from "./manual-reservation-form"

export const dynamic = "force-dynamic"

type StatusFilter = "all" | "pending" | "confirmed" | "rejected" | "cancelled"

type Reservation = {
  id: string
  guest_name: string
  guest_email: string
  guest_phone: string
  check_in: string
  check_out: string
  adults: number
  children: number
  bed_config: string
  status: string
  guest_notes: string
  admin_notes: string
  created_at: string
  room: { name: string } | null
}

type RoomOption = {
  id: string
  name: string
  bed_configs: string[]
}

async function getReservations(status: StatusFilter): Promise<Reservation[]> {
  const supabase = await createClient()
  let query = supabase
    .from("reservations")
    .select("*, room:rooms(name)")
    .order("created_at", { ascending: false })

  if (status !== "all") {
    query = query.eq("status", status)
  }

  const { data, error } = await query
  if (error || !data) return []
  return data as Reservation[]
}

async function getRoomOptions(): Promise<RoomOption[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("rooms")
    .select("id, name, bed_configs")
    .eq("is_active", true)
    .order("sort_order")

  if (error) {
    console.error("Error loading room options", error)
    return []
  }

  return (data ?? []) as RoomOption[]
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  rejected: "Rechazada",
  cancelled: "Cancelada",
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
  cancelled: "bg-gray-100 text-gray-600",
}

export default async function ReservasPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  await requireAdminSession()
  const { status: rawStatus } = await searchParams
  const status: StatusFilter =
    rawStatus === "pending" || rawStatus === "confirmed" || rawStatus === "rejected" || rawStatus === "cancelled"
      ? rawStatus
      : "all"

  const [reservations, rooms] = await Promise.all([
    getReservations(status),
    getRoomOptions(),
  ])

  const filters: { value: StatusFilter; label: string }[] = [
    { value: "all", label: "Todas" },
    { value: "pending", label: "Pendientes" },
    { value: "confirmed", label: "Confirmadas" },
    { value: "rejected", label: "Rechazadas" },
    { value: "cancelled", label: "Canceladas" },
  ]

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Reservas</h1>
        <span className="text-sm text-muted-foreground">{reservations.length} resultado{reservations.length !== 1 ? "s" : ""}</span>
      </div>

      <ManualReservationForm rooms={rooms} />

      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <a
            key={f.value}
            href={f.value === "all" ? "/admin/reservas" : `/admin/reservas?status=${f.value}`}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors ${
              status === f.value
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:border-foreground/40"
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      {reservations.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-20 text-center">
          <p className="text-sm text-muted-foreground">No hay reservas en esta categoría.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reservations.map((r) => (
            <ReservationRow
              key={r.id}
              reservation={r}
              statusLabel={STATUS_LABELS[r.status] ?? r.status}
              statusColor={STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-600"}
            />
          ))}
        </div>
      )}
    </div>
  )
}
