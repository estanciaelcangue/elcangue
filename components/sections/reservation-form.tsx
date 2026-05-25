"use client"

import { useState, useTransition, useEffect, useRef } from "react"
import Image from "next/image"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createReservation } from "@/app/posada/actions"

const schema = z.object({
  room_id: z.string().min(1, "Seleccioná una habitación"),
  guest_name: z.string().min(2, "Nombre requerido"),
  guest_email: z.string().email("Email inválido"),
  guest_phone: z.string().min(6, "Teléfono requerido"),
  check_in: z.string().min(1, "Fecha de ingreso requerida"),
  check_out: z.string().min(1, "Fecha de salida requerida"),
  adults: z.coerce.number().min(1).max(8),
  children: z.coerce.number().min(0).max(8),
  bed_config: z.string().min(1, "Seleccioná una configuración de camas"),
  guest_notes: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

type RoomOption = {
  id: string
  name: string
  slug: string
  image: string
  bed_configs: string[]
}

type Props = {
  rooms: RoomOption[]
}

export function ReservationForm({ rooms }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const sectionRef = useRef<HTMLElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { adults: 2, children: 0, bed_config: "", room_id: "" },
  })

  const selectedRoomId = watch("room_id")
  const selectedBedConfig = watch("bed_config")
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId)

  // Listen for "Reservar esta habitación" clicks from the room cards above
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const btn = (e.target as HTMLElement).closest("[data-room-slug]")
      if (!btn) return
      const slug = (btn as HTMLElement).dataset.roomSlug
      const room = rooms.find((r) => r.slug === slug)
      if (!room) return
      setValue("room_id", room.id, { shouldValidate: true })
      setValue("bed_config", room.bed_configs[0] ?? "", { shouldValidate: true })
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
      }, 50)
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [rooms, setValue])

  // When room changes, reset bed_config to first option of new room
  useEffect(() => {
    if (selectedRoom) {
      setValue("bed_config", selectedRoom.bed_configs[0] ?? "")
    }
  }, [selectedRoomId, selectedRoom, setValue])

  function onSubmit(values: FormValues) {
    setServerError(null)
    startTransition(async () => {
      const result = await createReservation(values)
      if (result.error) {
        setServerError(result.error)
      } else {
        setSubmitted(true)
      }
    })
  }

  if (submitted) {
    return (
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-serif text-2xl text-background mb-4 uppercase tracking-wide">
            ¡Solicitud recibida!
          </h2>
          <p className="text-background/80 text-sm leading-relaxed">
            Te contactaremos a la brevedad para confirmar tu reserva.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="reserva" className="py-16 bg-primary scroll-mt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-2xl text-background mb-2 uppercase tracking-wide">
          Solicitá tu Reserva
        </h2>
        <p className="text-center text-background/60 text-xs mb-10 uppercase tracking-widest">
          Te confirmamos disponibilidad a la brevedad
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* ── STEP 1: Room selection ── */}
          <div>
            <p className="text-background/70 text-xs uppercase tracking-widest mb-3">
              1. Elegí tu habitación
            </p>
            <Controller
              name="room_id"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {rooms.map((room) => {
                    const selected = field.value === room.id
                    return (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => field.onChange(room.id)}
                        className={`relative aspect-[3/2] overflow-hidden text-left transition-all ${
                          selected
                            ? "ring-2 ring-background"
                            : "opacity-70 hover:opacity-90"
                        }`}
                      >
                        <Image
                          src={room.image}
                          alt={room.name}
                          fill
                          className="object-cover"
                          sizes="(min-width: 640px) 33vw, 50vw"
                        />
                        <div
                          className={`absolute inset-0 transition-colors ${
                            selected ? "bg-foreground/20" : "bg-foreground/40"
                          }`}
                        />
                        <div className="absolute inset-0 flex items-end p-2">
                          <span className="font-serif text-sm sm:text-base text-background uppercase tracking-wide leading-tight">
                            {room.name}
                          </span>
                        </div>
                        {selected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-background flex items-center justify-center">
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}
            />
            {errors.room_id && (
              <p className="text-xs text-red-300 mt-2">{errors.room_id.message}</p>
            )}
          </div>

          {/* ── STEP 2: Bed configuration (only when room is selected) ── */}
          {selectedRoom && (
            <div>
              <p className="text-background/70 text-xs uppercase tracking-widest mb-3">
                2. Configuración de camas — <span className="text-background font-medium">{selectedRoom.name}</span>
              </p>
              <Controller
                name="bed_config"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-2">
                    {selectedRoom.bed_configs.map((cfg) => {
                      const active = field.value === cfg
                      return (
                        <button
                          key={cfg}
                          type="button"
                          onClick={() => field.onChange(cfg)}
                          className={`px-4 py-2 text-xs font-medium uppercase tracking-wide border transition-colors ${
                            active
                              ? "bg-background text-foreground border-background"
                              : "border-background/40 text-background/70 hover:border-background/80 hover:text-background"
                          }`}
                        >
                          {cfg}
                        </button>
                      )
                    })}
                  </div>
                )}
              />
              {errors.bed_config && (
                <p className="text-xs text-red-300 mt-2">{errors.bed_config.message}</p>
              )}
            </div>
          )}

          {/* ── STEP 3: Dates + guests ── */}
          <div>
            <p className="text-background/70 text-xs uppercase tracking-widest mb-3">
              3. Fechas y huéspedes
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-background/50 text-xs mb-1 uppercase tracking-wide">Ingreso</label>
                <input
                  type="date"
                  {...register("check_in")}
                  className="w-full px-3 py-2.5 bg-background border-0 text-sm text-foreground/70"
                />
                {errors.check_in && <p className="text-xs text-red-300 mt-1">{errors.check_in.message}</p>}
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-background/50 text-xs mb-1 uppercase tracking-wide">Salida</label>
                <input
                  type="date"
                  {...register("check_out")}
                  className="w-full px-3 py-2.5 bg-background border-0 text-sm text-foreground/70"
                />
                {errors.check_out && <p className="text-xs text-red-300 mt-1">{errors.check_out.message}</p>}
              </div>
              <div>
                <label className="block text-background/50 text-xs mb-1 uppercase tracking-wide">Adultos</label>
                <select
                  {...register("adults")}
                  className="w-full px-3 py-2.5 bg-background border-0 text-sm text-foreground/70"
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-background/50 text-xs mb-1 uppercase tracking-wide">Menores</label>
                <select
                  {...register("children")}
                  className="w-full px-3 py-2.5 bg-background border-0 text-sm text-foreground/70"
                >
                  {[0, 1, 2, 3].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* ── STEP 4: Guest info ── */}
          <div>
            <p className="text-background/70 text-xs uppercase tracking-widest mb-3">
              4. Tus datos
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  {...register("guest_name")}
                  className="w-full px-3 py-2.5 bg-background border-0 text-sm text-foreground/70"
                />
                {errors.guest_name && <p className="text-xs text-red-300 mt-1">{errors.guest_name.message}</p>}
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Teléfono / WhatsApp"
                  {...register("guest_phone")}
                  className="w-full px-3 py-2.5 bg-background border-0 text-sm text-foreground/70"
                />
                {errors.guest_phone && <p className="text-xs text-red-300 mt-1">{errors.guest_phone.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <input
                  type="email"
                  placeholder="Email"
                  {...register("guest_email")}
                  className="w-full px-3 py-2.5 bg-background border-0 text-sm text-foreground/70"
                />
                {errors.guest_email && <p className="text-xs text-red-300 mt-1">{errors.guest_email.message}</p>}
              </div>
              <div className="sm:col-span-2">
                <textarea
                  placeholder="Consultas o pedidos especiales (opcional)"
                  rows={3}
                  {...register("guest_notes")}
                  className="w-full px-3 py-2.5 bg-background border-0 text-sm text-foreground/70 resize-none"
                />
              </div>
            </div>
          </div>

          {/* ── Summary ── */}
          {selectedRoom && selectedBedConfig && (
            <div className="border border-background/20 px-4 py-3 text-xs text-background/70 space-y-0.5">
              <p className="text-background font-medium uppercase tracking-wide text-xs mb-1">Resumen de tu solicitud</p>
              <p>Habitación: <span className="text-background">{selectedRoom.name}</span></p>
              <p>Camas: <span className="text-background">{selectedBedConfig}</span></p>
            </div>
          )}

          {serverError && (
            <p className="text-sm text-red-300 text-center">{serverError}</p>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={isPending}
              className="px-10 py-3 bg-background text-foreground text-xs uppercase tracking-widest font-medium hover:bg-background/90 transition-colors disabled:opacity-60"
            >
              {isPending ? "Enviando..." : "Enviar Solicitud"}
            </button>
          </div>

        </form>
      </div>
    </section>
  )
}
