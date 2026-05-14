import { NextRequest, NextResponse } from "next/server"
import { defaultLocale, isLocale, localeCookieName } from "@/lib/i18n/config"

const PUBLIC_FILE = /\.[^/]+$/

function shouldSkipLocale(pathname: string) {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname)
  )
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (shouldSkipLocale(pathname)) {
    return NextResponse.next()
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0]

  if (!isLocale(firstSegment)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
    return NextResponse.redirect(url)
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-locale", firstSegment)

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  response.cookies.set(localeCookieName, firstSegment, {
    path: "/",
    sameSite: "lax",
  })

  return response
}

export const config = {
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
}
