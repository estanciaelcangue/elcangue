import { notFound } from "next/navigation"
import { HomePageContent } from "@/components/pages/home-page"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale } from "@/lib/i18n/config"

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <HomePageContent dictionary={getDictionary(locale)} locale={locale} />
}
