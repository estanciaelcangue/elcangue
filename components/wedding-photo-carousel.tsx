"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"

const photos = [
  {
    src: "/images/Destination Wedding 1 .webp",
    alt: {
      es: "Novios caminando por los jardines de El Cangüé",
      en: "Newlyweds walking through the gardens at El Cangüé",
      fr: "Jeunes mariés se promenant dans les jardins d’El Cangüé",
      pt: "Noivos caminhando pelos jardins do El Cangüé",
    },
  },
  {
    src: "/images/Destination Wedding 2.webp",
    alt: {
      es: "Espacio para celebraciones rodeado por los jardines",
      en: "Celebration venue surrounded by gardens",
      fr: "Lieu de célébration entouré de jardins",
      pt: "Espaço para celebrações cercado por jardins",
    },
  },
  {
    src: "/images/Destination Wedding 3.webp",
    alt: {
      es: "Pareja recién casada celebrando en El Cangüé",
      en: "Newly married couple celebrating at El Cangüé",
      fr: "Jeunes mariés célébrant leur union à El Cangüé",
      pt: "Casal recém-casado celebrando no El Cangüé",
    },
  },
] as const

const labels: Record<Locale, { carousel: string; previous: string; next: string }> = {
  es: { carousel: "Galería de bodas", previous: "Foto anterior", next: "Foto siguiente" },
  en: { carousel: "Wedding gallery", previous: "Previous photo", next: "Next photo" },
  fr: { carousel: "Galerie de mariage", previous: "Photo précédente", next: "Photo suivante" },
  pt: { carousel: "Galeria de casamentos", previous: "Foto anterior", next: "Próxima foto" },
}

type WeddingPhotoCarouselProps = {
  locale: Locale
}

export function WeddingPhotoCarousel({ locale }: WeddingPhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const copy = labels[locale]

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % photos.length)
    }, 3800)

    return () => window.clearInterval(timer)
  }, [isPaused])

  const showPrevious = () => {
    setActiveIndex((index) => (index === 0 ? photos.length - 1 : index - 1))
  }

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % photos.length)
  }

  const backPhoto = photos[(activeIndex + 1) % photos.length]
  const middlePhoto = photos[(activeIndex + 2) % photos.length]
  const activePhoto = photos[activeIndex]

  return (
    <section
      aria-label={copy.carousel}
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false)
      }}
      className="relative min-h-[30rem] overflow-hidden sm:min-h-[40rem] lg:min-h-[42rem]"
    >
      <div aria-hidden="true" className="absolute left-1/2 top-[45%] z-10 aspect-[3/4] w-[80%] max-w-[30rem] -translate-x-[43%] -translate-y-1/2 rotate-[7deg] bg-card p-1.5 opacity-65 shadow-[0_18px_45px_rgba(46,42,36,0.18)] sm:top-[46%] sm:w-[74%] sm:p-2">
        <div className="relative size-full overflow-hidden">
          <Image src={backPhoto.src} alt="" fill sizes="(min-width: 1024px) 38vw, 78vw" className="object-cover" />
        </div>
      </div>

      <div aria-hidden="true" className="absolute left-1/2 top-[45%] z-20 aspect-[3/4] w-[82%] max-w-[30rem] -translate-x-[57%] -translate-y-1/2 -rotate-[5deg] bg-card p-1.5 opacity-85 shadow-[0_20px_50px_rgba(46,42,36,0.2)] sm:top-[46%] sm:w-[76%] sm:p-2">
        <div className="relative size-full overflow-hidden">
          <Image src={middlePhoto.src} alt="" fill sizes="(min-width: 1024px) 38vw, 80vw" className="object-cover" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-4 pb-12 sm:px-12 sm:pb-14">
        <div key={activePhoto.src} className="wedding-photo-drop aspect-[3/4] w-[84%] max-w-[30rem] bg-card p-1.5 shadow-[0_24px_65px_rgba(46,42,36,0.3)] sm:w-[78%] sm:p-2">
          <div className="relative size-full overflow-hidden" aria-live="off">
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt[locale]}
              fill
              sizes="(min-width: 1024px) 40vw, 82vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-3 z-40 flex items-center justify-center gap-2.5 sm:bottom-6 sm:gap-3">
        <button
          type="button"
          onClick={showPrevious}
          aria-label={copy.previous}
          className="inline-flex size-11 items-center justify-center rounded-full border border-secondary/20 bg-card/90 text-title shadow-sm backdrop-blur-sm transition active:scale-95 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 sm:size-10"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex h-11 items-center gap-2 rounded-full border border-secondary/15 bg-card/90 px-4 shadow-sm backdrop-blur-sm sm:h-10">
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`${copy.carousel}: ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex ? "w-7 bg-primary" : "w-1.5 bg-secondary/30 hover:bg-secondary/55"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={showNext}
          aria-label={copy.next}
          className="inline-flex size-11 items-center justify-center rounded-full border border-secondary/20 bg-card/90 text-title shadow-sm backdrop-blur-sm transition active:scale-95 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 sm:size-10"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </section>
  )
}
