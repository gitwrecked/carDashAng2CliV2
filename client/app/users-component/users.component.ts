import { Component } from '@angular/core';
import { User } from '../user/user';
//service reqs
import { UsersService } from '../users-service/users.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

const styles   = require('./users.component.css');
const template = require('./users.component.html');

@Component({
  selector: 'my-users',
  templateUrl: template,
  styles: [styles],
  providers: [UsersService]

})

export class UsersComponent {
  //service reqs
  constructor(private router: Router, private usersService: UsersService) { }
  ngOnInit(): void {
    // this.getUsers();
    // this.getCats();
  }
   
  users: User[];
  selectedUser: User;

  // getUsers(): void {
  //   this.usersService.getUsers().then(
  //     users => {
  //       // console.log("this.users: "+this);
  //       this.users = users;
  //       console.log("Users array in component");
  //       console.log(users);
  //     }
  //     );
  // }

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


