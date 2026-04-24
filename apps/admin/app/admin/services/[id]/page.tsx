import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ServiceForm from '@/components/admin/ServiceForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'تعديل الخدمة | Admin' }

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditServicePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: service } = await supabase.from('services').select('*').eq('id', id).single()
  if (!service) notFound()
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <ServiceForm service={service} />
    </div>
  )
}
