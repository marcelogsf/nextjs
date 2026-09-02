import { listarVagas } from "@/lib/api";
import MuralDeVagas from "@/components/MuralDeVagas";

export default async function Vagas() {
  console.log("[servidor] montando a listagem");
  const vagas = await listarVagas();

  return (
    <>
      <h1 style={{ marginBottom: "20px" }}>Vagas Disponíveis</h1>
      <MuralDeVagas vagas={vagas} />
    </>
  );
}