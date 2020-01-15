import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get isLoggedIn() {
    return !!localStorage.getItem('merchant');
  }
  _authURL: any = "http://localhost:3000/";
  redirectUrl: any;
  constructor(private _http: HttpClient) {

  }

  login(employee): Observable<any> {
    return this._http.post(`${this._authURL}storesapi/validate`, employee).pipe(
      tap(),
      map((merchantData) => {
        if (merchantData['status'] == 200 && merchantData['employeeData'][0] != undefined) {
          // console.log('not a valid user' + merchantData['employeeData'][0]);
          localStorage.setItem('merchant', JSON.stringify(merchantData['employeeData'][0]));
        }
        return merchantData;
      })
    )
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('merchant');
  }


  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
}
}
