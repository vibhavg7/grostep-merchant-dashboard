import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { ErrorTracker } from '../../shared/errorTracker';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent implements OnInit {

  constructor(private orderService: OrderService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('hi');
  }
  storeId: any;
  pageTitle: any = 'Merchant Orders';
  storeordertotalcount: any;
  storeOrders: any = [];
  errorMessage: any = '';
  currentPage = 1; pageSize = 5;
  filterBy = ''; orderstatus: any = ''; orderIdSelected = false;
  ngOnInit() {
    console.log('hi');
    this.storeId = +JSON.parse(localStorage.getItem('merchant')).store_id;
    const resolvedData = this.activatedRoute.snapshot.data.resolvedOrders;
    if (resolvedData instanceof ErrorTracker) {
      this.errorMessage = resolvedData.errorMessage;
    } else {
      this.storeordertotalcount = resolvedData.store_order_count[0].store_orders_count;
      this.storeOrders = resolvedData.store_orders_info;
    }
  }

  ngOnViewInit() {
    console.log('hi');
  }

  currentPageFn(page) {
    this.orderService.fetchAllStoreOrders(this.storeId, page, this.pageSize, this.filterBy, this.orderstatus)
      .subscribe((data: any) => {
        this.storeOrders = data.store_orders_info;
      });
  }

  orderSelected(orderid) {
    this.orderIdSelected = true;
    this.router.navigate(['/orders/info'], { queryParams: { order: orderid } });
  }



}
