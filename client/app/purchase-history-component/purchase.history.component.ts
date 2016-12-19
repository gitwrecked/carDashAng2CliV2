import { Component } from '@angular/core';
import { User } from '../Models/user';
//service reqs
import { UsersService } from '../users-service/users.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from '../Models/purchase';

@Component({
  templateUrl: 'purchase.history.html',
  styleUrls: ['purchase.history.css'],
  providers: [UsersService]

})

export class PurchaseHistoryComponent {
  constructor(private router: Router, private usersService: UsersService) { }
  ngOnInit(): void {
    this.getPurchases();
  }
  public arrayOfKeys;

  users: User[];
  purchases: Purchase[];

  getPurchases(): void {
    this.usersService.getUsers().then(
      users => {
        // console.log("this.users: "+this);
        this.users = users;

        console.log("Users array in component");
        console.log(users);
      }
      ).catch(function(e) {
        console.log('Inside getPurchases / getUsers Exception'); 
      console.log(e); 
  });
  }

// onSelect(user: User): void {
//   this.selectedUser = user;
// }
// gotoDetail(): void {
//   this.router.navigate(['/detail', this.selectedUser.id]);
// }
//   add(name: string): void {
//     name = name.trim();
//     if (!name) { return; }
//     this.userService.create(name)
//       .then(user => {
//         this.useres.push(user);
//         this.selectedUser = null;
//       });
//   }
// delete(user: User): void {
//   this.userService
//       .delete(user.id)
//       .then(() => {
//         this.useres = this.useres.filter(h => h !== user);
//         if (this.selectedUser === user) { this.selectedUser = null; }
//       });
// }

}


