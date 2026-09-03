import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listarVagas, buscarVaga } from "@/lib/api";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";
import DescricaoDaVaga from "@/components/DescricaoDaVaga";
import FormularioDeCandidatura from "@/components/FormularioDeCandidatura";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const vagas = await listarVagas();
  return vagas.map((vaga) => ({ id: String(vaga.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vaga = await buscarVaga(id);

  if (!vaga) {
    return { title: "Vaga não encontrada · Leque de Vagas" };
  }

  return {
    title: `${vaga.titulo} · ${vaga.empresa}`,
    description: vaga.descricao.slice(0, 150),
  };
}

export default async function PaginaDaVaga({ params }: Props) {
  const { id } = await params;
  const vaga = await buscarVaga(id);

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
