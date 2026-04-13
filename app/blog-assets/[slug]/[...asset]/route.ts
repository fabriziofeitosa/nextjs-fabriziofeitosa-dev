import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const CONTENT_TYPES: Record<string, string> = {
  ".gif": "image/gif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

interface AssetRouteProps {
  params: Promise<{
    slug: string;
    asset: string[];
  }>;
}

export async function GET(_request: Request, { params }: AssetRouteProps) {
  const { slug, asset } = await params;
  const baseDir = path.join(CONTENT_DIR, slug);
  const filePath = path.join(baseDir, ...asset);
  const relativePath = path.relative(baseDir, filePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    notFound();
  }

  try {
    const file = await fs.readFile(filePath);
    const contentType =
      CONTENT_TYPES[path.extname(filePath).toLowerCase()] ??
      "application/octet-stream";

    return new Response(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    notFound();
  }
}
