import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { Purchase } from '../purchase/purchase';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
  
  private catsUrl = 'cats/get';// URL to web api
  private usersUrl = '/api/v1/purchase/';// URL to web api
  private usersPost = 'cats/post';
  private purchaseApi = '/api/v1/purchase/post'

  constructor(private http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  getUsers(): Promise<User[]> {
    console.log(this.usersUrl);
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => {
        console.log(response);
        console.log("Users array in service");
        console.log(response.json().purchases);
        return response.json().purchases as User[];

      })
      .catch(this.handleError);
  };


   getCats(): Promise<User[]> {
    console.log(this.usersUrl);
    return this.http.get(this.catsUrl)
      .toPromise()
      .then(response => {
        // console.log(response);
        console.log("CATS array in service");
        console.log(response.json().cats);
        return response.json().cats as User[];

      })
      .catch(this.handleError);
  };

  create(name: string, amount:number,description:string,item:string ): Promise<Purchase> {
  console.log("inside userService method:addPurchase");
  let headers = new Headers({ 'Content-Type': 'application/json' });
  this.headers.append('cd_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYXJ1bnY0NzAwQGdtYWlsLmNvbSIsImlhdCI6MTQ4MTY4NTY0MywiZXhwIjoxNDgxNzcyMDQzfQ.8Xm1iUSCxJ8uzuUJMPL6o5nAC7KyUQDXCiU9AxBN4YM');
  let options = new RequestOptions({ headers: headers });
  console.log("url: "+this.purchaseApi);
  return this.http
     .post(this.purchaseApi, JSON.stringify({ user: name ,amount:amount ,description:description, item: item}), options)
     .toPromise()
     .then(res => res.json().data)
     .catch(this.handleError);
};




  // delete(id: number): Promise<void> {
  //   let url = `${this.usersUrl}/${id}`;
  //   return this.http.delete(url, { headers: this.headers })
  //     .toPromise()
  //     .then(() => null)
  //     .catch(this.handleError);
  // }
  //   update(user: User): Promise<User> {
  //   const url = `${this.usersUrl}/${user.id}`;
  //   return this.http
  //     .put(url, JSON.stringify(user), { headers: this.headers })
  //     .toPromise()
  //     .then(() => user)
  //     .catch(this.handleError);
  // }
private handleError (error: Response | any) {
  // In a real world app, we might use a remote logging infrastructure
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Promise.reject(errMsg);
}

  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error); // for demo purposes only
  //   return Promise.reject(error.message || error);
  // }


}
