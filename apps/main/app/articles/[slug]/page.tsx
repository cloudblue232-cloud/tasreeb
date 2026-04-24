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
  const { data: article } = await supabase
    .from('articles')
    .select('title, meta_title, meta_description')
    .eq('slug', slug)
    .single()

  if (!article) return { title: 'المقال غير موجود' }
  return {
    title: article.meta_title || `${article.title} | كشف التسربات بالسعودية`,
    description: article.meta_description || undefined,
    alternates: { canonical: `${SITE_URL}/articles/${slug}` },
  }
}

export default async function MainArticleDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const supabase = await createClient()
  const { data: article } = await supabase.from('articles').select('*').eq('slug', slug).single()
  if (!article) notFound()

  return (
    <>
      <Header />
      <main>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-extrabold mb-6">{article.title}</h1>
          <div className="prose-arabic" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
