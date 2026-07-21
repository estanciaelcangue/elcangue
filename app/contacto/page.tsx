import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin, Phone, Mail } from "lucide-react"
import { googleMapsEmbedSrc } from "@/lib/location"
import { ContactMessageForm } from "@/components/contact-message-form"

export default function ContactoPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-background mb-4 uppercase">
              Contacto
            </h1>
            <p className="text-background/75 text-sm leading-[1.32] max-w-xl mx-auto">
              Estamos aqui para ayudarte a planificar tu estadia o evento. 
              No dudes en contactarnos para cualquier consulta.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="font-serif text-2xl text-title mb-8 uppercase">
                  Informacion de Contacto
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-primary" size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Ubicacion</h3>
                      <p className="text-foreground/80 text-sm leading-[1.32]">
                        Ruta 3 km 358,5<br />
                        Paysandú, Uruguay
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="text-primary" size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Telefono</h3>
                      <a href="tel:+59899726883" className="text-foreground/70 text-sm hover:text-primary transition-colors">
                        +598 99 726 883
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="text-primary" size={18} />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">Email</h3>
                      <div className="space-y-1">
                        <a href="mailto:info@estanciaelcangue.com" className="text-foreground/70 text-sm hover:text-primary transition-colors block">
                          info@estanciaelcangue.com
                        </a>
                        <a href="mailto:reservas@estanciaelcangue.com.uy" className="text-foreground/70 text-sm hover:text-primary transition-colors block">
                          reservas@estanciaelcangue.com.uy
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-8">
                  <div className="aspect-video w-full rounded-sm overflow-hidden border border-border">
                    <iframe
                      src={googleMapsEmbedSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicacion de Estancia El Cangue"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="font-serif text-2xl text-title mb-8 uppercase">
                  Envianos un Mensaje
                </h2>
                
                <ContactMessageForm
                  origin="contact"
                  showPhone
                  subjectOptions={[
                    { value: "reserva", label: "Reserva de alojamiento" },
                    { value: "evento", label: "Consulta de eventos" },
                    { value: "boda", label: "Bodas" },
                    { value: "rosedal", label: "Visita al Rosedal" },
                    { value: "otro", label: "Otro" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
