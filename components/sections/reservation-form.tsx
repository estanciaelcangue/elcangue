"use client"

import { useState, useTransition, useEffect, useRef } from "react"
import Image from "next/image"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { BedDouble, CalendarDays, Check, ClipboardCheck, UserRound } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { createReservation } from "@/app/posada/actions"

const schema = z.object({
  room_id: z.string().min(1, "Seleccioná un alojamiento"),
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

const inputClass =
  "w-full rounded-sm border border-primary/12 bg-[#FAF8F2] px-4 py-3 text-sm text-foreground/78 shadow-sm outline-none transition focus:border-primary/45 focus:ring-2 focus:ring-primary/12"

const labelClass = "mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-primary/64"

const dateButtonClass =
  "flex min-h-12 w-full items-center justify-between gap-3 rounded-sm border border-primary/14 bg-[#FAF8F2] px-4 py-3 text-left text-sm text-foreground/78 shadow-sm outline-none transition hover:border-primary/30 hover:bg-[#FFFDF7] focus-visible:border-primary/55 focus-visible:ring-2 focus-visible:ring-primary/14"

const planningSteps = [
  { icon: BedDouble, title: "Elegí tu alojamiento" },
  { icon: CalendarDays, title: "Indicá fechas y huéspedes" },
  { icon: UserRound, title: "Dejanos tus datos" },
  { icon: ClipboardCheck, title: "Te confirmamos disponibilidad" },
]

function parseDateValue(value?: string) {
  if (!value) return undefined
  const [year, month, day] = value.split("-").map(Number)
  if (!year || !month || !day) return undefined
  return new Date(year, month - 1, day)
}

function toDateValue(date?: Date) {
  if (!date) return ""
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatDisplayDate(value?: string) {
  const date = parseDateValue(value)
  if (!date) return "dd/mm/aaaa"
  return new Intl.DateTimeFormat("es-UY", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

function formatMonthTitle(date: Date) {
  const formatted = new Intl.DateTimeFormat("es-UY", {
    month: "long",
    year: "numeric",
  }).format(date)
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

type ReservationDateFieldProps = {
  value?: string
  onChange: (value: string) => void
  error?: string
  ariaLabel: string
}

function ReservationDateField({ value, onChange, error, ariaLabel }: ReservationDateFieldProps) {
  const [open, setOpen] = useState(false)
  const selectedDate = parseDateValue(value)

  function selectDate(date?: Date) {
    if (!date) return
    onChange(toDateValue(date))
    setOpen(false)
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button type="button" className={dateButtonClass} aria-label={ariaLabel}>
            <span className={selectedDate ? "text-foreground/78" : "text-foreground/42"}>
              {formatDisplayDate(value)}
            </span>
            <CalendarDays className="size-4 shrink-0 text-primary/58" strokeWidth={1.7} />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={10}
          className="w-auto max-w-[calc(100vw-32px)] overflow-hidden rounded-md border border-primary/18 bg-[#FAF8F2] p-0 text-foreground shadow-[0_22px_60px_rgba(46,42,36,0.22)]"
        >
          <div className="w-[14.25rem] max-w-[calc(100vw-32px)] bg-[linear-gradient(180deg,#FFFDF7_0%,#FAF8F2_100%)] px-2.5 pb-3 pt-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={selectDate}
            showOutsideDays
            weekStartsOn={1}
            formatters={{
              formatCaption: formatMonthTitle,
              formatWeekdayName: (date) =>
                new Intl.DateTimeFormat("es-UY", { weekday: "short" })
                  .format(date)
                  .slice(0, 2)
                  .toUpperCase(),
            }}
            className="mx-auto w-full bg-transparent p-0 [--cell-size:1.72rem]"
            classNames={{
              root: "w-full",
              months: "w-full",
              month: "w-full gap-2.5",
              nav: "pointer-events-none absolute inset-x-0 top-0 flex h-8 items-center justify-between",
              button_previous:
                "pointer-events-auto flex size-8 items-center justify-start rounded-none border-0 bg-transparent p-0 text-primary/58 shadow-none transition hover:bg-transparent hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/20 [&_svg]:size-3.5",
              button_next:
                "pointer-events-auto flex size-8 items-center justify-end rounded-none border-0 bg-transparent p-0 text-primary/58 shadow-none transition hover:bg-transparent hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/20 [&_svg]:size-3.5",
              month_caption: "flex h-8 items-center justify-center px-8",
              caption_label: "font-serif text-[0.95rem] font-medium leading-none tracking-[0.01em] text-title",
              weekdays: "mt-3 grid grid-cols-7 gap-1 border-t border-primary/10 pt-3",
              weekday:
                "flex h-6 items-center justify-center rounded-sm text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-primary/58",
              week: "mt-0.5 grid grid-cols-7 gap-1",
              day: "aspect-square p-0",
              today: "rounded-sm bg-transparent",
              outside: "text-foreground/26 aria-selected:text-background",
              disabled: "pointer-events-none text-foreground/20 opacity-45",
            }}
            components={{
              DayButton: ({ day, modifiers, ...props }) => (
                <button
                  type="button"
                  className={`flex size-[1.72rem] items-center justify-center rounded-sm border text-[0.86rem] leading-none transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 ${
                    modifiers.selected
                      ? "border-primary bg-primary font-semibold text-background shadow-[0_8px_18px_rgba(70,80,52,0.22)] hover:bg-button-hover"
                    : modifiers.today
                        ? "border-primary/38 bg-[#F4EFE4] font-semibold text-primary hover:bg-primary/10"
                        : modifiers.outside
                          ? "border-transparent text-foreground/24 hover:bg-primary/8"
                          : "border-transparent text-foreground/76 hover:border-primary/10 hover:bg-primary/10 hover:text-primary"
                  }`}
                  {...props}
                />
              ),
            }}
            footer={
              <div className="-mx-2.5 mt-3 flex items-center justify-between border-t border-primary/12 bg-[#F4EFE4]/72 px-2.5 pt-3 text-[0.66rem] font-semibold uppercase tracking-[0.12em]">
                <button
                  type="button"
                  className="rounded-sm px-1 py-1.5 text-primary/62 transition hover:bg-primary/8 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                  onClick={() => onChange("")}
                >
                  Borrar
                </button>
                <button
                  type="button"
                  className="rounded-sm px-1 py-1.5 text-primary/78 transition hover:bg-primary/8 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                  onClick={() => selectDate(new Date())}
                >
                  Hoy
                </button>
              </div>
            }
          />
          </div>
        </PopoverContent>
      </Popover>
      {error && <p className="mt-1 text-xs text-red-700">{error}</p>}
    </>
  )
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
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <p className="section-eyebrow-light mb-4">Solicitud recibida</p>
          <h2 className="mb-4 font-serif text-3xl text-background">
            Gracias por pensar en El Cangüé
          </h2>
          <p className="text-sm leading-relaxed text-background/78">
            Recibimos tu consulta y te contactaremos a la brevedad para confirmar disponibilidad.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="reserva" className="scroll-mt-20 bg-primary py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-eyebrow-light mb-3">Reserva tu estadía</p>
          <h2 className="font-serif text-3xl leading-tight text-background sm:text-4xl">
            Consultá disponibilidad para venir a descansar al campo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-[1.65] text-background/70">
            Completá esta solicitud y nuestro equipo te responde con disponibilidad, opciones y detalles.
            No es un pago ni una reserva automática.
          </p>
        </div>

        <div className="mt-10 grid gap-3 rounded-sm border border-background/16 bg-background/[0.06] p-3 sm:grid-cols-2 lg:grid-cols-4">
          {planningSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="flex items-center gap-3 rounded-sm border border-background/12 bg-background/[0.07] px-4 py-3 text-background/84"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-primary">
                  <Icon className="size-4" strokeWidth={1.7} />
                </span>
                <div>
                  <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-background/50">
                    Paso {index + 1}
                  </p>
                  <p className="text-sm leading-snug">{step.title}</p>
                </div>
              </div>
            )
          })}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 rounded-sm bg-background p-4 shadow-[0_26px_80px_rgba(46,42,36,0.22)] sm:p-6 lg:p-8"
        >
          <div className="space-y-8">
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-background">
                  1
                </span>
                <div>
                  <h3 className="font-serif text-xl text-title">Elegí tu alojamiento</h3>
                  <p className="text-xs text-foreground/56">Seleccioná la opción que más se ajuste a tu estadía.</p>
                </div>
              </div>

              <Controller
                name="room_id"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {rooms.map((room) => {
                      const selected = field.value === room.id
                      return (
                        <button
                          key={room.id}
                          type="button"
                          onClick={() => field.onChange(room.id)}
                          className={`group relative aspect-[4/3] overflow-hidden rounded-sm text-left transition ${
                            selected
                              ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                              : "opacity-88 hover:opacity-100"
                          }`}
                        >
                          <Image
                            src={room.image}
                            alt={room.name}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.03]"
                            sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                          />
                          <div className={`absolute inset-0 ${selected ? "bg-foreground/20" : "bg-foreground/42"}`} />
                          <div className="absolute inset-0 flex items-end p-4">
                            <span className="font-serif text-lg uppercase leading-tight text-background">
                              {room.name}
                            </span>
                          </div>
                          {selected && (
                            <div className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-background text-primary">
                              <Check className="size-4" strokeWidth={2} />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                )}
              />
              {errors.room_id && <p className="mt-2 text-xs text-red-700">{errors.room_id.message}</p>}
            </section>

            {selectedRoom && (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-background">
                    2
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-title">Configuración de camas</h3>
                    <p className="text-xs text-foreground/56">{selectedRoom.name}</p>
                  </div>
                </div>

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
                            className={`rounded-sm border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                              active
                                ? "border-primary bg-primary text-background"
                                : "border-primary/22 bg-[#FAF8F2] text-foreground/68 hover:border-primary/45 hover:text-primary"
                            }`}
                          >
                            {cfg}
                          </button>
                        )
                      })}
                    </div>
                  )}
                />
                {errors.bed_config && <p className="mt-2 text-xs text-red-700">{errors.bed_config.message}</p>}
              </section>
            )}

            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-background">
                  3
                </span>
                <div>
                  <h3 className="font-serif text-xl text-title">Indicá fechas y huéspedes</h3>
                  <p className="text-xs text-foreground/56">Así podemos revisar disponibilidad con precisión.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className={labelClass}>Ingreso</label>
                  <Controller
                    name="check_in"
                    control={control}
                    render={({ field }) => (
                      <ReservationDateField
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.check_in?.message}
                        ariaLabel="Seleccionar fecha de ingreso"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className={labelClass}>Salida</label>
                  <Controller
                    name="check_out"
                    control={control}
                    render={({ field }) => (
                      <ReservationDateField
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.check_out?.message}
                        ariaLabel="Seleccionar fecha de salida"
                      />
                    )}
                  />
                </div>
                <div>
                  <label className={labelClass}>Adultos</label>
                  <select {...register("adults")} className={inputClass}>
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Menores</label>
                  <select {...register("children")} className={inputClass}>
                    {[0, 1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-background">
                  4
                </span>
                <div>
                  <h3 className="font-serif text-xl text-title">Dejanos tus datos</h3>
                  <p className="text-xs text-foreground/56">Te contactamos para confirmar disponibilidad.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Nombre completo</label>
                  <input type="text" {...register("guest_name")} className={inputClass} />
                  {errors.guest_name && <p className="mt-1 text-xs text-red-700">{errors.guest_name.message}</p>}
                </div>
                <div>
                  <label className={labelClass}>Teléfono / WhatsApp</label>
                  <input type="tel" {...register("guest_phone")} className={inputClass} />
                  {errors.guest_phone && <p className="mt-1 text-xs text-red-700">{errors.guest_phone.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Email</label>
                  <input type="email" {...register("guest_email")} className={inputClass} />
                  {errors.guest_email && <p className="mt-1 text-xs text-red-700">{errors.guest_email.message}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Consultas o pedidos especiales</label>
                  <textarea
                    rows={4}
                    {...register("guest_notes")}
                    className={`${inputClass} resize-none`}
                    placeholder="Opcional"
                  />
                </div>
              </div>
            </section>

            {selectedRoom && selectedBedConfig && (
              <div className="rounded-sm border border-primary/16 bg-primary/[0.04] px-4 py-4 text-sm text-foreground/70">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Resumen de tu solicitud
                </p>
                <p>
                  Alojamiento: <span className="font-medium text-foreground">{selectedRoom.name}</span>
                </p>
                <p>
                  Camas: <span className="font-medium text-foreground">{selectedBedConfig}</span>
                </p>
              </div>
            )}

            {serverError && <p className="text-center text-sm text-red-700">{serverError}</p>}

            <div className="flex flex-col items-center gap-3 border-t border-primary/12 pt-6 text-center">
              <button
                type="submit"
                disabled={isPending}
                className="w-full rounded-sm bg-primary px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-background shadow-[0_18px_38px_rgba(70,80,52,0.22)] transition hover:bg-button-hover disabled:opacity-60 sm:w-auto sm:min-w-72"
              >
                {isPending ? "Enviando..." : "Solicitar disponibilidad"}
              </button>
              <p className="max-w-md text-xs leading-relaxed text-foreground/52">
                Te respondemos con las opciones disponibles para que puedas confirmar tu estadía sin apuro.
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
