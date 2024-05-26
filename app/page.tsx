import AboutMe from "@/components/about-me/about-me";
import LatestPosts from "@/components/latest-posts";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Typewriter } from "nextjs-simple-typewriter";

export default function Home() {
  return (
    <section>
      <h2 className="inline-block font-black text-4xl md:text-5xl">
        Seja bem-vindo!
      </h2>
      <h3 className="my-4 text-xl text-muted-foreground">
        Hoje vamos falar sobre{" "}
        <pre className="block lg:inline">
          <Typewriter
            words={[
              "Programação",
              "Tecnologia",
              "Front-end",
              "Back-end",
              "Javascript",
              "React",
              "Next.js",
              "PHP",
              "WordPress",
              "Elementor",
              "Html/CSS",
              "Windows",
              "Linux",
            ]}
            loop={0}
            cursor={true}
            cursorStyle="_"
          />
        </pre>
      </h3>
      <hr className="my-8" />
      <AboutMe />
      <hr className="my-8" />
      <h3 className="font-black text-3xl mb-4">Últimas postagens</h3>
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
