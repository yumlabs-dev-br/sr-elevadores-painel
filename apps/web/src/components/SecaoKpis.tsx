import type { ReactNode } from "react";
import type { Metricas } from "@sr/contracts";
import type { Estado } from "../hooks/origem.ts";
import { numero, porcento, segundos } from "../utils/formatar.ts";
import { Cartao } from "./Cartao.tsx";
import { IconeOcupacao, IconePico, IconeRelogio, IconeViagens } from "./Icones.tsx";

interface Kpi {
  id: string;
  titulo: string;
  valor: number | null;
  texto: string;
  legenda: string;
  cor: string;
  icone: ReactNode;
  /** 0 a 1: quanto da barrinha preencher. */
  nivel: number;
}

function CartaoKpi({ kpi, carregando }: { kpi: Kpi; carregando: boolean }) {
  return (
    <div data-testid={`kpi-${kpi.id}`} data-valor={carregando ? "" : (kpi.valor ?? "")} className="relative overflow-hidden rounded-xl border border-borda bg-painel/60 p-4">
      <div className="flex items-center gap-2 text-fraco">
        <span className="grid size-8 place-items-center rounded-lg" style={{ background: `${kpi.cor}1f`, color: kpi.cor }}>
          {kpi.icone}
        </span>
        <span className="text-xs font-medium">{kpi.titulo}</span>
      </div>
      {carregando ? <div className="mt-3 h-8 w-24 animate-pulse rounded-md bg-borda" /> : <div className="mt-3 text-[30px] leading-none font-semibold tracking-tight text-texto tabular-nums">{kpi.texto}</div>}
      <div className="mt-2 text-[11px] text-fraco">{kpi.legenda}</div>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-borda">
        <div className="h-full rounded-full transition-[width] duration-700" style={{ width: `${Math.round(Math.min(1, Math.max(0, kpi.nivel)) * 100)}%`, background: kpi.cor }} />
      </div>
    </div>
  );
}

/** Os quatro indicadores do topo. */
export function SecaoKpis({ estado }: { estado: Estado<Metricas> }) {
  const { dados, origem, carregando, erro, recarregar } = estado;
  const m: Metricas = dados ?? { periodo: 0, segundos: 0, espera_media_s: null, espera_p95_s: null, viagens: 0, viagens_por_hora: 0, ocupacao_pct: 0, chamadas_abertas: 0, atualizado_em: "" };
  const kpis: Kpi[] = [
    { id: "espera-media", titulo: "Espera média", valor: m.espera_media_s, texto: segundos(m.espera_media_s), legenda: "do botão até embarcar", cor: "#22d3ee", icone: <IconeRelogio />, nivel: (m.espera_media_s ?? 0) / 90 },
    { id: "espera-p95", titulo: "Espera p95", valor: m.espera_p95_s, texto: segundos(m.espera_p95_s), legenda: "95% esperam menos que isso", cor: "#f472b6", icone: <IconePico />, nivel: (m.espera_p95_s ?? 0) / 180 },
    { id: "viagens-hora", titulo: "Viagens por hora", valor: m.viagens_por_hora, texto: numero(m.viagens_por_hora, 0), legenda: `${numero(m.viagens, 0)} viagens no período`, cor: "#34d399", icone: <IconeViagens />, nivel: m.viagens_por_hora / 600 },
    { id: "ocupacao", titulo: "Ocupação", valor: m.ocupacao_pct, texto: porcento(m.ocupacao_pct), legenda: m.chamadas_abertas === 1 ? "1 pessoa esperando agora" : `${numero(m.chamadas_abertas, 0)} pessoas esperando agora`, cor: "#fbbf24", icone: <IconeOcupacao />, nivel: m.ocupacao_pct / 100 },
  ];
  return (
    <Cartao titulo="Indicadores do período" legenda={dados ? `Período ${m.periodo} · atualiza a cada 5 s` : "carregando…"} secao="kpis" origem={origem}>
      {erro && (
        <div data-testid="erro-kpis" role="alert" className="mb-3 flex items-center gap-3 rounded-lg border border-vermelho/30 bg-vermelho/10 px-3 py-2 text-xs text-vermelho">
          <span className="font-semibold">Não foi possível atualizar:</span>
          <span className="min-w-0 flex-1 truncate">{erro}</span>
          <button data-testid="tentar-kpis" onClick={recarregar} className="rounded-md border border-vermelho/40 px-2 py-1 font-semibold hover:bg-vermelho/15">
            Tentar de novo
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((k) => (
          <CartaoKpi key={k.id} kpi={k} carregando={!dados || (carregando && origem === "exemplo" && !erro)} />
        ))}
      </div>
    </Cartao>
  );
}
