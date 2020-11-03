import {Component, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.sass']
})
export class ProductPageComponent implements OnInit {

  product$
  productId$
  res$

  id

  constructor(
    private productServ: ProductService,
    private route: ActivatedRoute
  ) { }



  ngOnInit(): void {

    this.productId$ = this.route.params

    this.res$ = this.productServ.getById(this.productId$.getValue().id)

    this.res$.subscribe(val => {

      this.product$ = val.result

      console.log(this.product$)


    })




  }

}
