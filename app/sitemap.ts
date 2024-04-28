// app/sitemap.ts

import { MetadataRoute } from 'next'

import { posts } from '#site/content'
import { siteConfig } from '@/config/site'
import { getAllTags, sortTagsByCount } from '@/lib/utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapPost: MetadataRoute.Sitemap = posts.map((post) => {
    return {
      url: `${siteConfig.url}/blog/${post.slugAsParams}`,
      priority: 1.0,
      changeFrequency: 'daily',
      lastModified: post.date
    }
  });
  const tags = getAllTags(posts)
  const sortedTags = sortTagsByCount(tags)

  const sitemapPostTags: MetadataRoute.Sitemap = sortedTags.map((tag) => {
    return {
      url: `${siteConfig.url}/tags/${tag}`,
      priority: 1.0,
      changeFrequency: 'daily'
    }
  })

  return [
    {
      url: `${siteConfig.url}`,
      priority: 1.0,
      changeFrequency: 'daily',
      lastModified: new Date()
    },
    {
      url: `${siteConfig.url}/tags`,
      priority: 1.0,
      changeFrequency: 'daily',
      lastModified: new Date()
    },
    ...sitemapPost,
    // ...sitemapPostTags
  ]
}