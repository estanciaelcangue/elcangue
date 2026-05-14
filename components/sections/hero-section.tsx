"use client"

import { useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import LightRays from "@/components/LightRays"
import { HeroSlideshow } from "@/components/hero-slideshow"
import { Signature } from "@/components/ui/signature"
import { defaultLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries"
import { localizePath } from "@/lib/i18n/navigation"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

type HeroSectionProps = {
  dictionary?: Dictionary
  locale?: Locale
}

export function HeroSection({
  dictionary = getDictionary(defaultLocale),
  locale = defaultLocale,
}: HeroSectionProps) {
  const copy = dictionary.home.hero
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]")
      if (items.length) {
        gsap.from(items, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        })
      }

      const bg = sectionRef.current?.querySelector<HTMLElement>("[data-hero-bg]")
      if (bg) {
        gsap.to(bg, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative isolate flex min-h-[86svh] items-center justify-center overflow-hidden px-4 py-24 text-center sm:px-6 lg:px-8"
    >
      <div data-hero-bg className="absolute inset-0 -top-[10%] -bottom-[10%] z-0">
        <HeroSlideshow />
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-foreground/5 to-foreground/24"
      />

      <div className="relative z-[3] mx-auto w-full max-w-4xl">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <p data-hero-item className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-card/80">
            {copy.eyebrow}
          </p>
          <h1 data-hero-item className="mb-4 text-card">
            <span className="sr-only">{copy.srTitle}</span>
            <span
              aria-hidden="true"
              className="block font-serif text-2xl leading-snug text-card/90 sm:text-4xl"
            >
              {copy.titlePrefix}
            </span>
            <span aria-hidden="true" className="block mt-1">
              <Signature
                text={copy.signature}
                fontSize={104}
                duration={1.8}
                delay={0.2}
                className="mx-auto h-auto w-[min(88vw,32rem)] text-card drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)]"
              />
            </span>
          </h1>
          <p data-hero-item className="mx-auto mb-8 max-w-2xl text-base leading-7 text-card/85 sm:text-lg">
            {copy.intro}
          </p>

          <div data-hero-item className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="#contacto"
              className="inline-flex items-center justify-center border border-primary bg-primary px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-primary-foreground transition-colors hover:bg-button-hover"
            >
              {copy.primaryCta}
            </Link>
            <Link
              href={localizePath("/posada", locale)}
              className="inline-flex items-center justify-center border border-card/55 bg-card/10 px-8 py-3 text-xs font-medium uppercase tracking-[0.15em] text-card transition-colors hover:bg-card/20"
            >
              {copy.secondaryCta}
            </Link>
          </div>

          <div data-hero-item className="mx-auto mt-10 grid w-full max-w-xl grid-cols-3 border-y border-card/25 py-4 text-card/80">
            {copy.tags.map((tag) => (
              <p key={tag} className="text-xs uppercase tracking-[0.18em]">
                {tag}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
