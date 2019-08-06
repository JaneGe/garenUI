/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CdComponent } from './cd.component';

describe('CdComponent', () => {
  let component: CdComponent;
  let fixture: ComponentFixture<CdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
