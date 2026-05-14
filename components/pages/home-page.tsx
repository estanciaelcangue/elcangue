import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { AccommodationSection } from "@/components/sections/accommodation-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"
import { type Locale } from "@/lib/i18n/config"
import { type Dictionary } from "@/lib/i18n/dictionaries"

type HomePageContentProps = {
  dictionary: Dictionary
  locale: Locale
}

export function HomePageContent({ dictionary, locale }: HomePageContentProps) {
  return (
    <>
      <Header />
      <main>
        <HeroSection dictionary={dictionary} locale={locale} />
        <AboutSection dictionary={dictionary} />
        <AccommodationSection dictionary={dictionary} locale={locale} />
        <TestimonialsSection dictionary={dictionary} />
        <ContactSection dictionary={dictionary} />
      </main>
      <Footer />
    </>
  )
}
