import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCatelogComponent } from './product-catelog/product-catelog.component';
import { AddProductComponent } from './product-catelog/add-product.component';
import { ProductsResolverService } from './products-resolver.service';

const routes: Routes = [
    {
        path: '',
        component: ProductCatelogComponent,
        resolve: { resolvedCatelogData: ProductsResolverService }
    },
    {
        path: 'merchantproducts/:productId/edit',
        component: AddProductComponent
    },
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
export class CatelogRoutingModule {

}
