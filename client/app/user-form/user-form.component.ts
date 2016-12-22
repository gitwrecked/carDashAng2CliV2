import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Purchase} from '../Models/purchase';
import {User} from '../Models/user';
import {UsersService} from '../users-service/users.service';

const template = require('./user-form.component.html');
const styles   = require('./user-form.component.scss');

@Component({
  selector: 'app-user-form',
  templateUrl: template,
  styleUrls: [styles],
  providers: [UsersService]
})
export class UserFormComponent implements OnInit {
  private isLoading;
  private purchases: Purchase[];
  private users: User[];
  private model = new Purchase('', null, '', '');
  public readonly items: Array<string> =
      ['Car Purchase', 'Parts', 'Tools', 'Other'];

  constructor(private router: Router, private usersService: UsersService) {
    this.isLoading = false;
  }
  ngOnInit(): void {
    this.getUsers();
  }

  create(user: string, amount: number, description: string, item: string):
      void {
    user = user.trim();
    if (!user) {
      return;
    }
    this.usersService.create(user, amount, description, item)
        .then(updatedUser => {
          this.purchases.push(updatedUser);
        });
    this.clearForm();
  };

  addUserPurchase(
      user: string, amount: number, description: string, item: string): void {
    this.isLoading = true;
    let purchase   = new Purchase(user, amount, description, item);
    user           = user.trim();
    if (!user) {
      return;
    }
    this.usersService.addUserPurchase(user, purchase).then(updatedUser => {
      this.isLoading = false;
      this.router.navigate(['purchaseHistory']);
    });
    this.clearForm();
  };

  clearForm(): void {
    this.model = new Purchase('', 0, '', '');
  };
  getUsers(): void {
    this.usersService.getUsers()
        .then(user => {
          this.users     = user;
          this.isLoading = true;
        })
        .catch(function(e) {
          console.error(e);
        });
  }
}
