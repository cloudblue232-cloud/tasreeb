import { createClient } from '@saudi-leaks/shared/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { whatsappLink } from '@saudi-leaks/shared/utils'
import type { Metadata } from 'next'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'خدماتنا — كشف التسربات والعزل بالسعودية',
  description: 'تعرف على جميع خدماتنا في كشف تسربات المياه، عزل الأسطح والخزانات والمسابح في المملكة العربية السعودية.',
  alternates: { canonical: '/services' },
}

const serviceIcons: Record<string, string> = {
  'kashf-tasaroubat-almaya': '🔍',
  'azl-alsotouh-waljedran': '🏗️',
  'azl-alkhazanat-walmasabeh': '🏊',
  'kashf-tasaroubat-algaz': '⚠️',
  'moualajat-alrotuba-wa-izalat-alaofoun': '💧',
  'syanat-wa-islah-tasaroubat-alsibaka': '🔧',
}

export default async function ServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase.from('services').select('*').order('created_at', { ascending: true })
  const waLink = whatsappLink('مرحباً، أريد الاستفسار عن خدماتكم')

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-hero py-16 text-center relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">خدماتنا المتخصصة</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">حلول احترافية شاملة لكشف التسربات والعزل الحراري والمائي في جميع أنحاء المملكة</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none"><path d="M0 40L1440 40L1440 20C1200 0 960 0 720 10C480 20 240 30 0 20V40Z" fill="white"/></svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {(!services || services.length === 0) ? (
          <p className="text-center text-gray-500 py-20">لا توجد خدمات متاحة حالياً</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <article key={service.id} className="group">
                <Link href={`/services/${service.slug}`} id={`service-page-card-${idx + 1}`} className="block card-hover bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:border-blue-200 h-full">
                  {service.image_url ? (
                    <div className="relative w-full h-52">
                      <Image src={service.image_url} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 100vw, (max-width:1024px) 50vw, 33vw" />
                    </div>
                  ) : (
                    <div className="w-full h-52 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                      <span className="text-7xl">{serviceIcons[service.slug] || '🔧'}</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-600 transition-colors">{service.title}</h2>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{service.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-blue-600 font-bold text-sm">التفاصيل <svg className="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg></span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-900 rounded-3xl p-10 text-center text-white">
          <h2 className="text-2xl font-extrabold mb-3">هل تحتاج إلى خدمتنا؟</h2>
          <p className="text-blue-100 mb-7">تواصل معنا الآن واحصل على استشارة مجانية</p>
          <a href={waLink} id="services-cta-whatsapp" target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base">واتساب مباشر</a>
        </div>
      </div>
    </div>
  )
}
