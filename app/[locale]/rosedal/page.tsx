import { notFound } from "next/navigation"
import RosedalPage from "@/app/rosedal/page"
import { isLocale } from "@/lib/i18n/config"

export default async function LocalizedRosedalPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <RosedalPage />
}
