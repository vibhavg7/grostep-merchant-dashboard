import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { OrderService } from './order.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn:'root'
})
export class OrderProductsResolver implements Resolve<any>
{
    constructor(private _orderService:OrderService)
    {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        let order_id = route.parent.params['orderId'];
        return this._orderService.fetchOrderProducts(order_id)
        .pipe(
            map(orderProductsResolver => (
                { orderProducts: orderProductsResolver['order_products_info'],error:'' }
            )),
            catchError(error => {
              const message = `Retrieval error: ${error}`;
              return of({ orderProducts: null, error: message });
            })
          );
    }
}