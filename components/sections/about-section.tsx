import Image from "next/image"
import { Reveal } from "@/components/animations/reveal"
import { defaultLocale } from "@/lib/i18n/config"
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries"
import historyImage from "@/public/images/NUESTRA HISTORIA. ESTANCIA EL CANGUE PAYSANDU TURISMO.webp"

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
            <Image
              src={historyImage}
              alt={copy.imageAlt}
              className="mx-auto h-auto w-full max-w-sm lg:max-w-[36rem]"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-primary text-xs tracking-[0.25em] uppercase mb-4 font-medium text-center lg:text-left">
              {copy.eyebrow}
            </p>
            
            <div className="space-y-2.5 text-sm leading-[1.32] text-foreground/80">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
