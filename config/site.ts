import { link } from "fs";

export const siteConfig = {
  name: "Fabrizio Feitosa",
  url: "https://fabriziofeitosa.dev",
  description: "Meu blog pessoal, onde compartilho conhecimento sobre desenvolvimento web e tecnologia em geral.",
  author: "Fabrizio Feitosa",
  links: {
    twitter: "https://twitter.com/fabriziofeitosa",
    github: "https://github.com/fabriziofeitosa",
    instagram: "https://instagram.com/fabriziofeitosa",
    linkedin: "https://linkedin.com/in/fabriziofeitosa",
  },
};

export type SiteConfig = typeof siteConfig;