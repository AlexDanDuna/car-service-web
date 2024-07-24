import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MdbTableDirective } from 'angular-bootstrap-md';
import { Transaction } from '../transaction';
import { TransactionCreateEditDialogComponent } from '../transaction-create-edit-dialog/transaction-create-edit-dialog.component';
import { TransactionService } from '../transaction.service';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
  headElements: string[] = ['ID', 'Full Client Name', 'Car Model Name', 'Car ID', 'Client Card ID', 'Parts Cost', 'Labour Cost', 'Time', ''];
  allTransactions: Transaction[] = [];
  searchText: string = '';
  currentTransactions: Transaction[];

  constructor(private transactionService: TransactionService, public transactionCreateEditDialog: MatDialog) {    
  }

  openDialog(transaction?: Transaction): void {
      const dialogRef = this.transactionCreateEditDialog.open(TransactionCreateEditDialogComponent, {          
        data: transaction,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.setTransactionsAndClear();
      });
    }

  public setTransactionsAndClear(): void {
      this.transactionService.getTransactions().subscribe(transactions => {
        this.allTransactions = transactions;
        this.mdbTable.setDataSource(transactions);
        this.currentTransactions = this.mdbTable.getDataSource();
      })
  }

  @HostListener('input') oninput() {
      this.searchItems();
  }

  ngOnInit() {
    this.setTransactionsAndClear();
  }

  searchItems() {
      /*
          Walks through the list of all transactions and only keeps those for which the searchText is included in at least one field.
      */
      this.currentTransactions = [];
      var searchTextLower = this.searchText.toLowerCase();
      for(var transaction of this.allTransactions) {
          if((transaction.id.toString().toLowerCase().includes(searchTextLower)) ||
              (transaction.parts_cost.toString().toLowerCase().includes(searchTextLower)) ||
              (transaction.labour_cost.toString().toLowerCase().includes(searchTextLower)) ||
              (transaction.time.toString().toLowerCase().includes(searchTextLower)) ||
              (transaction.car_id.toString().toLowerCase().includes(searchTextLower)) ||
              (transaction.client_card_id.toString().toLowerCase().includes(searchTextLower))) {
                  this.currentTransactions.push(transaction);
              }
      }

      this.mdbTable.setDataSource(this.currentTransactions)
  }

  deleteTransaction(transaction: Transaction) {
      this.transactionService.deleteTransaction(transaction.id).subscribe(_ => this.transactionService.getTransactions().subscribe(transactions => this.setTransactionsAndClear()));        
  }
}