import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'لوحة التحكم | Admin' }

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [{ count: articlesCount }, { count: servicesCount }] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('services').select('*', { count: 'exact', head: true }),
  ])

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">لوحة التحكم</h1>
      <div className="flex flex-wrap gap-4">
        <Link href="/admin/articles" className="btn-primary">المقالات ({articlesCount ?? 0})</Link>
        <Link href="/admin/services" className="btn-primary !bg-indigo-600 hover:!bg-indigo-700">الخدمات ({servicesCount ?? 0})</Link>
      </div>
    </div>
  )
}
