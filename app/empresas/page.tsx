import type { Metadata } from "next";
import Link from "next/link";
import { listarEmpresas } from "@/lib/api";

export const metadata: Metadata = {
  title: "Empresas · Leque de Vagas",
  description: "As empresas parceiras que publicam vagas no Leque de Vagas.",
};

export default async function PaginaDeEmpresas() {
  const empresas = await listarEmpresas();

  return (
    <div>
      <h1 style={{ marginBottom: "16px" }}>Empresas Parceiras</h1>
      <p style={{ color: "#a1a1aa", marginBottom: "24px" }}>
        Conheça as empresas que estão contratando profissionais iniciantes e em transição de carreira:
      </p>

      <ul className="lista">
        {empresas.map((empresa) => (
          <li key={empresa.slug}>
            <Link href={`/empresas/${empresa.slug}`}>
              <strong>{empresa.nome}</strong>
              <span>{empresa.sobre.slice(0, 120)}...</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
