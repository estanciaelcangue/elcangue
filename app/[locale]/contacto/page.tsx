import { notFound } from "next/navigation"
import ContactoPage from "@/app/contacto/page"
import { isLocale } from "@/lib/i18n/config"

export default async function LocalizedContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return <ContactoPage />
}
