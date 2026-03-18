# (1) input()

## (1) Finalidade

Receber dados do componente pai.

## (1) Onde usar

No `.ts` do componente filho.

## (1) Importação

```ts
import { input } from '@angular/core';
```

## (1) Exemplo no componente filho

```ts
tarefas = input.required<Tarefa[]>();
// │        │     │        │
// │        │     │        └── tipo esperado
// │        │     └── input obrigatório
// │        └── função input
// └── nome da propriedade
```

## (1) Exemplo no HTML do pai

```html
<app-lista-tarefas [tarefas]="tarefasFiltradas()" />
<!--                   │             │                          -->
<!--                   │             └── valor enviado pelo pai -->
<!--                   └── nome do input do filho -->
```

## (1) O que isso significa

O componente pai envia um dado, e o componente filho recebe esse dado.

## (1) Fluxo do dado

1. o pai possui os dados
2. o pai envia os dados
3. o filho recebe
4. o filho usa esses dados no template

---
