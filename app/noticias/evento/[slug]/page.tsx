import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, ExternalLink } from "lucide-react"
import { notFound } from "next/navigation"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { localeDateFormats, normalizeLocale } from "@/lib/i18n/config"
import { localizePath } from "@/lib/i18n/navigation"

interface Event {
  id: string
  slug: string
  title: string
  description: string
  content: string
  featured_image: string
  event_date: string
  event_end_date: string | null
  location: string
  ticket_url: string | null
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>
}) {
  const { slug, locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  const dictionary = getDictionary(locale)
  const supabase = await createClient()
  
  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()

  if (error) {
    console.error("Error loading event detail", error)
  }

  if (!event) {
    notFound()
  }

  const typedEvent = event as Event

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(localeDateFormats[locale], {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString(localeDateFormats[locale], {
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  // Get other upcoming events
  const { data: otherEvents } = await supabase
    .from("events")
    .select("id, slug, title, featured_image, event_date")
    .eq("is_published", true)
    .neq("id", typedEvent.id)
    .gte("event_date", new Date().toISOString())
    .order("event_date", { ascending: true })
    .limit(2)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Image */}
      <section className="relative h-[50vh] mt-20">
        <Image
          src={typedEvent.featured_image}
          alt={typedEvent.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Link 
              href={localizePath("/noticias", locale)}
              className="inline-flex items-center gap-2 text-card/80 hover:text-card mb-4 font-sans text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              {dictionary.blog.backToBlog}
            </Link>
            <span className="bg-accent text-card px-3 py-1 rounded text-xs font-sans uppercase tracking-wide inline-block mb-4">
              {dictionary.blog.eventLabel}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-card max-w-4xl">
              {typedEvent.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Event Info Bar */}
      <section className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center gap-2 text-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-sans text-sm font-medium">
                  {formatDate(typedEvent.event_date)}
                  {typedEvent.event_end_date && ` - ${formatDate(typedEvent.event_end_date)}`}
                </p>
                <p className="font-sans text-xs text-foreground/60">
                  {formatTime(typedEvent.event_date)} hs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-foreground">
              <MapPin className="w-5 h-5 text-primary" />
              <p className="font-sans text-sm">{typedEvent.location}</p>
            </div>
            {typedEvent.ticket_url && (
              <a
                href={typedEvent.ticket_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-accent text-card px-6 py-2 rounded font-sans text-sm hover:bg-accent/90 transition-colors"
              >
                {dictionary.blog.reserve}
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {typedEvent.description && (
              <p className="font-sans text-xl text-foreground/80 leading-relaxed mb-8 border-l-4 border-accent pl-6">
                {typedEvent.description}
              </p>
            )}
            {typedEvent.content && (
              <div className="prose prose-lg max-w-none font-sans text-foreground leading-relaxed">
                {typedEvent.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Other Events */}
      {otherEvents && otherEvents.length > 0 && (
        <section className="py-16 bg-card border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl text-title text-center mb-12">
              {dictionary.blog.otherEvents}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {otherEvents.map((otherEvent) => (
                <Link 
                  key={otherEvent.id}
                  href={localizePath(`/blog/evento/${otherEvent.slug}`, locale)}
                  className="group"
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={otherEvent.featured_image}
                      alt={otherEvent.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-card px-3 py-1 rounded text-xs font-sans">
                      {formatDate(otherEvent.event_date)}
                    </div>
                  </div>
                  <h3 className="font-serif text-lg text-title group-hover:text-primary transition-colors">
                    {otherEvent.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl text-card mb-4">
            {dictionary.blog.ctaEventTitle}
          </h2>
          <p className="font-sans text-card/80 mb-8 max-w-2xl mx-auto">
            {dictionary.blog.ctaEventText}
          </p>
          <Link
            href={localizePath("/eventos", locale)}
            className="inline-block bg-card text-primary px-8 py-3 rounded font-sans text-sm uppercase tracking-wider hover:bg-card/90 transition-colors"
          >
            {dictionary.blog.ctaEventLink}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
