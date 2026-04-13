import type { MDXComponents } from "mdx/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  getAllPostSlugs,
  getPostBySlug,
  getPostSourceType,
  type Post,
} from "@/lib/blog";
import { cn } from "@/lib/utils";

import "@/styles/mdx.css";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

type ImageProps = ComponentPropsWithoutRef<"img">;

async function getPostFromParams(params: PostPageProps["params"]) {
  const { slug } = await params;
  return getPostBySlug(slug);
}

async function getPostContent(slug: string) {
  const sourceType = getPostSourceType(slug);

  if (sourceType === "file") {
    return (await import(`@/content/blog/${slug}.mdx`)).default;
  }

  if (sourceType === "directory") {
    return (await import(`@/content/blog/${slug}/index.mdx`)).default;
  }

  return null;
}

function getMdxComponents(post: Post): MDXComponents {
  return {
    img: ({ src, alt = "", ...props }: ImageProps) => {
      const imageSrc = getPostImageSrc(post.slug, src);

      // biome-ignore lint/performance/noImgElement: MDX image dimensions are not known at compile time.
      return <img src={imageSrc} alt={alt} {...props} />;
    },
  };
}

function getPostImageSrc(slug: string, src: ImageProps["src"]) {
  if (typeof src !== "string") {
    return src;
  }

  if (
    src.startsWith("/") ||
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("data:")
  ) {
    return src;
  }

  return `/blog-assets/${slug}/${src.replace(/^\.\//, "")}`;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `/blog/${post.slug}`,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/api/og?${ogSearchParams.toString()}`],
    },
  };
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPostSlugs().map((slug) => ({
    slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post) {
    notFound();
  }

  const PostContent = await getPostContent(post.slug);

  if (!PostContent) {
    notFound();
  }

  return (
    <article className="pb-6 prose dark:prose-invert">
      <hr className="mt-4 md:hidden border-foreground" />
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "mb-8 decoration-transparent",
        )}
      >
        Voltar
      </Link>
      <h1 className="mb-2 text-2xl font-bold" id="title">
        {post.title}
      </h1>
      {post.description ? (
        <p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
      ) : null}
      <hr className="my-4" />
      <PostContent components={getMdxComponents(post)} />
    </article>
  );
}
