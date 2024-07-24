import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCreateEditDialogComponent } from './car-create-edit-dialog.component';

describe('CarCreateEditDialogComponent', () => {
  let component: CarCreateEditDialogComponent;
  let fixture: ComponentFixture<CarCreateEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarCreateEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarCreateEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
