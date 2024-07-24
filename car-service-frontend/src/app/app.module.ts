import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatDatepickerModule }  from '@angular/material/datepicker'
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';


import { CarsComponent } from './cars/cars.component';
import { AppRoutingModule } from './app-routing.module';
import { CarsTableComponent } from './cars-table/cars-table.component';
import { AppComponent } from './app.component';
import { CarCreateEditDialogComponent } from './car-create-edit-dialog/car-create-edit-dialog.component';
import { ClientCardsComponent } from './client-cards/client-cards.component';
import { ClientCardCreateEditDialogComponent } from './client-card-create-edit-dialog/client-card-create-edit-dialog.component';
import { TransactionCreateEditDialogComponent } from './transaction-create-edit-dialog/transaction-create-edit-dialog.component';
import { TransactionsComponent } from './transactions/transactions.component';

export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY-MM-DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};


@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    CarsTableComponent,
    CarCreateEditDialogComponent,
    ClientCardsComponent,
    ClientCardCreateEditDialogComponent,
    TransactionCreateEditDialogComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MDBBootstrapModule.forRoot(),
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: MY_FORMATS},],
  bootstrap: [AppComponent]
})
export class AppModule { }
