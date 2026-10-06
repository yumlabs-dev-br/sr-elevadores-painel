import type { Andar, EventoPosicao, Metricas, Series } from "@sr/contracts";

/** Erro de uma chamada à API, com o status HTTP (0 = sem conexão). */
export class ErroDaApi extends Error {
  constructor(
    public readonly status: number,
    mensagem: string,
  ) {
    super(mensagem);
    this.name = "ErroDaApi";
  }
}

/**
 * GET em /api com tratamento de erro — Etapa 1.
 *
 * TODO Etapa 1:
 *   1. r = await fetch(`/api${caminho}`, { headers: { accept: "application/json" }, signal: sinal })
 *      (falha de rede → throw new ErroDaApi(0, "sem conexão com a API"); AbortError → relance como veio)
 *   2. se !r.ok: leia o corpo ({"erro": "..."} — tipo ErroApi) e throw new ErroDaApi(r.status, corpo.erro)
 *   3. devolva await r.json() como T
 */
async function obter<T>(caminho: string, sinal?: AbortSignal): Promise<T> {
  void caminho;
  void sinal;
  throw new ErroDaApi(0, "TODO Etapa 1: implemente obter() em services/api.ts");
}

/** GET /api/metricas — Etapa 1. */
export const buscarMetricas = (sinal?: AbortSignal) => obter<Metricas>("/metricas", sinal);

export interface FiltroSeries {
  andar: Andar | null;
  janela: 15 | 60;
}

/** GET /api/series?andar=&janela= — Etapa 2. */
export const buscarSeries = (filtro: FiltroSeries, sinal?: AbortSignal): Promise<Series> => {
  // TODO Etapa 2: monte a query com URLSearchParams — andar ("todos" quando null) e janela — e use obter().
  void filtro;
  void sinal;
  void obter;
  throw new ErroDaApi(0, "TODO Etapa 2: implemente buscarSeries() em services/api.ts");
};

/**
 * Abre GET /api/eventos (Server-Sent Events) e chama aoMudar a cada evento
 * "posicao" — Etapa 3. Devolve a função que fecha a conexão.
 *
 * TODO Etapa 3: new EventSource("/api/eventos"); ouça "open" (conectado),
 * "error" (desconectado — o EventSource reconecta sozinho) e "posicao"
 * (JSON.parse(e.data) como EventoPosicao). Devolva () => fonte.close().
 */
export function ouvirPosicoes(aoMudar: (p: EventoPosicao) => void, aoMudarConexao: (conectado: boolean) => void): () => void {
  void aoMudar;
  void aoMudarConexao;
  return () => {};
}
