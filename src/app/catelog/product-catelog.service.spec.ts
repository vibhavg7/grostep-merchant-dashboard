import { TestBed } from '@angular/core/testing';

import { ProductCatelogService } from './product-catelog.service';

describe('ProductCatelogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductCatelogService = TestBed.get(ProductCatelogService);
    expect(service).toBeTruthy();
  });
});
