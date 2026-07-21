"use client"

import Image from "next/image"
import { Instagram } from "lucide-react"
import ShinyText from "./ShinyText"
import { usePathname } from "next/navigation"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getLocaleFromPathnameOrDefault, localizePath } from "@/lib/i18n/navigation"
import footerPattern from "@/public/images/FOOTER ROSAS.webp"

const instagramHref = "https://www.instagram.com/estanciaelcangue/"
const whatsappHref = "https://wa.me/59899726883"

function WhatsAppLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347Zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26C2.168 6.443 6.603 2.009 12.055 2.009c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.993c-.003 5.45-4.437 9.884-9.885 9.884Zm8.413-18.297A11.815 11.815 0 0 0 12.056 0C5.54 0 .232 5.307.23 11.824c0 2.082.543 4.116 1.573 5.907L.13 24l6.412-1.681a11.807 11.807 0 0 0 5.516 1.448h.005c6.516 0 11.823-5.307 11.826-11.824a11.76 11.76 0 0 0-3.464-8.455Z" />
    </svg>
  )
}

export function Footer() {
  const pathname = usePathname()
  const locale = getLocaleFromPathnameOrDefault(pathname)
  const dictionary = getDictionary(locale)
  const experienceText = {
    es: "Una experiencia de campo para descansar, reconectar y disfrutar.",
    en: "A countryside experience to rest, reconnect and enjoy.",
    fr: "Une expérience à la campagne pour se reposer et se reconnecter.",
    pt: "Uma experiência no campo para descansar, reconectar e aproveitar.",
  }[locale]

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
            {experienceText}
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
              <WhatsAppLogo />
              <span className="whitespace-nowrap">WHATSAPP</span>
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
