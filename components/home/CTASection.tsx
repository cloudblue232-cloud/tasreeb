import { PHONE, whatsappLink } from '@/lib/utils'

export default function CTASection() {
  const waLink = whatsappLink('مرحباً، أريد طلب فحص مجاني للكشف عن التسربات')

  return (
    <>
      {/* Trust badges */}
      <section className="py-14 bg-blue-50" aria-label="مميزاتنا">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '🏆', title: 'ضمان الجودة', desc: 'ضمان حتى 10 سنوات على أعمال العزل' },
              { icon: '⚡', title: 'استجابة فورية', desc: 'نصل إليك خلال ساعة في حالات الطوارئ' },
              { icon: '🔬', title: 'تقنية متقدمة', desc: 'أجهزة كشف إلكترونية حديثة بدون تكسير' },
              { icon: '💰', title: 'أسعار تنافسية', desc: 'أفضل الأسعار مع أعلى معايير الجودة' },
            ].map(item => (
              <div key={item.title} className="text-center p-5 bg-white rounded-2xl shadow-sm border border-blue-100">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-blue-900 mb-1 text-base">{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main CTA */}
      <section
        className="py-20 bg-gradient-hero relative overflow-hidden"
        aria-label="تواصل معنا"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6">
            احصل على فحص مجاني اليوم
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            لا تترك التسربات الخفية تدمر منزلك! تواصل معنا الآن واحصل على فحص شامل مجاني
            مع تقرير تفصيلي ومقترح العلاج المناسب.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`tel:${PHONE}`}
              id="cta-call-btn"
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
              aria-label="اتصل بنا الآن للحصول على فحص مجاني"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              📞 اتصل الآن — مجاناً
            </a>
            <a
              href={waLink}
              id="cta-whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp text-lg px-8 py-4 w-full sm:w-auto"
              aria-label="تواصل عبر واتساب"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.529 5.845L0 24l6.335-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.034-1.371l-.361-.214-3.741.887.938-3.633-.236-.374A9.876 9.876 0 012.106 12C2.106 6.533 6.533 2.106 12 2.106S21.894 6.533 21.894 12 17.467 21.894 12 21.894z"/>
              </svg>
              تواصل عبر واتساب
            </a>
          </div>

          <p className="text-blue-200 text-sm mt-6">
            ✅ الفحص مجاني — ✅ بدون التزام — ✅ خبراء معتمدون
          </p>
        </div>
      </section>
    </>
  )
}
