import { notFound } from "next/navigation"
import BlogPostPage from "@/app/noticias/[slug]/page"
import { isLocale } from "@/lib/i18n/config"

export default async function LocalizedBlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <BlogPostPage params={Promise.resolve({ locale, slug })} />
}
