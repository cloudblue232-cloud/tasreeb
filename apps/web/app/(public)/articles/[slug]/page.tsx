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
  const { data } = await supabase.from('articles').select('slug')
  return (data ?? []).map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: article } = await supabase.from('articles').select('title, meta_title, meta_description').eq('slug', slug).single()
  if (!article) return { title: 'المقال غير موجود' }
  return {
    title: article.meta_title || `${article.title} | كشف التسربات بالسعودية`,
    description: article.meta_description || undefined,
    alternates: { canonical: `${SITE_URL}/articles/${slug}` },
    openGraph: { title: article.meta_title || article.title, description: article.meta_description || undefined, type: 'article', locale: 'ar_SA' },
  }
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const [{ data: article }, { data: related }] = await Promise.all([
    supabase.from('articles').select('*').eq('slug', slug).single(),
    supabase.from('articles').select('id, title, slug, created_at').neq('slug', slug).order('created_at', { ascending: false }).limit(4),
  ])
  if (!article) notFound()

  const waLink = whatsappLink('مرحباً، قرأت مقالكم وأريد الاستفسار عن خدماتكم')
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'Article',
    headline: article.title, description: article.meta_description,
    datePublished: article.created_at, dateModified: article.updated_at,
    author: { '@type': 'Organization', name: 'كشف التسربات والعزل بالسعودية' },
    publisher: { '@type': 'Organization', name: 'كشف التسربات والعزل بالسعودية' },
    ...(article.image_url ? { image: article.image_url } : {}),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {article.image_url && (
        <div className="relative w-full h-72 sm:h-96">
          <Image src={article.image_url} alt={article.title} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-blue-600 transition-colors">المقالات</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium line-clamp-1">{article.title}</span>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <p className="text-sm text-gray-400 mb-3">{new Date(article.created_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">{article.title}</h1>
              <div className="prose-arabic" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            {related && related.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-900 mb-5">مقالات ذات صلة</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {related.map(r => (
                    <Link key={r.id} href={`/articles/${r.slug}`} className="group block bg-white rounded-xl border border-gray-100 p-4 hover:border-blue-200 shadow-sm transition-all">
                      <p className="text-xs text-gray-400 mb-1">{new Date(r.created_at).toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                      <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors text-sm leading-snug">{r.title}</h3>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <aside className="space-y-5">
            <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl p-6 text-white text-center sticky top-24">
              <div className="text-4xl mb-3">🛠️</div>
              <h3 className="font-extrabold text-lg mb-2">احتاج إلى مساعدة؟</h3>
              <p className="text-blue-100 text-sm mb-5 leading-relaxed">خبراؤنا جاهزون 24/7</p>
              <a href={`tel:${PHONE}`} id="article-sidebar-call-btn" className="btn-primary w-full justify-center mb-3 !rounded-xl">اتصل الآن</a>
              <a href={waLink} id="article-sidebar-wa-btn" target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center !rounded-xl">واتساب</a>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">تصفح خدماتنا</h3>
              <Link href="/services" className="btn-primary w-full justify-center !text-sm">جميع الخدمات</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
