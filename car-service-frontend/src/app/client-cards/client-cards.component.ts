import {Component, HostListener, Input, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MdbTableDirective} from 'angular-bootstrap-md';
import { ClientCard } from '../client-card';
import { ClientCardCreateEditDialogComponent } from '../client-card-create-edit-dialog/client-card-create-edit-dialog.component';
// import { ClientCardCreateEditDialogComponent } from '../client-card-create-edit-dialog/client-card-create-edit-dialog.component';
import { ClientCardService } from '../client-card.service';

@Component({
    selector: 'client-cards',
    templateUrl: './client-cards.component.html',
    styleUrls: ['./client-cards.component.css']
})
export class ClientCardsComponent {
    @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
    headElements: string[] = ['ID', 'First Name', 'Last Name', 'CNP', 'Birth Date', 'Registration Date', ''];
    allClientCards: ClientCard[] = [];
    searchText: string = '';
    currentClientCards: ClientCard[];

    constructor(private clientCardService: ClientCardService, public clientCardCreateEditDialog: MatDialog) {    
    }

    openDialog(clientCard?: ClientCard): void {
        const dialogRef = this.clientCardCreateEditDialog.open(ClientCardCreateEditDialogComponent, {          
          data: clientCard,
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.setClientCardsAndClear();
        });
      }

    public setClientCardsAndClear(): void {
        this.clientCardService.getClientCards().subscribe(clientCards => {
          this.allClientCards = clientCards;
          this.mdbTable.setDataSource(clientCards);
          this.currentClientCards = this.mdbTable.getDataSource();
        })
    }

    @HostListener('input') oninput() {
        this.searchItems();
    }

    ngOnInit() {
      this.setClientCardsAndClear();
    }

    searchItems() {
        /*
            Walks through the list of all clientCards and only keeps those for which the searchText is included in at least one field.
        */
        this.currentClientCards = [];
        var searchTextLower = this.searchText.toLowerCase();
        for(var clientCard of this.allClientCards) {
            if((clientCard.id.toString().toLowerCase().includes(searchTextLower)) ||
                (clientCard.client_first_name.toString().toLowerCase().includes(searchTextLower)) ||
                (clientCard.client_last_name.toString().toLowerCase().includes(searchTextLower)) ||
                (clientCard.cnp.toString().toLowerCase().includes(searchTextLower)) ||
                (clientCard.birth_date.toString().toLowerCase().includes(searchTextLower)) ||
                (clientCard.registration_date.toString().toLowerCase().includes(searchTextLower))) {
                    this.currentClientCards.push(clientCard);
                }
        }

        this.mdbTable.setDataSource(this.currentClientCards)
    }

    deleteClientCard(clientCard: ClientCard) {
        this.clientCardService.deleteClientCard(clientCard.id).subscribe(_ => this.clientCardService.getClientCards().subscribe(clientCards => this.setClientCardsAndClear()));        
    }
}