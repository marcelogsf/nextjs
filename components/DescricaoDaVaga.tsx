"use client";

import { useState } from "react";

const LIMITE = 180;

export default function DescricaoDaVaga({ texto }: { texto: string }) {
  const [aberta, setAberta] = useState(false);

  const cabeInteira = texto.length <= LIMITE;
  const visivel = aberta || cabeInteira ? texto : texto.slice(0, LIMITE) + "…";

  return (
    <div className="bloco-descricao">
      <p>{visivel}</p>
      {!cabeInteira && (
        <button
          type="button"
          className="btn-toggle"
          onClick={() => setAberta(!aberta)}
        >
          {aberta ? "ver menos ▲" : "ver mais ▼"}
        </button>
      )}
    </div>
  );
}
