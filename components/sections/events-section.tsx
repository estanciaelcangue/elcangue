import Image from "next/image"
import Link from "next/link"
import { Heart, Building2, PartyPopper } from "lucide-react"

const events = [
  {
    id: 1,
    name: "Bodas",
    description: "Celebra tu amor en un escenario natural inolvidable. Organizamos cada detalle para que vivas el dia mas especial.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    features: ["Ceremonia al aire libre", "Salon para hasta 200 invitados", "Catering personalizado", "Alojamiento para novios"],
  },
  {
    id: 2,
    name: "Eventos Corporativos",
    description: "Un espacio unico para reuniones de trabajo, team building y retiros empresariales.",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2069&auto=format&fit=crop",
    features: ["Salas de reunion equipadas", "Actividades de integracion", "Servicio de catering", "Wifi de alta velocidad"],
  },
  {
    id: 3,
    name: "Celebraciones",
    description: "Cumpleanos, aniversarios y reuniones familiares en un entorno magico y exclusivo.",
    icon: PartyPopper,
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop",
    features: ["Espacios flexibles", "Menu personalizado", "Entretenimiento", "Decoracion tematica"],
  },
]

export function EventsSection() {
  return (
    <section id="eventos" className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Eventos
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-title mb-6 leading-tight">
            Momentos que perduran
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            Convierte tu evento en una experiencia extraordinaria. La belleza natural 
            de la estancia es el escenario perfecto para crear recuerdos inolvidables.
          </p>
        </div>

        {/* Events */}
        <div className="space-y-16">
          {events.map((event, index) => (
            <article
              key={event.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative aspect-[4/3] overflow-hidden rounded-sm ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={event.image}
                  alt={event.name}
                  fill
                  className="object-cover"
                />
                {/* Decorative corner */}
                <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-coral/60" />
                <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-coral/60" />
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <event.icon className="text-primary" size={24} />
                  </div>
                  <h3 className="font-serif text-3xl text-title">{event.name}</h3>
                </div>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  {event.description}
                </p>
                
                {/* Features */}
                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {event.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-foreground/70 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#contacto"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-button-hover transition-colors tracking-wide uppercase text-sm"
                >
                  Solicitar informacion
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
