import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export default class AuthInterceptor implements HttpInterceptor{
  constructor(private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user)=>{
        console.log('condition token', !user || (user && user.token === null));
        if(!user || (user && user.token === null)){
          return next.handle(req);
        }
        const requestClone = req.clone({params: new HttpParams().set('auth', <string>user.token)});
        return next.handle(requestClone);
      })
    );
  //  return next.handle(req)
  }

}
