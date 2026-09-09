"use server";   // vale para o ARQUIVO inteiro
import { z } from "zod";
import { porCampo } from "@/lib/formulario";

const EsquemaDaVaga = z.object({
  titulo:      z.string().min(5, "O título precisa de pelo menos 5 letras."),
  empresaSlug: z.string().min(1, "Escolha a empresa."),
  local:       z.string().min(1, "Diga onde é."),

  // TUDO que vem de FormData é TEXTO. Estes dois precisam de conversão:
  aceitaIniciante: z.literal("on").optional().transform((v) => v === "on"),
  vagas: z.coerce.number().int().min(1, "Pelo menos uma posição.").optional(),
});



export async function criarVaga(dados: FormData) {
  const dadosBrutos = Object.fromEntries(dados);
  console.log("[acao] FormData recebido (bruto):", dadosBrutos);

  const analise = EsquemaDaVaga.safeParse(dadosBrutos);

  if (!analise.success) {
    // NÃO joga exceção: erro de digitação não é acidente, é o esperado
    console.log("[acao] Erros (issues do Zod):", analise.error.issues);
    console.log("[acao] Erros (por campo):", porCampo(analise.error));
    return;
  }

  const vaga = analise.data;
  console.log("[acao] Vaga válida recebida:", vaga);
}