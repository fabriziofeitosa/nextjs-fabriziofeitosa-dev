"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

export function MainNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Início" },
    { href: "/blog", label: "Blog" },
    { href: "/apps", label: "Aplicativos" },
  ];

  return (
    <nav className="flex flex-row gap-4 items-center">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === href ? "text-foreground" : "text-foreground/60",
          )}
        >
          {label}
        </Link>
      ))}
      <ModeToggle />
    </nav>
  );
}
