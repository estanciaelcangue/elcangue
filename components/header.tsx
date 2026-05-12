"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/posada", label: "Posada de Campo" },
  { href: "/eventos", label: "Eventos" },
  { href: "/blog", label: "Blog" },
  { href: "/destination-wedding", label: "Destination Wedding" },
  { href: "/rosedal", label: "El Rosedal" },
  { href: "/contacto", label: "Contacto" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-sm shadow-sm"
          : "bg-card/90"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              alt="Estancia El Cangue"
              width={100}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-foreground/80 hover:text-primary transition-colors tracking-[0.15em] uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Flags - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            <button className="w-6 h-4 overflow-hidden rounded-sm opacity-70 hover:opacity-100 transition-opacity" aria-label="English">
              <div className="w-full h-full bg-gradient-to-b from-blue-900 via-white to-red-600" />
            </button>
            <button className="w-6 h-4 overflow-hidden rounded-sm opacity-70 hover:opacity-100 transition-opacity" aria-label="Espanol">
              <div className="w-full h-full bg-gradient-to-b from-red-600 via-yellow-400 to-red-600" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
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
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors tracking-wide uppercase py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t border-border mt-2">
              <button className="w-6 h-4 overflow-hidden rounded-sm" aria-label="English">
                <div className="w-full h-full bg-gradient-to-b from-blue-900 via-white to-red-600" />
              </button>
              <button className="w-6 h-4 overflow-hidden rounded-sm" aria-label="Espanol">
                <div className="w-full h-full bg-gradient-to-b from-red-600 via-yellow-400 to-red-600" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
