import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { Observable } from 'rxjs';

@Injectable()

export class AuthGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authServ.getIsAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/login']);
    }

    return isAuth;
  }

  constructor(private authServ: AuthServiceService, private router: Router) { }

}
