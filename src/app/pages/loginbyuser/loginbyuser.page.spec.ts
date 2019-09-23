import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginbyuserPage } from './loginbyuser.page';

describe('LoginbyuserPage', () => {
  let component: LoginbyuserPage;
  let fixture: ComponentFixture<LoginbyuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginbyuserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginbyuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
