"use client";

import { useState } from "react";

export default function FormularioDeCandidatura({
  tituloDaVaga,
}: {
  tituloDaVaga: string;
}) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [rascunho, setRascunho] = useState("");
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [enviada, setEnviada] = useState(false);

  const emailParece = email.includes("@") && email.includes(".");
  const podeEnviar = nome.trim() !== "" && emailParece && habilidades.length > 0;

  function adicionar() {
    const nova = rascunho.trim();
    if (nova === "" || habilidades.includes(nova)) return;
    setHabilidades([...habilidades, nova]);
    setRascunho("");
  }

  if (enviada) {
    return (
      <div className="ok aviso">
        <h3>Candidatura registrada ✓</h3>
        <p>
          <strong>{nome}</strong>, guardamos a sua candidatura para{" "}
          <strong>{tituloDaVaga}</strong> com {habilidades.length} habilidade(s).
        </p>
        <button
          type="button"
          onClick={() => setEnviada(false)}
          style={{ marginTop: "12px" }}
        >
          corrigir alguma coisa
        </button>
      </div>
    );
  }

  return (
    <form
      className="form-candidatura"
      onSubmit={(e) => {
        e.preventDefault();
        setEnviada(true);
      }}
    >
      <label>
        Nome
        <input
          type="text"
          placeholder="Seu nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </label>

      <label>
        E-mail
        <input
          type="email"
          placeholder="seu.email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      {email !== "" && !emailParece && (
        <p className="erro">Isso não parece um e-mail válido.</p>
      )}

      <label>
        Habilidades
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Ex: React, SQL, Figma..."
            value={rascunho}
            onChange={(e) => setRascunho(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                adicionar();
              }
            }}
          />
          <button type="button" onClick={adicionar}>
            adicionar
          </button>
        </div>
      </label>

      {habilidades.length > 0 && (
        <ul className="chips">
          {habilidades.map((h) => (
            <li key={h}>
              <span>{h}</span>
              <button
                type="button"
                aria-label={`remover ${h}`}
                onClick={() => setHabilidades(habilidades.filter((x) => x !== h))}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="btn-submit"
        disabled={!podeEnviar}
        style={{ marginTop: "16px" }}
      >
        Enviar candidatura
      </button>
    </form>
  );
}
