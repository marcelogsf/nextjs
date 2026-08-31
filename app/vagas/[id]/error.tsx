"use client";

export default function ErroDaVaga({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="aviso">
      <h2>Não consegui carregar esta vaga</h2>
      <p>Pode ter sido instabilidade. Tente de novo.</p>
      <button onClick={() => retry()}>Tentar de novo</button>
    </div>
  );
}
