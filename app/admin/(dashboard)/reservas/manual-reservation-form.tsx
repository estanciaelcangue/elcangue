"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { Plus, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  createManualReservationAction,
  type ManualReservationState,
} from "./actions"

type RoomOption = {
  id: string
  name: string
  bed_configs: string[]
}

const initialState: ManualReservationState = {}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>
      <Save />
      {pending ? "Guardando…" : "Crear reserva"}
    </Button>
  )
}

export function ManualReservationForm({ rooms }: { rooms: RoomOption[] }) {
  const [open, setOpen] = useState(false)
  const [roomId, setRoomId] = useState(rooms[0]?.id ?? "")
  const [state, formAction] = useActionState(createManualReservationAction, initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const selectedRoom = rooms.find((room) => room.id === roomId)

  useEffect(() => {
    if (!state.success) return
    formRef.current?.reset()
  }, [state.success])

  return (
    <section className="mb-8 border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span>
          <span className="block text-sm font-semibold">Alta manual</span>
          <span className="mt-1 block text-xs text-muted-foreground">Cargá reservas recibidas por teléfono o email.</span>
        </span>
        <Plus className={`size-5 transition-transform ${open ? "rotate-45" : ""}`} />
      </button>

      {open && (
        <form ref={formRef} action={formAction} className="grid gap-4 border-t border-border p-5 md:grid-cols-2 lg:grid-cols-3">
          <label className="space-y-1.5 text-xs font-medium">
            Email
            <Input name="guest_email" type="email" required />
          </label>
          <label className="space-y-1.5 text-xs font-medium">
            Teléfono
            <Input name="guest_phone" type="tel" required />
          </label>
          <label className="space-y-1.5 text-xs font-medium">
            Habitación
            <select
              name="room_id"
              value={roomId}
              onChange={(event) => setRoomId(event.target.value)}
              required
              className="h-9 w-full border border-input bg-transparent px-3 text-sm"
            >
              {rooms.map((room) => <option key={room.id} value={room.id}>{room.name}</option>)}
            </select>
          </label>
          <label className="space-y-1.5 text-xs font-medium">
            Ingreso
            <Input name="check_in" type="date" required />
          </label>
          <label className="space-y-1.5 text-xs font-medium">
            Salida
            <Input name="check_out" type="date" required />
          </label>
          <label className="space-y-1.5 text-xs font-medium">
            Configuración
            <select name="bed_config" required className="h-9 w-full border border-input bg-transparent px-3 text-sm">
              {selectedRoom?.bed_configs.map((configuration) => (
                <option key={configuration} value={configuration}>{configuration}</option>
              ))}
            </select>
          </label>

          <div className="space-y-2 md:col-span-2 lg:col-span-3">
            {state.error && <p className="text-sm text-destructive">{state.error}</p>}
            {state.success && <p className="text-sm text-green-700">{state.success}</p>}
            {state.warning && <p className="text-sm text-amber-700">{state.warning}</p>}
            <SubmitButton />
          </div>
        </form>
      )}
    </section>
  )
}
