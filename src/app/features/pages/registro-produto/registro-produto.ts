import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-produto',
  imports: [MatFormFieldModule, MatSlideToggleModule, MatButtonModule, MatInputModule, RouterLink],
  templateUrl: './registro-produto.html',
  styleUrl: './registro-produto.scss',
})
export class RegistroProduto {}
