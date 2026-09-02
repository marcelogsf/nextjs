import type { Vaga } from "./tipos";

const URL_VAGAS =
  "https://raw.githubusercontent.com/marcelogsf/nextjs/main/dados/vagas.json";

export async function listarVagas(): Promise<Vaga[]> {
  console.log("[api] buscando vagas no GitHub...");

 const resposta = await fetch(URL_VAGAS, { next: { revalidate: 20 } });

  if (!resposta.ok) {
    throw new Error("Não foi possível carregar as vagas");
  }

  const vagas: Vaga[] = await resposta.json();
  return vagas;
}