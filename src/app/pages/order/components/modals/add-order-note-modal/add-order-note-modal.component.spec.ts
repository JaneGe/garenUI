import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderNoteModalComponent } from './add-order-note-modal.component';

describe('AddOrderNoteModalComponent', () => {
  let component: AddOrderNoteModalComponent;
  let fixture: ComponentFixture<AddOrderNoteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrderNoteModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrderNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
