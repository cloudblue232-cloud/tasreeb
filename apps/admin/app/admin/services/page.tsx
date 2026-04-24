import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import ConfirmDeleteButton from '@/components/admin/ConfirmDeleteButton'

export const metadata: Metadata = { title: 'إدارة الخدمات | Admin' }

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from('services')
    .select('id, title, slug, created_at')
    .order('created_at', { ascending: true })

  async function deleteService(formData: FormData) {
    'use server'
    const id = formData.get('id') as string
    const supabase = await createClient()
    await supabase.from('services').delete().eq('id', id)
    redirect('/admin/services')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">إدارة الخدمات</h1>
        <Link href="/admin/services/new" id="services-new-btn" className="btn-primary">➕ خدمة جديدة</Link>
      </div>
      <div className="space-y-3">
        {(services ?? []).map(service => (
          <div key={service.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between gap-3">
            <p className="font-semibold text-gray-900">{service.title}</p>
            <div className="flex items-center gap-2">
              <Link href={`/admin/services/${service.id}`} className="text-xs font-bold text-blue-600">تعديل</Link>
              <form action={deleteService}>
                <input type="hidden" name="id" value={service.id} />
                <ConfirmDeleteButton id={`delete-service-${service.id}`} confirmMessage="هل أنت متأكد من حذف هذه الخدمة؟" />
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
