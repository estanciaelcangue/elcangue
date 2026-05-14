import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { isLocale, locales, type Locale } from "@/lib/i18n/config"

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : "es"
  const dictionary = getDictionary(locale)

  return {
    title: dictionary.site.metadata.title,
    description: dictionary.site.metadata.description,
    keywords: [...dictionary.site.metadata.keywords],
    openGraph: {
      title: dictionary.site.metadata.title,
      description: dictionary.site.metadata.description,
      type: "website",
      locale: dictionary.site.metadata.openGraphLocale,
      alternateLocale: locales
        .filter((item) => item !== locale)
        .map((item) => getDictionary(item as Locale).site.metadata.openGraphLocale),
    },
    alternates: {
      languages: Object.fromEntries(locales.map((item) => [item, `/${item}`])),
    },
  }
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  return children
}
