import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoProduto } from './edicao-produto';

describe('EdicaoProduto', () => {
  let component: EdicaoProduto;
  let fixture: ComponentFixture<EdicaoProduto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoProduto],
    }).compileComponents();

    fixture = TestBed.createComponent(EdicaoProduto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
