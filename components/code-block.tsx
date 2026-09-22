"use client";

import { Check, Copy } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  type MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type CodeBlockProps = ComponentPropsWithoutRef<"pre">;

export function CodeBlock({ className, children, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const resetTimeoutRef = useRef<number | undefined>(undefined);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => window.clearTimeout(resetTimeoutRef.current);
  }, []);

  const handleCopy = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const code = preRef.current?.querySelector("code")?.textContent;

    if (!code) {
      return;
    }

    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const iconClassName = cn("h-4 w-4", copied ? "text-green-500" : "text-white");

  return (
    <pre className={cn("group relative", className)} ref={preRef} {...props}>
      {children}
      <button
        aria-label={copied ? "Código copiado" : "Copiar código"}
        className="not-prose absolute top-3 right-3 inline-flex h-8 items-center gap-1.5 rounded-md border border-white/20 bg-black/20 px-2 text-white text-xs opacity-100 transition-opacity hover:bg-black/40 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100"
        onClick={handleCopy}
        type="button"
      >
        {copied ? (
          <Check aria-hidden="true" className={iconClassName} />
        ) : (
          <Copy aria-hidden="true" className={iconClassName} />
        )}
        <span>{copied ? "Copiado" : "Copiar"}</span>
      </button>
    </pre>
  );
}
