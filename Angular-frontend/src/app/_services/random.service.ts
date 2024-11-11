import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RandomService {

  constructor(private http: HttpClient) { }

  register(data: any){
    return this.http.post('http://127.0.0.1:8000/api/register', data).pipe(
      catchError(this.handleError)
    );
  }

  login(data: any){
    return this.http.post('http://127.0.0.1:8000/api/login', data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error); // Log the entire error
    return throwError(() => new Error(error.error.message || 'An error occurred. Please try again.'));
  }
  


}
