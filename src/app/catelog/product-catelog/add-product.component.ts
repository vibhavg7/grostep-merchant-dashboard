import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, tap, debounceTime, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductCatelogService } from '../../shared/product-catelog.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  addStoreProductForm: FormGroup;
  storeId: any;
  storeProductId: any;
  errorMessage: any;
  submitted: boolean;
  productValueSet = false;
  results: any;
  selectedProduct: any = '';
  constructor(private activatedRoute: ActivatedRoute,
              private productCatelogService: ProductCatelogService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.addStoreProductForm = this.formBuilder.group({
      storeproductName: ['', Validators.required],
      productMarkedPrice: ['', Validators.required],
      productCostPrice: ['', Validators.required],
      productSellingPrice: ['', Validators.required],
      storeMargin: ['', Validators.required],
      storeDiscount: ['', Validators.required],
      status: ['']
    });
  }

  get f() { return this.addStoreProductForm.controls; }

  ngOnInit() {
    this.storeId = +JSON.parse(localStorage.getItem('merchant')).store_id;
    this.storeProductId = +this.activatedRoute.snapshot.params.productId;
    if (this.storeProductId !== 0) {
      this.productCatelogService.fetchStoreProductById(this.storeProductId).subscribe((data: any) => {
        const productdata = data.products_info;
        this.addStoreProductForm.get('storeproductName').setValue(productdata[0].product_name);
        this.addStoreProductForm.get('productMarkedPrice').setValue(productdata[0].product_marked_price);
        this.addStoreProductForm.get('productCostPrice').setValue(productdata[0].store_cost_price);
        this.addStoreProductForm.get('productSellingPrice').setValue(productdata[0].store_selling_price);
        this.addStoreProductForm.get('storeMargin').setValue(productdata[0].store_margin);
        this.addStoreProductForm.get('storeDiscount').setValue(productdata[0].store_discount);
        this.addStoreProductForm.get('status').setValue(productdata[0].status);
      });
    }
  }


  onChanges() {
    this.addStoreProductForm.get('storeproductName').valueChanges.pipe(tap(data => {
      console.log(data);
    }), distinctUntilChanged(), debounceTime(200),
      switchMap(query => !this.productValueSet ? (this.productCatelogService.searchProducts(query)) : (this.productValueSet = false, of([]))
      ))
      .subscribe(res => { this.results = res; });
  }

  onSubmit() {
    console.log(this.addStoreProductForm.value);
    this.submitted = true;
    if (this.addStoreProductForm.invalid) {
      return;
    }

    if (this.storeProductId === 0) {
      this.productCatelogService.addStoreProducts(this.addStoreProductForm.value, this.selectedProduct.product_id, this.storeId)
        .subscribe((data) => {
          console.log(data);
          if (data.status === 200) {
            this.router.navigate([`catelog`]);
            // this._router.navigate(['merchant/',this.storeId,'/merchantproducts']);
          }
          if (data.status === 400) {
            alert('Category Not Added . Internal Server Error');
          }
        },
          (error) => {
            this.errorMessage = error;
          }
        );
    } else {
      this.productCatelogService.editStoreProduct(this.addStoreProductForm.value, this.storeProductId).subscribe((data: any) => {
        console.log(data);
        if (data.status === 200) {
          this.router.navigate(['/catalog']);
        }
        if (data.status === 400) {
          alert('Category Not Added . Internal Server Error');
        }
      });
    }


  }

  productSelected(product) {
    this.results = [];
    this.productValueSet = true;
    this.selectedProduct = product;
    this.addStoreProductForm.get('storeproductName').setValue(this.selectedProduct.product_name);
  }

}
