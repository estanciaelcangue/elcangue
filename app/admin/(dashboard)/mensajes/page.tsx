import { Mail, MailOpen, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { requireAdminSession } from "@/lib/admin/auth"
import { createClient } from "@/lib/supabase/server"
import { setMessageReadAction } from "./actions"

export const dynamic = "force-dynamic"

const originLabels: Record<string, string> = {
  contact: "Contacto",
  events: "Eventos",
  destination_wedding: "Destination Wedding",
  home: "Inicio",
}

export default async function AdminMessagesPage() {
  await requireAdminSession()
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("contact_messages")
    .select("id, origin, name, email, phone, subject, message, metadata, is_read, created_at")
    .order("created_at", { ascending: false })

  const messages = data ?? []

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Consultas</p>
        <h1 className="mt-2 text-3xl">Mensajes</h1>
        <p className="mt-2 text-sm text-muted-foreground">{messages.filter((message) => !message.is_read).length} sin leer</p>
      </div>

      {error ? (
        <p className="border border-destructive/20 bg-destructive/5 p-5 text-sm text-destructive">No pudimos cargar los mensajes. Aplicá la migración de mensajes en Supabase.</p>
      ) : messages.length === 0 ? (
        <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">Todavía no hay mensajes.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <article key={message.id} className={`border p-5 ${message.is_read ? "border-border bg-card" : "border-primary/35 bg-primary/[0.035]"}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-primary/10 px-2 py-1 text-xs font-medium text-primary"><MapPin className="size-3" />{originLabels[message.origin] ?? message.origin}</span>
                    {!message.is_read && <span className="text-xs font-semibold text-primary">Nuevo</span>}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold">{message.subject || "Sin asunto"}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{message.name} · <a className="underline" href={`mailto:${message.email}`}>{message.email}</a>{message.phone ? ` · ${message.phone}` : ""}</p>
                </div>
                <time className="text-xs text-muted-foreground">{new Date(message.created_at).toLocaleString("es-UY", { dateStyle: "medium", timeStyle: "short" })}</time>
              </div>
              <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-foreground/80">{message.message}</p>
              <form action={setMessageReadAction} className="mt-5">
                <input type="hidden" name="message_id" value={message.id} />
                <input type="hidden" name="is_read" value={String(!message.is_read)} />
                <Button type="submit" variant="outline" size="sm">
                  {message.is_read ? <Mail /> : <MailOpen />}
                  Marcar como {message.is_read ? "no leído" : "leído"}
                </Button>
              </form>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
