import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { RouterLink, ActivatedRoute, Router } from '@angular/router';

import { ProdutosService } from '@app/core/services/produtos.service';

@Component({
  selector: 'app-edicao-produto',
  imports: [
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './edicao-produto.html',
  styleUrl: './edicao-produto.scss',
})
export class EdicaoProduto {
  private readonly route = inject(ActivatedRoute);
  private readonly produtosService = inject(ProdutosService);
  private readonly router = inject(Router);

  readonly id = this.route.snapshot.paramMap.get('id') ?? '';

  form = new FormGroup({
    nome: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    categoria: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    preco: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    qtEstoque: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    observacoes: new FormControl('', { nonNullable: true }),
    reposicaoSolicitada: new FormControl(false, { nonNullable: true }),
  });
  ngOnInit() {
    this.produtosService.getById(this.id).subscribe({
      next: (produto) => {
        this.form.patchValue({
          nome: produto.nome,
          categoria: produto.categoria,
          preco: produto.preco,
          qtEstoque: produto.qtEstoque,
          observacoes: produto.observacoes,
          reposicaoSolicitada: produto.reposicaoSolicitada,
        });
      },
    });
  }

  salvar() {
    if (this.form.invalid) return;

    this.produtosService
      .update(this.id, {
        ...this.form.getRawValue(),
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/produtos');
        },
      });
  }
}
