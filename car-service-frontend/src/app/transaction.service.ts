import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = "http://127.0.0.1:8000/api/transactions/";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  /** POST: Add a new transaction to the server. */
  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction, this.httpOptions).pipe(
      tap((newTransaction: Transaction) => console.log(`added transaction w/ id=${newTransaction.id}`)),
      catchError(this.handleError<Transaction>('addTransaction'))
    );
  }

  /** GET: Retrieve all transactions from the server. */
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl).pipe(
      tap(_ => console.log('fetched transactions')),
      catchError(this.handleError<Transaction[]>('getTransactions', []))
    );;
  }

  /** PUT: Edit a transaction on the server.  */
  editTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(this.apiUrl + transaction.id + '/', transaction, this.httpOptions).pipe(
      tap((newTransaction: Transaction) => console.log(`edited transaction w/ id=${newTransaction.id}`)),
      catchError(this.handleError<Transaction>('editTransaction'))
    );
  }

  /** PUT: Edit a transaction on the server.  */
  deleteTransaction(id: number): Observable<Transaction> {
    return this.http.delete<Transaction>(this.apiUrl + id + '/', this.httpOptions);
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
