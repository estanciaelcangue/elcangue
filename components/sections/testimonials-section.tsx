"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Reveal } from "@/components/animations/reveal"
import { defaultLocale } from "@/lib/i18n/config"
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries"

type TestimonialsSectionProps = {
  dictionary?: Dictionary
}

export function TestimonialsSection({
  dictionary = getDictionary(defaultLocale),
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const copy = dictionary.home.testimonials
  const testimonials = copy.items

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
  }

  const current = testimonials[currentIndex]

  return (
    <Reveal as="section" className="py-16 bg-primary" stagger="[data-tst-item]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div data-tst-item className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-background/90 mb-2 italic" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>
            {copy.heading}
          </h2>
        </div>

        {/* Testimonial Content */}
        <div data-tst-item className="text-center">
          <p className="text-background/80 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl mx-auto">
            {current.text}
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={16} className="fill-coral text-coral" />
            ))}
          </div>

          {/* Name */}
          <p className="text-background/90 text-sm tracking-wide">
            — {current.name}
          </p>
        </div>

        {/* Navigation */}
        <div data-tst-item className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={goToPrevious}
            className="w-10 h-10 rounded-full border border-background/30 flex items-center justify-center hover:bg-background/10 transition-colors text-background/70"
            aria-label={copy.previous}
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex ? "bg-background" : "bg-background/30"
                }`}
                aria-label={`${copy.goTo} ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="w-10 h-10 rounded-full border border-background/30 flex items-center justify-center hover:bg-background/10 transition-colors text-background/70"
            aria-label={copy.next}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </Reveal>
  )
}
