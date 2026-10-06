import type { Metricas } from "@sr/contracts";

/** Dados de EXEMPLO (estáticos) — o painel começa com eles. Na Etapa 1 vêm da API. */
export const metricasExemplo: Metricas = {
  periodo: 1,
  segundos: 540,
  espera_media_s: 38.4,
  espera_p95_s: 95,
  viagens: 61,
  viagens_por_hora: 402.2,
  ocupacao_pct: 37.5,
  chamadas_abertas: 6,
  atualizado_em: "2026-10-07T12:00:00.000Z",
};
