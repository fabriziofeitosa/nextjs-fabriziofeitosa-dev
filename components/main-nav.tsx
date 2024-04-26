"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export function MainNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Início" },
    { href: "/sobre", label: "Sobre" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="flex flex-row md:flex-col gap-4 items-center">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === href ? "text-foreground" : "text-foreground/60"
          )}
        >
          {label}
        </Link>
      ))}
      <ModeToggle />
    </nav>
  );
}
