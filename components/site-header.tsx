import Image from "next/image";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { MainNav } from "./main-nav";

export function SiteHeader() {
  return (
    <header className="md:basis-1/3">
      <Image
        src="/photo.png"
        alt="Fabrizio Feitosa - Blog"
        width={75}
        height={75}
        className="rounded-full"
      />
      <h1 className="my-3 text-2xl font-mono">{siteConfig.name}</h1>
      <p className="mt-3 mb-0">{siteConfig.description}</p>
      <nav className="my-5">
        <MainNav />
      </nav>
      <div className="social mt-8">
        <ul className="flex flex-row gap-2">
          <li>
            <a href={siteConfig.links.twitter} target="_blank">
              <Icons.twitter className="w-6 h-6" />
            </a>
          </li>
          <li>
            <a href={siteConfig.links.github} target="_blank">
              <Icons.gitHub className="w-6 h-6" />
            </a>
          </li>
        </ul>
      </div>
      <p className="mt-7 text-xs	">Alguns direitos reservados.</p>
    </header>
  );
}
