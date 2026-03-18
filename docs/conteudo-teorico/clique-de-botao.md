# (1) Clique de botão

## (1) Finalidade

Executar uma ação do TypeScript quando o usuário clicar.

## (1) Onde usar

No HTML do componente.

## (1) Exemplo

```html
<button (click)="salvar()">Salvar</button>
<!--      │        └── método chamado -->
<!--      └── evento de clique -->
```

## (1) Exemplo no TypeScript

```ts
salvar() {
  console.log('salvando');
}
```

## (1) O que isso significa

Quando o botão é clicado, o Angular executa o método `salvar()` no componente.

---
