import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Post } from "#site/content"
import { slug } from "github-slugger";

/**
 * Junta classes de forma segura.
 * @param inputs Classes a serem juntadas.
 * @returns As classes juntadas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formata uma data para o formato brasileiro.
 * @param input string ou número a ser formatado.
 * @returns A data formatada.
 */
export function formatDate(input: string | number): string {
  return new Date(input).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

/**
 * Ordena posts por data.
 * @param posts Posts a serem ordenados.
 * @returns Posts ordenados.
 */
export function sortPosts(posts: Array<Post>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

/**
 * Obtém todas as tags dos posts ativos.
 * @param posts Posts a serem analisados.
 * @returns Tags dos posts.
 */
export function getAllTags(posts: Array<Post>) {
  const tags: Record<string, number> = {}
  const postsPublished = posts.filter(post => post.published)
  postsPublished.forEach(post => {
    post.tags?.forEach(tag => {
      // Para evitar maiuscula e minuscula, convertendo para minuscula.
      tag = tag.toLowerCase();
      tags[tag] = (tags[tag] ?? 0) + 1;
    })
  })

  return tags;
}

/**
 * Ordena tags por quantidade.
 * @param tags Tags a serem ordenadas.
 * @returns Tags ordenadas.
 */
export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

/**
 * Obtém posts ativos por tag.
 * @param posts Posts a serem analisados.
 * @param tag Tag a ser filtrada.
 * @returns Posts filtrados.
 */
export function getPostsByTagSlug(posts: Array<Post>, tag: string) {
  return posts.filter(post => {
    // Verifica se o post está publicado e se possui tags.
    if (!post.published) return false
    if (!post.tags) return false
    const slugifiedTags = post.tags.map(tag => slug(tag))
    return slugifiedTags.includes(tag)
  })
}