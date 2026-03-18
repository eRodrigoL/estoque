# (1) signal()

## (1) Finalidade

Guardar estado local reativo no componente.

## (1) Onde usar

No `.ts` do componente.

## (1) Importação

```ts
import { signal } from '@angular/core';
//         └── função usada para criar estado reativo
```

## (1) Exemplo

```ts
tarefas = signal<Tarefa[]>([]);
//  │        │      │      └── valor inicial
//  │        │      └── tipo do valor guardado
//  │        └── cria o signal
//  └── nome da variável
```

## (1) Como ler no TypeScript

```ts
this.tarefas();
//     │    └── leitura do valor atual
//     └── signal criado no componente
```

## (1) Como ler no HTML

```html
<!-- ┌── diretiva de repetição do Angular -->
<!-- |    ┌── variável que representa cada item da lista -->
<!-- |    |         ┌── palavra-chave que indica de onde vem cada item -->
<!-- |    |         |         ┌── lista que será percorrida -->
<!-- |    |         |         |       ┌── chave usada pelo Angular para rastrear cada item -->
<!--⬋    |         |         |    ┌──┴──┐ -->
@for (tarefa of tarefas(); track tarefa.id) {
<p>{{ tarefa.titulo }}</p>
}
<!--    |      |    └── {{ }} = interpolação = componente → view: trafega o dado renderizando texto -->
<!--    |      └── propriedade do objeto atual -->
<!--    └── objeto atual da repetição -->
```

## (1) Como alterar

### (1) Substituir o valor inteiro

```ts
this.tarefas.set(listaRecebida);
```

### (1) Atualizar com base no valor atual

```ts
this.tarefas.update((tarefas) => [...tarefas, novaTarefa]);
```

## (1) O que isso significa

Sempre que o valor do signal muda, o template que usa esse signal reage automaticamente.

---
