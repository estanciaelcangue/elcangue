import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

export default function EventosPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-background mb-4 uppercase">
              Eventos en El Cangue
            </h1>
          </div>
        </section>

        {/* Celebraciones Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="font-serif text-4xl sm:text-5xl text-title mb-6 italic" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>
              Celebraciones
            </h2>
            <p className="text-foreground/70 text-sm leading-relaxed mb-4">
              Bodas, cumpleanos, aniversarios, encuentros, egresados... todo se celebra en El Cangue! Desde 
              reuniones intimas hasta eventos para 400 personas. Cada propuesta es personalizada.
            </p>
            <p className="text-foreground/70 text-sm leading-relaxed mb-4">
              Ofrecemos entrevistas en la Estancia para evaluar opciones y definir el servicio. Nuestro equipo puede 
              encargarse de toda la planificacion, de principio a fin. Contamos con un grupo de proveedores profesionales 
              y confiables.
            </p>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Nuestra especialidad son las <strong>bodas</strong>. El Rosedal y nuestra estructura transparente de 400 m2, completamente 
              inmersa en el jardin, crean un entorno magico bajo el cielo estrellado.
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
                <p className="text-coral text-xs tracking-[0.2em] uppercase mb-2 italic">
                  Decoracion floral
                </p>
                <h3 className="font-serif text-xl sm:text-2xl text-title mb-4 uppercase">
                  Decoracion de Eventos
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                  Uno de los puntos destacados de nuestra propuesta. Ser floristas y 
                  cultivar nuestras propias flores nos permite que <strong>cada boda sea 
                  unica</strong>. Nos motiva la reaccion de los invitados ante la belleza de los 
                  arreglos florales. Eso es para nosotros, un trabajo bien hecho.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-coral text-background font-medium text-xs tracking-[0.15em] uppercase hover:bg-coral/90 transition-colors"
                >
                  Contactar
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
                <p className="text-coral text-xs tracking-[0.2em] uppercase mb-2 italic">
                  Para empresas
                </p>
                <h3 className="font-serif text-xl sm:text-2xl text-title mb-4 uppercase">
                  Eventos Empresariales
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                  Empresas de distintos rubros, desde el sector forestal hasta 
                  aseguradoras, eligen El Cangue para sus encuentros corporativos. 
                  Nuestro entorno natural, libre de ruidos y con un servicio cuidado, 
                  favorece el foco, la creatividad y el bienestar.
                </p>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                  Ofrecemos un servicio completamente personalizado, 
                  adaptandonos a las necesidades de cada cliente: equipamiento, 
                  gastronomia, alojamiento, entretenimiento y espacios de trabajo.
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-coral text-background font-medium text-xs tracking-[0.15em] uppercase hover:bg-coral/90 transition-colors"
                >
                  Contactar
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
                <h3 className="text-xs tracking-[0.2em] uppercase text-foreground/60 mb-6 border-t border-border pt-6">
                  Contactanos
                </h3>
                <div className="space-y-3 text-sm text-foreground/70">
                  <p>Paysandu, Departamento de Paysandu, Uruguay</p>
                  <p>+598 99 726 883</p>
                  <p>eventos@estanciaelcangue.com.uy</p>
                </div>
                
                <h3 className="text-xs tracking-[0.2em] uppercase text-foreground/60 mt-8 mb-4 border-t border-border pt-6">
                  Encontranos
                </h3>
                <div className="aspect-video w-full bg-accent/30 rounded-sm overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378.5!2d-58.0!3d-32.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDE4JzAwLjAiUyA1OMKwMDAnMDAuMCJX!5e0!3m2!1ses!2suy!4v1600000000000!5m2!1ses!2suy"
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
                <h3 className="text-xs tracking-[0.2em] uppercase text-foreground/60 mb-6 text-center">
                  Organiza tu Evento en la Estancia
                </h3>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <input
                    type="email"
                    placeholder="Correo"
                    className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <input
                    type="text"
                    placeholder="Tipo de evento"
                    className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <textarea
                    placeholder="Mensaje"
                    rows={4}
                    className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                  />
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-coral text-background font-medium text-xs tracking-[0.15em] uppercase hover:bg-coral/90 transition-colors"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
