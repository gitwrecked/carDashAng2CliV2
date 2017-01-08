import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Purchase} from '../Models/purchase';
import {User} from '../Models/user';
import {UsersService} from '../users-service/users.service';

const template = require('./user-investment.component.html');
const styles   = require('./user-investment.component.css');

@Component({
  selector: 'app-user-investment',
  templateUrl: template,
  styleUrls: [styles],
  providers: [UsersService]
})
export class UserInvestmentComponent implements OnInit {
  private isLoading: boolean;
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
    for (let i = 0; i < this.users.length; i++) {
      let currentUser = this.users[i];
      this.doughnutChartLabels.push(currentUser.email);
      let currentUserPurchases = this.users[i].purchases;
      if (currentUserPurchases.length < 1) {
        continue;
      }
      let amt = 0;
      for (let t = 0; t < currentUserPurchases.length; t++) {
        if (currentUserPurchases[t].amount) {
          amt = amt + currentUserPurchases[t].amount;
        }
      }
      this.doughnutChartData.push(amt);
    }
  }

  getPurchases(): void {
    this.usersService.getPurchases()
        .then(purchases => {
          this.purchases = purchases;
        })
        .catch(function(err) {
          console.info("Unable to retrieve purchases, is CarDash API up and running?");
        });
  }

  getUsers(): void {
    this.usersService.getUsers()
        .then(userList => {
          this.users = userList;
          this.populateChart();
          this.isLoading = true;

        })
        .catch(function(err) {
          console.info("Unable to retrieve users, is CarDash API up and running?");
        });
  }
}
export interface Type { email: string; }

export interface Amount { amt: number; }
