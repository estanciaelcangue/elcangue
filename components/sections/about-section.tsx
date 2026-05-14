import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/animations/reveal"
import { defaultLocale } from "@/lib/i18n/config"
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries"

type AboutSectionProps = {
  dictionary?: Dictionary
}

export function AboutSection({
  dictionary = getDictionary(defaultLocale),
}: AboutSectionProps) {
  const copy = dictionary.home.about

  return (
    <Reveal as="section" id="nosotros" className="py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Vintage Photo */}
          <div className="relative">
            <div className="relative aspect-[3/4] max-w-sm mx-auto overflow-hidden border-8 border-card shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=2070&auto=format&fit=crop&sepia=50"
                alt={copy.imageAlt}
                fill
                className="object-cover grayscale sepia"
                style={{ filter: "sepia(40%) grayscale(30%)" }}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-primary text-xs tracking-[0.25em] uppercase mb-4 font-medium text-center lg:text-left">
              {copy.eyebrow}
            </p>
            
            <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="#alojamiento"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-foreground/30 text-foreground/80 font-medium text-xs tracking-[0.15em] uppercase hover:bg-foreground/5 transition-colors"
              >
                {copy.cta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
