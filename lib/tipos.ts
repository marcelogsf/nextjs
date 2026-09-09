export type Vaga = {
  id: string;
  titulo: string;
  empresa: string;
  empresaSlug: string;
  area: string;
  senioridade: string;
  local: string;
  aceitaIniciante: boolean;
  descricao: string;
};

export type Empresa = {
  slug: string;
  nome: string;
  sobre: string;
  site: string;
};

// O formato que TODA ação desta semana devolve
export type Estado = {
  ok: boolean;
  erros: Record<string, string>;   // campo → mensagem (uma por campo)
  valores: Record<string, string>; // o que a pessoa digitou, para devolver preenchido
  mensagem?: string;                // recado geral: sucesso ou falha
};

export const ESTADO_INICIAL: Estado = { ok: false, erros: {}, valores: {} };
