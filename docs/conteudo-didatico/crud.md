# (1) CRUD

## (1) Finalidade

Executar operações sobre dados.

## (1) Significado

- Create → criar
- Read → ler
- Update → atualizar
- Delete → remover

---

## (2) CRUD — Create

### (2) Finalidade

Criar um novo registro.

### (2) Exemplo no service

```ts
// ┌── create(){} ➡️ nome do método
// │      ┌── payload ➡️ nome do parâmetro
// │      │          ┌── : PayloadTarefa ➡️ tipo esperado para o dado recebido
create(payload: PayloadTarefa) {
  return this.http.post<Tarefa>(this.apiUrl, payload);
//         |   |     │     |         |          └── , payload ➡️ dados enviados no corpo da requisição
//         |   |     |     │         └── this.apiUrl ➡️ URL para onde a requisição será enviada
//         |   |     |     └── <Tarefa> ➡️ tipo esperado na resposta da API
//         |   |     └── .post<>() ➡️ método HTTP POST do HttpClient
//         |   └── .http ➡️ propriedade da classe que guarda o HttpClient
//         └── this ➡️ referencia a instância atual da classe
}
```

### (2) Exemplo no componente

```ts
//       ┌── this.tarefasService ➡️ propriedade da classe que guarda o service
//       |            ┌── .create() ➡️ método do service que envia a criação
//       |            |        ┌── this.form ➡️ propriedade da classe que guarda o formulário
//       |            |        |          ┌── .getRawValue() ➡️ método que devolve todos os valores do formulário
//       |            |        |          |            ┌── .subscribe() ➡️ método que "ativa" a requisição e escuta a resposta
//       |            |        |          |            |       ┌── () => {} ➡️ Arrow Function (Callback) executada no sucesso de {...}
this.tarefasService.create(this.form.getRawValue()).subscribe(() => {
  this.router.navigateByUrl('/tarefas');
  // │    │         │            └── '/tarefas' ➡️ rota para onde a aplicação navegará após sucesso
  // │    │         └── .navigateByUrl() ➡️ método do Router para navegar por URL
  // │    └── .router ➡️ propriedade da classe que guarda o Router
  // └── this ➡️ referência à instância atual da classe
});
```

### (2) O que isso significa

O componente envia os dados do formulário, a API cria o registro e depois a aplicação navega.

---

## (3) CRUD — Read all

### (3) Finalidade

Ler todos os registros.

### (3) Exemplo

```ts
// ┌── nome do método
getAll() {
  return this.http.get<Tarefa[]>(this.apiUrl);
//             |    |    │             └── this.apiUrl ➡️ URL para onde a requisição será enviada
//             |    |    └── <Tarefa[]> ➡️ tipo esperado na resposta da API: lista de tarefas
//             |    └── .get<>() ➡️ método HTTP GET do HttpClient
//             └── .http ➡️ propriedade da classe que guarda o HttpClient
}
```

---

## (4) CRUD — Read one

### (4) Finalidade

Ler um único registro.

### (4) Exemplo

```ts
//  ┌── getById(){} ➡️ nome do método
//  │    ┌── id ➡️ nome do parâmetro
//  │    │        ┌── : number | string ➡️ tipos aceitos para o identificador
getById(id: number | string) {
  return this.http.get<Tarefa>(`${this.apiUrl}/${id}`);
//             |    │    |      │     │          └── id ➡️ identificador concatenado ao final da URL
//             |    │    |      │     └── this.apiUrl ➡️ URL base da coleção
//             |    │    |      └── `${...}` ➡️ template string usada para montar a URL final
//             |    |    └── <Tarefa> ➡️ tipo esperado na resposta da API: uma tarefa
//             |    └── .get<>() ➡️ método HTTP GET do HttpClient
//             └── .http ➡️ propriedade da classe que guarda o HttpClient
}
```

#### (4) Explicação detalhada

```ts
[...]`${this.apiUrl}/${id}`;
//   │      │       │  │
//   │      │       │  │
//   │      │       │  └── ${id} ➡️ valor do identificador
//   │      │       └── / ➡️ separador entre a URL base e o id
//   │      └── ${this.apiUrl} ➡️ URL base da coleção
//   └── `...` ➡️ template string
```

### (4) O que isso significa

A URL final ficará parecida com:

```bash
http://localhost:3000/tarefas/1
```

---

## (5) CRUD — Update

### (5) Finalidade

Atualizar um registro.

### (5) Exemplo

```ts
//  ┌── update(){} ➡️ nome do método
//  │  ┌── id ➡️ nome do primeiro parâmetro
//  │  │     ┌── : number ➡️ tipo esperado para o identificador
//  │  │     |        ┌── payload ➡️ nome do segundo parâmetro
//  │  │     |        │          ┌── : PayloadTarefa ➡️ tipo esperado para o dado enviado
update(id: number, payload: PayloadTarefa) {
  return this.http.put<Tarefa>(`${this.apiUrl}/${id}`, payload);
//             |    |    │         │                         └── , payload ➡️ corpo enviado na atualização
//             |    |    │         └── `${this.apiUrl}/${id}` ➡️ URL do item que será atualizado
//             |    |    └── <Tarefa> ➡️ tipo esperado na resposta da API
//             |    └── put<>() ➡️ método HTTP PUT do HttpClient
//             └── .http ➡️ propriedade da classe que guarda o HttpClient
}
```

---

## (6) CRUD — Delete

### (6) Finalidade

Remover um registro.

### (6) Exemplo

```ts
//  ┌── remove(){} ➡️ nome do método
//  │   ┌── id ➡️ nome do parâmetro
//  │   │    ┌── : number ➡️ tipo esperado para o identificador
remove(id: number) {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
//           |       |     │          │           └── id ➡️ identificador concatenado ao final da URL
//           |       |     │          └── `${this.apiUrl}/${id}` ➡️ URL do item que será atualizado
//           |       |     └── <void> ➡️ resposta esperada sem corpo útil
//           |       └── delete<>() ➡️ método HTTP DELETE do HttpClient
//           └── this.http ➡️ propriedade da classe que guarda uma instância de HttpClient
}
```
