# (1) ARTEFATOS ANGULAR

[↩️ Voltar ao checklist](../CHECKLIST.md#6-criar-paginas-base-com-angular-cli)

No Angular, **artefatos** são arquivos e estruturas gerados para cumprir um papel específico na aplicação.

Exemplos comuns:

- componente
- serviço
- diretiva
- pipe
- guard
- resolver
- interface
- classe
- enum

Em projetos Angular modernos, o artefato mais frequente é o **componente**, porque ele representa partes da interface da aplicação.

---

## (1) O que são artefatos

Artefatos são unidades de código criadas para organizar a aplicação.

Exemplos:

- um **component** cria uma parte visual da interface
- um **service** centraliza lógica e acesso a dados
- um **pipe** transforma valores no template
- uma **directive** adiciona comportamento a elementos
- um **resolver** carrega dados antes de entrar na rota

---

## (1) Para que servem

Eles servem para:

- padronizar a estrutura do projeto
- acelerar a criação de código
- reduzir erros manuais
- manter consistência entre arquivos
- seguir o estilo esperado pelo Angular

Em vez de criar tudo manualmente, o Angular CLI gera os arquivos básicos já no formato correto.

---

## (1) Como criar artefatos

O comando usado é:

```bash
ng generate <tipo> <caminho/nome>
# (1)              │         └── nome e localização do artefato
# (1)              └── tipo do artefato (component, service, etc.)
```

Forma curta:

```bash
ng g <tipo> <caminho/nome>
```

Se o Angular CLI não estiver instalado globalmente, use:

```bash
npx ng g <tipo> <caminho/nome>
```

---

## (1) Exemplo: criar um componente

Comando completo:

```bash
ng generate component features/tasks-list/pages/tasks-list-page
```

Comando curto:

```bash
ng g c features/tasks-list/pages/tasks-list-page
```

Isso gera, em geral, os arquivos do componente, como:

- classe do componente `.ts`
- template do componente `.html`
- estilo do componente `.scss`
- teste unitário do componente `.spec.ts`

---

## (1) Artefato mais importante em aplicações Angular com interface

Em aplicações Angular com interface gráfica, o artefato mais recorrente é o **component**, porque ele representa partes visuais da aplicação.

Componentes podem ser usados para criar, por exemplo:

- páginas
- formulários
- listas
- cards
- barras de navegação
- campos reutilizáveis

---

## (1) Tipos de artefatos mais úteis neste projeto

### (1) component

Cria uma unidade de interface.

Use para:

- páginas
- componentes reutilizáveis
- partes visuais da tela

Exemplo:

```bash
ng g c features/tarefas/pages/listagem-tarefas
```

### (1) service

Cria um serviço.

Use para:

- acesso HTTP
- lógica compartilhada
- comunicação com API ou `json-server`

Exemplo:

```bash
ng g s core/services/tarefas
```

### (1) pipe

Cria um pipe.

Use para:

- transformar valores no template

Exemplo:

```bash
ng g p shared/pipes/resumo-texto
```

### (1) directive

Cria uma diretiva.

Use para:

- adicionar comportamento ou estilo reutilizável a elementos

Exemplo:

```bash
ng g d shared/directives/botao-perigo
```

### (1) resolver

Cria um resolver.

Use para:

- carregar dados antes da rota abrir

Exemplo:

```bash
ng g r features/tarefas/resolvers/tarefa-por-id
```

### (1) interface

Cria uma interface TypeScript.

Use para:

- tipar entidades como `Task`

Exemplo:

```bash
ng g i shared/interfaces/tarefa
```

---

## (1) O que é mais moderno no Angular 21 neste contexto

No Angular 21, o fluxo é:

- usar **componentes standalone**
- organizar a aplicação por **features**
- gerar artefatos com Angular CLI
- evitar criar `NgModule` sem necessidade

Ou seja: para páginas, componentes, pipes e diretivas, o caminho principal é usar artefatos standalone e declarar dependências diretamente no próprio artefato.

---

## (1) Resumo rápido

- **Artefato** = unidade de código com função específica
- O Angular CLI gera artefatos com `ng generate`
- O tipo mais usado é `component`
- Para este projeto, as páginas serão componentes
- Em Angular 21, o padrão é usar **standalone components**
