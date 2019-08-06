/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EbayComponent } from './ebay.component';

describe('EbayComponent', () => {
  let component: EbayComponent;
  let fixture: ComponentFixture<EbayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
