import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler} from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor( private Auth: AuthServiceService ) { }

  intercept( req: HttpRequest<any>, next: HttpHandler ) {
    const authToken = this.Auth.getToken();
    console.log(authToken);
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });

    return next.handle(authRequest);
  }
}
