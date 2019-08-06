import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSkuModalComponent } from './choose-sku-modal.component';

describe('ChooseSkuModalComponent', () => {
  let component: ChooseSkuModalComponent;
  let fixture: ComponentFixture<ChooseSkuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseSkuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSkuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
