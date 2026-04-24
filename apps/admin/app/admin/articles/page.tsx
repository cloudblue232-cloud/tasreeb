import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton'

export const metadata: Metadata = { title: 'إدارة المقالات | Admin' }

export default async function AdminArticlesPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('articles')
    .select('id, title, slug, created_at, updated_at')
    .order('created_at', { ascending: false })

  async function deleteArticle(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const supabase = await createClient()
    await supabase.from('articles').delete().eq('id', id)
    redirect('/admin/articles')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">إدارة المقالات</h1>
        <Link href="/admin/articles/new" id="articles-new-btn" className="btn-primary">➕ مقال جديد</Link>
      </div>
      <div className="space-y-3">
        {(articles ?? []).map(article => (
          <div key={article.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-3">
            <p className="font-semibold text-gray-900">{article.title}</p>
            <div className="flex items-center gap-2">
              <Link href={`/admin/articles/${article.id}`} className="text-xs font-bold text-blue-600">تعديل</Link>
              <form action={deleteArticle}>
                <input type="hidden" name="id" value={article.id} />
                <ConfirmDeleteButton id={`delete-article-${article.id}`} confirmMessage="هل أنت متأكد من حذف هذا المقال؟" />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
