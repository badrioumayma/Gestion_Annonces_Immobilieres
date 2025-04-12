import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePropertiesComponent } from './manage-properties.component';

describe('ManagePropertiesComponent', () => {
  let component: ManagePropertiesComponent;
  let fixture: ComponentFixture<ManagePropertiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePropertiesComponent]
    });
    fixture = TestBed.createComponent(ManagePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
