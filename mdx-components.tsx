import { Info as IconInfo } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { Callout } from "@/components/callout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type AnchorProps = ComponentPropsWithoutRef<"a">;

const components: MDXComponents = {
  Alert,
  AlertTitle,
  AlertDescription,
  IconInfo,
  Image,
  Callout,
  a: ({ className, ...props }: AnchorProps) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
