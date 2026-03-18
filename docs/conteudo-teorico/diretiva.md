# (1) Diretiva

## (1) Finalidade

Adicionar comportamento a um elemento.

## (1) Onde usar

No TypeScript para criar a diretiva e no HTML para aplicá-la.

## (1) Exemplo

```ts
@Directive({
  //               ┌── nome usado no HTML como atributo
  selector: '[appBotaoPerigo]',
})

//                                    ┌── informa o uso do ciclo de vida OnInit dentro da classe
//                        ┌───────────┴───────────┐
export class BotaoPerigo implements OnInit {
  private readonly hostEl = inject(ElementRef).nativeElement as HTMLElement;
  //  │      │       │        │        │             │              └── diz ao TypeScript que esse elemento será tratado como HTMLElement
  //  │      │       │        │        │             └── acessa o elemento nativo do DOM
  //  │      │       │        │        └── injeta ElementRef, que dá acesso ao elemento onde a diretiva foi aplicada
  //  │      │       │        └── função de injeção de dependência
  //  │      │       └── nome da propriedade
  //  │      └── impede reatribuir essa propriedade depois da criação
  //  └── a propriedade só pode ser usada dentro da própria classe

  ngOnInit() {
    this.hostEl.classList.add('botao-perigo');
    //     │        │      │
    //     │        │      └── adiciona a classe CSS 'botao-perigo'
    //     │        └── acessa a lista de classes do elemento
    //     └── elemento HTML que recebeu a diretiva
  }
}
```

## (1) Uso no HTML

```html
<button appBotaoPerigo>Remover</button>
<!--          └── diretiva aplicada ao elemento -->
```

## (1) O que isso significa

Quando a diretiva for aplicada, o elemento ganhará o comportamento definido nela.

---
