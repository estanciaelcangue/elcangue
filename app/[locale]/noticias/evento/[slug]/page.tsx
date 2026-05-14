import { notFound } from "next/navigation"
import EventDetailPage from "@/app/noticias/evento/[slug]/page"
import { isLocale } from "@/lib/i18n/config"

export default async function LocalizedEventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <EventDetailPage params={Promise.resolve({ locale, slug })} />
}
