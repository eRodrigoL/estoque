# (1) Service

## (1) Finalidade

Centralizar acesso a dados e chamadas HTTP.

## (1) Onde usar

Normalmente no TypeScript, em arquivos como:

- `src/app/core/services/`
- `src/app/shared/services/`

## (1) Exemplo

```ts
import { HttpClient } from '@angular/common/http';
//           └── cliente HTTP do Angular

import { inject, Injectable } from '@angular/core';
//         │         └── marca a classe como injetável
//         └── injeta dependências sem usar constructor

@Injectable({
  providedIn: 'root',
}) //           └── deixa o service disponível globalmente
//
export class TarefasService {
  private readonly http = inject(HttpClient);
  //                │       │     └── dependência injetada
  //                |       └── injeta dependências sem usar constructor
  //                └── propriedade usada para fazer requisições

  private readonly apiUrl = 'http://localhost:3000/tarefas';
  //                 │                   └── endpoint base da API
  //                 └── URL base da API ou coleção
}
```

## (1) O que isso significa

O componente não precisa fazer requisição HTTP diretamente.
Ele chama o service, e o service conversa com o backend.

---

## (2) Método do service

### (2) Finalidade

Executar uma operação específica dentro do service.

### (2) Exemplo

```ts
// ⬐ nome do método
getAll() {
  return this.http.get<Tarefa[]>(this.apiUrl);
} //      |    |    |     |             └── URL usada na requisição
//        │    |    |     └── tipo esperado na resposta
//        |    |    └── requisição GET
//        |    └── chamada HTTP
//        └── retorna um Observable
```

### (2) O que isso significa

Quando alguém chamar `getAll()`, o Angular fará uma requisição HTTP para a URL guardada em `apiUrl`.

### (2) Fluxo do dado

1. o componente chama `getAll()`
2. o service faz a requisição
3. a API responde
4. o componente recebe os dados

---
