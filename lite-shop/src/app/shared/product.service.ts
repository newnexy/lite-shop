import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  create(product) {
    return this.http.post(`http://localhost:3000/account/products`, product)
      .pipe(
        map(res => {
          return {
            ...product
          }
        })
      )
  }

  getAll() {
    return this.http.get(`http://localhost:3000/account/products`)
  }

  getById(id) {
    return this.http.get(`http://localhost:3000/account/product/${id}`)
  }

  remove(id) {
    return this.http.delete(`http://localhost:3000/account/delete_product/${id}`)
  }

  update(product) {
    return this.http.patch(`http://localhost:3000/account/update_product/${product.id}`, product)
  }

}
