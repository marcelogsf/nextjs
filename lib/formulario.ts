import type { ZodError } from "zod";

// O Zod devolve uma LISTA de problemas, e a tela quer UM por campo. Esta
// função faz a ponte. Ela lê `error.issues`, que funciona tanto no Zod 3 quanto no 4.
export function porCampo(erro: ZodError): Record<string, string> {
  const erros: Record<string, string> = {};

  for (const problema of erro.issues) {
    const campo = String(problema.path[0] ?? "_");

    // A PRIMEIRA mensagem de cada campo, e só ela.
    if (!erros[campo]) {
      erros[campo] = problema.message;
    }
  }

  return erros;
}

// Devolve o que a pessoa digitou, para o formulário voltar preenchido.
export function valoresDe(dados: FormData): Record<string, string> {
  const valores: Record<string, string> = {};

  for (const [chave, valor] of dados.entries()) {
    if (typeof valor === "string") {
      valores[chave] = valor;
    }
  }

  return valores;
}
