'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import ImageUpload from './ImageUpload'
import type { Article, ArticleInsert } from '@/lib/types'

interface ArticleFormProps {
  article?: Article
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const isEdit = !!article
  const router = useRouter()

  const [title, setTitle] = useState(article?.title ?? '')
  const [slug, setSlug] = useState(article?.slug ?? '')
  const [content, setContent] = useState(article?.content ?? '')
  const [imageUrl, setImageUrl] = useState(article?.image_url ?? '')
  const [metaTitle, setMetaTitle] = useState(article?.meta_title ?? '')
  const [metaDescription, setMetaDescription] = useState(article?.meta_description ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleTitleChange(val: string) {
    setTitle(val)
    if (!isEdit) setSlug(slugify(val))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const payload: ArticleInsert = {
      title,
      slug,
      content,
      image_url: imageUrl || null,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
    }

    let err
    if (isEdit) {
      const { error: e } = await supabase.from('articles').update(payload).eq('id', article.id)
      err = e
    } else {
      const { error: e } = await supabase.from('articles').insert(payload)
      err = e
    }

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    router.push('/admin/articles')
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="article-title" className="block text-sm font-bold text-gray-700 mb-2">
          عنوان المقال <span className="text-red-500">*</span>
        </label>
        <input
          id="article-title"
          type="text"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          required
          placeholder="أدخل عنوان المقال..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="article-slug" className="block text-sm font-bold text-gray-700 mb-2">
          Slug (رابط المقال)
        </label>
        <input
          id="article-slug"
          type="text"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          required
          dir="ltr"
          placeholder="article-slug-here"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left font-mono text-sm"
        />
        <p className="text-xs text-gray-400 mt-1">سيتم توليده تلقائياً من العنوان</p>
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">صورة المقال</label>
        <ImageUpload
          bucket="uploads"
          folder="articles"
          currentUrl={imageUrl}
          onUpload={setImageUrl}
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="article-content" className="block text-sm font-bold text-gray-700 mb-2">
          محتوى المقال (HTML) <span className="text-red-500">*</span>
        </label>
        <textarea
          id="article-content"
          value={content}
          onChange={e => setContent(e.target.value)}
          required
          rows={16}
          placeholder="<h2>عنوان فرعي</h2><p>محتوى المقال...</p>"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-y"
          dir="auto"
        />
        <p className="text-xs text-gray-400 mt-1">يدعم HTML: h2, h3, p, ul, ol, li, strong</p>
      </div>

      {/* SEO */}
      <div className="bg-blue-50 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-blue-900 mb-4">⚡ إعدادات SEO</h3>
        <div>
          <label htmlFor="article-meta-title" className="block text-sm font-bold text-gray-700 mb-2">
            Meta Title
          </label>
          <input
            id="article-meta-title"
            type="text"
            value={metaTitle}
            onChange={e => setMetaTitle(e.target.value)}
            placeholder="عنوان الصفحة في محركات البحث (60 حرف)"
            maxLength={70}
            className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">{metaTitle.length}/70</p>
        </div>
        <div>
          <label htmlFor="article-meta-desc" className="block text-sm font-bold text-gray-700 mb-2">
            Meta Description
          </label>
          <textarea
            id="article-meta-desc"
            value={metaDescription}
            onChange={e => setMetaDescription(e.target.value)}
            placeholder="وصف الصفحة في محركات البحث (160 حرف)"
            maxLength={170}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">{metaDescription.length}/170</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          id="article-submit-btn"
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              جاري الحفظ...
            </>
          ) : isEdit ? '💾 حفظ التعديلات' : '✅ نشر المقال'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/articles')}
          className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
        >
          إلغاء
        </button>
      </div>
    </form>
  )
}
