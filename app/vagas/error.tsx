"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Algo deu errado nas vagas</h2>
      <button onClick={() => reset()}>Tentar de novo</button>
    </div>
  );
}