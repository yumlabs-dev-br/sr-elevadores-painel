import type { Series } from "@sr/contracts";

/** Dados de EXEMPLO (estáticos). Na Etapa 2 vêm de GET /api/series. */
const esperando = [2, 4, 5, 7, 6, 9, 8, 11, 9, 7, 8, 6, 5, 7, 4];
const media = [null, 21.5, 28, 33.8, 31, 42.5, 39.2, 48.8, 45, 37.1, 35, 30.4, 26.3, 29.5, 22];

export const seriesExemplo: Series = {
  andar: null,
  janela_min: 15,
  pontos: esperando.map((e, minuto) => ({ minuto, esperando: e, espera_media_s: media[minuto] })),
  por_andar: [
    { andar: 0, chamadas: 41, espera_media_s: 27.4 },
    { andar: 1, chamadas: 6, espera_media_s: 44.2 },
    { andar: 2, chamadas: 8, espera_media_s: 39.4 },
    { andar: 3, chamadas: 7, espera_media_s: 51.4 },
    { andar: 4, chamadas: 9, espera_media_s: 46.1 },
    { andar: 5, chamadas: 5, espera_media_s: 58 },
    { andar: 6, chamadas: 8, espera_media_s: 40.6 },
    { andar: 7, chamadas: 6, espera_media_s: 63.3 },
    { andar: 8, chamadas: 7, espera_media_s: 55 },
    { andar: 9, chamadas: 5, espera_media_s: 71 },
  ],
};
