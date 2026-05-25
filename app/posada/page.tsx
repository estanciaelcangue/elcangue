import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Bed, Snowflake, Wifi, Bath, Coffee, Check } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { ReservationForm } from "@/components/sections/reservation-form"

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

export default async function PosadaPage() {
  const rooms = await getRooms()

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="section-eyebrow-light mb-3">Posada de Campo</p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-background mb-6">
              RESERVA TU ESTADÍA<br />EN LA ESTANCIA
            </h1>
            <p className="text-background/75 text-sm leading-[1.32] max-w-2xl mx-auto">
              Un abanico de distintas opciones que van desde la habitación simple del casco histórico
              para quien busca descansar, hasta suites boutique con desayuno artesanal incluido.
              Trato familiar, comida exquisita, servicio de té y café al amanecer de la estancia.
            </p>
          </div>
        </section>

        {/* Rooms List */}
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
                      {room.description}
                    </p>

                    {/* Bed configs */}
                    {room.bed_configs.length > 0 && (
                      <div className="mb-5">
                        <p className="text-xs uppercase tracking-widest text-foreground/50 mb-2">Configuración de camas</p>
                        <div className="flex flex-wrap gap-2">
                          {room.bed_configs.map((cfg) => (
                            <span key={cfg} className="text-xs border border-border px-2 py-1 text-foreground/60">
                              {cfg}
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
                          <span>{amenity}</span>
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
                      Reservar esta habitación
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reservation Form */}
        <ReservationForm
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
