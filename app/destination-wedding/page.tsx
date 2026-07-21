"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { ContactMessageForm } from "@/components/contact-message-form"
import { usePathname } from "next/navigation"
import { getLocaleFromPathnameOrDefault } from "@/lib/i18n/navigation"
import { editorialPageDictionaries } from "@/lib/i18n/editorial-pages"
import { getContactFormLabels } from "@/lib/i18n/public-pages"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { WeddingPhotoCarousel } from "@/components/wedding-photo-carousel"

export default function DestinationWeddingPage() {
  const locale = getLocaleFromPathnameOrDefault(usePathname())
  const copy = editorialPageDictionaries[locale].wedding
  const [openOffering, setOpenOffering] = useState("offering-0")

  return (
    <>
      <Header />
      <main className="destination-app overflow-x-clip lg:overflow-visible lg:pt-20">
        {/* Hero Section */}
        <section className="relative z-10 bg-primary py-14 sm:py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="mb-3 font-serif text-[2rem] leading-[1.05] text-background sm:mb-4 sm:text-4xl md:text-5xl">
              {copy.title}
            </h1>
            <p className="section-eyebrow-light mb-5 text-[0.78rem] leading-[1.45] tracking-[0.16em] sm:mb-6 md:whitespace-nowrap md:text-base md:tracking-[0.18em] lg:text-xl lg:tracking-[0.22em]">
              — {copy.eyebrow} —
            </p>
            <p className="mx-auto max-w-[21rem] text-[0.92rem] leading-[1.48] text-background/78 sm:max-w-2xl sm:text-sm sm:leading-[1.32]">
              {copy.intro}
            </p>
          </div>
        </section>

        {/* Wedding Hero */}
        <section className="relative z-20 mx-3 -mt-5 h-[46svh] min-h-[22rem] max-h-[36rem] overflow-hidden shadow-[0_18px_50px_rgba(46,42,36,0.2)] sm:mx-0 sm:mt-0 sm:h-[58svh] sm:min-h-[25rem] sm:max-h-[40rem] sm:shadow-none">
          <Image
            src="/images/PORTADA Destination Wedding1.webp"
            alt="Pareja recién casada celebrando en El Cangüé"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_46%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-transparent to-foreground/25" />
        </section>

        {/* What We Offer Section */}
        <section className="bg-background py-12 sm:py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-start gap-9 sm:gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
              {/* Accordion */}
              <div className="min-w-0">
                <h2 className="mb-5 font-serif text-2xl leading-tight text-title sm:mb-8 sm:text-3xl">
                  {copy.offerTitle}
                </h2>
                <Accordion
                  type="single"
                  collapsible
                  value={openOffering}
                  onValueChange={setOpenOffering}
                  className="w-full min-w-0 overflow-hidden border border-border/80 bg-card/65 px-3 shadow-[0_14px_40px_rgba(46,42,36,0.08)] sm:bg-card/35 sm:px-5 sm:shadow-none"
                >
                  {copy.offerings.map((item, index) => {
                    const value = `offering-${index}`

                    return (
                      <AccordionItem
                        key={item.title}
                        value={value}
                        onPointerEnter={(event) => {
                          if (event.pointerType === "mouse") setOpenOffering(value)
                        }}
                        className="min-w-0 overflow-hidden border-border/70 px-1 transition-colors duration-200 data-[state=open]:bg-background/55 sm:border-border/80 sm:data-[state=open]:bg-card/55 sm:px-3"
                      >
                        <AccordionTrigger className="min-h-16 py-3.5 text-foreground/75 hover:text-coral data-[state=open]:text-coral sm:min-h-0 sm:py-5">
                          <span className="min-w-0 flex-1 overflow-hidden pr-2">
                            <span className="block font-serif text-[1.02rem] leading-[1.25] text-current sm:text-lg sm:leading-6">
                              {item.title}
                            </span>
                            <span
                              aria-hidden="true"
                              className="mt-1 block max-w-full truncate text-xs font-normal leading-5 text-foreground/55 group-data-[state=open]:hidden sm:text-sm"
                            >
                              {item.description}…
                            </span>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="max-w-full break-words pb-5 pr-3 text-[0.92rem] leading-[1.45] text-foreground/70 sm:pb-6 sm:pr-16 sm:text-sm sm:leading-6">
                          {item.description}
                        </AccordionContent>
                      </AccordionItem>
                    )
                  })}
                </Accordion>
              </div>

              <WeddingPhotoCarousel locale={locale} />
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-primary py-12 text-background sm:py-16">
          <Image
            src="/images/FONDO DW - EL CANGUE.webp"
            alt=""
            fill
            sizes="100vw"
            className="z-0 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 z-[1] bg-primary/60" />

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <p className="section-eyebrow-light text-center text-[0.78rem] text-background/80 sm:text-[17px] lg:text-[22px]">El Cangüé</p>
            <h2 className="mx-auto mt-2 max-w-2xl text-center font-serif text-[1.8rem] leading-[1.08] text-background sm:mt-3 sm:text-4xl">{copy.processTitle}</h2>
            <div className="mt-7 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-px md:overflow-hidden md:border md:border-background/15 md:bg-background/15">
              {copy.processSteps.map((step, index) => (
                <article key={step.title} className="border border-background/15 bg-primary/72 p-5 shadow-[0_14px_34px_rgba(20,28,14,0.14)] backdrop-blur-md sm:p-7 md:border-0 md:p-9 md:shadow-none">
                  <span className="font-serif text-3xl text-background/60 sm:text-4xl">0{index + 1}</span>
                  <h3 className="mt-3 font-serif text-lg leading-[1.2] text-background/90 sm:mt-5 sm:text-xl">{step.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-[1.38] text-background/75 sm:mt-3 sm:text-sm sm:leading-[1.4]">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden border-t border-border bg-background py-12 sm:py-16">
          <Image
            src="/images/FONDO SECCION DE RESERVA. FONDO EL CANGUE .webp"
            alt=""
            fill
            sizes="100vw"
            className="z-0 object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 z-[1] bg-background/78" />

          <div className="relative z-10 mx-auto grid max-w-5xl gap-7 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div className="flex flex-col items-center justify-center text-center lg:items-start lg:pr-8 lg:text-left">
              <p className="section-eyebrow mb-2 text-[0.78rem] sm:mb-3 sm:text-[17px] lg:text-[22px]">{copy.formEyebrow}</p>
              <h2 className="font-serif text-[1.8rem] leading-[1.08] text-title sm:text-3xl">{copy.formTitle}</h2>
              <p className="mt-4 max-w-md text-[0.92rem] leading-[1.45] text-foreground/70 sm:mt-5 sm:text-sm sm:leading-[1.5]">{copy.formText}</p>
              <div aria-hidden="true" className="mt-5 flex items-center gap-3 sm:mt-7">
                <span className="h-px w-14 bg-primary/45" />
                <span className="size-1.5 rotate-45 border border-coral/70" />
                <span className="h-px w-8 bg-primary/25" />
              </div>
            </div>
            <div className="relative border border-primary/20 bg-background/82 p-5 shadow-[0_24px_70px_rgba(46,42,36,0.12)] backdrop-blur-md sm:p-8">
              <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-coral/75 to-transparent" />
              <ContactMessageForm
                origin="destination_wedding"
                locale={locale}
                defaultSubject={copy.subject}
                showPhone
                submitLabel={copy.submit}
                variant="wedding"
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
