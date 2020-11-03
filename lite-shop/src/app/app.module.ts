import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';
import { CartComponent } from './cart/cart.component';
import { CatalogComponent } from './catalog/catalog.component';
import { BannerComponent } from './banner/banner.component';
import { UserIdentificationModule } from "./user-identification/user-identification.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './login/login.component';
import { QuillModule } from 'ngx-quill';
import {AuthInterceptor} from "./shared/auth.interseptor";
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ProductPageComponent,
    MainLayoutComponent,
    CartComponent,
    CatalogComponent,
    BannerComponent,
    AccountComponent,
    LoginComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserIdentificationModule,
    HttpClientModule,
    QuillModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
