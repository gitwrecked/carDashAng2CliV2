import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {SessionService} from '../common/session.service';
import {Purchase} from '../Models/purchase';
import {UsersService} from '../users-service/users.service';

const template = require('./user-form.component.html');
const styles   = require('./user-form.component.css');

@Component({
  selector: 'app-user-form',
  templateUrl: template,
  styleUrls: [styles],
  providers: [UsersService, SessionService]
})
export class UserFormComponent implements OnInit {
  private isLoading;
  private user;
  private purchase: any = {};

  public readonly items: Array<string> =
      ['Car Purchase', 'Parts', 'Tools', 'Other'];

  constructor(
      private router: Router, private usersService: UsersService,
      private sessionService: SessionService) {
    this.isLoading = false;
  }

  ngOnInit(): void {
    this.user = this.sessionService.getSession().email;
  }

  addUserPurchase(): void {
    this.isLoading = true;
    let purchase   = new Purchase(
        this.user, this.purchase.amount, this.purchase.description,
        this.purchase.item);
    this.usersService.addUserPurchase(this.user, purchase).then(updatedUser => {
      this.isLoading = false;
      this.router.navigate(['purchaseHistory']);
    });
    this.clearForm();
  };

  clearForm(): void {
    this.purchase = {};
  };
};
