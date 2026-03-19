# PADRÕES DE NOMENCLATURA

## 1. Nomes de Pastas

dashed-case

```txt
tasks-list
```

## 2. Nomes de Arquivos

dashed-case

```txt
tasks-list.ts
```

## 3. Nomes de Classes

PascalCase

```ts
export class TasksList {}
```

## 4. Nomes de Componentes

**Classe**: PascalCase (com papel explícito)

**Seletor**: `app-` + dashed-case

```ts
selector: 'app-task-card-list';

export class TaskCardList {}
```

## 5. Nomes de Diretivas

**Classe**: PascalCase + `Directive`

**Seletor**: lower camelCase

```ts
selector: '[appErrorBtn]';

export class ErrorBtnDirective {}
```

## 6. Nomes de Pipes

- `name` em camelCase e sem hífem
- classe em PascalCase + `Pipe`

```ts
@Pipe({
  name: 'taskStatusLabel',
})
export class TaskStatusLabelPipe {}
```

## 7. Nomes de Serviços

**Classe**: PascalCase + `Service`

**Arquivo**: dashed-case + `.service`

```ts
export class TasksService {}
```

```txt
tasks.service.ts
```

## 8. Interfaces

PascalCase

```ts
export interface Task {
  id: string;
  title: string;
}
```

## 9. Types

PascalCase

```ts
export type TaskPayload = Omit<Task, 'id'>;
```

## 10. Variáveis

camelCase

```ts
const searchTerm = '';
const isLoading = true;
```

## 11. Signals

camelCase, nomeados pelo estado que representam

```ts
tasks = signal<Task[]>([]);
search = signal('');
isLoading = signal(false);
filteredTasks = computed(() => this.tasks().filter((task) => !task.done));
```

## 12. Funções e Métodos

camelCase, preferencialmente verbo + contexto

```ts
loadTasks() {}
openDeleteDialog() {}
```

## 13. Outputs

camelCase, nomeados pelo evento emitido

```ts
remove = output<Task>();
edit = output<Task>();
```

## 14. Inputs e model

camelCase, nomeados pelo dado recebido ou controlado

```ts
task = input.required<Task>();
tasks = input.required<Task[]>();
search = model('');
```

## 15. Arquivos de Rota, Resolver e Guard

**Rotas**: `routes.ts`

**Resolver**: dashed-case + `.resolver`

**Guard**: dashed-case + `.guard`

```ts
export const taskByIdResolver: ResolveFn<Task> = (route) => {
  const id = route.paramMap.get('id')!;
  return inject(TasksService).getById(id);
};
```

```txt
routes.ts
task-by-id.resolver.ts
auth.guard.ts
```

## 16. SCSS e Classes CSS

kebab-case

```scss
.form-container {
}
.action-container {
}
.error-button {
}
```

## 17. Convenção para Features

Nomear por responsabilidade funcional, em dashed-case

```txt
features/
  tasks-list/
  task-create/
  task-edit/
```
