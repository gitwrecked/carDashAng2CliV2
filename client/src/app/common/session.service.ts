import {Injectable, OnInit} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {AppConfig} from './app.config';
import {headers} from './headers';
import {User} from '../Models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class SessionService implements OnInit {
  public sessionUser;

  constructor(private http: Http) {
    this.sessionUser = JSON.parse(localStorage.getItem('sessionUser') || '{}');
  }

  ngOnInit(): void {
    this.sessionUser = JSON.parse(localStorage.getItem('sessionUser') || '{}');
  }

  isLoggedIn(): Boolean {
    return !!JSON.parse(localStorage.getItem('sessionUser') || '{}').cd_token;
  }

  getSession(): any {
    return JSON.parse(localStorage.getItem('sessionUser') || '{}');
  }

  login(data: string): Promise<any> {
    return this.http.post(`${AppConfig.server}/api/v1/auth/login`, data, {headers: headers})
    .toPromise()
        .then(res => {
          let response = res.json();
          if (response.success) {
            this.sessionUser.email    = response.email;
            this.sessionUser.cd_token = response.cd_token;
            this.sessionUser.admin    = response.admin;
            localStorage.setItem(
                'sessionUser', JSON.stringify(this.sessionUser));
          }
          return response;
        })
        .catch(this.handleError);
  };

getUsers(): Promise<User[]> {
    let options = new RequestOptions({headers: headers});
    return this.http.get(`${AppConfig.server}/api/v1/user/`, options)
        .toPromise()
        .then(res => {
          return res.json().users as User[];

        })
        .catch(this.handleError);
  };

  logout(): void {
    localStorage.removeItem('sessionUser');
    this.sessionUser = null;
  };

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
