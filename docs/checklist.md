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
    - registro
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
  - Exemplo: `scripts/preparar-db-json.mjs`

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
      "server": "json-server --watch mock/db.json --port 3000",
      "dev": "npm run start:db &&concurrently \"npm:start\" \"npm:server\""
    }
  }
  ```

- [ ] Criar `mock/db.base.json`
  - Neste projeto:

  ```json
  {
    "produtos": []
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
      npx ng g c features/pages/listagem-produtos
      ```

    - [ ] Criar página de registro

      ```bash
      npx ng g c features/pages/registro-produto
      ```

    - [ ] Criar página de edição

      ```bash
      npx ng g c features/pages/edicao-produto
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
  - [ ] Cabeçalho:

    ```html
    <!-- src/app/shared/components/cabecalho/cabecalho.html -->
    <mat-toolbar>
      <span>Estoque</span>
    </mat-toolbar>
    ```

    ```ts
    // src/app/shared/components/cabecalho/cabecalho.ts

    // import { Component } from '@angular/core';
    import { MatToolbarModule } from '@angular/material/toolbar';

    @Component({
      //  selector: 'app-cabecalho',
      imports: [MatToolbarModule],
      //  templateUrl: './cabecalho.html',
      //  styleUrl: './cabecalho.scss',
    })
    export class Cabecalho {}
    ```

  - [ ] Página de listagem:

    ```html
    <!-- src/app/features/pages/listagem-produtos/listagem-produtos.html -->
    <section>
      <h2>Produtos</h2>

      <mat-form-field>
        <mat-label>Pesquisar produto</mat-label>
        <input matInput placeholder="Ex: refrigerante" />
      </mat-form-field>

      <div>
        <button type="button" matButton="filled">Adicionar produto</button>
      </div>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Coca-Cola 2L</mat-card-title>
          <mat-card-subtitle>Refrigerante</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>Preço: R$ 12,99</p>
          <p>Em estoque: 10</p>
          <p>Reposição solicitada: <mat-slide-toggle /></p>
          <p>Observações: nenhuma</p>
        </mat-card-content>

        <button type="button" matButton="filled">Editar</button>
      </mat-card>
    </section>
    ```

    ```ts
    // src/app/features/pages/listagem-produtos/listagem-produtos.ts

    // import { Component } from '@angular/core';
    import { MatFormFieldModule } from '@angular/material/form-field';
    import { MatButtonModule } from '@angular/material/button';
    import { MatCardModule } from '@angular/material/card';
    import { MatSlideToggleModule } from '@angular/material/slide-toggle';

    @Component({
      // selector: 'app-listagem-produtos',
      imports: [MatFormFieldModule, MatButtonModule, MatCardModule, MatSlideToggleModule],
      // templateUrl: './listagem-produtos.html',
      // styleUrl: './listagem-produtos.scss',
    })
    export class ListagemProdutos {}
    ```

  - [ ] Página de registro:

    ```html
    <!-- src/app/features/pages/registro-produto/registro-produto.html -->
    <section>
      <h2>Registro de Produto</h2>

      <form>
        <mat-form-field>
          <mat-label>Nome do Produto</mat-label>
          <input matInput placeholder="Digite o nome do produto" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Categoria do Produto</mat-label>
          <input matInput placeholder="Digite a categoria do produto" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Preço do Produto</mat-label>
          <input matInput placeholder="Digite o preço do produto" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Quantidade no Estoque</mat-label>
          <input matInput placeholder="Digite quantidade no estoque" />
        </mat-form-field>

        <div>
          <label>Reposição já foi solicitada?</label>
          <mat-slide-toggle>Sim</mat-slide-toggle>
        </div>

        <mat-form-field>
          <mat-label>Observações</mat-label>
          <textarea
            matInput
            cdkTextareaAutosize
            cdkAutosizeMinRows="2"
            cdkAutosizeMaxRows="6"
            placeholder="(opcional)"
          ></textarea>
        </mat-form-field>

        <div>
          <button type="button" matButton="outlined">Cancelar</button>
          <button type="submit" matButton="filled">Salvar</button>
        </div>
      </form>
    </section>
    ```

    ```ts
    // src/app/features/pages/registro-produto/registro-produto.ts

    // import { Component } from '@angular/core';
    import { MatFormFieldModule } from '@angular/material/form-field';
    import { MatSlideToggleModule } from '@angular/material/slide-toggle';
    import { MatButtonModule } from '@angular/material/button';
    import { MatInputModule } from '@angular/material/input';
    import { TextFieldModule } from '@angular/cdk/text-field';

    @Component({
      // selector: 'app-registro-produto',
      imports: [
        MatFormFieldModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatInputModule,
        TextFieldModule,
      ],
      // templateUrl: './registro-produto.html',
      // styleUrl: './registro-produto.scss',
    })
    export class RegistroProduto {}
    ```

  - [ ] Página de edição:

    Igual página de registro, mudando só o subtítulo `<h2></h2>`

    ```html
    <!-- src/app/features/pages/edicao-produto/edicao-produto.html -->
    <section>
      <h2>Edição do Produto</h2>

      [...]
    </section>
    ```

  - [ ] Modal de confirmação:

    ```html
    <!-- src/app/shared/components/modal-confirmacao/modal-confirmacao.html -->
    <h2 mat-dialog-title>Remover produto</h2>

    <mat-dialog-content>
      <p>Tem certeza que deseja remover este produto?</p>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button type="button" matButton="outlined">Cancelar</button>
      <button type="button" matButton="filled" mat-dialog-close="true">Remover</button>
    </mat-dialog-actions>
    ```

    ```ts
    // src/app/shared/components/modal-confirmacao/modal-confirmacao.ts

    // import { Component } from '@angular/core';
    import { MatDialogModule } from '@angular/material/dialog';
    import { MatButtonModule } from '@angular/material/button';

    @Component({
      //  selector: 'app-modal-confirmacao',
      imports: [MatDialogModule, MatButtonModule],
      //  templateUrl: './modal-confirmacao.html',
      //  styleUrl: './modal-confirmacao.scss',
    })
    export class ModalConfirmacao {}
    ```

---

## FASE 3. Navegação

### 9. Configurar roteamento principal

Roteamento e navegação [🔎](./conteudo-teorico/navegacao.md)

- [ ] Conferir `provideRouter(routes)` no `app.config.ts`

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
        path: 'produtos',
        loadComponent: () =>
          import('./features/pages/listagem-produtos/listagem-produtos')
            .then((m) => m.ListagemProdutos),
        pathMatch: 'full',
      }
      ```

    - [ ] Criar rota de registro

      ```ts
      {
        path: 'produtos/criacao',
        loadComponent: () =>
          import('./features/pages/criacao-produto/criacao-produto')
            .then((m) => m.CriacaoProduto),
      }
      ```

    - [ ] Criar rota de edição

      ```ts
      {
        path: 'produtos/edicao/:id',
        loadComponent: () =>
          import('./features/pages/edicao-produto/edicao-produto')
            .then((m) => m.EdicaoProduto),
      }
      ```

    - [ ] Definir redirect inicial

      ```ts
      {
        path: '',
        redirectTo: 'produtos',
        pathMatch: 'full',
      }
      ```

    - [ ] Adicionar rota curinga para fallback

      ```ts
      {
        path: '**',
        redirectTo: 'produtos',
      }
      ```

  - [ ] Garantir que a aplicação continua compilando

---

### 10. Implementar navegação entre páginas

- [ ] Importar `RouterLink` nos componentes de página

  ```ts
  import { RouterLink } from '@angular/router';
  ```

- [ ] Implementar `routerLink="/rota-de-destino"` nos elementos de navegação do template
  - Neste projeto:
    - da **listagem** para registro
      - [ ] Adicionar link no botão **Adicionar produto**

        ```html
        <!-- src/app/features/pages/listagem-produtos/listagem-produtos.html -->
        <button matButton="filled" routerLink="/produtos/registro">Adicionar produto</button>
        ```

    - da **listagem** para edição
      - [ ] Adicionar link no botão **Editar**

        > O `1` ainda é fixo só para validar a navegação.
        > Depois, no CRUD real, ele se tornará o `id` dinâmico do produto.

        ```html
        <!-- src/app/features/pages/listagem-produtos/listagem-produtos.html -->
        <button matButton="filled" [routerLink]="['/produtos/edicao', 1]">Editar</button>
        ```

    - de **registro** para listagem
      - [ ] Adicionar link no botão **Cancelar**

        ```html
        <!-- src/app/features/pages/registro-produto/registro-produto.html -->
        <button type="button" matButton="outlined" routerLink="/produtos">Cancelar</button>
        ```

      - Não adicionar rota no botão **Salvar**

        > Essa navegação fará parte da lógica no TypeScript.

    - de **edição** para listagem
      - [ ] Adicionar link no botão **Cancelar**

        ```html
        <!-- src/app/features/pages/edicao-produto/edicao-produto.html -->
        <button type="button" matButton="outlined" routerLink="/produtos">Cancelar</button>
        ```

      - Não adicionar rota no botão **Salvar**

        > Essa navegação fará parte da lógica no TypeScript.

- [ ] Confirmar fluxo básico completo entre páginas
  - Neste projeto:
    - [ ] Entrar em `/produtos`
    - [ ] Ir para `/produtos/criacao`
    - [ ] Voltar para `/produtos`
    - [ ] Ir para `/produtos/edicao/1`
    - [ ] Voltar para `/produtos`
    - [ ] Acessar uma rota inexistente e confirmar redirecionamento para `/produtos`

---

## FASE 4. CRUD funcional

### 11. Criar o serviço HTTP da feature

> No Angular 21, o `HttpClient` é disponibilizado com `provideHttpClient()`.
> O service centraliza o acesso aos dados e evita espalhar chamadas HTTP pelos componentes.

- [ ] Criar interface principal da feature

  > - `ng generate interface nome-da-interface` = `ng g i nome-da-interface`
  > - `npx ng g c nome-da-interface`, se o Angular não foi instalado globalmente

  ```bash
  npx ng generate interface nome-da-interface
  ```

- Neste projeto:
  - [ ] Criar `produto.ts`

    ```bash
    npx ng generate interface shared/interfaces/produto
    ```

    ```ts
    // src/app/shared/interfaces/produto.ts
    export interface Produto {
      id: number;
      nome: string;
      categoria: string;
      preco: string;
      qtEstoque: number;
      observacoes: string;
      reposicaoSolicitada: boolean;
    }
    ```

- [ ] Adicnionar `provideHttpClient()` no `app.config.ts`

  ```ts
  // src/app/app.config.ts
  /*
  import { ApplicationConfig } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { routes } from './app.routes';
  */
  import { provideHttpClient } from '@angular/common/http';

  export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient()],
  };
  ```

- [ ] Criar o serviço HTTP da feature

  ```bash
  npx ng g s core/services/nome-do-serviço
  ```

  > gosto de `usar nome-do-serviço.service` para a extensão **Material Icon Theme**, do Philipp Kief, no VS Code aplicar a iconografia corretamente.
  - Neste projeto:

    ```bash
    npx ng g s core/services/produtos.service
    ```

- [ ] Injetar `HttpClient` no service
  - Neste projeto:

    ```ts
    // export class ProdutosService {}

    import { HttpClient } from '@angular/common/http';
    import { inject, [...] } from '@angular/core';

    /*
    @Injectable({
      providedIn: 'root',
    })
    */

    export class produtosService {
      private readonly http = inject(HttpClient);
    }
    ```

- [ ] Definir a URL base da API no service
  - Neste projeto:

    ```ts
    // src/app/core/services/produtos.service.ts
    [...]
    export class ProdutosService {
      [...]
      private readonly apiUrl = 'http://localhost:3000/produtos';
    }
    ```

- [ ] Implementar `getAll`
  - Neste projeto:

    ```ts
    // src/app/core/services/produtos.service.ts
    [...]
    import { ..., HttpParams } from '@angular/common/http';
    import { Produto } from '@app/shared/interfaces/produto';

    [...]
    export class ProdutosService {
      [...]

      getAll(busca?: string) {
        let params = new HttpParams();

        if (busca) {
          params = params.set('q', busca);
        }

        return this.http.get<Produto[]>(this.apiUrl, { params });
      }
    }
    ```

- [ ] Implementar `getById`
  - Neste projeto:

    ```ts
    // src/app/core/services/produtos.service.ts
    [...]
    export class ProdutosService {
      [...]

      getById(id: number | string) {
        return this.http.get<Produto>(`${this.apiUrl}/${id}`);
      }
    }
    ```

- [ ] Implementar `criar`
  - Neste projeto:

    ```ts
    // src/app/core/services/produtos.service.ts
    [...]
    import { PayloadProduto, [...] } from '@app/shared/interfaces/produto';

    [...]
    export class ProdutosService {
      [...]

      create(payload: PayloadProduto) {
        return this.http.post<Produto>(this.apiUrl, payload);
      }
    }
    ```

- [ ] Implementar `update`
  - Neste projeto:

    ```ts
    // src/app/core/services/produtos.service.ts
    [...]
    export class ProdutosService {
      [...]

      update(id: number, payload: PayloadProduto) {
        return this.http.put<Produto>(`${this.apiUrl}/${id}`, payload);
      }
    }
    ```

- [ ] Implementar `remove`
  - Neste projeto:

    ```ts
    // src/app/core/services/produtos.service.ts
    remove(id: number) {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    ```

- [ ] Validar chamadas básicas no backend fake via terminal
  - Neste projeto:
    - [ ] Listar todas as produtos

      ```bash
      curl http://localhost:3000/produtos
      ```

    Como tabela `produtos` está vazia, o retorno deve ser um Array vazio: **[ ]**

---

### 12. CRUD funcional — listagem

- Listar produtos
  - [ ] Buscar lista no backend

    ```ts
    // src/app/features/produtos/pages/listagem-produtos/listagem-produtos.ts
    import { [...], inject, signal } from '@angular/core';

    import { Produto } from '@shared/interfaces/produto';
    import { ProdutosService } from '@core/services/produtos.service';

    export class ListagemProdutos {
      private readonly produtosService = inject(ProdutosService);

      produtos = signal<Produto[]>([]);

      ngOnInit() {
        this.produtosService.getAll().subscribe({
          next: (produtos) => {
            this.produtos.set(produtos);
          },
        });
      }
    }
    ```

  - [ ] Trocar itens estáticos da listagem por dados reais

    ```html
    <!-- src/app/features/pages/listagem-produtos/listagem-produtos.html -->
    <section>
      [...] @for (produto of produtos(); track produto.id) {
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ produto.nome }}</mat-card-title>
          <mat-card-subtitle>{{ produto.categoria }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>Preço: {{ produto.preco }}</p>
          <p>Em estoque: {{ produto.qtEstoque }}</p>
          <p>
            Reposição solicitada:
            <mat-slide-toggle [checked]="produto.reposicaoSolicitada" [disabled]="true" />
          </p>
          <p>Observações: {{ produto.observacoes || 'Nenhuma' }}</p>
        </mat-card-content>

        <button type="button" matButton="filled" [routerLink]="['/produtos/edicao', 1]">
          Editar
        </button>
      </mat-card>
      }
    </section>
    ```

  - opcionalmente, **porém muito recomendado**: `@empty` para os casos de banco de dados vazio

    ```html
    <!-- src/app/features/pages/listagem-produtos/listagem-produtos.html -->
    <section>
      [...] @for (produto of produtos(); track produto.id) { [...] } @empty {
      <mat-card>
        <mat-card-content>
          <p>Nenhum produto cadastrado no momento.</p>
        </mat-card-content>
      </mat-card>
      }
    </section>
    ```

  - [ ] Exibir carregamento simples

    ```ts
    // src/app/features/pages/listagem-produtos/listagem-produtos.ts
    export class ListagemProdutos {
      [...]

      carregando = signal(true);

      ngOnInit() {
        this.produtosService.getAll().subscribe({
          next: (produtos) => {
            // this.produtos.set(produtos);
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
    <!-- src/app/features/pages/listagem-produtos/listagem-produtos.html -->
    <section>
      [...] @if (carregando()) {
      <p>Carregando produtos...</p>
      } @else { @for (produto of produtos(); track produto.id) { [...] } @empty { [...] } }
    </section>
    ```

  - [ ] Exibir mensagem simples se ocorrer erro ao carregar

    ```ts
    // src/app/features/produtos/pages/listagem-produtos/listagem-produtos.ts
    export class ListagemProdutos {
      [...]

      erro = signal('');

      ngOnInit() {
        this.produtosService.getAll().subscribe({
          /*
          next: (produtos) => {
            this.produtos.set(produtos);
            this.carregando.set(false);
          },
          */
          error: () => {
            this.erro.set('Não foi possível carregar os produtos');
            // this.carregando.set(false);
          },
        });
      }
    }
    ```

    ```html
    <!-- src/app/features/produtos/pages/listagem-produtos/listagem-produtos.html -->
    <section>
      <h2>Produtos</h2>

      [...] @if (carregando()) {
      <p>Carregando produtos...</p>
      } @else if (erro()) {
      <p>{{ erro() }}</p>
      } @else { @for (produto of produtos(); track produto.id) {
      <mat-card> ... </mat-card>
      } }
    </section>
    ```

---

### 13. CRUD funcional — criação / registro

- Criar produto
  - [ ] Montar formulário com Reactive Forms

    ```ts
    // src/app/features/pages/registro-produto/registro-produto.ts

    [...]
    import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

    @Component({
      // selector: 'app-registro-produto',
      imports: [
        [...]
        ReactiveFormsModule,
      ],
      // templateUrl: './registro-produto.html',
      // styleUrl: './registro-produto.scss',
    })
    export class RegistroProduto {
      form = new FormGroup({
        nome: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        categoria: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        preco: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        qtEstoque: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        observacoes: new FormControl('', { nonNullable: true }),
        reposicaoSolicitada: new FormControl(false, { nonNullable: true }),
      });
    }
    ```

    ```html
    <!-- src/app/features/pages/registro-produto/registro-produto.html -->
    <section>
      [...]
      <form>
        <mat-form-field>
          <mat-label>Nome do Produto</mat-label>
          <input [...] formControlName="nome" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Categoria do Produto</mat-label>
          <input [...] formControlName="categoria" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Preço do Produto</mat-label>
          <input [...] formControlName="preco" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Quantidade no Estoque</mat-label>
          <input [...] formControlName="qtEstoque" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Reposição já foi solicitada?></mat-label>
          <mat-slide-toggle formControlName="reposicaoSolicitada" />
        </mat-form-field>

        <mat-form-field>
          <mat-label>Observações</mat-label>
          <textarea [...] formControlName="observacoes"></textarea>
        </mat-form-field>
      </form>
      [...]
    </section>
    ```

  - [ ] Fazer submit simples no front

    ```ts
    // src/app/features/produtos/pages/criacao-produto/criacao-produto.ts
    export class CriacaoProduto {
      [...]

      salvar() {
        console.log(this.form.getRawValue());
      }
    }
    ```

    ```html
    <!-- src/app/features/produtos/pages/criacao-produto/criacao-produto.html -->
    <section>
      [...]

      <form [formGroup]="form" (ngSubmit)="salvar()">...</form>
    </section>
    ```

  - [ ] Trocar dados fixos do formulário por envio real

    ```ts
    // src/app/features/produtos/pages/criacao-produto/criacao-produto.ts
    import { [...], inject } from '@angular/core';
    import { Router } from '@angular/router';

    import { ProdutosService } from '@core/services/produtos.service';

    export class CriacaoProduto {
      private readonly router = inject(Router);
      private readonly produtosService = inject(ProdutosService);

      [...]

      salvar() {
        if (this.form.invalid) return;

        this.produtosService.criar({
          ...this.form.getRawValue(),
          concluida: false,
        }).subscribe();
      }
    }
    ```

  - [ ] Navegar de volta para a listagem após criar

    ```ts
    // src/app/features/produtos/pages/criacao-produto/criacao-produto.ts
    export class CriacaoProduto {
      [...]

      salvar() {
        if (this.form.invalid) return;

        this.produtosService.criar({
          ...this.form.getRawValue(),
          concluida: false,
        }).subscribe({
          next: () => {
            this.router.navigateByUrl('/produtos');
          },
        });
      }
    }
    ```

---

### 14. CRUD funcional — edição

- Editar produto
  - [ ] Navegar para edição com `id`

    ```html
    <!-- src/app/features/produtos/pages/listagem-produtos/listagem-produtos.html -->
    <section>
      [...]

      <mat-card-actions>
        <button matButton="filled" [routerLink]="['/produtos/edicao', produto.id]">Editar</button>
        <button matButton="outlined">Remover</button>
      </mat-card-actions>

      [...]
    </section>
    ```

  - [ ] Buscar produto por `id`

    ```ts
    // src/app/features/produtos/pages/edicao-produto/edicao-produto.ts
    import { [...], inject } from '@angular/core';
    import { ActivatedRoute, RouterLink } from '@angular/router';
    import { ProdutosService } from '@core/services/produtos.service';

    @Component({
      selector: 'app-edicao-produto',
      imports: [...],
      templateUrl: './edicao-produto.html',
      styleUrl: './edicao-produto.scss',
    })
    export class EdicaoProduto {
      private readonly route = inject(ActivatedRoute);
      private readonly produtosService = inject(ProdutosService);

      readonly id = Number(this.route.snapshot.paramMap.get('id'));

      ngOnInit() {
        this.produtosService.getById(this.id).subscribe();
      }
    }
    ```

  - [ ] Preencher formulário com dados reais

    ```ts
    // src/app/features/produtos/pages/edicao-produto/edicao-produto.ts
    import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
    import { MatInputModule } from '@angular/material/input';

    @Component({
      selector: 'app-edicao-produto',
      imports: [
        [...],
        ReactiveFormsModule,
        MatInputModule,
      ],
      templateUrl: './edicao-produto.html',
      styleUrl: './edicao-produto.scss',
    })
    export class EdicaoProduto {
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
        this.produtosService.getById(this.id).subscribe({
          next: (produto) => {
            this.form.patchValue({
              titulo: produto.titulo,
              descricao: produto.descricao,
              concluida: produto.concluida,
            });
          },
        });
      }
    }
    ```

    ```html
    <!-- src/app/features/produtos/pages/edicao-produto/edicao-produto.html -->
    <section>
      <h2>Edição de produto</h2>

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
          <button type="button" matButton="outlined" routerLink="/produtos">Cancelar</button>
          <button type="submit" matButton="filled">Salvar alterações</button>
        </div>
      </form>
    </section>
    ```

  - [ ] Enviar atualização ao backend

    ```ts
    // src/app/features/produtos/pages/edicao-produto/edicao-produto.ts
    import { Router } from '@angular/router';

    export class EdicaoProduto {
      ...

      private readonly router = inject(Router);

      salvar() {
        if (this.form.invalid) return;

        this.produtosService.update(this.id, this.form.getRawValue()).subscribe({
          next: () => {
            this.router.navigateByUrl('/produtos');
          },
        });
      }
    }
    ```

    ```html
    <!-- src/app/features/produtos/pages/edicao-produto/edicao-produto.html -->
    <section>
      [...]

      <form [formGroup]="form" (ngSubmit)="salvar()">[...]</form>
    </section>
    ```

  - [ ] Voltar para a listagem

    ```ts
    // src/app/features/produtos/pages/edicao-produto/edicao-produto.ts
    export class EdicaoProduto {
      [...]

      salvar() {
        if (this.form.invalid) return;

        this.produtosService.update(this.id, this.form.getRawValue()).subscribe({
          next: () => {
            this.router.navigateByUrl('/produtos');
          },
        });
      }
    }
    ```

  - [ ] Confirmar alteração refletida na lista

---

### 16. CRUD funcional — remoção

- Deletar produto
  - [ ] Criar ação de remoção

    ```ts
    // src/app/features/produtos/pages/listagem-produtos/listagem-produtos.ts
    export class ListagemProdutos {
      [...]

      removerProduto(id: number) {
        console.log('Remover produto', id);
      }
    }
    ```

    ```html
    <!-- src/app/features/produtos/pages/listagem-produtos/listagem-produtos.html -->
    <section>
      [...]

      <button matButton="outlined" (click)="removerProduto(produto.id)">Remover</button>

      [...]
    </section>
    ```

  - [ ] Enviar `DELETE`

    ```ts
    // src/app/features/produtos/pages/listagem-produtos/listagem-produtos.ts
    export class ListagemProdutos {
      [...]

      removerProduto(id: number) {
        this.produtosService.remove(id).subscribe();
      }
    }
    ```

  - [ ] Atualizar a lista após remover

    ```ts
    // src/app/features/produtos/pages/listagem-produtos/listagem-produtos.ts
    export class ListagemProdutos {
      [...]

      removerProduto(id: number) {
        this.produtosService.remove(id).subscribe({
          next: () => {
            this.produtos.update((produtos) =>
              produtos.filter((produto) => produto.id !== id),
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
    <span>Lista de Produtos</span>
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
  /* src/app/features/produtos/pages/listagem-produtos/listagem-produtos.scss */
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
  <!-- src/app/features/produtos/pages/listagem-produtos/listagem-produtos.html -->
  <section>
    <h2>Produtos</h2>

    <mat-form-field>
      <mat-label>Pesquisar produto</mat-label>
      <input matInput placeholder="Ex.: estudar para prova" />
    </mat-form-field>

    <div class="acoes-topo">
      <button type="button" matButton="filled" routerLink="/produtos/criacao">Nova produto</button>
    </div>

    <div class="lista-cards">
      @if (carregando()) {
      <p>Carregando produtos...</p>
      } @else if (erro()) {
      <p>{{ erro() }}</p>
      } @else { @for (produto of produtos(); track produto.id) {
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ produto.titulo }}</mat-card-title>
          <mat-card-subtitle>{{ produto.concluida ? 'Concluída' : 'Pendente' }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p>{{ produto.descricao }}</p>
        </mat-card-content>

        <mat-card-actions>
          <button matButton="filled" [routerLink]="['/produtos/edicao', produto.id]">Editar</button>
          <button matButton="outlined" (click)="removerProduto(produto.id)">Remover</button>
        </mat-card-actions>
      </mat-card>
      } }
    </div>
  </section>
  ```

- [ ] Padronizar registro e edição com o mesmo layout de formulário

  ```scss
  /* usar o mesmo padrão em criacao-produto.scss e edicao-produto.scss */
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

- [ ] Ajustar o template do registro

  ```html
  <!-- src/app/features/produtos/pages/criacao-produto/criacao-produto.html -->
  <section>
    <h2>Criação de produto</h2>

    <form [formGroup]="form" (ngSubmit)="salvar()">
      <mat-form-field>
        <mat-label>Título</mat-label>
        <input matInput formControlName="titulo" placeholder="Digite o título da produto" />
      </mat-form-field>

      <mat-form-field>
        <mat-label>Descrição</mat-label>
        <textarea
          matInput
          formControlName="descricao"
          placeholder="Digite uma descrição para a produto"
        ></textarea>
      </mat-form-field>

      <div class="acoes-formulario">
        <button type="button" matButton="outlined" routerLink="/produtos">Cancelar</button>
        <button type="submit" matButton="filled">Salvar</button>
      </div>
    </form>
  </section>
  ```

- [ ] Ajustar o template da edição

  ```html
  <!-- src/app/features/produtos/pages/edicao-produto/edicao-produto.html -->
  <section>
    <h2>Edição de produto</h2>

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
        <button type="button" matButton="outlined" routerLink="/produtos">Cancelar</button>
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
  - [ ] aparência coerente entre listagem, registro e edição

## FASE 6. Aprimoramentos nível 1

### 18. Reutilizar a base do formulário entre registro e edição

- [ ] Criar a fábrica do formulário

  ```bash
  npx ng g i features/produtos/forms/produto-form
  ```

  ```ts
  // src/app/features/produtos/forms/produto-form.ts
  import { FormControl, FormGroup, Validators } from '@angular/forms';

  export type ProdutoForm = FormGroup<{
    titulo: FormControl<string>;
    descricao: FormControl<string>;
    concluida: FormControl<boolean>;
  }>;

  export function criarProdutoForm(): ProdutoForm {
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

- [ ] Usar a fábrica no registro

  ```ts
  // src/app/features/produtos/pages/criacao-produto/criacao-produto.ts
  import { criarProdutoForm } from '@features/produtos/forms/produto-form';

  export class CriacaoProduto {
    form = criarProdutoForm();
  }
  ```

- [ ] Usar a fábrica na edição

  ```ts
  // src/app/features/produtos/pages/edicao-produto/edicao-produto.ts
  import { criarProdutoForm } from '@features/produtos/forms/produto-form';

  export class EdicaoProduto {
    form = criarProdutoForm();
  }
  ```

### 19. Adicionar validação visual e desabilitar ações inválidas

- [ ] Exibir mat-error no formulário de registro e edição

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

- [ ] Desabilitar o botão de salvar no registro quando inválido ou enviando

  ```ts
  // src/app/features/produtos/pages/criacao-produto/criacao-produto.ts
  import { inject, signal } from '@angular/core';

  export class CriacaoProduto {
    enviando = signal(false);
    erro = signal('');

    salvar() {
      if (this.form.invalid || this.enviando()) return;

      this.enviando.set(true);
      this.erro.set('');

      this.produtosService
        .criar({
          ...this.form.getRawValue(),
          concluida: false,
        })
        .subscribe({
          next: () => this.router.navigateByUrl('/produtos'),
          error: () => {
            this.erro.set('Não foi possível criar a produto.');
            this.enviando.set(false);
          },
        });
    }
  }
  ```

  ```html
  <div class="acoes-formulario">
    <button type="button" matButton="outlined" routerLink="/produtos" [disabled]="enviando()">
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
  // src/app/features/produtos/pages/edicao-produto/edicao-produto.ts
  export class EdicaoProduto {
    enviando = signal(false);
    erro = signal('');

    salvar() {
      if (this.form.invalid || this.enviando()) return;

      this.enviando.set(true);
      this.erro.set('');

      this.produtosService.update(this.id, this.form.getRawValue()).subscribe({
        next: () => this.router.navigateByUrl('/produtos'),
        error: () => {
          this.erro.set('Não foi possível atualizar a produto.');
          this.enviando.set(false);
        },
      });
    }
  }
  ```

- [ ] Exibir erro de remoção na listagem

  ```ts
  // src/app/features/produtos/pages/listagem-produtos/listagem-produtos.ts
  erroRemocao = signal('');

  removerProduto(id: number) {
    this.erroRemocao.set('');

    this.produtosService.remove(id).subscribe({
      next: () => {
        this.produtos.update((produtos) =>
          produtos.filter((produto) => produto.id !== id),
        );
      },
      error: () => {
        this.erroRemocao.set('Não foi possível remover a produto.');
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
  // src/app/features/produtos/pages/listagem-produtos/listagem-produtos.ts
  import { computed, signal } from '@angular/core';

  produtos = signal<Produto[]>([]);
  carregando = signal(true);
  erro = signal('');
  termoBusca = signal('');
  ```

- [ ] Criar lista filtrada derivada

  ```ts
  produtosFiltradas = computed(() => {
    const termo = this.termoBusca().trim().toLowerCase();

    if (!termo) return this.produtos();

    return this.produtos().filter(
      (produto) =>
        produto.titulo.toLowerCase().includes(termo) ||
        produto.descricao.toLowerCase().includes(termo),
    );
  });
  ```

- [ ] Ligar o campo de busca ao signal

  ```html
  <mat-form-field>
    <mat-label>Pesquisar produto</mat-label>
    <input
      matInput
      [value]="termoBusca()"
      (input)="termoBusca.set($any($event.target).value)"
      placeholder="Ex.: estudar angular"
    />
  </mat-form-field>
  ```

- [ ] Trocar a renderização da lista para produtosFiltradas()

```ts
@if (carregando()) {

<p>Carregando produtos...</p>
} @else if (erro()) {
<p>{{ erro() }}</p>
} @else if (produtosFiltradas().length === 0) {
<p>Nenhuma produto encontrada.</p>
} @else {
@for (produto of produtosFiltradas(); track produto.id) {
<mat-card>
  <mat-card-header>
    <mat-card-title>{{ produto.titulo }}</mat-card-title>
    <mat-card-subtitle>{{ produto.concluida ? 'Concluída' : 'Pendente' }}</mat-card-subtitle>
  </mat-card-header>

  <mat-card-content>
    <p>{{ produto.descricao }}</p>
  </mat-card-content>

  <mat-card-actions>
    <button matButton="filled" [routerLink]="['/produtos/edicao', produto.id]">Editar</button>
    <button matButton="outlined" (click)="removerProduto(produto.id)">Remover</button>
  </mat-card-actions>
</mat-card>
}
}
```

### 21. Criar componente reutilizável de lista de produtos

- [ ] Criar componente da lista

  ```bah
  npx ng g c features/produtos/components/lista-produtos
  ```

- [ ] Implementar input() e output()

  ```ts
  // src/app/features/produtos/components/lista-produtos/lista-produtos.ts
  import { Component, input, output } from '@angular/core';
  import { MatButtonModule } from '@angular/material/button';
  import { MatCardModule } from '@angular/material/card';
  import { RouterLink } from '@angular/router';

  import { Produto } from '@shared/interfaces/produto';

  @Component({
    selector: 'app-lista-produtos',
    imports: [MatButtonModule, MatCardModule, RouterLink],
    templateUrl: './lista-produtos.html',
    styleUrl: './lista-produtos.scss',
  })
  export class ListaProdutos {
    produtos = input.required<Produto[]>();
    remover = output<number>();
  }
  ```

  ```html
  <!-- src/app/features/produtos/components/lista-produtos/lista-produtos.html -->
  @for (produto of produtos(); track produto.id) {
  <mat-card>
    <mat-card-header>
      <mat-card-title>{{ produto.titulo }}</mat-card-title>
      <mat-card-subtitle>{{ produto.concluida ? 'Concluída' : 'Pendente' }}</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <p>{{ produto.descricao }}</p>
    </mat-card-content>

    <mat-card-actions>
      <button matButton="filled" [routerLink]="['/produtos/edicao', produto.id]">Editar</button>
      <button matButton="outlined" (click)="remover.emit(produto.id)">Remover</button>
    </mat-card-actions>
  </mat-card>
  }
  ```

- [ ] Usar o componente na listagem

  ```ts
  // src/app/features/produtos/pages/listagem-produtos/listagem-produtos.ts
  import { ListaProdutos } from '@features/produtos/components/lista-produtos/lista-produtos';

  @Component({
  imports: [
  ...,
  ListaProdutos,
  ],
  })
  export class ListagemProdutos {}
  ```

  ```html
  @if (carregando()) {

  <p>Carregando produtos...</p>
  } @else if (erro()) {
  <p>{{ erro() }}</p>
  } @else if (produtosFiltradas().length === 0) {
  <p>Nenhuma produto encontrada.</p>
  } @else {
  <app-lista-produtos [produtos]="produtosFiltradas()" (remover)="removerProduto($event)" />
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
  // src/app/features/produtos/components/lista-produtos/lista-produtos.ts
  import { TitleCasePipe } from '@angular/common';
  import { ResumirTexto } from '@shared/pipes/resumir-texto';

  @Component({
    imports: [MatButtonModule, MatCardModule, RouterLink, TitleCasePipe, ResumirTexto],
  })
  export class ListaProdutos {}
  ```

  ```html
  <mat-card-title>{{ produto.titulo | titlecase }}</mat-card-title>

  <p>{{ produto.descricao | resumirTexto: 60 }}</p>
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
  <h2 mat-dialog-title>Remover produto</h2>

  <mat-dialog-content>
    <p>Tem certeza que deseja remover a produto "{{ data.titulo }}"?</p>
  </mat-dialog-content>

  <mat-dialog-actions align="end">
    <button matButton mat-dialog-close="false">Cancelar</button>
    <button matButton="filled" [mat-dialog-close]="true">Remover</button>
  </mat-dialog-actions>
  ```

- [ ] Abrir o modal a partir da listagem

  ```ts
  // src/app/features/produtos/pages/listagem-produtos/listagem-produtos.ts
  import { MatDialog } from '@angular/material/dialog';
  import { ModalConfirmacao } from '@shared/components/modal-confirmacao/modal-confirmacao';

  export class ListagemProdutos {
    private readonly dialog = inject(MatDialog);

    abrirModalRemocao(produto: Produto) {
      const dialogRef = this.dialog.open(ModalConfirmacao, {
        data: { titulo: produto.titulo },
      });

      dialogRef.afterClosed().subscribe((confirmou) => {
        if (!confirmou) return;
        this.removerProduto(produto.id);
      });
    }
  }
  ```

- [ ] Ligar o botão de remover ao modal

Se estiver usando o componente de lista, troque o output() para emitir a produto inteira:

```ts
remover = output<Produto>();
```

```html
<button matButton="outlined" (click)="remover.emit(produto)">Remover</button>
```

E na página:

```html
<app-lista-produtos [produtos]="produtosFiltradas()" (remover)="abrirModalRemocao($event)" />
```

## FASE 7. Aprimoramentos nível 2

### 24. Melhorar a rota dinâmica da edição com resolver

- [ ] Criar resolver funcional

  ```ts
  // src/app/features/produtos/resolvers/produto.resolver.ts
  import { ResolveFn } from '@angular/router';
  import { inject } from '@angular/core';

  import { ProdutosService } from '@core/services/produtos.service';

  export const produtoResolver: ResolveFn<any> = (route) => {
    const produtosService = inject(ProdutosService);
    const id = Number(route.paramMap.get('id'));
    return produtosService.getById(id);
  };
  ```

- [ ] Usar o resolver na rota de edição

  ```ts
  // src/app/app.routes.ts
  {
  path: 'produtos/edicao/:id',
  loadComponent: () =>
  import('./features/produtos/pages/edicao-produto/edicao-produto')
  .then((m) => m.EdicaoProduto),
  resolve: {
  produto: produtoResolver,
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
  switchMap((termo) => this.produtosService.getAll(termo)),
  )
  .subscribe((produtos) => {
  this.produtos.set(produtos);
  this.carregando.set(false);
  });

  this.produtosService.getAll().subscribe((produtos) => {
  this.produtos.set(produtos);
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
  /_ src/app/features/produtos/components/lista-produtos/lista-produtos.scss _/ :host {
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
