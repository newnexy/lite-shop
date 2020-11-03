import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {map, tap} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user) {
    let headers = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/json')

    return this.http.post(`http://localhost:3000/account/reg`, user, {headers: headers}).pipe(map((response: any) => response))

  }

  authUser(user) {
    let headers = new HttpHeaders()
    headers = headers.append('Content-Type', 'application/json')

    return this.http.post(`http://localhost:3000/account/auth`, user, {headers: headers}).pipe(map((response: any) => response))
      .pipe(
        tap(this.setToken)
      )
  }

  private setToken(response) {

    if(response) {
      console.log('localStorage')
      const expData = new Date( new Date().getTime() + + response.user.expiresIn * 1000 )
      localStorage.setItem('fb-token-exp', expData.toString())
      localStorage.setItem('fb-token', response.token)
    } else {
      localStorage.clear()
    }

  }

  get token() {
    const expData = new Date(localStorage.getItem('fb-token-exp'))

    if (new Date > expData) {
      this.logout()
      return null
    }

    return localStorage.getItem('fb-token')

  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated() {
    return !!this.token
  }

}
