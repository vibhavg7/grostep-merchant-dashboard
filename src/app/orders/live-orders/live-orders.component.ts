import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-orders',
  templateUrl: './live-orders.component.html',
  styleUrls: ['./live-orders.component.css']
})
export class LiveOrdersComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  newOrder()
  {
    this.router.navigate(['/orders/ordertrack'], { queryParams: { state: 'new' } });
    // this.router.navigate(['/orders/ordertrack','new']);
  }

  pendingOrder()
  {
    this.router.navigate(['/orders/ordertrack'], { queryParams: { state: 'pending' } });
    // this.router.navigate(['/orders/ordertrack','pending']);
  }

  pastOrder()
  {
    this.router.navigate(['/orders/ordertrack'], { queryParams: { state: 'past' } });
    // this.router.navigate(['/orders/ordertrack','past']);
  }

}
