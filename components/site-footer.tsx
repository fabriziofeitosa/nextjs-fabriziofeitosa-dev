import { cn } from "@/lib/utils";

interface SiteFooterProps {
  className: string;
}

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        className,
        "flex justify-between py-7 text-xs text-muted-foreground",
      )}
    >
      <div>
        Feito com carinho 💙 em{" "}
        <a
          className="hover:underline"
          href="https://nextjs.org/"
          target="_blank"
          rel="noreferrer"
        >
          NextJS
        </a>{" "}
        + MDX
      </div>
      <div>{new Date().getFullYear()}</div>
    </footer>
  );
}
