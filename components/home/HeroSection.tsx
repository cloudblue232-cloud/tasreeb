import { PHONE, whatsappLink } from '@/lib/utils'

export default function HeroSection() {
  const waLink = whatsappLink('مرحباً، أود الاستفسار عن خدماتكم في كشف التسربات')

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center bg-gradient-hero overflow-hidden"
      aria-label="القسم الرئيسي"
    >
      {/* Decorative bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-sky-300/10 blur-2xl" />
        {/* Water drop animation */}
        <div className="absolute top-16 left-16 text-white/10 text-9xl select-none animate-bounce" style={{ animationDuration: '3s' }}>
          💧
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-semibold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              متاحون على مدار الساعة ٧ أيام في الأسبوع
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              كشف تسربات المياه
              <span className="block text-yellow-400 mt-2">وعزل احترافي</span>
              <span className="block text-blue-200 text-3xl sm:text-4xl mt-2 font-bold">في المملكة العربية السعودية</span>
            </h1>

            <p className="text-lg text-blue-100 leading-relaxed mb-10 max-w-xl">
              نكشف التسربات الخفية ونعزل أسطحك وخزاناتك بأحدث التقنيات وأفضل المواد.
              خبرة تزيد عن <strong className="text-yellow-400">15 عاماً</strong> في خدمة المنازل والمنشآت التجارية.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-end">
              <a
                href={`tel:${PHONE}`}
                id="hero-call-btn"
                className="btn-primary text-base px-6 py-4"
                aria-label="اتصل بنا الآن"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                اتصل الآن — مجاناً
              </a>
              <a
                href={waLink}
                id="hero-whatsapp-btn"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-base px-6 py-4"
                aria-label="تواصل عبر واتساب"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.529 5.845L0 24l6.335-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.034-1.371l-.361-.214-3.741.887.938-3.633-.236-.374A9.876 9.876 0 012.106 12C2.106 6.533 6.533 2.106 12 2.106S21.894 6.533 21.894 12 17.467 21.894 12 21.894z"/>
                </svg>
                واتساب مباشر
              </a>
            </div>
          </div>

          {/* Stats panel */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '+5000', label: 'عميل راضٍ', icon: '👥' },
              { num: '+15', label: 'سنة خبرة', icon: '⭐' },
              { num: '95%', label: 'نسبة رضا العملاء', icon: '✅' },
              { num: '24/7', label: 'خدمة طوارئ', icon: '🚨' },
            ].map(stat => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-white mb-1" dir="ltr">{stat.num}</div>
                <div className="text-blue-200 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 40L60 46.7C120 53.3 240 66.7 360 63.3C480 60 600 40 720 33.3C840 26.7 960 33.3 1080 40C1200 46.7 1320 53.3 1380 56.7L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V40Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
