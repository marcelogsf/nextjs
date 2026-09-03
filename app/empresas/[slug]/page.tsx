import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listarEmpresas, buscarEmpresa, listarVagas } from "@/lib/api";
import AbasDaEmpresa from "@/components/AbasDaEmpresa";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const empresas = await listarEmpresas();
  return empresas.map((empresa) => ({ slug: empresa.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);

  if (!empresa) {
    return { title: "Empresa não encontrada · Leque de Vagas" };
  }

  return {
    title: `${empresa.nome} · Leque de Vagas`,
    description: empresa.sobre.slice(0, 150),
  };
}

export default async function PaginaDaEmpresa({ params }: Props) {
  const { slug } = await params;

  // Busca em paralelo no servidor (Promise.all) para não dobrar o tempo de espera
  const [empresa, vagas] = await Promise.all([
    buscarEmpresa(slug),
    listarVagas(),
  ]);

  if (!empresa) {
    notFound();
  }

  // Filtro acontece no servidor
  const vagasDaEmpresa = vagas.filter((vaga) => vaga.empresaSlug === empresa.slug);

  return (
    <article>
      <h1 style={{ marginBottom: "8px" }}>{empresa.nome}</h1>
      <p style={{ color: "#a1a1aa", marginBottom: "20px" }}>
        Site oficial:{" "}
        <a
          href={empresa.site}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#38bdf8" }}
        >
          {empresa.site}
        </a>
      </p>

      <AbasDaEmpresa sobre={empresa.sobre} vagas={vagasDaEmpresa} />
    </article>
  );
}
