import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { UtilService } from './util.service';

import { environment } from 'src/environments/environment';
import { ApiDataResponse } from '../interfaces/api-data-response';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthenticationService,
    private util: UtilService
  ) {}

  /* Get Routes */
  getTest(queryParamsObject?, token?: string) {
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.get<ApiDataResponse>(`${environment.apiUrl}${queryParam ? `?${queryParam}`: ''}`);
  }

  getWasteCollectionDates(queryParamsObject, token?: string) {
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    // const authToken = token ? token : this.auth.accessToken.value;
    // return this.http.get<ApiDataResponse>(`${environment.apiUrl}/waste-collection-dates?auth=${authToken}${queryParam ? `&${queryParam}`: ''}`);
    return this.http.get<ApiDataResponse>(`${environment.apiUrl}/waste-collection-dates${queryParam ? `?${queryParam}`: ''}`);
  }

  getTransactions(queryParamsObject, token?: string) {
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.get<ApiDataResponse>(`${environment.apiUrl}/transactions${queryParam ? `?${queryParam}`: ''}`);
  }

  getWallet(queryParamsObject?: any, token?: string) {
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.get<ApiDataResponse>(`${environment.apiUrl}/wallets${queryParam ? `?${queryParam}`: ''}`); // use user email
  }

  getNotifications(queryParamsObject, token?: string) {
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.get<ApiDataResponse>(`${environment.apiUrl}/notifications${queryParam ? `?${queryParam}`: ''}`);
  }

  getOrders(queryParamsObject, token?: string) {
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.get<ApiDataResponse>(`${environment.apiUrl}/orders${queryParam ? `?${queryParam}`: ''}`);
  }

  getFeedbacks(queryParamsObject, token?: string) {
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.get<ApiDataResponse>(`${environment.apiUrl}/feedbacks${queryParam ? `?${queryParam}`: ''}`);
  }

  gerUsers(queryParamsObject, token?: string) {
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.get<ApiDataResponse>(`${environment.apiUrl}/users${queryParam ? `?${queryParam}`: ''}`);
  }

  gerUser(queryParamsObject, token?: string) {
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.get<ApiDataResponse>(`${environment.apiUrl}/user${queryParam ? `?${queryParam}`: ''}`);
  }

  getAny(queryParamsObject, token?: string, urlPostFix?: string) {
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.get<ApiDataResponse>(`${environment.apiUrl}/${urlPostFix ?? ''}${queryParam ? `?${queryParam}`: ''}`);
  }

  /** Post Routes */
  postAny(payload, token?: string, queryParamsObject?: any, urlPostFix?: string) {
    const authToken = token ? token : this.auth.accessToken.value;
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.post<ApiDataResponse>(
      `${environment.apiUrl}/${urlPostFix ?? ''}${queryParam ? `?${queryParam}`: ''}`,
      {
        payload
      }
    );
  }
  
  saveTransaction(payload, queryParamsObject?:any, token?: string) {
    const authToken = token ? token : this.auth.accessToken.value;
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.post<ApiDataResponse>(
      `${environment.apiUrl}transactions${queryParam ? `?${queryParam}`: ''}`,
        payload
    );
  }
  
  updateWallet(payload, queryParamsObject?: any, token?: string) {
    const authToken = token ? token : this.auth.accessToken.value;
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.patch<ApiDataResponse>(
      `${environment.apiUrl}wallets/fund`,
        payload
    );
  }

  createWallet(payload, token?: string, queryParamsObject?: any) {
    const authToken = token ? token : this.auth.accessToken.value;
    const queryParam = this.util.generateQueryParams(queryParamsObject);
    return this.http.post<ApiDataResponse>(
      `${environment.apiUrl}/create-wallet${queryParam ? `?${queryParam}`: ''}`,
        payload
    );
  }
}
