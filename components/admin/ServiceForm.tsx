'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { slugify } from '@/lib/utils'
import ImageUpload from './ImageUpload'
import type { Service, ServiceInsert } from '@/lib/types'

interface ServiceFormProps {
  service?: Service
}

export default function ServiceForm({ service }: ServiceFormProps) {
  const isEdit = !!service
  const router = useRouter()

  const [title, setTitle] = useState(service?.title ?? '')
  const [slug, setSlug] = useState(service?.slug ?? '')
  const [description, setDescription] = useState(service?.description ?? '')
  const [imageUrl, setImageUrl] = useState(service?.image_url ?? '')
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
    const payload: ServiceInsert = {
      title,
      slug,
      description,
      image_url: imageUrl || null,
    }

    let err
    if (isEdit) {
      const { error: e } = await supabase.from('services').update(payload).eq('id', service.id)
      err = e
    } else {
      const { error: e } = await supabase.from('services').insert(payload)
      err = e
    }

    if (err) {
      setError(err.message)
      setLoading(false)
      return
    }

    router.push('/admin/services')
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
        <label htmlFor="service-title" className="block text-sm font-bold text-gray-700 mb-2">
          اسم الخدمة <span className="text-red-500">*</span>
        </label>
        <input
          id="service-title"
          type="text"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          required
          placeholder="مثال: كشف تسربات المياه"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
        />
      </div>

      {/* Slug */}
      <div>
        <label htmlFor="service-slug" className="block text-sm font-bold text-gray-700 mb-2">
          Slug (رابط الخدمة)
        </label>
        <input
          id="service-slug"
          type="text"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          required
          dir="ltr"
          placeholder="service-slug-here"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-left font-mono text-sm"
        />
        <p className="text-xs text-gray-400 mt-1">سيتم توليده تلقائياً من الاسم</p>
      </div>

      {/* Image */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">صورة الخدمة</label>
        <ImageUpload
          bucket="uploads"
          folder="services"
          currentUrl={imageUrl}
          onUpload={setImageUrl}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="service-desc" className="block text-sm font-bold text-gray-700 mb-2">
          وصف الخدمة <span className="text-red-500">*</span>
        </label>
        <textarea
          id="service-desc"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          rows={6}
          placeholder="أدخل وصفاً تفصيلياً للخدمة..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base resize-y leading-relaxed"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2">
        <button
          id="service-submit-btn"
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
          ) : isEdit ? '💾 حفظ التعديلات' : '✅ إضافة الخدمة'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/services')}
          className="px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
        >
          إلغاء
        </button>
      </div>
    </form>
  )
}
