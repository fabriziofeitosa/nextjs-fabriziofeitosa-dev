import { Quote } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ParaLeigoLerProps {
  children?: ReactNode;
  className?: string;
}

export function ParaLeigoLer({ children, className }: ParaLeigoLerProps) {
  return (
    <aside
      className={cn(
        "not-prose my-8 rounded-r-lg border border-border border-l-4 border-l-primary bg-muted/60 px-5 py-4 text-foreground",
        className,
      )}
    >
      <p className="mb-2 flex items-center gap-2 font-semibold text-sm">
        <Quote className="h-4 w-4 shrink-0" aria-hidden="true" />
        Para leigo ler 🙈
      </p>
      <div className="space-y-3 text-base leading-relaxed [&_p]:m-0">
        {children}
      </div>
    </aside>
  );
}
