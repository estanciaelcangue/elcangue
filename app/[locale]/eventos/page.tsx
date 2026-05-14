import { notFound } from "next/navigation"
import EventosPage from "@/app/eventos/page"
import { isLocale } from "@/lib/i18n/config"

export default async function LocalizedEventosPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <EventosPage />
}
