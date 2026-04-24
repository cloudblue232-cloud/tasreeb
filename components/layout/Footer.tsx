import Link from 'next/link'
import { PHONE, WHATSAPP, whatsappLink, SITE_NAME } from '@/lib/utils'

export default function Footer() {
  const waLink = whatsappLink('مرحباً، أود الاستفسار عن خدماتكم')
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-blue-950 to-slate-950 text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <p className="font-extrabold text-lg text-white">كشف التسربات</p>
                <p className="text-blue-300 text-sm">والعزل بالسعودية</p>
              </div>
            </div>
            <p className="text-blue-200 leading-relaxed text-sm">
              متخصصون في كشف تسربات المياه وعزل الأسطح والخزانات في جميع أنحاء المملكة العربية السعودية. خدمة احترافية بضمان.
            </p>
            {/* Contact */}
            <div className="mt-6 space-y-3">
              <a href={`tel:${PHONE}`} className="flex items-center gap-3 text-blue-200 hover:text-white transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-800/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="font-semibold" dir="ltr">{PHONE}</span>
              </a>
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-green-300 hover:text-green-200 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-green-800/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.529 5.845L0 24l6.335-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.034-1.371l-.361-.214-3.741.887.938-3.633-.236-.374A9.876 9.876 0 012.106 12C2.106 6.533 6.533 2.106 12 2.106S21.894 6.533 21.894 12 17.467 21.894 12 21.894z"/>
                  </svg>
                </div>
                <span className="font-semibold">واتساب مباشر</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-white mb-5 text-lg border-b border-blue-800 pb-3">روابط سريعة</h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'الرئيسية' },
                { href: '/services', label: 'خدماتنا' },
                { href: '/articles', label: 'المقالات' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors text-sm">
                    <svg className="w-3 h-3 text-blue-400 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-5 text-lg border-b border-blue-800 pb-3">خدماتنا</h3>
            <ul className="space-y-3 text-sm text-blue-200">
              {['كشف تسربات المياه', 'عزل الأسطح والجدران', 'عزل الخزانات والمسابح', 'كشف تسربات الغاز', 'معالجة الرطوبة', 'إصلاح تسربات السباكة'].map(s => (
                <li key={s} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-900/50 py-5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-blue-300 text-sm">
            جميع الحقوق محفوظة © {year} | {SITE_NAME}
          </p>
        </div>
      </div>
    </footer>
  )
}
