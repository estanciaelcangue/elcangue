"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { ContactMessageForm } from "@/components/contact-message-form"
import { usePathname } from "next/navigation"
import { getLocaleFromPathnameOrDefault } from "@/lib/i18n/navigation"
import { editorialPageDictionaries } from "@/lib/i18n/editorial-pages"
import { getContactFormLabels } from "@/lib/i18n/public-pages"

export default function DestinationWeddingPage() {
  const [expandedIndex, setExpandedIndex] = useState(0)
  const locale = getLocaleFromPathnameOrDefault(usePathname())
  const copy = editorialPageDictionaries[locale].wedding

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
            <p className="section-eyebrow-light mb-6">
              — {copy.eyebrow} —
            </p>
            <p className="text-background/75 text-sm leading-[1.32] max-w-2xl mx-auto">
              {copy.intro}
            </p>
          </div>
        </section>

        {/* Video/Image Hero */}
        <section className="relative aspect-video max-h-[60vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop"
            alt="Boda en El Cangue"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-foreground/20" />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center hover:bg-background/50 transition-colors">
              <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-background border-b-8 border-b-transparent ml-1" />
            </button>
          </div>
        </section>

        {/* What We Offer Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Accordion */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-title mb-8 uppercase">
                  {copy.offerTitle}
                </h2>
                <div className="space-y-0">
                  {copy.offerings.map((item, index) => (
                    <div key={index} className="border-b border-border">
                      <button
                        onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                        className="w-full py-4 flex items-center justify-between text-left"
                      >
                        <span className={`text-sm ${expandedIndex === index ? "text-coral font-medium" : "text-foreground/70"}`}>
                          {item.title}
                        </span>
                        {expandedIndex === index ? (
                          <ChevronDown size={16} className="text-coral" />
                        ) : (
                          <ChevronRight size={16} className="text-foreground/40" />
                        )}
                      </button>
                      {expandedIndex === index && (
                        <div className="pb-4">
                          <p className="text-sm leading-[1.32] text-foreground/80">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop"
                  alt="Ceremonia de boda"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-card py-16">
          <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <p className="section-eyebrow mb-3">{copy.formEyebrow}</p>
              <h2 className="font-serif text-3xl uppercase text-title">{copy.formTitle}</h2>
              <p className="mt-5 text-sm leading-7 text-foreground/70">{copy.formText}</p>
            </div>
            <div className="border border-border bg-background p-6 sm:p-8">
              <ContactMessageForm
                origin="destination_wedding"
                locale={locale}
                defaultSubject={copy.subject}
                showPhone
                submitLabel={copy.submit}
                labels={getContactFormLabels(locale)}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
