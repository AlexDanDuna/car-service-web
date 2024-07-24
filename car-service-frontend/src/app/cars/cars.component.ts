import { Component, OnInit, ViewChild } from '@angular/core';
import { Car } from '../car';
import { CarService } from '../car.service';
import { CarsTableComponent } from '../cars-table/cars-table.component';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {

  @ViewChild(CarsTableComponent) carsTable: CarsTableComponent;
  cars: Car[] = [];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    var cars$ = this.carService.getCars();

    cars$.subscribe(cars => {
      this.cars = cars;
      this.carsTable.setCarsAndClear(cars);
    });
  }

  add(modelName: string, purchaseDate: string, mileageKm: string, underWarranty: boolean) {
    
    console.log(purchaseDate);
    const car = {
      id: 0, model_name: modelName, purchase_year: purchaseDate, mileage_km: Number(mileageKm),
      warranty_active: underWarranty
    } as Car;

    var newCar$ = this.carService.addCar(car);

    newCar$.subscribe(car => {
      this.cars.push(car);
      this.carsTable.setCarsAndClear(this.cars);
    });
  }
}
