import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroProduto } from './registro-produto';

describe('RegistroProduto', () => {
  let component: RegistroProduto;
  let fixture: ComponentFixture<RegistroProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroProduto],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
