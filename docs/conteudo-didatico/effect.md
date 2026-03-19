# (1) effect()

## (1) Finalidade

Executar um efeito colateral quando algum signal mudar.

## (1) Onde usar

No `.ts` do componente.

## (1) Importação

```ts
import { effect } from '@angular/core';
```

## (1) Exemplo

```ts
//    ┌── nome dado ao effect
//    │            ┌── cria o efeito
//    │            │    ┌── função executada quando signals lidos mudarem
buscarTarefas = effect(() => {
  const termo = this.termoBusca();

  this.tarefasService.getAll(termo).subscribe((tarefas) => {
    this.tarefas.set(tarefas);
  });
});
```

## (1) O que dispara esse `effect()`

Dentro dele existe:

```ts
this.termoBusca();
```

Então, quando `termoBusca` mudar, o `effect()` roda de novo.

## (1) Quando usar

Use `effect()` quando a mudança de um signal precisar disparar algo externo, como:

- chamada HTTP
- navegação
- log
- persistência
- abertura de modal

## (1) Quando não usar

Não use `effect()` para calcular valor simples.
Se for só derivação, prefira `computed()`.

---
