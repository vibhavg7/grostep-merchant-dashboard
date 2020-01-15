import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { ErrorTracker } from '../shared/errorTracker';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersResolverService implements Resolve<any> {

  storeId: number;
  constructor(private orderService: OrderService) { }

  pagenumber = 1; pagesize = 5; filterBy = ''; orderstatus = '';
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.storeId = +JSON.parse(localStorage.getItem('merchant')).store_id;
    return this.orderService.fetchAllStoreOrders(this.storeId, this.pagenumber, this.pagesize, '', this.orderstatus).pipe(
      catchError(err => of(err))
  );
  }
}
