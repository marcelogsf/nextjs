import { notFound } from "next/navigation";
import { vagas } from "@/data/vagas";
import { empresas } from "@/data/empresas";
import AbasDaEmpresa from "@/components/AbasDaEmpresa";

export default async function PaginaDaEmpresa({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const empresa = empresas.find((e) => e.slug === slug);

  if (!empresa) {
    notFound();
  }

  const vagasDaEmpresa = vagas.filter((v) => v.empresaSlug === slug);

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
