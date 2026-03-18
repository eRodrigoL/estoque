# (1) Angular Material — tema base

## Instalação

```bash
ng add @angular/material
```

## (1) Finalidade

Definir os tokens visuais base da aplicação, como cores, tipografia e densidade.

## (1) Onde usar

Normalmente no arquivo `styles.scss` global, aplicando o tema em `html` para que ele fique disponível em toda a aplicação.

## (1) Exemplo

```scss
@use '@angular/material' as mat; /*
└──────────┬───────────┘     └── cria o alias "mat" para acessar mixins, funções e palettes do Angular Material
           └── importa a API Sass do Angular Material
*/

html {
  /*       ┌── aplica o tema base no escopo global da aplicação
  ┌────────┴────────┐*/
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
```

### (1) Efeito

O Angular Material gera os tokens CSS do tema nesse escopo.
Assim, os componentes Material passam a usar essa configuração como base visual.

---

## (2) Override de componente do Angular Material

### (2) Finalidade

Alterar tokens específicos de um componente Material sem mexer no tema inteiro.

### (2) Onde usar

Em arquivos SCSS globais ou em um escopo específico, como `:root`, `html`, uma classe CSS, ou o próprio seletor do componente, dependendo de onde o ajuste deve valer.

### (2) Exemplo: toolbar

```scss
@use '@angular/material' as mat;

:root {
  @include mat.toolbar-overrides(
    (
      container-background-color: rgb(0, 0, 0),
      container-text-color: rgb(255, 255, 255),
    )
  );
}
```

### (2) Exemplo: botão destrutivo

```scss
@use '@angular/material' as mat;

:root {
  .botao-perigo {
    @include mat.button-overrides(
      (
        filled-container-color: var(--mat-sys-error),
      )
    );
  }
}
```
