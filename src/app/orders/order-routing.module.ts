import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { LiveOrdersComponent } from './live-orders/live-orders.component';
import { OrderProductInfoComponent } from './order-management/order-product-info.component';
import { OrderMerchantInfoComponent } from './order-management/order-merchant-info.component';
import { OrderInvoiceInfoComponent } from './order-management/order-invoice-info.component';
import { OrderProductsResolver } from './order-products.resolver';
import { OrderTrackingDashboardComponent } from './order-tracking/order-tracking-dashboard.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';
import { OrderConfirmationComponent } from './order-tracking/order-confirmation.component';
import { OrderSucessComponent } from './order-tracking/order-sucess.component';
import { OrderTrackProductsInfoComponent } from './order-tracking/order-track-products-info.component';
import { OrdersResolverService } from './orders-resolver.service';

const routes: Routes = [
    {
        path: 'pastorders',
        component: PastOrdersComponent,
        resolve: { resolvedOrders: OrdersResolverService}
    },
    {
        path: '',
        component: LiveOrdersComponent
    },
    {
        path: 'info',
        component: OrderTrackingDashboardComponent,
        children: [
            { path: '', component: OrderTrackProductsInfoComponent},
            { path: 'productinfo', component: OrderTrackProductsInfoComponent},
            { path: 'confirmation', component: OrderConfirmationComponent },
            { path: 'success', component: OrderSucessComponent }
        ]
    },
    {
        path: 'ordertrack',
        component: OrderTrackingComponent
    }
    // {
    //     path: ':orderId',
    //     component: OrderDashboardComponent,
    //     children: [
    //         { path: 'productsinfo', component: OrderProductInfoComponent },
    //         // resolve:{resolvedProducts:OrderProductsResolver}
    //         { path: 'customerinfo', component: OrderCustomerInfoComponent },
    //         { path: 'merchantinfo', component: OrderMerchantInfoComponent },
    //         { path: 'deliveryinfo', component: OrderDeliveryInfoComponent },
    //         { path: 'invoiceinfo', component: OrderInvoiceInfoComponent }
    //     ]
    // }
];
@NgModule(
    {
        imports: [
            RouterModule.forChild(routes)
        ],
        exports: [
            RouterModule
        ]
    }

)
export class OrderRoutingModule {

}
