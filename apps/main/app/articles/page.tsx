import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp'
import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import { stripHtml, truncate } from '@/lib/utils'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'المقالات — كشف التسربات والعزل بالسعودية',
  description:
    'مقالات ونصائح احترافية حول كشف تسربات المياه، عزل الأسطح والخزانات، ومعالجة الرطوبة في المملكة العربية السعودية.',
  alternates: { canonical: '/articles' },
}

export default async function MainArticlesPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <>
      <Header />
      <main>
        <div className="min-h-screen">
          <div className="bg-gradient-hero py-16 text-center relative overflow-hidden">
            <div className="relative max-w-4xl mx-auto px-4">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">المقالات والنصائح</h1>
              <p className="text-blue-100 text-lg max-w-2xl mx-auto">
                محتوى متخصص يساعدك على الكشف المبكر عن التسربات واتخاذ القرار الصحيح
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {!articles || articles.length === 0 ? (
              <p className="text-center text-gray-500 py-20">لا توجد مقالات متاحة حالياً</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, idx) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    id={`article-list-card-${idx + 1}`}
                    className="group block"
                    aria-label={`قراءة مقال: ${article.title}`}
                  >
                    <article className="card-hover bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:border-blue-200 h-full flex flex-col">
                      <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-100">
                        {article.image_url ? (
                          <Image
                            src={article.image_url}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-25">📰</div>
                        )}
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-snug flex-1">
                          {article.title}
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                          {truncate(stripHtml(article.content), 120)}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
