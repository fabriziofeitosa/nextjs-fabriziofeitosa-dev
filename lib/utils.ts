import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Post } from "#site/content"

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