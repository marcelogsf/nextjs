import type { Vaga, Empresa } from "@/lib/tipos";

// A URL mora aqui, e só aqui.
const FONTE = "https://raw.githubusercontent.com/marcelogsf/nextjs/main/dados";

// 60 segundos: uma vaga nova demora no máximo um minuto para aparecer
const CACHE_VAGAS = { next: { revalidate: 60, tags: ["vagas"] } };

export async function listarVagas(): Promise<Vaga[]> {
  try {
    const resposta = await fetch(`${FONTE}/vagas.json`, CACHE_VAGAS);
    if (resposta.ok) {
      return await resposta.json();
    }
  } catch {}

  const fs = await import("fs/promises");
  const path = await import("path");
  const localFile = path.join(process.cwd(), "dados", "vagas.json");
  const conteudo = await fs.readFile(localFile, "utf-8");
  return JSON.parse(conteudo);
}

export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  const vagas = await listarVagas();
  return vagas.find((vaga) => vaga.id === id);
}

// 3600 segundos (1 hora): os dados institucionais de empresas mudam muito raramente
export async function listarEmpresas(): Promise<Empresa[]> {
  try {
    const resposta = await fetch(`${FONTE}/empresas.json`, {
      next: { revalidate: 3600, tags: ["empresas"] },
    });
    if (resposta.ok) {
      return await resposta.json();
    }
  } catch {}

  const fs = await import("fs/promises");
  const path = await import("path");
  const localFile = path.join(process.cwd(), "dados", "empresas.json");
  const conteudo = await fs.readFile(localFile, "utf-8");
  return JSON.parse(conteudo);
}

export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  const empresas = await listarEmpresas();
  return empresas.find((empresa) => empresa.slug === slug);
}
