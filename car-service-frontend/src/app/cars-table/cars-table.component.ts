import {Component, HostListener, Input, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MdbTableDirective} from 'angular-bootstrap-md';
import { Car } from '../car';
import { CarCreateEditDialogComponent } from '../car-create-edit-dialog/car-create-edit-dialog.component';
import { CarService } from '../car.service';

@Component({
    selector: 'cars-table',
    templateUrl: './cars-table.component.html',
    styleUrls: ['./cars-table.component.css']
})
export class CarsTableComponent {
    @ViewChild(MdbTableDirective, {static: true}) mdbTable: MdbTableDirective;
    headElements: string[] = ['ID', 'Model Name', 'Purchase', 'Mileage (km)', 'Warranty', ''];
    allCars: Car[] = [];
    searchText: string = '';
    currentCars: Car[];

    constructor(private carService: CarService, public carCreateEditDialog: MatDialog) {    
    }

    openDialog(car?: Car): void {
        const dialogRef = this.carCreateEditDialog.open(CarCreateEditDialogComponent, {          
          data: car,
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          this.carService.getCars().subscribe(cars => this.setCarsAndClear(cars))
        });
      }

    public setCarsAndClear(cars: Car[]): void {
        this.searchText = '';
        this.allCars = cars;
        this.mdbTable.setDataSource(cars);
        this.currentCars = this.mdbTable.getDataSource();
    }

    @HostListener('input') oninput() {
        this.searchItems();
    }

    ngOnInit() {
    }

    searchItems() {
        /*
            Walks through the list of all cars and only keeps those for which the searchText is included in at least one field.
        */
        this.currentCars = [];
        var searchTextLower = this.searchText.toLowerCase();
        for(var car of this.allCars) {
            if((car.id.toString().toLowerCase().includes(searchTextLower)) ||
                (car.model_name.toString().toLowerCase().includes(searchTextLower)) ||
                (car.purchase_year.toString().toLowerCase().includes(searchTextLower)) ||
                (car.mileage_km.toString().toLowerCase().includes(searchTextLower)) ||
                (car.warranty_active.toString().toLowerCase().includes(searchTextLower))) {
                    this.currentCars.push(car);
                }
        }

        this.mdbTable.setDataSource(this.currentCars)
    }

    deleteCar(car: Car) {
        this.carService.deleteCar(car.id).subscribe(_ => this.carService.getCars().subscribe(cars => this.setCarsAndClear(cars)));        
    }
}