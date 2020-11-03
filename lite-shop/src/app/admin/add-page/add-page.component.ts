import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {ProductService} from "../../shared/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.sass']
})

export class AddPageComponent implements OnInit {

  form: FormGroup

  submitted = false

  // formStyle = {
  //   height: '300px'
  // }

  config = {
    toolbar: [
      ['link', 'image', 'video']
    ]
  }

  constructor(
    public auth: AuthService,
    private productServ: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      type: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      photo: new FormControl(null, Validators.required),
      info: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required)
    })
  }

  submit(){

    if (  this.form.invalid ) {
      return;
    }

    this.submitted = true

    const product = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
    }



    this.productServ.create(product).subscribe( res => {

        console.log(res)
        if(res) {
          this.form.reset()
          this.submitted = false
          this.router.navigate(['/'])
        }
      }, () => {
        this.submitted = false
      }

    )

  }

}

