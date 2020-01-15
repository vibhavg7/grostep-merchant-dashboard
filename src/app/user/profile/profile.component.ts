import { Component, OnInit } from '@angular/core';
import { ProductCatelogService } from '../../shared/product-catelog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadComponent } from '../../shared/image-upload/image-upload.component';
import { ActivatedRoute } from '@angular/router';
import { ErrorTracker } from '../../shared/errorTracker';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  merchantData: any;
  storeId: number;
  errorMessage: any = '';
  constructor(
          private productCatelogService: ProductCatelogService,
          private activatedRoute: ActivatedRoute,
          private modalService: NgbModal) { }
  ngOnInit() {
    this.storeId = +JSON.parse(localStorage.getItem('merchant')).store_id;
    const resolvedData = this.activatedRoute.snapshot.data.resolvedProfile;
    console.log(resolvedData);
    if (resolvedData instanceof ErrorTracker) {
      this.errorMessage = resolvedData.errorMessage;
    } else {
      this.merchantData = resolvedData.store[0];
    }
  }

  uploadImage(storeid: any) {
    const modalRef: any = this.modalService.open(ImageUploadComponent);
    modalRef.componentInstance.title = 'Image Upload';
    modalRef.componentInstance.id = storeid;
    modalRef.componentInstance.image_type = 'merchants';
    modalRef.componentInstance.productImage.subscribe((data) => {
      this.merchantData.image_url = data.image_url;
    });
  }

}
