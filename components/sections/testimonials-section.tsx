"use client"

import { useState } from "react"
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Reveal } from "@/components/animations/reveal"
import { defaultLocale } from "@/lib/i18n/config"
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries"

type TestimonialsSectionProps = {
  dictionary?: Dictionary
}

type GuestReview = {
  id: string
  name: string
  text: string
  rating: number
  source: "Google"
}

export function TestimonialsSection({
  dictionary = getDictionary(defaultLocale),
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const copy = dictionary.home.testimonials

  // Keep this adapter small so Google Reviews can replace the dictionary items later.
  const reviews: GuestReview[] = copy.items.map((item, index) => ({
    ...item,
    id: `guest-review-${index + 1}`,
    source: "Google",
  }))

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? reviews.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === reviews.length - 1 ? 0 : currentIndex + 1)
  }

  const current = reviews[currentIndex]

  return (
    <Reveal
      as="section"
      className="relative overflow-hidden bg-primary py-20 sm:py-24"
      stagger="[data-tst-item]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-background/25" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div data-tst-item className="mx-auto mb-9 max-w-3xl text-center sm:mb-12">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-background/20 bg-background/10 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-background/85 shadow-[0_18px_60px_rgba(25,35,18,0.16)] backdrop-blur-sm">
            <BadgeCheck className="size-3.5 text-coral" />
            <span>Reseñas verificadas de Google</span>
          </div>
          <h2 className="font-sans text-balance text-3xl font-light tracking-normal text-background sm:text-5xl">
            {copy.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-background/68 sm:text-base">
            Opiniones reales de quienes eligieron la calma del campo y la calidez de la estancia.
          </p>
        </div>

        <article
          data-tst-item
          aria-live="polite"
          className="relative mx-auto max-w-4xl overflow-hidden border border-background/18 bg-background/[0.09] px-5 py-6 text-background shadow-[0_30px_100px_rgba(28,39,18,0.26)] backdrop-blur-md sm:px-10 sm:py-10"
        >
          <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-background/45 to-transparent" />
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
            <div className="flex items-start justify-between sm:block">
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-background/20 bg-background/10 text-background/75 sm:size-14">
                <Quote className="size-5" />
              </span>
              <div className="flex items-center gap-1 rounded-full border border-background/15 bg-primary/25 px-3 py-1.5 sm:mt-7">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`size-3.5 ${
                      index < current.rating
                        ? "fill-coral text-coral"
                        : "fill-transparent text-background/25"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <blockquote className="max-w-3xl text-pretty font-sans text-base font-light leading-7 text-background/95 sm:text-xl sm:leading-8">
                "{current.text}"
              </blockquote>
              <footer className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-background/14 pt-5">
                <p className="text-sm font-semibold tracking-[0.08em] text-background">
                  {current.name}
                </p>
                <span className="h-1 w-1 rounded-full bg-background/35" />
                <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-background/62">
                  <BadgeCheck className="size-3.5" />
                  {current.source} review
                </p>
              </footer>
            </div>
          </div>
        </article>

        <div data-tst-item className="mt-7 flex items-center justify-center gap-3 sm:mt-9">
          <button
            onClick={goToPrevious}
            className="inline-flex size-11 items-center justify-center rounded-full border border-background/22 bg-background/[0.08] text-background/80 backdrop-blur-sm transition hover:border-background/35 hover:bg-background/15 hover:text-background"
            aria-label={copy.previous}
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex min-h-11 items-center gap-2 rounded-full border border-background/15 bg-background/[0.08] px-4 backdrop-blur-sm">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-7 bg-background"
                    : "w-1.5 bg-background/35 hover:bg-background/60"
                }`}
                aria-label={`${copy.goTo} ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="inline-flex size-11 items-center justify-center rounded-full border border-background/22 bg-background/[0.08] text-background/80 backdrop-blur-sm transition hover:border-background/35 hover:bg-background/15 hover:text-background"
            aria-label={copy.next}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </Reveal>
  )
}
