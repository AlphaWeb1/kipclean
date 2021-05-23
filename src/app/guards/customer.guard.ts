import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanLoad, UrlSegment, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanLoad {
  constructor (
    private authService: AuthenticationService,
    private navCtrl: NavController
  ){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user = this.authService.user.value;
      if (user.role !== 'customer') {
        return this.navCtrl.navigateRoot('/login');
      } else {
        return true;
      }
  }

}
