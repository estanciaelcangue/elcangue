"use client"

import { MapPin, Mail, Phone, Instagram, Facebook } from "lucide-react"
import { usePathname } from "next/navigation"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getLocaleFromPathnameOrDefault } from "@/lib/i18n/navigation"

export function Footer() {
  const pathname = usePathname()
  const locale = getLocaleFromPathnameOrDefault(pathname)
  const dictionary = getDictionary(locale)

  return (
    <footer className="bg-primary text-background">
      {/* Main Footer */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="text-xs tracking-[0.2em] uppercase text-background/80 mb-6">
            {dictionary.footer.contactTitle}
          </h3>
          
          <div className="space-y-3 mb-8">
            <div className="flex items-center justify-center gap-2">
              <MapPin size={14} className="text-background/60" />
              <p className="text-background/70 text-sm">
                {dictionary.footer.address}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Mail size={14} className="text-background/60" />
              <a href="mailto:info@estanciaelcangue.com" className="text-background/70 hover:text-background transition-colors text-sm">
                info@estanciaelcangue.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Phone size={14} className="text-background/60" />
              <a href="tel:+59899726883" className="text-background/70 hover:text-background transition-colors text-sm">
                +598 99 726 883
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-sm bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={16} className="text-background/80" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-sm bg-background/10 flex items-center justify-center hover:bg-background/20 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} className="text-background/80" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-xs">
              ESTANCIA EL CANGUE
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
