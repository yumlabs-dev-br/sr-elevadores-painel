import type { EventoPosicao } from "@sr/contracts";
import { andarCurto } from "../utils/formatar.ts";

const ANDARES = 10;
const ALTURA = 30;
const TOPO = 14;
const y = (andar: number) => TOPO + (ANDARES - 1 - andar) * ALTURA;
const POCO_X: Record<string, number> = { A: 196, B: 252 };
const COR: Record<string, string> = { A: "#22d3ee", B: "#f472b6" };

/** O prédio em corte: cabines deslizando entre os andares e gente esperando em cada um. */
export function PredioAoVivo({ posicao: aoVivo }: { posicao: EventoPosicao | null }) {
  // Antes do primeiro evento: o prédio vazio, elevadores no térreo.
  const posicao: EventoPosicao = aoVivo ?? { periodo: 0, segundos: 0, elevadores: ["A", "B"].map((id) => ({ id, andar: 0, destino: null, porta: false, lotacao: 0, capacidade: 8 })), esperando_por_andar: Array(10).fill(0) };
  const largura = 320;
  const altura = TOPO + ANDARES * ALTURA + 10;
  return (
    <svg data-testid="predio" data-segundos={posicao.segundos} viewBox={`0 0 ${largura} ${altura}`} className="h-full max-h-[340px] w-full" role="img" aria-label="Corte do prédio com a posição dos elevadores">
      <rect x={40} y={TOPO - 6} width={270} height={ANDARES * ALTURA + 8} rx={10} fill="#0d1628" stroke="#1e2a44" />
      {Array.from({ length: ANDARES }, (_, a) => {
        const esperando = posicao.esperando_por_andar[a] ?? 0;
        return (
          <g key={a}>
            <line x1={40} x2={310} y1={y(a) + ALTURA - 4} y2={y(a) + ALTURA - 4} stroke="#1e2a44" />
            <text x={30} y={y(a) + ALTURA / 2 + 2} textAnchor="end" fontSize={10} fontWeight={600} fill="#8b9bb4" fontFamily="var(--font-mono)">
              {andarCurto(a)}
            </text>
            {Array.from({ length: Math.min(esperando, 6) }, (_, i) => (
              <g key={i} transform={`translate(${60 + i * 16} ${y(a) + ALTURA - 8})`}>
                <circle cy={-11} r={3.4} fill="#fbbf24" />
                <path d="M-4.5 0 Q0 -9 4.5 0 Z" fill="#fbbf24" />
              </g>
            ))}
            {esperando > 6 && (
              <text x={158} y={y(a) + ALTURA / 2 + 3} fontSize={9.5} fill="#fbbf24" fontFamily="var(--font-mono)">
                +{esperando - 6}
              </text>
            )}
          </g>
        );
      })}
      {posicao.elevadores.map((e) => (
        <g key={`poco-${e.id}`}>
          <rect x={POCO_X[e.id] - 4} y={TOPO - 4} width={44} height={ANDARES * ALTURA + 2} rx={4} fill="#08101f" />
          {e.destino !== null && <path d={`M${POCO_X[e.id] + 42} ${y(e.destino) + ALTURA / 2 - 2} l7 -5 v10 Z`} fill={COR[e.id]} opacity={0.85} />}
        </g>
      ))}
      {posicao.elevadores.map((e) => (
        <g key={e.id} data-testid={`elevador-${e.id}`} data-andar={e.andar} style={{ transform: `translateY(${y(e.andar)}px)`, transition: "transform 0.45s ease-in-out" }}>
          <rect x={POCO_X[e.id]} y={2} width={36} height={ALTURA - 8} rx={4} fill={e.porta ? "#0d1628" : COR[e.id]} stroke={COR[e.id]} strokeWidth={2} />
          <text x={POCO_X[e.id] + 18} y={ALTURA / 2 + 2} textAnchor="middle" fontSize={10} fontWeight={800} fill={e.porta ? COR[e.id] : "#0b1120"} fontFamily="var(--font-mono)">
            {e.id}·{e.lotacao}
          </text>
        </g>
      ))}
    </svg>
  );
}
