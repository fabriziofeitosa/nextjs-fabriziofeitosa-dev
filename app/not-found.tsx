import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2 className="inline-block font-black text-4xl">
        Ops! Nada foi encontrado!
      </h2>
      <p className="text-xl text-muted-foreground mt-4">
        Não conseguimos encontrar o que você está procurando.
      </p>
      <Link
        href="/"
        className="inline-block border border-muted-foreground mt-8 p-4 rounded"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
}
