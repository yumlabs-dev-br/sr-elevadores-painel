import { criarApp } from "./app.ts";
import { Operacao } from "./dados/operacao.ts";
import { Predio } from "./simulador/predio.ts";

const porta = Number(process.env.PORT ?? 3001);
const operacao = new Operacao();
const predio = new Predio(operacao, {
  semente: Number(process.env.SIMULACAO_SEMENTE ?? 7),
  ritmoMs: Number(process.env.SIMULACAO_RITMO_MS ?? 1000),
  repetir: process.env.SIMULACAO_REPETIR !== "0",
});

predio.rodar().catch((e) => console.error("O prédio parou:", e));
criarApp(operacao, predio).listen(porta, () => {
  console.log(`API do painel: http://localhost:${porta}/api (prédio a 1 passo por ${process.env.SIMULACAO_RITMO_MS ?? 1000} ms)`);
});
