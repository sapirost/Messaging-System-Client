import { isEmpty } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  private BASE_SERVICE_URL = 'auth';

  private endPoints: any = {
    LOGIN: 'login',
    REGISTER: 'register',
  };


  constructor(private http: HttpClient) {
    super();
  }

  login(email: string, password: string): Observable<any> {
    const endPoint = this.buildFullEndPoint(`${this.BASE_SERVICE_URL}/${this.endPoints.LOGIN}`);

    return this.http.post(endPoint, { email, password });
  }

  register(email: string, password: string): Observable<any> {
    const endPoint = this.buildFullEndPoint(`${this.BASE_SERVICE_URL}/${this.endPoints.REGISTER}`);

    return this.http.post(endPoint, { email, password });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    window.location.href = '/';
  }

  getToken(): string {
    const token = localStorage.getItem('token');

    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('token');

      return null;
    }

    return token;
  }

  getUserInfo(): any {
    const token = this.getToken();

    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  isAuthenticated(): boolean {
    const userInfo = this.getUserInfo();

    return !isEmpty(userInfo);
  }
}
