import { Component } from '@angular/core';
import { User }    from '../Models/user';
import { Purchase } from '../Models/purchase';
import { UsersService } from '../users-service/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['user-form.component.css'],
  providers: [UsersService]
})

export class UserFormComponent {
    constructor(private router: Router, private usersService: UsersService) { 
      this.isLoading = false;
    }
  ngOnInit(): void {
    this.getUsers();
  }
  private isLoading;
  purchases: Purchase[];
  users: User[];
  model = new Purchase("",null,"","");
  public readonly items:Array<string> =["Car Purchase","Parts","Tools","Other"];


create(user: string , amount:number , description:string , item:string): void {
console.log('inside userForm - method:create');

    user = user.trim();
    if (!user) { return; }
    this.usersService.create(user,amount,description,item)
      .then(user => {
        this.purchases.push(user);
      });
      this.clearForm();
  };

addUserPurchase(user: string , amount:number , description:string , item:string): void {
console.log('inside userForm - method:addUserPurchase');
console.log((user+' : '+amount+' : '+description+' : '+item));
    var purchase = new Purchase(user,amount,description,item);
    user = user.trim();
    if (!user) { return; }
    console.log("Sending PURCHASE from component to service: ");
    console.log(purchase);
    this.usersService.addUserPurchase(user,purchase)
      .then(user => {
        console.log("inside then for add purchase component?")
      });
      this.clearForm();
  };

clearForm(): void {
this.model = new Purchase("",0,"","");
};
    getUsers(): void {
    this.usersService.getUsers().then(
      user => {
        this.users = user;
        console.log("users in component");
        console.log(this.users);
        this.isLoading = true;

      }
      // data => doWork('text', data)
      ).catch(function(e) {
        console.log('Inside getUsers Exception'); 
      console.log(e); 
  });
  }
}

// add .then specific error catching when needed
// , function (error) {
//       console.log(error); // will be called if getRights fails
//       return Promise.reject(error);
// })



