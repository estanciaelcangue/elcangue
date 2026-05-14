import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/config"

const externalHrefPattern = /^(https?:|mailto:|tel:)/i

export function getLocaleFromPathname(pathname: string): Locale | null {
  const firstSegment = pathname.split("/").filter(Boolean)[0]
  return isLocale(firstSegment) ? firstSegment : null
}

export function getLocaleFromPathnameOrDefault(pathname: string): Locale {
  return getLocaleFromPathname(pathname) ?? defaultLocale
}

export function stripLocaleFromPathname(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) return "/"
  if (!isLocale(segments[0])) return pathname || "/"

  const stripped = `/${segments.slice(1).join("/")}`
  return stripped === "/" ? "/" : stripped.replace(/\/$/, "")
}

export function localizePath(href: string, locale: Locale): string {
  if (!href || href.startsWith("#") || externalHrefPattern.test(href)) {
    return href
  }

  const hashIndex = href.indexOf("#")
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : ""
  const hrefWithoutHash = hashIndex >= 0 ? href.slice(0, hashIndex) : href
  const queryIndex = hrefWithoutHash.indexOf("?")
  const query = queryIndex >= 0 ? hrefWithoutHash.slice(queryIndex) : ""
  const pathname = queryIndex >= 0 ? hrefWithoutHash.slice(0, queryIndex) : hrefWithoutHash
  const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`
  const strippedPathname = stripLocaleFromPathname(normalizedPathname)
  const localizedPathname = strippedPathname === "/" ? `/${locale}` : `/${locale}${strippedPathname}`

  return `${localizedPathname}${query}${hash}`
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  return localizePath(stripLocaleFromPathname(pathname || "/"), locale)
}
