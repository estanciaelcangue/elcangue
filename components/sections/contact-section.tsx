import type { ReactNode } from "react"
import Image from "next/image"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"
import { Reveal } from "@/components/animations/reveal"
import { defaultLocale } from "@/lib/i18n/config"
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries"
import { ESTANCIA_ADDRESS, googleMapsEmbedSrc, googleMapsHref } from "@/lib/location"
import reservationBackground from "@/public/images/FONDO SECCION DE RESERVA. FONDO EL CANGUE .webp"

const whatsappHref = "https://wa.me/59899726883"

type ContactSectionProps = {
  dictionary?: Dictionary
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin
  label: string
  children: ReactNode
}) {
  return (
    <div className="border-t border-border/70 pt-4">
      <div className="mb-3 flex items-center gap-2 text-primary">
        <Icon className="size-3.5" strokeWidth={1.7} />
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-foreground/50">
          {label}
        </p>
      </div>
      <div className="text-sm leading-[1.32] text-foreground/80">{children}</div>
    </div>
  )
}

export function ContactSection({
  dictionary = getDictionary(defaultLocale),
}: ContactSectionProps) {
  const copy = dictionary.home.contact

  return (
    <Reveal as="section" id="contacto" className="relative overflow-hidden bg-background py-16 sm:py-20" y={28} duration={0.7}>
      <Image
        src={reservationBackground}
        alt=""
        fill
        aria-hidden="true"
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-background/78" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-y border-border/75 bg-background/50 px-0 py-9 backdrop-blur-[1px] sm:py-11 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(22rem,0.98fr)] lg:gap-14">
            <div className="flex flex-col">
              <p className="section-eyebrow mb-5">
                Reservas y estadías
              </p>
              <p className="max-w-xl text-sm leading-[1.32] text-foreground/80">
                Escribinos para consultar fechas disponibles, tarifas y detalles de la estadía. Te respondemos personalmente para ayudarte a organizar tu visita.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center justify-center bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-button-hover"
                >
                  Consultar disponibilidad
                </a>
                <p className="flex items-center gap-2 text-xs leading-[1.35] text-foreground/60">
                  <span className="h-px w-8 bg-border" />
                  Respuesta personalizada por WhatsApp
                </p>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                <ContactItem icon={MapPin} label="Ubicación">
                  <p>Ruta 3 km 358,5</p>
                  <p>Paysandú, Uruguay</p>
                </ContactItem>
                <ContactItem icon={Phone} label="Teléfono">
                  <a href="tel:+59899726883" className="transition-colors hover:text-primary">
                    +598 99 726 883
                  </a>
                </ContactItem>
                <ContactItem icon={Mail} label="Email">
                  <div className="grid gap-1">
                    <a href="mailto:info@estanciaelcangue.com" className="truncate transition-colors hover:text-primary">
                      info@estanciaelcangue.com
                    </a>
                    <a href="mailto:reservas@estanciaelcangue.com.uy" className="truncate transition-colors hover:text-primary">
                      reservas@estanciaelcangue.com.uy
                    </a>
                  </div>
                </ContactItem>
              </div>
            </div>

            <div className="lg:pt-1">
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-eyebrow mb-3">
                    {copy.findUs}
                  </p>
                  <p className="text-sm leading-[1.32] text-foreground/80">
                    {ESTANCIA_ADDRESS}
                  </p>
                </div>
                <a
                  href={googleMapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition-colors hover:text-button-hover"
                >
                  Abrir en Google Maps
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>

              <div className="border border-border/75 bg-card p-2">
                <div className="relative min-h-[21rem] overflow-hidden border border-border/60 bg-accent/25 sm:min-h-[24rem] lg:min-h-[27rem]">
                  <iframe
                    src={googleMapsEmbedSrc}
                    width="100%"
                    height="100%"
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={copy.mapTitle}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
