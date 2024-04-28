import Image from "next/image";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
import { MainNav } from "./main-nav";
import Link from "next/link";

interface SiteHeaderProps {
  className: string;
}

export function SiteHeader({ className }: SiteHeaderProps) {
  return (
    <header className={className}>
      <div className="content md:sticky md:top-8">
        <Image
          src="/photo.png"
          alt="Fabrizio Feitosa"
          width={75}
          height={75}
          className="rounded-full"
        />
        <h1 className="my-3 text-2xl font-mono">{siteConfig.name}</h1>
        <p className="mt-3 mb-0 text-muted-foreground">
          {siteConfig.description}
        </p>
        <nav className="my-5">
          <MainNav />
        </nav>
        <div className="social mt-8">
          <ul className="flex flex-row gap-2">
            <li>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.twitter className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.gitHub className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.linkedin className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.instagram className="w-6 h-6" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
