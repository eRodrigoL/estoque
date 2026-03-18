import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmacao } from './modal-confirmacao';

describe('ModalConfirmacao', () => {
  let component: ModalConfirmacao;
  let fixture: ComponentFixture<ModalConfirmacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalConfirmacao],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalConfirmacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
