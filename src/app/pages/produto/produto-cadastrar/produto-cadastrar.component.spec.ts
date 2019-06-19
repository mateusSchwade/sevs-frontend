import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCadastrarComponent } from './produto-cadastrar.component';

describe('ProdutoCadastrarComponent', () => {
  let component: ProdutoCadastrarComponent;
  let fixture: ComponentFixture<ProdutoCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
