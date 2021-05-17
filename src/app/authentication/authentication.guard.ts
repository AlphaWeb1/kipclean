import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';

import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements /*CanActivate*/ CanLoad {
  constructor(
    private authService: AuthenticationService,
    private navCtrl: NavController) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.loginState.pipe(
        take(1),
        tap(isAuth => {
          if (!isAuth) {
            this.navCtrl.navigateRoot('/login');
          } else {
            return of(isAuth);
          }
        })
      );
  }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
}
