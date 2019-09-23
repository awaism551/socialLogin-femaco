import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiPedidoPage } from './mi-pedido.page';

describe('MiPedidoPage', () => {
  let component: MiPedidoPage;
  let fixture: ComponentFixture<MiPedidoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiPedidoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiPedidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
