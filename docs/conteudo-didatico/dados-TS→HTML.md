# (1) Dados do TS para o HTML

## (1) Finalidade

Exibir no template um valor que está no componente.

## (1) Onde usar

- no `.ts` do componente para declarar o dado
- no `.html` do componente para exibir o dado

## (1) Exemplo com variável simples

```ts
titulo = 'Lista de Tarefas';
```

```html
<h1>{{ titulo }}</h1>
```

## (1) Exemplo com signal

```ts
titulo = signal('Lista de Tarefas');
```

```html
<h1>{{ titulo() }}</h1>
<!--      |      └── {{ }} = interpolação = componente → view: trafega o dado renderizando texto-->
<!--      └── leitura do signal, signal tem () -->
```

## (1) O que isso significa

O componente define o valor.
O HTML apenas mostra esse valor.

---
