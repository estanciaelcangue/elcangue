import { HomePageContent } from "@/components/pages/home-page"
import { defaultLocale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/dictionaries"

export default function HomePage() {
  return <HomePageContent dictionary={getDictionary(defaultLocale)} locale={defaultLocale} />
}
