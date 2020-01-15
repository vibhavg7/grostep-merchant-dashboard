import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { LoginComponent } from './home/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageUploadComponent } from './shared/image-upload/image-upload.component';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    ImageUploadComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents:[
    ImageUploadComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
