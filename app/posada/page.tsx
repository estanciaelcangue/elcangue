import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Bed, Snowflake, Wifi, Bath, Coffee, Check } from "lucide-react"

const rooms = [
  {
    id: 1,
    name: "La Malacara",
    description: "La emblemática verde naranja, adonde don Carmelo Cardozo llego un dia para quedarse. Esta habitacion de estilo antiguo tiene vista al parque. Los muebles de roble americano pertenecieron a los abuelos. Tiene su propio bano, regadera de la estancia, y una pequena terraza exterior donde desayunar o leer entre los pajaros.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2074&auto=format&fit=crop",
    amenities: ["Cama King size", "Television", "Aire acondicionado", "Frigobar", "Hidromasaje doble y ducha escocesa", "Calefaccion a lena de dos ambientes", "Wifi", "Piso de madera"],
    position: "left",
  },
  {
    id: 2,
    name: "La Mora",
    description: "Nuestra habitacion principal es el addendum al casco antiguo. Fue bano, despensa, Para ellos, pasaron de generacion en generacion estos espacios. Es una pieza con historia de mucha sensibilidad, donde parece que el tiempo se detuvo con sus muebles de epoca y paredes con listones de pino patagonico acompanan cada rincon.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
    amenities: ["Cama King size", "Aire acondicionado y estufa", "Frigobar", "Hidromasaje doble y ducha escocesa", "Wifi", "Piso de madera"],
    position: "right",
  },
  {
    id: 3,
    name: "La Tubiana",
    description: "Un pequeno rincon de estilo antiguo con lindas vistas al parque. Los muebles y enseres evocan un tiempo pasado, y recuerdan a nuestros queridos abuelos. La habitacion tiene su propio bano reformado.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Cama King size", "Television", "Aire acondicionado", "Frigobar", "Piso de madera"],
    position: "left",
  },
  {
    id: 4,
    name: "La Rosilla",
    description: "Esta habitacion es de nuestra favorita, otro estilo de cuarto, mas moderno, con su bano independiente con hidromasaje y revestida de viejos ladrillos a la vista, es el resultado Boutique. Fue adonde el viejo Miguel Rodriguez dormia entre sus trastos para vigilar a los peones de la estancia.",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Cama Queen size", "Placar empotrado", "Frigobar", "Banos de hierro esmaltado y duchas espa", "Rapidas"],
    position: "right",
  },
  {
    id: 5,
    name: "La Gateada",
    description: "Es nuestra habitacion favorita: una suite de dos ambientes en el sector mas antiguo del casco. Con piso de tablones de madera de pino patagonico, ventanales con marcos originales con vista al parque y al monte. Tiene una pequena terraza que comparte con el Rosedal, ideal para desayunar mientras se escuchan los pajaros.",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Cama King size", "Biblioteca con butacas y hogar a lena", "Sofa cama de dos plazas", "Escritorio", "Televisor", "Aire acondicionado"],
    position: "left",
  },
  {
    id: 6,
    name: "La Zaina",
    description: "La zaina es nuestra suite biambiente en planta baja con terraza y vista a los jardines del Rosedal, ideal para parejas en busca de mayor privacidad y relax. El estilo de muebles y decoracion del interior ofrece un ambiente acogedor y romantico.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070&auto=format&fit=crop",
    amenities: ["Cama Queen size", "Kitchenette", "Aire acondicionado", "Frigobar", "Banos hidromasaje y duchas de lluvia", "Suite hidromasaje para dos adultosones"],
    position: "right",
  },
]

function AmenityIcon({ amenity }: { amenity: string }) {
  const lower = amenity.toLowerCase()
  if (lower.includes("cama")) return <Bed size={14} />
  if (lower.includes("aire") || lower.includes("calefaccion")) return <Snowflake size={14} />
  if (lower.includes("wifi")) return <Wifi size={14} />
  if (lower.includes("bano") || lower.includes("hidromasaje") || lower.includes("ducha")) return <Bath size={14} />
  if (lower.includes("desayuno") || lower.includes("frigobar")) return <Coffee size={14} />
  return <Check size={14} />
}

export default function PosadaPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-background/60 text-xs tracking-[0.2em] uppercase mb-3">
              Posada de Campo
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-background mb-6">
              RESERVA TU ESTADIA<br />EN LA ESTANCIA
            </h1>
            <p className="text-background/70 text-sm leading-relaxed max-w-2xl mx-auto">
              Ninas de principio de nuestro tiempo ya, con los mismos colores, blancos puros que blanquean y refrescan nuestras habitaciones. Un 
              abanico de distintas opciones que van desde la habitacion simple del casco historico para quien busca descansar, volver 
              a tiempo a despertarse, disfrutar del bano y darse, con sus sencillas y desayunos, cuidadas ideas y lujos, para los que gusten atencion de sistema auto 
              boutique incluido con desayuno artesanal incluido. Es decir la carta puede ser un hotel campestre: trato familiar, comida 
              exquisita, servicio de te y cafe, y para abrazar para el amanecer de la estancia.
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
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className={`relative aspect-[4/3] overflow-hidden ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                    <Image
                      src={room.image}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <h2 className="font-serif text-2xl sm:text-3xl text-title mb-4 uppercase">
                      {room.name}
                    </h2>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                      {room.description}
                    </p>
                    
                    {/* Amenities */}
                    <ul className="space-y-2">
                      {room.amenities.map((amenity, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-foreground/60 text-sm">
                          <AmenityIcon amenity={amenity} />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reservation Form */}
        <section className="py-16 bg-primary">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center font-serif text-2xl text-background mb-8 uppercase tracking-wide">
              Contactanos para Reservar
            </h2>
            <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="date"
                placeholder="Fecha de ingreso"
                className="px-4 py-3 bg-background border-0 text-sm text-foreground/70"
              />
              <input
                type="date"
                placeholder="Fecha de salida"
                className="px-4 py-3 bg-background border-0 text-sm text-foreground/70"
              />
              <select className="px-4 py-3 bg-background border-0 text-sm text-foreground/70">
                <option>Adultos</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
              <select className="px-4 py-3 bg-background border-0 text-sm text-foreground/70">
                <option>Ninos (Menores)</option>
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <input
                type="text"
                placeholder="Enter Your First Name"
                className="px-4 py-3 bg-background border-0 text-sm text-foreground/70 sm:col-span-2"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 bg-background border-0 text-sm text-foreground/70 sm:col-span-2"
              />
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
