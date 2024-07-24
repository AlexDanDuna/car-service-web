import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from '../car';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-create-edit-dialog',
  templateUrl: './car-create-edit-dialog.component.html',
  styleUrls: ['./car-create-edit-dialog.component.css']
})
export class CarCreateEditDialogComponent {
  @ViewChild('carForm',{static: true}) carForm: NgForm;

  title = "Create New Car";
  actionName = "Add"
  form: FormGroup;
  car: Car;
  dateUnchanged: boolean = true;


  onSubmit() { 
    if(this.actionName == "Edit") {
      this.carService.editCar(this.car).subscribe();
    } else {
      let date = new Date(this.car.purchase_year);
      this.car.purchase_year = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDay()

      this.carService.addCar(this.car).subscribe();
    }

    this.dialogRef.close();
  }


  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    public dialogRef: MatDialogRef<CarCreateEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Car,
  ) {
    if(data) {
      this.car = data;
      // this is an edit form
      this.title = "Edit Car";
      this.actionName = "Edit";
    }
    else {
      this.car = {id: 0, model_name: "", purchase_year: '', mileage_km: 0, warranty_active: false} as Car;
    }
  }

  ngAfterViewInit(): void {
    console.log(this.carForm.controls['purchase_year']);
  }

  changeDate(newDate: Date) {
    this.car.purchase_year = newDate.getFullYear().toString() + '-' + (newDate.getMonth() + 1).toString() + '-' + newDate.getDay();    
    this.dateUnchanged = false;    
  }

  cancel() {
      this.dialogRef.close();
}
  


}
