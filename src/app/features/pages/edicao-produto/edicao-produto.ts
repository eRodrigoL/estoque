import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edicao-produto',
  imports: [MatFormFieldModule, MatSlideToggleModule, MatButtonModule, MatInputModule],
  templateUrl: './edicao-produto.html',
  styleUrl: './edicao-produto.scss',
})
export class EdicaoProduto {}
