import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpropertyComponent } from './addproperty.component';

describe('AddpropertyComponent', () => {
  let component: AddpropertyComponent;
  let fixture: ComponentFixture<AddpropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddpropertyComponent]
    });
    fixture = TestBed.createComponent(AddpropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
