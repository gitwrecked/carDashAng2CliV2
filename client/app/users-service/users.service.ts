import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { Purchase } from '../purchase/purchase';
import { Http, RequestOptions } from '@angular/http';
import { headers } from '../common/headers';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
  
  private catsUrl = 'cats/get';// URL to web api
  private purchasesUrl = '/api/v1/purchase/';// URL to web api
  private usersUrl = '/api/v1/user/get';
  private usersPurchaseUrl = '/api/v1/user/post';
  private usersPost = 'cats/post';
  private purchaseApi = '/api/v1/purchase/post'
  constructor(private http: Http) { }

  // private headers = new Headers({ 'Content-Type': 'application/json' });

    getPurchases(): Promise<Purchase[]> {
    console.log(this.purchasesUrl);
    return this.http.get(this.purchasesUrl)
      .toPromise()
      .then(response => {
        // console.log(response);
        // console.log("Purchases array in service");
        // console.log(response.json().purchases);
        return response.json().purchases as Purchase[];

      })
      .catch(this.handleError);
  };

  getUsers(): Promise<User[]> {
    console.log(this.usersUrl);
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => {
        // console.log(response);
        // console.log("Users array in service");
        // console.log(response.json().users);
        return response.json().users as User[];

      })
      .catch(this.handleError);
  };


   getCats(): Promise<User[]> {
    console.log(this.usersUrl);
    return this.http.get(this.catsUrl)
      .toPromise()
      .then(response => {
        // console.log(response);
        // console.log("CATS array in service");
        // console.log(response.json().cats);
        return response.json().cats as User[];

      })
      .catch(this.handleError);
  };
  addUserPurchase(email: string, purchase:Purchase ): Promise<Purchase> {
  console.log("----inside userService method:addUserPurchase");
  console.log(email);
  console.log(purchase);
  let options = new RequestOptions({ headers: headers });
  // console.log("url: "+this.purchaseApi);
  return this.http
     .post(this.usersPurchaseUrl, JSON.stringify({ email: email ,purchase:purchase}), options)
     .toPromise()
     .then(res => res.json().data)
     .catch(this.handleError);
};
  create(name: string, amount:number,description:string,item:string ): Promise<Purchase> {
    console.log("inside userService method:addPurchase");
    let options = new RequestOptions({ headers: headers });
    console.log("url: "+this.purchaseApi);
    return this.http
       .post(this.purchaseApi, JSON.stringify({ user: name ,amount:amount ,description:description, item: item}), options)
       .toPromise()
       .then(res => res.json().data)
       .catch(this.handleError);
  };

  isLoggedIn():Boolean {
    return localStorage.getItem('cd_token')? true : false;
  }

  login(username: string, password: string): void {
    console.info('extract login http call from login component to this method');    
  };

  logout(): void {
    localStorage.removeItem('cd_token');
    // reloading window until service is changed to observable
    window.location.reload();
  };

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}