import PasswordGenerator from "@/components/password-generator"
import Link from "next/link"

export default function PageAppsList() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="w-full">
        <div className="page-header space-y-4">
          <h1 className="inline-block font-black text-4xl">Aplicativos</h1>
          <p className="text-xl text-muted-foreground">Escolha um dos aplicativos abaixo:</p>
        </div>
        <hr className="my-8" />
        <div className="ps-4">
        <ol className="space-y-4 list-[upper-roman]">
          <li>
            <Link href="/apps/password-generator">
              <span className="text-sm font-medium transition-colors hover:text-primary text-foreground/60">Gerador de Senhas</span>
            </Link>
          </li>
        </ol>
        </div>
      </div>
    </main>
  )
}