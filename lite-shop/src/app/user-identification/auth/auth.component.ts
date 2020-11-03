import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { AuthService } from 'src/app/shared/auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  form: FormGroup

  submitted = false

  constructor(
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  submit(){

    if (  this.form.invalid ) {
      return;
    }

    this.submitted = true

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.auth.authUser(user).subscribe( res => {
      
      console.log(res)
      if(res.success) {
        this.form.reset()
        this.submitted = false
      }
    }, () => {
        this.submitted = false
      }

    )

  }

}
