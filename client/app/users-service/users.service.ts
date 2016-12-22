import 'rxjs/add/operator/toPromise';

import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {headers} from '../common/headers';
import {Purchase} from '../Models/purchase';
import {User} from '../Models/user';

@Injectable()
export class UsersService {
  constructor(private http: Http) {}

  getPurchases(): Promise<Purchase[]> {
    return this.http.get('/api/v1/purchase/')
        .toPromise()
        .then(response => {
          return response.json().purchases as Purchase[];

        })
        .catch(this.handleError);
  };

  getUsers(): Promise<User[]> {
    let options = new RequestOptions({headers: headers});
    return this.http.get('/api/v1/user/', options)
        .toPromise()
        .then(response => {
          return response.json().users as User[];

        })
        .catch(this.handleError);
  };

  addUserPurchase(email: string, purchase: Purchase): Promise<Purchase> {
    let options = new RequestOptions({headers: headers});
    return this.http
        .post(
            '/api/v1/user/', JSON.stringify({email: email, purchase: purchase}),
            options)
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  };

  create(name: string, amount: number, description: string, item: string):
      Promise<Purchase> {
    let options = new RequestOptions({headers: headers});
    return this.http
        .post(
            '/api/v1/purchase/', JSON.stringify({
              user: name,
              amount: amount,
              description: description,
              item: item
            }),
            options)
        .toPromise()
        .then(res => res.json().data)
        .catch(this.handleError);
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
