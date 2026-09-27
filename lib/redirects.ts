import type { Redirect } from "next/dist/lib/load-custom-routes";

/**
 * URLs antigas do site. Cada entrada aponta para a página que a substituiu.
 */
export const siteRedirects: Redirect[] = [
  {
    source: "/blog/server-actions-com-tanstack-query-nextjs-guia-completo",
    destination: "/blog/react-query-no-servidor-e-no-cliente",
    permanent: true,
  },
  {
    source: "/tags/server-actions",
    destination: "/tags/tanstack-query",
    permanent: true,
  },
];
