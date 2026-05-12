import Link from "next/link"

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-[70vh] flex items-end justify-center overflow-hidden pt-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Estancia%20El%20Cang__.png-TfQ0T4Fu8k7rKzwXnmvt8mqrIali8g.jpeg')",
          backgroundPosition: "center 30%",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pb-16">
        <p className="text-foreground/70 text-xs tracking-[0.3em] uppercase mb-3 font-sans">
          Paysandu - Uruguay
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-title mb-6 leading-tight">
          VIVE LA EXPERIENCIA CANGUE
        </h1>
        <p className="text-foreground/80 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed px-4">
          Disfruta de la belleza del campo con el confort de la ciudad en el espiritu que nos guia al recibir a nuestros 
          huespedes. Apostamos por la intimidad y el sosiego, con pocas habitaciones que nos permiten brindar una 
          atencion calida y personalizada. Por que no deleitarse con el dolce far niente, copa de buen vino en mano, 
          mientras el sol se esconde sobre los paisajes privilegiados de El Cangue? O compartir el calor del fogon 
          con amigos, entre mates, un tradicional partido de truco y un asado bien criollo.
        </p>
        <Link
          href="#contacto"
          className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium text-xs tracking-[0.15em] uppercase hover:bg-button-hover transition-colors border border-primary"
        >
          Reservar Ahora
        </Link>
      </div>
    </section>
  )
}
