---
name: blog-article-writer
description: Create, edit, review, and prepare local MDX blog articles for this Next.js personal site. Use when the user asks to draft a new article, improve an existing article, add frontmatter, choose a slug, organize tags, add code examples, handle images/assets for posts under content/blog, or validate blog article structure.
---

# Blog Article Writer

## Workflow

1. Inspect existing posts in `content/blog` before writing. Match the article language, tone, frontmatter shape, heading style, and code block style already used there.
2. Choose the simplest content layout:
   - Use `content/blog/<slug>.mdx` for posts without local assets.
   - Use `content/blog/<slug>/index.mdx` when the post needs local images or other per-post assets.
3. Use frontmatter exactly in this shape:

```mdx
---
title: "Article title"
description: "Short SEO-friendly summary."
date: YYYY-MM-DD
published: true
tags: ["tag-a", "tag-b"]
---
```

4. Use lowercase tags. Prefer existing tags when they match the topic. Keep tags specific and useful for browsing.
5. Derive the slug from the title using lowercase words and hyphens. Avoid accents and punctuation in filenames.
6. Keep `published: false` for drafts unless the user explicitly wants the article listed.

## Content Guidelines

- Write in Brazilian Portuguese unless the user asks for another language.
- Prefer direct, practical explanations with examples that a developer can apply immediately.
- Start with the article content, not a marketing-style intro.
- Use `##` for main sections and `###` for subsections.
- Use fenced code blocks with a language identifier, for example `typescript`, `tsx`, `css`, `bash`, or `json`.
- Do not invent external facts, versions, APIs, or benchmark claims. Browse or inspect official docs when freshness matters.
- For articles adapted from another source, include a short credits note only when the user provides or requests the source.

## MDX Capabilities

Available MDX components include:

- `<Callout type="warning">...</Callout>`
- `<Callout type="danger">...</Callout>`
- `<Alert>`, `<AlertTitle>`, `<AlertDescription>`, and `<IconInfo />`
- Markdown images, links, tables, and GFM syntax.

For posts in folders, reference local images by filename, for example:

```mdx
![Descrição da imagem](imagem.png)
```

The app serves these assets through `/blog-assets/<slug>/<asset>`.

## Validation

After creating or editing posts:

1. Run `npm run format`.
2. Run `npm run lint`.
3. Run `npx tsc --noEmit`.
4. Run `npm run build` when routing, MDX compilation, assets, or metadata changed.

If a check fails, fix the underlying issue instead of relaxing article structure.
