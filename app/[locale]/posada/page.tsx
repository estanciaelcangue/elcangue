import { notFound } from "next/navigation"
import PosadaPage from "@/app/posada/page"
import { isLocale } from "@/lib/i18n/config"

export default async function LocalizedPosadaPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <PosadaPage />
}
