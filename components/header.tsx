"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { localeShortLabels, locales, type Locale } from "@/lib/i18n/config"
import { getLocaleFromPathnameOrDefault, localizePath, switchLocalePath } from "@/lib/i18n/navigation"
import { cn } from "@/lib/utils"

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
        "fixed left-0 right-0 top-0 z-50 mx-auto w-full border-b border-transparent transition-all duration-300 ease-out",
        isScrolled
          ? "border-border/70 bg-card/95 shadow-sm backdrop-blur-lg lg:top-4 lg:max-w-6xl lg:rounded-md lg:border"
          : "bg-card/90"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-7xl px-4 transition-all duration-300 ease-out sm:px-6 lg:px-8",
          isScrolled && "lg:max-w-6xl lg:px-5"
        )}
      >
        <div
          className={cn(
            "flex h-20 items-center justify-between transition-all duration-300 ease-out",
            isScrolled && "lg:h-16"
          )}
        >
          {/* Logo */}
          <Link href={localizePath("/", locale)} className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt={dictionary.site.name}
              width={100}
              height={50}
              className={cn(
                "h-12 w-auto transition-all duration-300 ease-out",
                isScrolled && "lg:h-10"
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

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={dictionary.common.toggleMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card/95 backdrop-blur-sm border-t border-border">
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
