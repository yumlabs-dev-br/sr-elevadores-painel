import request from "supertest";
import { describe, expect, it } from "vitest";
import { criarApp } from "../src/app.ts";
import { Operacao } from "../src/dados/operacao.ts";
import { Predio } from "../src/simulador/predio.ts";

/** Um prédio que roda um período inteiro, sem esperar o relógio. */
async function appComUmPeriodo() {
  const operacao = new Operacao();
  const predio = new Predio(operacao, { semente: 7, ritmoMs: 0, repetir: false });
  await predio.rodar();
  return criarApp(operacao, predio);
}

describe("API do painel", () => {
  it("GET /api/metricas depois de um período", async () => {
    const r = await request(await appComUmPeriodo()).get("/api/metricas");
    expect(r.status).toBe(200);
    expect(r.body).toMatchObject({ periodo: 1, segundos: 895 });
    expect(r.body.viagens).toBeGreaterThan(0);
  });

  it("GET /api/series filtra por andar e valida a query", async () => {
    const app = await appComUmPeriodo();
    const todos = await request(app).get("/api/series");
    expect(todos.body.pontos).toHaveLength(15);
    const terceiro = await request(app).get("/api/series?andar=3&janela=60");
    expect(terceiro.body).toMatchObject({ andar: 3, janela_min: 60 });
    expect((await request(app).get("/api/series?andar=12")).status).toBe(400);
  });
});
