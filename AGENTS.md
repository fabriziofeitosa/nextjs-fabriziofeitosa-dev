# AGENTS.md

## Project Overview

This is a personal site built with Next.js App Router, React, TypeScript, Tailwind CSS, and local MDX blog content.

The blog uses local files under `content/blog`:

- `content/blog/<slug>.mdx`
- `content/blog/<slug>/index.mdx` for posts with colocated assets

Do not reintroduce Velite, Contentlayer, or a CMS.

## Commands

- `npm run dev`: start Next.js with webpack
- `npm run build`: production build with webpack
- `npm run lint`: run Biome checks
- `npm run format`: format with Biome
- `npx tsc --noEmit`: run TypeScript checks

Use Biome as the project formatter and linter. Do not add Prettier or ESLint config back.

## Blog Rules

Blog metadata is read by `lib/blog.ts` with `gray-matter`. Posts must use this frontmatter:

```mdx
---
title: "Title"
description: "Description"
date: YYYY-MM-DD
published: true
tags: ["tag"]
---
```

Rules:

- Keep slugs lowercase, hyphenated, and accent-free.
- Use `published: false` for drafts. Drafts are accessible by direct URL but excluded from lists, tags, and sitemap.
- Keep tags lowercase. Prefer existing tags when possible.
- Use folder posts when local images/assets are needed.
- For folder posts, use image paths like `imagem.png` or `./imagem.png`; the app serves them via `app/blog-assets/[slug]/[...asset]/route.ts`.

## MDX Rendering

MDX is configured in `next.config.mjs` with:

- `@next/mdx`
- `remark-gfm`
- `remark-frontmatter`
- `rehype-pretty-code`

Global MDX components live in `mdx-components.tsx`. Keep MDX components compatible with Server Components unless there is a clear reason not to.

## Code Style

- TypeScript must stay strict and avoid `any`.
- Prefer existing utilities and components before adding new abstractions.
- Keep server-only filesystem code out of Client Components.
- Do not import `lib/blog.ts` into Client Components because it uses `node:fs`.
- Use `lib/slug.ts` for tag slugification in shared client/server code.

## Verification

Before handing off changes, run the narrowest useful checks. For blog or MDX work, prefer:

```bash
npm run format
npm run lint
npx tsc --noEmit
npm run build
```

`npm run build` may require network access because `next/font` fetches the Inter font.

## Local Skills

Use `.agents/skills/blog-article-writer` when creating, editing, or reviewing blog articles.
