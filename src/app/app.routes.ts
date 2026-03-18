import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'produtos',
    loadComponent: () =>
      import('@pages/listagem-produtos/listagem-produtos').then((m) => m.ListagemProdutos),
  },
  {
    path: 'produtos/registro',
    loadComponent: () =>
      import('@pages/registro-produto/registro-produto').then((m) => m.RegistroProduto),
  },
  {
    path: 'produtos/edicao/:id',
    loadComponent: () =>
      import('@pages/edicao-produto/edicao-produto').then((m) => m.EdicaoProduto),
  },
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'produtos',
  },
];
