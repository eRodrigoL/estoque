# ROTEAMENTO E NAVEGAÇÃO NO ANGULAR 21

[↩️ Voltar ao checklist](../CHECKLIST.md#7-configurar-roteamento-principal)

No Angular, **navegação** é o mecanismo que permite trocar de tela sem recarregar a página inteira. Isso é feito pelo **Angular Router**, que associa **URLs** a componentes e renderiza o componente correspondente dentro de um `router-outlet`. A configuração principal do roteamento em aplicações Angular atuais costuma ser feita com `provideRouter(...)`, normalmente no arquivo `app.config.ts`.

---

## O que é uma rota

Uma **rota** é um objeto de configuração que diz ao Angular qual componente carregar quando uma determinada URL for acessada. O conjunto dessas rotas costuma ficar em um array do tipo `Routes`.

Exemplo simples:

```ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tarefas',
    loadComponent: () =>
      import('./features/tarefas/pages/listagem-tarefas/listagem-tarefas').then(
        (m) => m.ListagemTarefas,
      ),
  },
];
```

---

## Como ativar o roteamento na aplicação

A forma correta é registrar as rotas com `provideRouter(...)` em `app.config.ts`. :contentReference[oaicite:2]{index=2}

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)],
};
```

Depois disso, a aplicação precisa ter um `router-outlet` no template para exibir a rota ativa.

```html
<router-outlet />
```

---

## Estrutura básica de um objeto de rota

Uma rota normalmente possui propriedades como:

- `path`: URL da rota
- `component`: componente associado carregado diretamente
- `loadComponent`: componente associado carregado sob demanda
- `redirectTo`: redirecionamento
- `pathMatch`: regra de combinação da URL
- `children`: rotas filhas
- `resolve`: dados carregados antes da ativação
- `canActivate`: proteção de acesso

Essas propriedades fazem parte da configuração do Angular Router.

Exemplo comentado:

```ts
{
  path: 'caminho-da-rota', loadComponent: () => import('./features/exemplo/pages/pagina-exemplo/pagina-exemplo').then((m) => m.PaginaExemplo),
//  │                            │        │   │   │                                                               │    │     │       └── componente exportado
//  │                            │        │   │   │                                                               │    │     └── parâmetro da callback
//  │                            │        │   │   │                                                               │    └── função de callback
//  │                            │        │   │   │                                                               └── encadeamento da Promise
//  │                            │        │   │   └── importação dinâmica
//  │                            │        │   └── arrow function
//  │                            │        └── lista de parâmetros vazia
//  │                            └── propriedade de carregamento lazy do componente
//  └── propriedade da URL da rota
}
```

---

## Uso das rotas no HTML

No HTML, as rotas costumam aparecer de duas formas:

1. no ponto onde a rota ativa será renderizada
2. nos links de navegação da interface

### Renderização da rota ativa

O `router-outlet` funciona como a área onde o Angular renderiza o componente correspondente à URL atual.

```html
<!-- app.html -->
<header>
  <nav>
    <a routerLink="/tarefas">Tarefas</a>
    <a routerLink="/tarefas/criacao">Criar tarefa</a>
  </nav>
</header>

<main>
  <!-- Onde os componentes das rotas serão renderizados -->
  <router-outlet />
</main>
```

### Navegação por link no template

Para navegar entre rotas no HTML, o padrão é usar `routerLink`. Ele pode receber uma string simples ou um array de segmentos. O Router também trata links absolutos, relativos e navegação para níveis acima da rota atual.

```html
<nav>
  <a routerLink="/tarefas">Listagem</a>
  <a routerLink="/tarefas/criacao">Criacao</a>
</nav>
```

Com array de segmentos:

```html
<a [routerLink]="['/tarefas', 'edicao', 10]">Editar tarefa 10</a>
```

Exemplos de navegação relativa:

```html
<a routerLink="detalhes">Ir para rota filha</a>
<a routerLink="../">Voltar um nível</a>
<a routerLink="/inicio">Ir para a raiz da aplicação</a>
```

---

## `component` vs `loadComponent`

Em Angular atual, quando o componente é **standalone**, é comum usar `loadComponent`, porque isso permite **lazy loading** de forma direta e ajuda a dividir melhor o bundle da aplicação. `component` continua válido quando você quer referenciar o componente diretamente, sem carregamento sob demanda.

Exemplo com `loadComponent`:

```ts
{
  path: 'inicio',
  loadComponent: () =>
    import('./features/inicio/pages/pagina-inicio/pagina-inicio')
      .then((m) => m.PaginaInicio),
}
```

Exemplo com `component`:

```ts
import { PaginaInicio } from './features/inicio/pages/pagina-inicio/pagina-inicio';

export const routes: Routes = [
  {
    path: 'inicio',
    component: PaginaInicio,
  },
];
```

---

## Rota de redirecionamento

O redirecionamento inicial é usado quando você quer que a URL vazia leve o usuário para uma rota principal.

```ts
{
  path: '',
  redirectTo: 'inicio',
  pathMatch: 'full',
}
```

- `path: ''` representa a raiz da aplicação
- `redirectTo` define para onde redirecionar
- `pathMatch: 'full'` evita redirecionamentos parciais indevidos

---

## Parâmetros dinâmicos

Quando a rota precisa identificar um item específico, usa-se um parâmetro dinâmico na URL, como `:id`.

```ts
{
  path: 'itens/edicao/:id',
  loadComponent: () =>
    import('./features/itens/pages/edicao-item/edicao-item')
      .then((m) => m.EdicaoItem),
}
```

Nesse caso, `:id` representa um valor dinâmico, como:

- `/itens/edicao/1`
- `/itens/edicao/25`

---

## `withComponentInputBinding`

O Angular Router oferece `withComponentInputBinding()` para passar parâmetros de rota, query params e dados resolvidos diretamente para `input()` do componente. Isso reduz acoplamento com `ActivatedRoute` em muitos cenários.

Exemplo de configuração:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding())],
};
```

---

## Resumo rápido

- **navegação** em Angular é feita com o Router
- as rotas ficam em um array `Routes`
- `provideRouter(routes)` registra o roteamento na aplicação
- `router-outlet` exibe a rota ativa
- `routerLink` cria navegação declarativa no template
- `loadComponent` é o caminho moderno para componentes standalone com lazy loading
- `redirectTo` define redirecionamentos
- `:id` cria parâmetros dinâmicos
- `withComponentInputBinding()` facilita receber dados de rota em `input()`

---

## Exemplos de rotas para as demais propriedades

### Exemplo com `children`

`children` serve para definir rotas filhas, isto é, rotas dentro de uma estrutura hierárquica.

```ts
import { Routes } from '@angular/router';
import { AreaTarefas } from './features/tarefas/pages/area-tarefas/area-tarefas';

export const routes: Routes = [
  {
    path: 'tarefas',
    component: AreaTarefas,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/tarefas/pages/listagem/listagem').then((m) => m.Listagem),
      },
      {
        path: 'criacao',
        loadComponent: () =>
          import('./features/tarefas/pages/criacao/criacao').then((m) => m.Criacao),
      },
    ],
  },
];
```

### Exemplo com `resolve`

`resolve` serve para carregar dados antes de a rota ser ativada. O Router espera o resolver terminar antes de exibir o componente.

```ts
import { ResolveFn, Routes } from '@angular/router';
import { inject } from '@angular/core';
import { ServicoTarefas } from './core/services/servico-tarefas';

const tarefaResolver: ResolveFn<unknown> = (route) => {
  const servicoTarefas = inject(ServicoTarefas);
  const id = route.paramMap.get('id')!;

  return servicoTarefas.buscarPorId(id);
};

export const routes: Routes = [
  {
    path: 'tarefas/edicao/:id',
    loadComponent: () => import('./features/tarefas/pages/edicao/edicao').then((m) => m.Edicao),
    resolve: {
      tarefa: tarefaResolver,
    },
  },
];
```

### Exemplo com `canActivate`

`canActivate` é usado para permitir ou bloquear o acesso a uma rota. Se o guard retornar `false`, a navegação é cancelada; se retornar uma `UrlTree`, o Router redireciona para a nova URL.

```ts
import { CanActivateFn, Router, Routes } from '@angular/router';
import { inject } from '@angular/core';

const podeAcessarPainel: CanActivateFn = () => {
  const router = inject(Router);
  const autenticado = false;

  return autenticado ? true : router.parseUrl('/login');
};

export const routes: Routes = [
  {
    path: 'painel',
    loadComponent: () => import('./features/painel/pages/painel/painel').then((m) => m.Painel),
    canActivate: [podeAcessarPainel],
  },
];
```

### Exemplo com `canMatch`

`canMatch` é parecido com um guard, mas atua na fase de correspondência da rota. Se retornar `false`, o Router ignora aquela rota e continua tentando outras configurações.

```ts
import { CanMatchFn, Routes } from '@angular/router';

const podeCorresponderAdmin: CanMatchFn = () => {
  const usuarioEhAdmin = false;
  return usuarioEhAdmin;
};

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./features/admin/pages/painel-admin/painel-admin').then((m) => m.PainelAdmin),
    canMatch: [podeCorresponderAdmin],
  },
];
```

### Exemplo com `data`

`data` serve para anexar metadados estáticos à rota, como título, nome de seção ou flags de comportamento. Esses dados podem ser lidos depois pelo componente ou por outros pontos da aplicação.

```ts
export const routes: Routes = [
  {
    path: 'relatorios',
    loadComponent: () =>
      import('./features/relatorios/pages/listagem-relatorios/listagem-relatorios').then(
        (m) => m.ListagemRelatorios,
      ),
    data: {
      titulo: 'Relatorios',
      exigeAutenticacao: true,
    },
  },
];
```

### Exemplo com `loadChildren`

Quando a rota precisa carregar um conjunto de rotas filhas sob demanda, usa-se `loadChildren`. Isso continua útil quando a feature possui um arquivo próprio de rotas.

```ts
export const routes: Routes = [
  {
    path: 'tarefas',
    loadChildren: () => import('./features/tarefas/routes').then((m) => m.routes),
  },
];
```

### Exemplo combinado

Um caso real costuma combinar várias propriedades na mesma rota:

```ts
export const routes: Routes = [
  {
    path: 'tarefas',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/tarefas/pages/listagem/listagem').then((m) => m.Listagem),
      },
      {
        path: 'edicao/:id',
        loadComponent: () => import('./features/tarefas/pages/edicao/edicao').then((m) => m.Edicao),
        resolve: {
          tarefa: tarefaResolver,
        },
        canActivate: [podeAcessarPainel],
      },
    ],
  },
];
```
