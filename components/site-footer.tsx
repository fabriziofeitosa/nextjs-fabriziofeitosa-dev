import { cn } from "@/lib/utils";
import Link from "next/link";

interface SiteFooterProps {
  className: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        className,
        "flex justify-between py-7 text-xs text-muted-foreground"
      )}
    >
      <div>Feito com carinho 💙 em NextJS + Velite</div>
      <div>{new Date().getFullYear()}</div>
    </footer>
  );
}
