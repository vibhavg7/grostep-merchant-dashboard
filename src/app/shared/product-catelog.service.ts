import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, map, catchError, debounceTime } from 'rxjs/operators';
import { Observable, throwError, forkJoin, of } from 'rxjs';
import { ErrorTracker } from '../shared/errorTracker';
@Injectable({
  providedIn: 'root'
})
export class ProductCatelogService {

  private _storeServiceUrl = "http://localhost:3000/storesapi/";
  private _categoryServiceUrl = "http://localhost:3000/categoryapi";
  private _productServiceUrl = "http://localhost:3000/productsapi/";
  constructor(private _http:HttpClient) { }

  fetchStoreProducts(storeId: number, page_number: number, page_size: number, filterBy: any) {
    let obj = {};
    obj['page_number'] = page_number; obj['page_size'] = page_size; obj['storeId'] = storeId;
    obj['filterBy'] = filterBy;

    return this._http.post<any[]>(`${this._storeServiceUrl}storeinfo/storeproducts`, obj)
      .pipe(
        tap(data => {
        })
        , map((data) => {
          return data;
        })
        , catchError(this.handleError)
      );
  }

  fetchStoreInfoById(storeId): Observable<any> {

    return this._http.get(`${this._storeServiceUrl}storeinfo/${storeId}`).pipe(
      tap(data => {
        // this.storeCategories = data['store_categories'];
        // console.log(data);
      })
      , map((storeData) => {
        return storeData;
      })
      , catchError(this.handleError)
    )
  }

  fetchStoreProductById(storeProductId: number) {
    return this._http.get<any[]>(`${this._storeServiceUrl}storeinfo/storeproducts/${storeProductId}`)
      .pipe(
        tap(data => {
        })
        , map((data) => {
          return data;
        })
        , catchError(this.handleError)
      );
  }

  fetchAllStoreOrders(storeId: number, page_number: number, page_size: number, filterBy: any) {
    let obj = {};
    obj['page_number'] = page_number; obj['page_size'] = page_size; obj['storeId'] = storeId;
    obj['filterBy'] = filterBy;

    console.log(obj);

    return this._http.post<any[]>(`${this._storeServiceUrl}storeinfo/storeorders`, obj)
      .pipe(
        tap(data => {
          console.log(data);
        })
        , map((data) => {
          return data;
        })
        , catchError(this.handleError)
      );
  }

  addStoreProducts(addStoreProductForm, product_id, storeId): Observable<any> {
    let obj = {};

    obj['store_cost_price'] = addStoreProductForm['productCostPrice'];
    obj['store_marked_price'] = addStoreProductForm['productMarkedPrice'];
    obj['store_selling_price'] = addStoreProductForm['productSellingPrice'];
    obj['store_discount'] = +addStoreProductForm['storeDiscount'];
    obj['store_margin'] = +addStoreProductForm['storeMargin'];
    obj['store_initial_quantity'] = 0//+addStoreProductForm['storeQuantity'];
    obj['store_updated_quantity'] = 0//+addStoreProductForm['storeQuantity'];
    obj['store_additional_quantity'] = 0;
    obj['product_id'] = product_id;
    obj['store_id'] = storeId;
    obj['status'] = addStoreProductForm['status'];
    obj['stock'] = 1;

    console.log(obj);
    const url = `${this._storeServiceUrl}addstoreproducts`;
    console.log(url);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(url, obj, { headers }).pipe(
      tap(data => { console.log(JSON.stringify(data)) }),
      map((data) => {
        return data;
      }),
      catchError(this.handleError)
    )
  }

  public storeDataCatData(storeId) :Observable<any[]> {
    let obj = {};
    obj['filterBy'] = "";
    let response1 = this._http.get(`${this._storeServiceUrl}storeinfo/${storeId}`);
    let response2 = this._http.post(`${this._categoryServiceUrl}/storecategories`,obj);
    return forkJoin([response1,response2]);
  }

  editStoreProduct(storeProductForm, storeProductId) {

    const url = `${this._storeServiceUrl}storeinfo/storeproducts/edit/${storeProductId}`;
    const obj: any = {};
    // obj.productId = storeProductId;
    obj.store_cost_price = storeProductForm.productCostPrice;
    obj.store_selling_price = storeProductForm.productSellingPrice;
    obj.store_margin = storeProductForm.storeMargin;
    obj.store_discount = storeProductForm.storeDiscount;
    obj.status = storeProductForm.status;
    obj.product_marked_price = storeProductForm.productMarkedPrice;
    obj.stock = 1;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(url, obj, { headers }).pipe(
      tap(data => { console.log(JSON.stringify(data));
      }),
      map((data) => {
        return data;
      }),
      catchError(this.handleError)
    );
  }

  searchProducts(queryString: any): Observable<any> {
    if (queryString != '') {
        return this._http.get<any[]>(`${this._productServiceUrl}productsearch/${queryString}`)
            .pipe(
                tap(data => {
                    // console.log(JSON.stringify(data))
                })
                , map((data) => {
                    return data['products'];

                })
                , catchError(this.handleError)
            );
    }
    console.log(queryString);
    return of([]);
}


  private handleError(err: HttpErrorResponse): Observable<ErrorTracker> {

    let dataError = new ErrorTracker();
    dataError.errorNumber = 100;
    dataError.errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    dataError.friendlyMessage = "An error retriving data";
    return throwError(dataError);
    // let errorMessage = '';
    // if (err.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   errorMessage = `An error occurred: ${err.error.message}`;
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    // }
    // // console.error(errorMessage);
    // return throwError(errorMessage);
  }
}
