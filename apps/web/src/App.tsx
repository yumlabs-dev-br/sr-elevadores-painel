import { useState } from "react";
import { Cabecalho } from "./components/Cabecalho.tsx";
import { Cartao } from "./components/Cartao.tsx";
import { FiltrosSerie } from "./components/FiltrosSerie.tsx";
import { GraficoAndares } from "./components/GraficoAndares.tsx";
import { GraficoFila } from "./components/GraficoFila.tsx";
import { PredioAoVivo } from "./components/PredioAoVivo.tsx";
import { SecaoKpis } from "./components/SecaoKpis.tsx";
import { useEventos } from "./hooks/useEventos.ts";
import { useMetricas } from "./hooks/useMetricas.ts";
import { useSeries } from "./hooks/useSeries.ts";
import type { FiltroSeries } from "./services/api.ts";
import { nomeAndar } from "./utils/formatar.ts";

export function App() {
  const [filtro, setFiltro] = useState<FiltroSeries>({ andar: null, janela: 15 });
  const metricas = useMetricas();
  const series = useSeries(filtro);
  const { posicao, origem: origemPredio, conectado } = useEventos();
  const filtroTexto = filtro.andar === null ? "todos os andares" : nomeAndar(filtro.andar);

  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-4 p-4 md:p-6">
      <Cabecalho periodo={posicao?.periodo ?? 0} segundos={posicao?.segundos ?? 0} conectado={conectado} aoVivo={origemPredio === "api" && posicao !== null} />

      <SecaoKpis estado={metricas} />

      <div className="grid gap-4 lg:grid-cols-12">
        <Cartao titulo="Prédio ao vivo" legenda="posição dos elevadores e gente esperando" secao="predio" origem={origemPredio} className="lg:col-span-4">
          <div className="flex h-full items-center justify-center">
            <PredioAoVivo posicao={posicao} />
          </div>
        </Cartao>
        <Cartao
          titulo="Fila ao longo do tempo"
          legenda={`${filtroTexto} · últimos ${filtro.janela} minutos`}
          secao="series"
          origem={series.origem}
          acoes={<FiltrosSerie filtro={filtro} onMudar={setFiltro} />}
          className="lg:col-span-8"
        >
          {series.erro && <p className="mb-2 rounded-lg bg-vermelho/10 px-3 py-2 text-xs text-vermelho">Não foi possível atualizar os gráficos: {series.erro}</p>}
          <GraficoFila series={series.dados} />
          <div className="mt-2 flex gap-4 text-[11px] text-fraco">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-3 rounded-sm bg-ciano/60" /> pessoas esperando
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-3 bg-ambar" /> espera média de quem embarcou
            </span>
          </div>
        </Cartao>
      </div>

      <Cartao titulo="Espera por andar" legenda="chamadas no período, coloridas pela espera média" secao="andares" origem={series.origem}>
        <GraficoAndares series={series.dados} />
      </Cartao>

      <footer className="pb-2 text-center text-[11px] text-fraco">Situação real do webforge · Elevadores: o painel de operação</footer>
    </div>
  );
}
