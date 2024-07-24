import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCreateEditDialogComponent } from './transaction-create-edit-dialog.component';

describe('TransactionCreateEditDialogComponent', () => {
  let component: TransactionCreateEditDialogComponent;
  let fixture: ComponentFixture<TransactionCreateEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionCreateEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionCreateEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
