import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { slugifyTag } from "@/lib/slug";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const BLOG_TIME_ZONE_OFFSET = "-03:00";
const WORDS_PER_MINUTE = 200;

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  tags: string[];
  content: string;
  readingTimeMinutes: number;
};

type PostSourceType = "file" | "directory";

type PostSource = {
  filePath: string;
  slug: string;
  type: PostSourceType;
};

type Frontmatter = {
  title?: unknown;
  description?: unknown;
  date?: unknown;
  published?: unknown;
  tags?: unknown;
};

let postsCache: Post[] | null = null;
let sourceCache: Map<string, PostSourceType> | null = null;

export { slugifyTag };

export function getAllPosts(): Post[] {
  return readPosts()
    .filter((post) => post.published)
    .sort(sortByDateDesc);
}

export function getAllPostSlugs(): string[] {
  return readPosts().map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post | null {
  const normalizedSlug = normalizeSlug(slug);
  return readPosts().find((post) => post.slug === normalizedSlug) ?? null;
}

export function getAllTags(): string[] {
  return Array.from(new Set(getAllPosts().flatMap((post) => post.tags))).sort(
    (a, b) => a.localeCompare(b),
  );
}

export function getTagCounts(): Record<string, number> {
  return getAllPosts().reduce<Record<string, number>>((acc, post) => {
    for (const tag of post.tags) {
      acc[tag] = (acc[tag] ?? 0) + 1;
    }

    return acc;
  }, {});
}

export function getPostsByTag(tag: string): Post[] {
  const normalizedTag = slugifyTag(tag);

  return getAllPosts().filter((post) =>
    post.tags.some((postTag) => slugifyTag(postTag) === normalizedTag),
  );
}

export function getPostSourceType(slug: string): PostSourceType | null {
  readPosts();
  return sourceCache?.get(normalizeSlug(slug)) ?? null;
}

function readPosts(): Post[] {
  if (postsCache) {
    return postsCache;
  }

  const sources = getPostSources();
  sourceCache = new Map(sources.map((source) => [source.slug, source.type]));
  postsCache = sources.map(readPostSource).sort(sortByDateDesc);

  return postsCache;
}

function getPostSources(): PostSource[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR, { withFileTypes: true })
    .flatMap<PostSource>((entry) => {
      const entryPath = path.join(BLOG_DIR, entry.name);

      if (entry.isFile() && entry.name.endsWith(".mdx")) {
        return [
          {
            filePath: entryPath,
            slug: entry.name.replace(/\.mdx$/, ""),
            type: "file",
          },
        ];
      }

      if (entry.isDirectory()) {
        const indexPath = path.join(entryPath, "index.mdx");

        if (fs.existsSync(indexPath)) {
          return [
            {
              filePath: indexPath,
              slug: entry.name,
              type: "directory",
            },
          ];
        }
      }

      return [];
    });
}

function readPostSource(source: PostSource): Post {
  const file = fs.readFileSync(source.filePath, "utf8");
  const { content, data } = matter(file);
  const frontmatter = data as Frontmatter;

  return {
    slug: source.slug,
    title: readString(frontmatter.title, source.slug),
    description: readString(frontmatter.description, ""),
    date: readDate(frontmatter.date),
    published:
      typeof frontmatter.published === "boolean" ? frontmatter.published : true,
    tags: readTags(frontmatter.tags),
    content,
    readingTimeMinutes: calculateReadingTime(content),
  };
}

function calculateReadingTime(content: string): number {
  const text = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_~>|[\]()-]/g, " ");

  const wordCount = text.match(/\S+/g)?.length ?? 0;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

function readString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function readDate(value: unknown): string {
  if (value instanceof Date) {
    return formatFrontmatterDate(value);
  }

  if (typeof value === "string") {
    return value;
  }

  return "";
}

function formatFrontmatterDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = padDatePart(date.getUTCMonth() + 1);
  const day = padDatePart(date.getUTCDate());
  const hours = padDatePart(date.getUTCHours());
  const minutes = padDatePart(date.getUTCMinutes());
  const seconds = padDatePart(date.getUTCSeconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${BLOG_TIME_ZONE_OFFSET}`;
}

function padDatePart(value: number): string {
  return String(value).padStart(2, "0");
}

function readTags(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((tag): tag is string => typeof tag === "string")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);
}

function sortByDateDesc(a: Post, b: Post): number {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0;
}

function normalizeSlug(slug: string): string {
  return slug.replace(/^\/?blog\//, "").replace(/^\/+|\/+$/g, "");
}
