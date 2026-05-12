"use client"

import { useState } from "react"
import { MapPin, Phone, Mail } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    guests: "",
    name: "",
    email: "",
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
    setFormData({ checkIn: "", checkOut: "", guests: "", name: "", email: "", message: "" })
  }

  return (
    <section id="contacto" className="py-16 bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div>
            <div className="border-t border-b border-border py-6 mb-8">
              <h3 className="text-xs tracking-[0.2em] uppercase text-foreground/60 mb-6">
                Contactanos
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="text-foreground/50 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground/70 text-sm">
                    Paysandu, Departamento de<br />
                    Paysandu, Uruguay
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-foreground/50 flex-shrink-0" />
                  <a href="tel:+59899726883" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    +598 99 726 883
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-foreground/50 flex-shrink-0" />
                  <a href="mailto:reservas@estanciaelcangue.com.uy" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    reservas@estanciaelcangue.com.uy
                  </a>
                </div>
              </div>
            </div>

            <div className="border-b border-border pb-6">
              <h3 className="text-xs tracking-[0.2em] uppercase text-foreground/60 mb-4">
                Encontranos
              </h3>
              {/* Map placeholder */}
              <div className="aspect-video w-full rounded-sm overflow-hidden border border-border bg-accent/30">
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
            <div className="border border-border p-6 bg-card">
              <h3 className="text-xs tracking-[0.2em] uppercase text-foreground/60 mb-6 text-center">
                Consultanos por Disponibilidad
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date"
                      id="checkIn"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      id="checkOut"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground"
                      placeholder="DD/MM/YYYY"
                    />
                  </div>
                </div>

                <div>
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground/70"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="1">1 huesped</option>
                    <option value="2">2 huespedes</option>
                    <option value="3">3 huespedes</option>
                    <option value="4">4 huespedes</option>
                    <option value="5+">5+ huespedes</option>
                  </select>
                </div>

                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground"
                    placeholder="Enter Your First Name"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground"
                    placeholder="Email Address"
                  />
                </div>

                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-3 py-2.5 bg-background border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-foreground resize-none"
                    placeholder="Mensaje (opcional)"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-coral text-background font-medium text-xs tracking-[0.15em] uppercase hover:bg-coral/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
