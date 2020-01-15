import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {

  constructor(private _activatedRoute: ActivatedRoute, private _orderService: OrderService,private _location: Location) { }

  orderType: any;
  storeId: any;
  currentPage: number = 1;
  pageSize: number = 20;
  store_order_total_count: any;
  storeOrders: any = [];
  errorMessage: any = "";
  ngOnInit() {
    // this.orderType = this._activatedRoute.snapshot.params['type'];
    this.storeId = +JSON.parse(localStorage.getItem('merchant'))['store_id'];
    this._activatedRoute.queryParamMap.subscribe(state => {
      this.orderType = state['params']['state'];
      if (this.orderType == 'new') {
        this.callOrdersAPI(1);
      }
      else if (this.orderType == 'pending') {
        this.callOrdersAPI(2)
      }
      else if (this.orderType == 'past') {
        this.callOrdersAPI(3)
      }
    });
  }

  callOrdersAPI(status) {
    this._orderService.fetchAllStoreOrders(this.storeId, this.currentPage, this.pageSize, "", status).subscribe((data) => {
      this.store_order_total_count = data['store_order_count'][0]['store_orders_count'];
      this.storeOrders = data['store_orders_info'];
      console.log(this.storeOrders);
      console.log(this.store_order_total_count);
    })
  }

  backClicked()
  {
    this._location.back();
  }


}
