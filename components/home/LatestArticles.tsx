import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/lib/types'
import { stripHtml, truncate } from '@/lib/utils'

interface LatestArticlesProps {
  articles: Article[]
}

export default function LatestArticles({ articles }: LatestArticlesProps) {
  if (!articles.length) return null

  const [featured, ...rest] = articles.slice(0, 4)

  return (
    <section
      id="latest-articles"
      className="py-20 bg-white"
      aria-labelledby="articles-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-bold px-4 py-2 rounded-full mb-4">
            📚 أحدث المقالات
          </div>
          <h2 id="articles-title" className="section-title">مقالات ونصائح متخصصة</h2>
          <p className="section-subtitle">
            محتوى احترافي لمساعدتك على فهم مشاكل التسربات والعزل واتخاذ القرار الصحيح
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured article */}
          {featured && (
            <Link
              href={`/articles/${featured.slug}`}
              id="featured-article-card"
              className="group block lg:row-span-2"
              aria-label={`قراءة المقال: ${featured.title}`}
            >
              <article className="card-hover bg-white rounded-2xl border border-gray-100 overflow-hidden h-full shadow-sm hover:border-blue-200">
                <div className="relative w-full h-56 bg-gradient-to-br from-blue-100 to-blue-200">
                  {featured.image_url ? (
                    <Image
                      src={featured.image_url}
                      alt={featured.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl opacity-40">📰</span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">مميز</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-xs text-gray-400 mb-3">
                    {new Date(featured.created_at).toLocaleDateString('ar-SA', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {truncate(stripHtml(featured.content), 140)}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-blue-600 font-bold text-sm">
                    <span>اقرأ المقال كاملاً</span>
                    <svg className="w-4 h-4 rotate-180" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          )}

          {/* Other articles */}
          {rest.map((article, idx) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              id={`article-card-${idx + 2}`}
              className="group block"
              aria-label={`قراءة المقال: ${article.title}`}
            >
              <article className="card-hover bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:border-blue-200 flex gap-4 p-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-blue-50 flex-shrink-0">
                  {article.image_url ? (
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-40">📄</div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 mb-1">
                    {new Date(article.created_at).toLocaleDateString('ar-SA', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    })}
                  </p>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors text-base leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2">
                    {truncate(stripHtml(article.content), 80)}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/articles" id="articles-see-all-btn" className="btn-primary inline-flex">
            جميع المقالات
            <svg className="w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
