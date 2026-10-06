# Arquitetura

Monorepo com **npm workspaces**: a API, o painel e o contrato entre os dois,
no mesmo repositório e com uma versão só.

```
apps/
  api/        Express + TypeScript — o prédio roda aqui dentro e a API expõe os dados
    src/simulador/   o prédio (fornecido: não precisa mexer)
    src/dados/       Operacao: quem chamou, quem embarcou, cada passo (as contas prontas)
    src/routes/      /api/metricas · /api/series · /api/eventos
  web/        React + Vite + Tailwind + Recharts — o painel
    src/components/  cartões, gráficos e o prédio (prontos)
    src/hooks/       useMetricas · useSeries · useEventos  ← você liga aqui
    src/services/    api.ts: o cliente HTTP da API         ← e aqui
    src/mocks/       os dados de exemplo (saem de cena na Etapa 4)
packages/
  contracts/  os tipos das respostas da API, usados pelos dois lados
```

## O caminho de um dado

```
Predio (simulação) → Operacao → rota /api/... → fetch/EventSource (services/api.ts)
                                                → hook (estado, erro, recarregar)
                                                → componente (cartão, gráfico, prédio)
```

- **Componentes não buscam dados.** Eles recebem o que desenhar. Quem busca é o
  hook, e quem fala HTTP é o `services/api.ts`. Trocar a origem dos dados não
  muda nenhum componente.
- **Um contrato, dois lados.** `@sr/contracts` define `Metricas`, `Series` e
  `EventoPosicao`. Se a API mudar um campo, o `npm run typecheck` acusa no painel.
- **Tempo real sem polling.** A posição dos elevadores chega por Server-Sent
  Events (`/api/eventos`): a conexão fica aberta e a API empurra um evento a cada
  passo. Métricas e gráficos mudam devagar e usam consultas periódicas.

## Em desenvolvimento e em produção

- `npm run dev` sobe a API (porta 3001) e o Vite (porta 5173); o Vite repassa
  `/api` para a API, então o painel chama sempre `/api/...` (sem CORS).
- `npm start` compila o painel e sobe só a API, que também serve o painel
  compilado — uma porta, uma origem. É assim que a central do prédio testa.
