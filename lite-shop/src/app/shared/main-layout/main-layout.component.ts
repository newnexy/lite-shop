import { Component, OnInit } from '@angular/core';
import {AuthService} from 'src/app/shared/auth.service'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.sass']
})
export class MainLayoutComponent implements OnInit {

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  logout($event) {
    event.preventDefault()
    this.auth.logout()
  }

}
