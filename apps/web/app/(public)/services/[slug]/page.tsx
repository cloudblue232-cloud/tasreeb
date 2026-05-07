import { createClient } from '@saudi-leaks/shared/supabase/server'
import { createStaticClient } from '@saudi-leaks/shared/supabase/static'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PHONE, SITE_URL, whatsappLink } from '@saudi-leaks/shared/utils'
import type { Metadata } from 'next'

export const revalidate = 3600

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const supabase = createStaticClient()
  const { data } = await supabase.from('services').select('slug')
  return (data ?? []).map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: service } = await supabase.from('services').select('title, description').eq('slug', slug).single()
  if (!service) return { title: 'الخدمة غير موجودة' }
  return {
    title: `${service.title} | كشف التسربات والعزل بالسعودية`,
    description: service.description.slice(0, 160),
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
  }
}

const serviceIcons: Record<string, string> = {
  'kashf-tasaroubat-almaya': '🔍', 'azl-alsotouh-waljedran': '🏗️',
  'azl-alkhazanat-walmasabeh': '🏊', 'kashf-tasaroubat-algaz': '⚠️',
  'moualajat-alrotuba-wa-izalat-alaofoun': '💧', 'syanat-wa-islah-tasaroubat-alsibaka': '🔧',
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const [{ data: service }, { data: otherServices }] = await Promise.all([
    supabase.from('services').select('*').eq('slug', slug).single(),
    supabase.from('services').select('id, title, slug').neq('slug', slug).limit(4),
  ])
  if (!service) notFound()

  const waLink = whatsappLink(`مرحباً، أريد الاستفسار عن خدمة: ${service.title}`)
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Service',
    name: service.title, description: service.description,
    provider: { '@type': 'LocalBusiness', name: 'كشف التسربات والعزل بالسعودية' },
    areaServed: 'SA',
  }

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="bg-gradient-hero py-16 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 40" fill="none"><path d="M0 40L1440 40L1440 20C1200 0 960 0 720 10C480 20 240 30 0 20V40Z" fill="white"/></svg></div>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-6 text-sm transition-colors">← جميع الخدمات</Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">{service.title}</h1>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {service.image_url ? (
              <div className="relative w-full h-72 rounded-2xl overflow-hidden mb-8 shadow-lg">
                <Image src={service.image_url} alt={service.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 66vw" />
              </div>
            ) : (
              <div className="w-full h-72 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mb-8">
                <span className="text-9xl">{serviceIcons[service.slug] || '🔧'}</span>
              </div>
            )}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-blue-900 mb-6 border-b border-blue-50 pb-4">نبذة عن الخدمة</h2>
              <p className="text-gray-700 leading-[2] text-lg">{service.description}</p>
            </div>
          </div>
          <aside className="space-y-5">
            <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl p-6 text-white text-center sticky top-24">
              <div className="text-5xl mb-4">📞</div>
              <h3 className="font-extrabold text-xl mb-2">احصل على عرض السعر</h3>
              <p className="text-blue-100 text-sm mb-6">فحص مجاني وعرض سعر فوري</p>
              <a href={`tel:${PHONE}`} id="service-detail-call-btn" className="btn-primary w-full justify-center mb-3 !rounded-xl">اتصل الآن</a>
              <a href={waLink} id="service-detail-wa-btn" target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center !rounded-xl">واتساب</a>
            </div>
            {otherServices && otherServices.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">خدمات أخرى</h3>
                <ul className="space-y-2">
                  {otherServices.map(s => (
                    <li key={s.id}>
                      <Link href={`/services/${s.slug}`} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors py-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-300 flex-shrink-0" />{s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
