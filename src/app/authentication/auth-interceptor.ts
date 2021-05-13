import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { environment } from 'src/environments/environment';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {

  const excludedUrls = [
    `${environment.apiUrl}auth/signup`,
    `${environment.apiUrl}auth/login`,
  ];

  const excludedProtectedUrls = [];

  if (excludedUrls.indexOf(req.url) > -1) {
    const authReq = req.clone({
      setHeaders: { Accept: 'application/json', 'Content-Type': 'application/json' }
    });
    return next.handle(authReq);
  }

  const token = this.authService.accessToken.value;
  let protectedReq;

  if (excludedProtectedUrls.indexOf(req.url) > -1) {
    protectedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}`, Accept: 'application/json' }
    });
  } else {
    protectedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}`, Accept: 'application/json', 'Content-Type': 'application/json' }
    });
  }

  return next.handle(protectedReq).pipe(
    filter(event => event instanceof HttpResponse),
    tap(
      event => {},
      error => {
        if (error.error === 'Unauthorized') {
          this.authService.logout();
        }
      }
    ));
  }

}