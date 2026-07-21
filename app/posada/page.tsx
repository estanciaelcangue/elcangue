import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Bed, Snowflake, Wifi, Bath, Coffee, Check, Heart } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { ReservationForm } from "@/components/sections/reservation-form"
import { getRequestLocale } from "@/lib/i18n/server"
import { publicPageDictionaries } from "@/lib/i18n/public-pages"
import type { Locale } from "@/lib/i18n/config"

export const revalidate = 60

export type RoomForForm = {
  id: string
  name: string
  slug: string
  image: string
  bed_configs: string[]
}

type Room = RoomForForm & {
  description: string
  amenities: string[]
  max_guests: number
  sort_order: number
}

async function getRooms(): Promise<Room[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("rooms")
    .select("id, name, slug, description, image, amenities, bed_configs, max_guests, sort_order")
    .eq("is_active", true)
    .order("sort_order")

  if (error || !data) return []
  return data as Room[]
}

function AmenityIcon({ amenity }: { amenity: string }) {
  const lower = amenity.toLowerCase()
  if (lower.includes("cama")) return <Bed size={14} />
  if (lower.includes("aire") || lower.includes("calefaccion")) return <Snowflake size={14} />
  if (lower.includes("wifi")) return <Wifi size={14} />
  if (lower.includes("bano") || lower.includes("baño") || lower.includes("hidromasaje") || lower.includes("ducha")) return <Bath size={14} />
  if (lower.includes("desayuno") || lower.includes("frigobar")) return <Coffee size={14} />
  return <Check size={14} />
}

const amenityTranslations: Record<Exclude<Locale, "es">, Record<string, string>> = {
  en: { "Televisión": "Television", "Aire acondicionado": "Air conditioning", "Frigobar": "Minibar", "Wifi": "Wi-Fi", "Piso de madera": "Wooden floor", "Cama King size": "King-size bed", "Cama Queen size": "Queen-size bed", "Kitchenette": "Kitchenette", "Placar empotrado": "Built-in wardrobe" },
  fr: { "Televisión": "Télévision", "Aire acondicionado": "Climatisation", "Frigobar": "Mini-bar", "Wifi": "Wi-Fi", "Piso de madera": "Parquet", "Cama King size": "Lit king-size", "Cama Queen size": "Lit queen-size", "Kitchenette": "Kitchenette", "Placar empotrado": "Armoire intégrée" },
  pt: { "Televisión": "Televisão", "Aire acondicionado": "Ar-condicionado", "Frigobar": "Frigobar", "Wifi": "Wi-Fi", "Piso de madera": "Piso de madeira", "Cama King size": "Cama king-size", "Cama Queen size": "Cama queen-size", "Kitchenette": "Cozinha compacta", "Placar empotrado": "Armário embutido" },
}

function localizeAmenity(amenity: string, locale: Locale) {
  if (locale === "es") return amenity
  return amenityTranslations[locale][amenity] ?? amenity
}

function localizeBedConfig(configuration: string, locale: Locale) {
  if (locale === "es") return configuration
  const translations = {
    en: { Matrimonial: "Double", "2 camas separadas": "2 separate beds", "2 camas separadas + 1 extra": "2 separate beds + 1 extra", "2 camas separadas + 2 extras": "2 separate beds + 2 extras", "3 camas separadas": "3 separate beds", "4 camas separadas": "4 separate beds" },
    fr: { Matrimonial: "Double", "2 camas separadas": "2 lits séparés", "2 camas separadas + 1 extra": "2 lits séparés + 1 lit d’appoint", "2 camas separadas + 2 extras": "2 lits séparés + 2 lits d’appoint", "3 camas separadas": "3 lits séparés", "4 camas separadas": "4 lits séparés" },
    pt: { Matrimonial: "Casal", "2 camas separadas": "2 camas separadas", "2 camas separadas + 1 extra": "2 camas separadas + 1 extra", "2 camas separadas + 2 extras": "2 camas separadas + 2 extras", "3 camas separadas": "3 camas separadas", "4 camas separadas": "4 camas separadas" },
  } as const
  return translations[locale][configuration as keyof typeof translations[typeof locale]] ?? configuration
}

export default async function PosadaPage() {
  const [rooms, locale] = await Promise.all([getRooms(), getRequestLocale()])
  const copy = publicPageDictionaries[locale].posada

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative isolate min-h-[68svh] overflow-hidden bg-primary py-16 sm:py-20 lg:min-h-[74svh]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 z-0 h-full w-full object-cover"
          >
            <source
              src="/images/ESTANCIA%20EL%20CANGUE%20-%20VIDEO%20PORTADA.mp4"
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 z-[1] bg-primary/72" aria-hidden="true" />
          <div
            className="absolute inset-0 z-[2] bg-gradient-to-b from-foreground/30 via-primary/30 to-primary/82"
            aria-hidden="true"
          />
          <div className="relative z-[3] mx-auto flex min-h-[calc(68svh-8rem)] max-w-5xl items-center px-4 text-center sm:px-6 lg:min-h-[calc(74svh-10rem)] lg:px-8">
            <div className="mx-auto w-full">
            <p className="section-eyebrow-light mb-4">{copy.eyebrow}</p>
            <h1 className="mx-auto mb-6 max-w-3xl font-serif text-3xl leading-[1.08] text-background sm:text-4xl md:text-5xl">
              {copy.title}
            </h1>
            <p className="mx-auto max-w-3xl text-sm leading-[1.65] text-background/78 sm:text-base">
              {copy.intro}
            </p>
            <div className="mx-auto mt-7 flex max-w-3xl items-start gap-3 border-t border-background/18 pt-5 text-left text-xs leading-[1.6] text-background/68 sm:items-center sm:text-center">
              <Heart className="mt-0.5 size-4 shrink-0 text-background/72 sm:mt-0" strokeWidth={1.7} />
              <p>
                {copy.community}
              </p>
            </div>
            </div>
          </div>
        </section>

        {/* Rooms List */}
        {rooms.length > 0 && (
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-20">
              {rooms.map((room, index) => (
                <div
                  key={room.id}
                  id={room.slug}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                >
                  {/* Image */}
                  <div className={`relative aspect-[4/3] overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Image src={room.image} alt={room.name} fill className="object-cover" />
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h2 className="font-serif text-2xl sm:text-3xl text-title mb-4 uppercase">
                      {room.name}
                    </h2>
                    <p className="text-foreground/80 text-sm leading-[1.32] mb-6">
                      {locale === "es" ? room.description : copy.roomDescription}
                    </p>

                    {/* Bed configs */}
                    {room.bed_configs.length > 0 && (
                      <div className="mb-5">
                        <p className="text-xs uppercase tracking-widest text-foreground/50 mb-2">{copy.bedConfiguration}</p>
                        <div className="flex flex-wrap gap-2">
                          {room.bed_configs.map((cfg) => (
                            <span key={cfg} className="text-xs border border-border px-2 py-1 text-foreground/60">
                              {localizeBedConfig(cfg, locale)}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Amenities */}
                    <ul className="space-y-2 mb-6">
                      {room.amenities.map((amenity, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-foreground/70 text-sm leading-[1.32]">
                          <AmenityIcon amenity={amenity} />
                          <span>{localizeAmenity(amenity, locale)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={`#reserva?habitacion=${room.slug}`}
                      onClick={undefined}
                      data-room-slug={room.slug}
                      className="inline-block px-6 py-2.5 bg-primary text-background text-xs uppercase tracking-widest font-medium hover:bg-primary/90 transition-colors reserve-btn"
                    >
                      {copy.reserveRoom}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* Reservation Form */}
        <ReservationForm
          locale={locale}
          rooms={rooms.map((r) => ({
            id: r.id,
            name: r.name,
            slug: r.slug,
            image: r.image,
            bed_configs: r.bed_configs,
          }))}
        />
      </main>
      <Footer />
    </>
  )
}
