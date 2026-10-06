import { EventEmitter } from "node:events";
import { despachoPadrao, MOVIMENTO, simular } from "./modelo.mjs";
import type { Operacao } from "../dados/operacao.ts";

export interface ConfigPredio {
  /** Semente do primeiro período (o período n usa semente + n − 1). */
  semente: number;
  /** Milissegundos de relógio por passo de 5 s (1000 = 5× mais rápido que a vida real). */
  ritmoMs: number;
  /** Começa outro período quando um termina? */
  repetir: boolean;
}

/**
 * O prédio rodando dentro da API: um período de 15 min atrás do outro, com o
 * despacho de referência. A cada passo atualiza a Operacao e emite "passo".
 */
export class Predio extends EventEmitter {
  constructor(
    private readonly operacao: Operacao,
    private readonly config: ConfigPredio,
  ) {
    super();
  }

  async rodar() {
    for (let periodo = 1; ; periodo++) {
      this.operacao.novoPeriodo(periodo);
      await simular(MOVIMENTO.pico, this.config.semente + periodo - 1, {
        decidir: despachoPadrao(),
        aoChegar: (p) => this.operacao.chamou(p),
        aoPasso: async (q, cabines, esperando) => {
          this.operacao.passo(q, cabines, esperando);
          this.emit("passo");
          await new Promise((r) => setTimeout(r, this.config.ritmoMs));
        },
      });
      this.emit("fim-do-periodo", periodo);
      if (!this.config.repetir) return;
    }
  }
}
