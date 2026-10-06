import { useState } from "react";
import type { EventoPosicao } from "@sr/contracts";
import { posicaoExemplo } from "../mocks/posicao.ts";
import type { Origem } from "./origem.ts";

/**
 * O prédio ao vivo — Etapa 3. Hoje mostra a posição de EXEMPLO (parada).
 *
 * TODO Etapa 3: num useEffect, chame ouvirPosicoes(aoMudar, setConectado) e
 * devolva a função de fechar como limpeza do efeito. A cada posição recebida,
 * guarde-a e marque origem "api".
 */
export function useEventos(): { posicao: EventoPosicao | null; origem: Origem; conectado: boolean } {
  const [posicao] = useState<EventoPosicao | null>(posicaoExemplo);
  const [origem] = useState<Origem>("exemplo");
  const [conectado] = useState(false);
  return { posicao, origem, conectado };
}
