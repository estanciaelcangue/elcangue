"use client"

import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { Send } from "lucide-react"
import { submitContactMessage, type ContactMessageOrigin, type ContactMessageState } from "@/app/contact-actions"
import type { Locale } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

type SubjectOption = { value: string; label: string }

type ContactMessageFormProps = {
  origin: ContactMessageOrigin
  locale?: Locale
  subjectLabel?: string
  subjectPlaceholder?: string
  subjectOptions?: SubjectOption[]
  defaultSubject?: string
  showPhone?: boolean
  submitLabel?: string
  variant?: "default" | "wedding"
  labels?: Partial<{
    name: string
    email: string
    phone: string
    subject: string
    message: string
    namePlaceholder: string
    emailPlaceholder: string
    phonePlaceholder: string
    selectPlaceholder: string
    messagePlaceholder: string
    sending: string
  }>
}

const initialState: ContactMessageState = {}
const defaultInputClass = "w-full border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"

function SubmitButton({ label, sending, variant }: { label: string; sending: string; variant: "default" | "wedding" }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-background transition disabled:cursor-not-allowed disabled:opacity-50",
        variant === "wedding"
          ? "min-h-12 border border-coral bg-coral shadow-[0_10px_30px_rgba(107,79,54,0.14)] active:scale-[0.985] hover:border-primary hover:bg-primary"
          : "bg-coral hover:bg-coral/90",
      )}
    >
      <Send className="size-4" />
      {pending ? sending : label}
    </button>
  )
}

export function ContactMessageForm({
  origin,
  locale = "es",
  subjectLabel = "Asunto",
  subjectPlaceholder = "Asunto de tu consulta",
  subjectOptions,
  defaultSubject = "",
  showPhone = false,
  submitLabel = "Enviar mensaje",
  variant = "default",
  labels = {},
}: ContactMessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const action = submitContactMessage.bind(null, origin, locale)
  const [state, formAction] = useActionState(action, initialState)
  const fieldClass = variant === "wedding"
    ? "w-full border border-primary/20 bg-card/72 px-4 py-3.5 font-sans text-base font-normal normal-case tracking-normal text-foreground outline-none transition placeholder:text-foreground/38 hover:border-primary/35 focus:border-coral focus:bg-card focus:ring-2 focus:ring-coral/10 sm:text-sm"
    : defaultInputClass
  const labelClass = variant === "wedding"
    ? "block space-y-2 font-serif text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-title"
    : "block space-y-2 text-sm font-medium"

  useEffect(() => {
    if (state.success) formRef.current?.reset()
  }, [state.success])

  return (
    <form ref={formRef} action={formAction} className={variant === "wedding" ? "space-y-4" : "space-y-5"}>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${origin}-website`}>Sitio web</label>
        <input id={`${origin}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className={labelClass}>
        {labels.name ?? "Nombre completo"}
        <input name="name" required className={fieldClass} placeholder={labels.namePlaceholder ?? "Tu nombre"} />
      </label>
      <label className={labelClass}>
        {labels.email ?? "Email"}
        <input name="email" type="email" required className={fieldClass} placeholder={labels.emailPlaceholder ?? "tu@email.com"} />
      </label>
      {showPhone && (
        <label className={labelClass}>
          {labels.phone ?? "Teléfono"}
          <input name="phone" type="tel" className={fieldClass} placeholder={labels.phonePlaceholder ?? "+598…"} />
        </label>
      )}
      <label className={labelClass}>
        {labels.subject ?? subjectLabel}
        {subjectOptions ? (
          <select name="subject" required className={fieldClass} defaultValue="">
            <option value="" disabled>{labels.selectPlaceholder ?? "Seleccionar…"}</option>
            {subjectOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        ) : (
          <input name="subject" defaultValue={defaultSubject} className={fieldClass} placeholder={subjectPlaceholder} />
        )}
      </label>
      <label className={labelClass}>
        {labels.message ?? "Mensaje"}
        <textarea name="message" required minLength={5} maxLength={5000} rows={5} className={`${fieldClass} resize-none`} placeholder={labels.messagePlaceholder ?? "Contanos cómo podemos ayudarte…"} />
      </label>
      {state.error && <p className="border border-destructive/25 bg-destructive/5 px-3 py-2 text-sm text-destructive">{state.error}</p>}
      {state.success && <p className="border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">{state.success}</p>}
      <SubmitButton label={submitLabel} sending={labels.sending ?? "Enviando…"} variant={variant} />
    </form>
  )
}
