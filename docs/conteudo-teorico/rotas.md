# (1) Rotas

## (1) Finalidade

Definir qual componente será carregado em cada URL.

## (1) Onde usar

No arquivo de rotas, geralmente `app.routes.ts`.

## (1) Exemplo

```ts
{
  path: 'tarefas',
  //        └── trecho da URL


  //   ┌── propriedade da rota usada para carregar o componente sob demanda
  loadComponent: () =>
    import('./features/tarefas/pages/listagem-tarefas/listagem-tarefas').then((m) => m.ListagemTarefas),
} // |                                                  └── componente exportado
//   |                                                                    |    |     └── módulo importado
//   |                                                                    |    └── parâmetro que representa o módulo importado
//   |                                                                    └─ executa algo depois que o arquivo for carregado
//   └── encadeamento da Promise retornada pelo import()
```

## (1) O que isso significa

Se a URL for `/tarefas`, o Angular carregará o componente `ListagemTarefas`.

---

## (2) `loadComponent`

### (2) Finalidade

Carregar um componente standalone sob demanda.

### (2) Onde usar

Dentro da rota.

### (2) Exemplo

```ts
//    ┌── propriedade usada para carregar componente lazy
loadComponent: () =>
  import('./features/tarefas/pages/criacao-tarefa/criacao-tarefa').then((m) => m.CriacaoTarefa);
```

### (2) O que isso significa

O componente só será carregado quando a rota for realmente acessada.

---

## (3) `router-outlet`

### (3) Finalidade

Definir onde a rota ativa será renderizada.

### (3) Onde usar

No HTML do componente principal ou shell da aplicação.

### (3) Exemplo

```html
<router-outlet />
<!--   └── ponto onde o componente da rota atual será desenhado -->
```

### (3) O que isso significa

Quando a URL mudar, o Angular coloca nesse ponto o componente correspondente.

---

## (4) `routerLink`

### (4) Finalidade

Navegar pelo HTML sem escrever lógica no TypeScript.

### (4) Onde usar

Em links, botões e elementos clicáveis do template.

### (4) Exemplo simples

```html
<button routerLink="/tarefas/criacao">Nova tarefa</button>
<!--      │              └── rota de destino           -->
<!--      └── atributo HTML de navegação (usado em navegações fixas, que não necessitam de parâmetros) -->
```

### (4) Exemplo com parâmetro

```html
<button [routerLink]="['/tarefas/edicao', tarefa.id]">Editar</button>
```

#### (4) Explicação detalhada

```html
<!--                                ┌── segmentos usados para montar a URL final -->
<!--                 ┌──────────────┴───────────────┐ -->
<button [routerLink]="['/tarefas/edicao', tarefa.id]">Editar</button>
<!--      │              │                     │ -->
<!--      │              │                     └── valor dinâmico -->
<!--      │              └── valor dinâmico  -->
<!--      └── binding da propriedade routerLink -->
```

### (4) O que isso significa

Ao clicar no botão, o Angular muda a rota para a URL montada.

---

## (5) Rota de redirecionamento

### (5) Finalidade

Levar a URL vazia para uma rota principal.

### (5) Exemplo

```ts
{
  path: '', redirectTo: 'tarefas', pathMatch: 'full',
  //     |                  |      └───────┬───────┘
  //     |                  |              └── só redireciona se o caminho estiver totalmente vazio
  //     |                  └── destino do redirecionamento
  //     └── URL vazia
}
```

---

## (6) Rota curinga

### (6) Finalidade

Capturar rotas inválidas.

### (6) Exemplo

```ts
{
  path: '**', redirectTo: 'tarefas',
  //     |                    └── rota de destino
  //     └── qualquer rota não encontrada
}
```

### (6) O que isso significa

Se o usuário acessar uma rota inexistente, será redirecionado para a rota definida.

---
