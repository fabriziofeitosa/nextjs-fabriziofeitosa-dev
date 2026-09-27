import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import rehypePrettyCode from "rehype-pretty-code";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { siteRedirects } from "./lib/redirects";

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [[rehypePrettyCode, { theme: "github-dark" }]],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    useTypeScriptCli: false,
  },
  turbopack: {},
  redirects() {
    return siteRedirects;
  },
};

export default withMDX(nextConfig);
