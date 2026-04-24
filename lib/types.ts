export type Article = {
  id: string
  title: string
  slug: string
  content: string
  image_url: string | null
  meta_title: string | null
  meta_description: string | null
  created_at: string
  updated_at: string
}

export type Service = {
  id: string
  title: string
  slug: string
  description: string
  image_url: string | null
  created_at: string
}

export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at'>
export type ArticleUpdate = Partial<ArticleInsert>

export type ServiceInsert = Omit<Service, 'id' | 'created_at'>
export type ServiceUpdate = Partial<ServiceInsert>
