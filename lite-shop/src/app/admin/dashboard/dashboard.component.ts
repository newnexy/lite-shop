import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../shared/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  products = []
  pSub = Subscription

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(): void {
    this.pSub = this.productServ.getAll().subscribe(products => {
      console.log(products.result)
      this.products = products.result

    })
  }

  ngOnDestroy() {
    if(this.pSub) {
      this.pSub.unsubscribe()
    }
  }



}
