import { posts } from "#site/content";
import { PostItem } from "@/components/post-item";
import { QueryPagination } from "@/components/query-pagination";
import { sortPosts } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

const POSTS_PER_PAGE = 4;

interface BlogPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const sortedPosts = sortPosts(posts.filter((post) => post.published));
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE);

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (currentPage - 1),
    POSTS_PER_PAGE * currentPage
  );

  return (
    <section>
      <div className="page-header space-y-4">
        <h1 className="inline-block font-black text-4xl">Blog</h1>
        <p className="text-xl text-muted-foreground">
          Aqui eu posto de tudo um pouco. Fique a vontade!
        </p>
      </div>
      <hr className="mt-8" />
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
      <QueryPagination totalPages={totalPages} className="mt-5" />
    </section>
  );
}
