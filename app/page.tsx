import LatestPosts from "@/components/latest-posts";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <section>
      <h2 className="inline-block font-black text-4xl">Seja bem-vindo!</h2>
      <h3 className="my-4 text-xl text-muted-foreground">
        Posso falar um pouco sobre mim?
      </h3>
      <div className="space-y-3">
        <p className="text-muted-foreground">
          Com 10 anos de experiência em Tecnologia da Informação e
          desenvolvimento web, trilhei um caminho desde o desenvolvimento
          inicial de websites até a criação de soluções para a alta gestão
          empresarial. Atualmente, concentro-me em projetos diversos, incluindo
          pesquisa e planejamento front-end para novos produtos e serviços,
          assim como o design de interfaces web alinhadas com as tendências de
          mercado e inovação.
        </p>
        <p className="text-muted-foreground">
          Sou graduado em Sistemas de Informação pela UniJuazeiro (FJN -
          Faculdade de Juazeiro do Norte) e participei de cursos específicos em
          desenvolvimento front-end.
        </p>
        <p className="text-muted-foreground">
          Sou uma pessoa sociável, organizada, espontânea, curiosa e
          transparente. Encaro novos desafios sem temor, pois vejo neles
          oportunidades de crescimento profissional, sempre disposto a adquirir
          novas habilidades. Sou flexível em relação a novas ideias e valorizo a
          colaboração na tomada de decisões.
        </p>
      </div>
      <hr className="my-8" />
      <h3 className="font-black text-4xl mb-4">Últimas postagens</h3>
      <LatestPosts qtdPosts={4} />
      <div className="mt-8 text-center">
        <Link
          href="/blog"
          className={cn(buttonVariants({ variant: "default" }), "my-3 w-full")}
        >
          Quer ler mais? Acesse o blog
        </Link>
      </div>
    </section>
  );
}
