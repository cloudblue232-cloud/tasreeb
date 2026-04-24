import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ArticleForm from '@/components/admin/ArticleForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'تعديل المقال | Admin' }

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditArticlePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: article } = await supabase.from('articles').select('*').eq('id', id).single()
  if (!article) notFound()
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <ArticleForm article={article} />
    </div>
  )
}
