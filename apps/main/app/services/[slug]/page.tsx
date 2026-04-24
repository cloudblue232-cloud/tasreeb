import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { SITE_URL } from '@/lib/utils'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: service } = await supabase
    .from('services')
    .select('title, description')
    .eq('slug', slug)
    .single()

  if (!service) return { title: 'الخدمة غير موجودة' }
  return {
    title: `${service.title} | كشف التسربات والعزل بالسعودية`,
    description: service.description.slice(0, 160),
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
  }
}

export default async function MainServiceDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const supabase = await createClient()
  const { data: service } = await supabase.from('services').select('*').eq('slug', slug).single()
  if (!service) notFound()

  return (
    <>
      <Header />
      <main>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-extrabold mb-6">{service.title}</h1>
          <p className="text-lg text-gray-700 leading-relaxed">{service.description}</p>
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
