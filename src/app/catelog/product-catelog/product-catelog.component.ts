import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap, distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { ProductCatelogService } from '../../shared/product-catelog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-catelog',
  templateUrl: './product-catelog.component.html',
  styleUrls: ['./product-catelog.component.css']
})
export class ProductCatelogComponent implements OnInit {

  storeId: any;
  filterBy: any = '';
  searchCriteriaForm: FormGroup;
  currentPage = 1;
  pageSize = 20;
  storeproductsinfo: any = [];
  storeproductscount: any;
  errorMessage: any = '';
  constructor(
    private productCatelogService: ProductCatelogService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) {
    this.searchCriteriaForm = this.formBuilder.group({
      searchCriteria: ['']
    });
  }
  ngOnInit() {
    this.storeId = +JSON.parse(localStorage.getItem('merchant')).store_id;
    const resolvedData = this.activatedRoute.snapshot.data.resolvedCatelogData;
    this.storeproductsinfo = resolvedData.store_products_info;
    this.storeproductscount = resolvedData.store_products_count[0].store_products_count;
    // // this.onChanges();
  }

  onChanges() {
    this.searchCriteriaForm.get('searchCriteria').valueChanges.pipe(tap(data => {
    }), distinctUntilChanged(), debounceTime(1000),
      switchMap(query => (this.filterBy = query,
                this.productCatelogService.fetchStoreProducts(this.storeId, this.currentPage, this.pageSize, this.filterBy)))
    )
      .subscribe((res: any) => { this.storeproductscount = res.store_products_count[0].store_products_count;
                                 this.storeproductsinfo = res.store_products_info; });
  }

  currentPageFn(page) {
    this.productCatelogService.fetchStoreProducts(this.storeId, page, this.pageSize, this.filterBy)
      .subscribe((data: any) => {
        this.storeproductsinfo = data.store_products_info;
      });
  }

}
