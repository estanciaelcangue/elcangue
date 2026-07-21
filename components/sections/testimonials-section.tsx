"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { BadgeCheck, ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Reveal } from "@/components/animations/reveal"
import { defaultLocale, type Locale } from "@/lib/i18n/config"
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries"
import type { PlaceReview } from "@/app/api/reviews/route"

type TestimonialsSectionProps = {
  dictionary?: Dictionary
  locale?: Locale
}

type GuestReview = {
  id: string
  name: string
  text: string
  rating: number
  source: "Google" | "El Cangüé"
  avatar: string
  time?: number
}

const fallbackAvatars = [
  "/placeholder-user.jpg",
  "/placeholder-user.jpg",
  "/placeholder-user.jpg",
]

function mapPlaceReview(r: PlaceReview, index: number): GuestReview {
  return {
    id: `google-review-${r.time ?? index}`,
    name: r.author_name,
    text: r.text,
    rating: r.rating,
    source: "Google",
    avatar: r.profile_photo_url || fallbackAvatars[index % fallbackAvatars.length],
    time: r.time,
  }
}

export function TestimonialsSection({
  dictionary = getDictionary(defaultLocale),
  locale = defaultLocale,
}: TestimonialsSectionProps) {
  const copy = dictionary.home.testimonials
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [reviews, setReviews] = useState<GuestReview[]>(() =>
    copy.items.map((item, index) => ({
      ...item,
      id: `guest-review-${index + 1}`,
      source: "El Cangüé",
      avatar: fallbackAvatars[index] ?? fallbackAvatars[0],
    })),
  )
  const labels = {
    es: { verified: "Reseñas de huéspedes", intro: "Opiniones de quienes eligieron la calma del campo y la calidez de la estancia.", review: "reseña", stars: "estrellas" },
    en: { verified: "Guest reviews", intro: "Feedback from guests who chose the calm of the countryside and our warm hospitality.", review: "review", stars: "stars" },
    fr: { verified: "Avis des voyageurs", intro: "Les témoignages de celles et ceux qui ont choisi le calme de la campagne.", review: "avis", stars: "étoiles" },
    pt: { verified: "Avaliações de hóspedes", intro: "Opiniões de quem escolheu a tranquilidade do campo e nossa hospitalidade.", review: "avaliação", stars: "estrelas" },
  }[locale]

  // Override the editorial fallback only when Google returns usable reviews.
  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { reviews: PlaceReview[] } | null) => {
        if (!data?.reviews?.length) return
        // Only show reviews with text
        const live = data.reviews
          .filter((r) => r.text?.trim())
          .map(mapPlaceReview)
        if (live.length > 0) setReviews(live)
      })
      .catch(() => {
        // Keep fallback reviews on error
      })
  }, [])

  useEffect(() => {
    if (isPaused || reviews.length <= 1) return

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index === reviews.length - 1 ? 0 : index + 1))
    }, 6500)

    return () => window.clearInterval(timer)
  }, [isPaused, reviews.length])

  const goToPrevious = () => {
    setCurrentIndex((index) => (index === 0 ? reviews.length - 1 : index - 1))
  }

  const goToNext = () => {
    setCurrentIndex((index) => (index === reviews.length - 1 ? 0 : index + 1))
  }

  const current = reviews[currentIndex]

  if (!current) return null

  return (
    <Reveal
      as="section"
      className="relative overflow-hidden bg-primary py-14 sm:py-16"
      stagger="[data-tst-item]"
      y={24}
      duration={0.65}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-background/25" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div data-tst-item className="mx-auto mb-6 max-w-3xl text-center sm:mb-8">
          <div className="mb-4 inline-flex items-center gap-2 border border-background/20 bg-background/10 px-4 py-2 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-background/85 backdrop-blur-sm">
            <BadgeCheck className="size-3.5 text-coral" />
            <span>{labels.verified}</span>
          </div>
          <h2 className="font-serif text-3xl uppercase leading-tight text-background sm:text-4xl">
            {copy.heading}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-[1.32] text-background/75">
            {labels.intro}
          </p>
        </div>

        <article
          data-tst-item
          aria-live="polite"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="relative mx-auto min-h-[18rem] max-w-5xl overflow-hidden border border-background/18 bg-background/[0.08] px-5 py-5 text-background backdrop-blur-md sm:min-h-[16rem] sm:px-7 sm:py-6"
        >
          <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-background/45 to-transparent" />
          <div key={current.id} className="grid animate-in fade-in slide-in-from-bottom-2 duration-500 gap-5 md:grid-cols-[10.5rem_1fr] md:gap-7">
            <div className="flex items-center gap-3 border-b border-background/12 pb-4 md:block md:border-b-0 md:border-r md:pb-0 md:pr-6">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-background/28 bg-background/12 p-1 md:size-20">
                <div className="relative size-full overflow-hidden rounded-full bg-background">
                  <Image
                    src={current.avatar}
                    alt={`Foto de ${current.name}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              </div>

              <div className="min-w-0 md:mt-4">
                <p className="text-sm font-semibold leading-[1.32] text-background">
                  {current.name}
                </p>
                <p className="mt-1 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.12em] text-background/62">
                  <BadgeCheck className="size-3" />
                  {current.source} {labels.review}
                </p>
              </div>
            </div>

            <div className="flex min-h-[9rem] flex-col justify-center">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="inline-flex size-8 items-center justify-center border border-background/18 bg-background/10 text-background/70">
                  <Quote className="size-3.5" />
                </span>
                <div className="flex items-center gap-1 border border-background/10 bg-primary/25 px-2.5 py-1">
                  <span className="sr-only">{current.rating} {labels.stars}</span>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`size-2.5 ${
                        index < current.rating
                          ? "fill-coral text-coral"
                          : "fill-transparent text-background/25"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <blockquote className="max-w-3xl text-sm leading-[1.32] text-background/90">
                &ldquo;{current.text}&rdquo;
              </blockquote>
            </div>
          </div>
        </article>

        <div data-tst-item className="mt-5 flex items-center justify-center gap-3 sm:mt-6">
          <button
            onClick={goToPrevious}
            className="inline-flex size-9 items-center justify-center rounded-full border border-background/22 bg-background/[0.08] text-background/80 backdrop-blur-sm transition hover:border-background/35 hover:bg-background/15 hover:text-background"
            aria-label={copy.previous}
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex min-h-9 items-center gap-2 rounded-full border border-background/15 bg-background/[0.08] px-4 backdrop-blur-sm">
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
            className="inline-flex size-9 items-center justify-center rounded-full border border-background/22 bg-background/[0.08] text-background/80 backdrop-blur-sm transition hover:border-background/35 hover:bg-background/15 hover:text-background"
            aria-label={copy.next}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </Reveal>
  )
}
