# (1) Pipe

## (1) Finalidade

Transformar um valor apenas para exibição no template.

## (1) Onde usar

No HTML do componente.

## (1) Exemplo com pipe nativo

```html
{{ tarefa.titulo | titlecase }}
<!--      │         │                 -->
<!--      │         └── pipe aplicado -->
<!--      └── valor original          -->
```

## (1) O que isso significa

O valor continua o mesmo no TypeScript, mas no HTML será exibido transformado.

---

## (2) Pipe customizado

### (2) Finalidade

Criar uma transformação própria da aplicação.

### (2) Onde usar

No TypeScript para definir o pipe e no HTML para usá-lo.

### (2) Exemplo

```ts
@Pipe({
  name: 'resumirTexto',
  //          └── nome usado no HTML
})

export class ResumirTexto implements PipeTransform {
  transform(valor: string, limite: number = 40): string {
  //  |       |               |                    └── tipo devolvido pelo pipe
  //  |       │               └── valor opcional recebido no HTML (pré definido em 40)
  //  |       └── valor original
  //  |
  //  └── método obrigatório do pipe: recebe um valor, transforma e devolve outro

    // ┌── lógica para mostrar "primeiros caracteres + ..." em textos não vazios
    // ├──────────────────────────────────┐
    /* | */ if (!valor) return '';
    /* | */                            |
    /* | */ if (valor.length <= limite) {
    /* | */   return valor;
    /* | */ }
    // └──────────────────────────────────┘

    return `${valor.slice(0, limite)}...`;
    //          |     |   |    |      └── concatena "..." ao final
    //          │     │   │    └── termina no valor da variável `limite`
    //          │     │   └── começa no índice 0, ou seja, do primeiro caractere
    //          │     └── método que recorta parte da string
    //          └── valor original
  }
}
```

### (2) Uso no HTML

```html
<p>{{ tarefa.descricao | resumirTexto:50 }}</p>
<!--  └──────┬───────┘ |       │       └── argumento enviado ao pipe -->
<!--         │         |       └── nome do pipe                      -->
<!--         │         └── solicitação da transformação pipe         -->
<!--         └── valor original                                      -->
```

### (2) O que isso significa

O texto será resumido no HTML, mas o valor original continuará intacto no componente.

---
