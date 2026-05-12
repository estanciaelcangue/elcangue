"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Estela",
    text: "En el medio del campo, somos super fans con mi familia y pasamos un fin de semana muy lindo, superaron nuestras expectativas. Atencion es divina. Habitaciones con todos los detalles de un hotel y la calidez de una casa. Desayunos exquisitos. El entorno es hermoso y super tranquilo. Un lugar para volver.",
    rating: 5,
  },
  {
    id: 2,
    name: "Maria",
    text: "Celebramos nuestra boda en El Cangue y fue simplemente magico. El equipo cuido cada detalle y nuestros invitados todavia hablan de lo especial que fue. Un lugar de ensueno.",
    rating: 5,
  },
  {
    id: 3,
    name: "Roberto",
    text: "Organize un retiro corporativo para mi equipo y superaron todas las expectativas. Las actividades de integracion, la comida y las instalaciones fueron impecables.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-16 bg-primary">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl sm:text-4xl text-background/90 mb-2 italic" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>
            Lo que dicen nuestros huespedes
          </h2>
        </div>

        {/* Testimonial Content */}
        <div className="text-center">
          <p className="text-background/80 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl mx-auto">
            {current.text}
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-4">
            {[...Array(current.rating)].map((_, i) => (
              <Star key={i} size={16} className="fill-coral text-coral" />
            ))}
          </div>

          {/* Name */}
          <p className="text-background/90 text-sm tracking-wide">
            — {current.name}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={goToPrevious}
            className="w-10 h-10 rounded-full border border-background/30 flex items-center justify-center hover:bg-background/10 transition-colors text-background/70"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  idx === currentIndex ? "bg-background" : "bg-background/30"
                }`}
                aria-label={`Ir a testimonio ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="w-10 h-10 rounded-full border border-background/30 flex items-center justify-center hover:bg-background/10 transition-colors text-background/70"
            aria-label="Siguiente testimonio"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
