/** Ícones do painel (SVG em linha, traço de 1,75). */
const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IconeRelogio = () => (
  <svg {...base}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);
export const IconePico = () => (
  <svg {...base}>
    <path d="M3 17l5-5 4 3 7-8" />
    <path d="M14 7h5v5" />
  </svg>
);
export const IconeViagens = () => (
  <svg {...base}>
    <path d="M8 3v18M16 3v18" />
    <path d="M5 7l3-4 3 4M13 17l3 4 3-4" />
  </svg>
);
export const IconeOcupacao = () => (
  <svg {...base}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M17 11a3 3 0 1 0 0-6M21 20c0-2.6-1.6-4.8-4-5.6" />
  </svg>
);
export const IconePredio = () => (
  <svg {...base} width={22} height={22}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 7h2M13 7h2M9 11h2M13 11h2M10 21v-4h4v4" />
  </svg>
);
