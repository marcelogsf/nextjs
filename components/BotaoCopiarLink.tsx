"use client";

import { useState } from "react";

export default function BotaoCopiarLink({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);

  return (
    <button
      type="button"
      className="btn-copiar"
      onClick={() => {
        if (typeof window !== "undefined" && navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href);
          setCopiado(true);
        }
      }}
    >
      {copiado ? `✓ Link de “${titulo}” copiado` : "🔗 Copiar link"}
    </button>
  );
}
