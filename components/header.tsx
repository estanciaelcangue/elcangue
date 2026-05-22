"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MoreHorizontal, X } from "lucide-react"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { localeShortLabels, locales, type Locale } from "@/lib/i18n/config"
import { getLocaleFromPathnameOrDefault, localizePath, switchLocalePath } from "@/lib/i18n/navigation"
import { cn } from "@/lib/utils"

function WhatsAppLogo() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8 fill-current">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347Zm-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26C2.168 6.443 6.603 2.009 12.055 2.009c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.993c-.003 5.45-4.437 9.884-9.885 9.884Zm8.413-18.297A11.815 11.815 0 0 0 12.056 0C5.54 0 .232 5.307.23 11.824c0 2.082.543 4.116 1.573 5.907L.13 24l6.412-1.681a11.807 11.807 0 0 0 5.516 1.448h.005c6.516 0 11.823-5.307 11.826-11.824a11.76 11.76 0 0 0-3.464-8.455Z" />
    </svg>
  )
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const locale = getLocaleFromPathnameOrDefault(pathname)
  const dictionary = getDictionary(locale)

  const navLinks = [
    { href: "/posada", label: dictionary.nav.posada },
    { href: "/eventos", label: dictionary.nav.eventos },
    { href: "/destination-wedding", label: dictionary.nav.destinationWedding },
    { href: "/rosedal", label: dictionary.nav.rosedal },
    { href: "/noticias", label: dictionary.nav.blog },
    { href: "/contacto", label: dictionary.nav.contacto },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const languageLinks = (
    onClick?: () => void,
    className = "h-8 min-w-8"
  ) => (
    <div className="flex items-center gap-1" aria-label={dictionary.common.languageSwitcher}>
      {locales.map((item: Locale) => (
        <Link
          key={item}
          href={switchLocalePath(pathname, item)}
          hrefLang={item}
          aria-current={item === locale ? "true" : undefined}
          onClick={onClick}
          className={`${className} inline-flex items-center justify-center border text-[0.65rem] font-semibold tracking-[0.12em] transition-colors ${
            item === locale
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-background/40 text-foreground/65 hover:border-primary/50 hover:text-primary"
          }`}
        >
          {localeShortLabels[item]}
        </Link>
      ))}
    </div>
  )

  return (
    <header
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mx-auto w-full border-t border-transparent transition-all duration-300 ease-out lg:bottom-auto lg:top-0 lg:border-b lg:border-t-0",
        isScrolled
          ? "border-border/70 bg-card/95 shadow-[0_-8px_28px_rgba(46,42,36,0.12)] backdrop-blur-lg lg:top-4 lg:max-w-6xl lg:rounded-md lg:border lg:shadow-sm"
          : "bg-card/95 shadow-[0_-8px_28px_rgba(46,42,36,0.08)] lg:bg-card/90 lg:shadow-none"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-6 pb-[max(0.625rem,env(safe-area-inset-bottom))] pt-2.5 transition-all duration-300 ease-out sm:px-6 lg:px-8 lg:py-0",
          isScrolled && "lg:max-w-6xl lg:px-5"
        )}
      >
        <div
          className={cn(
            "relative flex h-14 items-center justify-between transition-all duration-300 ease-out lg:h-20",
            isScrolled && "lg:h-16"
          )}
        >
          {/* Logo */}
          <Link
            href={localizePath("/", locale)}
            className="absolute left-1/2 top-1/2 z-10 flex-shrink-0 -translate-x-1/2 -translate-y-1/2 lg:static lg:flex lg:h-full lg:items-center lg:translate-x-0 lg:translate-y-0"
          >
            <Image
              src="/images/logo.png"
              alt={dictionary.site.name}
              width={100}
              height={50}
              className={cn(
                "h-[5.35rem] w-auto max-w-[12rem] transition-all duration-300 ease-out lg:h-[5.225rem] lg:max-w-[14rem]",
                isScrolled && "lg:h-[4.325rem]"
              )}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={cn(
              "hidden items-center gap-8 transition-all duration-300 ease-out lg:flex",
              isScrolled && "lg:gap-6"
            )}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={localizePath(link.href, locale)}
                className="text-xs font-medium text-foreground/80 hover:text-primary transition-colors tracking-[0.15em] uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex">{languageLinks()}</div>

          {/* Mobile WhatsApp Button */}
          <a
            href="https://wa.me/59899726883"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="inline-flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm transition-colors hover:bg-primary/15 lg:hidden"
          >
            <WhatsAppLogo />
          </a>

          {/* Mobile Menu Button */}
          <button
            className="inline-flex size-12 items-center justify-center text-[#a08b8b] transition-colors hover:text-primary lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={dictionary.common.toggleMenu}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={30} /> : <MoreHorizontal size={38} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute inset-x-0 bottom-full border-b border-border bg-card/95 shadow-[0_-10px_28px_rgba(46,42,36,0.14)] backdrop-blur-sm lg:hidden">
          <nav className="flex flex-col px-4 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={localizePath(link.href, locale)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide uppercase py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2">
              {languageLinks(() => setIsMobileMenuOpen(false), "h-9 min-w-10")}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
