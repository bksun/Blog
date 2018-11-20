import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './signup/auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token: string;
  private AuthStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  constructor( public http: HttpClient, private router: Router) { }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.AuthStatusListener.next(false);
    this.router.navigate(['/login']);
  }

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.AuthStatusListener.asObservable();
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

      if (this.token) {
        this.isAuthenticated = true;
        this.AuthStatusListener.next(true);
        this.router.navigate(['/']);
      }
    });
  }
}
