"use client";

import { useState } from "react";
import styles from "./about-me.module.scss";
import { cn } from "@/lib/utils";

export default function AboutMe() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(open ? styles.open : styles.closed, styles.aboutMe)}
      onClick={() => setOpen(!open)}
    >
      <h3 className="font-black text-3xl mb-4">Deixa eu me apresentar</h3>
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
    </div>
  );
}
