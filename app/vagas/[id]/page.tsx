import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { vagas } from "@/data/vagas";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";
import DescricaoDaVaga from "@/components/DescricaoDaVaga";
import FormularioDeCandidatura from "@/components/FormularioDeCandidatura";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const vaga = vagas.find((v) => v.id === id);
  return {
    title: vaga ? `${vaga.titulo} · Leque de Vagas` : "Vaga não encontrada",
  };
}

export default async function PaginaDaVaga({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vaga = vagas.find((v) => v.id === id);

  if (!vaga) {
    notFound();
  }

  return (
    <article className="vaga">
      <h1>{vaga.titulo}</h1>

      <p className="meta">
        <Link href={`/empresas/${vaga.empresaSlug}`}>{vaga.empresa}</Link>
        {" · "}{vaga.area} · {vaga.senioridade} · {vaga.local}
      </p>

      <div style={{ display: "flex", gap: "10px", alignItems: "center", margin: "14px 0" }}>
        <BotaoCopiarLink titulo={vaga.titulo} />
        {vaga.aceitaIniciante && <span className="selo">aceita iniciante</span>}
      </div>

      <DescricaoDaVaga texto={vaga.descricao} />

      <p style={{ marginTop: "20px" }}>
        <Link href={`/empresas/${vaga.empresaSlug}`}>
          ← Ver mais sobre a {vaga.empresa}
        </Link>
      </p>

      <hr style={{ border: "0", borderTop: "1px solid #27272a", margin: "32px 0" }} />

      <h2 style={{ marginBottom: "16px" }}>Candidatar-se a esta vaga</h2>
      <FormularioDeCandidatura tituloDaVaga={vaga.titulo} />

      <p style={{ marginTop: "24px" }}>
        <Link href="/vagas">← Voltar para todas as vagas</Link>
      </p>
    </article>
  );
}
