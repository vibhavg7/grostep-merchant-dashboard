import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { ImageUploadComponent } from './image-upload/image-upload.component';



@NgModule({
  declarations: [
    PaginationComponent,
    // ImageUploadComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    PaginationComponent,
    // ImageUploadComponent
  ]
})
export class SharedModule { }
