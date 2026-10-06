import { useCallback, useState } from "react";
import type { Metricas } from "@sr/contracts";
import { metricasExemplo } from "../mocks/metricas.ts";
import type { Estado, Origem } from "./origem.ts";

/**
 * Os indicadores do topo — Etapa 1. Hoje devolve os dados de EXEMPLO.
 *
 * TODO Etapa 1, num useEffect:
 *   - chame buscarMetricas(sinal) (services/api.ts) e guarde o resultado; origem passa a "api"
 *   - em caso de erro, guarde a mensagem em erro (o cartão mostra o aviso e o botão "Tentar de novo")
 *   - repita a cada 5 s (setTimeout) e cancele tudo ao desmontar (AbortController + clearTimeout)
 *   - recarregar() deve disparar uma nova busca (ex.: um contador de tentativas nas dependências do efeito)
 */
export function useMetricas(): Estado<Metricas> {
  const [dados] = useState<Metricas | null>(metricasExemplo);
  const [origem] = useState<Origem>("exemplo");
  const [erro] = useState<string | null>(null);
  const recarregar = useCallback(() => {}, []);
  return { dados, origem, carregando: false, erro, recarregar };
}
