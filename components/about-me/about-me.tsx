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
          Desde 2009, quando comecei a estudar programação aos 15 anos, trilhei
          um caminho contínuo de aprendizado e desenvolvimento na área de
          Tecnologia da Informação e desenvolvimento web. Aos 18 anos, em 2012,
          foquei meus estudos no front-end, ampliando minha expertise e paixão
          por criar soluções inovadoras e funcionais.
        </p>
        <p className="text-muted-foreground">
          Minha trajetória abrange desde o desenvolvimento inicial de websites
          até a criação de soluções para a alta gestão empresarial. Atualmente,
          concentro-me em projetos variados, incluindo pesquisa e planejamento
          front-end para novos produtos e serviços, além do design de interfaces
          web que estão sempre alinhadas com as tendências de mercado e a
          inovação.
        </p>
        <p className="text-muted-foreground">
          Sou graduado em Sistemas de Informação pela UniJuazeiro (FJN -
          Faculdade de Juazeiro do Norte) e continuamente busco aprimorar minhas
          habilidades com diversos cursos na área de front-end. Provavelmente,
          enquanto lê este texto, estarei estudando algo novo.
        </p>
        <p className="text-muted-foreground">
          Me considero uma pessoa sociável, organizada, espontânea, curiosa e
          transparente. Encaro novos desafios com entusiasmo, vendo neles
          oportunidades para crescimento profissional e aquisição de novas
          habilidades. Sou flexível em relação a novas ideias e valorizo a
          colaboração na tomada de decisões.
        </p>
      </div>
    </div>
  );
}
