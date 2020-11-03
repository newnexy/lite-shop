import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from "./shared/main-layout/main-layout.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {AccountComponent} from "./account/account.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./shared/auth.guard";
import {CartComponent} from "./cart/cart.component";


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: MainPageComponent },
      { path: 'product/:id', component: ProductPageComponent },
      { path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
      { path: 'login', component: LoginComponent },
      { path: 'cart', component: CartComponent }

    ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
