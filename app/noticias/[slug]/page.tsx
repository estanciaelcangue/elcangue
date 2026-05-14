import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Tag } from "lucide-react"
import { notFound } from "next/navigation"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { localeDateFormats, normalizeLocale } from "@/lib/i18n/config"
import { localizePath } from "@/lib/i18n/navigation"

type BlogCategory = "novedades" | "eventos" | "prensa" | "experiencias"

interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  featured_image: string
  category: BlogCategory
  published_at: string
  author: { full_name: string } | { full_name: string }[] | null
}

function getAuthorName(post: BlogPost) {
  const author = Array.isArray(post.author) ? post.author[0] : post.author
  return author?.full_name || "El Cangue"
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>
}) {
  const { slug, locale: rawLocale } = await params
  const locale = normalizeLocale(rawLocale)
  const dictionary = getDictionary(locale)
  const categoryLabels = dictionary.blog.categories
  const supabase = await createClient()
  
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*, author:profiles(full_name)")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()

  if (error) {
    console.error("Error loading blog post", error)
  }

  if (!post) {
    notFound()
  }

  const typedPost = post as BlogPost

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(localeDateFormats[locale], {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
  }

  // Get related posts
  const { data: relatedPosts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, featured_image, published_at")
    .eq("is_published", true)
    .eq("category", typedPost.category)
    .neq("id", typedPost.id)
    .limit(3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Image */}
      <section className="relative h-[50vh] mt-20">
        <Image
          src={typedPost.featured_image}
          alt={typedPost.title}
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
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary text-card px-3 py-1 rounded text-xs font-sans uppercase tracking-wide flex items-center gap-1">
                <Tag className="w-3 h-3" />
                {categoryLabels[typedPost.category]}
              </span>
              <span className="text-card/80 font-sans text-sm flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(typedPost.published_at)}
              </span>
              <span className="text-card/80 font-sans text-sm">
                {dictionary.common.by} {getAuthorName(typedPost)}
              </span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl text-card max-w-4xl">
              {typedPost.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {typedPost.excerpt && (
              <p className="font-sans text-xl text-foreground/80 leading-relaxed mb-8 border-l-4 border-primary pl-6">
                {typedPost.excerpt}
              </p>
            )}
            <div className="prose prose-lg max-w-none font-sans text-foreground leading-relaxed">
              {typedPost.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="py-16 bg-card border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="font-serif text-2xl text-title text-center mb-12">
              {dictionary.blog.relatedPosts}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link 
                  key={relatedPost.id}
                  href={localizePath(`/noticias/${relatedPost.slug}`, locale)}
                  className="group"
                >
                  <div className="relative h-40 rounded-lg overflow-hidden mb-4">
                    <Image
                      src={relatedPost.featured_image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-serif text-lg text-title group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h3>
                  <time className="font-sans text-xs text-foreground/50">
                    {formatDate(relatedPost.published_at)}
                  </time>
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
            {dictionary.blog.ctaExperienceTitle}
          </h2>
          <p className="font-sans text-card/80 mb-8 max-w-2xl mx-auto">
            {dictionary.blog.ctaExperienceText}
          </p>
          <Link
            href={localizePath("/contacto", locale)}
            className="inline-block bg-card text-primary px-8 py-3 rounded font-sans text-sm uppercase tracking-wider hover:bg-card/90 transition-colors"
          >
            {dictionary.common.contactUs}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
