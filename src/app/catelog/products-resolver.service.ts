import { Injectable } from '@angular/core';
import { ErrorTracker } from '../shared/errorTracker';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductCatelogService } from '../shared/product-catelog.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<any> {

  storeId: number; currentPage = 1; pageSize = 20; filterBy = '';
  constructor(private productCatelogService: ProductCatelogService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.storeId = +JSON.parse(localStorage.getItem('merchant')).store_id;
    return this.productCatelogService.fetchStoreProducts(this.storeId, this.currentPage, this.pageSize, this.filterBy).pipe(
      catchError(err => of(err))
    );
  }
}
