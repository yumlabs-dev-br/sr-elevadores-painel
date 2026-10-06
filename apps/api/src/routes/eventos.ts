import { Router } from "express";
import type { ErroApi } from "@sr/contracts";
import type { Operacao } from "../dados/operacao.ts";
import type { Predio } from "../simulador/predio.ts";

/**
 * GET /api/eventos — Server-Sent Events (Etapa 3). A conexão fica aberta e a
 * API escreve um evento a cada passo do prédio, neste formato de texto:
 *
 *   event: posicao
 *   data: {"periodo": 1, "segundos": 125, "elevadores": [...], ...}
 *   (linha em branco)
 *
 * TODO Etapa 3:
 *   - res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" })
 *   - envie operacao.posicao() logo ao conectar e a cada predio.on("passo", ...)
 *   - quando o cliente desconectar (req.on("close")), pare de ouvir: predio.off("passo", ...)
 */
export function rotaEventos(operacao: Operacao, predio: Predio) {
  const r = Router();
  r.get("/eventos", (_req, res) => {
    void operacao;
    void predio;
    res.status(501).json({ erro: "TODO Etapa 3: implemente GET /api/eventos (apps/api/src/routes/eventos.ts)" } satisfies ErroApi);
  });
  return r;
}
