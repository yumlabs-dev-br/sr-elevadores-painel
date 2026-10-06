import type { Andar, ElevadorAoVivo, EventoPosicao, Metricas, Series } from "@sr/contracts";
import { ANDARES, CAPACIDADE, PASSO_S, type Cabine, type Pessoa, type Quadro } from "../simulador/modelo.mjs";

const umaCasa = (v: number) => Math.round(v * 10) / 10;
const media = (xs: number[]) => (xs.length ? umaCasa(xs.reduce((a, b) => a + b, 0) / xs.length) : null);
const espera = (p: Pessoa) => (p.embarcou! - p.chegou) * PASSO_S;

/**
 * O que está acontecendo no prédio neste período: quem chamou, quem embarcou,
 * como estava cada passo. As rotas leem daqui (é o "repositório" do painel).
 */
export class Operacao {
  periodo = 0;
  private pessoas: Pessoa[] = [];
  private passos: { esperandoPorAndar: number[]; lotacao: number; capacidade: number }[] = [];
  private elevadores: ElevadorAoVivo[] = [];

  novoPeriodo(periodo: number) {
    this.periodo = periodo;
    this.pessoas = [];
    this.passos = [];
    this.elevadores = [];
  }

  chamou(p: Pessoa) {
    this.pessoas.push(p);
  }

  passo(_q: Quadro, cabines: Cabine[], esperando: Pessoa[]) {
    const porAndar = Array.from({ length: ANDARES }, (_, a) => esperando.filter((p) => p.origem === a).length);
    this.passos.push({ esperandoPorAndar: porAndar, lotacao: cabines.reduce((s, c) => s + c.dentro.length, 0), capacidade: cabines.length * CAPACIDADE });
    this.elevadores = cabines.map((c) => ({ id: c.id, andar: c.andar, destino: c.destino, porta: c.porta, lotacao: c.dentro.length, capacidade: CAPACIDADE }));
  }

  /** Segundo do último passo concluído (0 antes do primeiro). */
  get segundos() {
    return Math.max(0, this.passos.length - 1) * PASSO_S;
  }

  metricas(): Metricas {
    const embarcaram = this.pessoas.filter((p) => p.embarcou !== null);
    const esperas = embarcaram.map(espera).sort((a, b) => a - b);
    const viagens = this.pessoas.filter((p) => p.desembarcou !== null).length;
    const decorrido = this.passos.length * PASSO_S;
    return {
      periodo: this.periodo,
      segundos: this.segundos,
      espera_media_s: media(esperas),
      espera_p95_s: esperas.length ? esperas[Math.ceil(0.95 * esperas.length) - 1] : null,
      viagens,
      viagens_por_hora: decorrido ? umaCasa(viagens / (decorrido / 3600)) : 0,
      ocupacao_pct: this.passos.length ? umaCasa((this.passos.reduce((s, x) => s + x.lotacao / x.capacidade, 0) / this.passos.length) * 100) : 0,
      chamadas_abertas: this.passos.at(-1)?.esperandoPorAndar.reduce((a, b) => a + b, 0) ?? 0,
      atualizado_em: new Date().toISOString(),
    };
  }

  series(andar: Andar | null, janela: 15 | 60): Series {
    const minutoAtual = Math.max(0, Math.floor((this.passos.length - 1) / 12));
    const pontos = [];
    for (let m = Math.max(0, minutoAtual - janela + 1); m <= minutoAtual && this.passos.length; m++) {
      const ultimo = this.passos[Math.min(this.passos.length - 1, m * 12 + 11)];
      const embarcaram = this.pessoas.filter((p) => p.embarcou !== null && Math.floor(p.embarcou / 12) === m && (andar === null || p.origem === andar));
      pontos.push({
        minuto: m,
        esperando: andar === null ? ultimo.esperandoPorAndar.reduce((a, b) => a + b, 0) : ultimo.esperandoPorAndar[andar],
        espera_media_s: media(embarcaram.map(espera)),
      });
    }
    const andares = [...new Set(this.pessoas.map((p) => p.origem))].sort((a, b) => a - b) as Andar[];
    return {
      andar,
      janela_min: janela,
      pontos,
      por_andar: andares.map((a) => ({ andar: a, chamadas: this.pessoas.filter((p) => p.origem === a).length, espera_media_s: media(this.pessoas.filter((p) => p.origem === a && p.embarcou !== null).map(espera)) })),
    };
  }

  posicao(): EventoPosicao {
    return { periodo: this.periodo, segundos: this.segundos, elevadores: this.elevadores, esperando_por_andar: this.passos.at(-1)?.esperandoPorAndar ?? Array(ANDARES).fill(0) };
  }
}
