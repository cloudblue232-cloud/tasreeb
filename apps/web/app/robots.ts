import { MetadataRoute } from 'next'
import { SITE_URL } from '@saudi-leaks/shared/utils'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
