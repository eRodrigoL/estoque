# (1) computed()

## (1) Finalidade

Criar um valor derivado de outros signals.

## (1) Onde usar

No `.ts` do componente.

## (1) Importação

```ts
import { computed } from '@angular/core';
```

## (1) Exemplo

```ts
//     ┌── nome do valor derivado
//     │              ┌── cria valor derivado reativo
//     │              │      ┌── função que calcula o valor derivado
tarefasFiltradas = computed(() => {
  const termo = this.termoBusca().trim().toLowerCase();

  if (!termo) return this.tarefas();

  return this.tarefas().filter((tarefa) => tarefa.titulo.toLowerCase().includes(termo));
});
```

## (1) O que isso significa

`tarefasFiltradas` não guarda um estado independente.
Ele é recalculado com base em outros signals.

## (1) Quando usar

Use `computed()` quando o valor puder ser calculado a partir de outro valor.

Exemplos:

- filtros
- contadores
- totais
- indicadores visuais

---
