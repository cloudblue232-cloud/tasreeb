import ArticleForm from '@/components/admin/ArticleForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'مقال جديد | Admin' }

export default function NewArticlePage() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <ArticleForm />
    </div>
  )
}
