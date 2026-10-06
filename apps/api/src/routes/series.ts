import { Router } from "express";
import type { ErroApi } from "@sr/contracts";
import type { Operacao } from "../dados/operacao.ts";

/**
 * GET /api/series?andar=0..9|todos&janela=15|60 — os gráficos (Etapa 2).
 *
 * TODO Etapa 2:
 *   - andar (padrão "todos"): "todos" ou um dígito de 0 a 9; senão 400 {"erro": ...}
 *   - janela (padrão "15"): "15" ou "60"; senão 400 {"erro": ...}
 *   - responda res.json(operacao.series(andar === "todos" ? null : Number(andar), Number(janela)))
 *     (a conta já está pronta em dados/operacao.ts)
 */
export function rotaSeries(operacao: Operacao) {
  const r = Router();
  r.get("/series", (_req, res) => {
    void operacao;
    res.status(501).json({ erro: "TODO Etapa 2: implemente GET /api/series (apps/api/src/routes/series.ts)" } satisfies ErroApi);
  });
  return r;
}
