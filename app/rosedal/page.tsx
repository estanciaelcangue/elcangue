import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { getRequestLocale } from "@/lib/i18n/server"
import { localizePath } from "@/lib/i18n/navigation"
import { editorialPageDictionaries } from "@/lib/i18n/editorial-pages"

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

const rosedalImages = [
  "/images/ROSEDAL 1 EL CANGUE 2.webp",
  "/images/ROSEDAL 1 EL CANGUE 3.webp",
  "/images/ROSEDAL 1 EL CANGUE 4-1.webp",
  "/images/ROSEDAL 1 EL CANGUE 4.webp",
  "/images/ROSEDAL 1 EL CANGUE.webp",
  "/images/ROSEDAL 1.webp",
]

export default async function RosedalPage() {
  const locale = await getRequestLocale()
  const copy = editorialPageDictionaries[locale].rosedal

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-background mb-2 uppercase">
              {copy.title}
            </h1>
            <p className="section-eyebrow-light">
              — {copy.eyebrow} —
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
                  src={rosedalImages[0]}
                  alt="El Rosedal de El Cangue"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-2.5 text-sm leading-[1.32] text-foreground/80">
                <p>
                  {copy.intro[0]}
                </p>
                <p>
                  {copy.intro[1]}
                </p>
                <p>
                  {copy.intro[2]}
                </p>
                <ul className="list-inside list-disc space-y-1 text-foreground/70">
                  {copy.collection.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 500 Species Banner */}
        <section className="py-12 bg-primary">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="font-serif text-2xl sm:text-3xl text-background/90 uppercase tracking-[0.12em]">
              {copy.stat}
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
                  {copy.nurseryTitle}
                </h2>
                <div className="space-y-2.5 text-sm leading-[1.32] text-foreground/80">
                  <p>
                    {copy.nursery[0]}
                  </p>
                  <p>
                    {copy.nursery[1]}
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={rosedalImages[1]}
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
                  src={rosedalImages[2]}
                  alt="Blend de te Abuela Anita"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="lg:order-2">
                <h2 className="font-serif text-2xl sm:text-3xl text-title mb-6 uppercase">
                  {copy.teaTitle}
                </h2>
                <p className="text-sm leading-[1.32] text-foreground/80">
                  {copy.teaText}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* New Histories Banner */}
        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="font-serif text-2xl sm:text-3xl text-background/90 uppercase tracking-[0.12em]">
              {copy.stories}
            </p>
          </div>
        </section>

        {/* Our Roses Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl sm:text-3xl text-title mb-2 uppercase">
                {copy.rosesTitle}
              </h2>
              <p className="section-eyebrow-muted">
                — {copy.rosesEyebrow} —
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {roseVarieties.map((rose, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                    <Image
                      src={rosedalImages[index + 3] ?? rosedalImages[0]}
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
                    <p className="text-xs leading-[1.32] text-foreground/70">
                      {copy.roseDescriptions[index] ?? rose.description}
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
                <p className="section-eyebrow-light mb-2">
                  {copy.available}
                </p>
                <h3 className="font-serif text-xl sm:text-2xl text-background uppercase">
                  {copy.ctaTitle}
                </h3>
              </div>
              <Link
                href={localizePath("/contacto", locale)}
                className="inline-flex items-center justify-center px-6 py-3 border border-background/50 text-background font-medium text-xs tracking-[0.15em] uppercase hover:bg-background/10 transition-colors"
              >
                {copy.contact}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
