import type { Andar } from "@sr/contracts";
import type { FiltroSeries } from "../services/api.ts";
import { nomeAndar } from "../utils/formatar.ts";

/** Andar (todos ou um) e janela de tempo dos gráficos. */
export function FiltrosSerie({ filtro, onMudar }: { filtro: FiltroSeries; onMudar: (f: FiltroSeries) => void }) {
  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor="filtro-andar">
        Andar
      </label>
      <select
        id="filtro-andar"
        data-testid="filtro-andar"
        value={filtro.andar === null ? "todos" : String(filtro.andar)}
        onChange={(e) => onMudar({ ...filtro, andar: e.target.value === "todos" ? null : (Number(e.target.value) as Andar) })}
        className="h-8 rounded-lg border border-borda bg-painel px-2.5 text-xs text-texto outline-none focus:border-ciano"
      >
        <option value="todos">Todos os andares</option>
        {Array.from({ length: 10 }, (_, a) => (
          <option key={a} value={a}>
            {nomeAndar(a)}
          </option>
        ))}
      </select>
      <div className="flex rounded-lg border border-borda bg-painel p-0.5 text-xs">
        {([15, 60] as const).map((j) => (
          <button
            key={j}
            data-testid={`janela-${j}`}
            aria-pressed={filtro.janela === j}
            onClick={() => onMudar({ ...filtro, janela: j })}
            className={`rounded-md px-2.5 py-1 font-medium transition ${filtro.janela === j ? "bg-cartao text-texto shadow" : "text-fraco hover:text-texto"}`}
          >
            {j} min
          </button>
        ))}
      </div>
    </div>
  );
}
