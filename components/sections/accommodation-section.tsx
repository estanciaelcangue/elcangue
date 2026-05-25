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
    image: "/images/LA%20MALACARA.webp",
  },
  {
    id: 2,
    name: "La Mora",
    image: "/images/LA%20MORA.webp",
  },
  {
    id: 3,
    name: "La Tubiana",
    image: "/images/LA%20TUBIANA.webp",
  },
  {
    id: 4,
    name: "La Rosilla",
    image: "/images/LA%20ROSILLA.webp",
  },
  {
    id: 5,
    name: "La Gateada",
    image: "/images/LA%20GATEADA.webp",
  },
  {
    id: 6,
    name: "La Zaina",
    image: "/images/LA%20ZAINA.webp",
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
    <section ref={sectionRef} id="alojamiento" className="bg-background pb-4 pt-12 lg:pt-16">
      <div className="mx-auto max-w-7xl px-0">
        <div className="mx-auto mb-10 max-w-2xl px-4 text-center sm:px-6 lg:mb-12 lg:px-8">
          <h2 className="section-eyebrow">
            {copy.title}
          </h2>
        </div>

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
