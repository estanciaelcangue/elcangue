"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop",
    alt: "Campo uruguayo al atardecer",
    category: "paisajes",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    alt: "Suite principal",
    category: "alojamiento",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=2071&auto=format&fit=crop",
    alt: "Cabalgata por la estancia",
    category: "experiencias",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    alt: "Boda al aire libre",
    category: "eventos",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop",
    alt: "Vista panoramica",
    category: "paisajes",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2187&auto=format&fit=crop",
    alt: "Asado tradicional",
    category: "gastronomia",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
    alt: "Habitacion acogedora",
    category: "alojamiento",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?q=80&w=2070&auto=format&fit=crop",
    alt: "Fogon nocturno",
    category: "experiencias",
  },
]

const categories = ["todos", "paisajes", "alojamiento", "experiencias", "eventos", "gastronomia"]

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredImages = selectedCategory === "todos"
    ? galleryImages
    : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  
  const goToPrevious = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1)
    }
  }
  
  const goToNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1)
    }
  }

  return (
    <section id="galeria" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-primary text-sm tracking-[0.2em] uppercase mb-4 font-medium">
            Galeria
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-title mb-6 leading-tight">
            Imagenes que inspiran
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            Cada fotografia captura la esencia de Estancia El Cangue: 
            su naturaleza, tradicion y la calidez que nos define.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors capitalize ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground/70 hover:bg-accent border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <button
              key={image.id}
              onClick={() => openLightbox(index)}
              className="relative aspect-square overflow-hidden rounded-sm group cursor-pointer"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-background opacity-0 group-hover:opacity-100 transition-opacity font-medium text-sm">
                  Ver imagen
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxIndex !== null && (
          <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-background/70 hover:text-background p-2"
              aria-label="Cerrar"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={goToPrevious}
              className="absolute left-4 text-background/70 hover:text-background p-2"
              aria-label="Anterior"
            >
              <ChevronLeft size={40} />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 text-background/70 hover:text-background p-2"
              aria-label="Siguiente"
            >
              <ChevronRight size={40} />
            </button>

            <div className="relative w-full max-w-4xl aspect-[4/3] mx-4">
              <Image
                src={filteredImages[lightboxIndex].src}
                alt={filteredImages[lightboxIndex].alt}
                fill
                className="object-contain"
              />
            </div>
            
            <p className="absolute bottom-8 text-background/70 text-sm">
              {filteredImages[lightboxIndex].alt}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
