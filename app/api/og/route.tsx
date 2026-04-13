// https://og-playground.vercel.app/

import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { siteConfig } from "@/config/site";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");

    if (!title) {
      return new Response("Título não encontrado", { status: 500 });
    }

    const heading =
      title.length > 140 ? `${title.substring(0, 140)}...` : title;

    return new ImageResponse(
      <div tw="flex relative flex-col p-12 w-full h-full items-start text-black bg-white">
        <div tw="flex items-center">
          <p tw="ml-2 font-bold text-2xl">FabrizioFeitosa.Dev</p>
        </div>
        <div tw="flex flex-col flex-1 py-10">
          <div tw="flex text-xl uppercase font-bold tracking-tight font-normal">
            BLOG
          </div>
          <div tw="flex text-[80px] font-bold text-[50px]">{heading}</div>
        </div>
        <div tw="flex items-center w-full justify-between">
          <div tw="flex text-xl">{siteConfig.url}</div>
          <div tw="flex items-center text-xl">
            <div tw="flex ml-2">{siteConfig.links.github}</div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );
  } catch {
    return new Response("Falha ao gerar a imagem", { status: 500 });
  }
}
