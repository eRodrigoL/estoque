# Json Server

## Finalidade

Emular um backend REST simples durante o desenvolvimento.

## Quando usar

Quando o front-end precisa:

- listar dados
- criar dados
- editar dados
- remover dados

sem depender de uma API real.

## Instalação

```bash
npm install -D json-server
```

## Exemplo de arquivo de dados

```json
{
  "tarefas": []
}
```

### Explicação

```json
//⬋ objeto principal do arquivo
{
  "tarefas": []
} //  │      └── lista inicial vazia
//    └── nome da coleção
```

## Exemplo explicado de script no `package.json`

### Explicação detalhada

```json
"scripts": {
  "server": "json-server --watch db.json --port 3000"
}//  │           │            │      │       │    └── número da porta aberta
//   │           │            │      │       └── flag para definir a porta
//   │           │            │      └── arquivo monitorado
//   │           │            └── flag para observar mudanças no arquivo
//   │           └── comando que inicia o json-server
//   └── nome do script que será chamado com npm run
```

## Como rodar

```bash
npm run server
```

## Resultado esperado

A coleção `tarefas` ficará acessível em:

```bash
http://localhost:3000/tarefas
```

---
