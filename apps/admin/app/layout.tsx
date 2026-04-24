import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import '../../../styles/globals.css'

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'لوحة التحكم',
  description: 'لوحة إدارة المحتوى',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo antialiased bg-white text-gray-900">{children}</body>
    </html>
  )
}
