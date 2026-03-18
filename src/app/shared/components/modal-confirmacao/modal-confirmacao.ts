import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-confirmacao',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './modal-confirmacao.html',
  styleUrl: './modal-confirmacao.scss',
})
export class ModalConfirmacao {}
