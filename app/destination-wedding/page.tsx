"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

const offerings = [
  {
    title: "Un entorno natural incomparable",
    description: "Celebra tu boda en plena tranquilidad rural, con vistas abiertas y paisajes que invitan a desconectar del mundo.",
    expanded: true,
  },
  { title: "Temporada ideal para bodas", description: "Los meses de primavera y otono ofrecen el clima perfecto para celebraciones al aire libre.", expanded: false },
  { title: "Fechas mas solicitadas", description: "Te ayudamos a elegir la fecha ideal segun disponibilidad y condiciones climaticas optimas.", expanded: false },
  { title: "Ceremonias al atardecer", description: "El momento magico donde el sol se pone sobre el campo uruguayo, creando un escenario unico.", expanded: false },
  { title: "Suite nupcial & alojamiento boutique", description: "Habitaciones exclusivas para los novios y opciones de hospedaje para invitados.", expanded: false },
  { title: "Facil acceso para tus invitados", description: "Ubicacion estrategica con buenas rutas de acceso y senalizacion clara.", expanded: false },
  { title: "Gastronomia local que enamora", description: "Menu personalizado con productos frescos de la region y opciones para todos los gustos.", expanded: false },
  { title: "Organizacion integral del evento", description: "Nuestro equipo se encarga de cada detalle para que disfrutes sin preocupaciones.", expanded: false },
]

export default function DestinationWeddingPage() {
  const [expandedIndex, setExpandedIndex] = useState(0)

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-background mb-4 uppercase">
              Destination Wedding
            </h1>
            <p className="text-background/60 text-xs tracking-[0.2em] uppercase mb-6">
              — Una boda boutique en el corazon del campo uruguayo —
            </p>
            <p className="text-background/70 text-sm leading-relaxed max-w-2xl mx-auto">
              En El Cangue te ofrecemos una experiencia unica para celebrar tu boda destino en una autentica estancia uruguaya. Rodeados de naturaleza, sin 
              contaminacion sonora ni luminica, aqui el horizonte se funde con el cielo y cada detalle esta pensado para hacer de tu gran dia un recuerdo 
              inolvidable.
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
                  Que ofrecemos?
                </h2>
                <div className="space-y-0">
                  {offerings.map((item, index) => (
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
                          <p className="text-foreground/60 text-sm leading-relaxed">
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
      </main>
      <Footer />
    </>
  )
}
