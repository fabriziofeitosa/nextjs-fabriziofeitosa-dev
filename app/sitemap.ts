// app/sitemap.ts

import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getAllPosts, getIndexableTags } from "@/lib/blog";
import { slugifyTag } from "@/lib/slug";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getAllPosts();
  const sitemapPost: MetadataRoute.Sitemap = posts.map((post) => {
    return {
      url: `${siteConfig.url}/blog/${post.slug}`,
      priority: 1.0,
      changeFrequency: "monthly",
      lastModified: post.date,
    };
  });
  const indexableTags = getIndexableTags();

  const sitemapPostTags: MetadataRoute.Sitemap = indexableTags.map((tag) => {
    return {
      url: `${siteConfig.url}/tags/${slugifyTag(tag)}`,
      priority: 0.5,
      changeFrequency: "monthly",
    };
  });

  return [
    {
      url: `${siteConfig.url}`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${siteConfig.url}/apps`,
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      url: `${siteConfig.url}/apps/password-generator`,
      priority: 0.6,
      changeFrequency: "monthly",
    },
    {
      url: `${siteConfig.url}/blog`,
      priority: 0.8,
      changeFrequency: "weekly",
    },
    {
      url: `${siteConfig.url}/tags`,
      priority: 0.5,
      changeFrequency: "monthly",
    },
    ...sitemapPost,
    ...sitemapPostTags,
  ];
}
