import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Car Service';
  routes = [
    {name: 'Cars', path: '/cars/'},
    {name: 'Client Cards', path: '/client_cards/'},
    {name: 'Transactions', path: '/transactions/'}
  ]

}
