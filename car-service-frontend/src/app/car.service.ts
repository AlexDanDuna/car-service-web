import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Car } from './car';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiUrl = "http://127.0.0.1:8000/api/cars/";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  /** POST: Add a new car to the server. */
  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car, this.httpOptions).pipe(
      tap((newCar: Car) => console.log(`added car w/ id=${newCar.id}`)),
      catchError(this.handleError<Car>('addCar'))
    );
  }

  /** GET: Retrieve all cars from the server. */
  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl).pipe(
      tap(_ => console.log('fetched cars')),
      catchError(this.handleError<Car[]>('getCars', []))
    );;
  }

  /** PUT: Edit a car on the server.  */
  editCar(car: Car): Observable<Car> {
    return this.http.put<Car>(this.apiUrl + car.id + '/', car, this.httpOptions).pipe(
      tap((newCar: Car) => console.log(`edited car w/ id=${newCar.id}`)),
      catchError(this.handleError<Car>('editCar'))
    );
  }

  /** PUT: Edit a car on the server.  */
  deleteCar(id: number): Observable<Car> {
    return this.http.delete<Car>(this.apiUrl + id + '/', this.httpOptions);
  }



  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      window.alert('An unknown server error has occured!');

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
