import { Area, CartesianGrid, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Series } from "@sr/contracts";
import { numero } from "../utils/formatar.ts";

function Dica({ active, payload, label }: { active?: boolean; payload?: { dataKey: string; value: number | null }[]; label?: number }) {
  if (!active || !payload?.length) return null;
  const esperando = payload.find((p) => p.dataKey === "esperando")?.value;
  const media = payload.find((p) => p.dataKey === "espera_media_s")?.value;
  return (
    <div className="rounded-lg border border-borda bg-painel/95 px-3 py-2 text-xs shadow-xl">
      <div className="mb-1 font-semibold text-texto">minuto {label}</div>
      <div className="flex items-center gap-2 text-fraco">
        <span className="size-2 rounded-full bg-ciano" /> esperando: <b className="text-texto">{esperando ?? "—"}</b>
      </div>
      <div className="flex items-center gap-2 text-fraco">
        <span className="size-2 rounded-full bg-ambar" /> espera média: <b className="text-texto">{media === null || media === undefined ? "—" : `${numero(media)} s`}</b>
      </div>
    </div>
  );
}

/** Pessoas esperando (área) e espera média de quem embarcou (linha), minuto a minuto. */
export function GraficoFila({ series }: { series: Series | null }) {
  if (!series) return <div className="h-64 animate-pulse rounded-xl bg-borda/40" />;
  const total = series.pontos.reduce((s, p) => s + p.esperando, 0);
  return (
    <div data-testid="grafico-fila" data-pontos={series.pontos.length} data-total={total} className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={series.pontos} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id="fila" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 4" />
          <XAxis dataKey="minuto" tickLine={false} axisLine={false} tickFormatter={(m) => `${m}′`} />
          <YAxis yAxisId="fila" tickLine={false} axisLine={false} allowDecimals={false} width={44} />
          <YAxis yAxisId="espera" orientation="right" tickLine={false} axisLine={false} width={40} tickFormatter={(v) => `${v}s`} />
          <Tooltip content={<Dica />} cursor={{ stroke: "#334155" }} />
          <Area yAxisId="fila" type="monotone" dataKey="esperando" stroke="#22d3ee" strokeWidth={2} fill="url(#fila)" isAnimationActive={false} />
          <Line yAxisId="espera" type="monotone" dataKey="espera_media_s" stroke="#fbbf24" strokeWidth={2} dot={false} connectNulls isAnimationActive={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
