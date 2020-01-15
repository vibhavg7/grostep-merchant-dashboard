import { Component, OnInit } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-track-products-info',
  templateUrl: './order-track-products-info.component.html',
  styleUrls: ['./order-track-products-info.component.css']
})
export class OrderTrackProductsInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _orderService: OrderService) { }
  orderProducts :any = [];
  orderId:number;
  ngOnInit() {
    this.route.queryParamMap.pipe(
      mergeMap(data => this.getOrderProducts(data))
    ).subscribe((productData) => {
      this.orderProducts = productData['order_products_info'];
    });
  }

  getOrderProducts(data)
  {
    this.orderId = data['params']['order'];
    return this._orderService.fetchOrderProducts(data['params']['order'])
  }


}
