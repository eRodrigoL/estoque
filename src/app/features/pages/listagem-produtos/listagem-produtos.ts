import { Component, inject, signal } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { RouterLink } from '@angular/router';

import { Produto } from '@app/shared/interfaces/produto';
import { ProdutosService } from '@app/core/services/produtos.service';

@Component({
  selector: 'app-listagem-produtos',
  imports: [MatFormFieldModule, MatButtonModule, MatCardModule, MatSlideToggleModule, RouterLink],
  templateUrl: './listagem-produtos.html',
  styleUrl: './listagem-produtos.scss',
})
export class ListagemProdutos {
  private readonly produtosService = inject(ProdutosService);

  produtos = signal<Produto[]>([]);
  carregando = signal(true);
  erro = signal('');

  ngOnInit() {
    this.produtosService.getAll().subscribe({
      next: (produtos) => {
        this.produtos.set(produtos);
        this.carregando.set(false);
      },
      error: () => {
        this.erro.set('Não foi possível carregar os produtos');
        this.carregando.set(false);
      },
    });
  }
}
