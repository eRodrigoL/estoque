# (1) Dados do TS para o HTML e do HTML para o TS

## (1) Finalidade

Criar ida e volta de dados.

## (1) Exemplo com `ngModel`

```ts
nome = 'Rodrigo';
```

```html
<input [(ngModel)]="nome" />
<!--       │          │ -->
<!--       │          └── variável ligada -->
<!--       └── ligação de ida e volta -->
<p>{{ nome }}</p>
```

## (1) O que isso significa

- o TypeScript manda o valor para o HTML
- o usuário altera o valor no HTML
- o novo valor volta para o TypeScript
- o template reflete a mudança

---
