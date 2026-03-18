import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-listagem-produtos',
  imports: [MatFormFieldModule, MatButtonModule, MatCardModule, MatSlideToggleModule],
  templateUrl: './listagem-produtos.html',
  styleUrl: './listagem-produtos.scss',
})
export class ListagemProdutos {}
