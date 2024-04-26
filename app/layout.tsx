import type { Metadata, Viewport } from "next";
import { Inter as FontSans } from "next/font/google";
import { siteConfig } from "@/config/site";

import "./globals.css";

import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";

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
    <html lang="pt-br" className="scroll-pt-[3.5rem]">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <div className="container mx-auto flex flex-col md:flex-row py-3">
            <SiteHeader />
            <main className="md:basis-2/3 lg:basis-3/4 mt-10 md:mt-0">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
