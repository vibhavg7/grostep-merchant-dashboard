import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(private route: ActivatedRoute,private _router:Router,
    private _orderService:OrderService) { }
  billInfo :any;
  image_url:any = '';
  orderId:number;
  billAmount:number;
  ngOnInit() {
    this.route.queryParamMap.pipe(
      mergeMap(data => this.getOrderDetails(data))
    ).subscribe((orderData) => {
      this.billInfo = orderData['billInfo'][0];
      this.image_url = this.billInfo.bill_image;
      this.billAmount = this.billInfo.bill_amount;
    });
  }

  getOrderDetails(data)
  {
    this.orderId = data['params']['order'];
    return this._orderService.fetchOrderBillInfo(this.orderId)
  }

  orderConfirmation(order_status)
  {    
    this._orderService.orderConfirmationStatus(this.orderId,this.billAmount,order_status).subscribe((data)=>{
      console.log(data);
      if(data.status == 200){        
        this._router.navigate([`orders/info/success`]);
      }
    })
  }

}
