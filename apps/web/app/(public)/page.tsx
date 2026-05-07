import { createClient } from '@saudi-leaks/shared/supabase/server'
import HeroSection from '@/components/home/HeroSection'
import ServicesPreview from '@/components/home/ServicesPreview'
import LatestArticles from '@/components/home/LatestArticles'
import CTASection from '@/components/home/CTASection'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@saudi-leaks/shared/utils'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
}

export default async function HomePage() {
  const supabase = await createClient()

  const [{ data: services }, { data: articles }] = await Promise.all([
    supabase.from('services').select('*').order('created_at', { ascending: true }),
    supabase.from('articles').select('*').order('created_at', { ascending: false }).limit(4),
  ])

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: process.env.NEXT_PUBLIC_PHONE,
    areaServed: 'SA',
    address: { '@type': 'PostalAddress', addressCountry: 'SA', addressRegion: 'الرياض' },
    serviceType: ['كشف تسربات المياه', 'عزل الأسطح', 'عزل الخزانات'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HeroSection />
      <ServicesPreview services={services ?? []} />
      <CTASection />
      <LatestArticles articles={articles ?? []} />
    </>
  )
}
