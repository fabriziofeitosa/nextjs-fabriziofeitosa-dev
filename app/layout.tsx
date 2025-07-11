import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.scss";
import { Analytics } from '@vercel/analytics/next';
import { Providers } from "@/components/providers";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? siteConfig.url),
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className="scroll-pt-[3.5rem]"
    // suppressHydrationWarning={true}
    >
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="content-area container grid pt-10 gap-x-10">
            <SiteHeader className={"content-area-header"} />
            <main className="mt-10 md:mt-0 content-area-content">
              {children}
            </main>
            <SiteFooter className="content-area-footer" />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
