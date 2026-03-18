# CHECKLIST

[➕ Checklist enxuto](./checklist-enxuto.md)
[➕ Checklist detalhado génerico](./checklist.md)

> Ordem pensada para otimizar o tempo: primeiro, a espinha dorsal da aplicação; depois, o CRUD; por fim, os refinamentos.

## FASE 1. Configurações iniciais

> Ambiente quebrado impede tudo; mas depois disso não vale gastar tempo excessivo aqui.

### 1. Preparação mínima do ambiente

- [ ] Confirmar versões:

  ```bash
  node -v
  npm -v
  git --version
  ```

- [ ] Confirmar que Angular CLI pode ser executado:

  ```bash
  npx @angular/cli@latest version
  ```

- Só se necessário:
  - [ ] Instalar Node.js
  - [ ] Instalar Git
  - [ ] Instalar e configurar VSCode
  - [ ] Instalar extensões principais

---

### 2. Criação da aplicação Angular

> Angular 21 enfatiza componentes standalone e uma experiência moderna centrada em APIs como `provideRouter(...)`.

- [ ] Criar aplicação Angular 21 com Angular CLI

  ```bash
  npx @angular/cli@21 new nome-da-aplicação
  ```

- [ ] Confirmar `app.config.ts`, `app.routes.ts` e estrutura inicial do projeto

- [ ] Rodar a aplicação

  ```bash
  npm start
  ```

> Que por padrão estará acessível em `http://localhost:4200/`

- [ ] Confirmar que a aplicação sobe no navegador

---

### 3. Definição da arquitetura inicial

> - Isso evita sair criando arquivo aleatório e depois mover tudo no meio
> - Alias tarde demais gera refatoração inútil.
> - Estrutura e nomes-base devem nascer cedo.

- [x] Definir (planejar) o objetivo da aplicação e suas funcionalidades principais:
  - Neste projeto:
    - Estoque de Produtos

- [x] Definir (planejar) a estrutura de pastas inicial
  - Neste projeto:
    - `core/`
    - `core/services/`
    - `features/`
      - `features/pages/`
    - `shared/`
      - `shared/components/`
      - `shared/interfaces/`

- [x] Definir (planejar) as páginas:
  - Neste projeto:
    - listagem
    - criação
    - edição

- [x] Definir (planejar) interfaces principais
  - Neste projeto:
    - `produto`
    - `produtosPayload`

- [x] Definir (planejar) componentes reutilizáveis previstos:
  - Neste projeto:
    - campo de busca
    - lista/cards
    - modal de confirmação

- [x] Definir (planejar) serviço principal da feature

---

### 4. Configurações estruturais

> Padronização de nomes agrega profissionalismo.
> Aliases de importação aumentam a legibilidade do código e, quanto antes implementar, menos refatoração de código.

- [x] Definir padrão de nomes [ℹ️](./conteudo-teorico/nomenclaturas.md)
- [x] Definir convenção de nomes das features [ℹ️](./conteudo-teorico/nomenclaturas.md#17-convencao-para-features)
- [ ] Criar aliases de importação no `tsconfig.json`

  ```json
  {
    "compilerOptions": {
      "baseUrl": "./src",
      "paths": {
        "@app/*": ["app/*"],
        "@core/*": ["app/core/*"],
        "@shared/*": ["app/shared/*"],
        "@features/*": ["app/features/*"]
      }
    }
  }
  ```

---

### 5. Backend fake e base de dados

> O Json Server simula uma API, permitindo codar o CRUD eficazmento tal como seria feito com os links de uma API verdadeira.
>
> Para evitar que dados de teste encham desnecessariamente o armazenamento do repositório, a abordagem mais segura é manter um arquivo base versionado e gerar o `db.json` localmente a partir dele.

- [ ] Instalar `json-server`

  ```bash
  npm install -D json-server
  ```

- [ ] Instalar `concurrently`

  ```bash
  npm install -D concurrently
  ```

- [ ] Criar um arquivo matriz, por exemplo `mock/db.base.json`
  - exemplo vazio

    ```json
    {
      "nome-da-tabela": []
    }
    ```

  - exemplo com dados

    ```json
    {
      "nome-da-tabela": [
        {
          "chave": "valor"
        }
      ]
    }
    ```

- [ ] Definir a coleção principal da aplicação no `mock/db.base.json`

- [ ] Adicionar `mock/db.json` no `.gitignore`

- [ ] Criar um script para recriar o banco local a partir da matriz
  - Exemplo: `scripts/reset-db.mjs`

    ```mjs
    //            ┌── copyFileSync ➡️ função do Node usada para copiar arquivos de forma síncrona
    //            │            ┌── existsSync ➡️ função do Node usada para verificar se um arquivo existe
    import { copyFileSync, existsSync } from 'node:fs';

    //      ┌── source ➡️ caminho do arquivo matriz/base
    const source = 'mock/db.base.json';

    //      ┌── target ➡️ caminho do arquivo que será criado ou sobrescrito
    const target = 'mock/db.json';

    /*
    ┌── if (...) ➡️ estrutura condicional
    │  ┌── ! ➡️ negação lógica
    │  │    ┌── existsSync(source) ➡️ verifica se o arquivo base existe */
    if (!existsSync(source)) {
      //    ┌── console.error() ➡️ escreve mensagem de erro no terminal
      console.error(`Arquivo base não encontrado: ${source}`);

      // ┌── process.exit(1) ➡️ encerra o script com código de erro
      process.exit(1);
    }

    //    ┌── copyFileSync() ➡️ copia o conteúdo do arquivo base para o arquivo de destino
    //    │        ┌── source ➡️ arquivo de origem
    //    │        |       ┌── target ➡️ arquivo de destino
    copyFileSync(source, target);

    //    ┌── console.log() ➡️ escreve mensagem de sucesso no terminal
    console.log(`Banco local recriado com sucesso: ${source} -> ${target}`);
    ```

- [ ] Adicionar scripts no `package.json`

  ```json
  {
    "scripts": {
      "start": "ng serve",
      "start:db": "node ./scripts/preparar-db-json.mjs",
      "preserver": "npm run start:db",
      "server": "json-server --watch mock/db.json --port 3000",
      "dev": "concurrently \"npm:start\" \"npm:server\""
    }
  }
  ```

- [ ] Criar `mock/db.base.json`
  - Neste projeto:

  ```json
  {
    "produtoss": []
  }
  ```

- [ ] Adicionar `mock/db.json` no `.gitignore`

- [ ] Criar um script para recriar o banco local a partir da matriz

  ```mjs
  import { copyFileSync, existsSync } from 'node:fs';

  const source = 'mock/db.base.json';

  const target = 'mock/db.json';

  if (!existsSync(source)) {
    console.error(`Arquivo base não encontrado: ${source}`);
    process.exit(1);
  }

  copyFileSync(source, target);

  console.log(`Banco local recriado com sucesso: ${source} -> ${target}`);
  ```

- [ ] Adicionar script no `package.json`

  ```json
  {
    "scripts": {
      "start": "ng serve",
      "start:db": "node ./scripts/preparar-db-json.mjs",
      "preserver": "npm run start:db",
      "server": "json-server --watch mock/db.json --port 3000",
      "dev": "concurrently \"npm:start\" \"npm:server\""
    }
  }
  ```

- [ ] Rodar backend fake

  ```bash
  npm run server
  ```

- [ ] Rodar frontend e backend juntos

  ```bash
  npm run dev
  ```

- [ ] Validar endpoint no navegador ou terminal

  No navegador:

  ```bash
  http://localhost:3000/nome-da-tabela
  ```

  No terminal:

  ```bash
  curl http://localhost:3000/nome-da-tabela
  ```

---

## FASE 2. Desenho da aplicação com Angular Material, sem estilização

### 6. Instalar Angular Material

- [ ] Instalar Angular Material

```bash
npx ng add @angular/material
```

---

### 7. Criar páginas-base com Angular CLI

> - `ng generate component nome-do-componente` = `ng g c nome-do-componente`
> - `npx ng g c nome-do-componente`, se o Angular não foi instalado globalmente

- [ ] Criar artefatos [🔎](./conteudo-teorico/artefatos.md) do tipo componente para servir de páginas
  - Neste projeto:
    - [ ] Criar página de listagem

      ```bash
      npx ng g c features/pages/listagem-produtoss
      ```

    - [ ] Criar página de criação

      ```bash
      npx ng g c features/pages/criacao-produtos
      ```

    - [ ] Criar página de edição

      ```bash
      npx ng g c features/pages/edicao-produtos
      ```

    - [ ] Criar componente cabecalho

      ```bash
      npx ng g c shared/components/cabecalho
      ```

    - [ ] Criar componente modal de confirmação

      ```bash
      npx ng g c shared/components/modal-confirmacao
      ```

- [ ] Confirmar que os arquivos foram gerados na estrutura correta

---

### 8. Montar o desenho da aplicação sem foco em estilo

- [ ] Criar app shell
  - Neste projeto:
    - [ ] Adicionar `router-outlet`

      ```html
      <!-- src/app/app.html -->
      <router-outlet />
      ```

    - [ ] Adicionar toolbar

      ```html
      <!-- src/app/app.html -->
      <app-cabecalho />

      <main>
        <router-outlet />
      </main>
      ```

- [ ] Colocar conteúdo simples nas páginas

> Importante não esquecer da propriedade `type` nos botões.

- Neste projeto:
  - [ ] Página de listagem:

    ```html
    <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
    <section>
      <h2>Tarefas</h2>

      <mat-form-field>
        <mat-label>Pesquisar tarefa</mat-label>
        <input matInput placeholder="Ex.: estudar para prova" />
      </mat-form-field>

      <div>
        <button type="button" matButton="filled">Nova tarefa</button>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Tarefa de exemplo</mat-card-title>
          <mat-card-subtitle>Pendente</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>Descrição da tarefa de exemplo.</p>
        </mat-card-content>

        <mat-card-actions>
          <button type="button" matButton="filled">Editar</button>
          <button type="button" matButton="outlined">Remover</button>
        </mat-card-actions>
      </mat-card>
    </section>
    ```

  - [ ] Página de criação:

    ```html
    <!-- src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.html -->
    <section>
      <h2>Criacao de tarefa</h2>

      <form>
        <mat-form-field>
          <mat-label>Titulo</mat-label>
          <input matInput placeholder="Digite o titulo da tarefa" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Descricao</mat-label>
          <textarea matInput placeholder="Digite uma descricao para a tarefa"></textarea>
        </mat-form-field>

        <div>
          <button type="button" matButton="outlined">Cancelar</button>
          <button type="submit" matButton="filled">Salvar</button>
        </div>
      </form>
    </section>
    ```

  - [ ] Página de edição:

    ```html
    <!-- src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.html -->
    <section>
      <h2>Edicao de tarefa</h2>

      <form>
        <mat-form-field>
          <mat-label>Titulo</mat-label>
          <input matInput value="Tarefa de exemplo" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Descricao</mat-label>
          <textarea matInput>Descricao da tarefa de exemplo.</textarea>
        </mat-form-field>

        <div>
          <button type="button" matButton="outlined">Cancelar</button>
          <button type="submit" matButton="filled">Salvar alteracoes</button>
        </div>
      </form>
    </section>
    ```

  - [ ] Modal de confirmação:

    ```html
    <h2 mat-dialog-title>Remover tarefa</h2>

    <mat-dialog-content>
      <p>Tem certeza que deseja remover esta tarefa?</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button matButton>Cancelar</button>
      <button matButton="filled">Remover</button>
    </mat-dialog-actions>
    ```

  - [ ] Cabeçalho

    ```html
    <!-- src/app/shared/components/cabecalho/cabecalho.html -->
    <mat-toolbar>
      <span>Lista de Tarefas</span>
    </mat-toolbar>
    ```

---

## FASE 3. Navegação

### 9. Configurar roteamento principal

Roteamento e navegação [🔎](./conteudo-teorico/navegacao.md)

- [ ] Configurar `provideRouter(routes)` no `app.config.ts`

  ```ts
  import { ApplicationConfig } from '@angular/core';
  import { provideRouter } from '@angular/router';

  import { routes } from './app.routes';

  export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)],
  };
  ```

- [ ] Criar rotas no `app.routes.ts`
  - Neste projeto:
    - [ ] Criar rota da listagem

      ```ts
      {
        path: 'tarefas',
        loadComponent: () =>
          import('./features/tarefas/pages/listagem-tarefas/listagem-tarefas')
            .then((m) => m.ListagemTarefas),
        pathMatch: 'full',
      }
      ```

    - [ ] Criar rota de criação

      ```ts
      {
        path: 'tarefas/criacao',
        loadComponent: () =>
          import('./features/tarefas/pages/criacao-tarefa/criacao-tarefa')
            .then((m) => m.CriacaoTarefa),
      }
      ```

    - [ ] Criar rota de edição

      ```ts
      {
        path: 'tarefas/edicao/:id',
        loadComponent: () =>
          import('./features/tarefas/pages/edicao-tarefa/edicao-tarefa')
            .then((m) => m.EdicaoTarefa),
      }
      ```

    - [ ] Definir redirect inicial

      ```ts
      {
        path: '',
        redirectTo: 'tarefas',
        pathMatch: 'full',
      }
      ```

    - [ ] Adicionar rota curinga para fallback

      ```ts
      {
        path: '**',
        redirectTo: 'tarefas',
      }
      ```

  - [ ] Garantir que a aplicação continua compilando

---

### 10. Implementar navegação entre páginas

- [ ] Importar `RouterLink` nos componentes de página

  ```ts
  import { RouterLink } from '@angular/router';
  ```

- [ ] Implementar `routerLink="rota-de-destino"` nos elementos de navegação do template
  - Neste projeto:
    - da **listagem** para criação
      - [ ] Adicionar link no botão **Nova tarefa**

        ```html
        <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
        <button matButton="filled" routerLink="/tarefas/criacao">Nova tarefa</button>
        ```

    - da **listagem** para edição
      - [ ] Adicionar link no botão **Editar**

        > O `1` ainda é fixo só para validar a navegação.
        > Depois, no CRUD real, ele se tornará o `id` dinâmico da tarefa.

        ```html
        <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
        <button matButton="filled" [routerLink]="['/tarefas/edicao', 1]">Editar</button>
        ```

    - de **criação** para listagem
      - [ ] Adicionar link no botão **Cancelar**

        ```html
        <!-- src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.html -->
        <button type="button" matButton="outlined" routerLink="/tarefas">Cancelar</button>
        ```

      - Não adicionar rota no botão **Salvar**

        > Essa navegação fará parte da lógica no TypeScript.

    - de **edição** para listagem
      - [ ] Adicionar link no botão **Cancelar**

        ```html
        <!-- src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.html -->
        <button type="button" matButton="outlined" routerLink="/tarefas">Cancelar</button>
        ```

      - Não adicionar rota no botão **Salvar**

        > Essa navegação fará parte da lógica no TypeScript.

    - de volta após salvar
      - [ ] Adicionar link no botão **Salvar**

        > Esse uso no botão de submit é apenas provisório para validar o fluxo visual.
        > Depois, o correto será navegar programaticamente com `Router` via TypeScript após o submit.

        ```html
        <!-- Exemplo temporário -->
        <button type="submit" matButton="filled" routerLink="/tarefas">Salvar</button>
        ```

- [ ] Confirmar fluxo básico completo entre páginas
  - Neste projeto:
    - [ ] Entrar em `/tarefas`
    - [ ] Ir para `/tarefas/criacao`
    - [ ] Voltar para `/tarefas`
    - [ ] Ir para `/tarefas/edicao/1`
    - [ ] Voltar para `/tarefas`
    - [ ] Acessar uma rota inexistente e confirmar redirecionamento para `/tarefas`

---

## FASE 4. CRUD funcional

### 11. Criar o serviço HTTP da feature

> No Angular 21, o `HttpClient` é disponibilizado com `provideHttpClient()`.
> O service centraliza o acesso aos dados e evita espalhar chamadas HTTP pelos componentes.

- [ ] Criar interface principal da feature

  > - `ng generate interface nome-da-interface` = `ng g i nome-da-interface`
  > - `npx ng g c nome-da-interface`, se o Angular não foi instalado globalmente

  ```bash
  npx ng generate interface shared/interfaces/tarefa
  ```

- Neste projeto:
  - [ ] Criar `tarefa.ts`

    ```bash
    npx ng generate interface nome-da-interface
    ```

    ```ts
    // src/app/shared/interfaces/tarefa.ts
    export interface Tarefa {
      id: number;
      titulo: string;
      descricao: string;
      concluida: boolean;
    }

    export type PayloadTarefa = Omit<Tarefa, 'id'>;
    ```

- [ ] Configurar `provideHttpClient()` no `app.config.ts`

  ```ts
  // src/app/app.config.ts
  /*
  import { ApplicationConfig } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { routes } from './app.routes';
  import { provideHttpClient } from '@angular/common/http';
  */

  export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient()],
  };
  ```

- [ ] Criar o serviço HTTP da feature
  - Neste projeto:

    ```bash
    npx ng g s core/services/tarefas.service
    ```

- [ ] Injetar `HttpClient` no service
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    import { HttpClient } from '@angular/common/http';
    import { inject, Injectable } from '@angular/core';

    /*
    @Injectable({
      providedIn: 'root',
    })
    */

    export class TarefasService {
      private readonly http = inject(HttpClient);
    }
    ```

- [ ] Definir a URL base da API no service
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    private readonly apiUrl = 'http://localhost:3000/tarefas';
    ```

- [ ] Implementar `getAll`
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    import { ..., HttpParams } from '@angular/common/http';
    import { Tarefa } from '@shared/interfaces/tarefa';

    [...]

    getAll(busca?: string) {
      let params = new HttpParams();

      if (busca) {
        params = params.set(`q`, busca);
      }

      return this.http.get<Tarefa[]>(this.apiUrl, { params });
    }
    ```

- [ ] Implementar `getById`
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    getById(id: number | string) {
      return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
    }
    ```

- [ ] Implementar `criar`
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    import { PayloadTarefa } from '@shared/interfaces/tarefa';

    [...]

    criar(payload: PayloadTarefa) {
      return this.http.post<Tarefa>(this.apiUrl, payload);
    }
    ```

- [ ] Implementar `update`
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    update(id: number, payload: PayloadTarefa) {
      return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, payload);
    }
    ```

- [ ] Implementar `remove`
  - Neste projeto:

    ```ts
    // src/app/core/services/tarefas.service.ts
    remove(id: number) {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    ```

- [ ] Validar chamadas básicas no backend fake via terminal
  - Neste projeto:
    - [ ] Listar todas as tarefas

      ```bash
      curl http://localhost:3000/tarefas
      ```

    Como tabela `tarefas` está vazia, o retorno deve ser um Array vazio: **[ ]**

---

### 12. CRUD funcional — listagem primeiro

- Listar tarefas
  - [ ] Buscar lista no backend

    ```ts
    // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
    import { [...], inject, signal } from '@angular/core';

    import { Tarefa } from '@shared/interfaces/tarefa';
    import { TarefasService } from '@core/services/tarefas.service';

    export class ListagemTarefas {
      private readonly tarefasService = inject(TarefasService);

      tarefas = signal<Tarefa[]>([]);

      ngOnInit() {
        this.tarefasService.getAll().subscribe({
          next: (tarefas) => {
            this.tarefas.set(tarefas);
          },
        });
      }
    }
    ```

  - [ ] Trocar itens estáticos da listagem por dados reais

    ```html
    <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
    <section>
      [...] @for (tarefa of tarefas(); track tarefa.id) {
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ tarefa.titulo }}</mat-card-title>
          <mat-card-subtitle> {{ tarefa.concluida ? 'Concluída' : 'Pendente' }} </mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>{{ tarefa.descricao }}</p>
        </mat-card-content>

        <mat-card-actions>
          <button matButton="filled" [routerLink]="['/tarefas/edicao', tarefa.id]">Editar</button>
          <button matButton="outlined">Remover</button>
        </mat-card-actions>
      </mat-card>
      }
    </section>
    ```

  - [ ] Exibir carregamento simples

    ```ts
    // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
    export class ListagemTarefas {
      ...

      carregando = signal(true);

      ngOnInit() {
        this.tarefasService.getAll().subscribe({
          next: (tarefas) => {
            this.tarefas.set(tarefas);
            this.carregando.set(false);
          },
          error: () => {
            this.carregando.set(false);
          },
        });
      }
    }
    ```

    ```html
    <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
    <section>
      [...] @if (carregando()) {
      <p>Carregando tarefas...</p>
      } @else { @for (tarefa of tarefas(); track tarefa.id) {
      <mat-card> [...] </mat-card>
      } }
    </section>
    ```

  - [ ] Exibir mensagem simples se ocorrer erro ao carregar

    ```ts
    // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
    export class ListagemTarefas {
      [...]

      erro = signal('');

      ngOnInit() {
        this.tarefasService.getAll().subscribe({
          next: (tarefas) => {
            this.tarefas.set(tarefas);
            this.carregando.set(false);
          },
          error: () => {
            this.erro.set('Nao foi possivel carregar as tarefas.');
            this.carregando.set(false);
          },
        });
      }
    }
    ```

    ```html
    <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
    <section>
      <h2>Tarefas</h2>

      [...] @if (carregando()) {
      <p>Carregando tarefas...</p>
      } @else if (erro()) {
      <p>{{ erro() }}</p>
      } @else { @for (tarefa of tarefas(); track tarefa.id) {
      <mat-card> ... </mat-card>
      } }
    </section>
    ```

---

### 13. CRUD funcional — criação

- Criar tarefa
  - [ ] Montar formulário com Reactive Forms

    ```ts
    // src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.ts
    [...]
    import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

    @Component({
      imports: [
        [...]
        ReactiveFormsModule,
      ],
    })

    export class CriacaoTarefa {
      form = new FormGroup({
        titulo: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        descricao: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      });
    }
    ```

    ```html
    <!-- src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.html -->
    [...]
    <form [formGroup]="form">
      [...]
      <mat-label>Título</mat-label>
      <input [...] formControlName="titulo" [...] />
      [...]
      <mat-label>Descrição</mat-label>
      <textarea [...] formControlName="descricao" [...]></textarea>
      [...]
    </form>
    [...]
    ```

  - [ ] Fazer submit simples no front

    ```ts
    // src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.ts
    export class CriacaoTarefa {
      [...]

      salvar() {
        console.log(this.form.getRawValue());
      }
    }
    ```

    ```html
    <!-- src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.html -->
    <section>
      [...]

      <form [formGroup]="form" (ngSubmit)="salvar()">...</form>
    </section>
    ```

  - [ ] Trocar dados fixos do formulário por envio real

    ```ts
    // src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.ts
    import { [...], inject } from '@angular/core';
    import { Router } from '@angular/router';

    import { TarefasService } from '@core/services/tarefas.service';

    export class CriacaoTarefa {
      private readonly router = inject(Router);
      private readonly tarefasService = inject(TarefasService);

      [...]

      salvar() {
        if (this.form.invalid) return;

        this.tarefasService.criar({
          ...this.form.getRawValue(),
          concluida: false,
        }).subscribe();
      }
    }
    ```

  - [ ] Navegar de volta para a listagem após criar

    ```ts
    // src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.ts
    export class CriacaoTarefa {
      [...]

      salvar() {
        if (this.form.invalid) return;

        this.tarefasService.criar({
          ...this.form.getRawValue(),
          concluida: false,
        }).subscribe({
          next: () => {
            this.router.navigateByUrl('/tarefas');
          },
        });
      }
    }
    ```

---

### 14. CRUD funcional — edição

- Editar tarefa
  - [ ] Navegar para edição com `id`

    ```html
    <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
    <section>
      [...]

      <mat-card-actions>
        <button matButton="filled" [routerLink]="['/tarefas/edicao', tarefa.id]">Editar</button>
        <button matButton="outlined">Remover</button>
      </mat-card-actions>

      [...]
    </section>
    ```

  - [ ] Buscar tarefa por `id`

    ```ts
    // src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.ts
    import { [...], inject } from '@angular/core';
    import { ActivatedRoute, RouterLink } from '@angular/router';
    import { TarefasService } from '@core/services/tarefas.service';

    @Component({
      selector: 'app-edicao-tarefa',
      imports: [...],
      templateUrl: './edicao-tarefa.html',
      styleUrl: './edicao-tarefa.scss',
    })
    export class EdicaoTarefa {
      private readonly route = inject(ActivatedRoute);
      private readonly tarefasService = inject(TarefasService);

      readonly id = Number(this.route.snapshot.paramMap.get('id'));

      ngOnInit() {
        this.tarefasService.getById(this.id).subscribe();
      }
    }
    ```

  - [ ] Preencher formulário com dados reais

    ```ts
    // src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.ts
    import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
    import { MatInputModule } from '@angular/material/input';

    @Component({
      selector: 'app-edicao-tarefa',
      imports: [
        [...],
        ReactiveFormsModule,
        MatInputModule,
      ],
      templateUrl: './edicao-tarefa.html',
      styleUrl: './edicao-tarefa.scss',
    })
    export class EdicaoTarefa {
      [...]

      form = new FormGroup({
        titulo: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        descricao: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        concluida: new FormControl(false, {
          nonNullable: true,
        }),
      });

      ngOnInit() {
        this.tarefasService.getById(this.id).subscribe({
          next: (tarefa) => {
            this.form.patchValue({
              titulo: tarefa.titulo,
              descricao: tarefa.descricao,
              concluida: tarefa.concluida,
            });
          },
        });
      }
    }
    ```

    ```html
    <!-- src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.html -->
    <section>
      <h2>Edição de tarefa</h2>

      <form [formGroup]="form">
        <mat-form-field>
          <mat-label>Título</mat-label>
          <input matInput formControlName="titulo" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Descrição</mat-label>
          <textarea matInput formControlName="descricao"></textarea>
        </mat-form-field>

        <div>
          <button type="button" matButton="outlined" routerLink="/tarefas">Cancelar</button>
          <button type="submit" matButton="filled">Salvar alterações</button>
        </div>
      </form>
    </section>
    ```

  - [ ] Enviar atualização ao backend

    ```ts
    // src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.ts
    import { Router } from '@angular/router';

    export class EdicaoTarefa {
      ...

      private readonly router = inject(Router);

      salvar() {
        if (this.form.invalid) return;

        this.tarefasService.update(this.id, this.form.getRawValue()).subscribe({
          next: () => {
            this.router.navigateByUrl('/tarefas');
          },
        });
      }
    }
    ```

    ```html
    <!-- src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.html -->
    <section>
      [...]

      <form [formGroup]="form" (ngSubmit)="salvar()">[...]</form>
    </section>
    ```

  - [ ] Voltar para a listagem

    ```ts
    // src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.ts
    export class EdicaoTarefa {
      [...]

      salvar() {
        if (this.form.invalid) return;

        this.tarefasService.update(this.id, this.form.getRawValue()).subscribe({
          next: () => {
            this.router.navigateByUrl('/tarefas');
          },
        });
      }
    }
    ```

  - [ ] Confirmar alteração refletida na lista

---

### 16. CRUD funcional — remoção

- Deletar tarefa
  - [ ] Criar ação de remoção

    ```ts
    // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
    export class ListagemTarefas {
      [...]

      removerTarefa(id: number) {
        console.log('Remover tarefa', id);
      }
    }
    ```

    ```html
    <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
    <section>
      [...]

      <button matButton="outlined" (click)="removerTarefa(tarefa.id)">Remover</button>

      [...]
    </section>
    ```

  - [ ] Enviar `DELETE`

    ```ts
    // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
    export class ListagemTarefas {
      [...]

      removerTarefa(id: number) {
        this.tarefasService.remove(id).subscribe();
      }
    }
    ```

  - [ ] Atualizar a lista após remover

    ```ts
    // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
    export class ListagemTarefas {
      [...]

      removerTarefa(id: number) {
        this.tarefasService.remove(id).subscribe({
          next: () => {
            this.tarefas.update((tarefas) =>
              tarefas.filter((tarefa) => tarefa.id !== id),
            );
          },
        });
      }
    }
    ```

---

## FASE 5. Estilização rudimentar

### 17. Refinar interface com Angular Material e SCSS — nível rudimentar primeiro

> No Angular 21:
>
> - estilos globais ficam em `src/styles.scss`
> - estilos locais ficam no `styleUrl` de cada componente
> - Angular Material continua sendo a biblioteca oficial de componentes visuais para Angular
> - o ideal é manter tema e overrides globais separados da estilização específica de cada tela

- [ ] Definir o tema global do Angular Material em src/styles.scss

  ```scss
  // src/styles.scss
  @use '@angular/material' as mat;

  html {
    @include mat.theme(
      (
        color: (
          primary: mat.$azure-palette,
          tertiary: mat.$blue-palette,
        ),
        typography: Roboto,
        density: 0,
      )
    );
  }

  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  body {
    margin: 0;
    background-color: var(--mat-sys-surface);
    color: var(--mat-sys-on-surface);
    font: var(--mat-sys-body-medium);
    font-family: Roboto, 'Helvetica Neue', sans-serif;
  }
  ```

- [ ] Melhorar o shell principal da aplicação

  ```html
  <!-- src/app/app.html -->
  <app-cabecalho />

  <main class="conteudo-principal">
    <router-outlet />
  </main>
  ```

  ```scss
  /* src/app/app.scss */
  .conteudo-principal {
    max-width: 960px;
    margin: 0 auto;
    padding: 24px 16px 40px;
  }
  ```

- [ ] Melhorar o cabeçalho

  ```ts
  // src/app/shared/components/cabecalho/cabecalho.ts
  import { Component } from '@angular/core';
  import { MatToolbarModule } from '@angular/material/toolbar';

  @Component({
    selector: 'app-cabecalho',
    imports: [MatToolbarModule],
    templateUrl: './cabecalho.html',
    styleUrl: './cabecalho.scss',
  })
  export class Cabecalho {}
  ```

  ```html
  <!-- src/app/shared/components/cabecalho/cabecalho.html -->
  <mat-toolbar class="cabecalho">
    <span>Lista de Tarefas</span>
  </mat-toolbar>
  ```

  ```scss
  /* src/app/shared/components/cabecalho/cabecalho.scss */
  .cabecalho {
    position: sticky;
    top: 0;
    z-index: 10;
    padding-inline: 16px;
  }
  ```

- [ ] Padronizar a página de listagem com espaçamento e largura útil

  ```scss
  /* src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.scss */
  :host {
    display: block;
  }

  section {
    display: grid;
    gap: 16px;
  }

  .acoes-topo {
    display: flex;
    justify-content: flex-end;
  }

  .lista-cards {
    display: grid;
    gap: 16px;
  }

  mat-form-field {
    width: 100%;
  }

  mat-card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  ```

- [ ] Ajustar o template da listagem para usar a estrutura visual

  ```html
  <!-- src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.html -->
  <section>
    <h2>Tarefas</h2>

    <mat-form-field>
      <mat-label>Pesquisar tarefa</mat-label>
      <input matInput placeholder="Ex.: estudar para prova" />
    </mat-form-field>

    <div class="acoes-topo">
      <button type="button" matButton="filled" routerLink="/tarefas/criacao">Nova tarefa</button>
    </div>

    <div class="lista-cards">
      @if (carregando()) {
      <p>Carregando tarefas...</p>
      } @else if (erro()) {
      <p>{{ erro() }}</p>
      } @else { @for (tarefa of tarefas(); track tarefa.id) {
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ tarefa.titulo }}</mat-card-title>
          <mat-card-subtitle>{{ tarefa.concluida ? 'Concluída' : 'Pendente' }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>{{ tarefa.descricao }}</p>
        </mat-card-content>

        <mat-card-actions>
          <button matButton="filled" [routerLink]="['/tarefas/edicao', tarefa.id]">Editar</button>
          <button matButton="outlined" (click)="removerTarefa(tarefa.id)">Remover</button>
        </mat-card-actions>
      </mat-card>
      } }
    </div>
  </section>
  ```

- [ ] Padronizar criação e edição com o mesmo layout de formulário

  ```scss
  /* usar o mesmo padrão em criacao-tarefa.scss e edicao-tarefa.scss */
  :host {
    display: block;
  }

  section {
    display: grid;
    gap: 16px;
    max-width: 720px;
  }

  form {
    display: grid;
    gap: 16px;
  }

  mat-form-field {
    width: 100%;
  }

  .acoes-formulario {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  ```

- [ ] Ajustar o template da criação

  ```html
  <!-- src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.html -->
  <section>
    <h2>Criação de tarefa</h2>

    <form [formGroup]="form" (ngSubmit)="salvar()">
      <mat-form-field>
        <mat-label>Título</mat-label>
        <input matInput formControlName="titulo" placeholder="Digite o título da tarefa" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Descrição</mat-label>
        <textarea
          matInput
          formControlName="descricao"
          placeholder="Digite uma descrição para a tarefa"
        ></textarea>
      </mat-form-field>

      <div class="acoes-formulario">
        <button type="button" matButton="outlined" routerLink="/tarefas">Cancelar</button>
        <button type="submit" matButton="filled">Salvar</button>
      </div>
    </form>
  </section>
  ```

- [ ] Ajustar o template da edição

  ```html
  <!-- src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.html -->
  <section>
    <h2>Edição de tarefa</h2>

    <form [formGroup]="form" (ngSubmit)="salvar()">
      <mat-form-field>
        <mat-label>Título</mat-label>
        <input matInput formControlName="titulo" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Descrição</mat-label>
        <textarea matInput formControlName="descricao"></textarea>
      </mat-form-field>

      <div class="acoes-formulario">
        <button type="button" matButton="outlined" routerLink="/tarefas">Cancelar</button>
        <button type="submit" matButton="filled">Salvar alterações</button>
      </div>
    </form>
  </section>
  ```

- [ ] Validar se a interface já está apresentável
  - [ ] header visível e estável
  - [ ] conteúdo centralizado
  - [ ] formulários com largura boa
  - [ ] cards com espaçamento consistente
  - [ ] ações alinhadas
  - [ ] aparência coerente entre listagem, criação e edição

## FASE 6. Aprimoramentos nível 1

### 18. Reutilizar a base do formulário entre criação e edição

- [ ] Criar a fábrica do formulário

  ```bash
  npx ng g i features/tarefas/forms/tarefa-form
  ```

  ```ts
  // src/app/features/tarefas/forms/tarefa-form.ts
  import { FormControl, FormGroup, Validators } from '@angular/forms';

  export type TarefaForm = FormGroup<{
    titulo: FormControl<string>;
    descricao: FormControl<string>;
    concluida: FormControl<boolean>;
  }>;

  export function criarTarefaForm(): TarefaForm {
    return new FormGroup({
      titulo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      descricao: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      concluida: new FormControl(false, {
        nonNullable: true,
      }),
    });
  }
  ```

- [ ] Usar a fábrica na criação

  ```ts
  // src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.ts
  import { criarTarefaForm } from '@features/tarefas/forms/tarefa-form';

  export class CriacaoTarefa {
    form = criarTarefaForm();
  }
  ```

- [ ] Usar a fábrica na edição

  ```ts
  // src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.ts
  import { criarTarefaForm } from '@features/tarefas/forms/tarefa-form';

  export class EdicaoTarefa {
    form = criarTarefaForm();
  }
  ```

### 19. Adicionar validação visual e desabilitar ações inválidas

- [ ] Exibir mat-error no formulário de criação e edição

  ```html
  <mat-form-field>
    <mat-label>Título</mat-label>
    <input matInput formControlName="titulo" />

    @if (form.controls.titulo.errors?.['required']) {
    <mat-error>O título é obrigatório.</mat-error>
    }
  </mat-form-field>

  <mat-form-field>
    <mat-label>Descrição</mat-label>
    <textarea matInput formControlName="descricao"></textarea>

    @if (form.controls.descricao.errors?.['required']) {
    <mat-error>A descrição é obrigatória.</mat-error>
    }
  </mat-form-field>
  ```

- [ ] Desabilitar o botão de salvar na criação quando inválido ou enviando

  ```ts
  // src/app/features/tarefas/pages/criacao-tarefa/criacao-tarefa.ts
  import { inject, signal } from '@angular/core';

  export class CriacaoTarefa {
    enviando = signal(false);
    erro = signal('');

    salvar() {
      if (this.form.invalid || this.enviando()) return;

      this.enviando.set(true);
      this.erro.set('');

      this.tarefasService
        .criar({
          ...this.form.getRawValue(),
          concluida: false,
        })
        .subscribe({
          next: () => this.router.navigateByUrl('/tarefas'),
          error: () => {
            this.erro.set('Não foi possível criar a tarefa.');
            this.enviando.set(false);
          },
        });
    }
  }
  ```

  ```html
  <div class="acoes-formulario">
    <button type="button" matButton="outlined" routerLink="/tarefas" [disabled]="enviando()">
      Cancelar
    </button>

    <button type="submit" matButton="filled" [disabled]="form.invalid || enviando()">Salvar</button>
  </div>

  @if (erro()) {
  <p>{{ erro() }}</p>
  }
  ```

- [ ] Desabilitar o botão de salvar na edição quando inválido ou enviando

  ```ts
  // src/app/features/tarefas/pages/edicao-tarefa/edicao-tarefa.ts
  export class EdicaoTarefa {
    enviando = signal(false);
    erro = signal('');

    salvar() {
      if (this.form.invalid || this.enviando()) return;

      this.enviando.set(true);
      this.erro.set('');

      this.tarefasService.update(this.id, this.form.getRawValue()).subscribe({
        next: () => this.router.navigateByUrl('/tarefas'),
        error: () => {
          this.erro.set('Não foi possível atualizar a tarefa.');
          this.enviando.set(false);
        },
      });
    }
  }
  ```

- [ ] Exibir erro de remoção na listagem

  ```ts
  // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
  erroRemocao = signal('');

  removerTarefa(id: number) {
    this.erroRemocao.set('');

    this.tarefasService.remove(id).subscribe({
      next: () => {
        this.tarefas.update((tarefas) =>
          tarefas.filter((tarefa) => tarefa.id !== id),
        );
      },
      error: () => {
        this.erroRemocao.set('Não foi possível remover a tarefa.');
      },
    });
  }
  ```

  ```html
  @if (erroRemocao()) {
  <p>{{ erroRemocao() }}</p>
  }
  ```

### 20. Adicionar busca local funcional com Signals e computed

- [ ] Adicionar estado local na listagem

  ```ts
  // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
  import { computed, signal } from '@angular/core';

  tarefas = signal<Tarefa[]>([]);
  carregando = signal(true);
  erro = signal('');
  termoBusca = signal('');
  ```

- [ ] Criar lista filtrada derivada

  ```ts
  tarefasFiltradas = computed(() => {
    const termo = this.termoBusca().trim().toLowerCase();

    if (!termo) return this.tarefas();

    return this.tarefas().filter(
      (tarefa) =>
        tarefa.titulo.toLowerCase().includes(termo) ||
        tarefa.descricao.toLowerCase().includes(termo),
    );
  });
  ```

- [ ] Ligar o campo de busca ao signal

  ```html
  <mat-form-field>
    <mat-label>Pesquisar tarefa</mat-label>
    <input
      matInput
      [value]="termoBusca()"
      (input)="termoBusca.set($any($event.target).value)"
      placeholder="Ex.: estudar angular"
    />
  </mat-form-field>
  ```

- [ ] Trocar a renderização da lista para tarefasFiltradas()

```ts
@if (carregando()) {

<p>Carregando tarefas...</p>
} @else if (erro()) {
<p>{{ erro() }}</p>
} @else if (tarefasFiltradas().length === 0) {
<p>Nenhuma tarefa encontrada.</p>
} @else {
@for (tarefa of tarefasFiltradas(); track tarefa.id) {
<mat-card>
  <mat-card-header>
    <mat-card-title>{{ tarefa.titulo }}</mat-card-title>
    <mat-card-subtitle>{{ tarefa.concluida ? 'Concluída' : 'Pendente' }}</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <p>{{ tarefa.descricao }}</p>
  </mat-card-content>

  <mat-card-actions>
    <button matButton="filled" [routerLink]="['/tarefas/edicao', tarefa.id]">Editar</button>
    <button matButton="outlined" (click)="removerTarefa(tarefa.id)">Remover</button>
  </mat-card-actions>
</mat-card>
}
}
```

### 21. Criar componente reutilizável de lista de tarefas

- [ ] Criar componente da lista

  ```bah
  npx ng g c features/tarefas/components/lista-tarefas
  ```

- [ ] Implementar input() e output()

  ```ts
  // src/app/features/tarefas/components/lista-tarefas/lista-tarefas.ts
  import { Component, input, output } from '@angular/core';
  import { MatButtonModule } from '@angular/material/button';
  import { MatCardModule } from '@angular/material/card';
  import { RouterLink } from '@angular/router';

  import { Tarefa } from '@shared/interfaces/tarefa';

  @Component({
    selector: 'app-lista-tarefas',
    imports: [MatButtonModule, MatCardModule, RouterLink],
    templateUrl: './lista-tarefas.html',
    styleUrl: './lista-tarefas.scss',
  })
  export class ListaTarefas {
    tarefas = input.required<Tarefa[]>();
    remover = output<number>();
  }
  ```

  ```html
  <!-- src/app/features/tarefas/components/lista-tarefas/lista-tarefas.html -->
  @for (tarefa of tarefas(); track tarefa.id) {
  <mat-card>
    <mat-card-header>
      <mat-card-title>{{ tarefa.titulo }}</mat-card-title>
      <mat-card-subtitle>{{ tarefa.concluida ? 'Concluída' : 'Pendente' }}</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <p>{{ tarefa.descricao }}</p>
    </mat-card-content>

    <mat-card-actions>
      <button matButton="filled" [routerLink]="['/tarefas/edicao', tarefa.id]">Editar</button>
      <button matButton="outlined" (click)="remover.emit(tarefa.id)">Remover</button>
    </mat-card-actions>
  </mat-card>
  }
  ```

- [ ] Usar o componente na listagem

  ```ts
  // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
  import { ListaTarefas } from '@features/tarefas/components/lista-tarefas/lista-tarefas';

  @Component({
  imports: [
  ...,
  ListaTarefas,
  ],
  })
  export class ListagemTarefas {}
  ```

  ```html
  @if (carregando()) {

  <p>Carregando tarefas...</p>
  } @else if (erro()) {
  <p>{{ erro() }}</p>
  } @else if (tarefasFiltradas().length === 0) {
  <p>Nenhuma tarefa encontrada.</p>
  } @else {
  <app-lista-tarefas [tarefas]="tarefasFiltradas()" (remover)="removerTarefa($event)" />
  }
  ```

### 22. Aplicar pipe para melhorar a visualização da lista

- [ ] Criar pipe para resumir descrição

```bash
npx ng g p shared/pipes/resumir-texto
```

- [ ] Implementar o pipe

  ```ts
  // src/app/shared/pipes/resumir-texto.ts
  import { Pipe, PipeTransform } from '@angular/core';

  @Pipe({
    name: 'resumirTexto',
  })
  export class ResumirTexto implements PipeTransform {
    transform(valor: string, limite: number = 60): string {
      if (!valor) return '';
      if (valor.length <= limite) return valor;
      return `${valor.slice(0, limite)}...`;
    }
  }
  ```

- [ ] Usar o pipe no componente de lista

  ```ts
  // src/app/features/tarefas/components/lista-tarefas/lista-tarefas.ts
  import { TitleCasePipe } from '@angular/common';
  import { ResumirTexto } from '@shared/pipes/resumir-texto';

  @Component({
    imports: [MatButtonModule, MatCardModule, RouterLink, TitleCasePipe, ResumirTexto],
  })
  export class ListaTarefas {}
  ```

  ```html
  <mat-card-title>{{ tarefa.titulo | titlecase }}</mat-card-title>

  <p>{{ tarefa.descricao | resumirTexto: 60 }}</p>
  ```

### 23. Substituir a remoção direta por modal de confirmação

- [ ] Criar o componente do modal

  ```ts
  // src/app/shared/components/modal-confirmacao/modal-confirmacao.ts
  import { Component, inject } from '@angular/core';
  import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
  import { MatButtonModule } from '@angular/material/button';

  @Component({
    selector: 'app-modal-confirmacao',
    imports: [MatDialogModule, MatButtonModule],
    templateUrl: './modal-confirmacao.html',
    styleUrl: './modal-confirmacao.scss',
  })
  export class ModalConfirmacao {
    readonly data = inject(MAT_DIALOG_DATA) as { titulo: string };
  }
  ```

  ```html
  <!-- src/app/shared/components/modal-confirmacao/modal-confirmacao.html -->
  <h2 mat-dialog-title>Remover tarefa</h2>

  <mat-dialog-content>
    <p>Tem certeza que deseja remover a tarefa "{{ data.titulo }}"?</p>
  </mat-dialog-content>

  <mat-dialog-actions align="end">
    <button matButton mat-dialog-close="false">Cancelar</button>
    <button matButton="filled" [mat-dialog-close]="true">Remover</button>
  </mat-dialog-actions>
  ```

- [ ] Abrir o modal a partir da listagem

  ```ts
  // src/app/features/tarefas/pages/listagem-tarefas/listagem-tarefas.ts
  import { MatDialog } from '@angular/material/dialog';
  import { ModalConfirmacao } from '@shared/components/modal-confirmacao/modal-confirmacao';

  export class ListagemTarefas {
    private readonly dialog = inject(MatDialog);

    abrirModalRemocao(tarefa: Tarefa) {
      const dialogRef = this.dialog.open(ModalConfirmacao, {
        data: { titulo: tarefa.titulo },
      });

      dialogRef.afterClosed().subscribe((confirmou) => {
        if (!confirmou) return;
        this.removerTarefa(tarefa.id);
      });
    }
  }
  ```

- [ ] Ligar o botão de remover ao modal

Se estiver usando o componente de lista, troque o output() para emitir a tarefa inteira:

```ts
remover = output<Tarefa>();
```

```html
<button matButton="outlined" (click)="remover.emit(tarefa)">Remover</button>
```

E na página:

```html
<app-lista-tarefas [tarefas]="tarefasFiltradas()" (remover)="abrirModalRemocao($event)" />
```

## FASE 7. Aprimoramentos nível 2

### 24. Melhorar a rota dinâmica da edição com resolver

- [ ] Criar resolver funcional

  ```ts
  // src/app/features/tarefas/resolvers/tarefa.resolver.ts
  import { ResolveFn } from '@angular/router';
  import { inject } from '@angular/core';

  import { TarefasService } from '@core/services/tarefas.service';

  export const tarefaResolver: ResolveFn<any> = (route) => {
    const tarefasService = inject(TarefasService);
    const id = Number(route.paramMap.get('id'));
    return tarefasService.getById(id);
  };
  ```

- [ ] Usar o resolver na rota de edição

  ```ts
  // src/app/app.routes.ts
  {
  path: 'tarefas/edicao/:id',
  loadComponent: () =>
  import('./features/tarefas/pages/edicao-tarefa/edicao-tarefa')
  .then((m) => m.EdicaoTarefa),
  resolve: {
  tarefa: tarefaResolver,
  },
  }
  ```

### 25. Melhorar a busca remota com RxJS, se sobrar tempo

- [ ] Criar um Subject para busca

  ```ts
  import { Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
  ```

- [ ] Aplicar debounce

  ```ts
  private readonly busca$ = new Subject<string>();

  ngOnInit() {
  this.busca$
  .pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((termo) => this.tarefasService.getAll(termo)),
  )
  .subscribe((tarefas) => {
  this.tarefas.set(tarefas);
  this.carregando.set(false);
  });

  this.tarefasService.getAll().subscribe((tarefas) => {
  this.tarefas.set(tarefas);
  this.carregando.set(false);
  });
  }

  pesquisar(valor: string) {
  this.termoBusca.set(valor);
  this.carregando.set(true);
  this.busca$.next(valor);
  }
  ```

- [ ] Trocar o input da busca para chamar pesquisar(...)

  ```html
  <input
    matInput
    [value]="termoBusca()"
    (input)="pesquisar($any($event.target).value)"
    placeholder="Ex.: estudar angular"
  />
  ```

### 26. Refinar o visual final da aplicação

- [ ] Melhorar visual dos cards

  ```scss
  /_ src/app/features/tarefas/components/lista-tarefas/lista-tarefas.scss _/ :host {
    display: grid;
    gap: 16px;
  }

  mat-card {
    border-radius: 16px;
  }

  mat-card-content p {
    margin: 0;
    line-height: 1.5;
  }

  mat-card-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  ```

- [ ] Melhorar responsividade básica

  ```scss
  /_ src/app/app.scss _/ .conteudo-principal {
    max-width: 960px;
    margin: 0 auto;
    padding: 24px 16px 40px;
  }

  @media (max-width: 599px) {
    .conteudo-principal {
      padding: 16px 12px 32px;
    }
  }
  ```

- [ ] Diferenciar visualmente ação destrutiva

```html
<button matButton="outlined">Remover</button>
```

```scss
/_ no scss do componente que contém o botão _/ .botao-remover {
  border-color: #b3261e;
  color: #b3261e;
}
```

E usar no template:

```html
<button class="botao-remover" matButton="outlined">Remover</button>
```
