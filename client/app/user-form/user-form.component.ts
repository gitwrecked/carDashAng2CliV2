import { Component }      from '@angular/core';
import { User }           from '../Models/user';
import { Purchase }       from '../Models/purchase';
import { UsersService }   from '../users-service/users.service';
import { Router }         from '@angular/router';

const template = require('./user-form.component.html');
const styles   = require('./user-form.component.scss');

@Component({
  selector: 'user-form',
  templateUrl: template,
  styleUrls: [styles],
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
    user = user.trim();
    if (!user) { return; }
    this.usersService.create(user,amount,description,item)
      .then(user => {
        this.purchases.push(user);
      });
      this.clearForm();
  };

addUserPurchase(user: string , amount:number , description:string , item:string): void {
    var purchase = new Purchase(user,amount,description,item);
    user = user.trim();
    if (!user) { return; }   
    this.usersService.addUserPurchase(user,purchase)
      .then(user => {        
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
        this.isLoading = true;
      }      
      ).catch(function(e) {        
      console.error(e); 
  });
  }
}



