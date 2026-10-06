import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import type { Operacao } from "./dados/operacao.ts";
import { rotaEventos } from "./routes/eventos.ts";
import { rotaMetricas } from "./routes/metricas.ts";
import { rotaSeries } from "./routes/series.ts";
import type { Predio } from "./simulador/predio.ts";

const WEB = join(dirname(fileURLToPath(import.meta.url)), "../../web/dist");

/** A API do painel em /api e, em produção, o painel já compilado (apps/web/dist). */
export function criarApp(operacao: Operacao, predio: Predio) {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json());

  const api = express.Router();
  api.get("/saude", (_req, res) => {
    res.json({ ok: true });
  });
  api.use(rotaMetricas(operacao));
  api.use(rotaSeries(operacao));
  api.use(rotaEventos(operacao, predio));
  api.use((req, res) => {
    res.status(404).json({ erro: `rota ${req.method} /api${req.path} não existe` });
  });
  app.use("/api", api);

  if (existsSync(WEB)) {
    app.use(express.static(WEB));
    app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(join(WEB, "index.html")));
  }
  return app;
}
