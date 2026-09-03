"use client";

export default function ErroDaVaga({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="aviso erro-box">
      <h2>Não conseguimos carregar esta vaga</h2>
      <p>A conexão com a nossa fonte de dados falhou. Isso costuma ser momentâneo.</p>
      <button type="button" onClick={() => reset()} style={{ marginTop: "12px" }}>
        Tentar de novo
      </button>
    </div>
  );
}
