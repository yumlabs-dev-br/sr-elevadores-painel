import type { EventoPosicao } from "@sr/contracts";

/** Dados de EXEMPLO (estáticos): o prédio parado. Na Etapa 3 vem ao vivo de GET /api/eventos. */
export const posicaoExemplo: EventoPosicao = {
  periodo: 1,
  segundos: 540,
  elevadores: [
    { id: "A", andar: 6, destino: 9, porta: false, lotacao: 3, capacidade: 8 },
    { id: "B", andar: 1, destino: 0, porta: true, lotacao: 5, capacidade: 8 },
  ],
  esperando_por_andar: [3, 0, 1, 0, 0, 2, 0, 0, 0, 1],
};
