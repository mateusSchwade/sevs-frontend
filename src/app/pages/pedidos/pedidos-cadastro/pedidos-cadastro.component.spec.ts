import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosCadastroComponent } from './pedidos-cadastro.component';

describe('PedidosCadastroComponent', () => {
  let component: PedidosCadastroComponent;
  let fixture: ComponentFixture<PedidosCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
