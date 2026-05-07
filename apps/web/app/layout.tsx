import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@saudi-leaks/shared/utils'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: [
    'كشف تسربات المياه', 'عزل خزانات',
    'شركة كشف تسربات بالسعودية', 'عزل أسطح',
    'كشف تسربات الرياض', 'عزل حراري ومائي',
  ],
  openGraph: { type: 'website', locale: 'ar_SA', url: SITE_URL, siteName: SITE_NAME },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo antialiased bg-white text-gray-900">{children}</body>
    </html>
  )
}
