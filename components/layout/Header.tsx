import Link from 'next/link'
import { PHONE, whatsappLink } from '@/lib/utils'

export default function Header() {
  const waLink = whatsappLink('مرحباً، أود الاستفسار عن خدماتكم')

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="الرئيسية">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-md group-hover:shadow-blue-300 transition-shadow">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="text-base font-800 text-blue-900 leading-tight font-cairo font-extrabold">كشف التسربات</p>
              <p className="text-xs text-blue-500 font-medium">والعزل بالسعودية</p>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="القائمة الرئيسية">
            <NavLink href="/">الرئيسية</NavLink>
            <NavLink href="/services">خدماتنا</NavLink>
            <NavLink href="/articles">المقالات</NavLink>
          </nav>

          {/* CTA buttons */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE}`}
              id="header-call-btn"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-blue-600 text-blue-700 font-bold text-sm hover:bg-blue-50 transition-colors"
              aria-label="اتصل بنا"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              اتصل الآن
            </a>
            <a
              href={waLink}
              id="header-whatsapp-btn"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp !py-2 !px-4 !text-sm"
              aria-label="تواصل عبر واتساب"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.529 5.845L0 24l6.335-1.502A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.893 9.893 0 01-5.034-1.371l-.361-.214-3.741.887.938-3.633-.236-.374A9.876 9.876 0 012.106 12C2.106 6.533 6.533 2.106 12 2.106S21.894 6.533 21.894 12 17.467 21.894 12 21.894z"/>
              </svg>
              واتساب
            </a>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-blue-50 bg-white">
        <div className="flex justify-around py-2">
          <MobileNavLink href="/">الرئيسية</MobileNavLink>
          <MobileNavLink href="/services">خدماتنا</MobileNavLink>
          <MobileNavLink href="/articles">المقالات</MobileNavLink>
          <a href={`tel:${PHONE}`} className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-blue-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-xs font-medium">اتصال</span>
          </a>
        </div>
      </div>
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 rounded-lg text-gray-700 font-semibold hover:text-blue-700 hover:bg-blue-50 transition-all text-sm"
    >
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-gray-600 hover:text-blue-600"
    >
      <span className="text-xs font-medium">{children}</span>
    </Link>
  )
}
