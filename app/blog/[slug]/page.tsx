import { Calendar, Clock } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { CodeBlock } from "@/components/code-block";
import { Tag } from "@/components/tag";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  getAllPostSlugs,
  getPostBySlug,
  getPostSourceType,
  type Post,
} from "@/lib/blog";
import { cn, formatDate } from "@/lib/utils";

import "@/styles/mdx.css";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

type ImageProps = ComponentPropsWithoutRef<"img">;

type BlogPostingJsonLd = {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  author: {
    "@type": "Person";
    name: string;
    sameAs: string[];
    url: string;
  };
  datePublished: string;
  description: string;
  headline: string;
  image: string;
  inLanguage: "pt-BR";
  keywords: string[];
  mainEntityOfPage: {
    "@id": string;
    "@type": "WebPage";
  };
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  url: string;
};

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
    pre: CodeBlock,
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

function getPostUrl(slug: string): string {
  return new URL(`/blog/${slug}`, siteConfig.url).toString();
}

function getOgImageUrl(title: string): string {
  const searchParams = new URLSearchParams({ title });

  return new URL(
    `/api/og?${searchParams.toString()}`,
    siteConfig.url,
  ).toString();
}

function getBlogPostingJsonLd(post: Post): BlogPostingJsonLd {
  const url = getPostUrl(post.slug);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    author: {
      "@type": "Person",
      name: siteConfig.author,
      sameAs: Object.values(siteConfig.links),
      url: siteConfig.url,
    },
    datePublished: post.date,
    description: post.description,
    headline: post.title,
    image: getOgImageUrl(post.title),
    inLanguage: "pt-BR",
    keywords: post.tags,
    mainEntityOfPage: {
      "@id": url,
      "@type": "WebPage",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url,
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const url = getPostUrl(post.slug);
  const image = getOgImageUrl(post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      images: [
        {
          url: image,
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
      images: [image],
    },
  };
}

export function generateStaticParams(): Array<{ slug: string }> {
  return getAllPostSlugs().map((slug) => ({
    slug,
  }));
}

export const dynamicParams = false;

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
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must be emitted as JSON, and the content is escaped below.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBlogPostingJsonLd(post)).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />
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
      <dl className="not-prose mt-4 flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground text-sm">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Publicado em</dt>
          <dd className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Tempo de leitura</dt>
          <dd className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readingTimeMinutes} min de leitura
          </dd>
        </div>
      </dl>
      <hr className="my-4" />
      <PostContent components={getMdxComponents(post)} />
      {post.tags.length > 0 ? (
        <footer className="not-prose mt-10 border-border border-t pt-6">
          <h2 className="mb-3 font-semibold text-base">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Tag tag={tag} key={tag} />
            ))}
          </div>
        </footer>
      ) : null}
    </article>
  );
}
