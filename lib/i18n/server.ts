import { headers } from "next/headers"
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config"

export async function getRequestLocale(): Promise<Locale> {
  const requestHeaders = await headers()
  const localeHeader = requestHeaders.get("x-locale")

  return isLocale(localeHeader) ? localeHeader : defaultLocale
}
