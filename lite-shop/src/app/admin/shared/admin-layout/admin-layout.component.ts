import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.sass']
})
export class AdminLayoutComponent implements OnInit {

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
