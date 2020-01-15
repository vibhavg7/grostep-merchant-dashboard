import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCatelogComponent } from './product-catelog/product-catelog.component';
import { CatelogRoutingModule } from './catelog-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AddProductComponent } from './product-catelog/add-product.component';



@NgModule({
  declarations: [ProductCatelogComponent, AddProductComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    CatelogRoutingModule
  ]
})
export class CatelogModule { }
