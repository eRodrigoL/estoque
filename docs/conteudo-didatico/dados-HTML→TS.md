# (1) Dados do HTML para o TS

## (1) Finalidade

Capturar interação do usuário e enviar essa informação para o componente.

## (1) Onde usar

No template HTML.

## (1) Exemplo

```html
<input (input)="atualizarTexto($event)" />
<!--      │                     │                            -->
<!--      │                     └── evento enviado ao método -->
<!--      └── evento de digitação -->
```

```ts
atualizarTexto(event: Event) {
  const valor = (event.target as HTMLInputElement).value;
  console.log(valor);
}
```

### (1) Explicação detalhada

```html
<input (input)="atualizarTexto($event)" />
```

## (1) O que isso significa

O usuário interage no HTML, e o TypeScript recebe o valor dessa interação.

---
