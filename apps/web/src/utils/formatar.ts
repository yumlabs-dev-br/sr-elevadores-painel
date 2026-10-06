/** Formatação dos números do painel (pt-BR). */

export const segundos = (v: number | null | undefined) => (v === null || v === undefined ? "—" : `${v.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} s`);

export const numero = (v: number | null | undefined, casas = 1) => (v === null || v === undefined ? "—" : v.toLocaleString("pt-BR", { maximumFractionDigits: casas }));

export const porcento = (v: number | null | undefined) => (v === null || v === undefined ? "—" : `${v.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}%`);

/** 425 → "07:05" (minutos:segundos da simulação). */
export const relogio = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

export const nomeAndar = (a: number) => (a === 0 ? "Térreo" : `${a}º andar`);
export const andarCurto = (a: number) => (a === 0 ? "T" : `${a}º`);
