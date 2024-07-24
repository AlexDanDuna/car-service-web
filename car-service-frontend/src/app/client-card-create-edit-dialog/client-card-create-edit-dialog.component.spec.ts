import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCardCreateEditDialogComponent } from './client-card-create-edit-dialog.component';

describe('ClientCardCreateEditDialogComponent', () => {
  let component: ClientCardCreateEditDialogComponent;
  let fixture: ComponentFixture<ClientCardCreateEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientCardCreateEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientCardCreateEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
