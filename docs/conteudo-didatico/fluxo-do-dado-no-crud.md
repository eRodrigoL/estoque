# (1) Fluxo do dado no CRUD

## (1) Finalidade

Entender o caminho completo do dado no CRUD, desde a interação do usuário até a resposta da API e a atualização da interface.

## (1) Observação de arquitetura

Neste exemplo, o fluxo usa:

- componente standalone
- Reactive Forms
- HttpClient
- service para acesso à API
- navegação com Router

> Em Angular v21, **Signal Forms existe, mas é experimental**. Para material didático e projeto estável, Reactive Forms continua sendo uma escolha sólida.

---

## (2) Estrutura geral do fluxo

### (2) Caminho do dado no Create

1. usuário preenche o formulário
2. usuário clica em **Salvar**
3. o HTML dispara o evento `ngSubmit`
4. o componente executa o método `salvar()`
5. o componente valida o formulário
6. o componente monta o `payload`
7. o componente chama o service
8. o service envia a requisição HTTP `POST`
9. a API responde com o registro criado
10. o componente decide o que fazer após sucesso
11. a aplicação navega ou atualiza a tela

---

## (3) Exemplo completo — Create

### (3) Modelos

```ts
//                 ┌── nome da interface
export interface Produto {
  id: string;
  campoExemplo2: string;
  campoExemplo1: boolean;
} //     │          └── tipo do dado
//       └── nome do campo

export type PayloadProduto = Omit<Produto, 'id'>;
//               │            │     │       │
//               │            │     │       └── propriedade removida
//               │            │     └── tipo base
//               │            └── utility type que remove campos
//               └── novo nome do tipo
```

### (3) HTML

```html
<!--
  ┌── <form> ➡️ elemento de formulário -->
<form [formGroup]="form" (ngSubmit)="salvar()">
  <!--     │                 └── (ngSubmit)="salvar()" ➡️ executa o método salvar() quando o formulário é enviado -->
  <!--     └── [formGroup]="form" ➡️ conecta este formulário HTML ao FormGroup da classe                          -->

  <!--  ┌── componente do Angular Material que cria a estrutura visual do campo -->
  <mat-form-field>
    <mat-label>Nome do Produto</mat-label>
    <!-- └── rótulo exibido acima ou dentro do campo -->

    <input matInput formControlName="nome" />
    <!-- |    │           └── formControlName="nome" ➡️ conecta este input ao controle "nome" do FormGroup -->
    <!-- |    └── matInput ➡️ aplica a diretiva do Angular Material ao input -->
    <!-- └── <input> ➡️ campo de entrada -->
  </mat-form-field>

  <mat-form-field>
    <mat-label>Descrição do Produto</mat-label>

    <textarea
      matInput
      formControlName="observacoes"
      cdkTextareaAutosize
      cdkAutosizeMinRows="2"
      cdkAutosizeMaxRows="6"
      placeholder="(opcional)"
    ></textarea>
    <!--  └── <textarea> ➡️ campo de texto multilinha -->
    <!--          ├── matInput ➡️ aplica a diretiva do Angular Material ao textarea -->
    <!--          ├── formControlName="observacoes" ➡️ conecta o campo ao controle "observacoes" do FormGroup -->
    <!--          ├── cdkTextareaAutosize ➡️ faz a altura crescer automaticamente conforme o texto -->
    <!--          ├── cdkAutosizeMinRows="2" ➡️ define a altura mínima equivalente a 2 linhas -->
    <!--          ├── cdkAutosizeMaxRows="6" ➡️ limita o crescimento automático até 6 linhas -->
    <!--          └── placeholder="Opcionais" ➡️ texto de apoio exibido enquanto o campo estiver vazio -->
  </mat-form-field>

  <!-- ┌── <button> ➡️ botão do formulário -->
  <button type="submit" matButton="filled">Salvar</button>
  <!--      │              └── matButton="filled" ➡️ aplica a variante visual preenchida do Angular Material -->
  <!--      └── type="submit" ➡️ envia o formulário -->
</form>
```

### (3) O que isso significa

- `[formGroup]="form"` liga o HTML ao objeto `FormGroup`
- `(ngSubmit)="salvar()"` chama o método ao enviar o formulário
- `formControlName="..."` conecta cada campo a um controle do formulário

---

### (4) Componente

```ts
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProdutosService } from '@app/core/services/produtos.service';

@Component({
  selector: 'app-registro-produto',
  imports: [ReactiveFormsModule],
  templateUrl: './registro-produto.html',
})
export class RegistroProduto {
  private readonly produtosService = inject(ProdutosService);
  private readonly router = inject(Router);
  //   │       │      |        │      └── Router ➡️ serviço injetado
  //   │       │      |        └── inject([...]) ➡️ função moderna de injeção de dependência do Angular
  //   |       |      └── router ➡️ nome da propriedade que guarda o serviço injetado
  //   │       └── private ➡️ a propriedade só pode ser usada dentro da própria classe
  //   └── private ➡️ a propriedade só pode ser usada dentro da própria classe

  // ┌── form ➡️ propriedade da classe que guarda o formulário reativo
  // |        ┌── new FormGroup(...) ➡️ cria um grupo de controles de formulário
  form = new FormGroup({
    observacoes: new FormControl('', { nonNullable: true }),
    nome: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    // |        |         |         |                  └── validators: [Validators.required] ➡️ torna o campo obrigatório
    // |        |         |         └── nonNullable: true ➡️ impede que o valor seja null
    // |        |         └── '' ➡️ valor inicial vazio
    // |        └── new FormControl(...) ➡️ cria um controle individual
    // └── nome ➡️ nome do controle no formulário
  });

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();

    this.produtosService.create(payload).subscribe(() => {
      this.router.navigateByUrl('/produtos');
    });
  }
}
```

> Tabela com os validadores mais comuns do Validators em Reactive Forms do Angular
>
> | Validador                        | O que faz                                                                    | Exemplo de uso                                                             |
> | -------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
> | `Validators.required`            | Campo obrigatório; falha se o valor estiver vazio.                           | `['', Validators.required]`                                                |
> | `Validators.requiredTrue`        | Exige que o valor seja exatamente `true`; muito usado em checkbox de aceite. | `[false, Validators.requiredTrue]`                                         |
> | `Validators.email`               | Valida formato de e-mail.                                                    | `['', Validators.email]`                                                   |
> | `Validators.min(0)`              | Define valor numérico mínimo.                                                | `[0, Validators.min(1)]`                                                   |
> | `Validators.max(100)`            | Define valor numérico máximo.                                                | `[0, Validators.max(100)]`                                                 |
> | `Validators.minLength(3)`        | Exige quantidade mínima de caracteres.                                       | `['', Validators.minLength(3)]`                                            |
> | `Validators.maxLength(50)`       | Limita a quantidade máxima de caracteres.                                    | `['', Validators.maxLength(50)]`                                           |
> | `Validators.pattern(/^[0-9]+$/)` | Exige que o valor siga um padrão RegExp.                                     | `['', Validators.pattern(/^[0-9]+$/)]`                                     |
> | `Validators.nullValidator`       | Não valida nada; sempre retorna `null`.                                      | `['', Validators.nullValidator]`                                           |
> | `Validators.compose([...])`      | Combina vários validadores em um só.                                         | `['', Validators.compose([Validators.required, Validators.minLength(3)])]` |

### (4) Explicação do fluxo no componente

```ts
salvar() {
if (this.form.invalid) {
this.form.markAllAsTouched();
return;
}

const payload = this.form.getRawValue();

this.produtosService.create(payload).subscribe(() => {
this.router.navigateByUrl('/produtos');
});
}
```

#### (4) Leitura guiada

```ts
//  ┌── salvar(){} ➡️ método chamado no envio do formulário
salvar() {
  if (this.form.invalid) {
  //        └── this.form.invalid ➡️ verifica se existe algum controle inválido

    //    ┌── marca todos os campos como tocados para exibir validações
    this.form.markAllAsTouched();
    return;

}

//                  ┌── this.form ➡️ formulário atual
//                  |          ┌── .getRawValue() ➡️ devolve todos os valores do form
const payload = this.form.getRawValue();

//     ┌── this.produtosService ➡️ service responsável pela API
//     │                ┌── .create(payload) ➡️ envia os dados para criação
//     │                │     ┌── payload ➡️ corpo da requisição
//     │                │     │         ┌── .subscribe() ➡️ executa a requisição HTTP
this.produtosService.create(payload).subscribe(() => {
  this.router.navigateByUrl('/produtos');
    //   │           ┌── .navigateByUrl() ➡️ navega para outra rota
    //   └── this.router ➡️ instância do Router

});
}
```

### (4) O que isso significa

O componente:

- valida o formulário
- coleta os dados
- chama o service
- espera a resposta da API
- navega após sucesso

---

## (5) Service

```ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Produto, PayloadProduto } from './produto.model';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/produtos';

  create(payload: PayloadProduto) {
    return this.http.post<Produto>(this.apiUrl, payload);
  }

  getAll() {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  getById(id: string | string) {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  update(id: string | string, payload: PayloadProduto) {
    return this.http.put<Produto>(`${this.apiUrl}/${id}`, payload);
  }

  remove(id: string | string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### (5) O que isso significa

O service concentra o acesso HTTP:

- `post()` → create
- `get()` → read
- `put()` → update
- `delete()` → delete

> Em Angular atual, a configuração recomendada do HttpClient é via `provideHttpClient(...)`, em vez de depender de `HttpClientModule` como padrão de setup.
>
> ```txt
> Exemplo moderno:
> provideHttpClient()
> Opcional:
> provideHttpClient(withFetch())
> ```

---

## (6) Fluxo completo do dado — Read all

### (6) Finalidade

Buscar todos os registros para exibição em lista.

### (6) Exemplo

```ts
ngOnInit() {
this.produtosService.getAll().subscribe((produtos) => {
this.produtos = produtos;
});
}
```

### (6) Fluxo

1. componente inicia
2. componente chama `getAll()`
3. service envia `GET`
4. API devolve lista de produtos
5. componente guarda a lista
6. HTML renderiza os itens

---

## (7) Fluxo completo do dado — Read one

### (7) Finalidade

Buscar um único registro para preencher uma tela de edição ou detalhe.

### (7) Exemplo

```ts
carregarProduto(id: string) {
this.produtosService.getById(id).subscribe((produto) => {
this.form.patchValue(produto);
});
}
```

### (7) Fluxo

1. componente recebe o `id`
2. componente chama `getById(id)`
3. service envia `GET /:id`
4. API devolve um produto
5. componente preenche o formulário com `patchValue()`

---

## (8) Fluxo completo do dado — Update

### (8) Finalidade

Enviar alterações de um registro já existente.

### (8) Exemplo

```ts
salvarEdicao(id: string) {
if (this.form.invalid) {
this.form.markAllAsTouched();
return;
}

const payload = this.form.getRawValue();

this.produtosService.update(id, payload).subscribe(() => {
this.router.navigateByUrl('/produtos');
});
}
```

### (8) Fluxo

1. usuário altera os campos
2. usuário envia o formulário
3. componente valida
4. componente monta o payload
5. service envia `PUT /:id`
6. API atualiza o registro
7. componente navega ou atualiza a interface

---

## (9) Fluxo completo do dado — Delete

### (9) Finalidade

Remover um registro existente.

### (9) Exemplo

```ts
removerProduto(id: string) {
this.produtosService.remove(id).subscribe(() => {
this.produtos = this.produtos.filter((produto) => produto.id !== id);
});
}
```

### (9) Fluxo

1. usuário clica em remover
2. componente chama `remove(id)`
3. service envia `DELETE /:id`
4. API remove o item
5. componente atualiza a lista local
6. HTML reage e remove o item da tela

---

## (10) Resumo visual do CRUD

### (10) Create

```text
HTML → componente → service → POST → API → resposta → componente → navegação/UI
```

### (10) Read all

```text
componente → service → GET → API → lista → componente → HTML
```

### (10) Read one

```text
componente → service → GET /id → API → item → componente → formulário
```

### (10) Update

```text
formulário → componente → service → PUT /id → API → resposta → componente → navegação/UI
```

### (10) Delete

```text
botão → componente → service → DELETE /id → API → resposta → componente → atualização da lista
```

---

## (11) Conclusão

No CRUD, o dado não nasce no service e não termina no HTML.

O fluxo normal é:

1. o usuário interage no HTML
2. o componente coordena a regra da tela
3. o service conversa com a API
4. a resposta volta ao componente
5. o HTML reage ao novo estado

Essa separação deixa o código mais legível, testável e fácil de manter.
