"use client"

import { useState, useTransition } from "react"
import { ChevronDown, ChevronUp, Check, X } from "lucide-react"
import { updateReservationStatus } from "./actions"

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

type Props = {
  reservation: Reservation
  statusLabel: string
  statusColor: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("es-UY", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function ReservationRow({ reservation: r, statusLabel, statusColor }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [adminNotes, setAdminNotes] = useState(r.admin_notes)
  const [isPending, startTransition] = useTransition()
  const [localStatus, setLocalStatus] = useState(r.status)
  const [feedback, setFeedback] = useState<{ type: "error" | "warning" | "success"; message: string } | null>(null)

  function handleAction(status: "confirmed" | "rejected" | "cancelled") {
    startTransition(async () => {
      setFeedback(null)
      const result = await updateReservationStatus(r.id, status, adminNotes)
      if (result.error) {
        setFeedback({ type: "error", message: result.error })
        return
      }

      setLocalStatus(status)
      setFeedback(result.warning
        ? { type: "warning", message: result.warning }
        : { type: "success", message: "Estado actualizado y email enviado." })
    })
  }

  const isPendingStatus = localStatus === "pending"

  return (
    <div className="rounded-sm border border-border bg-card overflow-hidden">
      {/* Summary row */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-4 px-4 py-3 text-left hover:bg-muted/40 transition-colors"
      >
        <span className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[localStatus] ?? statusColor}`}>
          {STATUS_LABELS[localStatus] ?? statusLabel}
        </span>
        <span className="flex-1 min-w-0">
          <span className="font-medium text-sm text-foreground truncate">{r.guest_name}</span>
          <span className="text-muted-foreground text-xs ml-2">{r.room?.name ?? "Sin habitación"}</span>
        </span>
        <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
          {formatDate(r.check_in)} → {formatDate(r.check_out)}
        </span>
        {expanded ? <ChevronUp size={16} className="shrink-0 text-muted-foreground" /> : <ChevronDown size={16} className="shrink-0 text-muted-foreground" />}
      </button>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-border px-4 py-4 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm">
            <Detail label="Email" value={r.guest_email} />
            <Detail label="Teléfono" value={r.guest_phone || "—"} />
            <Detail label="Habitación" value={r.room?.name ?? "Sin habitación"} />
            <Detail label="Ingreso" value={formatDate(r.check_in)} />
            <Detail label="Salida" value={formatDate(r.check_out)} />
            <Detail label="Configuración" value={r.bed_config} />
            <Detail label="Adultos" value={String(r.adults)} />
            <Detail label="Menores" value={String(r.children)} />
            <Detail
              label="Recibida"
              value={new Date(r.created_at).toLocaleDateString("es-UY", { day: "2-digit", month: "short", year: "numeric" })}
            />
          </div>

          {r.guest_notes && (
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Notas del huésped</p>
              <p className="text-sm text-foreground/80">{r.guest_notes}</p>
            </div>
          )}

          {/* Admin notes + actions */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">Notas internas</p>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={2}
              placeholder="Notas para el equipo (no visible al huésped)"
              className="w-full rounded-sm border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {feedback && (
            <p className={`border px-3 py-2 text-xs ${
              feedback.type === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : feedback.type === "warning"
                  ? "border-amber-200 bg-amber-50 text-amber-800"
                  : "border-green-200 bg-green-50 text-green-700"
            }`}>
              {feedback.message}
            </p>
          )}

          {isPendingStatus && (
            <div className="flex gap-2">
              <button
                onClick={() => handleAction("confirmed")}
                disabled={isPending}
                className="flex items-center gap-1.5 px-4 py-2 bg-green-600 text-white text-xs font-medium rounded-sm hover:bg-green-700 disabled:opacity-60 transition-colors"
              >
                <Check size={14} />
                Confirmar
              </button>
              <button
                onClick={() => handleAction("rejected")}
                disabled={isPending}
                className="flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-sm hover:bg-red-700 disabled:opacity-60 transition-colors"
              >
                <X size={14} />
                Rechazar
              </button>
            </div>
          )}

          {localStatus === "confirmed" && (
            <div className="flex gap-2">
              <button
                onClick={() => handleAction("cancelled")}
                disabled={isPending}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-border text-xs text-muted-foreground rounded-sm hover:border-foreground/40 disabled:opacity-60 transition-colors"
              >
                Cancelar reserva
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
      <p className="text-sm text-foreground">{value}</p>
    </div>
  )
}
