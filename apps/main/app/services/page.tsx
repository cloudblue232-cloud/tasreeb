import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { whatsappLink } from '@/lib/utils'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'خدماتنا — كشف التسربات والعزل بالسعودية',
  description:
    'تعرف على جميع خدماتنا في كشف تسربات المياه، عزل الأسطح والخزانات والمسابح، ومعالجة الرطوبة في المملكة العربية السعودية.',
  alternates: { canonical: '/services' },
}

export default async function MainServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: true })
  const waLink = whatsappLink('مرحباً، أريد الاستفسار عن خدماتكم')

  return (
    <>
      <Header />
      <main>
        <div className="min-h-screen">
          <div className="bg-gradient-hero py-16 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">خدماتنا المتخصصة</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {!services || services.length === 0 ? (
              <p className="text-center text-gray-500 py-20">لا توجد خدمات متاحة حالياً</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, idx) => (
                  <article key={service.id} className="group">
                    <Link
                      href={`/services/${service.slug}`}
                      id={`service-page-card-${idx + 1}`}
                      aria-label={`عرض تفاصيل خدمة: ${service.title}`}
                      className="block card-hover bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:border-blue-200 h-full"
                    >
                      <div className="p-6">
                        <h2 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{service.description}</p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
            <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-900 rounded-3xl p-10 text-center text-white">
              <a href={waLink} id="services-cta-whatsapp" target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-base">
                تواصل عبر واتساب
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
