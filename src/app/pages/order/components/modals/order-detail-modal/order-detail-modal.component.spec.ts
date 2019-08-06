import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailModalComponent } from './order-detail-modal.component';

describe('OrderDetailModalComponent', () => {
  let component: OrderDetailModalComponent;
  let fixture: ComponentFixture<OrderDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
