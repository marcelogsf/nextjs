"use client";

import { useState } from "react";
import Link from "next/link";
import type { Vaga } from "@/lib/tipos";

export default function AbasDaEmpresa({
  sobre,
  vagas,
}: {
  sobre: string;
  vagas: Vaga[];
}) {
  const [aba, setAba] = useState<"sobre" | "vagas">("sobre");

  return (
    <div>
      <div className="abas">
        <button
          type="button"
          className={aba === "sobre" ? "aba ativa" : "aba"}
          onClick={() => setAba("sobre")}
        >
          Sobre
        </button>
        <button
          type="button"
          className={aba === "vagas" ? "aba ativa" : "aba"}
          onClick={() => setAba("vagas")}
        >
          Vagas ({vagas.length})
        </button>
      </div>

      {aba === "sobre" ? (
        <div className="sobre-empresa">
          {sobre.split("\n\n").map((paragrafo, idx) => (
            <p key={idx}>{paragrafo}</p>
          ))}
        </div>
      ) : (
        <ul className="lista" style={{ marginTop: "16px" }}>
          {vagas.length === 0 ? (
            <p>Nenhuma vaga aberta no momento.</p>
          ) : (
            vagas.map((vaga) => (
              <li key={vaga.id}>
                <Link href={`/vagas/${vaga.id}`}>
                  <strong>{vaga.titulo}</strong>
                  <span>{vaga.area} · {vaga.senioridade} · {vaga.local}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
