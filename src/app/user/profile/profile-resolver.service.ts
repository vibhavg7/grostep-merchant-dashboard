import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductCatelogService } from '../../shared/product-catelog.service';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<any> {

  storeId: number;
  constructor(private productCatelogService: ProductCatelogService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    this.storeId = +JSON.parse(localStorage.getItem('merchant')).store_id;
    return this.productCatelogService.fetchStoreInfoById(this.storeId).pipe(
      catchError(err => of(err))
    );
  }
}
