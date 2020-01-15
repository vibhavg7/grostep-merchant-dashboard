import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { LiveOrdersComponent } from './live-orders/live-orders.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrderInvoiceInfoComponent } from './order-management/order-invoice-info.component';
import { OrderMerchantInfoComponent } from './order-management/order-merchant-info.component';
import { OrderProductInfoComponent } from './order-management/order-product-info.component';
import { OrderTrackingDashboardComponent } from './order-tracking/order-tracking-dashboard.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { OrderConfirmationComponent } from './order-tracking/order-confirmation.component';
import { OrderSucessComponent } from './order-tracking/order-sucess.component';
import { OrderTrackProductsInfoComponent } from './order-tracking/order-track-products-info.component';



@NgModule({
  declarations: [
    PastOrdersComponent,
    LiveOrdersComponent,
    OrderInvoiceInfoComponent,
    OrderMerchantInfoComponent,
    OrderProductInfoComponent,
    OrderTrackingComponent,
    OrderTrackingDashboardComponent,
    OrderConfirmationComponent,
    OrderProductInfoComponent,
    OrderTrackProductsInfoComponent,
    OrderSucessComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule
  ]
})
export class OrdersModule { }
