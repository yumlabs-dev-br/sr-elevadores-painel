/**
 * Contrato entre a API (apps/api) e o painel (apps/web). Os dois lados
 * importam daqui: se a API mudar um campo, o TypeScript acusa no front.
 * Tempos em segundos da simulação do prédio (5 s por passo, 15 min por período).
 */

/** GET /api/metricas — os indicadores do topo do painel. */
export interface Metricas {
  /** Período da simulação (1, 2, ...) e o segundo atual dele (0 a 895). */
  periodo: number;
  segundos: number;
  /** Média e p95 da espera (embarque − chamada) de quem já embarcou; null se ninguém embarcou. */
  espera_media_s: number | null;
  espera_p95_s: number | null;
  /** Viagens concluídas e o ritmo por hora. */
  viagens: number;
  viagens_por_hora: number;
  /** Ocupação média dos elevadores no período (% da capacidade). */
  ocupacao_pct: number;
  /** Pessoas esperando agora. */
  chamadas_abertas: number;
  /** Quando os números foram calculados (ISO 8601). */
  atualizado_em: string;
}

export type Andar = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

/** Um ponto por minuto da simulação. */
export interface PontoSerie {
  minuto: number;
  /** Pessoas esperando no fim do minuto (só do andar filtrado, se houver). */
  esperando: number;
  /** Espera média de quem embarcou naquele minuto (null se ninguém). */
  espera_media_s: number | null;
}

/** GET /api/series?andar=&janela= — os gráficos. */
export interface Series {
  andar: Andar | null;
  janela_min: 15 | 60;
  pontos: PontoSerie[];
  por_andar: { andar: Andar; chamadas: number; espera_media_s: number | null }[];
}

export interface ElevadorAoVivo {
  id: string;
  andar: number;
  destino: number | null;
  porta: boolean;
  lotacao: number;
  capacidade: number;
}

/** Evento "posicao" de GET /api/eventos (Server-Sent Events), a cada passo. */
export interface EventoPosicao {
  periodo: number;
  segundos: number;
  elevadores: ElevadorAoVivo[];
  /** Pessoas esperando em cada andar (índice = andar). */
  esperando_por_andar: number[];
}

export interface ErroApi {
  erro: string;
}
