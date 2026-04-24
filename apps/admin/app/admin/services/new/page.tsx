import ServiceForm from '@/components/admin/ServiceForm'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'خدمة جديدة | Admin' }

export default function NewServicePage() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
      <ServiceForm />
    </div>
  )
}
