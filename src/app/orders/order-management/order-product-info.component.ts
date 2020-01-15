import { Component, OnInit } from '@angular/core';;
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { mergeMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-order-product-info',
  templateUrl: './order-product-info.component.html',
  styleUrls: ['./order-product-info.component.css']
})
export class OrderProductInfoComponent implements OnInit {

  constructor(
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private orderService: OrderService,
              private location: Location) { }
  orderid: any;
  orderProducts: any = [];
  errorMessage: any;
  pageTitle = 'Order Products';

  ngOnInit() {
    this.activatedRoute.queryParamMap.pipe(
      mergeMap((data: any) => this.orderService.fetchOrderProducts(data.params.order))
    ).subscribe((productData: any) => {
      this.orderProducts = productData.order_products_info;
    });

    // this.order_id = this._activatedRoute.parent.snapshot.params['orderId'];
    // this.orderProducts = this._activatedRoute.snapshot.data['resolvedProducts']['orderProducts'];
    // this.errorMessage = this._activatedRoute.snapshot.data['resolvedProducts']['error'];

  }

  backClicked() {
    this.location.back();
    // this.router.navigate(['/orders/pastorders']);
  }

}
