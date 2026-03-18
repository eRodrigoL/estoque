# (1) model()

## (1) Finalidade

Permitir two-way binding entre pai e filho.

## (1) Onde usar

No `.ts` do componente filho.

## (1) Importação

```ts
import { model } from '@angular/core';
```

## (1) Exemplo no filho

```ts
termoBusca = model('');
//│            │     └── valor inicial
//│            └── cria model reativo
//└── nome da propriedade
```

## (1) Exemplo no HTML do filho

```html
<input [(ngModel)]="termoBusca" />
```

## (1) Exemplo no HTML do pai

```html
<app-campo-busca [(termoBusca)]="termoBusca" />
<!--                  │              └── valor no pai -->
<!--                  └── ligação de ida e volta -->
```

## (1) O que isso significa

O pai continua dono do valor, mas o filho consegue editar esse valor e devolver a mudança.

---
