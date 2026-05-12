import Image from "next/image"
import Link from "next/link"

const rooms = [
  {
    id: 1,
    name: "La Malacara",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "La Mora",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "La Tubiana",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "La Rosilla",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "La Gateada",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "La Zaina",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
  },
]

export function AccommodationSection() {
  return (
    <section id="alojamiento" className="py-4 bg-background">
      <div className="mx-auto max-w-7xl px-0">
        {/* Room Grid - 3x2 layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {rooms.map((room) => (
            <Link
              key={room.id}
              href="/posada"
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors duration-300" />
              
              {/* Room Name */}
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-background tracking-wide uppercase">
                  {room.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
