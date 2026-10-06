import { useCallback, useState } from "react";
import type { Series } from "@sr/contracts";
import { seriesExemplo } from "../mocks/series.ts";
import type { FiltroSeries } from "../services/api.ts";
import type { Estado, Origem } from "./origem.ts";

/**
 * Os gráficos — Etapa 2. Hoje devolve os dados de EXEMPLO e ignora o filtro.
 *
 * TODO Etapa 2: como o useMetricas, mas com buscarSeries(filtro, sinal); busque
 * de novo quando o filtro (andar ou janela) mudar e a cada 10 s.
 */
export function useSeries(filtro: FiltroSeries): Estado<Series> {
  void filtro;
  const [dados] = useState<Series | null>(seriesExemplo);
  const [origem] = useState<Origem>("exemplo");
  const recarregar = useCallback(() => {}, []);
  return { dados, origem, carregando: false, erro: null, recarregar };
}
