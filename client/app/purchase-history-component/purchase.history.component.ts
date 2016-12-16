import { Component } from '@angular/core';
import { User } from '../user/user';
//service reqs
import { UsersService } from '../users-service/users.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Purchase } from '../purchase/purchase';

@Component({
  // selector: 'my-users',
  templateUrl: 'purchase.history.html',
  styleUrls: ['purchase.history.css'],
  //service reqs
  providers: [UsersService]

})

export class PurchaseHistoryComponent {
  //service reqs
  constructor(private router: Router, private usersService: UsersService) { }
  ngOnInit(): void {
    this.getPurchases();
  }
   
  users: User[];
  cats: User[];
  purchases: Purchase[];

  getCats(): void {
    this.usersService.getCats().then(
      users => {
        this.cats = users;
        console.log("Cats array in component");
        console.log(users);
      }
      );
  }

  getPurchases(): void {
    this.usersService.getPurchases().then(
      users => {
        // console.log("this.users: "+this);
        this.purchases = users;
        console.log("Users array in component");
        console.log(users);
      }
      );
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


