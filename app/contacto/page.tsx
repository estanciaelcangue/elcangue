"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { MapPin, Phone, Mail } from "lucide-react"

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    alert("Gracias por tu mensaje. Te contactaremos pronto.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

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
            <p className="text-background/70 text-sm leading-relaxed max-w-xl mx-auto">
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
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        Ruta 3 km 358.5<br />
                        Paysandu, Uruguay
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3378.5!2d-58.0!3d-32.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDE4JzAwLjAiUyA1OMKwMDAnMDAuMCJX!5e0!3m2!1ses!2suy!4v1600000000000!5m2!1ses!2suy"
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
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Asunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="reserva">Reserva de alojamiento</option>
                      <option value="evento">Consulta de eventos</option>
                      <option value="boda">Bodas</option>
                      <option value="rosedal">Visita al Rosedal</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground resize-none"
                      placeholder="Cuentanos sobre tu consulta..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3.5 bg-coral text-background font-medium text-xs tracking-[0.15em] uppercase hover:bg-coral/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
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
