import type { ReactNode } from "react"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { Reveal } from "@/components/animations/reveal"
import { defaultLocale } from "@/lib/i18n/config"
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries"

const whatsappHref = "https://wa.me/59899726883"
const mapsHref = "https://www.google.com/maps/search/?api=1&query=Ruta%203%20km%20358.5%2C%20Paysandu%2C%20Uruguay"

type ContactSectionProps = {
  dictionary?: Dictionary
}

function ContactRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin
  label: string
  children: ReactNode
}) {
  return (
    <div className="group flex min-h-24 items-start gap-4 border-t border-border/75 py-4 transition-colors sm:py-5">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-4" strokeWidth={1.8} />
      </span>
      <div className="min-w-0">
        <p className="mb-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-foreground/48">
          {label}
        </p>
        <div className="text-sm leading-6 text-foreground/78">{children}</div>
      </div>
    </div>
  )
}

export function ContactSection({
  dictionary = getDictionary(defaultLocale),
}: ContactSectionProps) {
  const copy = dictionary.home.contact

  return (
    <Reveal as="section" id="contacto" className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
          <div className="border border-border/75 bg-card px-5 py-6 shadow-[0_30px_100px_rgba(46,42,36,0.08)] sm:px-8 sm:py-9">
            <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
              Reservas y estadías
            </p>
            <h2 className="max-w-lg font-sans text-3xl font-light leading-[1.06] tracking-normal text-foreground sm:text-5xl sm:leading-[1.04]">
              Reservá tu próxima escapada al campo
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-[1.45] text-foreground/68 sm:text-base sm:leading-[1.5]">
              Escribinos para consultar fechas disponibles, tarifas y detalles de la estadía. Te respondemos personalmente para ayudarte a organizar tu visita.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="reservation-cta inline-flex min-h-16 items-center justify-center overflow-hidden bg-primary px-8 py-5 text-base font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-[0_20px_50px_rgba(46,42,36,0.18)] transition-colors hover:bg-button-hover sm:text-lg"
              >
                Consultar disponibilidad
              </a>
              <p className="inline-flex items-center gap-2 text-xs leading-[1.35] tracking-[0.08em] text-foreground/52">
                <span className="size-1.5 rounded-full bg-coral" />
                Respuesta personalizada por WhatsApp
              </p>
            </div>

            <div className="mt-9 grid sm:grid-cols-2 sm:gap-x-6">
              <ContactRow icon={MapPin} label="Ubicación">
                <p>Ruta 3 km 358.5</p>
                <p>Paysandú, Uruguay</p>
              </ContactRow>
              <ContactRow icon={Phone} label="Teléfono">
                <a href="tel:+59899726883" className="transition-colors hover:text-primary">
                  +598 99 726 883
                </a>
              </ContactRow>
              <div className="sm:col-span-2">
                <ContactRow icon={Mail} label="Email">
                  <div className="grid gap-1 sm:grid-cols-2">
                    <a href="mailto:info@estanciaelcangue.com" className="truncate transition-colors hover:text-primary">
                      info@estanciaelcangue.com
                    </a>
                    <a href="mailto:reservas@estanciaelcangue.com.uy" className="truncate transition-colors hover:text-primary">
                      reservas@estanciaelcangue.com.uy
                    </a>
                  </div>
                </ContactRow>
              </div>
            </div>
          </div>

          <div className="flex min-h-[38rem] flex-col border border-border/75 bg-card p-3 shadow-[0_30px_100px_rgba(46,42,36,0.08)] sm:p-4 lg:min-h-full">
            <div className="flex flex-col gap-4 border-b border-border/70 px-2 pb-4 pt-2 sm:flex-row sm:items-end sm:justify-between sm:px-3">
              <div>
                <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-primary">
                  {copy.findUs}
                </p>
                <h3 className="font-sans text-2xl font-light tracking-normal text-foreground">
                  Ruta 3 km 358.5, Paysandú
                </h3>
              </div>
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-button-hover"
              >
                Abrir en Google Maps
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>

            <div className="mt-3 min-h-[28rem] flex-1 overflow-hidden bg-accent/25 sm:min-h-[32rem] lg:min-h-0">
              <iframe
                src="https://maps.google.com/maps?q=Ruta%203%20km%20358.5%2C%20Paysandu%2C%20Uruguay&t=k&z=17&output=embed"
                width="100%"
                height="100%"
                className="h-full min-h-[28rem] w-full border-0 sm:min-h-[32rem] lg:min-h-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={copy.mapTitle}
              />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
