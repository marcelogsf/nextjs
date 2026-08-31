import { vagas } from "@/data/vagas";
import MuralDeVagas from "@/components/MuralDeVagas";

export default function Vagas() {
  console.log("[servidor] montando a listagem");

  return (
    <>
      <h1 style={{ marginBottom: "20px" }}>Vagas Disponíveis</h1>
      <MuralDeVagas vagas={vagas} />
    </>
  );
}
