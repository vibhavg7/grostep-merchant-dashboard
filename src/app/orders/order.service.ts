import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';
import { ErrorTracker } from '../shared/errorTracker';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orderDetails: any = '';
  constructor(private http: HttpClient) { }

  private storeServiceUrl = 'http://localhost:3000/storesapi/';
  private orderService: any = 'http://localhost:3000/orderapi/';

  fetchAllStoreOrders(storeId: number, pagenumber: number, pagesize: number, filterBy: any, ordertype: any) {
    const obj: any = {};
    obj.page_number = pagenumber;
    obj.page_size = pagesize;
    obj.storeId = storeId;
    obj.filterBy = filterBy;
    obj.order_type = ordertype;

    // console.log(obj);

    return this.http.post<any[]>(`${this.storeServiceUrl}storeinfo/storeorders`, obj)
      .pipe(
        tap(data => {
          // console.log(data);
        })
        , map((data) => {
          return data;
        })
        , catchError(this.handleError)
      );
  }

  fetchOrderDetails(orderId): Observable<any> {
    // console.log(this.orderDetails);
    if (this.orderDetails) {
      return of(this.orderDetails);
    }
    return this.http.get<any>(`${this.orderService}${orderId}`).pipe(
      tap(data => {
        // console.log(data);/
      })
      , map((data) => {
          this.orderDetails = data;
          return data;
      })
      , catchError(this.handleError)
    );
  }

  fetchOrderProducts(orderId: number): Observable<any> {

    return this.http.get<any[]>(`${this.storeServiceUrl}storeinfo/storeorderproducts/${orderId}`)
      .pipe(
        tap(data => {
        })
        , map((data) => {
          // console.log(data);
          return data;
        })
        , catchError(this.handleError)
      );
  }

  fetchOrderBillInfo(orderId: number): Observable<any> {

    return this.http.get<any>(`${this.orderService}orderinfo/orderbill/${orderId}`).pipe(
      tap(data => {
        console.log(data);
      })
      , map((data) => {
          // this.orderDetails = data;
          return data;
      })
      , catchError(this.handleError)
    );
  }

  orderConfirmationStatus(orderId, billAmount, orderstatus) {
    const obj: any = {};
    obj.bill_amount = billAmount;
    obj.order_id = orderId;
    obj.order_status = orderstatus;

    return this.http.post<any>(`${this.orderService}orderinfo/orderbill/merchantconfirmation`, obj).pipe(
      tap(data => {
        // console.log(data);
      })
      , map((data) => {
          // this.orderDetails = data;
          return data;
      })
      , catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<ErrorTracker> {

    const dataError = new ErrorTracker();
    dataError.errorNumber = 100;
    dataError.errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    dataError.friendlyMessage = 'An error retriving data';
    return throwError(dataError);
  }
}
