import { Component, OnInit } from '@angular/core';
import {ProductService} from "../shared/product.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.sass']
})
export class MainPageComponent implements OnInit {

  res$
  products$
  photo$

  constructor(
    private productServ: ProductService
  ) { }

  ngOnInit(): void {

    this.res$ = this.productServ.getAll()

    this.res$.subscribe(val => {

      this.products$ = val.result

      this.photo$ = this.products$[0].photo


      // console.log(this.photo$)

    })

  }


}
