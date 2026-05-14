export const locales = ["es", "en", "fr", "pt"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "es"

export const localeCookieName = "NEXT_LOCALE"

export const localeLabels: Record<Locale, string> = {
  es: "Español",
  en: "English",
  fr: "Français",
  pt: "Português",
}

export const localeShortLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  fr: "FR",
  pt: "PT",
}

export const localeDateFormats: Record<Locale, string> = {
  es: "es-UY",
  en: "en-US",
  fr: "fr-FR",
  pt: "pt-BR",
}

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale)
}

export function normalizeLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : defaultLocale
}
