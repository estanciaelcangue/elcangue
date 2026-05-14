import type { Metadata } from 'next'
import { Marcellus, Lato } from 'next/font/google'
import { headers } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import { defaultLocale, isLocale } from '@/lib/i18n/config'
import { PageTransition } from '@/components/animations/page-transition'
import './globals.css'

const marcellus = Marcellus({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-marcellus',
  display: 'swap',
})

const lato = Lato({ 
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Estancia El Cangüé | Turismo Rural en Uruguay',
  description: 'Descubrí la magia del campo uruguayo en Estancia El Cangüé. Alojamiento rural, eventos, bodas y experiencias únicas en un entorno natural privilegiado.',
  keywords: ['estancia', 'turismo rural', 'Uruguay', 'bodas', 'eventos', 'alojamiento', 'campo'],
  openGraph: {
    title: 'Estancia El Cangüé | Turismo Rural en Uruguay',
    description: 'Descubrí la magia del campo uruguayo en Estancia El Cangüé.',
    type: 'website',
    locale: 'es_UY',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const requestHeaders = await headers()
  const localeHeader = requestHeaders.get('x-locale')
  const locale = isLocale(localeHeader) ? localeHeader : defaultLocale

  return (
    <html lang={locale} className={`${marcellus.variable} ${lato.variable} bg-background`}>
      <body className="font-sans antialiased">
        <PageTransition>{children}</PageTransition>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
