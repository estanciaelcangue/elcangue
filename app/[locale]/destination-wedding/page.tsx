import { notFound } from "next/navigation"
import DestinationWeddingPage from "@/app/destination-wedding/page"
import { isLocale } from "@/lib/i18n/config"

export default async function LocalizedDestinationWeddingPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <DestinationWeddingPage />
}
