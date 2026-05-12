import Image from "next/image"
import Link from "next/link"

export function AboutSection() {
  return (
    <section id="nosotros" className="py-20 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Vintage Photo */}
          <div className="relative">
            <div className="relative aspect-[3/4] max-w-sm mx-auto overflow-hidden border-8 border-card shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1509927083803-4bd519298ac4?q=80&w=2070&auto=format&fit=crop&sepia=50"
                alt="Foto historica de la familia fundadora"
                fill
                className="object-cover grayscale sepia"
                style={{ filter: "sepia(40%) grayscale(30%)" }}
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-primary text-xs tracking-[0.25em] uppercase mb-4 font-medium text-center lg:text-left">
              Nuestra Historia
            </p>
            
            <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
              <p>
                La historia de la Estancia El Cangue es una historia de supervivencia y de 
                amor profundo por nuestra raices, sobrevivencia al paso del tiempo, nunca 
                tan cierto aquello de que &quot;las nuevas del tiempo plasaran su mies&quot;. Por aca 
                discurrieron tantos anos de vida, estas viejas paredes y campos han sido 
                testigo de todos los acontecimientos importantes de la vida, matrimonios, 
                nacimientos, cumpleanos... pero tambien tristes partidas.
              </p>
              <p>
                Cuantas historias de vida llenan sus memorias como algo vivo, tangible, que 
                constituyen quizas, el espiritu de la Estancia que nos envuelve como un manto 
                apenas entrar. Una &quot;casa con alma&quot;. Y amor profundo que se vuelve eterno 
                cuando se transmite de padres a hijos, por la tierra y la naturaleza que nos 
                rodea.
              </p>
              <p>
                Para nuestra familia, nuestra historia de amor con la estancia comenzo por 
                alla por el 1920, cuando Pablo, un inmigrante de padre aleman y madre 
                belga, se conocio y se enamoro de su vecina de balcon en el barrio de 
                Caballito en Buenos Aires. Anita, una inmigrante polaca, salvada por su 
                madrina de la disolucion de la Polonia de posguerra.
              </p>
              <p>
                De esta vecindad fortuita nacio una boda y de alli una familia que llego a 
                Uruguay por los anos 20 en busca de nuevos horizontes y establecer raices. 
                Asi comenzo nuestra historia en El Cangue.
              </p>
            </div>

            <div className="mt-8">
              <Link
                href="#alojamiento"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-foreground/30 text-foreground/80 font-medium text-xs tracking-[0.15em] uppercase hover:bg-foreground/5 transition-colors"
              >
                Reservar Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
