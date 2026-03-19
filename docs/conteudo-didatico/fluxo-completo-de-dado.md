# (1) Fluxo completo: botão → método → service → HTML

## (1) Finalidade

Entender o caminho completo do dado dentro da aplicação.

## (1) Exemplo: remover tarefa

### (1) HTML

```html
<!--         ┌── matButton ➡️ aplicação do tema do Angular Material         -->
<!--         |        ┌── ="outlined" ➡️ variante visual do botão           -->
<!--         |        |                                                      -->
<!--         │        |                      ┌── tarefa.id ➡️ id da tarefa atual enviado ao método -->
<!--         │        |      ┌───────────────┴────────────────┐              -->
<button matButton="outlined" (click)="removerTarefa(tarefa.id)">Remover</button>
<!-- |                         │            │           └── tarefa.id ➡️ valor passado como argumento -->
<!-- |                         │            └── removerTarefa(...) ➡️ método chamado no clique -->
<!-- |                         └── (click)="" ➡️ evento de clique do Angular -->
<!-- └── <button> ➡️ elemento HTML de botão -->
```

### (1) Método no componente

```ts
//    ┌── removerTarefa(){} ➡️ método
//    │       ┌── id ➡️ parâmetro
//    │       │     ┌── : number ➡️ tipo
removerTarefa(id: number) {

  //        ┌── this.tarefasService ➡️ propriedade da classe que guarda a instância do service
  //        │           ┌── .remove() ➡️ método do service responsável pela remoção
  //        │           │    ┌── id ➡️ id enviado ao service
  //        │           │    │       ┌── .subscribe() ➡️ executa a inscrição no Observable retornado
  //        │           │    │       │       ┌── () => {} ➡️ função executada quando a resposta da remoção retorna com sucesso
  this.tarefasService.remove(id).subscribe(() => {

    //    ┌── this.tarefas ➡️ propriedade da classe que guarda o signal com a lista atual
    //    │          ┌── .update() ➡️ método do signal usado para recalcular seu valor
    this.tarefas.update((tarefas) =>
      tarefas.filter((tarefa) => tarefa.id !== id),
      //    │              │         │        └── !== id ➡️ mantém apenas itens cujo id seja diferente do removido
      //    │              │         └── tarefa.id ➡️ id da tarefa atualmente analisada no filtro
      //    │              └── (tarefa) => tarefa.id !== id ➡️ condição usada para decidir quais tarefas permanecem na lista
      //    └── tarefas.filter ➡️ cria uma nova lista sem a tarefa removida
    );
  });
}
```

### (1) Método no service

```ts
remove(id: number) {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}
```

### (1) Fluxo detalhado

1. usuário clica no botão
2. o HTML chama `removerTarefa(tarefa.id)`
3. o componente recebe o `id`
4. o componente chama o service
5. o service envia `DELETE`
6. a resposta volta
7. o signal `tarefas` é atualizado
8. o HTML reage automaticamente
