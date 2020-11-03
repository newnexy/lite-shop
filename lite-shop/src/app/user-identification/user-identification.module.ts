import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { RegComponent } from './reg/reg.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AuthComponent, RegComponent],
  imports: [
    CommonModule,
    FormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthComponent,
    RegComponent
  ]
})
export class UserIdentificationModule { }
