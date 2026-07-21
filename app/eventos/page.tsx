import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { getRequestLocale } from "@/lib/i18n/server"
import { localizePath } from "@/lib/i18n/navigation"
import { googleMapsEmbedSrc } from "@/lib/location"
import { ContactMessageForm } from "@/components/contact-message-form"
import { editorialPageDictionaries } from "@/lib/i18n/editorial-pages"
import { getContactFormLabels } from "@/lib/i18n/public-pages"

export default async function EventosPage() {
  const locale = await getRequestLocale()
  const copy = editorialPageDictionaries[locale].events

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-background mb-4 uppercase">
              {copy.title}
            </h1>
          </div>
        </section>

        {/* Celebraciones Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-4xl sm:text-5xl text-title mb-6 italic" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>
              {copy.celebrations}
            </h2>
            <p className="text-foreground/80 text-sm leading-[1.32] mb-4">
              {copy.celebrationParagraphs[0]}
            </p>
            <p className="text-foreground/80 text-sm leading-[1.32] mb-4">
              {copy.celebrationParagraphs[1]}
            </p>
            <p className="text-foreground/80 text-sm leading-[1.32]">
              {copy.celebrationParagraphs[2]}
            </p>
          </div>
        </section>

        {/* Event Decoration Section */}
        <section className="bg-background">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
                alt="Decoracion de eventos en El Cangue"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="flex items-center bg-background p-8 lg:p-12">
              <div>
                <p className="section-eyebrow mb-2">
                  {copy.floralEyebrow}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl text-title mb-4 uppercase">
                  {copy.floralTitle}
                </h3>
                <p className="text-foreground/80 text-sm leading-[1.32] mb-6">
                  {copy.floralText}
                </p>
                <Link
                  href={localizePath("/contacto", locale)}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-coral text-background font-medium text-xs tracking-[0.15em] uppercase hover:bg-coral/90 transition-colors"
                >
                  {copy.contact}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Corporate Events Section */}
        <section className="bg-background">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content */}
            <div className="flex items-center bg-background p-8 lg:p-12 order-2 lg:order-1">
              <div>
                <p className="section-eyebrow mb-2">
                  {copy.corporateEyebrow}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl text-title mb-4 uppercase">
                  {copy.corporateTitle}
                </h3>
                <p className="text-foreground/80 text-sm leading-[1.32] mb-4">
                  {copy.corporateParagraphs[0]}
                </p>
                <p className="text-foreground/80 text-sm leading-[1.32] mb-6">
                  {copy.corporateParagraphs[1]}
                </p>
                <Link
                  href={localizePath("/contacto", locale)}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-coral text-background font-medium text-xs tracking-[0.15em] uppercase hover:bg-coral/90 transition-colors"
                >
                  {copy.contact}
                </Link>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto order-1 lg:order-2">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
                alt="Eventos empresariales"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h3 className="section-eyebrow-muted mb-6 border-t border-border pt-6">
                  {copy.contact}
                </h3>
                <div className="space-y-3 text-sm leading-[1.32] text-foreground/80">
                  <p>Ruta 3 km 358,5, Paysandú, Uruguay</p>
                  <p>+598 99 726 883</p>
                  <p>eventos@estanciaelcangue.com.uy</p>
                </div>
                
                <h3 className="section-eyebrow-muted mt-8 mb-4 border-t border-border pt-6">
                  {copy.findUs}
                </h3>
                <div className="aspect-video w-full bg-accent/30 rounded-sm overflow-hidden">
                  <iframe
                    src={googleMapsEmbedSrc}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Ubicacion"
                  />
                </div>
              </div>

              {/* Form */}
              <div className="border border-border p-6">
                <h3 className="section-eyebrow-muted mb-6 text-center">
                  {copy.formTitle}
                </h3>
                <ContactMessageForm
                  origin="events"
                  locale={locale}
                  subjectLabel={copy.eventType}
                  subjectPlaceholder={copy.eventPlaceholder}
                  showPhone
                  submitLabel={copy.submit}
                  labels={{ ...getContactFormLabels(locale), subject: copy.eventType }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
