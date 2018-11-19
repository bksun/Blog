import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './signup/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token: string;

  constructor( public http: HttpClient) { }

  getToken() {
    return this.token;
  }

  createUser( email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(result => {
      console.log(result);
    });
  }

  loginUser( email: string, password: string) {
    console.log('log in data called');
    const authData: AuthData = { email: email, password: password };
    this.http.post<{token: string}> ('http://localhost:3000/api/user/login', authData)
    .subscribe(result => {
      const tempToken = result.token;
      this.token = tempToken;
    });
  }





}
