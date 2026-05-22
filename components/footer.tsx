"use client"

import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"
import ShinyText from "./ShinyText"
import { usePathname } from "next/navigation"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getLocaleFromPathnameOrDefault, localizePath } from "@/lib/i18n/navigation"

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: Facebook },
  { href: "https://instagram.com", label: "Instagram", icon: Instagram },
]

export function Footer() {
  const pathname = usePathname()
  const locale = getLocaleFromPathnameOrDefault(pathname)
  const dictionary = getDictionary(locale)

  return (
    <footer className="bg-primary text-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 border-b border-background/14 pb-11 lg:grid-cols-[1.05fr_0.95fr_0.65fr] lg:gap-14">
          <div className="max-w-md">
            <a href={localizePath("/", locale)} className="inline-flex items-center">
              <Image
                src="/images/logo.png"
                alt={dictionary.site.name}
                width={150}
                height={90}
                className="h-auto w-32 brightness-[1.18]"
              />
            </a>
            <p className="mt-5 max-w-sm font-sans text-base font-light leading-7 text-background/82">
              Una experiencia de campo para descansar, reconectar y disfrutar.
            </p>
          </div>

          <div>
            <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-background/62">
              {dictionary.footer.contactTitle}
            </p>
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-background/58" strokeWidth={1.8} />
                <p className="text-sm leading-6 text-background/78">
                  Ruta 3 km 358.5<br />
                  Paysandú, Uruguay
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 size-4 shrink-0 text-background/58" strokeWidth={1.8} />
                <div className="grid gap-1 text-sm leading-6 text-background/78">
                  <a href="mailto:info@estanciaelcangue.com" className="transition-colors hover:text-background">
                    info@estanciaelcangue.com
                  </a>
                  <a href="mailto:reservas@estanciaelcangue.com.uy" className="transition-colors hover:text-background">
                    reservas@estanciaelcangue.com.uy
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-background/58" strokeWidth={1.8} />
                <a href="tel:+59899726883" className="text-sm text-background/78 transition-colors hover:text-background">
                  +598 99 726 883
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-background/62">
              Redes
            </p>
            <div className="flex items-center gap-3 lg:flex-col lg:items-start">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-3 rounded-full border border-background/16 bg-background/[0.08] px-4 text-sm text-background/78 backdrop-blur-sm transition hover:border-background/30 hover:bg-background/14 hover:text-background"
                  aria-label={label}
                >
                  <Icon className="size-4" strokeWidth={1.8} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-background/52 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Estancia El Cangüé. Todos los derechos reservados.</p>
          <a href="https://grupodte.com" target="_blank" rel="noopener noreferrer">
            <ShinyText text="Built by DTE" speed={2} fontSize={11} color="#ffffff80" shineColor="#ffffff" />
          </a>
        </div>
      </div>
    </footer>
  )
}
