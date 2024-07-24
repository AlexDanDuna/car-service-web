import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { ClientCardsComponent } from './client-cards/client-cards.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  { path: 'cars', component: CarsComponent },
  { path: 'client_cards', component: ClientCardsComponent },
  { path: 'transactions', component: TransactionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }