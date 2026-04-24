import Link from 'next/link'
import Image from 'next/image'
import { Service } from '@/lib/types'

interface ServicesPreviewProps {
  services: Service[]
}

const serviceIcons: Record<string, string> = {
  'kashf-tasaroubat-almaya': '🔍',
  'azl-alsotouh-waljedran': '🏗️',
  'azl-alkhazanat-walmasabeh': '🏊',
  'kashf-tasaroubat-algaz': '⚠️',
  'moualajat-alrotuba-wa-izalat-alaofoun': '💧',
  'syanat-wa-islah-tasaroubat-alsibaka': '🔧',
}

export default function ServicesPreview({ services }: ServicesPreviewProps) {
  const displayed = services.slice(0, 6)

  return (
    <section
      id="services-preview"
      className="py-20 bg-gradient-section"
      aria-labelledby="services-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-bold px-4 py-2 rounded-full mb-4">
            🛠️ خدماتنا المتخصصة
          </div>
          <h2 id="services-title" className="section-title">حلول شاملة لكشف التسربات والعزل</h2>
          <p className="section-subtitle">
            نقدم مجموعة متكاملة من الخدمات الاحترافية لحماية منزلك ومنشأتك من أضرار المياه والحرارة
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((service, idx) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              id={`service-card-${idx + 1}`}
              className="group block"
              aria-label={`عرض خدمة: ${service.title}`}
            >
              <div className="card-hover bg-white rounded-2xl p-6 border border-blue-50 h-full shadow-sm hover:border-blue-200">
                {/* Image or icon */}
                {service.image_url ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-5">
                    <Image
                      src={service.image_url}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-5">
                    <span className="text-6xl">
                      {serviceIcons[service.slug] || '🔧'}
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-blue-600 font-bold text-sm">
                  <span>اعرف المزيد</span>
                  <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See all */}
        <div className="text-center mt-12">
          <Link href="/services" id="services-see-all-btn" className="btn-primary inline-flex">
            عرض جميع الخدمات
            <svg className="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
