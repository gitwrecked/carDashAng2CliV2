import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Purchase} from '../Models/purchase';
import {User} from '../Models/user';
import {UsersService} from '../users-service/users.service';

const template = require('./user-investment.component.html');
const styles   = require('./user-investment.component.scss');

@Component({
  selector: 'app-user-investment',
  templateUrl: template,
  styleUrls: [styles],
  providers: [UsersService]
})
export class UserInvestmentComponent implements OnInit {
  private isLoading;
  public purchases: Purchase[];
  public users: User[];
  public userEmails: Type[];
  public doughnutChartLabels: Array<string> = [];
  public doughnutChartData: number[]        = [];
  public doughnutChartType: string          = 'doughnut';

  constructor(private router: Router, private usersService: UsersService) {
    this.isLoading = false;
  }
  ngOnInit(): void {
    this.getUsers();
  }

  public chartClicked(e: any): void {}

  public chartHovered(e: any): void {}

  populateChart() {
    let arrayLength = this.users.length;
    for (let i = 0; i < arrayLength; i++) {
      this.doughnutChartLabels.push(this.users[i].email);
      let amt = 0;
      for (let t = 0; t < this.users[i].purchases.length; t++) {
        if (!(this.users[i].purchases[t] && this.users[i].purchases[t].amount)) {
          continue;
        }
        amt = amt + this.users[i].purchases[t].amount;
        this.doughnutChartData.push(amt);
      }
    }
  }

  getPurchases(): void {
    this.usersService.getPurchases()
        .then(purchase => {
          this.purchases = purchase;
        })
        .catch(function(e) {
          console.error(e);
        });
  }

  getUsers(): void {
    this.usersService.getUsers()
        .then(userList => {
          this.users = userList;
          this.populateChart();
          this.isLoading = true;

        })
        .catch(function(e) {
          console.error(e);
        });
  }
}
export interface Type { email: string; }

export interface Amount { amt: number; }
