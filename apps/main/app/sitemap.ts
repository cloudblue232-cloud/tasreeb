import { createStaticClient } from '@/lib/supabase/static'
import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createStaticClient()
  const [{ data: articles }, { data: services }] = await Promise.all([
    supabase.from('articles').select('slug, updated_at').order('updated_at', { ascending: false }),
    supabase.from('services').select('slug, created_at').order('created_at', { ascending: false }),
  ])
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/articles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
  ]
  const articlePages: MetadataRoute.Sitemap = (articles ?? []).map(a => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: new Date(a.updated_at),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))
  const servicePages: MetadataRoute.Sitemap = (services ?? []).map(s => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: new Date(s.created_at),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))
  return [...staticPages, ...servicePages, ...articlePages]
}
