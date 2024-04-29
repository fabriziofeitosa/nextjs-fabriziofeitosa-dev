import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import { cn } from "@/lib/utils";

// Components
import { Callout } from "./callout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Icons
import { Info as IconInfo } from "lucide-react";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

interface componentsProps {
  className: string;
}

const components = {
  Alert,
  AlertTitle,
  AlertDescription,
  IconInfo,
  Image,
  Callout,
  a: ({ className, ...props }: componentsProps) => (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
};

interface MdxProps {
  code: string;
}

export function MDXContent({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
