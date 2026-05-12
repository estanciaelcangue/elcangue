import type { Metadata } from 'next'
import { Marcellus, Lato } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${marcellus.variable} ${lato.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
