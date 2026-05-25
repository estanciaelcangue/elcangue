"use client"

import Image from "next/image"
import { Instagram, MessageCircle } from "lucide-react"
import ShinyText from "./ShinyText"
import { usePathname } from "next/navigation"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getLocaleFromPathnameOrDefault, localizePath } from "@/lib/i18n/navigation"
import footerPattern from "@/public/images/FOOTER ROSAS.webp"

const instagramHref = "https://instagram.com"
const whatsappHref = "https://wa.me/59899726883"

export function Footer() {
  const pathname = usePathname()
  const locale = getLocaleFromPathnameOrDefault(pathname)
  const dictionary = getDictionary(locale)

  return (
    <footer className="relative overflow-hidden bg-primary text-background">
      <Image
        src={footerPattern}
        alt=""
        fill
        aria-hidden="true"
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary/82" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="relative grid min-h-[100px] items-center gap-5 border-b border-background/14 pb-4 text-center md:grid-cols-[1fr_auto_1fr] md:text-left">
          <p className="mx-auto max-w-xs font-serif text-base leading-[1.2] text-background/86 md:mx-0">
            Una experiencia de campo para descansar, reconectar y disfrutar.
          </p>

          <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <a href={localizePath("/", locale)} className="inline-flex items-center">
              <Image
                src="/images/logo.png"
                alt={dictionary.site.name}
                width={170}
                height={102}
                className="h-auto w-24 brightness-0 invert"
              />
            </a>
          </div>

          <div className="flex flex-col gap-2 md:col-start-3 md:items-end">
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 w-full items-center justify-center gap-3 border border-background/18 bg-background/[0.08] px-4 text-sm text-background/82 backdrop-blur-sm transition hover:border-background/30 hover:bg-background/14 hover:text-background sm:w-64"
              aria-label="Instagram"
            >
              <Instagram className="size-4" strokeWidth={1.8} />
              <span>Instagram</span>
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 w-full items-center justify-center gap-3 bg-background px-4 text-xs font-semibold uppercase tracking-[0.14em] text-primary transition hover:bg-background/90 sm:w-64"
            >
              <MessageCircle className="size-4" strokeWidth={1.8} />
              <span>Escribinos por WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 pt-3 text-center text-xs text-background/52 sm:flex-row sm:justify-between sm:text-left">
          <p>© 2026 Estancia El Cangüé. Todos los derechos reservados.</p>
          <a href="https://grupodte.com" target="_blank" rel="noopener noreferrer">
            <ShinyText text="Built by DTE" speed={2} fontSize={11} color="#ffffff80" shineColor="#ffffff" />
          </a>
        </div>
      </div>
    </footer>
  )
}
