import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"

const roseVarieties = [
  {
    name: "Dona Anita del Cangue",
    description: "Obtentora de El Cangue. Rosales trepadoras, semi-vigorosas con encanto romantico. Rosas delicadas grandes, abundante fragancia y follaje.",
  },
  {
    name: "Poli del Cangue",
    description: "Obtentora de El Cangue. Rosales. Posee un perfume a rosas unica verdadera. Flores en primavera y fechas.",
  },
  {
    name: "Josefina del Cangue",
    description: "Hibrido criollo de gran porte. Con el talamo florar con la fraicheurencia de nuestras favoritas. Rosai, gran afilice.",
  },
  {
    name: "Ernestina del Cangue",
    description: "Obtentora de El Cangue. Perfecto vigoros con floralio en el otoño con grau produtcion. Rotas grandes y florea morgas color. Suav y potente fragrancia.",
  },
]

export default function RosedalPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-background mb-2 uppercase">
              Nuestro Rosedal
            </h1>
            <p className="text-background/60 text-xs tracking-[0.2em] uppercase">
              — El alma viva de El Cangue —
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Image Carousel */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2070&auto=format&fit=crop"
                  alt="El Rosedal de El Cangue"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-6 text-foreground/70 text-sm leading-relaxed">
                <p>
                  El jardin de la Estancia es nuestra &quot;via lactea&quot;. Esta en constante evolucion, 
                  muta, se reinventa con las estaciones, lo que sin duda lo hace fascinante. Es un 
                  jardin amado, lleno de rincones hermosos por descubrir.
                </p>
                <p>
                  El &quot;Rosedal de la Abuela Anita&quot; es el corazon del parque, estelar entre 
                  exiguas medidas de rosas y es el lugar preferido para celebrar bodas, tomar el 
                  te o el aperitivo matutino cuando el otoño ofrece esplendorosas en 
                  profusion.
                </p>
                <p>
                  Nuestra abuela Anita fue en nuestro jardinero y de ella heredar la pasion por 
                  las rosas. Los ejemplares que capturaron mi atencion por lo primitivo eran, 
                  tallos sin planifacar por ella en la Estancia y habian sobrevivido hasta la 
                  lengua de los anos 90. En aquel momento, como yo por este, era clara la 
                  idea de rescatar su trabajo, un que habia llevado como &quot;lilas&quot; de rosales y 
                  que las rosas estaban, salvo una en nuestro. Me estado y la absed con y 
                  nosotros, en algun momento algunos trasplantes con rosales y aun hoy los fue 
                  los.
                </p>
                <p>
                  Anos de estudio, de visitar rosedales, de cultivar a prueba y error, de 
                  multiplicar estolos, de crear variedades nuevas de semilla, clones frutu y sobre 
                  eso ya pensando. Prospeccin, clasificacion y conservacion de rosedales de 
                  Rosas Antiguas en peligro de desaparecer. &quot;AMIGOS DE LAS ROSAS 
                  ANTIGUAS&quot;.
                </p>
                <p>
                  Hoy El Cangue alberga una coleccion de mas de 100 variedades de rosas, de 
                  las cuales mas de 120 corresponden a germoplasma de rosa antiguo. 
                  Figuran en esta coleccion:
                </p>
                <ul className="list-disc list-inside space-y-1 text-foreground/60">
                  <li>Te</li>
                  <li>Noisette</li>
                  <li>Polyantha</li>
                  <li>Portland</li>
                  <li>Hibridos de R. multiflora, chinensis, antiguos, gallicas, muscilasis, rugosa, multiflora, gigantea, alba, sempervirens, moschata, banksla, bruvonii, laebigergana</li>
                  <li>Hibridos perpetuos</li>
                  <li>Primermnas</li>
                </ul>
                <p className="text-foreground/50 italic">Y muchas mas...</p>
              </div>
            </div>
          </div>
        </section>

        {/* 500 Species Banner */}
        <section className="py-12 bg-primary">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="font-serif text-3xl sm:text-4xl text-background/90 italic" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>
              mas de 500 especies desde 1450
            </p>
          </div>
        </section>

        {/* Nursery Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl text-title mb-6 uppercase">
                  Nuestro Vivero
                </h2>
                <div className="space-y-4 text-foreground/70 text-sm leading-relaxed">
                  <p>
                    En nuestra estancia funciona un vivero orientado principalmente a la 
                    reproduccion de rosales y plantas acompanantes: herbaceas perennes, 
                    bulbosas y anuales. Los objetivos e iniciativas apuntan integramente al 
                    mantenimiento y expansion de la coleccion.
                  </p>
                  <p>
                    Nos encanta recibir, con agenda previa, a aficionados, clubes de jardineria 
                    y grupos de rosalitas. Ofrecemos visitas guiadas al rosedal, espacios para 
                    el intercambio de plantas y aromas del mundo en una experiencia de te 
                    donde podras probar nuestro exclusivo blend &quot;Abuela Anita&quot;, acompanado 
                    de pasteleria casera.
                  </p>
                  <p>
                    Cada octubre, participamos en la Exposicion Rural de Paysandu, donde 
                    nos encontraras con nuestro stand de rosales, herbaceas y accesorios 
                    seleccionados para los amantes del jardin.
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2032&auto=format&fit=crop"
                  alt="Nuestro vivero"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tea Blend Section */}
        <section className="py-16 bg-card">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative aspect-square overflow-hidden lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2021&auto=format&fit=crop"
                  alt="Blend de te Abuela Anita"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="lg:order-2">
                <h2 className="font-serif text-2xl sm:text-3xl text-title mb-6 uppercase">
                  Nuestro Blend de Te<br />&quot;Abuela Anita&quot;
                </h2>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Uno de nuestros orgullos mas queridos. El blend Rosa como alma a los 
                  petalos de rosa, pero en un equilibrio mas rico alon de pruebas, elegimos un 
                  total de de 1492, con interes en Uruguay fue incorporado en cona 
                  resultado en el te perfecto, finaly profundamente aromatica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Histories Banner */}
        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="font-serif text-3xl sm:text-4xl text-background/90 italic" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>
              donde nacen nuevas historias
            </p>
          </div>
        </section>

        {/* Our Roses Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl text-title mb-2 uppercase">
                Nuestras Rosas
              </h2>
              <p className="text-foreground/50 text-xs tracking-[0.2em] uppercase">
                — Variedades creadas en El Cangue —
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {roseVarieties.map((rose, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                    <Image
                      src={`https://images.unsplash.com/photo-${index % 2 === 0 ? "1518882605630-8e5e0e21db8e" : "1455659817273-f96807779a8a"}?q=80&w=200&auto=format&fit=crop`}
                      alt={rose.name}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm text-title mb-1 uppercase">
                      {rose.name}
                    </h3>
                    <p className="text-foreground/60 text-xs leading-relaxed">
                      {rose.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-12 bg-primary">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-background/60 text-xs tracking-[0.2em] uppercase mb-2">
                  Disponibles desde Septiembre 2024
                </p>
                <h3 className="font-serif text-xl sm:text-2xl text-background uppercase">
                  Queres llevar una<br />parte de El Cangue a tu<br />jardin?
                </h3>
              </div>
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center px-6 py-3 border border-background/50 text-background font-medium text-xs tracking-[0.15em] uppercase hover:bg-background/10 transition-colors"
              >
                Contactar
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
