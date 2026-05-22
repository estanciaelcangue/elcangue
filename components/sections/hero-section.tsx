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
      className="relative isolate bg-card px-2 pb-3 pt-7 text-center sm:px-6 lg:flex lg:min-h-[86svh] lg:items-center lg:justify-center lg:overflow-hidden lg:bg-transparent lg:px-8 lg:py-24"
    >
      <p
        data-hero-item
        className="mb-5 whitespace-nowrap font-serif text-[0.62rem] uppercase tracking-[0.12em] text-primary sm:text-xs lg:hidden"
      >
        {copy.eyebrow}
      </p>

      <div className="relative isolate min-h-[calc(100svh-9rem)] overflow-hidden border-[10px] border-card lg:static lg:min-h-0 lg:overflow-visible lg:border-0">
        <div data-hero-bg className="absolute inset-0 -top-[10%] -bottom-[10%] z-0 hidden lg:block">
          <HeroSlideshow />
        </div>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover lg:hidden"
        >
          <source
            src="/images/ESTANCIA%20EL%20CANGUE%20-%20VIDEO%20PORTADA.mp4"
            type="video/mp4"
          />
        </video>

        <div className="pointer-events-none absolute inset-0 z-[1] hidden lg:block">
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
          className="pointer-events-none absolute inset-0 z-[2] hidden bg-gradient-to-b from-transparent via-foreground/5 to-foreground/24 lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/35 via-black/10 to-transparent lg:hidden"
        />

        <div className="relative z-[3] mx-auto flex min-h-[calc(100svh-10.25rem)] w-full max-w-4xl px-2 pb-2.5 pt-12 lg:min-h-0 lg:items-center lg:px-0 lg:py-0">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center lg:-translate-y-10">
            <p data-hero-item className="mb-5 hidden text-xs font-medium uppercase tracking-[0.28em] text-card/80 lg:block">
              {copy.eyebrow}
            </p>
            <h1 data-hero-item className="-mt-8 mb-4 text-card lg:mt-0 lg:mb-4">
              <span className="sr-only">{copy.srTitle}</span>
              <span
                aria-hidden="true"
                className="block font-serif text-[1.65rem] leading-[1.08] text-white drop-shadow-[0_2px_5px_rgba(35,50,22,0.95)] sm:text-4xl"
              >
                {copy.titlePrefix}
              </span>
              <span aria-hidden="true" className="mt-2 block lg:mt-7">
                <Signature
                  text={copy.signature}
                  fontSize={104}
                  duration={1.8}
                  delay={0.2}
                  className="mx-auto h-auto w-[min(78vw,30rem)] text-card drop-shadow-[0_4px_10px_rgba(35,50,22,0.9)] lg:w-[min(88vw,32rem)]"
                />
              </span>
            </h1>
            <p data-hero-item className="mx-auto mb-7 max-w-[21rem] font-sans text-[11pt] leading-[1.18] text-card/95 drop-shadow-[0_2px_4px_rgba(35,50,22,0.95)] sm:max-w-2xl sm:text-lg sm:leading-[1.35]">
              {copy.intro}
            </p>

            <div data-hero-item className="mt-auto grid w-full max-w-[23.5rem] grid-cols-2 justify-center gap-3 sm:flex sm:max-w-none sm:flex-row lg:mt-0">
              <Link
                href="#contacto"
                className="inline-flex min-h-14 items-center justify-center whitespace-nowrap bg-primary/60 px-2 py-3 text-[0.61rem] font-medium uppercase tracking-[0.1em] text-primary-foreground shadow-[0_10px_30px_rgba(46,42,36,0.14)] backdrop-blur-md transition-colors hover:bg-primary/72 sm:min-h-0 sm:px-8 sm:text-xs lg:border lg:border-primary lg:bg-primary lg:shadow-none lg:backdrop-blur-none lg:hover:bg-button-hover"
              >
                {copy.primaryCta}
              </Link>
              <Link
                href={localizePath("/posada", locale)}
                className="inline-flex min-h-14 items-center justify-center whitespace-nowrap bg-primary/60 px-2 py-3 text-[0.61rem] font-medium uppercase tracking-[0.1em] text-primary-foreground shadow-[0_10px_30px_rgba(46,42,36,0.14)] backdrop-blur-md transition-colors hover:bg-primary/72 sm:min-h-0 sm:px-8 sm:text-xs lg:border lg:border-card/55 lg:bg-card/10 lg:text-card lg:shadow-none lg:backdrop-blur-none lg:hover:bg-card/20"
              >
                {copy.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
