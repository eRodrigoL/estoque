# (1) output()

## (1) Finalidade

Emitir eventos do componente filho para o pai.

## (1) Onde usar

No `.ts` do componente filho.

## (1) Importação

```ts
import { output } from '@angular/core';
```

## (1) Exemplo no filho

```ts
removerTarefa = output<Tarefa>();
//    │            │      └── tipo do dado emitido
//    │            └── cria a saída
//    └── nome do evento

remover(tarefa: Tarefa) {
  this.removerTarefa.emit(tarefa);
//         │           │    └── dado enviado ao pai
//         │           └── dispara o evento
//         └── output criado
}
```

## (1) Exemplo no HTML do pai

```html
<app-lista-tarefas (removerTarefa)="removerTarefa($event)" />
<!--                 │                │             └── dado recebido do filho -->
<!--                 │                └── método do pai -->
<!--                 └── evento emitido pelo filho -->
```

## (1) O que isso significa

O filho informa ao pai que algo aconteceu.
O pai continua sendo responsável pelo fluxo principal.

---
