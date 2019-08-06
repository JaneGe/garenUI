import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxDeclarationValueListComponent } from './max-declaration-value-list.component';

describe('MaxDeclarationValueListComponent', () => {
  let component: MaxDeclarationValueListComponent;
  let fixture: ComponentFixture<MaxDeclarationValueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaxDeclarationValueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxDeclarationValueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
