import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { ClientCard } from './client-card';

@Injectable({
  providedIn: 'root'
})
export class ClientCardService {
  private apiUrl = "http://127.0.0.1:8000/api/client_cards/";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  /** POST: Add a new clientCard to the server. */
  addClientCard(clientCard: ClientCard): Observable<ClientCard> {
    return this.http.post<ClientCard>(this.apiUrl, clientCard, this.httpOptions).pipe(
      tap((newClientCard: ClientCard) => console.log(`added clientCard w/ id=${newClientCard.id}`)),
      catchError(this.handleError<ClientCard>('addClientCard'))
    );
  }

  /** GET: Retrieve all clientCards from the server. */
  getClientCards(): Observable<ClientCard[]> {
    return this.http.get<ClientCard[]>(this.apiUrl).pipe(
      tap(_ => console.log('fetched clientCards')),
      catchError(this.handleError<ClientCard[]>('getClientCards', []))
    );;
  }

  /** PUT: Edit a clientCard on the server.  */
  editClientCard(clientCard: ClientCard): Observable<ClientCard> {
    return this.http.put<ClientCard>(this.apiUrl + clientCard.id + '/', clientCard, this.httpOptions).pipe(
      tap((newClientCard: ClientCard) => console.log(`edited clientCard w/ id=${newClientCard.id}`)),
      catchError(this.handleError<ClientCard>('editClientCard'))
    );
  }

  /** PUT: Edit a clientCard on the server.  */
  deleteClientCard(id: number): Observable<ClientCard> {
    return this.http.delete<ClientCard>(this.apiUrl + id + '/', this.httpOptions);
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
