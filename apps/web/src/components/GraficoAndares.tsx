import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { Series } from "@sr/contracts";
import { andarCurto, nomeAndar, numero } from "../utils/formatar.ts";

/** Cor da barra pela espera média: verde (rápido) → âmbar → vermelho (demora). */
const corDaEspera = (s: number | null) => (s === null ? "#334155" : s < 35 ? "#34d399" : s < 55 ? "#fbbf24" : "#f87171");

/** Chamadas por andar, coloridas pela espera média. */
export function GraficoAndares({ series }: { series: Series | null }) {
  if (!series) return <div className="h-64 animate-pulse rounded-xl bg-borda/40" />;
  const dados = series.por_andar.map((a) => ({ ...a, nome: andarCurto(a.andar) }));
  const total = dados.reduce((s, a) => s + a.chamadas, 0);
  return (
    <div data-testid="grafico-andares" data-total={total} className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dados} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 4" />
          <XAxis dataKey="nome" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} allowDecimals={false} width={44} />
          <Tooltip
            cursor={{ fill: "rgb(255 255 255 / 0.04)" }}
            content={({ active, payload }) => {
              const a = payload?.[0]?.payload as (typeof dados)[number] | undefined;
              if (!active || !a) return null;
              return (
                <div className="rounded-lg border border-borda bg-painel/95 px-3 py-2 text-xs shadow-xl">
                  <div className="mb-1 font-semibold text-texto">{nomeAndar(a.andar)}</div>
                  <div className="text-fraco">
                    chamadas: <b className="text-texto">{a.chamadas}</b>
                  </div>
                  <div className="text-fraco">
                    espera média: <b className="text-texto">{a.espera_media_s === null ? "—" : `${numero(a.espera_media_s)} s`}</b>
                  </div>
                </div>
              );
            }}
          />
          <Bar dataKey="chamadas" radius={[6, 6, 0, 0]} isAnimationActive={false}>
            {dados.map((a) => (
              <Cell key={a.andar} fill={corDaEspera(a.espera_media_s)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-1 flex justify-end gap-3 text-[10.5px] text-fraco">
        {[
          ["#34d399", "< 35 s"],
          ["#fbbf24", "35–55 s"],
          ["#f87171", "> 55 s"],
        ].map(([c, t]) => (
          <span key={t} className="flex items-center gap-1">
            <span className="size-2 rounded-sm" style={{ background: c }} /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}
