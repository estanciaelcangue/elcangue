import Image from "next/image"
import { Leaf, UtensilsCrossed, Mountain, Waves, Flame, Binoculars } from "lucide-react"

const experiences = [
  {
    id: 1,
    name: "Cabalgatas",
    description: "Recorre los senderos de la estancia a caballo, guiado por nuestros expertos baqueanos.",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Gastronomia Rural",
    description: "Sabores autenticos del campo uruguayo, asados tradicionales y productos de nuestra huerta.",
    icon: UtensilsCrossed,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2187&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Pesca Deportiva",
    description: "Disfruta de la pesca en nuestro lago privado rodeado de naturaleza virgen.",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Fogones",
    description: "Noches estrelladas junto al fuego, guitarra criolla y relatos de campo.",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Avistamiento de Aves",
    description: "Mas de 100 especies de aves habitan en nuestros campos y bosques nativos.",
    icon: Binoculars,
    image: "https://images.unsplash.com/photo-1480044965905-02098d419e96?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "Huerta Organica",
    description: "Participa en la cosecha y conoce nuestra produccion agroecologica.",
    icon: Leaf,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2070&auto=format&fit=crop",
  },
]

export function ExperiencesSection() {
  return (
    <section id="experiencias" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Experiencias
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-title mb-6 leading-tight">
            Vive el campo uruguayo
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            Cada actividad esta disenada para conectarte con la esencia de nuestra tierra, 
            desde el amanecer cabalgando hasta las noches estrelladas junto al fogon.
          </p>
        </div>

        {/* Experiences Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-sm cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={exp.image}
                alt={exp.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                    <exp.icon className="text-primary-foreground" size={20} />
                  </div>
                  <h3 className="font-serif text-2xl text-background">{exp.name}</h3>
                </div>
                <p className="text-background/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  {exp.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
