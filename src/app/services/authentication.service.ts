import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { NavController } from '@ionic/angular';

import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Plugins } from '@capacitor/core';

import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { ApiDataResponse } from '../interfaces/api-data-response';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  loginState = new BehaviorSubject<boolean>(null);
  user = new BehaviorSubject<User>(null);
  accessToken = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private navCtrl: NavController
  ) { }

  async checkLoginState() {
    const user = await this.checkUser();
    await this.checkAccessToken();

    if (user) {
      this.user.next(user);
      // this.router.navigateByUrl('/main');
      return;
    }
  }

  async checkUser() {
    const result = await Storage.get({ key: 'kclUser' });
    const user = JSON.parse(result.value);
    return user;
  }

  async checkAccessToken() {
    const result = await Storage.get({ key: 'kclToken' });
    const accessToken = JSON.parse(result.value);
    const user = await this.checkUser();
    if (accessToken) {
      this.loginState.next(true);
      this.accessToken.next(accessToken);
      this.router.navigateByUrl(user.role === 'admin' ? '/staff' : '/main');
    }
  }

  login(email: string, password: string) {
    return this.http.post<ApiDataResponse>(
      `${environment.apiUrl}auth/login`,
      { email, password }
    )
    .pipe(
      tap(
        res => {
          if (res.status === 'success') {
            this.initializeAuth(res.data);
          }
        }
      ),
    );
  }

  register(payload: User) {
    return this.http.post<ApiDataResponse>(
      `${environment.apiUrl}auth/signup`,
      payload
    );
  }

  sendPasswordResetCode(email: string) {
    return this.http.post<ApiDataResponse>(
      `${environment.apiUrl}auth/forgot-password`,
      { email }
    );
  }

  verifyPasswordResetCode(email: string, code: string) {
    return this.http.post<ApiDataResponse>(
      `${environment.apiUrl}auth/reset-password`,
      { email, code }
    );
  }

  resetPassword(id: string, password: string) {
    return this.http.post<ApiDataResponse>(
      `${environment.apiUrl}auth/update-password`,
      { id, password }
    );
  }

  async storeUser(userInfo) {
    await Storage.set({
      key: 'kclUser',
      value: JSON.stringify(userInfo)
    });
  }

  async storeAccessToken(token) {
    await Storage.set({
      key: 'kclToken',
      value: JSON.stringify(token)
    });
  }

  logout() {
    this.user.next(null);
    this.accessToken.next(null);
    this.loginState.next(false);
    this.clearStorage();
    this.navCtrl.navigateRoot('/login');
  }

  private initializeAuth(response) {
    this.loginState.next(true);
    this.user.next(response.user);
    this.accessToken.next(response.token);
    this.storeUser(response.user);
    this.storeAccessToken(response.token);
  }

  private async clearStorage() {
    await Storage.clear();
  }
}
