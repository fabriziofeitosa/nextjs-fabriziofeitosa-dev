// app/sitemap.ts

import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getAllPosts, getTagCounts } from "@/lib/blog";
import { slugifyTag } from "@/lib/slug";
import { sortTagsByCount } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts();
  const sitemapPost: MetadataRoute.Sitemap = posts.map((post) => {
    return {
      url: `${siteConfig.url}/blog/${post.slug}`,
      priority: 1.0,
      changeFrequency: "daily",
      lastModified: post.date,
    };
  });
  const tags = getTagCounts();
  const sortedTags = sortTagsByCount(tags);

  const sitemapPostTags: MetadataRoute.Sitemap = sortedTags.map((tag) => {
    return {
      url: `${siteConfig.url}/tags/${slugifyTag(tag)}`,
      priority: 1.0,
      changeFrequency: "daily",
    };
  });

  return [
    {
      url: `${siteConfig.url}`,
      priority: 1.0,
      changeFrequency: "daily",
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/apps`,
      priority: 1.0,
      changeFrequency: "daily",
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/apps/password-generator`,
      priority: 1.0,
      changeFrequency: "daily",
      lastModified: new Date(),
    },
    {
      url: `${siteConfig.url}/tags`,
      priority: 1.0,
      changeFrequency: "daily",
      lastModified: new Date(),
    },
    ...sitemapPost,
    ...sitemapPostTags,
  ];
}
