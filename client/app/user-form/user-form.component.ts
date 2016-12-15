import { Component } from '@angular/core';
import { User }    from '../user/user';
import { Purchase } from '../purchase/purchase';
import { UsersService } from '../users-service/users.service';
import { Router } from '@angular/router';

@Component({
  // moduleId: module.id,
  selector: 'user-form',
  templateUrl: 'user-form2.component.html',
  providers: [UsersService]
})

export class UserFormComponent {
    constructor(private router: Router, private usersService: UsersService) { }
  ngOnInit(): void {
  }

  purchases: Purchase[];
  users: User[];
  model = new Purchase("",0,"","");

create(name: string, amount:number,description:string,item:string): void {
console.log('inside userForm - method:create');

    name = name.trim();
    if (!name) { return; }
    this.usersService.create(name,amount,description,item)
      .then(user => {
        this.purchases.push(user);
        // this.selectedHero = null;
      });
      this.clearForm();
  };
clearForm(): void {
this.model = new Purchase("",0,"","");
};
}















