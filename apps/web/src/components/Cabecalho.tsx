import { relogio } from "../utils/formatar.ts";
import { IconePredio } from "./Icones.tsx";

/** Marca do prédio e o estado da conexão ao vivo. */
export function Cabecalho({ periodo, segundos, conectado, aoVivo }: { periodo: number; segundos: number; conectado: boolean; aoVivo: boolean }) {
  return (
    <header className="flex flex-wrap items-center gap-3">
      <div className="grid size-10 place-items-center rounded-xl border border-borda bg-cartao text-ambar">
        <IconePredio />
      </div>
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Torre Atlântica</h1>
        <p className="text-xs text-fraco">Painel de operação dos elevadores · 10 andares · 2 elevadores</p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <span
          data-testid="status-conexao"
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${aoVivo && conectado ? "border-verde/40 bg-verde/10 text-verde" : "border-borda bg-cartao text-fraco"}`}
        >
          <span className={`size-2 rounded-full ${aoVivo && conectado ? "animate-pulse bg-verde" : "bg-fraco"}`} />
          {aoVivo ? (conectado ? "Ao vivo" : "Reconectando…") : "Parado"}
        </span>
        <span data-testid="relogio" className="rounded-full border border-borda bg-cartao px-3 py-1 font-mono text-xs text-texto tabular-nums">
          período {periodo} · {relogio(segundos)}
        </span>
      </div>
    </header>
  );
}
