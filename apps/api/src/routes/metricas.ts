import { Router } from "express";
import type { Operacao } from "../dados/operacao.ts";

/** GET /api/metricas — os indicadores do topo do painel. */
export function rotaMetricas(operacao: Operacao) {
  const r = Router();
  r.get("/metricas", (_req, res) => {
    res.json(operacao.metricas());
  });
  return r;
}
