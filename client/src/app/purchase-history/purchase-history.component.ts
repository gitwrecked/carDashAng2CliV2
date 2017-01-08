import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Purchase} from '../Models/purchase';
import {User} from '../Models/user';
import {UsersService} from '../users-service/users.service';

const template = require('./purchase-history.component.html');
const styles   = require('./purchase-history.component.css');

@Component({
  templateUrl: template,
  styleUrls: [styles],
  providers: [UsersService]

})

export class PurchaseHistoryComponent implements OnInit {
  public arrayOfKeys;
  public users: User[];
  public purchases: Purchase[];

  constructor(private router: Router, private usersService: UsersService) {}
  ngOnInit(): void {
    this.getPurchases();
  }

  getPurchases(): void {
    this.usersService.getUsers()
        .then(users => {
          this.users = users;
        })
        .catch(function(err) {
          console.info("Unable to retrieve user purchases, is CarDash API up and running?");
        });
  }
}
