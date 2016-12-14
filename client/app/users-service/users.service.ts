import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {
  
  private usersUrl = 'cats/get';// URL to web api

  constructor(private http: Http) { }

  private headers = new Headers({ 'Content-Type': 'application/json' });

  getUsers(): Promise<User[]> {
    console.log(this.usersUrl);
    return this.http.get(this.usersUrl)
      .toPromise()
      .then(response => response.json().data as User[])
      .catch(this.handleError);
  }

  // getUseresSlowly(): Promise<User[]> {
  //   return new Promise<User[]>(resolve =>
  //     setTimeout(resolve, 2000)) // delay 2 seconds
  //     .then(() => this.getUseres());
  // }
  // getUser(id: number): Promise<User> {
  //   return this.getUseres()
  //     .then(users => users.find(user => user.id === id));
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  // create(name: string): Promise<User> {
  //   return this.http
  //     .post(this.usersUrl, JSON.stringify({ name: name }), { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json().data)
  //     .catch(this.handleError);
  // }
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


}
