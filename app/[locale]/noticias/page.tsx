import { notFound } from "next/navigation"
import BlogPage from "@/app/noticias/page"
import { isLocale } from "@/lib/i18n/config"

export default async function LocalizedBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <BlogPage />
}
