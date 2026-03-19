# (1) Interface

## (1) Finalidade

Definir o formato de um dado.

## (1) Onde usar

No TypeScript:

- para tipar respostas da API
- para tipar arrays
- para tipar objetos recebidos e enviados

## (1) Exemplo

```ts
//                 ┌── nome da interface
export interface Produto {
  id: string;
  campoExemplo2: string;
  campoExemplo1: boolean;
} //     │          └── tipo do dado
//       └── nome do campo
```

## (1) O que isso significa

Qualquer objeto do tipo `Tarefa` precisa ter exatamente essas propriedades.

---

---

## (2) Type para payload

### (2) Finalidade

Definir o formato dos dados enviados ao backend.

### (2) Exemplo

```ts
export type PayloadProduto = Omit<Produto, 'id'>;
//               │            │     │       │
//               │            │     │       └── propriedade removida
//               │            │     └── tipo base
//               │            └── utility type que remove campos
//               └── novo nome do tipo
```

### (2) Resultado prático

`PayloadTarefa` equivale a:

```ts
{
  titulo: string;
  descricao: string;
  concluida: boolean;
}
```

### (2) Quando usar `Tarefa`

Quando o dado estiver completo, normalmente vindo da API.

### (2) Quando usar `PayloadTarefa`

Quando o dado será enviado para criar ou atualizar.

---
