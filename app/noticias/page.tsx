"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/client"
import { Calendar, ArrowRight } from "lucide-react"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { localeDateFormats } from "@/lib/i18n/config"
import { getLocaleFromPathnameOrDefault, localizePath } from "@/lib/i18n/navigation"

type BlogCategory = "novedades" | "eventos" | "prensa" | "experiencias"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  featured_image: string
  category: BlogCategory
  published_at: string
  author: { full_name: string } | { full_name: string }[] | null
}

interface Event {
  id: string
  slug: string
  title: string
  description: string
  featured_image: string
  event_date: string
  location: string
}

const categoryColors: Record<BlogCategory, string> = {
  novedades: "bg-primary",
  eventos: "bg-accent",
  prensa: "bg-title",
  experiencias: "bg-primary-hover",
}

function getAuthorName(post: BlogPost) {
  const author = Array.isArray(post.author) ? post.author[0] : post.author
  return author?.full_name || "El Cangue"
}

export default function BlogPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathnameOrDefault(pathname)
  const dictionary = getDictionary(locale)
  const categoryLabels = dictionary.blog.categories
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | "all">("all")
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      try {
        const [postsResult, eventsResult] = await Promise.all([
          supabase
            .from("blog_posts")
            .select("id, slug, title, excerpt, featured_image, category, published_at, author:profiles(full_name)")
            .eq("is_published", true)
            .order("published_at", { ascending: false }),
          supabase
            .from("events")
            .select("id, slug, title, description, featured_image, event_date, location")
            .eq("is_published", true)
            .order("event_date", { ascending: true })
        ])

        if (postsResult.error || eventsResult.error) {
          console.error("Error loading blog data", {
            posts: postsResult.error,
            events: eventsResult.error,
          })
          setErrorMessage(dictionary.blog.loadingError)
        }

        if (postsResult.data) setPosts(postsResult.data)
        if (eventsResult.data) setEvents(eventsResult.data)
      } catch (error) {
        console.error("Unexpected blog loading error", error)
        setErrorMessage(dictionary.blog.loadingError)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dictionary.blog.loadingError])

  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(localeDateFormats[locale], {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-primary py-20 mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-card mb-4">
            {dictionary.blog.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-card/80">
            <span className="w-12 h-px bg-card/40" />
            <span className="font-sans text-sm uppercase tracking-widest">
              {dictionary.blog.subtitle}
            </span>
            <span className="w-12 h-px bg-card/40" />
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {events.length > 0 && (
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-3xl text-title text-center mb-12">
              {dictionary.blog.upcomingEvents}
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {events.map((event) => (
                <Link 
                  key={event.id} 
                  href={localizePath(`/noticias/evento/${event.slug}`, locale)}
                  className="group bg-background rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={event.featured_image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-accent text-card px-4 py-2 rounded">
                      <Calendar className="w-4 h-4 inline-block mr-2" />
                      <span className="font-sans text-sm">
                        {formatDate(event.event_date)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-xl text-title mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="font-sans text-foreground/70 text-sm mb-3">
                      {event.description}
                    </p>
                    <p className="font-sans text-xs text-foreground/50">
                      {event.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-full font-sans text-sm transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary text-card"
                  : "bg-card text-foreground border border-border hover:bg-background"
              }`}
            >
              {dictionary.blog.all}
            </button>
            {(Object.keys(categoryLabels) as BlogCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-sans text-sm transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-card"
                    : "bg-card text-foreground border border-border hover:bg-background"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="font-sans text-foreground/60 mt-4">{dictionary.blog.loadingPosts}</p>
            </div>
          ) : errorMessage && filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-sans text-foreground/60">{errorMessage}</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="font-sans text-foreground/60">{dictionary.blog.emptyCategory}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article 
                  key={post.id}
                  className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group"
                >
                  <Link href={localizePath(`/noticias/${post.slug}`, locale)}>
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className={`absolute top-4 left-4 ${categoryColors[post.category]} text-card px-3 py-1 rounded text-xs font-sans uppercase tracking-wide`}>
                        {categoryLabels[post.category]}
                      </div>
                    </div>
                    <div className="p-6">
                      <time className="font-sans text-xs text-foreground/50 uppercase tracking-wide">
                        {formatDate(post.published_at)}
                      </time>
                      <p className="font-sans text-xs text-foreground/50 mt-1">
                        {dictionary.common.by} {getAuthorName(post)}
                      </p>
                      <h3 className="font-serif text-xl text-title mt-2 mb-3 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="font-sans text-foreground/70 text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 font-sans text-sm text-primary hover:text-primary-hover transition-colors">
                        {dictionary.blog.readMore}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
