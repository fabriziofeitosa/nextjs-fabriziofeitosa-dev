import PasswordGenerator from "@/components/password-generator"
import Link from "next/link"

export default function PagePasswordGenerator() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div className="w-full">
      <div className="page-header space-y-4">
          <h1 className="inline-block font-black text-4xl">Gerador de Senhas</h1>
          <p className="text-xl text-muted-foreground">Crie senhas seguras e aleatórias.</p>
        </div>
        <hr className="my-8" />
        <PasswordGenerator />
        <Link href="/apps" className="block text-center mt-4">
          <span className="text-sm font-medium transition-colors hover:text-primary text-foreground/60">Voltar</span>
        </Link>
      </div>
    </main>
  )
}