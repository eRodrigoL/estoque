import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';

import { RouterLink, Router } from '@angular/router';

import { ProdutosService } from '@app/core/services/produtos.service';

@Component({
  selector: 'app-registro-produto',
  imports: [
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    TextFieldModule,

    RouterLink,

    ReactiveFormsModule,
  ],
  templateUrl: './registro-produto.html',
  styleUrl: './registro-produto.scss',
})
export class RegistroProduto {
  private readonly router = inject(Router);
  private readonly produtosService = inject(ProdutosService);

  form = new FormGroup({
    nome: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    categoria: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    preco: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    qtEstoque: new FormControl(0, { nonNullable: true, validators: [Validators.required] }),
    observacoes: new FormControl('', { nonNullable: true }),
    reposicaoSolicitada: new FormControl(false, { nonNullable: true }),
  });

  salvar() {
    if (this.form.invalid) return;

    this.produtosService
      .create({
        ...this.form.getRawValue(),
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/produtos');
        },
      });
  }
}
