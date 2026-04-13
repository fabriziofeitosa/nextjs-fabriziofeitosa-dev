import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // outras opções de Next aqui...
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {},
};

export default withMDX(nextConfig);
