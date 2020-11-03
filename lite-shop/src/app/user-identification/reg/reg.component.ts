import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service'

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.sass']
})
export class RegComponent implements OnInit {

  form: FormGroup

  submitted = false

  constructor(
    public auth: AuthService
  ) {}

  ngOnInit() {

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  submit() {
    if (  this.form.invalid ) {
      return;
    }

    this.submitted = true

    const user = {
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password,
    }

    console.log(user.email, user.name, user.password)

    this.auth.registerUser(user).subscribe( res => {
      console.log(res)
      this.form.reset()
    })

  }


}

