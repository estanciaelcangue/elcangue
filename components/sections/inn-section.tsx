import Image from "next/image"
import { Reveal } from "@/components/animations/reveal"
import { defaultLocale } from "@/lib/i18n/config"
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionaries"
import innImage from "@/public/images/ESTANCIA EL CANGUE _ POSADA 1.webp"

type InnSectionProps = {
  dictionary?: Dictionary
}

export function InnSection({
  dictionary = getDictionary(defaultLocale),
}: InnSectionProps) {
  const copy = dictionary.home.posada

  return (
    <Reveal as="section" id="la-posada" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="section-eyebrow mb-4 text-center lg:text-left">
              {copy.title}
            </h2>

            <div className="space-y-2.5 text-sm leading-[1.32] text-foreground/80">
              {copy.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 border-t border-border/70 pt-4 text-xs leading-[1.45] text-foreground/70 sm:grid-cols-2">
              {copy.highlights.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          <div className="relative">
            <Image
              src={innImage}
              alt={copy.imageAlt}
              className="mx-auto h-auto w-full max-w-sm lg:max-w-md"
              sizes="(min-width: 1024px) 448px, 100vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </Reveal>
  )
}
