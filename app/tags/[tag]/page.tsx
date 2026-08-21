import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostItem } from "@/components/post-item";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import {
  getAllTags,
  getPostsByTag,
  getTagCounts,
  MINIMUM_POSTS_FOR_INDEXABLE_TAG,
} from "@/lib/blog";
import { slugifyTag } from "@/lib/slug";
import { sortTagsByCount } from "@/lib/utils";

interface TagPageParams {
  tag: string;
}

interface TagPageProps {
  params: Promise<TagPageParams>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<TagPageParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const tag = resolvedParams?.tag ?? "";
  const normalizedTag = slugifyTag(tag);
  const postCount = getPostsByTag(normalizedTag).length;
  const title = normalizedTag.split("-").join(" ");

  return {
    title: `Postagens relacionadas a "${title}" - FabrizioFeitosa.Dev`,
    description: `Postagens relacionadas a ${title}.`,
    alternates: {
      canonical: new URL(`/tags/${normalizedTag}`, siteConfig.url).toString(),
    },
    robots:
      postCount < MINIMUM_POSTS_FOR_INDEXABLE_TAG
        ? { follow: true, index: false }
        : undefined,
  };
}

export const generateStaticParams = () => {
  const tags = getAllTags();
  const paths = tags.map((tag) => ({ tag: slugifyTag(tag) }));
  return paths;
};

export const dynamicParams = false;

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params;
  const tag = resolvedParams?.tag ?? "";
  const displayPosts = getPostsByTag(tag);

  if (displayPosts.length === 0) {
    notFound();
  }

  const title = slugifyTag(tag).split("-").join(" ");
  const tags = getTagCounts();
  const sortedTags = sortTagsByCount(tags);

  return (
    <section>
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl capitalize">
            {title}
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-8">
        <div>
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const { slug, date, title, description, tags } = post;
                return (
                  <li key={slug}>
                    <PostItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
        </div>
        <Card className="h-fit mt-8">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((t) => (
              <Tag
                tag={t}
                key={t}
                count={tags[t]}
                current={slugifyTag(t) === tag}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
