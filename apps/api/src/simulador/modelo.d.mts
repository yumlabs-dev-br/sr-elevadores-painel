// Tipos do motor da simulação (modelo.mjs é o mesmo da central do prédio).
export const ANDARES: number;
export const PASSO_S: number;
export const PASSOS: number;
export const CAPACIDADE: number;
export interface Pessoa { id: number; origem: number; destino: number; chegou: number; embarcou: number | null; desembarcou: number | null; elevador: string | null }
export interface Cabine { id: string; andar: number; destino: number | null; porta: boolean; dentro: Pessoa[] }
export interface Quadro { t: number; rotulo: string; cabines: { id: string; andar: number; destino: number | null; porta: boolean; dentro: number[] }[]; esperando: { andar: number; destino: number; espera: number }[] }
export interface Movimento { elevadores: number; chegada: number; doTerreo: number; paraTerreo: number }
export const MOVIMENTO: Record<"tranquilo" | "almoco" | "pico", Movimento>;
export function despachoPadrao(): (estado: unknown) => { destinos: Record<string, number> };
export function simular(
  m: Movimento,
  semente: number,
  ganchos: {
    decidir: (estado: unknown) => unknown;
    aoChegar?: (p: Pessoa, segundos: number) => Promise<void> | void;
    aoEmbarcar?: (p: Pessoa, c: Cabine, segundos: number) => Promise<void> | void;
    aoDesembarcar?: (p: Pessoa, segundos: number) => Promise<void> | void;
    aoPasso?: (q: Quadro, cabines: Cabine[], esperando: Pessoa[]) => Promise<void> | void;
  },
): Promise<{ quadros: Quadro[]; custo: number; pessoas: Pessoa[]; erro?: string }>;
