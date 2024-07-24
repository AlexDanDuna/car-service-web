import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientCard } from '../client-card';
import { ClientCardService } from '../client-card.service';

@Component({
  selector: 'app-client-card-create-edit-dialog',
  templateUrl: './client-card-create-edit-dialog.component.html',
  styleUrls: ['./client-card-create-edit-dialog.component.css']
})
export class ClientCardCreateEditDialogComponent {
  @ViewChild('clientCardForm',{static: true}) clientCardForm: NgForm;

  title = "Create New Client Card";
  actionName = "Add"
  form: FormGroup;
  clientCard: ClientCard;
  dateUnchanged: boolean = true;


  onSubmit() { 
    if(this.actionName == "Edit") {
      this.clientCardService.editClientCard(this.clientCard).subscribe();
    } else {
      let date = new Date(this.clientCard.birth_date);
      this.clientCard.birth_date = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDay()

      date = new Date(this.clientCard.registration_date);
      this.clientCard.registration_date = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDay()

      this.clientCardService.addClientCard(this.clientCard).subscribe();
    }

    this.dialogRef.close();
  }


  constructor(
    private fb: FormBuilder,
    private clientCardService: ClientCardService,
    public dialogRef: MatDialogRef<ClientCardCreateEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientCard,
  ) {
    if(data) {
      this.clientCard = data;
      // this is an edit form
      this.title = "Edit Client Card";
      this.actionName = "Edit";
    }
    else {
      this.clientCard = {id: 0,     
        client_first_name: '',
        client_last_name: '',
        cnp: 0,
        birth_date: '',
        registration_date: ''} as ClientCard;
    }
  }

  ngAfterViewInit(): void {
    console.log(this.clientCardForm.controls['purchase_year']);
  }


  cancel() {
      this.dialogRef.close();
}
  


}
