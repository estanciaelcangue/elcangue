"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { defaultLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries"
import { localizePath } from "@/lib/i18n/navigation"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

const rooms = [
  {
    id: 1,
    name: "La Malacara",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "La Mora",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "La Tubiana",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "La Rosilla",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "La Gateada",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "La Zaina",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
  },
]

type AccommodationSectionProps = {
  dictionary?: Dictionary
  locale?: Locale
}

export function AccommodationSection({
  dictionary = getDictionary(defaultLocale),
  locale = defaultLocale,
}: AccommodationSectionProps) {
  const copy = dictionary.home.accommodation
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-room-card]")
      if (cards.length) {
        gsap.set(cards, { opacity: 0, y: 40 })
        ScrollTrigger.batch(cards, {
          start: "top 80%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
            }),
        })
      }

      const images = gsap.utils.toArray<HTMLElement>("[data-room-img]")
      images.forEach((img) => {
        gsap.to(img, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })
    },
    { scope: sectionRef },
  )

  return (
    <section ref={sectionRef} id="alojamiento" className="py-4 bg-background">
      <div className="mx-auto max-w-7xl px-0">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href={localizePath("/posada", locale)}
              data-room-card
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              <div data-room-img className="absolute inset-0 -top-[8%] -bottom-[8%]">
                <Image
                  src={room.image}
                  alt={`${copy.roomAlt} ${room.name}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-background tracking-wide uppercase">
                  {room.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
