# Contrato da API

Os tipos estão em [`packages/contracts/src/index.ts`](../packages/contracts/src/index.ts).
Erros respondem `{"erro": "mensagem"}` com o status HTTP certo.

| Rota | Etapa | Resposta |
|---|---|---|
| `GET /api/saude` | — | `{"ok": true}` |
| `GET /api/metricas` | 1 (pronta na API) | `Metricas` |
| `GET /api/series?andar=0..9\|todos&janela=15\|60` | 2 | `Series` (400 se andar ou janela forem inválidos) |
| `GET /api/eventos` | 3 | `text/event-stream` com eventos `posicao` (`EventoPosicao`) a cada passo |

## Server-Sent Events

O corpo da resposta é texto, e cada evento termina com uma linha em branco:

```
event: posicao
data: {"periodo":1,"segundos":125,"elevadores":[...],"esperando_por_andar":[...]}

```

No navegador: `new EventSource("/api/eventos")` e
`fonte.addEventListener("posicao", (e) => JSON.parse(e.data))`.

## Variáveis de ambiente da API

| Variável | Padrão | Para quê |
|---|---|---|
| `PORT` | 3001 | porta da API |
| `SIMULACAO_SEMENTE` | 7 | o sorteio do movimento (a central usa outra) |
| `SIMULACAO_RITMO_MS` | 1000 | milissegundos por passo de 5 s |
| `SIMULACAO_REPETIR` | 1 | `0` para parar no fim do primeiro período |
