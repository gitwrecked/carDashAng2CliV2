import { Component }     from '@angular/core';
import { User }          from '../Models/user';
import { UsersService }  from '../users-service/users.service';
import { OnInit }        from '@angular/core';
import { Router }        from '@angular/router';
import { Purchase }      from '../Models/purchase';

const template = require('./user-investment.component.html');
const styles   = require('./user-investment.component.scss');

@Component({
  templateUrl: template,
  styleUrls: [styles],
  providers: [UsersService]
})

export class UserInvestmentComponent{

  constructor(private router: Router,
   private usersService: UsersService) {
    this.isLoading = false;
    }
  ngOnInit(): void {
  	this.getUsers();
  }

  public purchases: Purchase[];
  public users:User[];
  public userEmails: type[];
  private isLoading;
  public doughnutChartLabels:Array<string> =[];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';

  public chartClicked(e:any):void { }
  
  public chartHovered(e:any):void { }

  pupulateChart() {
   	var arrayLength = this.users.length;     
  	for (var i = 0; i < arrayLength; i++) {
      	this.doughnutChartLabels.push(this.users[i].email);
        var amt = 0;
        for (var t = 0; t < this.users[i].purchases.length; t++) {
          amt = amt + this.users[i].purchases[t].amount;         
        }
        this.doughnutChartData.push(amt);
  		}
  }

  getPurchases(): void {
    this.usersService.getPurchases().then(
      purchase => {
        this.purchases = purchase;        
      }
      ).catch(function(e) {      	
  		  console.error(e); 
	  });
  }

  getUsers(): void {
    this.usersService.getUsers().then(
      user => {
        this.users = user;        
        this.pupulateChart();
        this.isLoading = true;

      }
      ).catch(function(e) {      	
  		  console.error(e); 
	});
  }
}
export interface type{
    email:string;
}

export interface amount{
	amt: number;
}



