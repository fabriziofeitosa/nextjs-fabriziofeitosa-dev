import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { sortPosts } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

interface LatestPostsProps {
  qtdPosts?: number;
}

export default async function LatestPosts({ qtdPosts = 4 }: LatestPostsProps) {
  // Somentes posts publicados
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  // Limitando postagens por página
  const displayPosts = sortedPosts.slice(0, qtdPosts);

  return (
    <section>
      {displayPosts?.length > 0 ? (
        <ul className="flex flex-col">
          {displayPosts.map((post) => {
            const { slug, title, description, date } = post;
            return (
              <li key={slug}>
                <PostItem
                  slug={slug}
                  title={title}
                  description={description}
                  date={date}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="p-3 mt-3 border-2 flex items-center">
          <TriangleAlert className="w-6 h-6 inline-block me-3" />
          Ops! Parece que não há postagens publicadas.
        </p>
      )}
    </section>
  );
}
