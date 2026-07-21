"use client"

import { useActionState, useEffect, useRef } from "react"
import { useFormStatus } from "react-dom"
import { Send } from "lucide-react"
import { submitContactMessage, type ContactMessageOrigin, type ContactMessageState } from "@/app/contact-actions"
import type { Locale } from "@/lib/i18n/config"

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
const inputClass = "w-full border border-border bg-card px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"

function SubmitButton({ label, sending }: { label: string; sending: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 bg-coral px-6 py-3.5 text-xs font-medium uppercase tracking-[0.15em] text-background transition hover:bg-coral/90 disabled:cursor-not-allowed disabled:opacity-50"
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
  labels = {},
}: ContactMessageFormProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const action = submitContactMessage.bind(null, origin, locale)
  const [state, formAction] = useActionState(action, initialState)

  useEffect(() => {
    if (state.success) formRef.current?.reset()
  }, [state.success])

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${origin}-website`}>Sitio web</label>
        <input id={`${origin}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="block space-y-2 text-sm font-medium">
        {labels.name ?? "Nombre completo"}
        <input name="name" required className={inputClass} placeholder={labels.namePlaceholder ?? "Tu nombre"} />
      </label>
      <label className="block space-y-2 text-sm font-medium">
        {labels.email ?? "Email"}
        <input name="email" type="email" required className={inputClass} placeholder={labels.emailPlaceholder ?? "tu@email.com"} />
      </label>
      {showPhone && (
        <label className="block space-y-2 text-sm font-medium">
          {labels.phone ?? "Teléfono"}
          <input name="phone" type="tel" className={inputClass} placeholder={labels.phonePlaceholder ?? "+598…"} />
        </label>
      )}
      <label className="block space-y-2 text-sm font-medium">
        {labels.subject ?? subjectLabel}
        {subjectOptions ? (
          <select name="subject" required className={inputClass} defaultValue="">
            <option value="" disabled>{labels.selectPlaceholder ?? "Seleccionar…"}</option>
            {subjectOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        ) : (
          <input name="subject" defaultValue={defaultSubject} className={inputClass} placeholder={subjectPlaceholder} />
        )}
      </label>
      <label className="block space-y-2 text-sm font-medium">
        {labels.message ?? "Mensaje"}
        <textarea name="message" required minLength={5} maxLength={5000} rows={5} className={`${inputClass} resize-none`} placeholder={labels.messagePlaceholder ?? "Contanos cómo podemos ayudarte…"} />
      </label>
      {state.error && <p className="border border-destructive/25 bg-destructive/5 px-3 py-2 text-sm text-destructive">{state.error}</p>}
      {state.success && <p className="border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">{state.success}</p>}
      <SubmitButton label={submitLabel} sending={labels.sending ?? "Enviando…"} />
    </form>
  )
}
